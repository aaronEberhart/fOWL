(ns ontology.functions
 "Wrapper to easily handle all OWL functions"
 (:require [clojure.java.io :as io][clojure.string :as str][clojure.set :as set][clojure.walk :as walk]
           [ontology.axioms :as ax][ontology.components :as co][ontology.expressions :as ex][ontology.annotations :as ann]
           [ontology.facts :as fs][ontology.file :as onf][ontology.SWRL :as swrl][ontology.normalize :as nml]
           [ontology.regexes :as reg]
           [util.msc :as msc]))

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

(defn- -getStuffInNestedMap
 ([getThis? doThis stuff]
 (cond
  (map? stuff) 
   (reduce (partial -getStuffInNestedMap getThis? doThis) #{} stuff)
  (coll? stuff) 
   (loop [stuff stuff
          acc #{}]
   (cond 
    (empty? stuff)
     acc
    (getThis? (first stuff))
     (recur (rest stuff) (conj acc (first stuff)))
    :else
    (recur (rest stuff) (apply conj acc (reduce (partial -getStuffInNestedMap getThis? doThis) acc (first stuff))))))
  :else stuff))
 ([getThis? doThis acc [k v]]
  (cond
   (getThis? v)
    (conj acc (doThis v)) 
   (coll? v)
    (let [in (-getStuffInNestedMap getThis? doThis v)]
    (apply conj acc in))     
   :else
    acc)))

(def emptyOntology
 "Returns an empty ontology with no prefixes"
 (onf/ontology #{} #{} #{}))

(def emptyOntologyFile
 "Returns an empty ontology file with the default OWL prefixes."
 (onf/ontologyFile 
  #{{:prefix "" :iri "empty:ontology" :type :prefix :innerType :prefix}{:prefix "owl" :iri co/owlNS :type :prefix :innerType :prefix}{:prefix "rdf" :iri co/rdfNS :type :prefix :innerType :prefix}{:prefix "rdfs" :iri co/rdfsNS :type :prefix :innerType :prefix}{:prefix "xsd" :iri co/xsdNS :type :prefix :innerType :prefix}} 
  (update emptyOntology :ontologyIRI (constantly (onf/ontologyIRI "empty:ontology")))))

(defn prefix 
 "prefixDeclaration := 'Prefix' '(' prefixName '=' fullIRI ')'"
 [prefixName longIRI] 
 (onf/prefix prefixName longIRI))

(defn prefixes 
 "prefixes := { prefixDeclaration }"
 [& prefixes] 
 (onf/prefixes (into #{} prefixes)))

(defn ontology
 "Ontology := 'Ontology' '(' [ ontologyIRI [ versionIRI ] ] directlyImportsDocuments ontologyAnnotations axioms ')'"
 ([] emptyOntology)
 ([imports annotations axioms](onf/ontology imports annotations axioms))
 ([ontologyIRI imports annotations axioms](onf/ontology ontologyIRI imports annotations axioms))
 ([ontologyIRI versionIRI imports annotations axioms](onf/ontology ontologyIRI versionIRI imports annotations axioms)))

(defn ontologyIRI 
 "ontologyIRI := IRI"
 [iri] 
 (onf/ontologyIRI iri))

(defn versionIRI 
 "versionIRI := IRI"
 [iri] 
 (onf/versionIRI iri))

(defn directImports 
 "directlyImportsDocuments := { 'Import' '(' IRI ')' }"
 [& imports] 
 (onf/directImports (into #{} imports)))

(defn directImport 
 "'Import' '(' IRI ')'"
 [iri] 
 (onf/directImport iri))

(defn ontologyAnnotations 
 "ontologyAnnotations := { Annotation }"
 [annotations] 
 (onf/ontologyAnnotations annotations))

(defn axioms 
 "axioms := { Axiom }"
 [& axioms] 
 (onf/axioms (into #{} axioms)))

(defn ontologyFile
 "ontologyDocument := { prefixDeclaration } Ontology"
 ([ontology](onf/ontologyFile ontology))
 ([prefixes ontology](onf/ontologyFile prefixes ontology)))

(defn getNames
 "Gets a set of all the iris used in this object"
 [object]
 (-getStuffInNestedMap #(and (map? %)(contains? % :iri)) identity object))

(defn getClassNames
 "Gets a set of all the class names used in this object"
 [object]
 (-getStuffInNestedMap #(= (:innerType %) :className) identity object))

(defn getRoleNames
 "Gets a set of all the role names used in this object"
 [object]
 (-getStuffInNestedMap #(= (:innerType %) :roleName) identity object))

(defn getDataRoleNames
 "Gets a set of all the data role names used in this object"
 [object]
 (-getStuffInNestedMap #(= (:innerType %) :dataRoleName) identity object))

(defn getDataTypes
 "Gets a set of all the data types used in this object"
 [object]
 (-getStuffInNestedMap #(= (:innerType %) :dataType) identity object))

(defn getClasses
 "Gets a set of all the classes used in this object"
 [object]
 (-getStuffInNestedMap #(= (:type %) :class) identity object))

(defn getRoles
 "Gets a set of all the roles used in this object"
 [object]
 (-getStuffInNestedMap #(or (= (:type %) :role)(= (:type %) :inverseRole)) identity object))

(defn getRoleChains
 "Gets a set of all the roles chains used in this object"
 [object]
 (-getStuffInNestedMap #(= (:type %) :roleChain) identity object))

(defn getAxioms 
 "Returns the axioms from an ontology in a lazy sequence"
 [ontology]
 (msc/lazer (:axioms ontology)))

(defn getAxiomsNoAnnotations 
 "Returns the axioms from an ontology without annotations in a lazy sequence"
 [ontology]
 (msc/lazer (:axioms ontology) #(not (= (:outerType %) :annotationAxiom)) #(dissoc % :annotations)))

(defn getClassAxioms 
 "Returns the class axioms from an ontology in a lazy sequence"
 [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :classAxiom)))

(defn getClassAxiomsNoAnnotations 
 "Returns the class axioms from an ontology without annotations in a lazy sequence"
 [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :classAxiom) #(dissoc % :annotations)))

(defn getRoleAxioms 
 "Returns the role axioms from an ontology in a lazy sequence"
 [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :roleAxiom)))

(defn getRoleAxiomsNoAnnotations 
 "Returns the role axioms from an ontology without annotations in a lazy sequence"
 [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :roleAxiom) #(dissoc % :annotations)))

(defn getDataRoleAxioms 
 "Returns the data role axioms from an ontology in a lazy sequence"
 [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :dataRoleAxiom)))

(defn getDataRoleAxiomsNoAnnotations 
 "Returns the data role axioms from an ontology without annotations in a lazy sequence"
 [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :dataRoleAxiom) #(dissoc % :annotations)))

(defn getFacts 
 "Returns the facts from an ontology in a lazy sequence"
 [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :fact)))

(defn getFactsNoAnnotations 
 "Returns the facts from an ontology without annotations in a lazy sequence"
 [ontology]
 (msc/lazer (:axioms ontology) #(= (:outerType %) :fact) #(dissoc % :annotations)))

(defn getPrefixes 
 "Returns the prefixes from an ontology in a lazy sequence"
 [ontology]
 (msc/lazer (:prefixes ontology)))

(defn getImports 
 "Returns the imports from an ontology in a lazy sequence"
 [ontology]
 (msc/lazer (:imports ontology)))

(defn getAnnotations 
 "Returns the annotations from an ontology in a lazy sequence"
 [ontology]
 (msc/lazer (:annotations ontology)))

(defn getOntologyIRI 
 "Returns the ontology IRI from an ontology"
 [ontology]
 (:ontologyIRI ontology))

(defn getVersionIRI 
 "Returns the version IRI from an ontology"
 [ontology]
 (:versionIRI ontology))

(defn- addStuffToOntologyWithFunction
 [ontology stuff function]
 (loop [stuff stuff
        ontology ontology]
 (if (empty? stuff)
  ontology
  (recur (rest stuff) (function ontology (first stuff))))))

(defn- updateOntology 
 [ontology object fun key]
 (update ontology key (fun (key ontology) object)))

(defn- updateOntologyComponents 
 [ontology updateThis? updateFunction]
 (walk/postwalk (fn [v] (if (updateThis? v) (updateFunction v) v)) ontology))

(defn- updateForDroppedPrefix
 [ontology prefix]
 (updateOntologyComponents 
  ontology 
  #(and (not (or (= (:type %) :prefix)(= (:type %) :import)(= (:type %) :ontologyIRI)(= (:type %) :versionIRI)))
        (or (and (:iri %) (not (:namespace %)) (some? (re-matches (re-pattern (str (:prefix prefix) "\\S+")) (:iri %))))
            (and (= (:prefix %) (:prefix prefix)))))
  #(dissoc (assoc % :iri (get (re-matches (re-pattern (str (subs (:iri prefix) 0 (- (count (:iri prefix)) 1)) "(\\S+)>")) (:iri %)) 1)) :namespace :prefix :short)))

(defn- updateForAddedPrefix
 [thing prefix]
 (updateOntologyComponents 
  thing 
  #(and (not (or (= (:type %) :prefix)(= (:type %) :import)(= (:type %) :ontologyIRI)(= (:type %) :versionIRI)))
         (or (and (:iri %) (not (:namespace %)) (some? (re-matches (re-pattern (str (:prefix prefix) "\\S+")) (:iri %))))
             (and (= (:prefix %) (:prefix prefix)))))
  #(let [short (if (:short %) (:short %) (get (re-matches (re-pattern (str (:prefix prefix) "(\\S+)")) (:iri %)) 1))
         pre (if (:prefix %) (:prefix %) (:prefix prefix))
         namespace (subs (:iri prefix) 1 (- (count (:iri prefix)) 1))]
  (assoc % :prefix pre :namespace namespace :iri (str "<" namespace short ">") :short short))))

(defn dropAxiom 
 "Drops the axiom from the ontology"
 [ontology axiom]
 (updateOntology ontology axiom (comp constantly disj) :axioms))

(defn dropAxioms 
 "Drops all axioms in the set from the ontology"
 [ontology & axioms]
 (updateOntology ontology axioms (comp constantly (partial apply disj)) :axioms))

(defn dropPrefix 
 "Drops the prefix from the ontology. Removes it from any IRI in the ontology"
 [ontology prefix]
 (let [num (count (:prefixes ontology))
       ontology (updateOntology ontology prefix (comp constantly disj) :prefixes)]
 (if (< (count (:prefixes ontology)) num)
  (updateForDroppedPrefix ontology prefix)
  ontology)))

(defn dropPrefixes 
 "Drops all prefixes in the set from the ontology"
 [ontology & prefixes]
 (addStuffToOntologyWithFunction ontology prefixes dropPrefix))

(defn dropImport 
 "Drops the import from the ontology"
 [ontology import]
 (updateOntology ontology import (comp constantly disj) :imports))

(defn dropImports 
 "Drops all imports in the set from the ontology"
 [ontology & imports]
 (updateOntology ontology imports (comp constantly (partial apply disj)) :imports))

(defn dropAnnotation 
 "Drops the annotation from the ontology"
 [ontology annotation]
 (updateOntology ontology annotation (comp constantly disj) :annotations))

(defn dropAnnotations 
 "Drops all annotations in the set from the ontology"
 [ontology & annotations]
 (updateOntology ontology annotations (comp constantly (partial apply disj)) :annotations))

(defn addAxiom 
 "Adds an axiom to an ontology. If it contains prefixes already in the ontology, they are automatically adjusted to match the ontology prefixes."
 [ontology axiom] 
 (if (:prefixes ontology)
  (let [names (getNames axiom)]
   (loop [axiom axiom
          prefixes (:prefixes ontology)
          ontology ontology]
   (cond 
    (empty? prefixes)  
     (updateOntology ontology axiom (comp constantly conj) :axioms)
    (not (empty? (keep #(if (or (= (:prefix %) (:prefix (first prefixes)))(not (:prefix %))) %) names)))
     (recur (updateForAddedPrefix axiom (first prefixes)) (rest prefixes) ontology)
    :else 
     (recur axiom (rest prefixes) ontology))))
  (updateOntology ontology axiom (comp constantly conj) :axioms)))

(defn addAxioms
 "Adds a set of axioms to an ontology"
 [ontology & axioms]
 (addStuffToOntologyWithFunction ontology axioms addAxiom))

(defn- -addPrefix
 [ontology prefix]
 (updateForAddedPrefix (updateOntology ontology prefix (comp constantly conj) :prefixes) prefix))

(defn addPrefix 
 "Adds a prefix to an ontology. If it is already in use it is overwritten. Any IRIs in the ontology that have this prefix are adjusted."
 [ontology prefix]
 (loop [prefixes (:prefixes ontology)]
 (cond 
  (empty? prefixes)  
   (-addPrefix ontology prefix)
  (= (:prefix (first prefixes)) (:prefix prefix))
   (-addPrefix (updateOntology ontology (first prefixes) (comp constantly disj) :prefixes) prefix)
  :else 
   (recur (rest prefixes)))))

(defn addPrefixes
 "Adds a set of prefixes to an ontology"
 [ontology & prefixes]
 (addStuffToOntologyWithFunction ontology prefixes addPrefix))

(defn addImport 
 "Adds an import to an ontology"
 [ontology import]
 (updateOntology ontology import (comp constantly conj) :imports))

(defn addImports
 "Adds a set of imports to an ontology"
 [ontology & imports]
 (updateOntology ontology imports (comp constantly (partial apply conj)) :imports))

(defn addAnnotation 
 "Adds an annotation to an ontology. If it contains prefixes already in the ontology, they are automatically adjusted to match the ontology prefixes."
 [ontology annotation]
 (if (:prefixes ontology)
  (let [names (getNames annotation)]
   (loop [annotation annotation
          prefixes (:prefixes ontology)
          ontology ontology]
   (cond 
    (empty? prefixes)
     (updateOntology ontology annotation (comp constantly conj) :annotations)
    (not (empty? (keep #(if (or (= (:prefix %) (:prefix (first prefixes)))(not (:prefix %))) %) names)))
     (recur (updateForAddedPrefix annotation (first prefixes)) (rest prefixes) ontology)
    :else 
     (recur annotation (rest prefixes) ontology))))
  (updateOntology ontology annotation (comp constantly conj) :annotations)))

(defn addAnnotations
 "Adds a set of annotations to an ontology"
 [ontology & annotations]
 (addStuffToOntologyWithFunction ontology annotations addAnnotation))

(defn setOntologyIRI 
 "Sets the Ontology IRI of he ontology to the input IRI"
 [ontology iri]
 (update ontology :ontologyIRI (constantly (ontologyIRI iri))))

(defn setVersionIRI
 "Sets the Version IRI of the ontology to the input IRI. Throws an exception if there is no Ontology IRI for the ontology."
 [ontology iri]
 (if (:ontologyIRI ontology)
  (update ontology :versionIRI (constantly (versionIRI iri)))
  (throw (Exception. (str {:type ::noOntologyIRI :ontology ontology})))))

(defn negate 
 "same as not, but doesn't make double negations"
 [class] 
 (nml/negate class))

(defn toClassImplications 
 "Converts an axiom to an equivalent axiom or set of axioms that are class implications"
 [classaxiom] 
 (nml/toClassImplications classaxiom))

(defn getNNF 
 "Gets the NNF of any object that is a class axiom or a class. Any non-class axiom or non-class is returned, since NNF is undefined."
 [object] 
 (nml/getNNF object))

(defn body 
 "The body of a SWRL rule."
 [& atoms]
 (swrl/body atoms))

(defn head 
 "The head of a SWRL Rule"
 [& atoms] 
 (swrl/head atoms))

(defn variable 
 "An IRI that represents a SWRL variable"
 [iri] 
 (swrl/variable iri))

(defn classAtom 
 "ClassAtom := ‘ClassAtom’ ‘(’ ClassExpression IArg ‘)’"
 [class iarg] 
 (swrl/classAtom class iarg))

(defn dataRangeAtom 
 "DataRangeAtom := ‘DataRangeAtom’ ‘(’ DataRange DArg ‘)’"
 [dataRange darg] 
 (swrl/dataRangeAtom dataRange darg))

(defn roleAtom 
 "ObjectPropertyAtom := ‘ObjectPropertyAtom’ ‘(’ ObjectPropertyExpression IArg IArg ‘)’"
 [role iarg1 iarg2] 
 (swrl/roleAtom role iarg1 iarg2))

(defn dataRoleAtom 
 "DataPropertyAtom := ‘DataPropertyAtom’ ‘(’ DataProperty IArg DArg ‘)’"
 [dataRole iarg darg] 
 (swrl/dataRoleAtom dataRole iarg darg))

(defn builtInAtom 
 "BuiltInAtom := ‘BuiltInAtom’ ‘(’ IRI DArg { DArg } ‘)’"
 [iri dargs] 
 (swrl/builtInAtom iri dargs))

(defn =individualsAtom 
 "SameIndividualAtom := ‘SameIndividualAtom’ ‘(’ IArg IArg ‘)’"
 [iarg1 iarg2] 
 (swrl/=individualsAtom iarg1 iarg2))

(defn !=individualsAtom 
 "DifferentIndividualsAtom := ‘DifferentIndividualsAtom’ ‘(’ IArg IArg ‘)’"
 [iarg1 iarg2] 
 (swrl/!=individualsAtom iarg1 iarg2))

(defn declaration 
 "Declaration := 'Declaration' '(' axiomAnnotations Entity ')'"
 [& args]
 (apply ax/declaration (apply extractParams args)))

(defn dlSafeRule 
 "DLSafeRule ::= DLSafeRule ‘(’ axiomAnnotations ‘Body’ ‘(’ {Atom} ‘)’ ‘Head’ ‘(’ {Atom} ‘)’ ‘)’"
 [& args]
  (apply ax/dlSafeRule (apply extractParams args)))

(defn classImplication 
 "SubClassOf := 'SubClassOf' '(' axiomAnnotations subClassExpression superClassExpression ')'"
 [& args]
 (apply ax/classImplication (apply extractParams args)))

(defn =classes 
 "EquivalentClasses := 'EquivalentClasses' '(' axiomAnnotations ClassExpression ClassExpression { ClassExpression } ')'"
 [& args]
 (apply ax/=classes (apply extractParamList args)))

(defn disjClasses 
 "DisjointClasses := 'DisjointClasses' '(' axiomAnnotations ClassExpression ClassExpression { ClassExpression } ')'"
 [& args]
 (apply ax/disjClasses (apply extractParamList args)))

(defn disjOr 
 "DisjointUnion := 'DisjointUnion' '(' axiomAnnotations Class disjointClassExpressions ')'"
 [& args]
 (apply ax/disjOr (apply extractFirstParamFromList args)))

(defn roleChain
 "propertyExpressionChain := 'ObjectPropertyChain' '(' ObjectPropertyExpression ObjectPropertyExpression { ObjectPropertyExpression } ')'"
 ([role1 role2](ax/roleChain role1 role2))
 ([role1 role2 & roles](ax/roleChain role1 role2 roles)))

(defn roleImplication 
 "SubObjectPropertyOf := 'SubObjectPropertyOf' '(' axiomAnnotations subObjectPropertyExpression superObjectPropertyExpression ')'"
 [& args]
 (apply ax/roleImplication (apply extractParams args)))

(defn =roles 
 "EquivalentObjectProperties := 'EquivalentObjectProperties' '(' axiomAnnotations ObjectPropertyExpression ObjectPropertyExpression { ObjectPropertyExpression } ')'"
 [& args]
 (apply ax/=roles (apply extractParamList args)))

(defn disjRoles 
 "DisjointObjectProperties := 'DisjointObjectProperties' '(' axiomAnnotations ObjectPropertyExpression ObjectPropertyExpression { ObjectPropertyExpression } ')'"
 [& args]
 (apply ax/disjRoles (apply extractParamList args)))

(defn roleDomain 
 "ObjectPropertyDomain := 'ObjectPropertyDomain' '(' axiomAnnotations ObjectPropertyExpression ClassExpression ')'"
 [& args]
 (apply ax/roleDomain (apply extractParams args)))

(defn roleRange 
 "ObjectPropertyRange := 'ObjectPropertyRange' '(' axiomAnnotations ObjectPropertyExpression ClassExpression ')'"
 [& args]
 (apply ax/roleRange (apply extractParams args)))

(defn inverseRoles 
 "InverseObjectProperties := 'InverseObjectProperties' '(' axiomAnnotations ObjectPropertyExpression ObjectPropertyExpression ')'"
 [& args]
 (apply ax/inverseRoles (apply extractParams args)))

(defn functionalRole 
 "FunctionalObjectProperty := 'FunctionalObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/functionalRole (apply extractParams args)))

(defn functionalInverseRole 
 "InverseFunctionalObjectProperty := 'InverseFunctionalObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/functionalInverseRole (apply extractParams args)))

(defn reflexiveRole 
 "ReflexiveObjectProperty := 'ReflexiveObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/reflexiveRole (apply extractParams args)))

(defn irreflexiveRole 
 "IrreflexiveObjectProperty := 'IrreflexiveObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/irreflexiveRole (apply extractParams args)))

(defn symmetricRole 
 "SymmetricObjectProperty := 'SymmetricObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/symmetricRole (apply extractParams args)))

(defn asymmetricRole 
 "AsymmetricObjectProperty := 'AsymmetricObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/asymmetricRole (apply extractParams args)))

(defn transitiveRole 
 "TransitiveObjectProperty := 'TransitiveObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/transitiveRole (apply extractParams args)))

(defn dataRoleImplication 
 "SubDataPropertyOf := 'SubDataPropertyOf' '(' axiomAnnotations subDataPropertyExpression superDataPropertyExpression ')'"
 [& args]
 (apply ax/dataRoleImplication (apply extractParams args)))

(defn =dataRoles 
 "EquivalentDataProperties := 'EquivalentDataProperties' '(' axiomAnnotations DataPropertyExpression DataPropertyExpression { DataPropertyExpression } ')'"
 [& args]
 (apply ax/=dataRoles (apply extractParamList args)))

(defn disjDataRoles 
 "DisjointDataProperties := 'DisjointDataProperties' '(' axiomAnnotations DataPropertyExpression DataPropertyExpression { DataPropertyExpression } ')'"
 [& args]
 (apply ax/disjDataRoles (apply extractParamList args)))

(defn dataRoleDomain 
 "DataPropertyDomain := 'DataPropertyDomain' '(' axiomAnnotations DataPropertyExpression ClassExpression ')'"
 [& args]
 (apply ax/dataRoleDomain (apply extractParams args)))

(defn dataRoleRange 
 "DataPropertyRange := 'DataPropertyRange' '(' axiomAnnotations DataPropertyExpression DataRange ')'"
 [& args]
 (apply ax/dataRoleRange (apply extractParams args)))

(defn functionalDataRole 
 "FunctionalDataProperty := 'FunctionalDataProperty' '(' axiomAnnotations DataPropertyExpression ')'"
 [& args]
 (apply ax/functionalDataRole (apply extractParams args)))

(defn hasKey 
 "HasKey := 'HasKey' '(' axiomAnnotations ClassExpression '(' { ObjectPropertyExpression } ')' '(' { DataPropertyExpression } ')' ')'"
 [& args]
 (apply ax/hasKey (apply extractParams args)))

(defn dataTypeDefinition 
 "DatatypeDefinition := 'DatatypeDefinition' '(' axiomAnnotations Datatype DataRange ')'"
 [& args]
 (apply ax/dataTypeDefinition (apply extractParams args)))

(defn annotationFact 
 "AnnotationAssertion := 'AnnotationAssertion' '(' axiomAnnotations AnnotationProperty AnnotationSubject AnnotationValue ')'"
 [& args]
 (apply ax/annotationFact (apply extractParams args)))

(defn annotationImplication 
 "SubAnnotationPropertyOf := 'SubAnnotationPropertyOf' '(' axiomAnnotations subAnnotationProperty superAnnotationProperty ')'"
 [& args]
 (apply ax/annotationImplication (apply extractParams args)))

(defn annotationDomain 
 "AnnotationPropertyDomain := 'AnnotationPropertyDomain' '(' axiomAnnotations AnnotationProperty IRI ')'"
 [& args]
 (apply ax/annotationDomain (apply extractParams args)))

(defn annotationRange 
 "AnnotationPropertyRange := 'AnnotationPropertyRange' '(' axiomAnnotations AnnotationProperty IRI ')'"
 [& args]
 (apply ax/annotationRange (apply extractParams args)))

(defn =individuals 
 "SameIndividual := 'SameIndividual' '(' axiomAnnotations Individual Individual { Individual } ')'"
 [& args]
 (apply fs/=individuals (apply extractParamList args)))

(defn !=individuals 
 "DifferentIndividuals := 'DifferentIndividuals' '(' axiomAnnotations Individual Individual { Individual } ')'"
 [& args]
 (apply fs/!=individuals (apply extractParamList args)))

(defn classFact 
 "ClassAssertion := 'ClassAssertion' '(' axiomAnnotations ClassExpression Individual ')'"
 [& args]
 (apply fs/classFact (apply extractParams args)))

(defn roleFact 
 "ObjectPropertyAssertion := 'ObjectPropertyAssertion' '(' axiomAnnotations ObjectPropertyExpression sourceIndividual targetIndividual ')'"
 [& args]
 (apply fs/roleFact (apply extractParams args)))

(defn notRoleFact 
 "NegativeObjectPropertyAssertion := 'NegativeObjectPropertyAssertion' '(' axiomAnnotations ObjectPropertyExpression sourceIndividual targetIndividual ')'"
 [& args]
 (apply fs/notRoleFact (apply extractParams args)))

(defn dataRoleFact 
 "DataPropertyAssertion := 'DataPropertyAssertion' '(' axiomAnnotations DataPropertyExpression sourceIndividual targetValue ')'"
 [& args]
 (apply fs/dataRoleFact (apply extractParams args)))

(defn notDataRoleFact 
 "NegativeDataPropertyAssertion := 'NegativeDataPropertyAssertion' '(' axiomAnnotations DataPropertyExpression sourceIndividual targetValue ')'"
 [& args]
 (apply fs/notDataRoleFact (apply extractParams args)))

(defn annotationRole
 "AnnotationProperty := IRI"
 ([iri](ann/annotationRole iri))
 ([prefix name](ann/annotationRole prefix name))
 ([prefix name namespace](ann/annotationRole prefix name namespace)))

(defn annotationValue 
 "AnnotationValue := AnonymousIndividual | IRI | Literal"
 [value]
 (ann/annotationValue value))

(defn metaAnnotations
 "annotationAnnotations := { Annotation }"
 [annotations]
 (ann/metaAnnotations annotations))

(defn annotation 
 "Annotation := 'Annotation' '(' annotationAnnotations AnnotationProperty AnnotationValue ')'"
 [& args]
 (apply ann/annotation (apply extractParams args)))

(defn annotationSubject 
 "AnnotationSubject := IRI | AnonymousIndividual"
 [subject]
 (ann/annotationSubject subject))

(defn axiomAnnotations 
 "axiomAnnotations := { Annotation }"
 [annotations]
 (ann/axiomAnnotations annotations))

(defn annotationDataType
 "Datatype := IRI"
 ([iri] (ann/annotationDataType iri))
 ([prefix name](ann/annotationDataType prefix name))
 ([prefix name namespace](ann/annotationDataType prefix name namespace)))

(defn implies
 "Will attempt to infer a valid implication based on the arguments supplied. If all arguments are string or IRI, it will create a class implication."
 [& args]
 (let [args (apply extractParams args) ann (if (set? (first args)) (first args) nil) args (if (nil? ann) args (rest args))]
  (cond
   (and (or (string? (first args))(nil? (:type (first args)))) (or (string? (first (rest args))) (nil? (:type  (first (rest args)))))) (apply ax/classImplication (cons ann args))
   (or (= :class (:type (first args))) (= :class (:type (first (rest args))))) (apply ax/classImplication (cons ann args))
   (or (= :role (:type (first args))) (= :roleChain (:type (first args))) (= :role (:type (first (rest args))))) (apply ax/roleImplication (cons ann args))
   (or (= :dataRole (:type (first args))) (= :dataRole (:type (first (rest args))))) (apply ax/dataRoleImplication (cons ann args))
   (or (= :annotationRole (:type (first args))) (= :annotationRole (:type (first (rest args))))) (apply ax/annotationImplication (cons ann args))
   :else (throw (Exception. (str {:type ::notImplication :annotations ann :args args}))))))

(defn fact
 "Will attempt to infer a valid fact based on the arguments supplied. If the first argument is string, it will create a class fact when there are 2, role fact when 3."
 [& args]
 (let [args (apply extractParams args) ann (if (set? (first args)) (first args) nil) args (if (nil? ann) args (rest args))]
  (cond
   (= 2 (count args)) (apply fs/classFact (cons ann args))
   (= :literal (:type (last args))) (apply fs/dataRoleFact (cons ann args))
   (or (= :role (:type (first args))) (string? (first args))) (apply fs/roleFact (cons ann args))   
   (= :annotationRole (:type (first args))) (apply ax/annotationFact (cons ann args))
   :else (throw (Exception. (str {:type ::notFact :annotations ann :args args}))))))

(defn notFact
 "Will attempt to infer a valid negative fact based on the arguments supplied. If the first argument is string, it will create a role fact."
 [& args]
 (let [args (apply extractParams args) ann (if (set? (first args)) (first args) nil) args (if (nil? ann) args (rest args))]
  (cond
   (= :literal (:type (last args))) (apply fs/notDataRoleFact (cons ann args))
   (or (= :role (:type (first args))) (string? (first args))) (apply fs/notRoleFact (cons ann args))   
   :else (throw (Exception. (str {:type ::notNotFact :annotations ann :args args}))))))

(def Top
 "owl:Thing"
 co/Top)
(def Bot
 "owl:Nothing"
 co/Bot)
(def RDFSLiteral
 "rdfs:Literal"
 co/RDFSLiteral)
(def TopRole
 "owl:topObjectProperty"
 co/TopRole)
(def BotRole
 "owl:bottomObjectProperty"
 co/BotRole)
(def TopData
 "owl:topDataProperty"
 co/TopData)
(def BotData
 "owl:bottomDataProperty"
 co/BotData)

(defn IRI
 "IRI := String"
 ([iri](co/IRI iri))
 ([prefix name](co/IRI prefix name))
 ([prefix name namespace](co/IRI prefix name namespace)))

(defn className
 "Class := IRI"
 ([iri](co/className iri))
 ([prefix name](co/className prefix name))
 ([prefix name namespace](co/className prefix name namespace)))

(defn roleName
 "ObjectProperty := IRI"
 ([iri](co/roleName iri))
 ([prefix name](co/roleName prefix name))
 ([prefix name namespace](co/roleName prefix name namespace)))

(defn inverseRoleName
 "InverseObjectProperty := 'ObjectInverseOf' '(' ObjectProperty ')'"
 ([iri](co/inverseRoleName iri))
 ([prefix name](co/inverseRoleName prefix name))
 ([prefix name namespace](co/inverseRoleName prefix name namespace)))

(defn dataRoleName
 "DataProperty := IRI"
 ([iri](co/dataRoleName iri))
 ([prefix name](co/dataRoleName prefix name))
 ([prefix name namespace](co/dataRoleName prefix name namespace)))

(defn individual
 "Individual := IRI | nodeID"
 ([iri](co/individual iri))
 ([prefix name](co/individual prefix name))
 ([prefix name namespace](co/individual prefix name namespace)))

(defn typedLiteral 
 "typedLiteral := lexicalForm '^^' Datatype"
 [lexicalForm datatype]
 (co/typedLiteral lexicalForm datatype))

(defn stringLiteral
 "stringLiteral := quotedString | quotedString languageTag"
 ([string](co/stringLiteralNoLanguage string))
 ([string lang](co/stringLiteralWithLanguage string lang)))

(defn restrictedValue 
 "RestrictedFacet := constrainingFacet restrictionValue"
 [facet restriction]
 (co/restrictedValue facet restriction))

(defn dataType
 "Datatype := IRI"
 ([iri] (co/dataType iri))
 ([prefix name](co/dataType prefix name))
 ([prefix name namespace](co/dataType prefix name namespace)))

(defn dataRange 
 "DataRange := Datatype | DataIntersectionOf | DataUnionOf | DataComplementOf | DataOneOf | DatatypeRestriction"
 [dataRange]
 (co/dataRange dataRange))

(defn dataAnd 
 "DataIntersectionOf := 'DataIntersectionOf' '(' DataRange DataRange { DataRange } ')'"
 ([datarange1 datarange2]
  (co/dataAnd datarange1 datarange2))
 ([datarange1 datarange2 & dataranges]
  (co/dataAnd datarange1 datarange2 dataranges)))

(defn dataOr 
 "DataUnionOf := 'DataUnionOf' '(' DataRange DataRange { DataRange } ')'"
 ([datarange1 datarange2]
  (co/dataOr datarange1 datarange2))
 ([datarange1 datarange2 & dataranges]
  (co/dataOr datarange1 datarange2 dataranges)))

(defn dataNot 
 "DataComplementOf := 'DataComplementOf' '(' DataRange ')'"
 [datarange]
 (co/dataNot datarange))

(defn dataOneOf
 "DataOneOf := 'DataOneOf' '(' Literal { Literal } ')'"
 ([literal](co/dataOneOf literal))
 ([literal & literals](co/dataOneOf literal literals)))

(defn datatypeRestriction 
 "DatatypeRestriction := 'DatatypeRestriction' '(' Datatype RestrictedFacet { RestrictedFacet } ')'"
 [& args]
 (apply co/datatypeRestriction (apply extractFirstParamFromList args)))

(defn entity 
 "Entity := 'Class' '(' Class ')' | 'Datatype' '(' Datatype ')' | 'ObjectProperty' '(' ObjectProperty ')' | 'DataProperty' '(' DataProperty ')' | 'AnnotationProperty' '(' AnnotationProperty ')' | 'NamedIndividual' '(' NamedIndividual ')'"
 [thing]
 (co/entity thing))

(defn role
 "ObjectPropertyExpression := ObjectProperty | InverseObjectProperty"
 ([iri](ex/role iri))
 ([prefix name](ex/role prefix name))
 ([prefix name namespace](ex/role prefix name namespace)))

(defn inverseRole
 "InverseObjectProperty := 'ObjectInverseOf' '(' ObjectProperty ')'"
 ([iri](ex/inverseRole iri))
 ([prefix name](ex/inverseRole prefix name))
 ([prefix name namespace](ex/inverseRole prefix name namespace)))

(defn dataRole
 "DataPropertyExpression := DataProperty"
 ([iri](ex/dataRole iri))
 ([prefix name](ex/dataRole prefix name))
 ([prefix name namespace](ex/dataRole prefix name namespace)))

(defn -class
 "ClassExpression := Class | ObjectIntersectionOf | ObjectUnionOf | ObjectComplementOf | ObjectOneOf | ObjectSomeValuesFrom | ObjectAllValuesFrom | ObjectHasValue | ObjectHasSelf | ObjectMinCardinality | ObjectMaxCardinality | ObjectExactCardinality | DataSomeValuesFrom | DataAllValuesFrom | DataHasValue | DataMinCardinality | DataMaxCardinality | DataExactCardinality"
 ([iri](ex/class iri))
 ([prefix name](ex/class prefix name))
 ([prefix name namespace](ex/class prefix name namespace)))

(defn -and
 "ObjectIntersectionOf := 'ObjectIntersectionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'"
 ([class1 class2](ex/and class1 class2))
 ([class1 class2 & classes](ex/and class1 class2 classes)))

(defn -or
 "ObjectUnionOf := 'ObjectUnionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'"
 ([class1 class2](ex/or class1 class2))
 ([class1 class2 & classes](ex/or class1 class2 classes)))

(defn -not 
 "ObjectComplementOf := 'ObjectComplementOf' '(' ClassExpression ')'"
 [class]
 (ex/not class))

(defn nominal
 "ObjectOneOf := 'ObjectOneOf' '(' Individual { Individual }')'"
 ([individual](ex/nominal individual))
 ([individual & individuals](ex/nominal individual individuals)))

(defn exists 
 "ObjectSomeValuesFrom := 'ObjectSomeValuesFrom' '(' ObjectPropertyExpression ClassExpression ')'"
 [role class]
 (ex/exists role class))

(defn all 
 "ObjectAllValuesFrom := 'ObjectAllValuesFrom' '(' ObjectPropertyExpression ClassExpression ')'"
 [role class]
 (ex/all role class))

(defn partialRole 
 "ObjectHasValue := 'ObjectHasValue' '(' ObjectPropertyExpression Individual ')'"
 [role individual]
 (ex/partialRole role individual))

(defn Self
 "ObjectHasSelf := 'ObjectHasSelf' '(' ObjectPropertyExpression ')'"
 ([iri](ex/Self iri))
 ([prefix name](ex/Self prefix name))
 ([prefix name namespace](ex/Self prefix name namespace)))

(defn >=exists
 "ObjectMinCardinality := 'ObjectMinCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
 ([naturalNumber role](ex/>=exists naturalNumber role))
 ([naturalNumber role class](ex/>=exists naturalNumber role class)))

(defn <=exists
 "ObjectMaxCardinality := 'ObjectMaxCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
 ([naturalNumber role](ex/<=exists naturalNumber role))
 ([naturalNumber role class](ex/<=exists naturalNumber role class)))

(defn =exists
 "ObjectExactCardinality := 'ObjectExactCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
 ([naturalNumber r](ex/=exists naturalNumber r))
 ([naturalNumber r c](ex/=exists naturalNumber r c)))

(defn dataExists
 "DataSomeValuesFrom := 'DataSomeValuesFrom' '(' DataPropertyExpression { DataPropertyExpression } DataRange ')'"
 [dataRoles dataRange]
 (ex/dataExists dataRoles dataRange))

(defn dataAll 
 "DataAllValuesFrom := 'DataAllValuesFrom' '(' DataPropertyExpression { DataPropertyExpression } DataRange ')'"
 [dataRoles dataRange]
 (ex/dataAll dataRoles dataRange))

(defn >=dataExists
 "DataMinCardinality := 'DataMinCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
 ([naturalNumber dataRole](ex/>=dataExists naturalNumber dataRole))
 ([naturalNumber dataRole dataRange](ex/>=dataExists naturalNumber dataRole dataRange)))

(defn <=dataExists
 "DataMaxCardinality := 'DataMaxCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
 ([naturalNumber dataRole](ex/<=dataExists naturalNumber dataRole))
 ([naturalNumber dataRole dataRange](ex/<=dataExists naturalNumber dataRole dataRange)))

(defn =dataExists
 "DataExactCardinality := 'DataExactCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
 ([naturalNumber dataRole](ex/=dataExists naturalNumber dataRole))
 ([naturalNumber dataRole dataRange](ex/=dataExists naturalNumber dataRole dataRange)))

(defn partialDataRole 
 "DataHasValue := 'DataHasValue' '(' DataPropertyExpression Literal ')'"
 [dataRole literal]
 (ex/partialDataRole dataRole literal))

(defn- swapPrefixes 
 [iri]
 (if (:prefix iri)
  (str (:prefix iri)":"(:short iri))
  (:iri iri)))

(defn- noPrefixes 
 [iri]
 (case (:short iri)
  nil (:iri iri)
  "Thing" "⊤"
  "Nothing" "⊥"
  "topObjectProperty" "U"
  "bottomObjectProperty" "∅"
  (:short iri)))

(defn- assignPrefix 
 [name prefixes]
 (let [splits (re-matches #"([^\:]*?):([\s\S]+)" name)
       key (get splits 1)
       val (get splits 2)
       pref (:iri (first (drop-while (fn [x] (not (= key (:prefix x)))) prefixes)))
       fullIRI (if pref (subs pref 1 (- (count pref) 1)))]
 (if fullIRI [key val fullIRI][name])))

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
  nil (if (= clojure.lang.PersistentArrayMap (type thing)) (str "{" (str/join " " (map #(str % " " (if (% thing) (if (= clojure.lang.PersistentArrayMap (type (% thing))) (toDLString (% thing))(% thing)) "nil")) (keys thing))) "}") (if thing (str thing) "nil"))

  ;atoms
  :top "⊤"
  :bot "⊥"
  :roleTop "U"
  :roleBot "∅"
  :typedLiteral (:value thing)
  :stringLiteralNoLanguage (:value thing)
  :stringLiteralWithLanguage (:value thing)
  :dataType (swapPrefixes thing)
  :restrictedValue (str (swapPrefixes thing) " " (:value thing))
  :className (noPrefixes thing)
  :roleName (noPrefixes thing)
  :inverseRoleName (str (noPrefixes thing) "\u207B")
  :dataRoleName (noPrefixes thing)
  :namedIndividual (noPrefixes thing)
  :anonymousIndividual (swapPrefixes thing);(:nodeID thing)
  :annotationRole (noPrefixes thing)
  :annotationSubject (noPrefixes thing)
  :annotationValue (noPrefixes thing)

  ;filestuff
  :ontology (str (if (and (:prefixes thing)(not (empty? (:prefixes thing)))) (str (str/join "\n" (map (fn [x] (toDLString x)) (:prefixes thing))) "\n\n")) "Ontology(" (if (:ontologyIRI thing) (str (toDLString (:ontologyIRI thing)) "\n" (if (:versionIRI thing) (str (toDLString (:versionIRI thing)) "\n")) "\n")) (if (not (empty? (:imports thing))) (str (str/join "\n" (map (fn [x] (toDLString x)) (:imports thing))) "\n")) (if (not (empty? (:annotations thing))) (str (str/join "\n" (map (fn [x] (toDLString x)) (:annotations thing))) "\n")) (if (not (empty? (:axioms thing))) (str/join "\n" (map (fn [x] (toDLString x)) (:axioms thing)))) "\n)")
  :ontologyIRI (:iri thing)
  :versionIRI (:iri thing)
  :prefix (str "Prefix(" (:prefix thing) "=<" (:iri thing) ">)")
  :prefixes (str (str/join "\n" (map toDLString (:prefixes thing))))
  :import (str "Import(" (:iri thing) ")")
  :declaration (str "Declaration(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) " ") "") (getDeclType (:innerType (:name thing))) (toDLString (:name thing) ) "))")

  ;data roles ⊑ ⊓ ⊔ ∃ ∀ ∘ ≡ ≤ ≥ ⊤ ⊥ U ∅ ¬
  :partialDataRole (str "∃" (toDLString (:dataRole thing)) "[" (:value (:literal thing)) "]")
  :=dataExists (str "=" (:nat thing) (toDLString (:dataRole thing)) ".[" (toDLString (:dataRange thing)) "]")
  :<=dataExists (str "≤" (:nat thing) (toDLString (:dataRole thing)) ".["  (toDLString (:dataRange thing)) "]")
  :>=dataExists (str "≥" (:nat thing) (toDLString (:dataRole thing)) ".[" (toDLString (:dataRange thing)) "]")
  :dataExists (str "∃" (str/join " " (map (fn [x] (toDLString x)) (:dataRoles thing))) ".[" (toDLString (:dataRange thing)) "]")
  :dataAll (str "∀" (str/join " " (map (fn [x] (toDLString x)) (:dataRoles thing))) ".[" (toDLString (:dataRange thing)) "]")

  ;roles
  :roleChain (str/join " ∘ " (map (fn [x] (toDLString x)) (:roles thing)))
  :partialRole (str "∃" (toDLString (:role thing)) "{" (:short (:individual thing)) "}")
  :=exists (str "=" (:nat thing) (toDLString (:role thing)) (str "."  (if (:class thing) (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "(" (toDLString (:class thing)) ")") (toDLString (:class thing))) "⊤")))
  :<=exists (str "≤" (:nat thing) (toDLString (:role thing))  (str "." (if (:class thing) (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "(" (toDLString (:class thing)) ")") (toDLString (:class thing))) "⊤")))
  :>=exists (str "≥" (:nat thing) (toDLString (:role thing))  (str "."  (if (:class thing) (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "(" (toDLString (:class thing)) ")") (toDLString (:class thing))) "⊤")))
  :exists (str "∃" (toDLString (:role thing)) "." (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "(" (toDLString (:class thing)) ")") (toDLString (:class thing))))
  :all (str "∀" (toDLString (:role thing)) "." (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "(" (toDLString (:class thing)) ")") (toDLString (:class thing))))

  ;classes
  :not (if (or (= (:innerType (:class thing)) :or)(= (:innerType (:class thing)) :and)) (str "¬(" (toDLString (:class thing)) ")")(str "¬" (toDLString (:class thing))))
  :or (str/join " ⊔ " (map (fn [x] (if (or (= (:innerType x) :or)(= (:innerType x) :and)) (str "(" (toDLString x) ")")(toDLString x))) (:classes thing)))
  :and (str/join " ⊓ " (map (fn [x] (if (or (= (:innerType x) :or)(= (:innerType x) :and)) (str "(" (toDLString x) ")")(toDLString x))) (:classes thing)))
  :dataNot (str "¬" (toDLString (:dataRange thing)))
  :dataOr (str/join " ∨ " (map (fn [x] (if (or (= (:innerType x) :dataOr)(= (:innerType x) :dataAnd)) (str "(" (toDLString x) ")")(toDLString x))) (:dataRanges thing)))
  :dataAnd (str/join " ∧ " (map (fn [x] (if (or (= (:innerType x) :dataOr)(= (:innerType x) :dataAnd)) (str "(" (toDLString x) ")")(toDLString x))) (:dataRanges thing)))
  :dataOneOf (str/join "," (map (fn [x] (:value x)) (:literals thing)))
  :datatypeRestriction (str "DatatypeRestriction(" (:prefix thing) ":" (:short thing) " " (str/join " " (map toDLString (:restrictedValues thing)))")")
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
  :=classes (str  (str/join " ≡ " (map (fn [x] (toDLString x )) (:classes thing))) (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :disjClasses (str "disjClasses(" (str/join "," (map (fn [x] (toDLString x )) (:classes thing))) ")" (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :disjOr (str (toDLString (:class thing) ) " ≡ U(" (toDLString (:classes thing) ) ")" (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")"))
  :roleImplication  (str  (toDLString (:antecedentRole thing) ) " ⊑ " (toDLString (:consequentRole thing) ) (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
  :=roles (str (str/join " ≡ " (map (fn [x] (toDLString x )) (:roles thing))) (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
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
  :=dataRoles (str (str/join " ≡ " (map (fn [x] (toDLString x )) (:dataRoles thing))) (if (:annotations thing) (str " (annotations: " (str/join " " (map (fn [x] (toDLString x)) (:annotations thing))) ")") ""))
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
  :variable (str "Variable(" (if (:short thing) (str (:prefix thing) (:short thing)) (:iri thing)) ")")))

(defn toString 
 "Returns a functional syntax string representation of the map object used to store the OWL data, or the default representation if there is no OWL type contained in the map. Note that this is __*not*__ the same as java toString."
 [thing]
 (case (:innerType thing)

  ;Not an OWL map
  nil (if (map? thing) (str "{" (str/join " " (map #(str % " " (if (% thing) (if (map? (% thing)) (toString (% thing)) (% thing)) "nil")) (keys thing))) "}") (if thing (str thing) "nil"))

  ;atoms
  :typedLiteral (:value thing)
  :stringLiteralNoLanguage (:value thing)
  :stringLiteralWithLanguage (:value thing)
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
  :anonymousIndividual (swapPrefixes thing);(:nodeID thing)
  :annotationRole (swapPrefixes thing)
  :annotationSubject (swapPrefixes thing)
  :annotationValue (swapPrefixes thing)

  ;filestuff
  :ontology (str (if (and (:prefixes thing)(not (empty? (:prefixes thing)))) (str (str/join "\n" (map (fn [x] (toString x)) (:prefixes thing))) "\n\n")) "Ontology(" (if (:ontologyIRI thing) (str (toString (:ontologyIRI thing)) "\n" (if (:versionIRI thing) (str (toString (:versionIRI thing)) "\n")) "\n") "\n") (if (not (empty? (:imports thing))) (str (str/join "\n" (map (fn [x] (toString x)) (:imports thing))) "\n\n")) (if (not (empty? (:annotations thing))) (str (str/join "\n" (map (fn [x] (toString x)) (:annotations thing))) "\n\n")) (if (not (empty? (:axioms thing))) (str/join "\n" (map (fn [x] (toString x)) (:axioms thing)))) "\n)")
  :ontologyIRI (:iri thing)
  :versionIRI (:iri thing)
  :prefix (str "Prefix(" (:prefix thing) ":=<" (:iri thing) ">)")
  :prefixes (str (str/join "\n" (map toString (:prefixes thing))))
  :import (str "Import(" (:iri thing) ")")
  :declaration (str "Declaration(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (getDeclType (:innerType (:name thing))) (toString (:name thing) ) "))")

  ;data roles
  :partialDataRole (str "DataHasValue(" (toString (:dataRole thing)) " " (:value (:literal thing)) ")")
  :=dataExists (str "DataExactCardinality(" (:nat thing) " " (toString (:dataRole thing)) (if (:dataRange thing) (str " " (toString (:dataRange thing)))) ")")
  :<=dataExists (str "DataMaxCardinality(" (:nat thing) " " (toString (:dataRole thing) ) (if (:dataRange thing) (str " " (toString (:dataRange thing))))")")
  :>=dataExists (str "DataMinCardinality(" (:nat thing) " " (toString (:dataRole thing) ) (if (:dataRange thing) (str " " (toString (:dataRange thing))))")")
  :dataExists (str "DataSomeValuesFrom(" (str/join " " (map (fn [x] (toString x )) (:dataRoles thing))) " " (toString (:dataRange thing) ) ")")
  :dataAll (str "DataAllValuesFrom(" (str/join " " (map (fn [x] (toString x )) (:dataRoles thing))) " " (toString (:dataRange thing) ) ")")

  ;roles
  :roleChain (str "ObjectPropertyChain(" (str/join " " (map (fn [x] (toString x )) (:roles thing))) ")")
  :partialRole (str "ObjectHasValue(" (toString (:role thing) ) " " (toString (:individual thing)) ")")
  :=exists (str "ObjectExactCardinality(" (:nat thing) " " (toString (:role thing)) (if (:class thing) (str " " (toString (:class thing))))")")
  :<=exists (str "ObjectMaxCardinality(" (:nat thing) " " (toString (:role thing)) (if (:class thing) (str " " (toString (:class thing))))")")
  :>=exists (str "ObjectMinCardinality(" (:nat thing) " " (toString (:role thing)) (if (:class thing) (str " " (toString (:class thing))))")")
  :exists (str "ObjectSomeValuesFrom(" (toString (:role thing) ) " " (toString (:class thing) ) ")")
  :all (str "ObjectAllValuesFrom(" (toString (:role thing) ) " " (toString (:class thing) ) ")")

  ;classes
  :not (str "ObjectComplementOf(" (toString (:class thing) ) ")")
  :or (str "ObjectUnionOf(" (str/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :and (str "ObjectIntersectionOf(" (str/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :dataNot (str "DataComplementOf(" (toString (:dataRange thing) ) ")")
  :dataOr (str "DataUnionOf(" (str/join " " (map (fn [x] (toString x )) (:dataRanges thing))) ")")
  :dataAnd (str "DataIntersectionOf(" (str/join " " (map (fn [x] (toString x )) (:dataRanges thing))) ")")
  :dataOneOf (str "DataOneOf(" (str/join " " (map (fn [x] (:value x)) (:literals thing))) ")")
  :datatypeRestriction (str "DatatypeRestriction(" (:prefix thing) ":" (:short thing) " " (str/join " " (map toString (:restrictedValues thing))) ")")
  :Self (str "ObjectHasSelf(" (toString (:role thing)) ")")
  :nominal (str "ObjectOneOf("(str/join " " (map (fn [x] (toString x)) (:individuals thing))) ")")

  ;annotation
  :annotation (str "Annotation(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:annotationRole thing)) " "  (toString (:annotationValue thing) ) ")")
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
  :=classes (str "EquivalentClasses(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (str/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :disjClasses (str "DisjointClasses(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (str/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :disjOr (str "DisjointUnion(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:class thing) ) " " (str/join " " (map (fn [x] (toString x )) (:classes thing))) ")")
  :roleImplication  (str "SubObjectPropertyOf(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (toString (:antecedentRole thing) ) " " (toString (:consequentRole thing) ) ")")
  :=roles (str "EquivalentObjectProperties(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (str/join " " (map (fn [x] (toString x )) (:roles thing))) ")")
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
  :=dataRoles (str "EquivalentDataProperties(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") (str/join " " (map (fn [x] (toString x )) (:dataRoles thing))) ")")
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
  :variable (str "Variable(" (if (:short thing) (str (:prefix thing) (:short thing)) (:iri thing)) ")")
  :dlSafeRule (str "DLSafeRule(" (if (:annotations thing) (str (str/join " " (map (fn [x] (toString x)) (:annotations thing))) " ") "") "Body(" (str/join " " (map (fn [x] (toString x)) (:body thing))) ") Head(" (str/join " " (map (fn [x] (toString x)) (:head thing))) "))")))

(defn- getFunction 
 [typeString]
 (case typeString
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
  "ObjectSomeValuesFrom" exists
  "ObjectAllValuesFrom" all
  "ObjectHasValue" partialRole
  "ObjectHasSelf" Self
  "ObjectMinCardinality" >=exists
  "ObjectMaxCardinality" <=exists
  "ObjectExactCardinality" =exists
  "DataSomeValuesFrom" dataExists
  "DataAllValuesFrom" dataAll
  "DataMinCardinality" >=dataExists
  "DataExactCardinality" =dataExists
  "SubClassOf" classImplication
  "EquivalentClasses" =classes
  "DisjointUnion" disjOr
  "DisjointClasses" disjClasses
  "SubObjectPropertyOf" roleImplication
  "EquivalentObjectProperties" =roles
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
  "EquivalentDataProperties" =dataRoles
  "DisjointDataProperties" disjDataRoles
  "DataPropertyDomain" dataRoleDomain
  "DataPropertyRange" dataRoleRange
  "FunctionalDataProperty" functionalDataRole
  "AnnotationAssertion" annotationFact
  "AnnotationPropertyDomain" annotationDomain
  "AnnotationPropertyRange" annotationRange
  "DataHasValue" ex/partialDataRole
  "DataMaxCardinality" ex/<=dataExists
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
  "DifferentIndividualsAtom" !=individualsAtom))

(defn- -makeOWLFile
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
(defn makeOWLFile
 "Writes an owl file of the ontology with the supplied file name. 
  Optional argument allows choice of file type. No option defaults to functional syntax. 
  (Currently only functional syntax defined)"
 [ontology filename & fileType]
 (case fileType
  nil (-makeOWLFile filename (:prefixes ontology) (:ontologyIRI ontology) (:versionIRI ontology) (:imports ontology) (:annotations ontology) (:axioms ontology))
  :functional (-makeOWLFile filename (:prefixes ontology) (:ontologyIRI ontology) (:versionIRI ontology) (:imports ontology) (:annotations ontology) (:axioms ontology))))

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
   (recur (get prefMatch 3) (conj! prefixes (apply prefix [(get prefMatch 1)(get prefMatch 2)])))
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
  (recur (get importMatch 2) (conj! imports (directImport (get importMatch 1))))
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
  (recur (get fullIRIMatch 2) annotations annFun (conj (rest exps) (conj (first exps) (IRI (get fullIRIMatch 1)))) expFuns)
 (if-some [prefIRIMatch (re-matches (:prefIRIPat regexes) state)]
  (recur (get prefIRIMatch 2) annotations annFun (conj (rest exps) (conj (first exps) (parseIRI (get prefIRIMatch 1) prefixes))) expFuns)
 (if-some [literalTypedMatch (re-matches (:literalTypedPat regexes) state)]
  (recur (get literalTypedMatch 4) annotations annFun (conj (rest exps) (conj (first exps) (typedLiteral (get literalTypedMatch 1) (if (some? (get literalTypedMatch 2)) (dataType (get literalTypedMatch 2)) (apply dataType (assignPrefix (get literalTypedMatch 3) prefixes)))))) expFuns)
 (if-some [literalLangMatch (re-matches (:literalLangPat regexes) state)]
  (recur (get literalLangMatch 3) annotations annFun (conj (rest exps) (conj (first exps) (stringLiteral (get literalLangMatch 1)(get literalLangMatch 2)))) expFuns)
 (if-some [literalQuotedMatch (re-matches (:literalQuotedPat regexes) state)]
  (recur (get literalQuotedMatch 2) annotations annFun (conj (rest exps) (conj (first exps) (stringLiteral (get literalQuotedMatch 1)))) expFuns)
 (if-some [annMatch (re-matches (:annotationPat regexes) state)]
  (if (nil? annFun)
   (recur (get annMatch 2) annotations annotation exps expFuns)
   (recur (get annMatch 2) annotations annFun (conj exps []) (conj expFuns annotation)))
 (if-some [axMatch (re-matches (:axiomPat regexes) state)]
  [state annotations annFun exps expFuns]
 [(str state "\n") annotations annFun exps expFuns]))))))))))))

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
   (recur (get fullIRIMatch 2) axioms axFun (conj (rest exps) (conj (first exps) (IRI (get fullIRIMatch 1)))) expFuns)
 (if-some [prefIRIMatch (re-matches (:prefIRIPat regexes) state)]
   (recur (get prefIRIMatch 2) axioms axFun (conj (rest exps) (conj (first exps) (parseIRI (get prefIRIMatch 1) prefixes))) expFuns)
 (if-some [literalTypedMatch (re-matches (:literalTypedPat regexes) state)]
   (recur (get literalTypedMatch 4) axioms axFun (conj (rest exps) (conj (first exps) (typedLiteral (get literalTypedMatch 1) (if (some? (get literalTypedMatch 2)) (dataType (get literalTypedMatch 2)) (apply dataType (assignPrefix (get literalTypedMatch 3) prefixes)))))) expFuns)
 (if-some [literalLangMatch (re-matches (:literalLangPat regexes) state)]
   (recur (get literalLangMatch 3) axioms axFun (conj (rest exps) (conj (first exps) (stringLiteral (get literalLangMatch 1)(get literalLangMatch 2)))) expFuns)
 (if-some [literalQuotedMatch (re-matches (:literalQuotedPat regexes) state)]
   (recur (get literalQuotedMatch 2) axioms axFun (conj (rest exps) (conj (first exps) (stringLiteral (get literalQuotedMatch 1)))) expFuns)
 (if-some [annMatch (re-matches (:annotationPat regexes) state)]
  (recur (get annMatch 2) axioms axFun (conj exps []) (conj expFuns annotation))
 (if-some [axMatch (re-matches (:axiomPat regexes) state)]
  (recur (get axMatch 2) axioms (getFunction (get axMatch 1)) exps expFuns)
 (if-some [exMatch (re-matches (:expressionPat regexes) state)]
  (recur (get exMatch 2) axioms axFun (conj exps []) (conj expFuns (getFunction (get exMatch 1))))
 [(str state "\n") axioms axFun exps expFuns]))))))))))))))

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

(defn- -readFunctionalFile
 [file regexes]
 (with-open [rdr (io/reader (if (string? file) (io/file file) file))]
  (let [ontFile (line-seq rdr)
       [prefixes ontFile] (parseLines ontFile parsePrefixLine #(some? (re-matches (:ontPat regexes) (get % 1))) nil regexes)
       [ontologyIRI ontFile] ((fn [[x y]]  [(first x) y]) (parseLines ontFile parseOntologyIRILine #(or (= 1 (count (get % 0)))(or (some? (re-matches (:iriStopPat regexes) (get % 1)))(or (some? (re-matches (:donePat regexes) (get % 1)))(empty? (rest (get % 2)))))) nil regexes))
       [versionIRI ontFile] ((fn [[x y]]  [(first x) y]) (parseLines ontFile parseVersionIRILine #(or (= 1 (count (get % 0)))(or (some? (re-matches (:iriStopPat regexes) (get % 1)))(or (some? (re-matches (:donePat regexes) (get % 1)))(empty? (rest (get % 2)))))) nil regexes))
       [imports ontFile] (parseLines ontFile parseImportLine #(or (some? (re-matches (:annotationPat regexes) (get % 1)))(or (some? (re-matches (:axiomPat regexes) (get % 1)))(or (some? (re-matches (:donePat regexes) (get % 1)))(empty? (rest (get % 2)))))) nil regexes)
       [annotations ontFile] (parseLines ontFile parseAnnotationLine #(or (re-find (:axiomPat regexes) (get % 1))(or (some? (re-matches (:donePat regexes) (get % 1)))(empty? (rest (get % 2))))) prefixes regexes)
       [axioms lastParen] (parseLines ontFile parseAxiomLine #(and (some? (re-matches (:donePat regexes) (get % 1)))(empty? (rest (get % 2)))) prefixes regexes)]
       (cond
        (and (some? ontologyIRI)(some? versionIRI))(ontologyFile prefixes (ontology ontologyIRI versionIRI imports annotations axioms))
        (some? ontologyIRI)(ontologyFile prefixes (ontology ontologyIRI imports annotations axioms))
        :else (ontologyFile prefixes (ontology imports annotations axioms))))))
(defn readFunctionalFile 
 "Reads an OWL file to obtain an ontology.
  Optional argument allows choice of file type. No option defaults to functional syntax. 
  (Currently only functional syntax defined)"
 ([file & fileType]
  (case fileType
   nil (-readFunctionalFile file reg/functionalSyntax)
   :functional (-readFunctionalFile file reg/functionalSyntax))))

(def printStyle 
 "Change printStyle to modify how the terminal output looks (files will still output in functional syntax)
 
  toString - standard Functional syntax

  toDLString - DL instead of functional"
 toString) 
(defmethod print-method clojure.lang.PersistentArrayMap [x w](.write w (printStyle x)))
