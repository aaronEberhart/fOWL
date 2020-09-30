(ns ontology.IO
  "functions for outputting and inputting OWL data"
  (:require [clojure.java.io :as io][clojure.string :as s]
           [ontology.axioms :as ax][ontology.components :as co][ontology.expressions :as ex][ontology.annotations :as ann]
           [ontology.facts :as fs][ontology.file :as onf][ontology.SWRL :as swrl]))

(defn ^:no-doc hasIRI
  "Sees whether the thing has an iri key"
  [thing]
  (and (map? thing)(contains? thing :iri)))

(defn ^:no-doc changePrefix?
  "Sees whether the thing needs to change its prefix"
  [prefix thing]
  (and (not (or (= (:type thing) :prefix)(= (:type thing) :import)(= (:type thing) :ontologyIRI)(= (:type thing) :versionIRI)))
        (or (and (:iri thing) (not (:namespace thing)) (some? (re-matches (re-pattern (str (:prefix prefix) "\\S+")) (:iri thing))))
            (and (= (:prefix thing) (:prefix prefix))))))

(defn ^:no-doc losePrefix
  "loses the prefix"
  [prefix thing]
  (dissoc (assoc thing :iri (get (re-matches (re-pattern (str "\\<?"(:iri prefix) "([^\\>]+)\\>?")) (:iri thing)) 1)) :namespace :prefix :name))

(defn ^:no-doc gainPrefix
  "gains the prefix"
  [prefix thing]
  (let [short (if (:name thing) (:name thing) (get (re-matches (re-pattern (str (:prefix prefix) "(\\S+)")) (:iri thing)) 1))
        pre (if (:prefix thing) (:prefix thing) (:prefix prefix))
        namespace (:iri prefix)]
  (assoc thing :prefix pre :namespace namespace :iri (str "<" namespace short ">") :name short)))

(defn ^:no-doc hasThisPrefix
  "sees if the thing has the prefix"
  [prefix thing]
  (if (or (= (:prefix thing) (:prefix prefix))(not (:prefix thing))) thing))

(def ^:no-doc extractParams
 "Separates annotations from other inputs for functions with variable arguments"
 (comp
  (fn [l]
   (if (empty? (get l 0))
    (get l 1)
    (concat [(into #{} (get l 0))](get l 1))))
  (fn [l] (split-with (fn [x](or (= (:type x) :annotation)(and (set? x)(some #(= (:type %) :annotation) x)))) l))
  list))

(def ^:no-doc extractParamList
 "Separates annotations from other inputs for functions with variable arguments"
 (comp
  (fn [l]
   (if (empty? (get l 0))
    [(get l 1)]
    [(into #{} (get l 0))(get l 1)]))
  (fn [l](split-with (fn [x] (or (= (:type x) :annotation)(and (set? x)(some #(= (:type %) :annotation) x)))) l))
  list))

(def ^:no-doc extractFirstParamFromList
 "Separates annotations from other inputs for functions with variable arguments"
 (comp
  (fn [l]
   (if (empty? (get l 0))
    [(first (get l 1)) (rest (get l 1))]
    [(into #{} (get (get l 0) 0))(first (get l 1)) (rest (get l 1))]))
  (fn [l](split-with (fn [x] (or (= (:type x) :annotation)(and (set? x)(some #(= (:type %) :annotation) x)))) l))
  list))

(defn- swapPrefixes 
 [iri]
 (if (:prefix iri)
  (if (s/includes? (:name iri) " ")
   (:iri iri)
   (str (:prefix iri)":"(:name iri)))
  (:iri iri)))

(defn- noPrefixes 
 [iri]
 (case (:name iri)
  nil (:iri iri)
  "Thing" "⊤"
  "Nothing" "⊥"
  "topObjectProperty" "U"
  "bottomObjectProperty" "∅"
  (:name iri)))

(defn- assignPrefix 
 [name prefixes]
 (let [splits (re-matches #"([^\:]*?):([\s\S]+)" name)
       key (get splits 1)
       val (get splits 2)
       fullIRI (:iri (first (drop-while (fn [x] (not (= key (:prefix x)))) prefixes)))]
 (if fullIRI [key val fullIRI][key val])))

;think need to update this fun?
(defn- parseIRI 
 [name prefixes]
 (apply co/IRI (assignPrefix name prefixes)))

(defn- getDeclType 
 [type]
 (case type
  :className "Class("
  :dataType "Datatype("
  :roleName "ObjectProperty("
  :dataRoleName "DataProperty("
  :annotationRole "AnnotationProperty("
  :namedIndividual "NamedIndividual("
  "Undefined("))

(defn toDLString 
 "Returns a DL syntax string representation of the map object used to store the OWL object, or the default representation if there is no OWL type contained in the map."
 [thing]
 (case (:innerType thing)

  ;not an OWL map
  nil (if (:iri thing) (:iri thing) (if (map? thing) (str "{" (s/join ", " (map #(str (toDLString %) " " (toDLString (% thing))) (keys thing))) "}") (if thing (str thing) "nil")))

  ;atoms
  :top "⊤"
  :bot "⊥"
  :roleTop "U"
  :roleBot "∅"
  :typedLiteral (:value thing)
  :stringLiteralNoLanguage (:value thing)
  :stringLiteralWithLanguage (:value thing)
  :name (swapPrefixes (:name thing)) 
  :dataType (swapPrefixes thing)
  :restrictedValue (str (swapPrefixes thing) " " (:value thing))
  :className (noPrefixes thing)
  :roleName (noPrefixes thing)
  :inverseRoleName (str (noPrefixes thing) "\u207B")
  :dataRoleName (noPrefixes thing)
  :namedIndividual (noPrefixes thing)
  :anonymousIndividual (swapPrefixes thing)
  :annotationRole (noPrefixes thing)
  :annotationSubject (noPrefixes thing)
  :annotationValue (noPrefixes thing)  
  :dataNot (str "¬" (toDLString (:dataRange thing)))
  :dataOr (s/join " ∨ " (map (fn [x] (if (or (= (:innerType x) :dataOr)(= (:innerType x) :dataAnd)) (str "(" (toDLString x) ")")(toDLString x))) (:dataRanges thing)))
  :dataAnd (s/join " ∧ " (map (fn [x] (if (or (= (:innerType x) :dataOr)(= (:innerType x) :dataAnd)) (str "(" (toDLString x) ")")(toDLString x))) (:dataRanges thing)))
  :dataOneOf (s/join "," (map (fn [x] (:value x)) (:literals thing)))
  :datatypeRestriction (str "DatatypeRestriction(" (swapPrefixes thing) " " (s/join " " (map toDLString (:restrictedValues thing)))")")

  ;filestuff
  :ontology (str (if (and (:prefixes thing)(not (empty? (:prefixes thing)))) (str (s/join "\n" (map (fn [x] (toDLString x)) (:prefixes thing))) "\n\n")) "Ontology(" (if (:ontologyIRI thing) (str (toDLString (:ontologyIRI thing)) "\n" (if (:versionIRI thing) (str (toDLString (:versionIRI thing)) "\n")) "\n")) (if (not (empty? (:imports thing))) (str (s/join "\n" (map (fn [x] (toDLString x)) (:imports thing))) "\n")) (if (not (empty? (:annotations thing))) (str (s/join "\n" (map (fn [x] (toDLString x)) (:annotations thing))) "\n")) (if (not (empty? (:axioms thing))) (s/join "\n" (map (fn [x] (toDLString x)) (:axioms thing)))) "\n)")
  :ontologyIRI (:iri thing)
  :versionIRI (:iri thing)
  :prefix (str "Prefix(" (:prefix thing) "=<" (:iri thing) ">)")
  :prefixes (str (s/join "\n" (map toDLString (:prefixes thing))))
  :import (str "Import(" (:iri thing) ")")
  :imports (str (s/join "\n" (map toDLString (:imports thing))))
  :declaration (str "Declaration(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) " ") "") (getDeclType (:innerType (:name thing))) (toDLString (:name thing)) "))")

  ;data roles ⊑ ⊓ ⊔ ∃ ∀ ∘ ≡ ≤ ≥ ⊤ ⊥ U ∅ ¬
  :partialDataRole (str "∃" (toDLString (:dataRole thing)) "[" (:value (:literal thing)) "]")
  :=dataExists (str "=" (:nat thing) (toDLString (:dataRole thing)) ".[" (toDLString (:dataRange thing)) "]")
  :<=dataExists (str "≤" (:nat thing) (toDLString (:dataRole thing)) ".["  (toDLString (:dataRange thing)) "]")
  :>=dataExists (str "≥" (:nat thing) (toDLString (:dataRole thing)) ".[" (toDLString (:dataRange thing)) "]")
  :dataExists (str "∃" (s/join " " (map (fn [x] (toDLString x)) (:dataRoles thing))) ".[" (toDLString (:dataRange thing)) "]")
  :dataAll (str "∀" (s/join " " (map (fn [x] (toDLString x)) (:dataRoles thing))) ".[" (toDLString (:dataRange thing)) "]")

  ;roles
  :roleChain (s/join " ∘ " (map (fn [x] (toDLString x)) (:roles thing)))
  :partialRole (str "∃" (toDLString (:role thing)) "{" (:individual thing) "}")
  :=exists (str "=" (:nat thing) (toDLString (:role thing)) (str "."  (if (:class thing) (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "(" (toDLString (:class thing)) ")") (toDLString (:class thing))) "⊤")))
  :<=exists (str "≤" (:nat thing) (toDLString (:role thing))  (str "." (if (:class thing) (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "(" (toDLString (:class thing)) ")") (toDLString (:class thing))) "⊤")))
  :>=exists (str "≥" (:nat thing) (toDLString (:role thing))  (str "."  (if (:class thing) (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "(" (toDLString (:class thing)) ")") (toDLString (:class thing))) "⊤")))
  :exists (str "∃" (toDLString (:role thing)) "." (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "(" (toDLString (:class thing)) ")") (toDLString (:class thing))))
  :all (str "∀" (toDLString (:role thing)) "." (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "(" (toDLString (:class thing)) ")") (toDLString (:class thing))))

  ;classes
  :not (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "¬(" (toDLString (:class thing)) ")")(str "¬" (toDLString (:class thing))))
  :or (s/join " ⊔ " (map (fn [x] (if (or (= (:innerType x) :or)(= (:innerType x) :and)) (str "(" (toDLString x) ")")(toDLString x))) (:classes thing)))
  :and (s/join " ⊓ " (map (fn [x] (if (or (= (:innerType x) :or)(= (:innerType x) :and)) (str "(" (toDLString x) ")")(toDLString x))) (:classes thing)))
  :Self  (str "∃" (:role thing) ".Self")
  :nominal (str "{" (s/join " " (map (fn [x] (toDLString x)) (:individuals thing))) "}")

  ;annotation
  :annotation (str (toDLString (:annotationRole thing)) "("  (toDLString (:annotationValue thing)) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :axiomAnnotations (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")")
  :metaAnnotations (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")")
  :annotationFact (str (toDLString (:annotationRole thing)) "(" (toDLString (:annotationSubject thing) ) ","  (toDLString (:annotationValue thing)) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :annotationImplication (str (toDLString (:antecedent thing)) " ⊑ " (toDLString (:consequent thing) ) (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))

  ;assertions
  :=individuals (str "={" (s/join "," (map (fn [x] (toDLString x)) (:individuals thing))) "}" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :!=individuals  (str "!={" (s/join "," (map (fn [x] (toDLString x)) (:individuals thing))) "}" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :classFact (str (toDLString (:class thing)) "(" (toDLString (:individual thing)) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :roleFact (str (toDLString (:role thing)) "(" (toDLString (:fromIndividual thing)) "," (toDLString (:toIndividual thing)) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :notRoleFact (str "¬" (toDLString (:role thing)) "(" (toDLString (:fromIndividual thing)) "," (toDLString (:toIndividual thing)) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :dataRoleFact (str (toDLString (:dataRole thing)) "(" (toDLString (:fromIndividual thing)) "," (toDLString (:toLiteral thing)) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :notDataRoleFact (str "¬"  (toDLString (:dataRole thing)) "(" (toDLString (:fromIndividual thing)) "," (toDLString (:toLiteral thing)) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))

  ;axioms
  :hasKey (str "HasKey(" (toDLString (:class thing) ) " (" (s/join " " (map (fn [x] (toDLString x )) (:roles thing))) ") (" (s/join " " (map (fn [x] (toDLString x )) (:dataRoles thing))) ") )" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :annotationDomain (str "AnnotationRoleDomain("  (toDLString (:annotationRole thing) ) " " (noPrefixes (:iri thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :annotationRange (str "AnnotationRoleRange("  (toDLString (:annotationRole thing) ) " " (noPrefixes (:iri thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :classImplication (str (toDLString (:antecedent thing) ) " ⊑ " (toDLString (:consequent thing) ) (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :=classes (str  (s/join " ≡ " (map (fn [x] (toDLString x )) (:classes thing))) (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :disjClasses (str "disjClasses(" (s/join "," (map (fn [x] (toDLString x )) (:classes thing))) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :disjOr (str (toDLString (:class thing) ) " ≡ U(" (toDLString (:classes thing) ) ")" (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")"))
  :roleImplication  (str  (toDLString (:antecedent thing) ) " ⊑ " (toDLString (:consequent thing) ) (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :=roles (str (s/join " ≡ " (map (fn [x] (toDLString x )) (:roles thing))) (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :disjRoles (str "disjRoles("  (s/join " " (map (fn [x] (toDLString x )) (:roles thing))) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :inverseRoles (str "InverseRoles("  (toDLString (:role thing)) " " (toDLString (:inverse thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :roleDomain (str "RoleDomain("  (toDLString (:role thing) ) " " (toDLString (:class thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :roleRange (str "RoleRange("  (toDLString (:role thing) ) " " (toDLString (:class thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :functionalRole (str "FunctionalRole("  (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :functionalInverseRole (str "InverseFunctionalRole("  (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :reflexiveRole (str "ReflexiveRole("  (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :irreflexiveRole (str "IrreflexiveRole("  (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :symmetricRole (str "SymmetricRole("  (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :asymmetricRole (str "AsymmetricRole("  (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :transitiveRole (str "TransitiveRole(" (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :dataRoleImplication (str (toDLString (:antecedent thing) ) " ⊑ " (toDLString (:consequent thing) ) (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :=dataRoles (str (s/join " ≡ " (map (fn [x] (toDLString x )) (:dataRoles thing))) (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :disjDataRoles (str "disjDataRoles("  (s/join " " (map (fn [x] (toDLString x )) (:dataRoles thing))) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :dataRoleDomain (str "DataRoleDomain(" (toDLString (:dataRole thing) ) " " (toDLString (:class thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :dataRoleRange (str "DataRoleRange("  (toDLString (:dataRole thing) ) " " (toDLString (:dataRange thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :functionalDataRole (str "FunctionalDataRole(" (toDLString (:dataRole thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :newDataType (str "DatatypeDefinition("  (toDLString (:dataType thing) ) " " (toDLString (:dataRange thing) ) ")" (if (:annotations thing) (str " (annotations: " (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))

  ;SWRL
  :dlSafeRule (str "DLSafeRule(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) " ") "") "Body(" (s/join " " (map (fn [x] (toDLString x)) (:body thing))) ") Head(" (s/join " " (map (fn [x] (toDLString x)) (:head thing))) "))")
  :dgRule (str "DescriptionGraphRule(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) " ") "") "Body(" (s/join " " (map (fn [x] (toDLString x)) (:body thing))) ") Head(" (s/join " " (map (fn [x] (toDLString x)) (:head thing))) "))")
  :dgAxiom (str "DescriptionGraph(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toDLString x)) (:annotations thing))) " ") "") (swapPrefixes (:dgName thing)) " Nodes(" (s/join " " (map (fn [x] (toDLString x)) (:dgNodes thing))) ") Edges(" (s/join " " (map (fn [x] (toDLString x)) (:dgEdges thing))) ") MainClasses(" (s/join " " (map (fn [x] (toDLString x)) (:mainClasses thing))) "))")
  :classAtom (str "ClassAtom(" (toDLString (:class thing)) " " (toDLString (:iarg thing)) ")")
  :dataRangeAtom (str "DataRangeAtom(" (toDLString (:dataRange thing)) " " (toDLString (:darg thing)) ")")
  :roleAtom (str "ObjectPropertyAtom(" (toDLString (:role thing)) " " (toDLString (:iarg1 thing)) " " (toDLString (:iarg2 thing)) ")")
  :dataRoleAtom (str "DataPropertyAtom(" (toDLString (:dataRole thing)) " " (toDLString (:iarg thing)) " " (toDLString (:darg thing)) ")")
  :builtInAtom (str "BuiltInAtom(" (toDLString (:iri thing)) " " (s/join " " (map (fn [x] (toDLString x)) (:dargs thing))) ")")
  :=individualsAtom (str "SameIndividualAtom(" (toDLString (:iarg1 thing)) (toDLString (:iarg2 thing)) ")")
  :!=individualsAtom (str "DifferentIndividualsAtom(" (toDLString (:iarg1 thing)) (toDLString (:iarg2 thing)) ")")
  :variable (str "Variable(" (if (:name thing) (str (:prefix thing) ":" (:name thing)) (:iri thing)) ")")
  :nodeFact (str "NodeAssertion(" (toDLString (:class thing)) " " (swapPrefixes (:node thing)) ")")
  :edgeFact (str "EdgeAssertion(" (toDLString (:role thing)) " " (swapPrefixes (:node1 thing)) " " (swapPrefixes (:node2 thing)) ")")))

(defn toString 
 "Returns a functional syntax string representation of the map object used to store the OWL data, or the default representation if there is no OWL type contained in the map. Note that this is __*not*__ the same as java toString."
 [thing]
 (case (:innerType thing)

  ;Not an OWL map
  nil (if (:iri thing) (:iri thing) (if (map? thing) (str "{" (s/join ", " (map #(str (toString %) " " (toString (get thing %))) (keys thing))) "}") (if thing (str thing) "nil")))

  ;atoms
  :lexicalForm (:value thing)
  :typedLiteral (:value thing)
  :stringLiteralNoLanguage (:value thing)
  :stringLiteralWithLanguage (:value thing)
  :name (swapPrefixes (:name thing)) 
  :top (swapPrefixes thing)
  :bot (swapPrefixes thing)
  :roleTop (swapPrefixes thing)
  :roleBot (swapPrefixes thing)
  :dataType (swapPrefixes thing)
  :restrictedValue (str (swapPrefixes thing) " " (:value thing))
  :className (swapPrefixes thing)
  :roleName (swapPrefixes thing)
  :inverseRoleName (str "ObjectInverseOf(" (swapPrefixes thing) ")")
  :dataRoleName (swapPrefixes thing)
  :namedIndividual (swapPrefixes thing)
  :anonymousIndividual (swapPrefixes thing)
  :annotationRole (swapPrefixes thing)
  :annotationSubject (swapPrefixes thing)
  :annotationValue (swapPrefixes thing)  
  :dataNot (str "DataComplementOf(" (toString (:dataRange thing) ) ")")
  :dataOr (str "DataUnionOf(" (s/join " " (map (fn [x] (toString x )) (:dataRanges thing))) ")")
  :dataAnd (str "DataIntersectionOf(" (s/join " " (map (fn [x] (toString x )) (:dataRanges thing))) ")")
  :dataOneOf (str "DataOneOf(" (s/join " " (map (fn [x] (:value x)) (:literals thing))) ")")
  :datatypeRestriction (str "DatatypeRestriction(" (swapPrefixes thing) " " (s/join " " (map toString (:restrictedValues thing))) ")")

  ;filestuff
  :ontology (str (if (and (:prefixes thing)(not (empty? (:prefixes thing)))) (str (s/join "\n" (map (fn [x] (toString x)) (:prefixes thing))) "\n\n")) "Ontology(" (if (:ontologyIRI thing) (str (toString (:ontologyIRI thing)) "\n" (if (:versionIRI thing) (str (toString (:versionIRI thing)) "\n")) "\n") "\n") (if (not (empty? (:imports thing))) (str (s/join "\n" (map (fn [x] (toString x)) (:imports thing))) "\n\n")) (if (not (empty? (:annotations thing))) (str (s/join "\n" (map (fn [x] (toString x)) (:annotations thing))) "\n\n")) (if (not (empty? (:axioms thing))) (s/join "\n" (map (fn [x] (toString x)) (:axioms thing)))) "\n)")
  :ontologyIRI (:iri thing)
  :versionIRI (:iri thing)
  :prefix (str "Prefix(" (:prefix thing) ":=<" (:iri thing) ">)")
  :prefixes (str (s/join "\n" (map toString (:prefixes thing))))
  :import (str "Import(" (:iri thing) ")")
  :imports (str (s/join "\n" (map toString (:imports thing))))
  :declaration (str "Declaration(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (getDeclType (:innerType (:name thing))) (toString (:name thing)) "))")

  ;data roles
  :partialDataRole (str "DataHasValue(" (toString (:dataRole thing)) " " (:value (:literal thing)) ")")
  :=dataExists (str "DataExactCardinality(" (:nat thing) " " (toString (:dataRole thing)) (if (:dataRange thing) (str " " (toString (:dataRange thing)))) ")")
  :<=dataExists (str "DataMaxCardinality(" (:nat thing) " " (toString (:dataRole thing) ) (if (:dataRange thing) (str " " (toString (:dataRange thing))))")")
  :>=dataExists (str "DataMinCardinality(" (:nat thing) " " (toString (:dataRole thing) ) (if (:dataRange thing) (str " " (toString (:dataRange thing))))")")
  :dataExists (str "DataSomeValuesFrom(" (s/join " " (map (fn [x] (toString x )) (:dataRoles thing))) " " (toString (:dataRange thing) ) ")")
  :dataAll (str "DataAllValuesFrom(" (s/join " " (map (fn [x] (toString x )) (:dataRoles thing))) " " (toString (:dataRange thing) ) ")")

  ;roles
  :roleChain (str "ObjectPropertyChain(" (s/join " " (map (fn [x] (toString x )) (:roles thing))) ")")
  :partialRole (str "ObjectHasValue(" (toString (:role thing) ) " " (toString (:individual thing)) ")")
  :=exists (str "ObjectExactCardinality(" (:nat thing) " " (toString (:role thing)) (if (:class thing) (str " " (toString (:class thing))))")")
  :<=exists (str "ObjectMaxCardinality(" (:nat thing) " " (toString (:role thing)) (if (:class thing) (str " " (toString (:class thing))))")")
  :>=exists (str "ObjectMinCardinality(" (:nat thing) " " (toString (:role thing)) (if (:class thing) (str " " (toString (:class thing))))")")
  :exists (str "ObjectSomeValuesFrom(" (toString (:role thing) ) " " (toString (:class thing) ) ")")
  :all (str "ObjectAllValuesFrom(" (toString (:role thing) ) " " (toString (:class thing) ) ")")

  ;classes
  :not (str "ObjectComplementOf(" (toString (:class thing) ) ")")
  :or (str "ObjectUnionOf(" (s/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :and (str "ObjectIntersectionOf(" (s/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :Self (str "ObjectHasSelf(" (toString (:role thing)) ")")
  :nominal (str "ObjectOneOf(" (s/join " " (map (fn [x] (toString x)) (:individuals thing))) ")")

  ;annotation
  :annotation (str "Annotation(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:annotationRole thing)) " "  (toString (:annotationValue thing) ) ")")
  :axiomAnnotations (str (s/join " " (map (fn [x] (toString x )) (:annotations thing))) " ")
  :metaAnnotations (str (s/join " " (map (fn [x] (toString x )) (:annotations thing))) " ")
  :annotationFact (str "AnnotationAssertion(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:annotationRole thing)) " " (toString (:annotationSubject thing)) " "  (toString (:annotationValue thing)) ")")
  :annotationImplication (str "SubAnnotationPropertyOf(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:antecedent thing) ) " " (toString (:consequent thing) )")")

  ;assertions
  :=individuals (str "SameIndividual(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (s/join " " (map (fn [x] (toString x )) (:individuals thing))) ")")
  :!=individuals  (str "DifferentIndividuals(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (s/join " " (map (fn [x] (toString x )) (:individuals thing))) ")")
  :classFact (str "ClassAssertion(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:class thing) ) " " (toString (:individual thing) ) ")")
  :roleFact (str "ObjectPropertyAssertion(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) " " (toString (:fromIndividual thing) ) " " (toString (:toIndividual thing) ) ")")
  :notRoleFact (str "NegativeObjectPropertyAssertion(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing)) " " (toString (:fromIndividual thing) ) " " (toString (:toIndividual thing) ) ")")
  :dataRoleFact (str "DataPropertyAssertion(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:dataRole thing) ) " " (toString (:fromIndividual thing) ) " " (toString (:toLiteral thing) ) ")")
  :notDataRoleFact (str "NegativeDataPropertyAssertion(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:dataRole thing) ) " " (toString (:fromIndividual thing) ) " " (toString (:toLiteral thing) ) ")")

  ;axioms
  :hasKey (str "HasKey(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:class thing) ) " (" (s/join " " (map (fn [x] (toString x )) (:roles thing))) ") (" (s/join " " (map (fn [x] (toString x )) (:dataRoles thing))) ") )")
  :annotationDomain (str "AnnotationPropertyDomain(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:annotationRole thing) ) " " (swapPrefixes (:iri thing) ) ")")
  :annotationRange (str "AnnotationPropertyRange(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:annotationRole thing) ) " " (swapPrefixes (:iri thing) ) ")")
  :classImplication (str "SubClassOf(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:antecedent thing) ) " " (toString (:consequent thing) ) ")")
  :=classes (str "EquivalentClasses(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (s/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :disjClasses (str "DisjointClasses(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (s/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :disjOr (str "DisjointUnion(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:class thing) ) " " (s/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :roleImplication  (str "SubObjectPropertyOf(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:antecedent thing) ) " " (toString (:consequent thing) ) ")")
  :=roles (str "EquivalentObjectProperties(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (s/join " " (map (fn [x] (toString x )) (:roles thing))) ")")
  :disjRoles (str "DisjointObjectProperties(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (s/join " " (map (fn [x] (toString x )) (:roles thing))) ")")
  :inverseRoles (str "InverseObjectProperties(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) " " (toString (:inverse thing)) ")")
  :roleDomain (str "ObjectPropertyDomain(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) " " (toString (:class thing) ) ")")
  :roleRange (str "ObjectPropertyRange(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) " " (toString (:class thing) ) ")")
  :functionalRole (str "FunctionalObjectProperty(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :functionalInverseRole (str "InverseFunctionalObjectProperty(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :reflexiveRole (str "ReflexiveObjectProperty(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :irreflexiveRole (str "IrreflexiveObjectProperty(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :symmetricRole (str "SymmetricObjectProperty(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :asymmetricRole (str "AsymmetricObjectProperty(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :transitiveRole (str "TransitiveObjectProperty(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :dataRoleImplication (str "SubDataPropertyOf(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:antecedent thing) ) " " (toString (:consequent thing) ) ")")
  :=dataRoles (str "EquivalentDataProperties(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (s/join " " (map (fn [x] (toString x )) (:dataRoles thing))) ")")
  :disjDataRoles (str "DisjointDataProperties(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (s/join " " (map (fn [x] (toString x )) (:dataRoles thing))) ")")
  :dataRoleDomain (str "DataPropertyDomain(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:dataRole thing) ) " " (toString (:class thing) ) ")")
  :dataRoleRange (str "DataPropertyRange(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:dataRole thing) ) " " (toString (:dataRange thing) ) ")")
  :functionalDataRole (str "FunctionalDataProperty(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:dataRole thing) ) ")")
  :newDataType (str "DatatypeDefinition(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:dataType thing) ) " " (toString (:dataRange thing) ) ")")

  ;swrl
  :dlSafeRule (str "DLSafeRule(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") "Body(" (s/join " " (map (fn [x] (toString x)) (:body thing))) ") Head(" (s/join " " (map (fn [x] (toString x)) (:head thing))) "))")
  :dgRule (str "DescriptionGraphRule(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") "Body(" (s/join " " (map (fn [x] (toString x)) (:body thing))) ") Head(" (s/join " " (map (fn [x] (toString x)) (:head thing))) "))")
  :dgAxiom (str "DescriptionGraph(" (if (:annotations thing) (str (s/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (swapPrefixes (:dgName thing)) " Nodes(" (s/join " " (map (fn [x] (toString x)) (:dgNodes thing))) ") Edges(" (s/join " " (map (fn [x] (toString x)) (:dgEdges thing))) ") MainClasses(" (s/join " " (map (fn [x] (toString x)) (:mainClasses thing))) "))")
  :classAtom (str "ClassAtom(" (toString (:class thing)) " " (toString (:iarg thing)) ")")
  :dataRangeAtom (str "DataRangeAtom(" (toString (:dataRange thing)) " " (toString (:darg thing)) ")")
  :roleAtom (str "ObjectPropertyAtom(" (toString (:role thing)) " " (toString (:iarg1 thing)) " " (toString (:iarg2 thing)) ")")
  :dataRoleAtom (str "DataPropertyAtom(" (toString (:dataRole thing)) " " (toString (:iarg thing)) " " (toString (:darg thing)) ")")
  :builtInAtom (str "BuiltInAtom(" (toString (:iri thing)) " " (s/join " " (map (fn [x] (toString x)) (:dargs thing))) ")")
  :=individualsAtom (str "SameIndividualAtom(" (toString (:iarg1 thing)) (toString (:iarg2 thing)) ")")
  :!=individualsAtom (str "DifferentIndividualsAtom(" (toString (:iarg1 thing)) (toString (:iarg2 thing)) ")")
  :variable (str "Variable(" (if (:name thing) (str (:prefix thing) ":" (:name thing)) (:iri thing)) ")")  
  :nodeFact (str "NodeAssertion(" (toDLString (:class thing)) " " (swapPrefixes (:node thing)) ")")
  :edgeFact (str "EdgeAssertion(" (toDLString (:role thing)) " " (swapPrefixes (:node1 thing)) " " (swapPrefixes (:node2 thing)) ")")))

(defn- getFunction 
 [typeString]
 (case typeString
  "Import" onf/directImport
  "Class" (comp co/entity co/className)
  "Datatype" (comp co/entity co/dataType)
  "ObjectProperty" (comp co/entity co/roleName)
  "DataProperty" (comp co/entity co/dataRoleName)
  "AnnotationProperty"(comp co/entity ann/annotationRole)
  "NamedIndividual" (comp co/entity co/individual)
  "Annotation" (comp (partial apply ann/annotation) extractParams)
  "Declaration" (comp (partial apply ax/declaration) extractParams)
  "HasKey" (comp (partial apply ax/hasKey) extractParams)
  "ObjectInverseOf" ex/inverseRole
  "DataIntersectionOf" co/dataAnd
  "DataUnionOf" co/dataOr
  "DataComplementOf" co/dataNot
  "DataOneOf" co/dataOneOf
  "DatatypeRestriction" (comp (partial apply co/datatypeRestriction) extractFirstParamFromList)
  "ObjectIntersectionOf" ex/and
  "ObjectUnionOf" ex/or
  "ObjectComplementOf" ex/not
  "ObjectOneOf" ex/nominal
  "ObjectSomeValuesFrom" ex/exists
  "ObjectAllValuesFrom" ex/all
  "ObjectHasValue" ex/partialRole
  "ObjectHasSelf" ex/Self
  "ObjectMinCardinality" ex/>=exists
  "ObjectMaxCardinality" ex/<=exists
  "ObjectExactCardinality" ex/=exists
  "DataSomeValuesFrom" ex/dataExists
  "DataAllValuesFrom" ex/dataAll
  "DataMinCardinality" ex/>=dataExists
  "DataExactCardinality" ex/=dataExists
  "SubClassOf" (comp (partial apply ax/classImplication) extractParams)
  "EquivalentClasses" (comp (partial apply ax/=classes) extractParamList)
  "DisjointUnion" (comp (partial apply ax/disjOr) extractFirstParamFromList)
  "DisjointClasses" (comp (partial apply ax/disjClasses) extractParamList)
  "SubObjectPropertyOf" (comp (partial apply ax/roleImplication) extractParams)
  "EquivalentObjectProperties" (comp (partial apply ax/=roles) extractParamList)
  "DisjointObjectProperties" (comp (partial apply ax/disjRoles) extractParamList)
  "InverseObjectProperties" (comp (partial apply ax/inverseRoles) extractParams)
  "ObjectPropertyDomain" (comp (partial apply ax/roleDomain) extractParams)
  "ObjectPropertyRange" (comp (partial apply ax/roleRange) extractParams)
  "FunctionalObjectProperty" (comp (partial apply ax/functionalRole) extractParams)
  "InverseFunctionalObjectProperty" (comp (partial apply ax/functionalInverseRole) extractParams)
  "ReflexiveObjectProperty" (comp (partial apply ax/reflexiveRole) extractParams)
  "IrreflexiveObjectProperty" (comp (partial apply ax/irreflexiveRole) extractParams)
  "SymmetricObjectProperty" (comp (partial apply ax/symmetricRole) extractParams)
  "AsymmetricObjectProperty" (comp (partial apply ax/asymmetricRole) extractParams)
  "TransitiveObjectProperty" (comp (partial apply ax/transitiveRole) extractParams)
  "SubDataPropertyOf" (comp (partial apply ax/dataRoleImplication) extractParams)
  "EquivalentDataProperties" (comp (partial apply ax/=dataRoles) extractParamList)
  "DisjointDataProperties" (comp (partial apply ax/disjDataRoles) extractParamList)
  "DataPropertyDomain" (comp (partial apply ax/dataRoleDomain) extractParams)
  "DataPropertyRange" (comp (partial apply ax/dataRoleRange) extractParams)
  "FunctionalDataProperty" (comp (partial apply ax/functionalDataRole) extractParams)
  "AnnotationAssertion" (comp (partial apply ax/annotationFact) extractParams)
  "AnnotationPropertyDomain" (comp (partial apply ax/annotationDomain) extractParams)
  "AnnotationPropertyRange" (comp (partial apply ax/annotationRange) extractParams)
  "DataHasValue" ex/partialDataRole
  "DataMaxCardinality" ex/<=dataExists
  "ObjectPropertyChain" ax/roleChain
  "SubAnnotationPropertyOf" (comp (partial apply ax/annotationImplication) extractParams)
  "SameIndividual" (comp (partial apply fs/=individuals) extractParamList)
  "DifferentIndividuals" (comp (partial apply fs/!=individuals) extractParamList)
  "ClassAssertion" (comp (partial apply fs/classFact) extractParams)
  "ObjectPropertyAssertion" (comp (partial apply fs/roleFact) extractParams)
  "NegativeObjectPropertyAssertion" (comp (partial apply fs/notRoleFact) extractParams)
  "DataPropertyAssertion" (comp (partial apply fs/dataRoleFact) extractParams)
  "NegativeDataPropertyAssertion" (comp (partial apply fs/notDataRoleFact) extractParams)
  "DatatypeDefinition" (comp (partial apply ax/dataTypeDefinition) extractParams)
  "DLSafeRule" (comp (partial apply ax/dlSafeRule) extractParams)
  "Body" (comp swrl/body vector)
  "Head" (comp swrl/head vector)
  "Variable" swrl/variable
  "ClassAtom" swrl/classAtom
  "DataRangeAtom" swrl/dataRangeAtom
  "ObjectPropertyAtom" swrl/roleAtom
  "DataPropertyAtom" swrl/dataRoleAtom
  "BuiltInAtom" swrl/builtInAtom
  "SameIndividualAtom" swrl/=individualsAtom
  "DifferentIndividualsAtom" swrl/!=individualsAtom))

(defn makeOWLFile
 "makes an OWL file of the ontology"
 [filename prefixes ontologyIRI versionIRI imports annotations axioms]
 (with-open [wrt (io/writer filename)]
  (do 
   (doseq [prefix prefixes] (.write wrt (str (toString prefix) "\n")))
   (if (not (empty? prefixes)) (.write wrt "\n\n"))
   (.write wrt "Ontology(")
   (.write wrt (if ontologyIRI (str (toString ontologyIRI) "\n" (if versionIRI (str (toString versionIRI) "\n")) "\n")"\n"))
   (doseq [im imports] (.write wrt (str (toString im) "\n")))
   (if (not (empty? imports)) (.write wrt "\n"))
   (doseq [ann annotations] (.write wrt (str (toString ann) "\n")))
   (if (not (empty? annotations)) (.write wrt "\n"))
   (doseq [axiom axioms](.write wrt (str (toString axiom) "\n")))
   (.write wrt ")"))))

(defn- parsePrefixLine 
 [regexes state prefixes _ _ _ _]
 (loop [state state
        prefixes prefixes]
 (if-some [blankMatch (re-matches (:blankPat regexes) state)]
  [state prefixes]
 (if-some [commMatch (re-matches (:commPat regexes) state)]
  [(get commMatch 2) prefixes]
 (if-some [ontMatch (re-matches (:ontPat regexes) state)]
  [state prefixes]
 (if-some [prefMatch (re-matches (:prefixPat regexes) state)]
   (recur (get prefMatch 3) (conj! prefixes (apply onf/prefix [(get prefMatch 1)(get prefMatch 2)])))
 [state prefixes]))))))

(defn- parseOntologyIRILine 
 [regexes state ontologyIRI _ _ _ _]
 (loop [state state
        ontologyIRI ontologyIRI]
 (if-some [doneMatch (re-matches (:closeParenPat regexes) state)]
  [state ontologyIRI]
 (if-some [blankMatch (re-matches (:blankPat regexes) state)]
  [state ontologyIRI]
 (if-some [ontMatch (re-matches (:ontPat regexes) state)]
  (recur (get ontMatch 2) ontologyIRI)
 (if-some [fullIRIMatch (re-matches (:fullIRIPat regexes) state)]
  [(get fullIRIMatch 2) (conj! ontologyIRI (get fullIRIMatch 1))]
 (if-some [commMatch (re-matches (:commPat regexes) state)]
  [(get commMatch 2) ontologyIRI]
 (if-some [importMatch (re-matches (:importPat regexes) state)]
  [state ontologyIRI]
 (if-some [annMatch (re-matches (:annotationPat regexes) state)]
  [state ontologyIRI]
 (if-some [axMatch (re-matches (:axiomPat regexes) state)]
  [state ontologyIRI]))))))))))

(defn- parseVersionIRILine 
 [regexes state versionIRI _ _ _ _]
 (loop [state state
        versionIRI versionIRI]
 (if-some [doneMatch (re-matches (:closeParenPat regexes) state)]
  [state versionIRI]
 (if-some [blankMatch (re-matches (:blankPat regexes) state)]
  [state versionIRI]
 (if-some [fullIRIMatch (re-matches (:fullIRIPat regexes) state)]
  [(get fullIRIMatch 2) (conj! versionIRI (get fullIRIMatch 1))]
 (if-some [commMatch (re-matches (:commPat regexes) state)]
  [(get commMatch 2) versionIRI]
 (if-some [importMatch (re-matches (:importPat regexes) state)]
  [state versionIRI]
 (if-some [annMatch (re-matches (:annotationPat regexes) state)]
  [state versionIRI]
 (if-some [axMatch (re-matches (:axiomPat regexes) state)]
  [state versionIRI])))))))))

(defn- parseImportLine 
 [regexes state imports _ _ _ _]
 (loop [state state
        imports imports]
 (if-some [doneMatch (re-matches (:closeParenPat regexes) state)]
  [state imports]
 (if-some [blankMatch (re-matches (:blankPat regexes) state)]
  [state imports]
 (if-some [commMatch (re-matches (:commPat regexes) state)]
  [(get commMatch 2) imports]
 (if-some [annMatch (re-matches (:annotationPat regexes) state)]
  [state imports]
 (if-some [importMatch (re-matches (:importPat regexes) state)]
  (recur (get importMatch 2) (conj! imports (onf/directImport (get importMatch 1))))
 (if-some [axMatch (re-matches (:axiomPat regexes) state)]
  [state imports]))))))))

(defn- parseAnnotationLine 
 [regexes state annotations annFun exps expFuns prefixes]
 (loop [state state
        annotations annotations
        annFun annFun
        exps exps
        expFuns expFuns]
 (if-some [doneMatch (re-matches (:closeParenPat regexes) state)]
  (cond
   (nil? annFun)
    [(str (get doneMatch 1)(get doneMatch 2)) annotations nil exps expFuns]
   (empty? expFuns)
    (recur (get doneMatch 2) (conj! annotations (apply annFun (first exps))) nil (if (= 1 (count exps)) '([]) (rest exps)) '())
   (= 1 (count exps))
    (recur (get doneMatch 2) annotations annFun (list [(apply (first expFuns) (first exps))]) (rest expFuns))
   (= 2 (count exps))
    (recur (get doneMatch 2) annotations annFun (list (conj (first (rest exps)) (apply (first expFuns) (first exps)))) (rest expFuns))
   :else
    (recur (get doneMatch 2) annotations annFun (conj (rest (rest exps)) (conj (first (rest exps)) (apply (first expFuns) (first exps)))) (rest expFuns)))
 (if-some [commMatch (re-matches (:commPat regexes) state)]
  [(get commMatch 2) annotations annFun exps expFuns]
 (if-some [blankMatch (re-matches (:blankPat regexes) state)]
  [(str state (get blankMatch 1)) annotations annFun exps expFuns]
 (if-some [fullIRIMatch (re-matches (:fullIRIPat regexes) state)]
  (recur (get fullIRIMatch 2) annotations annFun (conj (rest exps) (conj (first exps) (co/IRI (get fullIRIMatch 1)))) expFuns)
 (if-some [prefIRIMatch (re-matches (:prefIRIPat regexes) state)]
  (recur (get prefIRIMatch 2) annotations annFun (conj (rest exps) (conj (first exps) (parseIRI (get prefIRIMatch 1) prefixes))) expFuns)
 (if-some [literalQuotedMatch (re-matches (:literalQuotedPat regexes) state)]
  (if-some [literalTypedMatch (re-matches (:literalTypedPat regexes) (get literalQuotedMatch 2))]
   (recur (get literalTypedMatch 3) annotations annFun (conj (rest exps) (conj (first exps) (co/typedLiteral (get literalQuotedMatch 1) (if (some? (get literalTypedMatch 1)) (co/dataType (get literalTypedMatch 1)) (apply co/dataType (assignPrefix (get literalTypedMatch 2) prefixes)))))) expFuns)
  (if-some [literalLangMatch (re-matches (:literalLangPat regexes) (get literalQuotedMatch 2))]
   (recur (get literalLangMatch 2) annotations annFun (conj (rest exps) (conj (first exps) (co/stringLiteralWithLanguage (get literalQuotedMatch 1)(get literalLangMatch 1)))) expFuns)
  (recur (get literalQuotedMatch 2) annotations annFun (conj (rest exps) (conj (first exps) (co/stringLiteralNoLanguage (get literalQuotedMatch 1)))) expFuns)))
 (if-some [annMatch (re-matches (:annotationPat regexes) state)]
  (if (nil? annFun)
   (recur (get annMatch 2) annotations ann/annotation exps expFuns)
   (recur (get annMatch 2) annotations annFun (conj exps []) (conj expFuns ann/annotation)))
 (if-some [axMatch (re-matches (:axiomPat regexes) state)]
  [state annotations annFun exps expFuns]
 [(str state "\n") annotations annFun exps expFuns]))))))))))

(defn- parseAxiomLine 
 [regexes state axioms ax exs funs prefixes]
 (loop [state state
        axioms axioms
        axFun ax
        exps exs
        expFuns funs]
 (if-some [doneMatch (re-matches (:closeParenPat regexes) state)]
  (cond
   (nil? axFun)
    [(str (get doneMatch 1)(get doneMatch 2)) axioms nil exps expFuns]
   (empty? expFuns)
    (recur (get doneMatch 2) (conj! axioms (apply axFun (first exps))) nil (if (= 1 (count exps)) '([]) (rest exps)) expFuns)
   (= 1 (count exps))
    (recur (get doneMatch 2) axioms axFun (list [(apply (first expFuns) (first exps))]) (rest expFuns))
   (= 2 (count exps))
    (recur (get doneMatch 2) axioms axFun (list (conj (first (rest exps)) (apply (first expFuns) (first exps)))) (rest expFuns))
   :else
    (recur (get doneMatch 2) axioms axFun (conj (rest (rest exps)) (conj (first (rest exps)) (apply (first expFuns) (first exps)))) (rest expFuns)))
 (if-some [commMatch (re-matches (:commPat regexes) state)]
  [(get commMatch 2) axioms axFun exps expFuns]
 (if-some [blankMatch (re-matches (:blankPat regexes) state)]
  [(str state (get blankMatch 1)) axioms axFun exps expFuns]
 (if-some [numMatch (re-matches (:numPat regexes) state)]
    (recur (get numMatch 2) axioms axFun (conj (rest exps) (conj (first exps) (read-string (get numMatch 1)))) expFuns)
 (if-some [fullIRIMatch (re-matches (:fullIRIPat regexes) state)]
   (recur (get fullIRIMatch 2) axioms axFun (conj (rest exps) (conj (first exps) (co/IRI (get fullIRIMatch 1)))) expFuns)
 (if-some [prefIRIMatch (re-matches (:prefIRIPat regexes) state)]
   (recur (get prefIRIMatch 2) axioms axFun (conj (rest exps) (conj (first exps) (parseIRI (get prefIRIMatch 1) prefixes))) expFuns)
 (if-some [literalQuotedMatch (re-matches (:literalQuotedPat regexes) state)]
  (if-some [literalTypedMatch (re-matches (:literalTypedPat regexes) (get literalQuotedMatch 2))]
   (recur (get literalTypedMatch 3) axioms axFun (conj (rest exps) (conj (first exps) (co/typedLiteral (get literalQuotedMatch 1) (if (some? (get literalTypedMatch 1)) (co/dataType (get literalTypedMatch 1)) (apply co/dataType (assignPrefix (get literalTypedMatch 2) prefixes)))))) expFuns)
  (if-some [literalLangMatch (re-matches (:literalLangPat regexes) (get literalQuotedMatch 2))]
   (recur (get literalLangMatch 2) axioms axFun (conj (rest exps) (conj (first exps) (co/stringLiteralWithLanguage (get literalQuotedMatch 1)(get literalLangMatch 1)))) expFuns)
  (recur (get literalQuotedMatch 2) axioms axFun (conj (rest exps) (conj (first exps) (co/stringLiteralNoLanguage (get literalQuotedMatch 1)))) expFuns)))
 (if-some [annMatch (re-matches (:annotationPat regexes) state)]
  (recur (get annMatch 2) axioms axFun (conj exps []) (conj expFuns ann/annotation))
 (if-some [axMatch (re-matches (:axiomPat regexes) state)]
  (recur (get axMatch 2) axioms (getFunction (get axMatch 1)) exps expFuns)
 (if-some [exMatch (re-matches (:expressionPat regexes) state)]
  (recur (get exMatch 2) axioms axFun (conj exps []) (conj expFuns (getFunction (get exMatch 1))))
 [(str state "\n") axioms axFun exps expFuns]))))))))))))

(defn- parseLines
  ([lineSeq loopFunction stopCondition prefixes regexes]
  (loop [state (first lineSeq)
         lines lineSeq
         objects (transient #{})
         function nil
         expressions '([])
         functionList '()]

  (let [[state objects function expressions functionList] (loopFunction regexes state objects function expressions functionList prefixes)]
   (if (stopCondition [objects state lines])
    [(persistent! objects) (lazy-seq (cons state (if (some? lines)(rest lines))))]
    (recur (str state (first (rest lines))) (rest lines) objects function expressions functionList))))))

(defn readOWLFile
 "Reads an OWL file to obtain an ontology."
 [file regexes]
 (with-open [rdr (io/reader (if (string? file) (io/file file) file))]
  (let [ontFile (line-seq rdr)
       [prefixes ontFile] (parseLines ontFile parsePrefixLine #(some? (re-matches (:ontPat regexes) (get % 1))) nil regexes)
       [ontologyIRI ontFile] ((fn [[x y]] [(first x) y]) (parseLines ontFile parseOntologyIRILine #(or (= 1 (count (get % 0)))(or (some? (re-matches (:iriStopPat regexes) (get % 1)))(or (some? (re-matches (:donePat regexes) (get % 1)))(empty? (rest (get % 2)))))) nil regexes))
       [versionIRI ontFile] ((fn [[x y]] [(first x) y]) (parseLines ontFile parseVersionIRILine #(or (= 1 (count (get % 0)))(or (some? (re-matches (:iriStopPat regexes) (get % 1)))(or (some? (re-matches (:donePat regexes) (get % 1)))(empty? (rest (get % 2)))))) nil regexes))
       [imports ontFile] (parseLines ontFile parseImportLine #(or (some? (re-matches (:annotationPat regexes) (get % 1)))(or (some? (re-matches (:axiomPat regexes) (get % 1)))(or (some? (re-matches (:donePat regexes) (get % 1)))(empty? (rest (get % 2)))))) nil regexes)
       [annotations ontFile] (parseLines ontFile parseAnnotationLine #(or (some? (re-matches (:axiomPat regexes) (get % 1)))(or (some? (re-matches (:donePat regexes) (get % 1)))(empty? (rest (get % 2))))) prefixes regexes)
       [axioms lastParen] (parseLines ontFile parseAxiomLine #(and (some? (re-matches (:donePat regexes) (get % 1)))) prefixes regexes)]
       (cond
        (and (some? ontologyIRI)(some? versionIRI))(onf/ontologyFile prefixes (onf/ontology ontologyIRI versionIRI imports annotations axioms))
        (some? ontologyIRI)(onf/ontologyFile prefixes (onf/ontology ontologyIRI imports annotations axioms))
        :else (onf/ontologyFile prefixes (onf/ontology imports annotations axioms))))))
