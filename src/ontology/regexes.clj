(ns ontology.regexes
 "Regexes for reading files")

(def functionalSyntax
 "Functional Syntax OWL File Regexes"
 {:iriStopPat #"^\s*(?:Annotation|Import|Declaration|SubClassOf|EquivalentClasses|DisjointClasses|DisjointUnion|SubObjectPropertyOf|EquivalentObjectProperties|SubObjectPropertyOf|DisjointObjectProperties|InverseObjectProperties|ObjectPropertyDomain|ObjectPropertyRange|FunctionalObjectProperty|InverseFunctionalObjectProperty|ReflexiveObjectProperty|IrreflexiveObjectProperty|SymmetricObjectProperty|AsymmetricObjectProperty|TransitiveObjectProperty|SubDataPropertyOf|EquivalentDataProperties|DisjointDataProperties|DataPropertyDomain|DataPropertyRange|FunctionalDataProperty|SameIndividual|DifferentIndividuals|ClassAssertion|ObjectPropertyAssertion|NegativeObjectPropertyAssertion|HasKey|DataPropertyAssertion|NegativeDataPropertyAssertion|AnnotationAssertion|SubAnnotationPropertyOf|AnnotationPropertyDomain|AnnotationPropertyRange|DatatypeDefinition|DGRule|DLSafeRule)[\s\S]*"
  :closeParenPat #"^\s*(\))\s*([\s\S]*)"
  :axiomPat #"\s*(Declaration|SubClassOf|EquivalentClasses|DisjointClasses|DisjointUnion|SubObjectPropertyOf|EquivalentObjectProperties|SubObjectPropertyOf|DisjointObjectProperties|InverseObjectProperties|ObjectPropertyDomain|ObjectPropertyRange|FunctionalObjectProperty|InverseFunctionalObjectProperty|ReflexiveObjectProperty|IrreflexiveObjectProperty|SymmetricObjectProperty|AsymmetricObjectProperty|TransitiveObjectProperty|SubDataPropertyOf|EquivalentDataProperties|DisjointDataProperties|DataPropertyDomain|DataPropertyRange|FunctionalDataProperty|SameIndividual|DifferentIndividuals|ClassAssertion|ObjectPropertyAssertion|NegativeObjectPropertyAssertion|HasKey|DataPropertyAssertion|NegativeDataPropertyAssertion|AnnotationAssertion|SubAnnotationPropertyOf|AnnotationPropertyDomain|AnnotationPropertyRange|DatatypeDefinition|DGRule|DLSafeRule)\s*\(\s*([\s\S]*)"
  :fullIRIPat #"^\s*([<][^>]+[>])\s*([\s\S]*)"
  :prefIRIPat #"^\s*([^\<\(\)\"\\\s]*\:[^\>\(\)\"\\\s]+)\s*([\s\S]*)"
  :literalTypedPat #"^\^\^(?:(?:[<]([^>]+)[>])|([^\<\>\s\(\)\"\\]*\:[^\<\>\s\(\)\"\\]+))\s*([\s\S]*)"
  :literalQuotedPat #"^\s*\"([\s\S]*?(?<!\\)(?:\\\\)*?)\"(?=\s|\^|\@|\))\s*([\s\S]*)"
  :literalLangPat #"^\@([^\s\(\)\"\\\:]+)\s*([\s\S]*)"
  :numPat #"^\s*(\d+)\s*([\s\S]*)"
  :commPat #"^\s*(#[^\r\n\f]*)([\s\S]*)"
  :blankPat #"^(\s*)$"
  :expressionPat #"\s*(ObjectInverseOf|Class|Datatype|ObjectProperty|DataProperty|AnnotationProperty|NamedIndividual|ObjectPropertyChain|ObjectIntersectionOf|ObjectUnionOf|ObjectComplementOf|ObjectOneOf|ObjectSomeValuesFrom|ObjectAllValuesFrom|ObjectHasValue|ObjectHasSelf|ObjectMinCardinality|ObjectMaxCardinality|ObjectExactCardinality|DataSomeValuesFrom|DataAllValuesFrom|DataHasValue|DataMinCardinality|DataMaxCardinality|DataExactCardinality|DataIntersectionOf|DataUnionOf|DataComplementOf|DataOneOf|DatatypeRestriction|Variable|Body|Head|ClassAtom|DataRangeAtom|ObjectPropertyAtom|DataPropertyAtom|BuiltInAtom|SameIndividualAtom|DifferentIndividualsAtom)\s*\(\s*([\s\S]*)"
  :prefixPat #"^\s*(?:Prefix)\s*\(\s*([^\)\:]*)\:=\s*[<]([^>]+)[>]\s*\)\s*([\s\S]*)"
  :annotationPat #"^\s*(Annotation)\s*\(\s*([\s\S]*)"
  :ontPat #"^\s*(Ontology)\s*\(\s*([\s\S]*)"
  :importPat #"^\s*Import\s*\(\s*[<]([^>]+)[>]\s*\)\s*([\s\S]*)"
  :donePat #"^\s*\)\s*"})
