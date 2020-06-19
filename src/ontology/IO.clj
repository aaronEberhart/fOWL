(ns ontology.IO
 (:refer-clojure :exclude [name])
 (:require [clojure.java.io :as io][clojure.string :as str][clojure.set :as set]
           [ontology.axioms :as ax][ontology.components :as co][ontology.expressions :as ex][ontology.annotations :as ann]
           [ontology.facts :as fs][ontology.file :as onf][ontology.SWRL :as swrl][ontology.normalize :as nml]
           [util.msc :as msc])
 (:use [slingshot.slingshot :only [throw+]]))

(def extractParams
 (comp
  (fn [l]
   (if (empty? (get l 0))
    (get l 1)
    (concat [(into #{} (get l 0))](get l 1))))
  (fn [l] (split-with (fn [x](or (= (:type x) :annotation)(and (set? x)(some #(= (:type %) :annotation) x)))) l))
  list))

(def extractParamList
 (comp
  (fn [l]
   (if (empty? (get l 0))
    [(get l 1)]
    [(into #{} (get l 0))(get l 1)]))
  (fn [l](split-with (fn [x] (or (= (:type x) :annotation)(and (set? x)(some #(= (:type %) :annotation) x)))) l))
  list))

(def extractFirstParamFromList
 (comp
  (fn [l]
   (if (empty? (get l 0))
    [(first (get l 1)) (rest (get l 1))]
    [(into #{} (get (get l 0) 0))(first (get l 1)) (rest (get l 1))]))
  (fn [l](split-with (fn [x] (or (= (:type x) :annotation)(and (set? x)(some #(= (:type %) :annotation) x)))) l))
  list))

(def emptyOntology
 (onf/ontology #{} #{} #{}))

(def emptyOntologyFile
 (onf/ontologyFile #{} emptyOntology))

(defn getAxioms [ontology]
 (msc/lazer (:axioms ontology)))

(defn getAxiomsNoAnnotations [ontology]
 (msc/lazer (:axioms ontology) #(not (= (:outerType %) :annotationAxiom)) #(dissoc % :annotations)))

(defn getClassAxioms [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :classAxiom)))

(defn getClassAxiomsNoAnnotations [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :classAxiom) #(dissoc % :annotations)))

(defn getRoleAxioms [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :roleAxiom)))

(defn getRoleAxiomsNoAnnotations [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :roleAxiom) #(dissoc % :annotations)))

(defn getDataRoleAxioms [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :dataRoleAxiom)))

(defn getDataRoleAxiomsNoAnnotations [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :dataRoleAxiom) #(dissoc % :annotations)))

(defn getFacts [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :fact)))

(defn getFactsNoAnnotations [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :fact) #(dissoc % :annotations)))

(defn getPrefixes [ontology]
 (msc/lazer (:prefixes ontology)))

(defn getImports [ontology]
 (msc/lazer (:imports ontology)))

(defn getAnnotations [ontology]
 (msc/lazer (:annotations ontology)))

(defn getOntologyIRI [ontology]
 (:ontologyIRI ontology))

(defn getVersionIRI [ontology]
 (:versionIRI ontology))

(defn- updateOntology [ontology object fun key]
 (update ontology key (fun (key ontology) object)))

(defn addAxiom [ontology axiom]
 (updateOntology ontology axiom (comp constantly conj) :axioms))

(defn addPrefix [ontology prefix]
 (updateOntology ontology prefix (comp constantly conj) :prefixes))

(defn addImport [ontology import]
 (updateOntology ontology import (comp constantly conj) :imports))

(defn addAnnotation [ontology annotation]
 (updateOntology ontology annotation (comp constantly conj) :annotations))

(defn dropAxiom [ontology axiom]
 (updateOntology ontology axiom (comp constantly disj) :axioms))

(defn dropPrefix [ontology prefix]
 (updateOntology ontology prefix (comp constantly disj) :prefixes))

(defn dropImport [ontology import]
 (updateOntology ontology import (comp constantly disj) :imports))

(defn dropAnnotation [ontology annotation]
 (updateOntology ontology annotation (comp constantly disj) :annotations))

(defn negate [class] 
 (nml/negate class))

(defn getClassNNF [class] 
 (nml/getClassNNF class))

(defn toClassImplications [classaxiom] 
 (nml/toClassImplications classaxiom))

(defn getNNF [axiom] 
 (nml/getNNF axiom))

(defn body [& atoms]
 (swrl/body atoms))

(defn head [& atoms] 
 (swrl/head atoms))

(defn iArg [arg] 
 (swrl/iArg arg))

(defn dArg [arg] 
 (swrl/dArg arg))

(defn variable [iri] 
 (swrl/variable iri))

(defn classAtom [class iarg] 
 (swrl/classAtom class iarg))

(defn dataRangeAtom [dataRange darg] 
 (swrl/dataRangeAtom dataRange darg))

(defn roleAtom [role iarg1 iarg2] 
 (swrl/roleAtom role iarg1 iarg2))

(defn dataRoleAtom [dataRole iarg darg] 
 (swrl/dataRoleAtom dataRole iarg darg))

(defn builtInAtom [iri dargs] 
 (swrl/builtInAtom iri dArg dargs))

(defn =individualsAtom [iarg1 iarg2] 
 (swrl/=individualsAtom iarg1 iarg2))

(defn !=individualsAtom [iarg1 iarg2] 
 (swrl/!=individualsAtom iarg1 iarg2))

(defn prefix [prefixName longIRI] 
 (onf/prefix prefixName longIRI))

(defn prefixes [prefixes] 
 (onf/prefixes prefixes))

(defn ontology
 ([] emptyOntology)
 ([directImports ontologyAnnotations axioms](onf/ontology directImports ontologyAnnotations axioms))
 ([ontologyIRI directImports ontologyAnnotations axioms](onf/ontology ontologyIRI directImports ontologyAnnotations axioms))
 ([ontologyIRI versionIRI directImports ontologyAnnotations axioms](onf/ontology ontologyIRI versionIRI directImports ontologyAnnotations axioms)))

(defn ontologyIRI [iri] 
 (onf/ontologyIRI iri))

(defn versionIRI [iri] 
 (onf/versionIRI iri))

(defn directImports [imports] 
 (onf/directImports imports))

(defn directImport [iri] 
 (onf/directImport iri))

(defn ontologyAnnotations [annotations] 
 (onf/ontologyAnnotations annotations))

(defn axioms [axioms] 
 (onf/axioms axioms))

(defn ontologyFile
 ([ontology](onf/ontologyFile ontology))
 ([prefixes ontology](onf/ontologyFile prefixes ontology)))

(defn declaration [& args]
 (apply ax/declaration (apply extractParams args)))

(defn dlSafeRule [& args]
  (apply ax/dlSafeRule (apply extractParams args)))

(defn dgRule [& args]
  (apply ax/dgRule (apply extractParams args)))

(defn classImplication [& args]
 (apply ax/classImplication (apply extractParams args)))

(defn =Classes [& args]
 (apply ax/=Classes (apply extractParamList args)))

(defn disjClasses [& args]
 (apply ax/disjClasses (apply extractParamList args)))

(defn disjOr [& args]
 (apply ax/disjOr (apply extractFirstParamFromList args)))

(defn roleChain 
 ([role1 role2](ax/roleChain role1 role2))
 ([role1 role2 & roles](ax/roleChain role1 role2 roles)))

(defn roleImplication [& args]
 (apply ax/roleImplication (apply extractParams args)))

(defn =Roles [& args]
 (apply ax/=Roles (apply extractParamList args)))

(defn disjRoles [& args]
 (apply ax/disjRoles (apply extractParamList args)))

(defn roleDomain [& args]
 (apply ax/roleDomain (apply extractParams args)))

(defn roleRange [& args]
 (apply ax/roleRange (apply extractParams args)))

(defn inverseRoles [& args]
 (apply ax/inverseRoles (apply extractParams args)))

(defn functionalRole [& args]
 (apply ax/functionalRole (apply extractParams args)))

(defn functionalInverseRole [& args]
 (apply ax/functionalInverseRole (apply extractParams args)))

(defn reflexiveRole [& args]
 (apply ax/reflexiveRole (apply extractParams args)))

(defn irreflexiveRole [& args]
 (apply ax/irreflexiveRole (apply extractParams args)))

(defn symmetricRole [& args]
 (apply ax/symmetricRole (apply extractParams args)))

(defn asymmetricRole [& args]
 (apply ax/asymmetricRole (apply extractParams args)))

(defn transitiveRole [& args]
 (apply ax/transitiveRole (apply extractParams args)))

(defn dataRoleImplication [& args]
 (apply ax/dataRoleImplication (apply extractParams args)))

(defn =DataRoles [& args]
 (apply ax/=DataRoles (apply extractParamList args)))

(defn disjDataRoles [& args]
 (apply ax/disjDataRoles (apply extractParamList args)))

(defn dataRoleDomain [& args]
 (apply ax/dataRoleDomain (apply extractParams args)))

(defn dataRoleRange [& args]
 (apply ax/dataRoleRange (apply extractParams args)))

(defn functionalDataRole [& args]
 (apply ax/functionalDataRole (apply extractParams args)))

(defn hasKey [& args]
 (apply ax/hasKey (apply extractParams args)))

(defn dataTypeDefinition [& args]
 (apply ax/dataTypeDefinition (apply extractParams args)))

(defn annotationFact [& args]
 (apply ax/annotationFact (apply extractParams args)))

(defn annotationImplication [& args]
 (apply ax/annotationImplication (apply extractParams args)))

(defn annotationDomain [& args]
 (apply ax/annotationDomain (apply extractParams args)))

(defn annotationRange [& args]
 (apply ax/annotationRange (apply extractParams args)))

(defn =individuals [& args]
 (apply fs/=individuals (apply extractParamList args)))

(defn !=individuals [& args]
 (apply fs/!=individuals (apply extractParamList args)))

(defn classFact [& args]
 (apply fs/classFact (apply extractParams args)))

(defn roleFact [& args]
 (apply fs/roleFact (apply extractParams args)))

(defn notRoleFact [& args]
 (apply fs/notRoleFact (apply extractParams args)))

(defn dataRoleFact [& args]
 (apply fs/dataRoleFact (apply extractParams args)))

(defn notDataRoleFact [& args]
 (apply fs/notDataRoleFact (apply extractParams args)))

(defn annotationRole
 ([iri](ann/annotationRole iri))
 ([iri namespace prefix](ann/annotationRole iri namespace prefix)))

(defn annotationValue [value]
 (ann/annotationValue value))

(defn metaAnnotations [annotations]
 (ann/metaAnnotations annotations))

(defn annotation [& args]
 (apply ann/annotation (apply extractParams args)))

(defn annotationSubject [subject]
 (ann/annotationSubject subject))

(defn axiomAnnotations [annotations]
  (ann/axiomAnnotations annotations))

(defn annotationDataType
 ([iri] (ann/annotationDataType iri))
 ([iri namespace prefix](ann/annotationDataType iri namespace prefix)))

(defn IRI
 ([iri](co/IRI iri))
 ([iri namespace prefix](co/IRI iri namespace prefix)))

(defn className
 ([iri](co/className iri))
 ([iri namespace prefix](co/className iri namespace prefix)))

(defn roleName
 ([iri](co/roleName iri))
 ([iri namespace prefix](co/roleName iri namespace prefix)))

(defn inverseRoleName
 ([iri](co/inverseRoleName iri))
 ([iri namespace prefix](co/inverseRoleName iri namespace prefix)))

(defn dataRoleName
 ([iri](co/dataRoleName iri))
 ([iri namespace prefix](co/dataRoleName iri namespace prefix)))

(defn individual
 ([iri](co/individual iri))
 ([iri namespace prefix](co/individual iri namespace prefix)))

(defn typedLiteral [lexicalForm datatype]
 (co/typedLiteral lexicalForm datatype))

(defn stringLiteralNoLanguage [string]
 (co/stringLiteralNoLanguage string))

(defn stringLiteralWithLanguage [string lang]
 (co/stringLiteralWithLanguage string lang))

(defn restrictedValue [facet restriction]
 (co/restrictedValue facet restriction))

(defn dataType
 ([iri]
  (co/dataType iri))
 ([iri namespace prefix]
  (co/dataType iri namespace prefix)))

(defn dataRange [dr]
 (co/dataRange dr))

(defn dataAnd 
 ([datarange1 datarange2]
  (co/dataAnd datarange1 datarange2))
 ([datarange1 datarange2 & dataranges]
  (co/dataAnd datarange1 datarange2 dataranges)))

(defn dataOr 
 ([datarange1 datarange2]
  (co/dataOr datarange1 datarange2))
 ([datarange1 datarange2 & dataranges]
  (co/dataOr datarange1 datarange2 dataranges)))

(defn dataNot [datarange]
 (co/dataNot datarange))

(defn dataOneOf
 ([literal](co/dataOneOf literal))
 ([literal & literals](co/dataOneOf literal literals)))

(defn datatypeRestriction [& args]
 (apply co/datatypeRestriction (apply extractFirstParamFromList args)))

(defn entity [thing]
 (co/entity thing))

(defn role
  ([iri](ex/role iri))
  ([iri namespace prefix](ex/role iri namespace prefix)))

(defn inverseRole
  ([iri](ex/inverseRole iri))
  ([iri namespace prefix](ex/inverseRole iri namespace prefix)))

(defn dataRole
  ([iri](ex/dataRole iri))
  ([iri namespace prefix](ex/dataRole iri namespace prefix)))

(defn -class
  ([iri](ex/class iri))
  ([iri namespace prefix](ex/class iri namespace prefix)))

(defn -and
  ([class1 class2](ex/and class1 class2))
  ([class1 class2 & classes](ex/and class1 class2 classes)))

(defn -or
  ([class1 class2](ex/or class1 class2))
  ([class1 class2 & classes](ex/or class1 class2 classes)))

(defn -not [c]
  (ex/not c))

(defn nominal
  ([individual](ex/nominal individual))
  ([individual & individuals](ex/nominal individual individuals)))

(defn existential [r c]
  (ex/existential r c))

(defn universal [r c]
  (ex/universal r c))

(defn partialRole [r i]
  (ex/partialRole r i))

(defn Self
  ([iri](ex/Self iri))
  ([iri namespace prefix](ex/Self iri namespace prefix)))

(defn >=role
  ([nat r](ex/>=role nat r))
  ([nat r c](ex/>=role nat r c)))

(defn <=role
  ([nat r](ex/<=role nat r))
  ([nat r c](ex/<=role nat r c)))

(defn =role
  ([nat r](ex/=role nat r))
  ([nat r c](ex/=role nat r c)))

(defn dataExistential [dataRoles dataRange]
  (ex/dataExistential dataRoles dataRange))

(defn dataUniversal [dataRoles dataRange]
  (ex/dataUniversal dataRoles dataRange))

(defn >=dataRole
  ([nat dr](ex/>=dataRole nat dr))
  ([nat dr dataRange](ex/>=dataRole nat dr dataRange)))

(defn <=dataRole
  ([nat dr](ex/<=dataRole nat dr))
  ([nat dr dataRange](ex/<=dataRole nat dr dataRange)))

(defn =dataRole
  ([nat dr](ex/=dataRole nat dr))
  ([nat dr dataRange](ex/=dataRole nat dr dataRange)))

(defn partialDataRole [dr literal]
  (ex/partialDataRole dr literal))

(def iriStopPat
 #"^(?:Annotation|Import|Declaration|SubClassOf|EquivalentClasses|DisjointClasses|DisjointUnion|SubObjectPropertyOf|EquivalentObjectProperties|SubObjectPropertyOf|DisjointObjectProperties|InverseObjectProperties|ObjectPropertyDomain|ObjectPropertyRange|FunctionalObjectProperty|InverseFunctionalObjectProperty|ReflexiveObjectProperty|IrreflexiveObjectProperty|SymmetricObjectProperty|AsymmetricObjectProperty|TransitiveObjectProperty|SubDataPropertyOf|EquivalentDataProperties|DisjointDataProperties|DataPropertyDomain|DataPropertyRange|FunctionalDataProperty|SameIndividual|DifferentIndividuals|ClassAssertion|ObjectPropertyAssertion|NegativeObjectPropertyAssertion|HasKey|DataPropertyAssertion|NegativeDataPropertyAssertion|AnnotationAssertion|SubAnnotationPropertyOf|AnnotationPropertyDomain|AnnotationPropertyRange|DatatypeDefinition|DGRule|DLSafeRule)[\s\S]*")
(def closeParenPat
 #"^(\))\s*([\s\S]*)")
(def axiomPat
 #"(Declaration|SubClassOf|EquivalentClasses|DisjointClasses|DisjointUnion|SubObjectPropertyOf|EquivalentObjectProperties|SubObjectPropertyOf|DisjointObjectProperties|InverseObjectProperties|ObjectPropertyDomain|ObjectPropertyRange|FunctionalObjectProperty|InverseFunctionalObjectProperty|ReflexiveObjectProperty|IrreflexiveObjectProperty|SymmetricObjectProperty|AsymmetricObjectProperty|TransitiveObjectProperty|SubDataPropertyOf|EquivalentDataProperties|DisjointDataProperties|DataPropertyDomain|DataPropertyRange|FunctionalDataProperty|SameIndividual|DifferentIndividuals|ClassAssertion|ObjectPropertyAssertion|NegativeObjectPropertyAssertion|HasKey|DataPropertyAssertion|NegativeDataPropertyAssertion|AnnotationAssertion|SubAnnotationPropertyOf|AnnotationPropertyDomain|AnnotationPropertyRange|DatatypeDefinition|DGRule|DLSafeRule)\s*\(\s*([\s\S]*)")
(def fullIRIPat
 #"^[<]([^>]+)[>]\s*([\s\S]*)")
(def prefIRIPat
 #"^([^\<\(\)\"\\\s]*:[^\>\(\)\"\\\s]+)\s*([\s\S]*)")
(def literalTypedPat
 #"^(\"[\s\S]*?(?<!\\)\")\^\^(?:(?:[<]([^>]+)[>])|([^\<\>\s\(\)\"\\]*\:[^\<\>\s\(\)\"\\]+))\s*([\s\S]*)")
(def literalQuotedPat
 #"^(\"[\s\S]*?(?<!\\)\")\s*([\s\S]*)")
(def literalLangPat
 #"^(\"[\s\S]*?(?<!\\)\")\@([^\s\(\)\"\\\:]+)\s*([\s\S]*)")
(def numPat
 #"^(\d+)\s*([\s\S]*)")
(def commPat
 #"^(#[^\r\n\f]*)([\s\S]*)")
(def blankPat
 #"^\s*$")
(def expressionPat
 #"(ObjectInverseOf|Class|Datatype|ObjectProperty|DataProperty|AnnotationProperty|NamedIndividual|ObjectPropertyChain|ObjectIntersectionOf|ObjectUnionOf|ObjectComplementOf|ObjectOneOf|ObjectSomeValuesFrom|ObjectAllValuesFrom|ObjectHasValue|ObjectHasSelf|ObjectMinCardinality|ObjectMaxCardinality|ObjectExactCardinality|DataSomeValuesFrom|DataAllValuesFrom|DataHasValue|DataMinCardinality|DataMaxCardinality|DataExactCardinality|DataIntersectionOf|DataUnionOf|DataComplementOf|DataOneOf|DatatypeRestriction|Variable|Body|Head|ClassAtom|DataRangeAtom|ObjectPropertyAtom|DataPropertyAtom|BuiltInAtom|SameIndividualAtom|DifferentIndividualsAtom)\s*\(\s*([\s\S]*)")
(def prefixPat
 #"^(?:Prefix)\s*\(\s*([^\)\:]*\:)=\s*<([^>]+)>\s*\)\s*([\s\S]*)")
(def annotationPat
 #"^(Annotation)\s*\(\s*([\s\S]*)")
(def ontPat
 #"^(Ontology)\s*\(\s*([\s\S]*)")
(def importPat
 #"^Import\s*\(\s*[<]([^>]+)[>]\s*\)\s*([\s\S]*)")

(defn- swapPrefixes [iri]
 (if (:prefix iri)
  (str (:prefix iri)(:short iri))
  (:iri iri)))

(defn- noPrefixes [iri]
 (case (:prefix iri)
  "Thing" "⊤"
  "Nothing" "⊥"
  "topObjectProperty" "U"
  "bottomObjectProperty" "∅"
  (:short iri)))

;TODO fix this => bad
(defn- smushPrefix [name prefixes]
 (let [splits (str/split name #":")
    key (str (get splits 0) ":")
    val (get splits 1)
    rep nil
    rep (str/join (map (fn [x] (if (= key (:prefix x)) (:iri x) rep)) prefixes))]
    (if rep [val rep key][name])))

;think old code?
(defn- parseIRI [name prefixes]
 (apply co/IRI (smushPrefix name prefixes)))

(defn- getDeclType [type]
 (case type
  :className "Class("
  :dataType "Datatype("
  :roleName "ObjectProperty("
  :dataRoleName "DataProperty("
  :annotationRole "AnnotationProperty("
  :namedIndividual "NamedIndividual("
  "Undefined("))

(defn toDLString [thing]
 (case (:innerType thing)

  ;not an OWL map
  nil (str "{" (str/join " " (map #(str % " " (if (% thing) (if (= clojure.lang.PersistentArrayMap (type (% thing))) (toDLString (% thing))(% thing)) "nil")) (keys thing))) "}")

  ;atoms
  :top "⊤"
  :bot "⊥"
  :roleTop "U"
  :roleBot "∅"
  :typedLiteral (:value thing)
  :stringLiteralNoLanguage (str (:prefix thing) (:value thing))
  :stringLiteralWithLanguage (str (:prefix thing) (:value thing))
  :dataType (swapPrefixes thing)
  :restrictedValue (str (swapPrefixes thing) " " (:value thing))
  :className (noPrefixes thing)
  :roleName (noPrefixes thing)
  :inverseRoleName (str (noPrefixes thing) "\u207B")
  :dataRoleName (noPrefixes thing)
  :namedIndividual (noPrefixes thing)
  :anonymousIndividual (:nodeID thing)
  :annotationRole (noPrefixes thing)
  :annotationSubject (noPrefixes thing)
  :annotationValue (noPrefixes thing)

  ;filestuff
  :ontology (str "Ontology(" (toDLString (:ontologyIRI thing)) (toDLString (:versionIRI thing)) "\n" (str/join "\n" (map (fn [x] (toDLString x)) (:imports thing))) "\n" (str/join "\n" (map (fn [x] (toDLString x)) (:annotations thing))) "\n" (str/join "\n" (map (fn [x] (toDLString x )) (:axioms thing))) ")")
  :ontologyIRI (:iri thing)
  :versionIRI (:iri thing)
  :prefix (str "Prefix(" (:prefix thing) "=<" (:iri thing) ">)")
  :prefixes (str (str/join "\n" (map toDLString (:prefixes thing))))
  :import (str "Import(" (:iri thing) ")")
  :declaration (str "Declaration(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) " ") "") (getDeclType (:innerType (:name thing))) (toDLString (:name thing) ) "))")

  ;data roles ⊑ ⊓ ⊔ ∃ ∀ ∘ ≡ ≤ ≥ ⊤ ⊥ U ∅ ¬
  :partialDataRole (str "∃" (toDLString (:dataRole thing)) "[" (:value (:literal thing)) "]")
  :=dataRole (str "=" (:nat thing) (toDLString (:dataRole thing)) ".[" (toDLString (:dataRange thing)) "]")
  :<=dataRole (str "≤" (:nat thing) (toDLString (:dataRole thing)) ".["  (toDLString (:dataRange thing)) "]")
  :>=dataRole (str "≥" (:nat thing) (toDLString (:dataRole thing)) ".[" (toDLString (:dataRange thing)) "]")
  :dataExistential (str "∃" (str/join " " (map (fn [x] (toDLString x)) (:dataRoles thing))) ".[" (toDLString (:dataRange thing)) "]")
  :dataUniversal (str "∀" (str/join " " (map (fn [x] (toDLString x)) (:dataRoles thing))) ".[" (toDLString (:dataRange thing)) "]")

  ;roles
  :roleChain (str/join " ∘ " (map (fn [x] (toDLString x)) (:roles thing)))
  :partialRole (str "∃" (toDLString (:role thing)) "{" (:short (:individual thing)) "}")
  :=role (str "=" (:nat thing) (toDLString (:role thing)) (str "."  (if (:class thing) (toDLString (:class thing)) "⊤")))
  :<=role (str "≤" (:nat thing) (toDLString (:role thing))  (str "." (if (:class thing) (toDLString (:class thing)) "⊤")))
  :>=role (str "≥" (:nat thing) (toDLString (:role thing))  (str "."  (if (:class thing) (toDLString (:class thing)) "⊤")))
  :existential (str "∃" (toDLString (:role thing)) "." (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "(" (toDLString (:class thing)) ")") (toDLString (:class thing))))
  :universal (str "∀" (toDLString (:role thing)) "." (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "(" (toDLString (:class thing)) ")") (toDLString (:class thing))))

  ;classes
  :not (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "¬(" (toDLString (:class thing)) ")")(str "¬" (toDLString (:class thing))))
  :or (str/join " ⊔ " (map (fn [x] (if (or (= (:innerType x) :or)(= (:innerType x) :and)) (str "(" (toDLString x) ")")(toDLString x))) (:classes thing)))
  :and (str/join " ⊓ " (map (fn [x] (if (or (= (:innerType x) :or)(= (:innerType x) :and)) (str "(" (toDLString x) ")")(toDLString x))) (:classes thing)))
  :dataNot (str "¬" (toDLString (:dataRange thing)))
  :dataOr (str/join " ∨ " (map (fn [x] (if (or (= (:innerType x) :dataOr)(= (:innerType x) :dataAnd)) (str "(" (toDLString x) ")")(toDLString x))) (:dataRanges thing)))
  :dataAnd (str/join " ∧ " (map (fn [x] (if (or (= (:innerType x) :dataOr)(= (:innerType x) :dataAnd)) (str "(" (toDLString x) ")")(toDLString x))) (:dataRanges thing)))
  :dataOneOf (str "[" (str/join "," (map (fn [x] (:value x)) (:literals thing))) "]")
  :datatypeRestriction (str "DatatypeRestriction(" (:prefix thing) (:short thing) " " (str/join " " (map toDLString (:restrictedValues thing)))")")
  :Self  (str "∃" (:role thing) ".Self")
  :nominal (str "{" (str/join " " (map (fn [x] (toDLString x)) (:individuals thing))) "}")

  ;annotation
  :annotation (str (toDLString (:annotationRole thing)) "("  (toDLString (:annotationValue thing)) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :axiomAnnotations (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")")
  :metaAnnotations (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")")
  :annotationFact (str (toDLString (:annotationRole thing)) "(" (toDLString (:annotationSubject thing) ) ","  (toDLString (:annotationValue thing)) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :annotationImplication (str (toDLString (:antecedent thing)) " ⊑ " (toDLString (:consequent thing) ) (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))

  ;assertions
  :=individuals (str "={" (str/join "," (map (fn [x] (toDLString x)) (:individuals thing))) "}" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :!=individuals  (str "!={" (str/join "," (map (fn [x] (toDLString x)) (:individuals thing))) "}" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :classFact (str (toDLString (:class thing)) "(" (toDLString (:individual thing)) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :roleFact (str (toDLString (:role thing)) "(" (toDLString (:fromIndividual thing)) "," (toDLString (:toIndividual thing)) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :notRoleFact (str "¬" (toDLString (:role thing)) "(" (toDLString (:fromIndividual thing)) "," (toDLString (:toIndividual thing)) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :dataRoleFact (str (toDLString (:dataRole thing)) "(" (toDLString (:fromIndividual thing)) "," (toDLString (:toLiteral thing)) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :notDataRoleFact (str "¬"  (toDLString (:dataRole thing)) "(" (toDLString (:fromIndividual thing)) "," (toDLString (:toLiteral thing)) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))

  ;axioms
  :hasKey (str "HasKey(" (toDLString (:class thing) ) " (" (str/join " " (map (fn [x] (toDLString x )) (:roles thing))) ") (" (str/join " " (map (fn [x] (toDLString x )) (:dataRoles thing))) ") )" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :annotationDomain (str "AnnotationRoleDomain("  (toDLString (:annotationRole thing) ) " " (noPrefixes (:iri thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :annotationRange (str "AnnotationRoleRange("  (toDLString (:annotationRole thing) ) " " (noPrefixes (:iri thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :classImplication (str (toDLString (:antecedentClass thing) ) " ⊑ " (toDLString (:consequentClass thing) ) (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :=Classes (str  (str/join " ≡ " (map (fn [x] (toDLString x )) (:classes thing))) (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :disjClasses (str "disjClasses(" (str/join "," (map (fn [x] (toDLString x )) (:classes thing))) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :disjOr (str (toDLString (:class thing) ) " ≡ U(" (toDLString (:classes thing) ) ")" (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")"))
  :roleImplication  (str  (toDLString (:antecedentRole thing) ) " ⊑ " (toDLString (:consequentRole thing) ) (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :=Roles (str (str/join " ≡ " (map (fn [x] (toDLString x )) (:roles thing))) (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :disjRoles (str "disjRoles("  (str/join " " (map (fn [x] (toDLString x )) (:roles thing))) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :inverseRoles (str "InverseRoles("  (toDLString (:role thing) ) (toDLString (:inverse thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :roleDomain (str "RoleDomain("  (toDLString (:role thing) ) " " (toDLString (:class thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :roleRange (str "RoleRange("  (toDLString (:role thing) ) " " (toDLString (:class thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :functionalRole (str "FunctionalRole("  (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :functionalInverseRole (str "InverseFunctionalRole("  (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :reflexiveRole (str "ReflexiveRole("  (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :irreflexiveRole (str "IrreflexiveRole("  (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :symmetricRole (str "SymmetricRole("  (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :asymmetricRole (str "AsymmetricRole("  (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :transitiveRole (str "TransitiveRole(" (toDLString (:role thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :dataRoleImplication (str (toDLString (:antecedentDataRole thing) ) " ⊑ " (toDLString (:consequentDataRole thing) ) (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :=DataRoles (str (str/join " ≡ " (map (fn [x] (toDLString x )) (:dataRoles thing))) (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :disjDataRoles (str "disjDataRoles("  (str/join " " (map (fn [x] (toDLString x )) (:dataRoles thing))) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :dataRoleDomain (str "DataRoleDomain(" (toDLString (:dataRole thing) ) " " (toDLString (:class thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :dataRoleRange (str "DataRoleRange("  (toDLString (:dataRole thing) ) " " (toDLString (:dataRange thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :functionalDataRole (str "FunctionalDataRole(" (toDLString (:dataRole thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :newDataType (str "DatatypeDefinition("  (toDLString (:dataType thing) ) " " (toDLString (:dataRange thing) ) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))

  ;SWRL
  :dlSafeRule (str "DLSafeRule(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) " ") "") "Body(" (str/join " " (map (fn [x] (toDLString x)) (:body thing))) ") Head(" (str/join " " (map (fn [x] (toDLString x)) (:head thing))) "))")
  :classAtom (str "ClassAtom(" (toDLString (:class thing)) " " (toDLString (:iarg thing)) ")")
  :dataRangeAtom (str "DataRangeAtom(" (toDLString (:dataRange thing)) " " (toDLString (:darg thing)) ")")
  :roleAtom (str "ObjectPropertyAtom(" (toDLString (:role thing)) " " (toDLString (:iarg1 thing)) " " (toDLString (:iarg2 thing)) ")")
  :dataRoleAtom (str "DataPropertyAtom(" (toDLString (:dataRole thing)) " " (toDLString (:iarg thing)) " " (toDLString (:darg thing)) ")")
  :builtInAtom (str "BuiltInAtom(" (toDLString (:iri thing)) " " (str/join " " (map (fn [x] (toDLString x)) (:dargs thing))) ")")
  :=individualsAtom (str "SameIndividualAtom(" (toDLString (:iarg1 thing)) (toDLString (:iarg2 thing)) ")")
  :!=individualsAtom (str "DifferentIndividualsAtom(" (toDLString (:iarg1 thing)) (toDLString (:iarg2 thing)) ")")
  :variable (str "Variable(" (:iri thing) ")")))

(defn toString [thing]
 (case (:innerType thing)

  ;Not an OWL map
  nil (str "{" (str/join " " (map #(str % " " (if (% thing) (if (= clojure.lang.PersistentArrayMap (type (% thing))) (toString (% thing))(% thing)) "nil")) (keys thing))) "}")

  ;atoms
  :typedLiteral (:value thing)
  :stringLiteralNoLanguage (str (:prefix thing) (:value thing))
  :stringLiteralWithLanguage (str (:prefix thing) (:value thing))
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
  :anonymousIndividual (:nodeID thing)
  :annotationRole (swapPrefixes thing)
  :annotationSubject (swapPrefixes thing)
  :annotationValue (swapPrefixes thing)

  ;filestuff
  :ontology (str "Ontology(" (toString (:ontologyIRI thing)) (toString (:versionIRI thing)) "\n" (str/join "\n" (map (fn [x] (toString x)) (:imports thing))) "\n" (str/join "\n" (map (fn [x] (toString x )) (:annotations thing))) "\n" (str/join "\n" (map (fn [x] (toString x )) (:axioms thing))) ")")
  :ontologyIRI (:iri thing)
  :versionIRI (:iri thing)
  :prefix (str "Prefix(" (:prefix thing) "=<" (:iri thing) ">)")
  :prefixes (str (str/join "\n" (map toString (:prefixes thing))))
  :import (str "Import(" (:iri thing) ")")
  :declaration (str "Declaration(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (getDeclType (:innerType (:name thing))) (toString (:name thing) ) "))")

  ;data roles
  :partialDataRole (str "DataHasValue(" (toString (:dataRole thing)) " " (:value (:literal thing)) ")")
  :=dataRole (str "DataExactCardinality(" (:nat thing) " " (toString (:dataRole thing)) (if (:dataRange thing) (str " " (toString (:dataRange thing)))) ")")
  :<=dataRole (str "DataMaxCardinality(" (:nat thing) " " (toString (:dataRole thing) ) (if (:dataRange thing) (str " " (toString (:dataRange thing))))")")
  :>=dataRole (str "DataMinCardinality(" (:nat thing) " " (toString (:dataRole thing) ) (if (:dataRange thing) (str " " (toString (:dataRange thing))))")")
  :dataExistential (str "DataSomeValuesFrom(" (str/join " " (map (fn [x] (toString x )) (:dataRoles thing))) " " (toString (:dataRange thing) ) ")")
  :dataUniversal (str "DataAllValuesFrom(" (str/join " " (map (fn [x] (toString x )) (:dataRoles thing))) " " (toString (:dataRange thing) ) ")")

  ;roles
  :roleChain (str "ObjectPropertyChain(" (str/join " " (map (fn [x] (toString x )) (:roles thing))) ")")
  :partialRole (str "ObjectHasValue(" (toString (:role thing) ) " " (toString (:individual thing)) ")")
  :=role (str "ObjectExactCardinality(" (:nat thing) " " (toString (:role thing)) (if (:class thing) (str " " (toString (:class thing))))")")
  :<=role (str "ObjectMaxCardinality(" (:nat thing) " " (toString (:role thing)) (if (:class thing) (str " " (toString (:class thing))))")")
  :>=role (str "ObjectMinCardinality(" (:nat thing) " " (toString (:role thing)) (if (:class thing) (str " " (toString (:class thing))))")")
  :existential (str "ObjectSomeValuesFrom(" (toString (:role thing) ) " " (toString (:class thing) ) ")")
  :universal (str "ObjectAllValuesFrom(" (toString (:role thing) ) " " (toString (:class thing) ) ")")

  ;classes
  :not (str "ObjectComplementOf(" (toString (:class thing) ) ")")
  :or (str "ObjectUnionOf(" (str/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :and (str "ObjectIntersectionOf(" (str/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :dataNot (str "DataComplementOf(" (toString (:dataRange thing) ) ")")
  :dataOr (str "DataUnionOf(" (str/join " " (map (fn [x] (toString x )) (:dataRanges thing))) ")")
  :dataAnd (str "DataIntersectionOf(" (str/join " " (map (fn [x] (toString x )) (:dataRanges thing))) ")")
  :dataOneOf (str "DataOneOf(" (str/join " " (map (fn [x] (:value x)) (:literals thing))) ")")
  :datatypeRestriction (str "DatatypeRestriction(" (:prefix thing) (:short thing) " " (str/join " " (map toString (:restrictedValues thing))) ")")
  :Self (str "ObjectHasSelf(" (toString (:role thing)) ")")
  :nominal (str "ObjectOneOf("(str/join " " (map (fn [x] (toString x)) (:individuals thing))) ")")

  ;annotation
  :annotation (str "Annotation(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:annotationRole thing) ) " "  (toString (:annotationValue thing) ) ")")
  :axiomAnnotations (str (str/join " " (map (fn [x] (toString x )) (:annotations thing))) " ")
  :metaAnnotations (str (str/join " " (map (fn [x] (toString x )) (:annotations thing))) " ")
  :annotationFact (str "AnnotationAssertion(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:annotationRole thing)) " " (toString (:annotationSubject thing)) " "  (toString (:annotationValue thing)) ")")
  :annotationImplication (str "SubAnnotationPropertyOf(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:antecedent thing) ) " " (toString (:consequent thing) )")")

  ;assertions
  :=individuals (str "SameIndividual(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (str/join " " (map (fn [x] (toString x )) (:individuals thing))) ")")
  :!=individuals  (str "DifferentIndividuals(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (str/join " " (map (fn [x] (toString x )) (:individuals thing))) ")")
  :classFact (str "ClassAssertion(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:class thing) ) " " (toString (:individual thing) ) ")")
  :roleFact (str "ObjectPropertyAssertion(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) " " (toString (:fromIndividual thing) ) " " (toString (:toIndividual thing) ) ")")
  :notRoleFact (str "NegativeObjectPropertyAssertion(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing)) " " (toString (:fromIndividual thing) ) " " (toString (:toIndividual thing) ) ")")
  :dataRoleFact (str "DataPropertyAssertion(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:dataRole thing) ) " " (toString (:fromIndividual thing) ) " " (toString (:toLiteral thing) ) ")")
  :notDataRoleFact (str "NegativeDataPropertyAssertion(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:dataRole thing) ) " " (toString (:fromIndividual thing) ) " " (toString (:toLiteral thing) ) ")")

  ;axioms
  :hasKey (str "HasKey(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:class thing) ) " (" (str/join " " (map (fn [x] (toString x )) (:roles thing))) ") (" (str/join " " (map (fn [x] (toString x )) (:dataRoles thing))) ") )")
  :annotationDomain (str "AnnotationPropertyDomain(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:annotationRole thing) ) " " (swapPrefixes (:iri thing) ) ")")
  :annotationRange (str "AnnotationPropertyRange(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:annotationRole thing) ) " " (swapPrefixes (:iri thing) ) ")")
  :classImplication (str "SubClassOf(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:antecedentClass thing) ) " " (toString (:consequentClass thing) ) ")")
  :=Classes (str "EquivalentClasses(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (str/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :disjClasses (str "DisjointClasses(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (str/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :disjOr (str "DisjointUnion(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:class thing) ) " " (str/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :roleImplication  (str "SubObjectPropertyOf(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:antecedentRole thing) ) " " (toString (:consequentRole thing) ) ")")
  :=Roles (str "EquivalentObjectProperties(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (str/join " " (map (fn [x] (toString x )) (:roles thing))) ")")
  :disjRoles (str "DisjointObjectProperties(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (str/join " " (map (fn [x] (toString x )) (:roles thing))) ")")
  :inverseRoles (str "InverseObjectProperties(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) " " (toString (:inverse thing) ) ")")
  :roleDomain (str "ObjectPropertyDomain(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) " " (toString (:class thing) ) ")")
  :roleRange (str "ObjectPropertyRange(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) " " (toString (:class thing) ) ")")
  :functionalRole (str "FunctionalObjectProperty(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :functionalInverseRole (str "InverseFunctionalObjectProperty(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :reflexiveRole (str "ReflexiveObjectProperty(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :irreflexiveRole (str "IrreflexiveObjectProperty(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :symmetricRole (str "SymmetricObjectProperty(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :asymmetricRole (str "AsymmetricObjectProperty(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :transitiveRole (str "TransitiveObjectProperty(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:role thing) ) ")")
  :dataRoleImplication (str "SubDataPropertyOf(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:antecedentDataRole thing) ) " " (toString (:consequentDataRole thing) ) ")")
  :=DataRoles (str "EquivalentDataProperties(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (str/join " " (map (fn [x] (toString x )) (:dataRoles thing))) ")")
  :disjDataRoles (str "DisjointDataProperties(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (str/join " " (map (fn [x] (toString x )) (:dataRoles thing))) ")")
  :dataRoleDomain (str "DataPropertyDomain(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:dataRole thing) ) " " (toString (:class thing) ) ")")
  :dataRoleRange (str "DataPropertyRange(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:dataRole thing) ) " " (toString (:dataRange thing) ) ")")
  :functionalDataRole (str "FunctionalDataProperty(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:dataRole thing) ) ")")
  :newDataType (str "DatatypeDefinition(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:dataType thing) ) " " (toString (:dataRange thing) ) ")")

  ;swrl
  :classAtom (str "ClassAtom(" (toString (:class thing)) " " (toString (:iarg thing)) ")")
  :dataRangeAtom (str "DataRangeAtom(" (toString (:dataRange thing)) " " (toString (:darg thing)) ")")
  :roleAtom (str "ObjectPropertyAtom(" (toString (:role thing)) " " (toString (:iarg1 thing)) " " (toString (:iarg2 thing)) ")")
  :dataRoleAtom (str "DataPropertyAtom(" (toString (:dataRole thing)) " " (toString (:iarg thing)) " " (toString (:darg thing)) ")")
  :builtInAtom (str "BuiltInAtom(" (toString (:iri thing)) " " (str/join " " (map (fn [x] (toString x)) (:dargs thing))) ")")
  :=individualsAtom (str "SameIndividualAtom(" (toString (:iarg1 thing)) (toString (:iarg2 thing)) ")")
  :!=individualsAtom (str "DifferentIndividualsAtom(" (toString (:iarg1 thing)) (toString (:iarg2 thing)) ")")
  :variable (str "Variable(" (:iri thing) ")")
  :dlSafeRule (str "DLSafeRule(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") "Body(" (str/join " " (map (fn [x] (toString x)) (:body thing))) ") Head(" (str/join " " (map (fn [x] (toString x)) (:head thing))) "))")))

(defmethod print-method clojure.lang.PersistentArrayMap [x w](.write w (toString x)))
;(defmethod print-method clojure.lang.PersistentArrayMap [x w](.write w (toDLString x)))

(defn- getType [type]
 (case type
  "Import" directImport
  "Class" (comp entity className)
  "Datatype" (comp entity dataType)
  "ObjectProperty" (comp entity roleName)
  "DataProperty" (comp entity dataRoleName)
  "AnnotationProperty"(comp entity annotationRole)
  "NamedIndividual" (comp entity individual)
  "Annotation" annotation
  "Declaration" declaration
  "HasKey" hasKey
  "ObjectInverseOf" inverseRole
  "DataIntersectionOf" dataAnd
  "DataUnionOf" dataOr
  "DataComplementOf" dataNot
  "DataOneOf" dataOneOf
  "DatatypeRestriction" datatypeRestriction
  "ObjectIntersectionOf" -and
  "ObjectUnionOf" -or
  "ObjectComplementOf" -not
  "ObjectOneOf" nominal
  "ObjectSomeValuesFrom" existential
  "ObjectAllValuesFrom" universal
  "ObjectHasValue" partialRole
  "ObjectHasSelf" Self
  "ObjectMinCardinality" >=role
  "ObjectMaxCardinality" <=role
  "ObjectExactCardinality" =role
  "DataSomeValuesFrom" dataExistential
  "DataAllValuesFrom" dataUniversal
  "DataMinCardinality" >=dataRole
  "DataExactCardinality" =dataRole
  "SubClassOf" classImplication
  "EquivalentClasses" =Classes
  "DisjointUnion" disjOr
  "DisjointClasses" disjClasses
  "SubObjectPropertyOf" roleImplication
  "EquivalentObjectProperties" =Roles
  "DisjointObjectProperties" disjRoles
  "InverseObjectProperties" inverseRoles
  "ObjectPropertyDomain" roleDomain
  "ObjectPropertyRange" roleRange
  "FunctionalObjectProperty" functionalRole
  "InverseFunctionalObjectProperty" functionalInverseRole
  "ReflexiveObjectProperty" reflexiveRole
  "IrreflexiveObjectProperty" irreflexiveRole
  "SymmetricObjectProperty" symmetricRole
  "AsymmetricObjectProperty" asymmetricRole
  "TransitiveObjectProperty" transitiveRole
  "SubDataPropertyOf" dataRoleImplication
  "EquivalentDataProperties" =DataRoles
  "DisjointDataProperties" disjDataRoles
  "DataPropertyDomain" dataRoleDomain
  "DataPropertyRange" dataRoleRange
  "FunctionalDataProperty" functionalDataRole
  "AnnotationAssertion" annotationFact
  "AnnotationPropertyDomain" annotationDomain
  "AnnotationPropertyRange" annotationRange
  "DataHasValue" ex/partialDataRole
  "DataMaxCardinality" ex/<=dataRole
  "ObjectPropertyChain" roleChain
  "SubAnnotationPropertyOf" annotationImplication
  "SameIndividual" =individuals
  "DifferentIndividuals" !=individuals
  "ClassAssertion" classFact
  "ObjectPropertyAssertion" roleFact
  "NegativeObjectPropertyAssertion" notRoleFact
  "DataPropertyAssertion" dataRoleFact
  "NegativeDataPropertyAssertion" notDataRoleFact
  "DatatypeDefinition" dataTypeDefinition
  "DLSafeRule" dlSafeRule
  "Body" body
  "Head" head
  "Variable" variable
  "ClassAtom" classAtom
  "DataRangeAtom" dataRangeAtom
  "ObjectPropertyAtom" roleAtom
  "DataPropertyAtom" dataRoleAtom
  "BuiltInAtom" builtInAtom
  "SameIndividualAtom" =individualsAtom
  "DifferentIndividualsAtom" !=individualsAtom
  "DescriptionGraphRule" dgRule))

(defn makeOWLFile
 ([filename ontology]
  (makeOWLFile filename (:prefixes ontology) (:ontologyIRI ontology) (:versionIRI ontology) (:imports ontology) (:annotations ontology) (:axioms ontology)))
 ([filename prefixes ontologyIRI versionIRI imports annotations axioms]
  (with-open [wrt (io/writer filename)]
   (do 
    (doseq [prefix prefixes] (.write wrt (str (toString prefix) "\n")))
    (if (not (empty? prefixes)) (.write wrt "\n\n"))
    (.write wrt "Ontology(")
    (.write wrt (if ontologyIRI (str (toString ontologyIRI) "\n" (if versionIRI (str (toString versionIRI) "\n")))"\n"))
    (doseq [im imports] (.write wrt (str (toString im) "\n")))
    (if (not (empty? imports)) (.write wrt "\n"))
    (doseq [ann annotations] (.write wrt (str (toString ann) "\n")))
    (if (not (empty? annotations)) (.write wrt "\n"))
    (doseq [axiom axioms](.write wrt (str (toString axiom) "\n")))
    (.write wrt ")")))))

(defn- parsePrefixLine [state prefixes _ _ _ _]
 (loop [state state
        prefixes prefixes]
 (if-some [blankMatch (re-matches blankPat state)]
  [state prefixes]
 (if-some [commMatch (re-matches commPat state)]
  [(get commMatch 2) prefixes]
 (if-some [ontMatch (re-matches ontPat state)]
  [state prefixes]
 (if-some [prefMatch (re-matches prefixPat state)]
   (recur (get prefMatch 3) (conj! prefixes (apply prefix [(get prefMatch 1)(get prefMatch 2)])))
 [state prefixes]))))))

(defn- parseOntologyIRILine [state ontologyIRI _ _ _ _]
 (loop [state state
        ontologyIRI ontologyIRI]
 (if-some [doneMatch (re-matches closeParenPat state)]
  [state ontologyIRI]
 (if-some [blankMatch (re-matches blankPat state)]
  [state ontologyIRI]
 (if-some [ontMatch (re-matches ontPat state)]
  (recur (get ontMatch 2) ontologyIRI)
 (if-some [fullIRIMatch (re-matches fullIRIPat state)]
  [(get fullIRIMatch 2) (conj! ontologyIRI (co/IRI (get fullIRIMatch 1)))]
 (if-some [commMatch (re-matches commPat state)]
  [(get commMatch 2) ontologyIRI]
 (if-some [importMatch (re-matches importPat state)]
  [state ontologyIRI]
 (if-some [annMatch (re-matches annotationPat state)]
  [state ontologyIRI]
 (if-some [axMatch (re-matches axiomPat state)]
  [state ontologyIRI]))))))))))

(defn- parseVersionIRILine [state versionIRI _ _ _ _]
 (loop [state state
        versionIRI versionIRI]
 (if-some [doneMatch (re-matches closeParenPat state)]
  [state versionIRI]
 (if-some [blankMatch (re-matches blankPat state)]
  [state versionIRI]
 (if-some [fullIRIMatch (re-matches fullIRIPat state)]
  [(get fullIRIMatch 2) (conj! versionIRI (co/IRI (get fullIRIMatch 1)))]
 (if-some [commMatch (re-matches commPat state)]
  [(get commMatch 2) versionIRI]
 (if-some [importMatch (re-matches importPat state)]
  [state versionIRI]
 (if-some [annMatch (re-matches annotationPat state)]
  [state versionIRI]
 (if-some [axMatch (re-matches axiomPat state)]
  [state versionIRI])))))))))

(defn- firstFromVec [[x y]]
 [(first x) y])

(defn- parseImportLine [state imports _ _ _ _]
 (loop [state state
        imports imports]
 (if-some [doneMatch (re-matches closeParenPat state)]
  [state imports]
 (if-some [blankMatch (re-matches blankPat state)]
  [state imports]
 (if-some [commMatch (re-matches commPat state)]
  [(get commMatch 2) imports]
 (if-some [annMatch (re-matches annotationPat state)]
  [state imports]
 (if-some [importMatch (re-matches importPat state)]
  (recur (get importMatch 2) (conj! imports (directImport (co/IRI (get importMatch 1)))))
 (if-some [axMatch (re-matches axiomPat state)]
  [state imports]))))))))

(defn- parseAnnotationLine [state annotations annFun exps expFuns prefixes]
 (loop [state state
        annotations annotations
        annFun annFun
        exps exps
        expFuns expFuns]
 (if-some [doneMatch (re-matches closeParenPat state)]
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
 (if-some [commMatch (re-matches commPat state)]
  [(get commMatch 2) annotations annFun exps expFuns]
 (if-some [blankMatch (re-matches blankPat state)]
  [state annotations annFun exps expFuns]
 (if-some [fullIRIMatch (re-matches fullIRIPat state)]
  (recur (get fullIRIMatch 2) annotations annFun (conj (rest exps) (conj (first exps) (co/IRI (get fullIRIMatch 1)))) expFuns)
 (if-some [prefIRIMatch (re-matches prefIRIPat state)]
  (recur (get prefIRIMatch 2) annotations annFun (conj (rest exps) (conj (first exps) (parseIRI (get prefIRIMatch 1) prefixes))) expFuns)
 (if-some [literalTypedMatch (re-matches literalTypedPat state)]
  (recur (get literalTypedMatch 4) annotations annFun (conj (rest exps) (conj (first exps) (co/typedLiteral (get literalTypedMatch 1) (if (some? (get literalTypedMatch 2)) (co/dataType (get literalTypedMatch 2)) (apply co/dataType (smushPrefix (get literalTypedMatch 3) prefixes)))))) expFuns)
 (if-some [literalLangMatch (re-matches literalLangPat state)]
  (recur (get literalLangMatch 3) annotations annFun (conj (rest exps) (conj (first exps) (co/stringLiteralWithLanguage (get literalLangMatch 1)(get literalLangMatch 2)))) expFuns)
 (if-some [literalQuotedMatch (re-matches literalQuotedPat state)]
  (recur (get literalQuotedMatch 2) annotations annFun (conj (rest exps) (conj (first exps) (co/stringLiteralNoLanguage (get literalQuotedMatch 1)))) expFuns)
 (if-some [annMatch (re-matches annotationPat state)]
  (if (nil? annFun)
   (recur (get annMatch 2) annotations annotation exps expFuns)
   (recur (get annMatch 2) annotations annFun (conj exps []) (conj expFuns annotation)))
 (if-some [axMatch (re-matches axiomPat state)]
  [state annotations annFun exps expFuns]
 [(str state "\n") annotations annFun exps expFuns]))))))))))))

(defn- parseAxiomLine [state axioms ax exs funs prefixes]
 (loop [state state
        axioms axioms
        axFun ax
        exps exs
        expFuns funs]
 (if-some [doneMatch (re-matches closeParenPat state)]
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
 (if-some [commMatch (re-matches commPat state)]
  [(get commMatch 2) axioms axFun exps expFuns]
 (if-some [blankMatch (re-matches blankPat state)]
  [state axioms axFun exps expFuns]
 (if-some [numMatch (re-matches numPat state)]
    (recur (get numMatch 2) axioms axFun (conj (rest exps) (conj (first exps) (read-string (get numMatch 1)))) expFuns)
 (if-some [fullIRIMatch (re-matches fullIRIPat state)]
   (recur (get fullIRIMatch 2) axioms axFun (conj (rest exps) (conj (first exps) (co/IRI (get fullIRIMatch 1)))) expFuns)
 (if-some [prefIRIMatch (re-matches prefIRIPat state)]
   (recur (get prefIRIMatch 2) axioms axFun (conj (rest exps) (conj (first exps) (parseIRI (get prefIRIMatch 1) prefixes))) expFuns)
 (if-some [literalTypedMatch (re-matches literalTypedPat state)]
   (recur (get literalTypedMatch 4) axioms axFun (conj (rest exps) (conj (first exps) (co/typedLiteral (get literalTypedMatch 1) (if (some? (get literalTypedMatch 2)) (co/dataType (get literalTypedMatch 2)) (apply co/dataType (smushPrefix (get literalTypedMatch 3) prefixes)))))) expFuns)
 (if-some [literalLangMatch (re-matches literalLangPat state)]
   (recur (get literalLangMatch 3) axioms axFun (conj (rest exps) (conj (first exps) (co/stringLiteralWithLanguage (get literalLangMatch 1)(get literalLangMatch 2)))) expFuns)
 (if-some [literalQuotedMatch (re-matches literalQuotedPat state)]
   (recur (get literalQuotedMatch 2) axioms axFun (conj (rest exps) (conj (first exps) (co/stringLiteralNoLanguage (get literalQuotedMatch 1)))) expFuns)
 (if-some [annMatch (re-matches annotationPat state)]
  (recur (get annMatch 2) axioms axFun (conj exps []) (conj expFuns annotation))
 (if-some [axMatch (re-matches axiomPat state)]
  (recur (get axMatch 2) axioms (getType (get axMatch 1)) exps expFuns)
 (if-some [exMatch (re-matches expressionPat state)]
  (recur (get exMatch 2) axioms axFun (conj exps []) (conj expFuns (getType (get exMatch 1))))
 [(str state "\n") axioms axFun exps expFuns]))))))))))))))

(defn- parseLines
  ([lineSeq loopFunction stopCondition prefixes]
  (loop [state (first lineSeq)
         lines lineSeq
         objects (transient #{})
         function nil
         expressions '([])
         functionList '()]
  (let [[state objects function expressions functionList] (loopFunction state objects function expressions functionList prefixes)]
   (if (stopCondition [objects state lines])
    [(persistent! objects) (lazy-seq (cons state (if (some? lines)(rest lines))))]
    (recur (str state (first (rest lines))) (rest lines) objects function expressions functionList))))))

(defn readFunctionalFile [file]
 (with-open [rdr (io/reader file)]
  (let [ontFile (line-seq rdr)
   [prefixes ontFile] (parseLines ontFile parsePrefixLine #(some? (re-matches ontPat (get % 1))) nil)
   [ontologyIRI ontFile] (firstFromVec (parseLines ontFile parseOntologyIRILine #(or (= 1 (count (get % 0)))(or (some? (re-matches iriStopPat (get % 1)))(or (some? (re-matches #"^\s*\)\s*$" (get % 1)))(empty? (rest (get % 2)))))) nil))
   [versionIRI ontFile] (firstFromVec (parseLines ontFile parseVersionIRILine #(or (= 1 (count (get % 0)))(or (some? (re-matches iriStopPat (get % 1)))(or (some? (re-matches #"^\s*\)\s*$" (get % 1)))(empty? (rest (get % 2)))))) nil))
   [imports ontFile] (parseLines ontFile parseImportLine #(or (some? (re-matches annotationPat (get % 1)))(or (some? (re-matches axiomPat (get % 1)))(or (some? (re-matches #"^\s*\)\s*$" (get % 1)))(empty? (rest (get % 2)))))) nil)
   [annotations ontFile] (parseLines ontFile parseAnnotationLine #(or (re-find axiomPat (get % 1))(or (some? (re-matches #"^\s*\)\s*$" (get % 1)))(empty? (rest (get % 2))))) prefixes)
   [axioms lastParen] (parseLines ontFile parseAxiomLine #(and (some? (re-matches #"^\s*\)\s*$" (get % 1)))(empty? (rest (get % 2)))) prefixes)]
   (cond
    (and (some? ontologyIRI)(some? versionIRI))(ontologyFile prefixes (ontology ontologyIRI versionIRI imports annotations axioms))
    (some? ontologyIRI)(ontologyFile prefixes (ontology ontologyIRI imports annotations axioms))
    :else (ontologyFile prefixes (ontology imports annotations axioms))))))
