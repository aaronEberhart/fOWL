// Compiled by ClojureScript 1.10.758 {}
goog.provide('ontology.regexes');
goog.require('cljs.core');
ontology.regexes.functionalSyntax = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"literalLangPat","literalLangPat",-682177919),new cljs.core.Keyword(null,"prefIRIPat","prefIRIPat",-1779936121),new cljs.core.Keyword(null,"commPat","commPat",-1032911065),new cljs.core.Keyword(null,"importPat","importPat",-99167221),new cljs.core.Keyword(null,"literalQuotedPat","literalQuotedPat",-109042896),new cljs.core.Keyword(null,"closeParenPat","closeParenPat",-1342003855),new cljs.core.Keyword(null,"prefixPat","prefixPat",2028456689),new cljs.core.Keyword(null,"axiomPat","axiomPat",1614553714),new cljs.core.Keyword(null,"expressionPat","expressionPat",-993701485),new cljs.core.Keyword(null,"fullIRIPat","fullIRIPat",1251135091),new cljs.core.Keyword(null,"iriStopPat","iriStopPat",1004521300),new cljs.core.Keyword(null,"annotationPat","annotationPat",-762588874),new cljs.core.Keyword(null,"numPat","numPat",1165290294),new cljs.core.Keyword(null,"literalTypedPat","literalTypedPat",535018778),new cljs.core.Keyword(null,"donePat","donePat",-1206464550),new cljs.core.Keyword(null,"blankPat","blankPat",895825596),new cljs.core.Keyword(null,"ontPat","ontPat",879855356)],[/^\"([\s\S]*?(?<!\\))\"\@([^\s\(\)\"\\\:]+)\s*([\s\S]*)/,/^([^\<\(\)\"\\\s]*\:[^\>\(\)\"\\\s]+)\s*([\s\S]*)/,/^(#[^\r\n\f]*)([\s\S]*)/,/^Import\s*\(\s*[<]([^>]+)[>]\s*\)\s*([\s\S]*)/,/^\"([\s\S]*?(?<!\\))\"\s*([\s\S]*)/,/^(\))\s*([\s\S]*)/,/^(?:Prefix)\s*\(\s*([^\)\:]*)\:=\s*[<]([^>]+)[>]\s*\)\s*([\s\S]*)/,/(Declaration|SubClassOf|EquivalentClasses|DisjointClasses|DisjointUnion|SubObjectPropertyOf|EquivalentObjectProperties|SubObjectPropertyOf|DisjointObjectProperties|InverseObjectProperties|ObjectPropertyDomain|ObjectPropertyRange|FunctionalObjectProperty|InverseFunctionalObjectProperty|ReflexiveObjectProperty|IrreflexiveObjectProperty|SymmetricObjectProperty|AsymmetricObjectProperty|TransitiveObjectProperty|SubDataPropertyOf|EquivalentDataProperties|DisjointDataProperties|DataPropertyDomain|DataPropertyRange|FunctionalDataProperty|SameIndividual|DifferentIndividuals|ClassAssertion|ObjectPropertyAssertion|NegativeObjectPropertyAssertion|HasKey|DataPropertyAssertion|NegativeDataPropertyAssertion|AnnotationAssertion|SubAnnotationPropertyOf|AnnotationPropertyDomain|AnnotationPropertyRange|DatatypeDefinition|DGRule|DLSafeRule)\s*\(\s*([\s\S]*)/,/(ObjectInverseOf|Class|Datatype|ObjectProperty|DataProperty|AnnotationProperty|NamedIndividual|ObjectPropertyChain|ObjectIntersectionOf|ObjectUnionOf|ObjectComplementOf|ObjectOneOf|ObjectSomeValuesFrom|ObjectAllValuesFrom|ObjectHasValue|ObjectHasSelf|ObjectMinCardinality|ObjectMaxCardinality|ObjectExactCardinality|DataSomeValuesFrom|DataAllValuesFrom|DataHasValue|DataMinCardinality|DataMaxCardinality|DataExactCardinality|DataIntersectionOf|DataUnionOf|DataComplementOf|DataOneOf|DatatypeRestriction|Variable|Body|Head|ClassAtom|DataRangeAtom|ObjectPropertyAtom|DataPropertyAtom|BuiltInAtom|SameIndividualAtom|DifferentIndividualsAtom)\s*\(\s*([\s\S]*)/,/^([<][^>]+[>])\s*([\s\S]*)/,/^(?:Annotation|Import|Declaration|SubClassOf|EquivalentClasses|DisjointClasses|DisjointUnion|SubObjectPropertyOf|EquivalentObjectProperties|SubObjectPropertyOf|DisjointObjectProperties|InverseObjectProperties|ObjectPropertyDomain|ObjectPropertyRange|FunctionalObjectProperty|InverseFunctionalObjectProperty|ReflexiveObjectProperty|IrreflexiveObjectProperty|SymmetricObjectProperty|AsymmetricObjectProperty|TransitiveObjectProperty|SubDataPropertyOf|EquivalentDataProperties|DisjointDataProperties|DataPropertyDomain|DataPropertyRange|FunctionalDataProperty|SameIndividual|DifferentIndividuals|ClassAssertion|ObjectPropertyAssertion|NegativeObjectPropertyAssertion|HasKey|DataPropertyAssertion|NegativeDataPropertyAssertion|AnnotationAssertion|SubAnnotationPropertyOf|AnnotationPropertyDomain|AnnotationPropertyRange|DatatypeDefinition|DGRule|DLSafeRule)[\s\S]*/,/^(Annotation)\s*\(\s*([\s\S]*)/,/^(\d+)\s*([\s\S]*)/,/^\"([\s\S]*?(?<!\\))\"\^\^(?:(?:[<]([^>]+)[>])|([^\<\>\s\(\)\"\\]*\:[^\<\>\s\(\)\"\\]+))\s*([\s\S]*)/,/^\s*\)\s*/,/^(\s*)$/,/^(Ontology)\s*\(\s*([\s\S]*)/]);

//# sourceMappingURL=regexes.js.map
