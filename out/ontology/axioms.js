// Compiled by ClojureScript 1.10.758 {}
goog.provide('ontology.axioms');
goog.require('cljs.core');
goog.require('ontology.annotations');
goog.require('ontology.components');
goog.require('ontology.expressions');
goog.require('ontology.SWRL');
ontology.axioms.axiomTypes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 10, [new cljs.core.Keyword(null,"dataRoleAxiom","dataRoleAxiom",-1907347100),null,new cljs.core.Keyword(null,"dgAxiom","dgAxiom",542341860),null,new cljs.core.Keyword(null,"rule","rule",729973257),null,new cljs.core.Keyword(null,"fact","fact",-799816531),null,new cljs.core.Keyword(null,"annotationAxiom","annotationAxiom",-1418754387),null,new cljs.core.Keyword(null,"classAxiom","classAxiom",2001762552),null,new cljs.core.Keyword(null,"declaration","declaration",-1819933768),null,new cljs.core.Keyword(null,"newDataType","newDataType",224607193),null,new cljs.core.Keyword(null,"roleAxiom","roleAxiom",-107467206),null,new cljs.core.Keyword(null,"hasKey","hasKey",-30264325),null], null), null);
ontology.axioms.classAxiomTypes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"classImplication","classImplication",964999104),null,new cljs.core.Keyword(null,"disjClasses","disjClasses",-1491810460),null,new cljs.core.Keyword(null,"disjOr","disjOr",-697034992),null,new cljs.core.Keyword(null,"=classes","=classes",-1321469605),null], null), null);
ontology.axioms.roleAxiomTypes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 13, [new cljs.core.Keyword(null,"inverseRoles","inverseRoles",-966864539),null,new cljs.core.Keyword(null,"=roles","=roles",-1133955642),null,new cljs.core.Keyword(null,"roleDomain","roleDomain",2022033705),null,new cljs.core.Keyword(null,"roleRange","roleRange",674235051),null,new cljs.core.Keyword(null,"transitiveRole","transitiveRole",1672784272),null,new cljs.core.Keyword(null,"asymmetricRole","asymmetricRole",-335165358),null,new cljs.core.Keyword(null,"reflexiveRole","reflexiveRole",2037412402),null,new cljs.core.Keyword(null,"disjRoles","disjRoles",-1951145229),null,new cljs.core.Keyword(null,"functionalRole","functionalRole",-158923209),null,new cljs.core.Keyword(null,"roleImplication","roleImplication",-9539785),null,new cljs.core.Keyword(null,"irreflexiveRole","irreflexiveRole",-942889990),null,new cljs.core.Keyword(null,"functionalInverseRole","functionalInverseRole",1756823579),null,new cljs.core.Keyword(null,"symmetricRole","symmetricRole",375567067),null], null), null);
ontology.axioms.dataRoleAxiomTypes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"dataRoleRange","dataRoleRange",-1702324412),null,new cljs.core.Keyword(null,"dataRoleDomain","dataRoleDomain",-346202227),null,new cljs.core.Keyword(null,"functionalDataRole","functionalDataRole",1103771534),null,new cljs.core.Keyword(null,"disjDataRoles","disjDataRoles",799620529),null,new cljs.core.Keyword(null,"dataRoleImplication","dataRoleImplication",-1801956108),null,new cljs.core.Keyword(null,"=DataRoles","=DataRoles",1110777758),null], null), null);
ontology.axioms.annotationAxiomTypes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"annotationFact","annotationFact",-1090765214),null,new cljs.core.Keyword(null,"annotationDomain","annotationDomain",1599570091),null,new cljs.core.Keyword(null,"annotationRange","annotationRange",1738358005),null,new cljs.core.Keyword(null,"annotationImplication","annotationImplication",-1908681157),null], null), null);
/**
 * Axiom := Declaration | ClassAxiom | ObjectPropertyAxiom | DataPropertyAxiom | DatatypeDefinition | HasKey | Assertion | AnnotationAxiom
 */
ontology.axioms._axiom = (function ontology$axioms$_axiom(axiom){
if(cljs.core.contains_QMARK_.call(null,ontology.axioms.axiomTypes,new cljs.core.Keyword(null,"outerType","outerType",1894167495).cljs$core$IFn$_invoke$arity$1(axiom))){
return cljs.core.assoc.call(null,axiom,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"axiom","axiom",-1683284564));
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAxiom","ontology.axioms/notAxiom",-1306757860),new cljs.core.Keyword(null,"axiom","axiom",-1683284564),axiom], null))));
}
});
/**
 * Rule ::= DLSafeRule | DGRule
 */
ontology.axioms._rule = (function ontology$axioms$_rule(r){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(r),new cljs.core.Keyword(null,"dgRule","dgRule",1966492802))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(r),new cljs.core.Keyword(null,"dlSafeRule","dlSafeRule",-1922098287))))){
return cljs.core.assoc.call(null,r,new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"rule","rule",729973257));
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRule","ontology.axioms/notRule",927353440),new cljs.core.Keyword(null,"rule","rule",729973257),r], null))));
}
});
/**
 * DGRule ::= DescriptionGraphRule ‘(’ {Annotation} ‘Body’ ‘(’ {DGAtom} ‘)’ ‘Head’ ‘(’ {DGAtom} ‘)’ ‘)'
 */
ontology.axioms._dgRule = (function ontology$axioms$_dgRule(){
return null;
});
ontology.axioms.dgRule = (function ontology$axioms$dgRule(var_args){
var G__763 = arguments.length;
switch (G__763) {
case 2:
return ontology.axioms.dgRule.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.dgRule.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.dgRule.cljs$core$IFn$_invoke$arity$2 = (function (body,head){
return ontology.axioms._axiom.call(null,ontology.axioms._rule.call(null,ontology.axioms._dgRule.call(null,body,head)));
}));

(ontology.axioms.dgRule.cljs$core$IFn$_invoke$arity$3 = (function (annotations,body,head){
return ontology.axioms._axiom.call(null,ontology.axioms._rule.call(null,ontology.axioms._dgRule.call(null,body,head)));
}));

(ontology.axioms.dgRule.cljs$lang$maxFixedArity = 3);

/**
 * DLSafeRule ::= DLSafeRule ‘(’ {Annotation} ‘Body’ ‘(’ {Atom} ‘)’ ‘Head’ ‘(’ {Atom} ‘)’ ‘)’
 */
ontology.axioms._dlSafeRule = (function ontology$axioms$_dlSafeRule(var_args){
var G__766 = arguments.length;
switch (G__766) {
case 2:
return ontology.axioms._dlSafeRule.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._dlSafeRule.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._dlSafeRule.cljs$core$IFn$_invoke$arity$2 = (function (body,head){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(body),new cljs.core.Keyword(null,"body","body",-2049205669))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(head),new cljs.core.Keyword(null,"head","head",-771383919))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.Keyword(null,"atoms","atoms",-392247738).cljs$core$IFn$_invoke$arity$1(body),new cljs.core.Keyword(null,"head","head",-771383919),new cljs.core.Keyword(null,"atoms","atoms",-392247738).cljs$core$IFn$_invoke$arity$1(head),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dlSafeRule","dlSafeRule",-1922098287),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dlSafeRule","dlSafeRule",-1922098287),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"dlSafeRule","dlSafeRule",-1922098287)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notHead","ontology.axioms/notHead",-1441221590),new cljs.core.Keyword(null,"head","head",-771383919),head], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notBody","ontology.axioms/notBody",1693714964),new cljs.core.Keyword(null,"body","body",-2049205669),body], null))));
}
}));

(ontology.axioms._dlSafeRule.cljs$core$IFn$_invoke$arity$3 = (function (annotations,body,head){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(body),new cljs.core.Keyword(null,"body","body",-2049205669))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(head),new cljs.core.Keyword(null,"head","head",-771383919))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.Keyword(null,"atoms","atoms",-392247738).cljs$core$IFn$_invoke$arity$1(body),new cljs.core.Keyword(null,"head","head",-771383919),new cljs.core.Keyword(null,"atoms","atoms",-392247738).cljs$core$IFn$_invoke$arity$1(head),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dlSafeRule","dlSafeRule",-1922098287),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dlSafeRule","dlSafeRule",-1922098287),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"dlSafeRule","dlSafeRule",-1922098287)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notHead","ontology.axioms/notHead",-1441221590),new cljs.core.Keyword(null,"head","head",-771383919),head], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notBody","ontology.axioms/notBody",1693714964),new cljs.core.Keyword(null,"body","body",-2049205669),body], null))));
}
}));

(ontology.axioms._dlSafeRule.cljs$lang$maxFixedArity = 3);

ontology.axioms.dlSafeRule = (function ontology$axioms$dlSafeRule(var_args){
var G__769 = arguments.length;
switch (G__769) {
case 2:
return ontology.axioms.dlSafeRule.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.dlSafeRule.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.dlSafeRule.cljs$core$IFn$_invoke$arity$2 = (function (body,head){
return ontology.axioms._axiom.call(null,ontology.axioms._rule.call(null,ontology.axioms._dlSafeRule.call(null,body,head)));
}));

(ontology.axioms.dlSafeRule.cljs$core$IFn$_invoke$arity$3 = (function (annotations,body,head){
return ontology.axioms._axiom.call(null,ontology.axioms._rule.call(null,ontology.axioms._dlSafeRule.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),body,head)));
}));

(ontology.axioms.dlSafeRule.cljs$lang$maxFixedArity = 3);

/**
 * DGAxiom ::= ‘DescriptionGraph’ ‘(’ {Annotation} DGName DGNodes DGEdges MainClasses ‘)’
 */
ontology.axioms.dgAxiom = (function ontology$axioms$dgAxiom(){
return null;
});
/**
 * Declaration := 'Declaration' '(' axiomAnnotations Entity ')'
 */
ontology.axioms._declaration = (function ontology$axioms$_declaration(var_args){
var G__772 = arguments.length;
switch (G__772) {
case 1:
return ontology.axioms._declaration.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._declaration.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._declaration.cljs$core$IFn$_invoke$arity$1 = (function (name){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(name),new cljs.core.Keyword(null,"name","name",1843675177))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"declaration","declaration",-1819933768),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"declaration","declaration",-1819933768),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"declaration","declaration",-1819933768)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notName","ontology.axioms/notName",1387437099),new cljs.core.Keyword(null,"name","name",1843675177),name], null))));
}
}));

(ontology.axioms._declaration.cljs$core$IFn$_invoke$arity$2 = (function (annotations,name){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(name),new cljs.core.Keyword(null,"name","name",1843675177))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"declaration","declaration",-1819933768),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"declaration","declaration",-1819933768),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"declaration","declaration",-1819933768)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notName","ontology.axioms/notName",1387437099),new cljs.core.Keyword(null,"name","name",1843675177),name], null))));
}
}));

(ontology.axioms._declaration.cljs$lang$maxFixedArity = 2);

ontology.axioms.declaration = (function ontology$axioms$declaration(var_args){
var G__775 = arguments.length;
switch (G__775) {
case 1:
return ontology.axioms.declaration.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.declaration.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.declaration.cljs$core$IFn$_invoke$arity$1 = (function (name){
return ontology.axioms._axiom.call(null,ontology.axioms._declaration.call(null,name));
}));

(ontology.axioms.declaration.cljs$core$IFn$_invoke$arity$2 = (function (annotations,name){
return ontology.axioms._axiom.call(null,ontology.axioms._declaration.call(null,annotations,name));
}));

(ontology.axioms.declaration.cljs$lang$maxFixedArity = 2);

/**
 * ClassAxiom := SubClassOf | EquivalentClasses | DisjointClasses | DisjointUnion
 */
ontology.axioms._classAxiom = (function ontology$axioms$_classAxiom(classAxiom){
if(cljs.core.contains_QMARK_.call(null,ontology.axioms.classAxiomTypes,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(classAxiom))){
return cljs.core.assoc.call(null,classAxiom,new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"classAxiom","classAxiom",2001762552));
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClassAxiom","ontology.axioms/notClassAxiom",796121369),new cljs.core.Keyword(null,"classAxiom","classAxiom",2001762552),classAxiom], null))));
}
});
/**
 * subClassExpression := ClassExpression
 */
ontology.axioms._antecedentClass = (function ontology$axioms$_antecedentClass(class$){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
return class$;
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClass","ontology.axioms/notClass",1836306604),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
});
/**
 * superClassExpression := ClassExpression
 */
ontology.axioms._consequentClass = (function ontology$axioms$_consequentClass(class$){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
return class$;
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClass","ontology.axioms/notClass",1836306604),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
});
/**
 * SubClassOf := 'SubClassOf' '(' axiomAnnotations subClassExpression superClassExpression ')'
 */
ontology.axioms._classImplication = (function ontology$axioms$_classImplication(var_args){
var G__778 = arguments.length;
switch (G__778) {
case 2:
return ontology.axioms._classImplication.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._classImplication.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._classImplication.cljs$core$IFn$_invoke$arity$2 = (function (antecedent,consequent){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(antecedent),new cljs.core.Keyword(null,"class","class",-2030961996))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(consequent),new cljs.core.Keyword(null,"class","class",-2030961996))))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"antecedentClass","antecedentClass",1658877533),antecedent,new cljs.core.Keyword(null,"consequentClass","consequentClass",1301299136),consequent,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"classImplication","classImplication",964999104),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"classImplication","classImplication",964999104),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"classImplication","classImplication",964999104)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAntecedentConsequentClasses","ontology.axioms/notAntecedentConsequentClasses",1727113575),new cljs.core.Keyword(null,"antecedentClass","antecedentClass",1658877533),antecedent,new cljs.core.Keyword(null,"consequentClass","consequentClass",1301299136),consequent], null))));
}
}));

(ontology.axioms._classImplication.cljs$core$IFn$_invoke$arity$3 = (function (annotations,antecedent,consequent){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(antecedent),new cljs.core.Keyword(null,"class","class",-2030961996))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(consequent),new cljs.core.Keyword(null,"class","class",-2030961996))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"antecedentClass","antecedentClass",1658877533),antecedent,new cljs.core.Keyword(null,"consequentClass","consequentClass",1301299136),consequent,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"classImplication","classImplication",964999104),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"classImplication","classImplication",964999104),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"classImplication","classImplication",964999104)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAntecedentConsequentClasses","ontology.axioms/notAntecedentConsequentClasses",1727113575),new cljs.core.Keyword(null,"antecedentClass","antecedentClass",1658877533),antecedent,new cljs.core.Keyword(null,"consequentClass","consequentClass",1301299136),consequent], null))));
}
}));

(ontology.axioms._classImplication.cljs$lang$maxFixedArity = 3);

ontology.axioms.classImplication = (function ontology$axioms$classImplication(var_args){
var G__781 = arguments.length;
switch (G__781) {
case 2:
return ontology.axioms.classImplication.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.classImplication.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.classImplication.cljs$core$IFn$_invoke$arity$2 = (function (antecedent,consequent){
return ontology.axioms._axiom.call(null,ontology.axioms._classAxiom.call(null,ontology.axioms._classImplication.call(null,ontology.expressions.class$.call(null,antecedent),ontology.expressions.class$.call(null,consequent))));
}));

(ontology.axioms.classImplication.cljs$core$IFn$_invoke$arity$3 = (function (annotations,antecedent,consequent){
return ontology.axioms._axiom.call(null,ontology.axioms._classAxiom.call(null,ontology.axioms._classImplication.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.class$.call(null,antecedent),ontology.expressions.class$.call(null,consequent))));
}));

(ontology.axioms.classImplication.cljs$lang$maxFixedArity = 3);

/**
 * EquivalentClasses := 'EquivalentClasses' '(' axiomAnnotations ClassExpression ClassExpression { ClassExpression } ')'
 */
ontology.axioms.__EQ_classes = (function ontology$axioms$__EQ_classes(var_args){
var G__784 = arguments.length;
switch (G__784) {
case 1:
return ontology.axioms.__EQ_classes.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.__EQ_classes.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.__EQ_classes.cljs$core$IFn$_invoke$arity$1 = (function (classes){
if(((1) < cljs.core.count.call(null,classes))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"class","class",-2030961996));
}),classes)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"classes","classes",2037804510),classes,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=classes","=classes",-1321469605),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=classes","=classes",-1321469605),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"=classes","=classes",-1321469605)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClasses","ontology.axioms/notClasses",746377515),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughClasses","ontology.axioms/notEnoughClasses",496239232),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
}));

(ontology.axioms.__EQ_classes.cljs$core$IFn$_invoke$arity$2 = (function (annotations,classes){
if(((1) < cljs.core.count.call(null,classes))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"class","class",-2030961996));
}),classes)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"classes","classes",2037804510),classes,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=classes","=classes",-1321469605),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=classes","=classes",-1321469605),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"=classes","=classes",-1321469605)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClasses","ontology.axioms/notClasses",746377515),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughClasses","ontology.axioms/notEnoughClasses",496239232),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
}));

(ontology.axioms.__EQ_classes.cljs$lang$maxFixedArity = 2);

ontology.axioms._EQ_classes = (function ontology$axioms$_EQ_classes(var_args){
var G__787 = arguments.length;
switch (G__787) {
case 1:
return ontology.axioms._EQ_classes.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._EQ_classes.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._EQ_classes.cljs$core$IFn$_invoke$arity$1 = (function (classes){
return ontology.axioms._axiom.call(null,ontology.axioms._classAxiom.call(null,ontology.axioms.__EQ_classes.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.class$,classes)))));
}));

(ontology.axioms._EQ_classes.cljs$core$IFn$_invoke$arity$2 = (function (annotations,classes){
return ontology.axioms._axiom.call(null,ontology.axioms._classAxiom.call(null,ontology.axioms.__EQ_classes.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.class$,classes)))));
}));

(ontology.axioms._EQ_classes.cljs$lang$maxFixedArity = 2);

/**
 * DisjointClasses := 'DisjointClasses' '(' axiomAnnotations ClassExpression ClassExpression { ClassExpression } ')'
 */
ontology.axioms._disjClasses = (function ontology$axioms$_disjClasses(var_args){
var G__790 = arguments.length;
switch (G__790) {
case 1:
return ontology.axioms._disjClasses.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._disjClasses.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._disjClasses.cljs$core$IFn$_invoke$arity$1 = (function (classes){
if(((1) < cljs.core.count.call(null,classes))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"class","class",-2030961996));
}),classes)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"classes","classes",2037804510),classes,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"disjClasses","disjClasses",-1491810460),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"disjClasses","disjClasses",-1491810460),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"disjClasses","disjClasses",-1491810460)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClasses","ontology.axioms/notClasses",746377515),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughClasses","ontology.axioms/notEnoughClasses",496239232),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
}));

(ontology.axioms._disjClasses.cljs$core$IFn$_invoke$arity$2 = (function (annotations,classes){
if(((1) < cljs.core.count.call(null,classes))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"class","class",-2030961996));
}),classes)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"classes","classes",2037804510),classes,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"disjClasses","disjClasses",-1491810460),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"disjClasses","disjClasses",-1491810460),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"disjClasses","disjClasses",-1491810460)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClasses","ontology.axioms/notClasses",746377515),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughClasses","ontology.axioms/notEnoughClasses",496239232),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
}));

(ontology.axioms._disjClasses.cljs$lang$maxFixedArity = 2);

ontology.axioms.disjClasses = (function ontology$axioms$disjClasses(var_args){
var G__793 = arguments.length;
switch (G__793) {
case 1:
return ontology.axioms.disjClasses.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.disjClasses.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.disjClasses.cljs$core$IFn$_invoke$arity$1 = (function (classes){
return ontology.axioms._axiom.call(null,ontology.axioms._classAxiom.call(null,ontology.axioms._disjClasses.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.class$,classes)))));
}));

(ontology.axioms.disjClasses.cljs$core$IFn$_invoke$arity$2 = (function (annotations,classes){
return ontology.axioms._axiom.call(null,ontology.axioms._classAxiom.call(null,ontology.axioms._disjClasses.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.class$,classes)))));
}));

(ontology.axioms.disjClasses.cljs$lang$maxFixedArity = 2);

/**
 * DisjointUnion := 'DisjointUnion' '(' axiomAnnotations Class disjointClassExpressions ')'
 */
ontology.axioms._disjOr = (function ontology$axioms$_disjOr(var_args){
var G__796 = arguments.length;
switch (G__796) {
case 2:
return ontology.axioms._disjOr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._disjOr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._disjOr.cljs$core$IFn$_invoke$arity$2 = (function (class$,classes){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(classes),new cljs.core.Keyword(null,"disjClassesNoAnn","disjClassesNoAnn",-662547374))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(classes),new cljs.core.Keyword(null,"disjClasses","disjClasses",-1491810460))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"classes","classes",2037804510),new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(classes),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"disjOr","disjOr",-697034992),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"disjOr","disjOr",-697034992),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"disjOr","disjOr",-697034992)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClasses","ontology.axioms/notClasses",746377515),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughClasses","ontology.axioms/notEnoughClasses",496239232),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
}));

(ontology.axioms._disjOr.cljs$core$IFn$_invoke$arity$3 = (function (annotations,class$,classes){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(classes),new cljs.core.Keyword(null,"disjClassesNoAnn","disjClassesNoAnn",-662547374))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"classes","classes",2037804510),new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(classes),new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"disjOr","disjOr",-697034992),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"disjOr","disjOr",-697034992),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"disjOr","disjOr",-697034992)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClasses","ontology.axioms/notClasses",746377515),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughClasses","ontology.axioms/notEnoughClasses",496239232),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
}));

(ontology.axioms._disjOr.cljs$lang$maxFixedArity = 3);

/**
 * disjointClassExpressions := ClassExpression ClassExpression { ClassExpression }
 */
ontology.axioms._disjClassesNoAnn = (function ontology$axioms$_disjClassesNoAnn(classes){
if(((1) < cljs.core.count.call(null,classes))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"class","class",-2030961996));
}),classes)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"classes","classes",2037804510),classes,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"disjClassesNoAnn","disjClassesNoAnn",-662547374),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"disjOr","disjOr",-697034992)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClasses","ontology.axioms/notClasses",746377515),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughClasses","ontology.axioms/notEnoughClasses",496239232),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
});
ontology.axioms.disjOr = (function ontology$axioms$disjOr(var_args){
var G__799 = arguments.length;
switch (G__799) {
case 2:
return ontology.axioms.disjOr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.disjOr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.disjOr.cljs$core$IFn$_invoke$arity$2 = (function (class$,classes){
return ontology.axioms._axiom.call(null,ontology.axioms._classAxiom.call(null,ontology.axioms._disjOr.call(null,ontology.expressions.class$.call(null,class$),ontology.axioms._disjClassesNoAnn.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.class$,classes))))));
}));

(ontology.axioms.disjOr.cljs$core$IFn$_invoke$arity$3 = (function (annotations,class$,classes){
return ontology.axioms._axiom.call(null,ontology.axioms._classAxiom.call(null,ontology.axioms._disjOr.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.class$.call(null,class$),ontology.axioms._disjClassesNoAnn.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.class$,classes))))));
}));

(ontology.axioms.disjOr.cljs$lang$maxFixedArity = 3);

/**
 * ObjectPropertyAxiom := SubObjectPropertyOf | EquivalentObjectProperties | DisjointObjectProperties | InverseObjectProperties | ObjectPropertyDomain | ObjectPropertyRange | FunctionalObjectProperty | InverseFunctionalObjectProperty | ReflexiveObjectProperty | IrreflexiveObjectProperty | SymmetricObjectProperty | AsymmetricObjectProperty | TransitiveObjectProperty
 */
ontology.axioms._roleAxiom = (function ontology$axioms$_roleAxiom(roleAxiom){
if(cljs.core.contains_QMARK_.call(null,ontology.axioms.roleAxiomTypes,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(roleAxiom))){
return cljs.core.assoc.call(null,roleAxiom,new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"roleAxiom","roleAxiom",-107467206));
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoleAxiom","ontology.axioms/notRoleAxiom",-448103082),new cljs.core.Keyword(null,"roleAxiom","roleAxiom",-107467206),roleAxiom], null))));
}
});
/**
 * subObjectPropertyExpression := ObjectPropertyExpression | propertyExpressionChain
 */
ontology.axioms._antecedentRole = (function ontology$axioms$_antecedentRole(role){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"roleChain","roleChain",1454404002))))){
return role;
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
});
/**
 * propertyExpressionChain := 'ObjectPropertyChain' '(' ObjectPropertyExpression ObjectPropertyExpression { ObjectPropertyExpression } ')'
 */
ontology.axioms._roleChain = (function ontology$axioms$_roleChain(roles){
if(((1) < cljs.core.count.call(null,roles))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"role","role",-736691072));
}),roles)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"roles","roles",143379530),roles,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleChain","roleChain",1454404002),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleChain","roleChain",1454404002)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"roles","roles",143379530),roles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughRoles","ontology.axioms/notEnoughRoles",1510826915),new cljs.core.Keyword(null,"roles","roles",143379530),roles], null))));
}
});
ontology.axioms.roleChain = (function ontology$axioms$roleChain(var_args){
var G__805 = arguments.length;
switch (G__805) {
case 2:
return ontology.axioms.roleChain.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__4757__auto__ = [];
var len__4736__auto___807 = arguments.length;
var i__4737__auto___808 = (0);
while(true){
if((i__4737__auto___808 < len__4736__auto___807)){
args_arr__4757__auto__.push((arguments[i__4737__auto___808]));

var G__809 = (i__4737__auto___808 + (1));
i__4737__auto___808 = G__809;
continue;
} else {
}
break;
}

var argseq__4758__auto__ = (new cljs.core.IndexedSeq(args_arr__4757__auto__.slice((2)),(0),null));
return ontology.axioms.roleChain.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4758__auto__);

}
});

(ontology.axioms.roleChain.cljs$core$IFn$_invoke$arity$variadic = (function (role1,role2,roles){
return ontology.axioms._roleChain.call(null,cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,ontology.expressions.role,cljs.core.flatten.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [role1,role2,roles], null)))));
}));

/** @this {Function} */
(ontology.axioms.roleChain.cljs$lang$applyTo = (function (seq802){
var G__803 = cljs.core.first.call(null,seq802);
var seq802__$1 = cljs.core.next.call(null,seq802);
var G__804 = cljs.core.first.call(null,seq802__$1);
var seq802__$2 = cljs.core.next.call(null,seq802__$1);
var self__4723__auto__ = this;
return self__4723__auto__.cljs$core$IFn$_invoke$arity$variadic(G__803,G__804,seq802__$2);
}));

(ontology.axioms.roleChain.cljs$core$IFn$_invoke$arity$2 = (function (role1,role2){
return ontology.axioms._roleChain.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ontology.expressions.role.call(null,role1),ontology.expressions.role.call(null,role2)], null));
}));

(ontology.axioms.roleChain.cljs$lang$maxFixedArity = (2));

/**
 * superObjectPropertyExpression := ObjectPropertyExpression
 */
ontology.axioms._consequentRole = (function ontology$axioms$_consequentRole(role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return role;
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
});
/**
 * SubObjectPropertyOf := 'SubObjectPropertyOf' '(' axiomAnnotations subObjectPropertyExpression superObjectPropertyExpression ')'
 */
ontology.axioms._roleImplication = (function ontology$axioms$_roleImplication(var_args){
var G__811 = arguments.length;
switch (G__811) {
case 2:
return ontology.axioms._roleImplication.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._roleImplication.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._roleImplication.cljs$core$IFn$_invoke$arity$2 = (function (antecedent,consequent){
if(((((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(antecedent),new cljs.core.Keyword(null,"role","role",-736691072))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(antecedent),new cljs.core.Keyword(null,"roleChain","roleChain",1454404002))))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(consequent),new cljs.core.Keyword(null,"role","role",-736691072))))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"antecedentRole","antecedentRole",-1708181688),antecedent,new cljs.core.Keyword(null,"consequentRole","consequentRole",1474575744),consequent,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleImplication","roleImplication",-9539785),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleImplication","roleImplication",-9539785),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"roleImplication","roleImplication",-9539785)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAntecedentConsequentRoles","ontology.axioms/notAntecedentConsequentRoles",486801898),new cljs.core.Keyword(null,"antecedentRole","antecedentRole",-1708181688),antecedent,new cljs.core.Keyword(null,"consequentRole","consequentRole",1474575744),consequent], null))));
}
}));

(ontology.axioms._roleImplication.cljs$core$IFn$_invoke$arity$3 = (function (annotations,antecedent,consequent){
if(((((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(antecedent),new cljs.core.Keyword(null,"role","role",-736691072))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(antecedent),new cljs.core.Keyword(null,"roleChain","roleChain",1454404002))))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(consequent),new cljs.core.Keyword(null,"role","role",-736691072))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"antecedentRole","antecedentRole",-1708181688),antecedent,new cljs.core.Keyword(null,"consequentRole","consequentRole",1474575744),consequent,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleImplication","roleImplication",-9539785),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleImplication","roleImplication",-9539785),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"roleImplication","roleImplication",-9539785)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAntecedentConsequentRoles","ontology.axioms/notAntecedentConsequentRoles",486801898),new cljs.core.Keyword(null,"antecedentRole","antecedentRole",-1708181688),antecedent,new cljs.core.Keyword(null,"consequentRole","consequentRole",1474575744),consequent], null))));
}
}));

(ontology.axioms._roleImplication.cljs$lang$maxFixedArity = 3);

ontology.axioms.roleImplication = (function ontology$axioms$roleImplication(var_args){
var G__814 = arguments.length;
switch (G__814) {
case 2:
return ontology.axioms.roleImplication.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.roleImplication.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.roleImplication.cljs$core$IFn$_invoke$arity$2 = (function (antecedent,consequent){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._roleImplication.call(null,ontology.expressions.role.call(null,antecedent),ontology.expressions.role.call(null,consequent))));
}));

(ontology.axioms.roleImplication.cljs$core$IFn$_invoke$arity$3 = (function (annotations,antecedent,consequent){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._roleImplication.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,antecedent),ontology.expressions.role.call(null,consequent))));
}));

(ontology.axioms.roleImplication.cljs$lang$maxFixedArity = 3);

/**
 * EquivalentObjectProperties := 'EquivalentObjectProperties' '(' axiomAnnotations ObjectPropertyExpression ObjectPropertyExpression { ObjectPropertyExpression } ')'
 */
ontology.axioms.__EQ_roles = (function ontology$axioms$__EQ_roles(var_args){
var G__817 = arguments.length;
switch (G__817) {
case 1:
return ontology.axioms.__EQ_roles.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.__EQ_roles.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.__EQ_roles.cljs$core$IFn$_invoke$arity$1 = (function (roles){
if(((1) < cljs.core.count.call(null,roles))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"role","role",-736691072));
}),roles)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"roles","roles",143379530),roles,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=roles","=roles",-1133955642),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=roles","=roles",-1133955642),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"=roles","=roles",-1133955642)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"roles","roles",143379530),roles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughRoles","ontology.axioms/notEnoughRoles",1510826915),new cljs.core.Keyword(null,"roles","roles",143379530),roles], null))));
}
}));

(ontology.axioms.__EQ_roles.cljs$core$IFn$_invoke$arity$2 = (function (annotations,roles){
if(((1) < cljs.core.count.call(null,roles))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"role","role",-736691072));
}),roles)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"roles","roles",143379530),roles,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=roles","=roles",-1133955642),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=roles","=roles",-1133955642),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"=roles","=roles",-1133955642)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"roles","roles",143379530),roles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughRoles","ontology.axioms/notEnoughRoles",1510826915),new cljs.core.Keyword(null,"roles","roles",143379530),roles], null))));
}
}));

(ontology.axioms.__EQ_roles.cljs$lang$maxFixedArity = 2);

ontology.axioms._EQ_roles = (function ontology$axioms$_EQ_roles(var_args){
var G__820 = arguments.length;
switch (G__820) {
case 1:
return ontology.axioms._EQ_roles.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._EQ_roles.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._EQ_roles.cljs$core$IFn$_invoke$arity$1 = (function (roles){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms.__EQ_roles.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.role,roles)))));
}));

(ontology.axioms._EQ_roles.cljs$core$IFn$_invoke$arity$2 = (function (annotations,roles){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms.__EQ_roles.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.role,roles)))));
}));

(ontology.axioms._EQ_roles.cljs$lang$maxFixedArity = 2);

/**
 * DisjointObjectProperties := 'DisjointObjectProperties' '(' axiomAnnotations ObjectPropertyExpression ObjectPropertyExpression { ObjectPropertyExpression } ')'
 */
ontology.axioms._disjRoles = (function ontology$axioms$_disjRoles(var_args){
var G__823 = arguments.length;
switch (G__823) {
case 1:
return ontology.axioms._disjRoles.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._disjRoles.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._disjRoles.cljs$core$IFn$_invoke$arity$1 = (function (roles){
if(((1) < cljs.core.count.call(null,roles))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"role","role",-736691072));
}),roles)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"roles","roles",143379530),roles,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"disjRoles","disjRoles",-1951145229),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"disjRoles","disjRoles",-1951145229),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"disjRoles","disjRoles",-1951145229)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"roles","roles",143379530),roles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughRoles","ontology.axioms/notEnoughRoles",1510826915),new cljs.core.Keyword(null,"roles","roles",143379530),roles], null))));
}
}));

(ontology.axioms._disjRoles.cljs$core$IFn$_invoke$arity$2 = (function (annotations,roles){
if(((1) < cljs.core.count.call(null,roles))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"role","role",-736691072));
}),roles)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"roles","roles",143379530),roles,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"disjRoles","disjRoles",-1951145229),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"disjRoles","disjRoles",-1951145229),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"disjRoles","disjRoles",-1951145229)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"roles","roles",143379530),roles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughRoles","ontology.axioms/notEnoughRoles",1510826915),new cljs.core.Keyword(null,"roles","roles",143379530),roles], null))));
}
}));

(ontology.axioms._disjRoles.cljs$lang$maxFixedArity = 2);

ontology.axioms.disjRoles = (function ontology$axioms$disjRoles(var_args){
var G__826 = arguments.length;
switch (G__826) {
case 1:
return ontology.axioms.disjRoles.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.disjRoles.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.disjRoles.cljs$core$IFn$_invoke$arity$1 = (function (roles){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._disjRoles.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.role,roles)))));
}));

(ontology.axioms.disjRoles.cljs$core$IFn$_invoke$arity$2 = (function (annotations,roles){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._disjRoles.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.role,roles)))));
}));

(ontology.axioms.disjRoles.cljs$lang$maxFixedArity = 2);

/**
 * ObjectPropertyDomain := 'ObjectPropertyDomain' '(' axiomAnnotations ObjectPropertyExpression ClassExpression ')'
 */
ontology.axioms._roleDomain = (function ontology$axioms$_roleDomain(var_args){
var G__829 = arguments.length;
switch (G__829) {
case 2:
return ontology.axioms._roleDomain.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._roleDomain.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._roleDomain.cljs$core$IFn$_invoke$arity$2 = (function (role,class$){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleDomain","roleDomain",2022033705),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleDomain","roleDomain",2022033705),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"roleDomain","roleDomain",2022033705)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClassAndRole","ontology.axioms/notClassAndRole",2037372324),new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
}));

(ontology.axioms._roleDomain.cljs$core$IFn$_invoke$arity$3 = (function (annotations,role,class$){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleDomain","roleDomain",2022033705),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleDomain","roleDomain",2022033705),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"roleDomain","roleDomain",2022033705)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClassAndRole","ontology.axioms/notClassAndRole",2037372324),new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
}));

(ontology.axioms._roleDomain.cljs$lang$maxFixedArity = 3);

ontology.axioms.roleDomain = (function ontology$axioms$roleDomain(var_args){
var G__832 = arguments.length;
switch (G__832) {
case 2:
return ontology.axioms.roleDomain.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.roleDomain.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.roleDomain.cljs$core$IFn$_invoke$arity$2 = (function (role,class$){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._roleDomain.call(null,ontology.expressions.role.call(null,role),ontology.expressions.class$.call(null,class$))));
}));

(ontology.axioms.roleDomain.cljs$core$IFn$_invoke$arity$3 = (function (annotations,role,class$){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._roleDomain.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,role),ontology.expressions.class$.call(null,class$))));
}));

(ontology.axioms.roleDomain.cljs$lang$maxFixedArity = 3);

/**
 * ObjectPropertyRange := 'ObjectPropertyRange' '(' axiomAnnotations ObjectPropertyExpression ClassExpression ')'
 */
ontology.axioms._roleRange = (function ontology$axioms$_roleRange(var_args){
var G__835 = arguments.length;
switch (G__835) {
case 2:
return ontology.axioms._roleRange.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._roleRange.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._roleRange.cljs$core$IFn$_invoke$arity$2 = (function (role,class$){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleRange","roleRange",674235051),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleRange","roleRange",674235051),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"roleRange","roleRange",674235051)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClassAndRole","ontology.axioms/notClassAndRole",2037372324),new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
}));

(ontology.axioms._roleRange.cljs$core$IFn$_invoke$arity$3 = (function (annotations,role,class$){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleRange","roleRange",674235051),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleRange","roleRange",674235051),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"roleRange","roleRange",674235051)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClassAndRole","ontology.axioms/notClassAndRole",2037372324),new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
}));

(ontology.axioms._roleRange.cljs$lang$maxFixedArity = 3);

ontology.axioms.roleRange = (function ontology$axioms$roleRange(var_args){
var G__838 = arguments.length;
switch (G__838) {
case 2:
return ontology.axioms.roleRange.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.roleRange.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.roleRange.cljs$core$IFn$_invoke$arity$2 = (function (role,class$){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._roleRange.call(null,ontology.expressions.role.call(null,role),ontology.expressions.class$.call(null,class$))));
}));

(ontology.axioms.roleRange.cljs$core$IFn$_invoke$arity$3 = (function (annotations,role,class$){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._roleRange.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,role),ontology.expressions.class$.call(null,class$))));
}));

(ontology.axioms.roleRange.cljs$lang$maxFixedArity = 3);

/**
 * InverseObjectProperties := 'InverseObjectProperties' '(' axiomAnnotations ObjectPropertyExpression ObjectPropertyExpression ')'
 */
ontology.axioms._inverseRoles = (function ontology$axioms$_inverseRoles(var_args){
var G__841 = arguments.length;
switch (G__841) {
case 2:
return ontology.axioms._inverseRoles.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._inverseRoles.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._inverseRoles.cljs$core$IFn$_invoke$arity$2 = (function (role,otherRole){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(otherRole),new cljs.core.Keyword(null,"role","role",-736691072))))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"inverse","inverse",-1623859672),otherRole,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"inverseRoles","inverseRoles",-966864539),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"inverseRoles","inverseRoles",-966864539),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"inverseRoles","inverseRoles",-966864539)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"inverse","inverse",-1623859672),otherRole], null))));
}
}));

(ontology.axioms._inverseRoles.cljs$core$IFn$_invoke$arity$3 = (function (annotations,role,otherRole){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(otherRole),new cljs.core.Keyword(null,"role","role",-736691072))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"inverse","inverse",-1623859672),otherRole,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"inverseRoles","inverseRoles",-966864539),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"inverseRoles","inverseRoles",-966864539),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"inverseRoles","inverseRoles",-966864539)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"inverse","inverse",-1623859672),otherRole], null))));
}
}));

(ontology.axioms._inverseRoles.cljs$lang$maxFixedArity = 3);

ontology.axioms.inverseRoles = (function ontology$axioms$inverseRoles(var_args){
var G__844 = arguments.length;
switch (G__844) {
case 2:
return ontology.axioms.inverseRoles.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.inverseRoles.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.inverseRoles.cljs$core$IFn$_invoke$arity$2 = (function (role,otherRole){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._inverseRoles.call(null,ontology.expressions.role.call(null,role),ontology.expressions.role.call(null,otherRole))));
}));

(ontology.axioms.inverseRoles.cljs$core$IFn$_invoke$arity$3 = (function (annotations,role,otherRole){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._inverseRoles.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,role),ontology.expressions.role.call(null,otherRole))));
}));

(ontology.axioms.inverseRoles.cljs$lang$maxFixedArity = 3);

/**
 * FunctionalObjectProperty := 'FunctionalObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'
 */
ontology.axioms._functionalRole = (function ontology$axioms$_functionalRole(var_args){
var G__847 = arguments.length;
switch (G__847) {
case 1:
return ontology.axioms._functionalRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._functionalRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._functionalRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"functionalRole","functionalRole",-158923209),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"functionalRole","functionalRole",-158923209),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"functionalRole","functionalRole",-158923209)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._functionalRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"functionalRole","functionalRole",-158923209),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"functionalRole","functionalRole",-158923209),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"functionalRole","functionalRole",-158923209)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._functionalRole.cljs$lang$maxFixedArity = 2);

ontology.axioms.functionalRole = (function ontology$axioms$functionalRole(var_args){
var G__850 = arguments.length;
switch (G__850) {
case 1:
return ontology.axioms.functionalRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.functionalRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.functionalRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._functionalRole.call(null,ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.functionalRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._functionalRole.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.functionalRole.cljs$lang$maxFixedArity = 2);

/**
 * InverseFunctionalObjectProperty := 'InverseFunctionalObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'
 */
ontology.axioms._functionalInverseRole = (function ontology$axioms$_functionalInverseRole(var_args){
var G__853 = arguments.length;
switch (G__853) {
case 1:
return ontology.axioms._functionalInverseRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._functionalInverseRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._functionalInverseRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"functionalInverseRole","functionalInverseRole",1756823579),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"functionalInverseRole","functionalInverseRole",1756823579),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"functionalInverseRole","functionalInverseRole",1756823579)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._functionalInverseRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"functionalInverseRole","functionalInverseRole",1756823579),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"functionalInverseRole","functionalInverseRole",1756823579),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"functionalInverseRole","functionalInverseRole",1756823579)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._functionalInverseRole.cljs$lang$maxFixedArity = 2);

ontology.axioms.functionalInverseRole = (function ontology$axioms$functionalInverseRole(var_args){
var G__856 = arguments.length;
switch (G__856) {
case 1:
return ontology.axioms.functionalInverseRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.functionalInverseRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.functionalInverseRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._functionalInverseRole.call(null,ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.functionalInverseRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._functionalInverseRole.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.functionalInverseRole.cljs$lang$maxFixedArity = 2);

/**
 * ReflexiveObjectProperty := 'ReflexiveObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'
 */
ontology.axioms._reflexiveRole = (function ontology$axioms$_reflexiveRole(var_args){
var G__859 = arguments.length;
switch (G__859) {
case 1:
return ontology.axioms._reflexiveRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._reflexiveRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._reflexiveRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"reflexiveRole","reflexiveRole",2037412402),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"reflexiveRole","reflexiveRole",2037412402),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"reflexiveRole","reflexiveRole",2037412402)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._reflexiveRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"reflexiveRole","reflexiveRole",2037412402),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"reflexiveRole","reflexiveRole",2037412402),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"reflexiveRole","reflexiveRole",2037412402)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._reflexiveRole.cljs$lang$maxFixedArity = 2);

ontology.axioms.reflexiveRole = (function ontology$axioms$reflexiveRole(var_args){
var G__862 = arguments.length;
switch (G__862) {
case 1:
return ontology.axioms.reflexiveRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.reflexiveRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.reflexiveRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._reflexiveRole.call(null,ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.reflexiveRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._reflexiveRole.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.reflexiveRole.cljs$lang$maxFixedArity = 2);

/**
 * IrreflexiveObjectProperty := 'IrreflexiveObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'
 */
ontology.axioms._irreflexiveRole = (function ontology$axioms$_irreflexiveRole(var_args){
var G__865 = arguments.length;
switch (G__865) {
case 1:
return ontology.axioms._irreflexiveRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._irreflexiveRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._irreflexiveRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"irreflexiveRole","irreflexiveRole",-942889990),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"irreflexiveRole","irreflexiveRole",-942889990),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"irreflexiveRole","irreflexiveRole",-942889990)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._irreflexiveRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"irreflexiveRole","irreflexiveRole",-942889990),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"irreflexiveRole","irreflexiveRole",-942889990),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"irreflexiveRole","irreflexiveRole",-942889990)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._irreflexiveRole.cljs$lang$maxFixedArity = 2);

ontology.axioms.irreflexiveRole = (function ontology$axioms$irreflexiveRole(var_args){
var G__868 = arguments.length;
switch (G__868) {
case 1:
return ontology.axioms.irreflexiveRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.irreflexiveRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.irreflexiveRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._irreflexiveRole.call(null,ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.irreflexiveRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._irreflexiveRole.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.irreflexiveRole.cljs$lang$maxFixedArity = 2);

/**
 * SymmetricObjectProperty := 'SymmetricObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'
 */
ontology.axioms._symmetricRole = (function ontology$axioms$_symmetricRole(var_args){
var G__871 = arguments.length;
switch (G__871) {
case 1:
return ontology.axioms._symmetricRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._symmetricRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._symmetricRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"symmetricRole","symmetricRole",375567067),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"symmetricRole","symmetricRole",375567067),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"symmetricRole","symmetricRole",375567067)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._symmetricRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"symmetricRole","symmetricRole",375567067),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"symmetricRole","symmetricRole",375567067),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"symmetricRole","symmetricRole",375567067)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._symmetricRole.cljs$lang$maxFixedArity = 2);

ontology.axioms.symmetricRole = (function ontology$axioms$symmetricRole(var_args){
var G__874 = arguments.length;
switch (G__874) {
case 1:
return ontology.axioms.symmetricRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.symmetricRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.symmetricRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._symmetricRole.call(null,ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.symmetricRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._symmetricRole.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.symmetricRole.cljs$lang$maxFixedArity = 2);

/**
 * AsymmetricObjectProperty := 'AsymmetricObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'
 */
ontology.axioms._asymmetricRole = (function ontology$axioms$_asymmetricRole(var_args){
var G__877 = arguments.length;
switch (G__877) {
case 1:
return ontology.axioms._asymmetricRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._asymmetricRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._asymmetricRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"asymmetricRole","asymmetricRole",-335165358),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"asymmetricRole","asymmetricRole",-335165358),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"asymmetricRole","asymmetricRole",-335165358)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._asymmetricRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"asymmetricRole","asymmetricRole",-335165358),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"asymmetricRole","asymmetricRole",-335165358),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"asymmetricRole","asymmetricRole",-335165358)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._asymmetricRole.cljs$lang$maxFixedArity = 2);

ontology.axioms.asymmetricRole = (function ontology$axioms$asymmetricRole(var_args){
var G__880 = arguments.length;
switch (G__880) {
case 1:
return ontology.axioms.asymmetricRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.asymmetricRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.asymmetricRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._asymmetricRole.call(null,ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.asymmetricRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._asymmetricRole.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.asymmetricRole.cljs$lang$maxFixedArity = 2);

/**
 * TransitiveObjectProperty := 'TransitiveObjectProperty' '(' axiomAnnotations ObjectPropertyExpression ')'
 */
ontology.axioms._transitiveRole = (function ontology$axioms$_transitiveRole(var_args){
var G__883 = arguments.length;
switch (G__883) {
case 1:
return ontology.axioms._transitiveRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._transitiveRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._transitiveRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"transitiveRole","transitiveRole",1672784272),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"transitiveRole","transitiveRole",1672784272),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"transitiveRole","transitiveRole",1672784272)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._transitiveRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"transitiveRole","transitiveRole",1672784272),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"transitiveRole","transitiveRole",1672784272),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"transitiveRole","transitiveRole",1672784272)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRole","ontology.axioms/notRole",580853092),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
}));

(ontology.axioms._transitiveRole.cljs$lang$maxFixedArity = 2);

ontology.axioms.transitiveRole = (function ontology$axioms$transitiveRole(var_args){
var G__886 = arguments.length;
switch (G__886) {
case 1:
return ontology.axioms.transitiveRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.transitiveRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.transitiveRole.cljs$core$IFn$_invoke$arity$1 = (function (role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._transitiveRole.call(null,ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.transitiveRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,role){
return ontology.axioms._axiom.call(null,ontology.axioms._roleAxiom.call(null,ontology.axioms._transitiveRole.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,role))));
}));

(ontology.axioms.transitiveRole.cljs$lang$maxFixedArity = 2);

/**
 * DataPropertyAxiom := SubDataPropertyOf | EquivalentDataProperties | DisjointDataProperties | DataPropertyDomain | DataPropertyRange | FunctionalDataProperty
 */
ontology.axioms._dataRoleAxiom = (function ontology$axioms$_dataRoleAxiom(dataRoleAxiom){
if(cljs.core.contains_QMARK_.call(null,ontology.axioms.dataRoleAxiomTypes,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRoleAxiom))){
return cljs.core.assoc.call(null,dataRoleAxiom,new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"dataRoleAxiom","dataRoleAxiom",-1907347100));
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notDataRoleAxiom","ontology.axioms/notDataRoleAxiom",422576810),new cljs.core.Keyword(null,"dataRoleAxiom","dataRoleAxiom",-1907347100),dataRoleAxiom], null))));
}
});
/**
 * subDataPropertyExpression := DataPropertyExpression
 */
ontology.axioms._antecedentDataRole = (function ontology$axioms$_antecedentDataRole(dataRole){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
return dataRole;
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notDataRole","ontology.axioms/notDataRole",383592625),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
});
/**
 * superDataPropertyExpression := DataPropertyExpression
 */
ontology.axioms._consequentDataRole = (function ontology$axioms$_consequentDataRole(dataRole){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
return dataRole;
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notDataRole","ontology.axioms/notDataRole",383592625),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
});
/**
 * SubDataPropertyOf := 'SubDataPropertyOf' '(' axiomAnnotations subDataPropertyExpression superDataPropertyExpression ')'
 */
ontology.axioms._dataRoleImplication = (function ontology$axioms$_dataRoleImplication(var_args){
var G__889 = arguments.length;
switch (G__889) {
case 2:
return ontology.axioms._dataRoleImplication.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._dataRoleImplication.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._dataRoleImplication.cljs$core$IFn$_invoke$arity$2 = (function (antecedent,consequent){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(antecedent),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(consequent),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"antecedentDataRole","antecedentDataRole",1637385795),antecedent,new cljs.core.Keyword(null,"consequentDataRole","consequentDataRole",1354487850),consequent,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRoleImplication","dataRoleImplication",-1801956108),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleImplication","dataRoleImplication",-1801956108),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"dataRoleImplication","dataRoleImplication",-1801956108)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAntecedentConsequentDataRoles","ontology.axioms/notAntecedentConsequentDataRoles",-1976162440),new cljs.core.Keyword(null,"antecedentDataRole","antecedentDataRole",1637385795),antecedent,new cljs.core.Keyword(null,"consequentDataRole","consequentDataRole",1354487850),consequent], null))));
}
}));

(ontology.axioms._dataRoleImplication.cljs$core$IFn$_invoke$arity$3 = (function (annotations,antecedent,consequent){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(antecedent),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(consequent),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"antecedentDataRole","antecedentDataRole",1637385795),antecedent,new cljs.core.Keyword(null,"consequentDataRole","consequentDataRole",1354487850),consequent,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRoleImplication","dataRoleImplication",-1801956108),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleImplication","dataRoleImplication",-1801956108),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"dataRoleImplication","dataRoleImplication",-1801956108)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAntecedentConsequentDataRoles","ontology.axioms/notAntecedentConsequentDataRoles",-1976162440),new cljs.core.Keyword(null,"antecedentDataRole","antecedentDataRole",1637385795),antecedent,new cljs.core.Keyword(null,"consequentDataRole","consequentDataRole",1354487850),consequent], null))));
}
}));

(ontology.axioms._dataRoleImplication.cljs$lang$maxFixedArity = 3);

ontology.axioms.dataRoleImplication = (function ontology$axioms$dataRoleImplication(var_args){
var G__892 = arguments.length;
switch (G__892) {
case 2:
return ontology.axioms.dataRoleImplication.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.dataRoleImplication.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.dataRoleImplication.cljs$core$IFn$_invoke$arity$2 = (function (antecedent,consequent){
return ontology.axioms._axiom.call(null,ontology.axioms._dataRoleAxiom.call(null,ontology.axioms._dataRoleImplication.call(null,ontology.expressions.dataRole.call(null,antecedent),ontology.expressions.dataRole.call(null,consequent))));
}));

(ontology.axioms.dataRoleImplication.cljs$core$IFn$_invoke$arity$3 = (function (annotations,antecedent,consequent){
return ontology.axioms._axiom.call(null,ontology.axioms._dataRoleAxiom.call(null,ontology.axioms._dataRoleImplication.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.dataRole.call(null,antecedent),ontology.expressions.dataRole.call(null,consequent))));
}));

(ontology.axioms.dataRoleImplication.cljs$lang$maxFixedArity = 3);

/**
 * EquivalentDataProperties := 'EquivalentDataProperties' '(' axiomAnnotations DataPropertyExpression DataPropertyExpression { DataPropertyExpression } ')'
 */
ontology.axioms.__EQ_DataRoles = (function ontology$axioms$__EQ_DataRoles(var_args){
var G__895 = arguments.length;
switch (G__895) {
case 1:
return ontology.axioms.__EQ_DataRoles.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.__EQ_DataRoles.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.__EQ_DataRoles.cljs$core$IFn$_invoke$arity$1 = (function (dataRoles){
if(((1) < cljs.core.count.call(null,dataRoles))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746));
}),dataRoles)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=DataRoles","=DataRoles",1110777758),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=DataRoles","=DataRoles",1110777758),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"=DataRoles","=DataRoles",1110777758)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughDataRoles","ontology.axioms/notEnoughDataRoles",-591939233),new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles], null))));
}
}));

(ontology.axioms.__EQ_DataRoles.cljs$core$IFn$_invoke$arity$2 = (function (annotations,dataRoles){
if(((1) < cljs.core.count.call(null,dataRoles))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746));
}),dataRoles)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=DataRoles","=DataRoles",1110777758),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=DataRoles","=DataRoles",1110777758),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"=DataRoles","=DataRoles",1110777758)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughDataRoles","ontology.axioms/notEnoughDataRoles",-591939233),new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles], null))));
}
}));

(ontology.axioms.__EQ_DataRoles.cljs$lang$maxFixedArity = 2);

ontology.axioms._EQ_DataRoles = (function ontology$axioms$_EQ_DataRoles(var_args){
var G__898 = arguments.length;
switch (G__898) {
case 1:
return ontology.axioms._EQ_DataRoles.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._EQ_DataRoles.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._EQ_DataRoles.cljs$core$IFn$_invoke$arity$1 = (function (dataRoles){
return ontology.axioms._axiom.call(null,ontology.axioms._dataRoleAxiom.call(null,ontology.axioms.__EQ_DataRoles.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.dataRole,dataRoles)))));
}));

(ontology.axioms._EQ_DataRoles.cljs$core$IFn$_invoke$arity$2 = (function (annotations,dataRoles){
return ontology.axioms._axiom.call(null,ontology.axioms._dataRoleAxiom.call(null,ontology.axioms.__EQ_DataRoles.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.dataRole,dataRoles)))));
}));

(ontology.axioms._EQ_DataRoles.cljs$lang$maxFixedArity = 2);

/**
 * DisjointDataProperties := 'DisjointDataProperties' '(' axiomAnnotations DataPropertyExpression DataPropertyExpression { DataPropertyExpression } ')'
 */
ontology.axioms._disjDataRoles = (function ontology$axioms$_disjDataRoles(var_args){
var G__901 = arguments.length;
switch (G__901) {
case 1:
return ontology.axioms._disjDataRoles.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._disjDataRoles.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._disjDataRoles.cljs$core$IFn$_invoke$arity$1 = (function (dataRoles){
if(((1) < cljs.core.count.call(null,dataRoles))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746));
}),dataRoles)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"disjDataRoles","disjDataRoles",799620529),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"disjDataRoles","disjDataRoles",799620529),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"disjDataRoles","disjDataRoles",799620529)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughDataRoles","ontology.axioms/notEnoughDataRoles",-591939233),new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles], null))));
}
}));

(ontology.axioms._disjDataRoles.cljs$core$IFn$_invoke$arity$2 = (function (annotations,dataRoles){
if(((1) < cljs.core.count.call(null,dataRoles))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746));
}),dataRoles)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"disjDataRoles","disjDataRoles",799620529),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"disjDataRoles","disjDataRoles",799620529),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"disjDataRoles","disjDataRoles",799620529)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughDataRoles","ontology.axioms/notEnoughDataRoles",-591939233),new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles], null))));
}
}));

(ontology.axioms._disjDataRoles.cljs$lang$maxFixedArity = 2);

ontology.axioms.disjDataRoles = (function ontology$axioms$disjDataRoles(var_args){
var G__904 = arguments.length;
switch (G__904) {
case 1:
return ontology.axioms.disjDataRoles.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.disjDataRoles.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.disjDataRoles.cljs$core$IFn$_invoke$arity$1 = (function (dataRoles){
return ontology.axioms._axiom.call(null,ontology.axioms._dataRoleAxiom.call(null,ontology.axioms._disjDataRoles.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.dataRole,dataRoles)))));
}));

(ontology.axioms.disjDataRoles.cljs$core$IFn$_invoke$arity$2 = (function (annotations,dataRoles){
return ontology.axioms._axiom.call(null,ontology.axioms._dataRoleAxiom.call(null,ontology.axioms._disjDataRoles.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.dataRole,dataRoles)))));
}));

(ontology.axioms.disjDataRoles.cljs$lang$maxFixedArity = 2);

/**
 * DataPropertyDomain := 'DataPropertyDomain' '(' axiomAnnotations DataPropertyExpression ClassExpression ')'
 */
ontology.axioms._dataRoleDomain = (function ontology$axioms$_dataRoleDomain(var_args){
var G__907 = arguments.length;
switch (G__907) {
case 2:
return ontology.axioms._dataRoleDomain.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._dataRoleDomain.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._dataRoleDomain.cljs$core$IFn$_invoke$arity$2 = (function (dataRole,class$){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRoleDomain","dataRoleDomain",-346202227),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleDomain","dataRoleDomain",-346202227),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"dataRoleDomain","dataRoleDomain",-346202227)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notDataRoleDataRange","ontology.axioms/notDataRoleDataRange",244353288),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
}));

(ontology.axioms._dataRoleDomain.cljs$core$IFn$_invoke$arity$3 = (function (annotations,dataRole,class$){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRoleDomain","dataRoleDomain",-346202227),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleDomain","dataRoleDomain",-346202227),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"dataRoleDomain","dataRoleDomain",-346202227)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notDataRoleDataRange","ontology.axioms/notDataRoleDataRange",244353288),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
}));

(ontology.axioms._dataRoleDomain.cljs$lang$maxFixedArity = 3);

ontology.axioms.dataRoleDomain = (function ontology$axioms$dataRoleDomain(var_args){
var G__910 = arguments.length;
switch (G__910) {
case 2:
return ontology.axioms.dataRoleDomain.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.dataRoleDomain.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.dataRoleDomain.cljs$core$IFn$_invoke$arity$2 = (function (dataRole,class$){
return ontology.axioms._axiom.call(null,ontology.axioms._dataRoleAxiom.call(null,ontology.axioms._dataRoleDomain.call(null,ontology.expressions.dataRole.call(null,dataRole),ontology.expressions.class$.call(null,class$))));
}));

(ontology.axioms.dataRoleDomain.cljs$core$IFn$_invoke$arity$3 = (function (annotations,dataRole,class$){
return ontology.axioms._axiom.call(null,ontology.axioms._dataRoleAxiom.call(null,ontology.axioms._dataRoleDomain.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.dataRole.call(null,dataRole),ontology.expressions.class$.call(null,class$))));
}));

(ontology.axioms.dataRoleDomain.cljs$lang$maxFixedArity = 3);

/**
 * DataPropertyRange := 'DataPropertyRange' '(' axiomAnnotations DataPropertyExpression DataRange ')'
 */
ontology.axioms._dataRoleRange = (function ontology$axioms$_dataRoleRange(var_args){
var G__913 = arguments.length;
switch (G__913) {
case 2:
return ontology.axioms._dataRoleRange.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._dataRoleRange.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._dataRoleRange.cljs$core$IFn$_invoke$arity$2 = (function (dataRole,dataRange){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRange),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228))))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRoleRange","dataRoleRange",-1702324412),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleRange","dataRoleRange",-1702324412),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"dataRoleRange","dataRoleRange",-1702324412)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notDataRoleDataRange","ontology.axioms/notDataRoleDataRange",244353288),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange], null))));
}
}));

(ontology.axioms._dataRoleRange.cljs$core$IFn$_invoke$arity$3 = (function (annotations,dataRole,dataRange){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRange),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRoleRange","dataRoleRange",-1702324412),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleRange","dataRoleRange",-1702324412),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"dataRoleRange","dataRoleRange",-1702324412)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notDataRoleDataRange","ontology.axioms/notDataRoleDataRange",244353288),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange], null))));
}
}));

(ontology.axioms._dataRoleRange.cljs$lang$maxFixedArity = 3);

ontology.axioms.dataRoleRange = (function ontology$axioms$dataRoleRange(var_args){
var G__916 = arguments.length;
switch (G__916) {
case 2:
return ontology.axioms.dataRoleRange.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.dataRoleRange.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.dataRoleRange.cljs$core$IFn$_invoke$arity$2 = (function (dataRole,dataRange){
return ontology.axioms._axiom.call(null,ontology.axioms._dataRoleAxiom.call(null,ontology.axioms._dataRoleRange.call(null,ontology.expressions.dataRole.call(null,dataRole),ontology.components.dataRange.call(null,dataRange))));
}));

(ontology.axioms.dataRoleRange.cljs$core$IFn$_invoke$arity$3 = (function (annotations,dataRole,dataRange){
return ontology.axioms._axiom.call(null,ontology.axioms._dataRoleAxiom.call(null,ontology.axioms._dataRoleRange.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.dataRole.call(null,dataRole),ontology.components.dataRange.call(null,dataRange))));
}));

(ontology.axioms.dataRoleRange.cljs$lang$maxFixedArity = 3);

/**
 * FunctionalDataProperty := 'FunctionalDataProperty' '(' axiomAnnotations DataPropertyExpression ')'
 */
ontology.axioms._functionalDataRole = (function ontology$axioms$_functionalDataRole(var_args){
var G__919 = arguments.length;
switch (G__919) {
case 1:
return ontology.axioms._functionalDataRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms._functionalDataRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._functionalDataRole.cljs$core$IFn$_invoke$arity$1 = (function (dataRole){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"functionalDataRole","functionalDataRole",1103771534),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"functionalDataRole","functionalDataRole",1103771534),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"functionalDataRole","functionalDataRole",1103771534)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notDataRole","ontology.axioms/notDataRole",383592625),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
}));

(ontology.axioms._functionalDataRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,dataRole){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"functionalDataRole","functionalDataRole",1103771534),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"functionalDataRole","functionalDataRole",1103771534),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"functionalDataRole","functionalDataRole",1103771534)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notDataRole","ontology.axioms/notDataRole",383592625),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
}));

(ontology.axioms._functionalDataRole.cljs$lang$maxFixedArity = 2);

ontology.axioms.functionalDataRole = (function ontology$axioms$functionalDataRole(var_args){
var G__922 = arguments.length;
switch (G__922) {
case 1:
return ontology.axioms.functionalDataRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.axioms.functionalDataRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.functionalDataRole.cljs$core$IFn$_invoke$arity$1 = (function (dataRole){
return ontology.axioms._axiom.call(null,ontology.axioms._dataRoleAxiom.call(null,ontology.axioms._functionalDataRole.call(null,ontology.expressions.dataRole.call(null,dataRole))));
}));

(ontology.axioms.functionalDataRole.cljs$core$IFn$_invoke$arity$2 = (function (annotations,dataRole){
return ontology.axioms._axiom.call(null,ontology.axioms._dataRoleAxiom.call(null,ontology.axioms._functionalDataRole.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.dataRole.call(null,dataRole))));
}));

(ontology.axioms.functionalDataRole.cljs$lang$maxFixedArity = 2);

/**
 * HasKey := 'HasKey' '(' axiomAnnotations ClassExpression '(' { ObjectPropertyExpression } ')' '(' { DataPropertyExpression } ')' ')'
 */
ontology.axioms._hasKey = (function ontology$axioms$_hasKey(var_args){
var G__925 = arguments.length;
switch (G__925) {
case 3:
return ontology.axioms._hasKey.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.axioms._hasKey.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._hasKey.cljs$core$IFn$_invoke$arity$3 = (function (class$,roles,dataRoles){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
if(((((1) < cljs.core.count.call(null,roles))) || (((1) < cljs.core.count.call(null,dataRoles))))){
if(((cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"role","role",-736691072));
}),roles)) && (cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746));
}),dataRoles)))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"roles","roles",143379530),roles,new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"hasKey","hasKey",-30264325),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"hasKey","hasKey",-30264325),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"hasKey","hasKey",-30264325)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"roles","roles",143379530),roles,new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughKeys","ontology.axioms/notEnoughKeys",-1885353120),new cljs.core.Keyword(null,"roles","roles",143379530),roles,new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClass","ontology.axioms/notClass",1836306604),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
}));

(ontology.axioms._hasKey.cljs$core$IFn$_invoke$arity$4 = (function (annotations,class$,roles,dataRoles){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
if(((((1) < cljs.core.count.call(null,roles))) || (((1) < cljs.core.count.call(null,dataRoles))))){
if(((cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"role","role",-736691072));
}),roles)) && (cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746));
}),dataRoles)))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"roles","roles",143379530),roles,new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"hasKey","hasKey",-30264325),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"hasKey","hasKey",-30264325),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"hasKey","hasKey",-30264325)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notRoles","ontology.axioms/notRoles",-494464363),new cljs.core.Keyword(null,"roles","roles",143379530),roles,new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notEnoughKeys","ontology.axioms/notEnoughKeys",-1885353120),new cljs.core.Keyword(null,"roles","roles",143379530),roles,new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notClass","ontology.axioms/notClass",1836306604),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
}));

(ontology.axioms._hasKey.cljs$lang$maxFixedArity = 4);

ontology.axioms.hasKey = (function ontology$axioms$hasKey(var_args){
var G__928 = arguments.length;
switch (G__928) {
case 3:
return ontology.axioms.hasKey.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.axioms.hasKey.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.hasKey.cljs$core$IFn$_invoke$arity$3 = (function (class$,roles,dataRoles){
return ontology.axioms._axiom.call(null,ontology.axioms._hasKey.call(null,ontology.expressions.class$.call(null,class$),cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.role,roles)),dataRoles));
}));

(ontology.axioms.hasKey.cljs$core$IFn$_invoke$arity$4 = (function (annotations,class$,roles,dataRoles){
return ontology.axioms._axiom.call(null,ontology.axioms._hasKey.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.class$.call(null,class$),cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.role,roles)),dataRoles));
}));

(ontology.axioms.hasKey.cljs$lang$maxFixedArity = 4);

/**
 * DatatypeDefinition := 'DatatypeDefinition' '(' axiomAnnotations Datatype DataRange ')'
 */
ontology.axioms._dataTypeDefinition = (function ontology$axioms$_dataTypeDefinition(var_args){
var G__931 = arguments.length;
switch (G__931) {
case 2:
return ontology.axioms._dataTypeDefinition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._dataTypeDefinition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._dataTypeDefinition.cljs$core$IFn$_invoke$arity$2 = (function (dataType,dataRange){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataType),new cljs.core.Keyword(null,"dataType","dataType",1069893619))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRange),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228))))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dataType","dataType",1069893619),dataType,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"newDataType","newDataType",224607193),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"newDataType","newDataType",224607193),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"newDataType","newDataType",224607193)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notDataTypeDef","ontology.axioms/notDataTypeDef",1177237809),new cljs.core.Keyword(null,"dataType","dataType",1069893619),dataType,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange], null))));
}
}));

(ontology.axioms._dataTypeDefinition.cljs$core$IFn$_invoke$arity$3 = (function (annotations,dataType,dataRange){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataType),new cljs.core.Keyword(null,"dataType","dataType",1069893619))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRange),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"dataType","dataType",1069893619),dataType,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"newDataType","newDataType",224607193),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"newDataType","newDataType",224607193),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"newDataType","newDataType",224607193)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notDataTypeDef","ontology.axioms/notDataTypeDef",1177237809),new cljs.core.Keyword(null,"dataType","dataType",1069893619),dataType,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange], null))));
}
}));

(ontology.axioms._dataTypeDefinition.cljs$lang$maxFixedArity = 3);

ontology.axioms.dataTypeDefinition = (function ontology$axioms$dataTypeDefinition(var_args){
var G__934 = arguments.length;
switch (G__934) {
case 2:
return ontology.axioms.dataTypeDefinition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.dataTypeDefinition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.dataTypeDefinition.cljs$core$IFn$_invoke$arity$2 = (function (datatype,datarange){
return ontology.axioms._axiom.call(null,ontology.axioms._dataTypeDefinition.call(null,ontology.components.dataType.call(null,datatype),ontology.components.dataRange.call(null,datarange)));
}));

(ontology.axioms.dataTypeDefinition.cljs$core$IFn$_invoke$arity$3 = (function (annotations,datatype,datarange){
return ontology.axioms._axiom.call(null,ontology.axioms._dataTypeDefinition.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.components.dataType.call(null,datatype),ontology.components.dataRange.call(null,datarange)));
}));

(ontology.axioms.dataTypeDefinition.cljs$lang$maxFixedArity = 3);

/**
 * AnnotationAxiom := AnnotationAssertion | SubAnnotationPropertyOf | AnnotationPropertyDomain | AnnotationPropertyRange
 */
ontology.axioms._annotationAxiom = (function ontology$axioms$_annotationAxiom(annotationAxiom){
if(cljs.core.contains_QMARK_.call(null,ontology.axioms.annotationAxiomTypes,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationAxiom))){
return cljs.core.assoc.call(null,annotationAxiom,new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"annotationAxiom","annotationAxiom",-1418754387));
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notannotationAxiom","ontology.axioms/notannotationAxiom",1909809321),new cljs.core.Keyword(null,"annotationAxiom","annotationAxiom",-1418754387),annotationAxiom], null))));
}
});
/**
 * AnnotationAssertion := 'AnnotationAssertion' '(' axiomAnnotations AnnotationProperty AnnotationSubject AnnotationValue ')'
 */
ontology.axioms._annotationFact = (function ontology$axioms$_annotationFact(var_args){
var G__937 = arguments.length;
switch (G__937) {
case 3:
return ontology.axioms._annotationFact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.axioms._annotationFact.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._annotationFact.cljs$core$IFn$_invoke$arity$3 = (function (annotationRole,annotationSubject,annotationValue){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationSubject),new cljs.core.Keyword(null,"annotationSubject","annotationSubject",-569521707))) && (((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationRole),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationValue),new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456))))))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"annotationSubject","annotationSubject",-569521707),annotationSubject,new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456),annotationValue,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationFact","annotationFact",-1090765214),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotationFact","annotationFact",-1090765214)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotationSubjectRoleAndValue","ontology.axioms/notAnnotationSubjectRoleAndValue",-1581487469),new cljs.core.Keyword(null,"annotationSubject","annotationSubject",-569521707),annotationSubject,new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456),annotationValue], null))));
}
}));

(ontology.axioms._annotationFact.cljs$core$IFn$_invoke$arity$4 = (function (annotations,annotationRole,annotationSubject,annotationValue){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationSubject),new cljs.core.Keyword(null,"annotationSubject","annotationSubject",-569521707))) && (((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationRole),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationValue),new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456))))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"annotationSubject","annotationSubject",-569521707),annotationSubject,new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456),annotationValue,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationFact","annotationFact",-1090765214),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotationFact","annotationFact",-1090765214)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotationSubjectRoleAndValue","ontology.axioms/notAnnotationSubjectRoleAndValue",-1581487469),new cljs.core.Keyword(null,"annotationSubject","annotationSubject",-569521707),annotationSubject,new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456),annotationValue,new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
}));

(ontology.axioms._annotationFact.cljs$lang$maxFixedArity = 4);

ontology.axioms.annotationFact = (function ontology$axioms$annotationFact(var_args){
var G__940 = arguments.length;
switch (G__940) {
case 3:
return ontology.axioms.annotationFact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.axioms.annotationFact.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.annotationFact.cljs$core$IFn$_invoke$arity$3 = (function (annotationRole,annotationSubject,annotationValue){
return ontology.axioms._axiom.call(null,ontology.axioms._annotationAxiom.call(null,ontology.axioms._annotationFact.call(null,ontology.annotations.annotationRole.call(null,annotationRole),ontology.annotations.annotationSubject.call(null,annotationSubject),ontology.annotations.annotationValue.call(null,annotationValue))));
}));

(ontology.axioms.annotationFact.cljs$core$IFn$_invoke$arity$4 = (function (annotations,annotationRole,annotationSubject,annotationValue){
return ontology.axioms._axiom.call(null,ontology.axioms._annotationAxiom.call(null,ontology.axioms._annotationFact.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.annotations.annotationRole.call(null,annotationRole),ontology.annotations.annotationSubject.call(null,annotationSubject),ontology.annotations.annotationValue.call(null,annotationValue))));
}));

(ontology.axioms.annotationFact.cljs$lang$maxFixedArity = 4);

/**
 * subAnnotationProperty := AnnotationProperty
 */
ontology.axioms._fromAnnotation = (function ontology$axioms$_fromAnnotation(annotationRole){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationRole),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139))){
return annotationRole;
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotationRole","ontology.axioms/notAnnotationRole",48807949),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole], null))));
}
});
/**
 * superAnnotationProperty := AnnotationProperty
 */
ontology.axioms._toAnnotation = (function ontology$axioms$_toAnnotation(annotationRole){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationRole),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139))){
return annotationRole;
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotationRole","ontology.axioms/notAnnotationRole",48807949),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole], null))));
}
});
/**
 * SubAnnotationPropertyOf := 'SubAnnotationPropertyOf' '(' axiomAnnotations subAnnotationProperty superAnnotationProperty ')'
 */
ontology.axioms._annotationImplication = (function ontology$axioms$_annotationImplication(var_args){
var G__943 = arguments.length;
switch (G__943) {
case 2:
return ontology.axioms._annotationImplication.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._annotationImplication.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._annotationImplication.cljs$core$IFn$_invoke$arity$2 = (function (antecedent,consequent){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(antecedent),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(consequent),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139))))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"antecedent","antecedent",-1840425011),antecedent,new cljs.core.Keyword(null,"consequent","consequent",234514643),consequent,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationImplication","annotationImplication",-1908681157),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotationImplication","annotationImplication",-1908681157)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotationRoles","ontology.axioms/notAnnotationRoles",-160335781),new cljs.core.Keyword(null,"antecedent","antecedent",-1840425011),antecedent,new cljs.core.Keyword(null,"consequent","consequent",234514643),consequent], null))));
}
}));

(ontology.axioms._annotationImplication.cljs$core$IFn$_invoke$arity$3 = (function (annotations,antecedent,consequent){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(antecedent),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(consequent),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"antecedent","antecedent",-1840425011),antecedent,new cljs.core.Keyword(null,"consequent","consequent",234514643),consequent,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationImplication","annotationImplication",-1908681157),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotationImplication","annotationImplication",-1908681157),new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotationRoles","ontology.axioms/notAnnotationRoles",-160335781),new cljs.core.Keyword(null,"antecedent","antecedent",-1840425011),antecedent,new cljs.core.Keyword(null,"consequent","consequent",234514643),consequent], null))));
}
}));

(ontology.axioms._annotationImplication.cljs$lang$maxFixedArity = 3);

ontology.axioms.annotationImplication = (function ontology$axioms$annotationImplication(var_args){
var G__946 = arguments.length;
switch (G__946) {
case 2:
return ontology.axioms.annotationImplication.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.annotationImplication.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.annotationImplication.cljs$core$IFn$_invoke$arity$2 = (function (antecedent,consequent){
return ontology.axioms._axiom.call(null,ontology.axioms._annotationAxiom.call(null,ontology.axioms._annotationImplication.call(null,ontology.annotations.annotationRole.call(null,antecedent),ontology.annotations.annotationRole.call(null,consequent))));
}));

(ontology.axioms.annotationImplication.cljs$core$IFn$_invoke$arity$3 = (function (annotations,antecedent,consequent){
return ontology.axioms._axiom.call(null,ontology.axioms._annotationAxiom.call(null,ontology.axioms._annotationImplication.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.annotations.annotationRole.call(null,antecedent),ontology.annotations.annotationRole.call(null,antecedent))));
}));

(ontology.axioms.annotationImplication.cljs$lang$maxFixedArity = 3);

/**
 * AnnotationPropertyDomain := 'AnnotationPropertyDomain' '(' axiomAnnotations AnnotationProperty IRI ')'
 */
ontology.axioms._annotationDomain = (function ontology$axioms$_annotationDomain(var_args){
var G__949 = arguments.length;
switch (G__949) {
case 2:
return ontology.axioms._annotationDomain.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._annotationDomain.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._annotationDomain.cljs$core$IFn$_invoke$arity$2 = (function (annotationRole,IRI){
if(cljs.core.truth_(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationRole),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139)))?new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(IRI):false))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"iri","iri",423917494),IRI,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationDomain","annotationDomain",1599570091),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotationDomain","annotationDomain",1599570091)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotationDomain","ontology.axioms/notAnnotationDomain",-1932016580),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"iri","iri",423917494),IRI], null))));
}
}));

(ontology.axioms._annotationDomain.cljs$core$IFn$_invoke$arity$3 = (function (annotations,annotationRole,IRI){
if(cljs.core.truth_(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationRole),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139)))?new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(IRI):false))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"iri","iri",423917494),IRI,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationDomain","annotationDomain",1599570091),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotationDomain","annotationDomain",1599570091),new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotationDomain","ontology.axioms/notAnnotationDomain",-1932016580),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"iri","iri",423917494),IRI], null))));
}
}));

(ontology.axioms._annotationDomain.cljs$lang$maxFixedArity = 3);

ontology.axioms.annotationDomain = (function ontology$axioms$annotationDomain(var_args){
var G__952 = arguments.length;
switch (G__952) {
case 2:
return ontology.axioms.annotationDomain.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.annotationDomain.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.annotationDomain.cljs$core$IFn$_invoke$arity$2 = (function (annotationRole,IRI){
return ontology.axioms._axiom.call(null,ontology.axioms._annotationAxiom.call(null,ontology.axioms._annotationDomain.call(null,ontology.annotations.annotationRole.call(null,annotationRole),IRI)));
}));

(ontology.axioms.annotationDomain.cljs$core$IFn$_invoke$arity$3 = (function (annotations,annotationRole,IRI){
return ontology.axioms._axiom.call(null,ontology.axioms._annotationAxiom.call(null,ontology.axioms._annotationDomain.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.annotations.annotationRole.call(null,annotationRole),ontology.components.IRI.call(null,IRI))));
}));

(ontology.axioms.annotationDomain.cljs$lang$maxFixedArity = 3);

/**
 * AnnotationPropertyRange := 'AnnotationPropertyRange' '(' axiomAnnotations AnnotationProperty IRI ')'
 */
ontology.axioms._annotationRange = (function ontology$axioms$_annotationRange(var_args){
var G__955 = arguments.length;
switch (G__955) {
case 2:
return ontology.axioms._annotationRange.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms._annotationRange.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms._annotationRange.cljs$core$IFn$_invoke$arity$2 = (function (annotationRole,IRI){
if(cljs.core.truth_(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationRole),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139)))?new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(IRI):false))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"iri","iri",423917494),IRI,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationRange","annotationRange",1738358005),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotationRange","annotationRange",1738358005)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotationRange","ontology.axioms/notAnnotationRange",465781591),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"iri","iri",423917494),IRI], null))));
}
}));

(ontology.axioms._annotationRange.cljs$core$IFn$_invoke$arity$3 = (function (annotations,annotationRole,IRI){
if(cljs.core.truth_(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationRole),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139)))?new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(IRI):false))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"iri","iri",423917494),IRI,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationRange","annotationRange",1738358005),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotationRange","annotationRange",1738358005),new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations)], null);
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotations","ontology.axioms/notAnnotations",1553478907),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.axioms.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.axioms","notAnnotationRange","ontology.axioms/notAnnotationRange",465781591),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"iri","iri",423917494),IRI], null))));
}
}));

(ontology.axioms._annotationRange.cljs$lang$maxFixedArity = 3);

ontology.axioms.annotationRange = (function ontology$axioms$annotationRange(var_args){
var G__958 = arguments.length;
switch (G__958) {
case 2:
return ontology.axioms.annotationRange.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.axioms.annotationRange.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.axioms.annotationRange.cljs$core$IFn$_invoke$arity$2 = (function (annotationRole,IRI){
return ontology.axioms._axiom.call(null,ontology.axioms._annotationAxiom.call(null,ontology.axioms._annotationRange.call(null,ontology.annotations.annotationRole.call(null,annotationRole),IRI)));
}));

(ontology.axioms.annotationRange.cljs$core$IFn$_invoke$arity$3 = (function (annotations,annotationRole,IRI){
return ontology.axioms._axiom.call(null,ontology.axioms._annotationAxiom.call(null,ontology.axioms._annotationRange.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.annotations.annotationRole.call(null,annotationRole),IRI)));
}));

(ontology.axioms.annotationRange.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=axioms.js.map
