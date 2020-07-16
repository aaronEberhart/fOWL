// Compiled by ClojureScript 1.10.758 {}
goog.provide('ontology.facts');
goog.require('cljs.core');
goog.require('ontology.components');
goog.require('ontology.axioms');
goog.require('ontology.annotations');
goog.require('ontology.expressions');
ontology.facts.factTypes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"!=individuals","!=individuals",-1137787424),null,new cljs.core.Keyword(null,"=individuals","=individuals",405358795),null,new cljs.core.Keyword(null,"classFact","classFact",1029650285),null,new cljs.core.Keyword(null,"notRoleFact","notRoleFact",-1987036174),null,new cljs.core.Keyword(null,"roleFact","roleFact",-1403247691),null,new cljs.core.Keyword(null,"notDataRoleFact","notDataRoleFact",-467429607),null,new cljs.core.Keyword(null,"dataRoleFact","dataRoleFact",652620252),null], null), null);
/**
 * Assertion := SameIndividual | DifferentIndividuals | ClassAssertion | ObjectPropertyAssertion | NegativeObjectPropertyAssertion | DataPropertyAssertion | NegativeDataPropertyAssertion
 */
ontology.facts._fact = (function ontology$facts$_fact(fact){
if(cljs.core.contains_QMARK_.call(null,ontology.facts.factTypes,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(fact))){
return cljs.core.assoc.call(null,fact,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"axiom","axiom",-1683284564),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"fact","fact",-799816531));
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notAssertion","ontology.facts/notAssertion",-1569482723),new cljs.core.Keyword(null,"fact","fact",-799816531),fact], null))));
}
});
/**
 * SameIndividual := 'SameIndividual' '(' axiomAnnotations Individual Individual { Individual } ')'
 */
ontology.facts.__EQ_individuals = (function ontology$facts$__EQ_individuals(var_args){
var G__1000 = arguments.length;
switch (G__1000) {
case 1:
return ontology.facts.__EQ_individuals.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.facts.__EQ_individuals.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts.__EQ_individuals.cljs$core$IFn$_invoke$arity$1 = (function (individuals){
if(((1) < cljs.core.count.call(null,individuals))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"individual","individual",-1643964808));
}),individuals)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=individuals","=individuals",405358795),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=individuals","=individuals",405358795),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"=individuals","=individuals",405358795)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notIndividuals","ontology.facts/notIndividuals",-1191877765),new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notEnoughIndividuals","ontology.facts/notEnoughIndividuals",48554796),new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals], null))));
}
}));

(ontology.facts.__EQ_individuals.cljs$core$IFn$_invoke$arity$2 = (function (annotations,individuals){
if(((1) < cljs.core.count.call(null,individuals))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"individual","individual",-1643964808));
}),individuals)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=individuals","=individuals",405358795),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=individuals","=individuals",405358795),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"=individuals","=individuals",405358795)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notAnnotations","ontology.facts/notAnnotations",861116337),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notIndividuals","ontology.facts/notIndividuals",-1191877765),new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notEnoughIndividuals","ontology.facts/notEnoughIndividuals",48554796),new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals], null))));
}
}));

(ontology.facts.__EQ_individuals.cljs$lang$maxFixedArity = 2);

ontology.facts._EQ_individuals = (function ontology$facts$_EQ_individuals(var_args){
var G__1003 = arguments.length;
switch (G__1003) {
case 1:
return ontology.facts._EQ_individuals.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.facts._EQ_individuals.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts._EQ_individuals.cljs$core$IFn$_invoke$arity$1 = (function (individuals){
return ontology.facts._fact.call(null,ontology.facts.__EQ_individuals.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.components.individual,individuals))));
}));

(ontology.facts._EQ_individuals.cljs$core$IFn$_invoke$arity$2 = (function (annotations,individuals){
return ontology.facts._fact.call(null,ontology.facts.__EQ_individuals.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.components.individual,individuals))));
}));

(ontology.facts._EQ_individuals.cljs$lang$maxFixedArity = 2);

/**
 * DifferentIndividuals := 'DifferentIndividuals' '(' axiomAnnotations Individual Individual { Individual } ')'
 */
ontology.facts.__BANG__EQ_individuals = (function ontology$facts$__BANG__EQ_individuals(var_args){
var G__1006 = arguments.length;
switch (G__1006) {
case 1:
return ontology.facts.__BANG__EQ_individuals.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.facts.__BANG__EQ_individuals.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts.__BANG__EQ_individuals.cljs$core$IFn$_invoke$arity$1 = (function (individuals){
if(((1) < cljs.core.count.call(null,individuals))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"individual","individual",-1643964808));
}),individuals)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"!=individuals","!=individuals",-1137787424),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"!=individuals","!=individuals",-1137787424),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"!=individuals","!=individuals",-1137787424)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notIndividuals","ontology.facts/notIndividuals",-1191877765),new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notEnoughIndividuals","ontology.facts/notEnoughIndividuals",48554796),new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals], null))));
}
}));

(ontology.facts.__BANG__EQ_individuals.cljs$core$IFn$_invoke$arity$2 = (function (annotations,individuals){
if(((1) < cljs.core.count.call(null,individuals))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"individual","individual",-1643964808));
}),individuals)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"!=individuals","!=individuals",-1137787424),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"!=individuals","!=individuals",-1137787424),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"!=individuals","!=individuals",-1137787424)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notAnnotations","ontology.facts/notAnnotations",861116337),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notIndividuals","ontology.facts/notIndividuals",-1191877765),new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notEnoughIndividuals","ontology.facts/notEnoughIndividuals",48554796),new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals], null))));
}
}));

(ontology.facts.__BANG__EQ_individuals.cljs$lang$maxFixedArity = 2);

ontology.facts._BANG__EQ_individuals = (function ontology$facts$_BANG__EQ_individuals(var_args){
var G__1009 = arguments.length;
switch (G__1009) {
case 1:
return ontology.facts._BANG__EQ_individuals.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.facts._BANG__EQ_individuals.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts._BANG__EQ_individuals.cljs$core$IFn$_invoke$arity$1 = (function (individuals){
return ontology.facts._fact.call(null,ontology.facts.__BANG__EQ_individuals.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.components.individual,individuals))));
}));

(ontology.facts._BANG__EQ_individuals.cljs$core$IFn$_invoke$arity$2 = (function (annotations,individuals){
return ontology.facts._fact.call(null,ontology.facts.__BANG__EQ_individuals.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.components.individual,individuals))));
}));

(ontology.facts._BANG__EQ_individuals.cljs$lang$maxFixedArity = 2);

/**
 * ClassAssertion := 'ClassAssertion' '(' axiomAnnotations ClassExpression Individual ')'
 */
ontology.facts._classFact = (function ontology$facts$_classFact(var_args){
var G__1012 = arguments.length;
switch (G__1012) {
case 2:
return ontology.facts._classFact.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.facts._classFact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts._classFact.cljs$core$IFn$_invoke$arity$2 = (function (class$,individual){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(individual),new cljs.core.Keyword(null,"individual","individual",-1643964808))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"individual","individual",-1643964808),individual,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"classFact","classFact",1029650285),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"classFact","classFact",1029650285),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"classFact","classFact",1029650285)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notClass","ontology.facts/notClass",-1264882846),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notIndividual","ontology.facts/notIndividual",453283459),new cljs.core.Keyword(null,"individual","individual",-1643964808),individual], null))));
}
}));

(ontology.facts._classFact.cljs$core$IFn$_invoke$arity$3 = (function (annotations,class$,individual){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(individual),new cljs.core.Keyword(null,"individual","individual",-1643964808))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"individual","individual",-1643964808),individual,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"classFact","classFact",1029650285),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"classFact","classFact",1029650285),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"classFact","classFact",1029650285)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notAnnotations","ontology.facts/notAnnotations",861116337),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notClass","ontology.facts/notClass",-1264882846),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notIndividual","ontology.facts/notIndividual",453283459),new cljs.core.Keyword(null,"individual","individual",-1643964808),individual], null))));
}
}));

(ontology.facts._classFact.cljs$lang$maxFixedArity = 3);

ontology.facts.classFact = (function ontology$facts$classFact(var_args){
var G__1015 = arguments.length;
switch (G__1015) {
case 2:
return ontology.facts.classFact.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.facts.classFact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts.classFact.cljs$core$IFn$_invoke$arity$2 = (function (class$,individual){
return ontology.facts._fact.call(null,ontology.facts._classFact.call(null,ontology.expressions.class$.call(null,class$),ontology.components.individual.call(null,individual)));
}));

(ontology.facts.classFact.cljs$core$IFn$_invoke$arity$3 = (function (annotations,class$,individual){
return ontology.facts._fact.call(null,ontology.facts._classFact.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.class$.call(null,class$),ontology.components.individual.call(null,individual)));
}));

(ontology.facts.classFact.cljs$lang$maxFixedArity = 3);

/**
 * sourceIndividual := Individual
 */
ontology.facts._fromIndividual = (function ontology$facts$_fromIndividual(individual){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(individual),new cljs.core.Keyword(null,"individual","individual",-1643964808))){
return individual;
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notIndividual","ontology.facts/notIndividual",453283459),new cljs.core.Keyword(null,"individual","individual",-1643964808),individual], null))));
}
});
/**
 * targetIndividual := Individual
 */
ontology.facts._toIndividual = (function ontology$facts$_toIndividual(individual){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(individual),new cljs.core.Keyword(null,"individual","individual",-1643964808))){
return individual;
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notIndividual","ontology.facts/notIndividual",453283459),new cljs.core.Keyword(null,"individual","individual",-1643964808),individual], null))));
}
});
/**
 * targetValue := Literal
 */
ontology.facts._toLiteral = (function ontology$facts$_toLiteral(literal){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(literal),new cljs.core.Keyword(null,"literal","literal",1664775605))){
return literal;
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notLiteral","ontology.facts/notLiteral",1442178739),new cljs.core.Keyword(null,"literal","literal",1664775605),literal], null))));
}
});
/**
 * ObjectPropertyAssertion := 'ObjectPropertyAssertion' '(' axiomAnnotations ObjectPropertyExpression sourceIndividual targetIndividual ')'
 */
ontology.facts._roleFact = (function ontology$facts$_roleFact(var_args){
var G__1018 = arguments.length;
switch (G__1018) {
case 3:
return ontology.facts._roleFact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.facts._roleFact.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts._roleFact.cljs$core$IFn$_invoke$arity$3 = (function (role,fromIndividual,toIndividual){
if(((((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(fromIndividual),new cljs.core.Keyword(null,"individual","individual",-1643964808))))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(toIndividual),new cljs.core.Keyword(null,"individual","individual",-1643964808))))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toIndividual","toIndividual",2019844937),toIndividual,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleFact","roleFact",-1403247691),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleFact","roleFact",-1403247691),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"roleFact","roleFact",-1403247691)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notRoleFact","ontology.facts/notRoleFact",974378362),new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toIndividual","toIndividual",2019844937),toIndividual], null))));
}
}));

(ontology.facts._roleFact.cljs$core$IFn$_invoke$arity$4 = (function (annotations,role,fromIndividual,toIndividual){
if(((((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(fromIndividual),new cljs.core.Keyword(null,"individual","individual",-1643964808))))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(toIndividual),new cljs.core.Keyword(null,"individual","individual",-1643964808))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toIndividual","toIndividual",2019844937),toIndividual,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleFact","roleFact",-1403247691),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleFact","roleFact",-1403247691),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"roleFact","roleFact",-1403247691)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notAnnotations","ontology.facts/notAnnotations",861116337),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notRoleFact","ontology.facts/notRoleFact",974378362),new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toIndividual","toIndividual",2019844937),toIndividual], null))));
}
}));

(ontology.facts._roleFact.cljs$lang$maxFixedArity = 4);

ontology.facts.roleFact = (function ontology$facts$roleFact(var_args){
var G__1021 = arguments.length;
switch (G__1021) {
case 3:
return ontology.facts.roleFact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.facts.roleFact.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts.roleFact.cljs$core$IFn$_invoke$arity$3 = (function (role,fromIndividual,toIndividual){
return ontology.facts._fact.call(null,ontology.facts._roleFact.call(null,ontology.expressions.role.call(null,role),ontology.components.individual.call(null,fromIndividual),ontology.components.individual.call(null,toIndividual)));
}));

(ontology.facts.roleFact.cljs$core$IFn$_invoke$arity$4 = (function (annotations,role,fromIndividual,toIndividual){
return ontology.facts._fact.call(null,ontology.facts._roleFact.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,role),ontology.components.individual.call(null,fromIndividual),ontology.components.individual.call(null,toIndividual)));
}));

(ontology.facts.roleFact.cljs$lang$maxFixedArity = 4);

/**
 * NegativeObjectPropertyAssertion := 'NegativeObjectPropertyAssertion' '(' axiomAnnotations ObjectPropertyExpression sourceIndividual targetIndividual ')'
 */
ontology.facts._notRoleFact = (function ontology$facts$_notRoleFact(var_args){
var G__1024 = arguments.length;
switch (G__1024) {
case 3:
return ontology.facts._notRoleFact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.facts._notRoleFact.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts._notRoleFact.cljs$core$IFn$_invoke$arity$3 = (function (role,fromIndividual,toIndividual){
if(((((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(fromIndividual),new cljs.core.Keyword(null,"individual","individual",-1643964808))))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(toIndividual),new cljs.core.Keyword(null,"individual","individual",-1643964808))))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toIndividual","toIndividual",2019844937),toIndividual,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"notRoleFact","notRoleFact",-1987036174),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"notRoleFact","notRoleFact",-1987036174),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"notRoleFact","notRoleFact",-1987036174)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notNotRoleFact","ontology.facts/notNotRoleFact",-1083248917),new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toIndividual","toIndividual",2019844937),toIndividual], null))));
}
}));

(ontology.facts._notRoleFact.cljs$core$IFn$_invoke$arity$4 = (function (annotations,role,fromIndividual,toIndividual){
if(((((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(fromIndividual),new cljs.core.Keyword(null,"individual","individual",-1643964808))))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(toIndividual),new cljs.core.Keyword(null,"individual","individual",-1643964808))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toIndividual","toIndividual",2019844937),toIndividual,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"notRoleFact","notRoleFact",-1987036174),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"notRoleFact","notRoleFact",-1987036174),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"notRoleFact","notRoleFact",-1987036174)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notAnnotations","ontology.facts/notAnnotations",861116337),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notNotRoleFact","ontology.facts/notNotRoleFact",-1083248917),new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toIndividual","toIndividual",2019844937),toIndividual], null))));
}
}));

(ontology.facts._notRoleFact.cljs$lang$maxFixedArity = 4);

ontology.facts.notRoleFact = (function ontology$facts$notRoleFact(var_args){
var G__1027 = arguments.length;
switch (G__1027) {
case 3:
return ontology.facts.notRoleFact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.facts.notRoleFact.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts.notRoleFact.cljs$core$IFn$_invoke$arity$3 = (function (role,fromIndividual,toIndividual){
return ontology.facts._fact.call(null,ontology.facts._notRoleFact.call(null,ontology.expressions.role.call(null,role),ontology.components.individual.call(null,fromIndividual),ontology.components.individual.call(null,toIndividual)));
}));

(ontology.facts.notRoleFact.cljs$core$IFn$_invoke$arity$4 = (function (annotations,role,fromIndividual,toIndividual){
return ontology.facts._fact.call(null,ontology.facts._notRoleFact.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.role.call(null,role),ontology.components.individual.call(null,fromIndividual),ontology.components.individual.call(null,toIndividual)));
}));

(ontology.facts.notRoleFact.cljs$lang$maxFixedArity = 4);

/**
 * DataPropertyAssertion := 'DataPropertyAssertion' '(' axiomAnnotations DataPropertyExpression sourceIndividual targetValue ')'
 */
ontology.facts._dataRoleFact = (function ontology$facts$_dataRoleFact(var_args){
var G__1030 = arguments.length;
switch (G__1030) {
case 3:
return ontology.facts._dataRoleFact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.facts._dataRoleFact.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts._dataRoleFact.cljs$core$IFn$_invoke$arity$3 = (function (dataRole,fromIndividual,toLiteral){
if(((((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(fromIndividual),new cljs.core.Keyword(null,"individual","individual",-1643964808))))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(toLiteral),new cljs.core.Keyword(null,"literal","literal",1664775605))))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toLiteral","toLiteral",-1063704539),toLiteral,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRoleFact","dataRoleFact",652620252),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleFact","dataRoleFact",652620252),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"dataRoleFact","dataRoleFact",652620252)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notDataRoleFact","ontology.facts/notDataRoleFact",-207618815),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toLiteral","toLiteral",-1063704539),toLiteral], null))));
}
}));

(ontology.facts._dataRoleFact.cljs$core$IFn$_invoke$arity$4 = (function (annotations,dataRole,fromIndividual,toLiteral){
if(((((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(fromIndividual),new cljs.core.Keyword(null,"individual","individual",-1643964808))))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(toLiteral),new cljs.core.Keyword(null,"literal","literal",1664775605))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toLiteral","toLiteral",-1063704539),toLiteral,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRoleFact","dataRoleFact",652620252),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleFact","dataRoleFact",652620252),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"dataRoleFact","dataRoleFact",652620252)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notAnnotations","ontology.facts/notAnnotations",861116337),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notDataRoleFact","ontology.facts/notDataRoleFact",-207618815),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toLiteral","toLiteral",-1063704539),toLiteral], null))));
}
}));

(ontology.facts._dataRoleFact.cljs$lang$maxFixedArity = 4);

ontology.facts.dataRoleFact = (function ontology$facts$dataRoleFact(var_args){
var G__1033 = arguments.length;
switch (G__1033) {
case 3:
return ontology.facts.dataRoleFact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.facts.dataRoleFact.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts.dataRoleFact.cljs$core$IFn$_invoke$arity$3 = (function (dataRole,fromIndividual,toLiteral){
return ontology.facts._fact.call(null,ontology.facts._dataRoleFact.call(null,ontology.expressions.dataRole.call(null,dataRole),ontology.components.individual.call(null,fromIndividual),toLiteral));
}));

(ontology.facts.dataRoleFact.cljs$core$IFn$_invoke$arity$4 = (function (annotations,dataRole,fromIndividual,toLiteral){
return ontology.facts._fact.call(null,ontology.facts._dataRoleFact.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.dataRole.call(null,dataRole),ontology.components.individual.call(null,fromIndividual),toLiteral));
}));

(ontology.facts.dataRoleFact.cljs$lang$maxFixedArity = 4);

/**
 * NegativeDataPropertyAssertion := 'NegativeDataPropertyAssertion' '(' axiomAnnotations DataPropertyExpression sourceIndividual targetValue ')'
 */
ontology.facts._notDataRoleFact = (function ontology$facts$_notDataRoleFact(var_args){
var G__1036 = arguments.length;
switch (G__1036) {
case 3:
return ontology.facts._notDataRoleFact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.facts._notDataRoleFact.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts._notDataRoleFact.cljs$core$IFn$_invoke$arity$3 = (function (dataRole,fromIndividual,toLiteral){
if(((((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(fromIndividual),new cljs.core.Keyword(null,"individual","individual",-1643964808))))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(toLiteral),new cljs.core.Keyword(null,"literal","literal",1664775605))))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toLiteral","toLiteral",-1063704539),toLiteral,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"notDataRoleFact","notDataRoleFact",-467429607),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"notDataRoleFact","notDataRoleFact",-467429607),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"notDataRoleFact","notDataRoleFact",-467429607)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notNotDataRoleFact","ontology.facts/notNotDataRoleFact",-81826600),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toLiteral","toLiteral",-1063704539),toLiteral], null))));
}
}));

(ontology.facts._notDataRoleFact.cljs$core$IFn$_invoke$arity$4 = (function (annotations,dataRole,fromIndividual,toLiteral){
if(((((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(fromIndividual),new cljs.core.Keyword(null,"individual","individual",-1643964808))))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(toLiteral),new cljs.core.Keyword(null,"literal","literal",1664775605))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945))){
return new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toLiteral","toLiteral",-1063704539),toLiteral,new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"notDataRoleFact","notDataRoleFact",-467429607),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"notDataRoleFact","notDataRoleFact",-467429607),new cljs.core.Keyword(null,"outerType","outerType",1894167495),new cljs.core.Keyword(null,"notDataRoleFact","notDataRoleFact",-467429607)], null);
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notAnnotations","ontology.facts/notAnnotations",861116337),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.facts.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.facts","notNotDataRoleFact","ontology.facts/notNotDataRoleFact",-81826600),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"fromIndividual","fromIndividual",1893348837),fromIndividual,new cljs.core.Keyword(null,"toLiteral","toLiteral",-1063704539),toLiteral], null))));
}
}));

(ontology.facts._notDataRoleFact.cljs$lang$maxFixedArity = 4);

ontology.facts.notDataRoleFact = (function ontology$facts$notDataRoleFact(var_args){
var G__1039 = arguments.length;
switch (G__1039) {
case 3:
return ontology.facts.notDataRoleFact.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.facts.notDataRoleFact.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.facts.notDataRoleFact.cljs$core$IFn$_invoke$arity$3 = (function (dataRole,fromIndividual,toLiteral){
return ontology.facts._fact.call(null,ontology.facts._notDataRoleFact.call(null,ontology.expressions.dataRole.call(null,dataRole),ontology.components.individual.call(null,fromIndividual),toLiteral));
}));

(ontology.facts.notDataRoleFact.cljs$core$IFn$_invoke$arity$4 = (function (annotations,dataRole,fromIndividual,toLiteral){
return ontology.facts._fact.call(null,ontology.facts._notDataRoleFact.call(null,ontology.annotations.axiomAnnotations.call(null,annotations),ontology.expressions.dataRole.call(null,dataRole),ontology.components.individual.call(null,fromIndividual),toLiteral));
}));

(ontology.facts.notDataRoleFact.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=facts.js.map
