(ns ontology.core
 "Wrapper to easily handle all OWL functions"
 (:require [clojure.java.io :as io]
           [ontology.axioms :as ax][ontology.components :as co][ontology.expressions :as ex][ontology.annotations :as ann]
           [ontology.facts :as fs][ontology.file :as onf][ontology.SWRL :as swrl][ontology.normalize :as nml]
           [ontology.regexes :as reg][ontology.IO :as oio]
           [util.core :as msc])
 (:refer-clojure :exclude [class and or not]))

(def emptyOntology
 "Returns an empty ontology with no prefixes"
 (onf/ontology #{} #{} #{}))

(def defaultPrefixes
 "The default prefixes for OWL"
 #{{:prefix "" :iri "empty:ontology#" :type :prefix :innerType :prefix}{:prefix "owl" :iri co/owlNS :type :prefix :innerType :prefix}{:prefix "rdf" :iri co/rdfNS :type :prefix :innerType :prefix}{:prefix "rdfs" :iri co/rdfsNS :type :prefix :innerType :prefix}{:prefix "xsd" :iri co/xsdNS :type :prefix :innerType :prefix}})

(def emptyOntologyFile
 "Returns an empty ontology file with the default OWL prefixes."
 (onf/ontologyFile defaultPrefixes (update emptyOntology :ontologyIRI (constantly (onf/ontologyIRI "empty:ontology")))))

(defn prefix 
 "prefixDeclaration := 'Prefix' '(' prefixName '=' fullIRI ')'"
 [prefixName longIRI] 
 (onf/prefix prefixName longIRI))

(defn prefixes 
 "prefixes := { prefixDeclaration }"
 [& prefixes] 
 (onf/prefixes (into #{} prefixes)))

(defn ontology
 "Ontology := 'Ontology' '(' [ ontologyIRI [ versionIRI ] ] directlyImportsDocuments ontologyAnnotations axioms ')'
  Returns an Ontology without any prefixes. No arguments returns an empty ontology."
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
 "ontologyDocument := { prefixDeclaration } Ontology
  Returns an Ontology File with the default OWL prefixes and any additional prefixes supplied. No arguments returns an empty ontology file."
 ([] emptyOntologyFile)
 ([ontology](onf/ontologyFile ontology))
 ([prefixes ontology](onf/ontologyFile prefixes ontology)))

(defn getNames
 "Gets the set of all the class, role, and dataRole, individual, dataType, and annotationRole names used in this object. This is identical with the 'Entity' definition in the OWL specification"
 [object]
 (let [a (agent #{})
       _ (msc/fowlPostwalk #(case (:innerType %) :className (do (send a conj (dissoc % :type)) %) :roleName (do (send a conj (dissoc % :type)) %) :dataRoleName (do (send a conj (dissoc % :type)) %) :annotationRoleName (do (send a conj (dissoc % :type)) %) :namedIndividual (do (send a conj (dissoc % :type)) %) :dataType (do (send a conj (dissoc % :type)) %) %) object)
       _ (await a)]
  @a))

(defn getClassNames
 "Gets a set of all the class names used in this object"
 [object]
 (let [a (agent #{})
       _ (msc/fowlPostwalk #(if (= (:innerType %) :className) (do (send a conj %) %) %) object)
       _ (await a)]
 @a))

(defn getRoleNames
 "Gets a set of all the role names used in this object"
 [object]
 (let [a (agent #{})
       _ (msc/fowlPostwalk #(if (= (:innerType %) :roleName) (do (send a conj %) %) %) object)
       _ (await a)]
 @a))

(defn getPredicateNames
 "Gets the set of all the class, role, and dataRole names used in this object. Predicate means anything that can contain an individual (not a datatype)."
 [object]
 (let [a (agent #{})
       _ (msc/fowlPostwalk #(case (:innerType %) :className (do (send a conj %) %) :roleName (do (send a conj %) %) :dataRoleName (do (send a conj %) %) :nominal (do (send a conj %) %) %) object)
       _ (await a)]
 @a))

(defn getDataRoleNames
 "Gets a set of all the data role names used in this object"
 [object]
 (let [a (agent #{})
       _ (msc/fowlPostwalk #(if (= (:innerType %) :dataRoleName) (do (send a conj %) %) %) object)
       _ (await a)]
 @a))

(defn getDataTypes
 "Gets a set of all the data types used in this object"
 [object]
 (let [a (agent #{})
       _ (msc/fowlPostwalk #(if (= (:innerType %) :dataType) (do (send a conj (dissoc % :type)) %) %) object)
       _ (await a)]
 @a))

(defn getClasses
 "Gets a set of all the classes used in this object"
 [object]
 (let [a (agent #{})
       _ (msc/fowlPostwalk #(if (= (:type %) :class) (do (send a conj %) %) %) object)
       _ (await a)]
 @a))

(defn getRoles
 "Gets a set of all the roles used in this object"
 [object]
 (let [a (agent #{})
       _ (msc/fowlPostwalk #(case (:type %) :role (do (send a conj %) %) :inverseRole (do (send a conj %) %) %) object)
       _ (await a)]
 @a))

(defn getRoleChains
 "Gets a set of all the roles chains used in this object"
 [object]
 (let [a (agent #{})
       _ (msc/fowlPostwalk #(if (= (:innerType %) :roleChain) (do (send a conj %) %) %) object)
       _ (await a)]
 @a))

(defn getAxioms 
 "Returns the axioms from an ontology in a lazy sequence"
 [ontology]
 (msc/lazer (:axioms ontology)))

(defn getAxiomsNoAnnotations 
 "Returns the axioms from an ontology without annotations in a lazy sequence"
 [ontology]
 (msc/lazer (:axioms ontology) #(not= (:outerType %) :annotationAxiom) #(dissoc % :annotations)))

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
 [f ontology]
 (msc/fowlPostwalk f ontology))

(defn- updateForDroppedPrefix
 [ontology prefix]
 (updateOntologyComponents (fn [v] (if ((partial oio/changePrefix? prefix) v) ((partial oio/losePrefix prefix) v) v)) ontology))

(defn- updateForAddedPrefix
 [thing prefix]
 (updateOntologyComponents (fn [v] (if ((partial oio/changePrefix? prefix) v) ((partial oio/gainPrefix prefix) v) v)) thing))

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

(defn- -addPrefix
 [ontology prefix]
 (updateForAddedPrefix (updateOntology ontology prefix (comp constantly conj) :prefixes) prefix))

(defn addPrefix 
 "Adds a prefix to an ontology. If it is already in use it is overwritten. Any IRIs in the ontology that have this prefix are adjusted.
  If the ontology is not an ontology file, it will be converted to suppot prefixes."
 [ontology prefix]
 (if (:prefixes ontology)
  (loop [prefixes (:prefixes ontology)]
   (cond 
    (empty? prefixes)  
     (-addPrefix ontology prefix)
    (= (:prefix (first prefixes)) (:prefix prefix))
     (-addPrefix (updateOntology ontology (first prefixes) (comp constantly disj) :prefixes) prefix)
    :else 
     (recur (rest prefixes))))
   (-addPrefix (assoc ontology :prefixes #{}) prefix)))

(defn addPrefixes
 "Adds a set of prefixes to an ontology"
 [ontology & prefixes]
 (addStuffToOntologyWithFunction ontology prefixes addPrefix))

(defn addDefaultPrefixes
 "Adds the default OWL prefixes to the ontology"
 [ontology]
 (addStuffToOntologyWithFunction ontology defaultPrefixes addPrefix))

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
     (updateOntology (addStuffToOntologyWithFunction ontology (map (partial apply prefix) (filter (fn [x] (not-any? #(= (get x 0)(:prefix %)) (:prefixes ontology))) (keep #(if (:namespace %) [(:prefix %)(:namespace %)] nil) names))) addPrefix) axiom (comp constantly conj) :axioms)
    (seq? (keep (partial oio/hasThisPrefix (first prefixes)) names))
     (recur (updateForAddedPrefix axiom (first prefixes)) (rest prefixes) ontology)
    :else 
     (recur axiom (rest prefixes) ontology))))
  (updateOntology ontology axiom (comp constantly conj) :axioms)))

(defn addAxioms
 "Adds a set of axioms to an ontology"
 [ontology & axioms]
 (addStuffToOntologyWithFunction ontology axioms addAxiom))

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
     (updateOntology (addStuffToOntologyWithFunction ontology (map (partial apply prefix) (filter (fn [x] (not-any? #(= (get x 0)(:prefix %)) (:prefixes ontology))) (keep #(if (:namespace %) [(:prefix %)(:namespace %)] nil) names))) addPrefix) annotation (comp constantly conj) :annotations)
    (seq? (keep (partial oio/hasThisPrefix (first prefixes)) names))
     (recur (updateForAddedPrefix annotation (first prefixes)) (rest prefixes) ontology)
    :else 
     (recur annotation (rest prefixes) ontology))))
  (updateOntology ontology annotation (comp constantly conj) :annotations)))

(defn addAnnotations
 "Adds a set of annotations to an ontology"
 [ontology & annotations]
 (addStuffToOntologyWithFunction ontology annotations addAnnotation))

(defn addDeclarationsForAllIRIs
 "Adds a Declaration axiom for any IRI in the ontology that is not currently declared"
 [ontology]
 (loop [names (getNames ontology)
        declarations (reduce (fn [set x] (conj set (:iri (:name x)))) #{} (filter #(= :declaration (:innerType %)) (:axioms ontology)))
        ontology ontology]
  (if (empty? names)
   ontology
   (recur (rest names) declarations (if (contains? declarations (:iri (first names))) ontology (addAxiom ontology (ax/declaration (first names))))))))

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
 "Converts a class axiom to an equivalent axiom or set of axioms that are class implications"
 [classaxiom] 
 (nml/toClassImplications classaxiom))

(defn toSyntacticEquivalent 
 "Converts an axiom to an equivalent axiom or set of axioms that are class, role, or dataRole implications if such an equivalence exists. Corresponds to the definitions of syntactic shortcuts in the OWL 2 Specification."
 [axiom]
 (nml/toSyntacticEquivalent axiom))

(defn getNNF 
 "Gets the NNF of any object that is a class axiom or a class. Any non-class axiom or non-class is returned, since NNF is undefined."
 [object] 
 (nml/getNNF object))

(defn body 
 "The body of a SWRL or dg rule."
 [& atoms]
 (swrl/body atoms))

(defn head 
 "The head of a SWRL or dg Rule"
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

(defn dgName
 "DGName ::= IRI"
 [iri]
 (swrl/dgName iri))

(defn nodeFact 
 "NodeAssertion ::= ‘NodeAssertion’‘(’ Class DGNode ‘)’"
 [class node]
 (swrl/nodeFact class node))

(defn dgNodes 
 "DGNodes ::= ‘Nodes’‘(’ NodeAssertion { NodeAssertion } ‘)’"
 ([node]
  (swrl/dgNodes node))
 ([node & nodes]
  (swrl/dgNodes node nodes)))

(defn  edgeFact 
 "EdgeAssertion ::= ‘EdgeAssertion’ ‘(’ ObjectProperty DGNode DGNode ‘)’"
 [role node1 node2]
 (swrl/edgeFact role node1 node2))

(defn dgEdges
 "EdgeAssertion ::= ‘EdgeAssertion’ ‘(’ ObjectProperty DGNode DGNode ‘)’"
 ([edge]
  (swrl/dgEdges edge))
 ([edge & edges]
  (swrl/dgEdges edge edges)))

(defn mainClasses 
 "MainClasses ::= ‘MainClasses’ ‘(’ Class { Class } ‘)’"
 ([class]
  (swrl/mainClasses class))
 ([class & classes]
  (swrl/mainClasses class classes)))

(defn declaration 
 "Declaration := 'Declaration' '(' axiomAnnotations Entity ')'"
 [& args]
 (apply ax/declaration (apply oio/extractParams args)))

(defn dlSafeRule 
 "DLSafeRule ::= DLSafeRule ‘(’ axiomAnnotations ‘Body’ ‘(’ {Atom} ‘)’ ‘Head’ ‘(’ {Atom} ‘)’ ‘)’"
 [& args]
 (apply ax/dlSafeRule (apply oio/extractParams args)))

(defn dgRule 
 "DGRule ::= DescriptionGraphRule ‘(’ {Annotation} ‘Body’ ‘(’ {DGAtom} ‘)’ ‘Head’ ‘(’ {DGAtom} ‘)’ ‘)'"
 [& args]
 (apply ax/dgRule (apply oio/extractParams args)))

(defn dgAxiom
 "DGAxiom ::= ‘DescriptionGraph’ ‘(’ {Annotation} DGName DGNodes DGEdges MainClasses ‘)’"
 [& args]
 (apply ax/dgAxiom (apply oio/extractParams args)))

(defn classImplication 
 "SubClassOf := 'SubClassOf' '(' axiomAnnotations subClassExpression superClassExpression ')'"
 [& args]
 (apply ax/classImplication (apply oio/extractParams args)))

(defn =classes 
 "EquivalentClasses := 'EquivalentClasses' '(' axiomAnnotations ClassExpression ClassExpression { ClassExpression } ')'"
 [& args]
 (apply ax/=classes (apply oio/extractParamList args)))

(defn disjClasses 
 "DisjointClasses := 'DisjointClasses' '(' axiomAnnotations ClassExpression ClassExpression { ClassExpression } ')'"
 [& args]
 (apply ax/disjClasses (apply oio/extractParamList args)))

(defn disjOr 
 "DisjointUnion := 'DisjointUnion' '(' axiomAnnotations Class disjointClassExpressions ')'"
 [& args]
 (apply ax/disjOr (apply oio/extractFirstParamFromList args)))

(defn roleChain
 "propertyExpressionChain := 'ObjectPropertyChain' '(' ObjectPropertyExpression ObjectPropertyExpression { ObjectPropertyExpression } ')'"
 ([role1 role2](ax/roleChain role1 role2))
 ([role1 role2 & roles](ax/roleChain role1 role2 roles)))

(defn roleImplication 
 "SubObjectPropertyOf := 'SubObjectPropertyOf' '(' axiomAnnotations subObjectPropertyExpression superObjectPropertyExpression ')'"
 [& args]
 (apply ax/roleImplication (apply oio/extractParams args)))

(defn =roles 
 "EquivalentObjectProperties := 'EquivalentObjectProperties' '(' axiomAnnotations ObjectPropertyExpression ObjectPropertyExpression { ObjectPropertyExpression } ')'"
 [& args]
 (apply ax/=roles (apply oio/extractParamList args)))

(defn disjRoles 
 "DisjointObjectProperties := 'DisjointObjectProperties' '(' axiomAnnotations ObjectPropertyExpression ObjectPropertyExpression { ObjectPropertyExpression } ')'"
 [& args]
 (apply ax/disjRoles (apply oio/extractParamList args)))

(defn roleDomain 
 "ObjectPropertyDomain := 'ObjectPropertyDomain' '(' axiomAnnotations ObjectPropertyExpression ClassExpression ')'"
 [& args]
 (apply ax/roleDomain (apply oio/extractParams args)))

(defn roleRange 
 "ObjectPropertyRange := 'ObjectPropertyRange' '(' axiomAnnotations ObjectPropertyExpression ClassExpression ')'"
 [& args]
 (apply ax/roleRange (apply oio/extractParams args)))

(defn inverseRoles 
 "InverseObjectProperties := 'InverseObjectProperties' '(' axiomAnnotations ObjectPropertyExpression ObjectPropertyExpression ')'"
 [& args]
 (apply ax/inverseRoles (apply oio/extractParams args)))

(defn functionalRole 
 "FunctionalObjectProperty := 'FunctionalObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/functionalRole (apply oio/extractParams args)))

(defn functionalInverseRole 
 "InverseFunctionalObjectProperty := 'InverseFunctionalObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/functionalInverseRole (apply oio/extractParams args)))

(defn reflexiveRole 
 "ReflexiveObjectProperty := 'ReflexiveObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/reflexiveRole (apply oio/extractParams args)))

(defn irreflexiveRole 
 "IrreflexiveObjectProperty := 'IrreflexiveObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/irreflexiveRole (apply oio/extractParams args)))

(defn symmetricRole 
 "SymmetricObjectProperty := 'SymmetricObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/symmetricRole (apply oio/extractParams args)))

(defn asymmetricRole 
 "AsymmetricObjectProperty := 'AsymmetricObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/asymmetricRole (apply oio/extractParams args)))

(defn transitiveRole 
 "TransitiveObjectProperty := 'TransitiveObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'"
 [& args]
 (apply ax/transitiveRole (apply oio/extractParams args)))

(defn dataRoleImplication 
 "SubDataPropertyOf := 'SubDataPropertyOf' '(' axiomAnnotations subDataPropertyExpression superDataPropertyExpression ')'"
 [& args]
 (apply ax/dataRoleImplication (apply oio/extractParams args)))

(defn =dataRoles 
 "EquivalentDataProperties := 'EquivalentDataProperties' '(' axiomAnnotations DataPropertyExpression DataPropertyExpression { DataPropertyExpression } ')'"
 [& args]
 (apply ax/=dataRoles (apply oio/extractParamList args)))

(defn disjDataRoles 
 "DisjointDataProperties := 'DisjointDataProperties' '(' axiomAnnotations DataPropertyExpression DataPropertyExpression { DataPropertyExpression } ')'"
 [& args]
 (apply ax/disjDataRoles (apply oio/extractParamList args)))

(defn dataRoleDomain 
 "DataPropertyDomain := 'DataPropertyDomain' '(' axiomAnnotations DataPropertyExpression ClassExpression ')'"
 [& args]
 (apply ax/dataRoleDomain (apply oio/extractParams args)))

(defn dataRoleRange 
 "DataPropertyRange := 'DataPropertyRange' '(' axiomAnnotations DataPropertyExpression DataRange ')'"
 [& args]
 (apply ax/dataRoleRange (apply oio/extractParams args)))

(defn functionalDataRole 
 "FunctionalDataProperty := 'FunctionalDataProperty' '(' axiomAnnotations DataPropertyExpression ')'"
 [& args]
 (apply ax/functionalDataRole (apply oio/extractParams args)))

(defn hasKey 
 "HasKey := 'HasKey' '(' axiomAnnotations ClassExpression '(' { ObjectPropertyExpression } ')' '(' { DataPropertyExpression } ')' ')'"
 [& args]
 (apply ax/hasKey (apply oio/extractParams args)))

(defn dataTypeDefinition 
 "DatatypeDefinition := 'DatatypeDefinition' '(' axiomAnnotations Datatype DataRange ')'"
 [& args]
 (apply ax/dataTypeDefinition (apply oio/extractParams args)))

(defn annotationFact 
 "AnnotationAssertion := 'AnnotationAssertion' '(' axiomAnnotations AnnotationProperty AnnotationSubject AnnotationValue ')'"
 [& args]
 (apply ax/annotationFact (apply oio/extractParams args)))

(defn annotationImplication 
 "SubAnnotationPropertyOf := 'SubAnnotationPropertyOf' '(' axiomAnnotations subAnnotationProperty superAnnotationProperty ')'"
 [& args]
 (apply ax/annotationImplication (apply oio/extractParams args)))

(defn annotationDomain 
 "AnnotationPropertyDomain := 'AnnotationPropertyDomain' '(' axiomAnnotations AnnotationProperty IRI ')'"
 [& args]
 (apply ax/annotationDomain (apply oio/extractParams args)))

(defn annotationRange 
 "AnnotationPropertyRange := 'AnnotationPropertyRange' '(' axiomAnnotations AnnotationProperty IRI ')'"
 [& args]
 (apply ax/annotationRange (apply oio/extractParams args)))

(defn =individuals 
 "SameIndividual := 'SameIndividual' '(' axiomAnnotations Individual Individual { Individual } ')'"
 [& args]
 (apply fs/=individuals (apply oio/extractParamList args)))

(defn !=individuals 
 "DifferentIndividuals := 'DifferentIndividuals' '(' axiomAnnotations Individual Individual { Individual } ')'"
 [& args]
 (apply fs/!=individuals (apply oio/extractParamList args)))

(defn classFact 
 "ClassAssertion := 'ClassAssertion' '(' axiomAnnotations ClassExpression Individual ')'"
 [& args]
 (apply fs/classFact (apply oio/extractParams args)))

(defn roleFact 
 "ObjectPropertyAssertion := 'ObjectPropertyAssertion' '(' axiomAnnotations ObjectPropertyExpression sourceIndividual targetIndividual ')'"
 [& args]
 (apply fs/roleFact (apply oio/extractParams args)))

(defn notRoleFact 
 "NegativeObjectPropertyAssertion := 'NegativeObjectPropertyAssertion' '(' axiomAnnotations ObjectPropertyExpression sourceIndividual targetIndividual ')'"
 [& args]
 (apply fs/notRoleFact (apply oio/extractParams args)))

(defn dataRoleFact 
 "DataPropertyAssertion := 'DataPropertyAssertion' '(' axiomAnnotations DataPropertyExpression sourceIndividual targetValue ')'"
 [& args]
 (apply fs/dataRoleFact (apply oio/extractParams args)))

(defn notDataRoleFact 
 "NegativeDataPropertyAssertion := 'NegativeDataPropertyAssertion' '(' axiomAnnotations DataPropertyExpression sourceIndividual targetValue ')'"
 [& args]
 (apply fs/notDataRoleFact (apply oio/extractParams args)))

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
 (apply ann/annotation (apply oio/extractParams args)))

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
 (let [args (apply oio/extractParams args) ann (if (set? (first args)) (first args) nil) args (if (nil? ann) args (rest args))]
  (cond
   (string? (first args)) (if (string? (first (rest args))) (apply ax/classImplication (cons ann args)) (if (= :class (:type (first (rest args))))(apply ax/classImplication (cons ann args)) (if (nil? (:type (first (rest args)))) (apply ax/classImplication (cons ann args)) (throw (Exception. (str {:type ::notImplication :annotations ann :args args}))))))
   (nil? (:type (first args))) (if (string? (first (rest args))) (apply ax/classImplication (cons ann args)) (if (= :class (:type (first (rest args))))(apply ax/classImplication (cons ann args)) (if (nil? (:type (first (rest args)))) (apply ax/classImplication (cons ann args)) (throw (Exception. (str {:type ::notImplication :annotations ann :args args}))))))
   (= :class (:type (first args))) (apply ax/classImplication (cons ann args))
   (= :class (:type (first (rest args)))) (apply ax/classImplication (conj ann args))
   (= :role (:type (first args))) (apply ax/roleImplication (cons ann args))
   (= :roleChain (:type (first args))) (apply ax/roleImplication (cons ann args))
   (= :role (:type (first (rest args)))) (apply ax/roleImplication (cons ann args))
   (= :dataRole (:type (first args))) (apply ax/dataRoleImplication (cons ann args))
   (= :dataRole (:type (first (rest args)))) (apply ax/dataRoleImplication (cons ann args))
   (= :annotationRole (:type (first args))) (apply ax/annotationImplication (cons ann args))
   (= :annotationRole (:type (first (rest args)))) (apply ax/annotationImplication (cons ann args))
   :else (throw (Exception. (str {:type ::notImplication :annotations ann :args args}))))))

(defn fact
 "Will attempt to infer a valid fact based on the arguments supplied. If the first argument is string, it will create a class fact when there are 2, role fact when 3."
 [& args]
 (let [args (apply oio/extractParams args) ann (if (set? (first args)) (first args) nil) args (if (nil? ann) args (rest args))]
  (cond
   (= 2 (count args)) (apply fs/classFact (cons ann args))
   (= :role (:type (first args))) (apply fs/roleFact (cons ann args))
   (= :literal (:type (last args))) (apply fs/dataRoleFact (cons ann args))
   (string? (first args)) (apply fs/roleFact (cons ann args))   
   (= :annotationRole (:type (first args))) (apply ax/annotationFact (cons ann args))
   (= :dataRole (:type (first args))) (apply fs/dataRoleFact (cons ann args))
   :else (throw (Exception. (str {:type ::notFact :annotations ann :args args}))))))

(defn notFact
 "Will attempt to infer a valid negative fact based on the arguments supplied. If the first argument is string, it will create a negative role fact."
 [& args]
 (let [args (apply oio/extractParams args) ann (if (set? (first args)) (first args) nil) args (if (nil? ann) args (rest args))]
  (cond
   (= :role (:type (first args))) (apply fs/notRoleFact (cons ann args)) 
   (= :literal (:type (last args))) (apply fs/notDataRoleFact (cons ann args))    
   (string? (first args)) (apply fs/notRoleFact (cons ann args))
   (= :dataRole (:type (first args))) (apply fs/notDataRoleFact (cons ann args))
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

(defn literal
 "literal := stringLiteral | typedLiteral"
 [literalString]
 (co/literal literalString))

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
 "DatatypeRestriction := 'DatatypeRestriction' '(' Datatype constrainingFacet restrictionValue { constrainingFacet restrictionValue } ')'"
 [& args]
 (apply co/datatypeRestriction (apply oio/extractFirstParamFromList args)))

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

(defn class
 "ClassExpression := Class | ObjectIntersectionOf | ObjectUnionOf | ObjectComplementOf | ObjectOneOf | ObjectSomeValuesFrom | ObjectAllValuesFrom | ObjectHasValue | ObjectHasSelf | ObjectMinCardinality | ObjectMaxCardinality | ObjectExactCardinality | DataSomeValuesFrom | DataAllValuesFrom | DataHasValue | DataMinCardinality | DataMaxCardinality | DataExactCardinality"
 ([iri](ex/class iri))
 ([prefix name](ex/class prefix name))
 ([prefix name namespace](ex/class prefix name namespace)))

(defn and
 "ObjectIntersectionOf := 'ObjectIntersectionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'"
 ([class1 class2](ex/and class1 class2))
 ([class1 class2 & classes](ex/and class1 class2 classes)))

(defn or
 "ObjectUnionOf := 'ObjectUnionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'"
 ([class1 class2](ex/or class1 class2))
 ([class1 class2 & classes](ex/or class1 class2 classes)))

(defn not 
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

(defn readOWLFile 
 "Reads an OWL file to obtain an ontology.
  Optional argument allows choice of file type. No option defaults to functional syntax. 
  (Currently only functional syntax defined)"
 ([file & fileType]
  (case fileType
   nil (oio/readOWLFile file reg/functionalSyntax)
   :functional (oio/readOWLFile file reg/functionalSyntax))))

(defn toString 
 "Returns a functional syntax string representation of the map object used to store the OWL data, or the default representation if there is no OWL type contained in the map. Note that this is __*not*__ the same as java toString."
 [thing]
 (oio/toString thing))

(defn toDLString 
 "Returns a DL syntax string representation of the map object used to store the OWL object, or the default representation if there is no OWL type contained in the map."
 [thing]
 (oio/toDLString thing))

(defn makeOWLFile
 "Writes an owl file of the ontology with the supplied file name. 
  Optional argument allows choice of file type. No option defaults to functional syntax. 
  (Currently only functional syntax defined)"
 [ontology filename & fileType]
 (case fileType
  nil (oio/makeOWLFile filename (:prefixes ontology) (:ontologyIRI ontology) (:versionIRI ontology) (:imports ontology) (:annotations ontology) (:axioms ontology))
  :functional (oio/makeOWLFile filename (:prefixes ontology) (:ontologyIRI ontology) (:versionIRI ontology) (:imports ontology) (:annotations ontology) (:axioms ontology))))

(def printStyle 
 "Change printStyle to modify how the terminal output looks (files will still output in functional syntax)
 
  toString - standard Functional syntax

  toDLString - DL instead of functional"
 toString) 
(defmethod print-method clojure.lang.PersistentArrayMap [x w](.write w (printStyle x)))
(defmethod print-method clojure.lang.PersistentHashMap [x w](.write w (printStyle x)))