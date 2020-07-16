// Compiled by ClojureScript 1.10.758 {}
goog.provide('ontology.expressions');
goog.require('cljs.core');
goog.require('ontology.components');
ontology.expressions.classTypes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 19, [new cljs.core.Keyword(null,"exists","exists",1312597120),null,new cljs.core.Keyword(null,"partialDataRole","partialDataRole",-1749002111),null,new cljs.core.Keyword(null,"=dataExists","=dataExists",1899851649),null,new cljs.core.Keyword(null,"nominal","nominal",413899877),null,new cljs.core.Keyword(null,"or","or",235744169),null,new cljs.core.Keyword(null,"dataAll","dataAll",-520992053),null,new cljs.core.Keyword(null,">=dataExists",">=dataExists",-617023733),null,new cljs.core.Keyword(null,"not","not",-595976884),null,new cljs.core.Keyword(null,"dataExists","dataExists",509482988),null,new cljs.core.Keyword(null,"all","all",892129742),null,new cljs.core.Keyword(null,"Self","Self",-346647794),null,new cljs.core.Keyword(null,"className","className",-1983287057),null,new cljs.core.Keyword(null,"class","class",-2030961996),null,new cljs.core.Keyword(null,"=exists","=exists",1567269302),null,new cljs.core.Keyword(null,"and","and",-971899817),null,new cljs.core.Keyword(null,"<=dataExists","<=dataExists",-757322728),null,new cljs.core.Keyword(null,"partialRole","partialRole",-52592584),null,new cljs.core.Keyword(null,">=exists",">=exists",462675386),null,new cljs.core.Keyword(null,"<=exists","<=exists",-218313476),null], null), null);
/**
 * ObjectPropertyExpression := ObjectProperty | InverseObjectProperty
 */
ontology.expressions._role = (function ontology$expressions$_role(role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"roleName","roleName",945308896))){
return cljs.core.assoc.call(null,role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"role","role",-736691072));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return cljs.core.assoc.call(null,role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"role","role",-736691072));
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notRole","ontology.expressions/notRole",1294145566),new cljs.core.Keyword(null,"roleName","roleName",945308896),role], null))));
}
}
});
ontology.expressions.role = (function ontology$expressions$role(var_args){
var G__682 = arguments.length;
switch (G__682) {
case 1:
return ontology.expressions.role.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.expressions.role.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions.role.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions.role.cljs$core$IFn$_invoke$arity$1 = (function (iri){
if(typeof iri === 'string'){
return ontology.expressions._role.call(null,ontology.components.roleName.call(null,ontology.components.IRI.call(null,iri)));
} else {
if(cljs.core.contains_QMARK_.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(iri),new cljs.core.Keyword(null,"roleChain","roleChain",1454404002))){
return iri;
} else {
return ontology.expressions._role.call(null,iri);
}
} else {
return ontology.expressions._role.call(null,ontology.components.roleName.call(null,iri));
}
}
}));

(ontology.expressions.role.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return ontology.expressions._role.call(null,ontology.components.roleName.call(null,prefix,iri));
}));

(ontology.expressions.role.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return ontology.expressions._role.call(null,ontology.components.roleName.call(null,prefix,iri,namespace));
}));

(ontology.expressions.role.cljs$lang$maxFixedArity = 3);

ontology.expressions.inverseRole = (function ontology$expressions$inverseRole(var_args){
var G__685 = arguments.length;
switch (G__685) {
case 1:
return ontology.expressions.inverseRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.expressions.inverseRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions.inverseRole.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions.inverseRole.cljs$core$IFn$_invoke$arity$1 = (function (iri){
if(typeof iri === 'string'){
return ontology.expressions._role.call(null,ontology.components.inverseRoleName.call(null,ontology.components.IRI.call(null,iri)));
} else {
if(cljs.core.contains_QMARK_.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(iri),new cljs.core.Keyword(null,"inverseRole","inverseRole",-1210248656))){
return iri;
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notInverseRole","ontology.expressions/notInverseRole",1147120628),new cljs.core.Keyword(null,"roleName","roleName",945308896),iri], null))));
}
} else {
return ontology.expressions._role.call(null,ontology.components.inverseRoleName.call(null,iri));
}
}
}));

(ontology.expressions.inverseRole.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return ontology.expressions._role.call(null,ontology.components.inverseRoleName.call(null,prefix,iri));
}));

(ontology.expressions.inverseRole.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return ontology.expressions._role.call(null,ontology.components.inverseRoleName.call(null,prefix,iri,namespace));
}));

(ontology.expressions.inverseRole.cljs$lang$maxFixedArity = 3);

/**
 * DataPropertyExpression := DataProperty
 */
ontology.expressions._dataRole = (function ontology$expressions$_dataRole(dataRole){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
return dataRole;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRoleName","dataRoleName",1086271076))){
return cljs.core.assoc.call(null,dataRole,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746));
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRole","ontology.expressions/notDataRole",-200714889),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
}
});
ontology.expressions.dataRole = (function ontology$expressions$dataRole(var_args){
var G__688 = arguments.length;
switch (G__688) {
case 1:
return ontology.expressions.dataRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.expressions.dataRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions.dataRole.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions.dataRole.cljs$core$IFn$_invoke$arity$1 = (function (iri){
if(typeof iri === 'string'){
return ontology.expressions._dataRole.call(null,ontology.components.dataRoleName.call(null,ontology.components.IRI.call(null,iri)));
} else {
if(cljs.core.contains_QMARK_.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348))){
return ontology.expressions._dataRole.call(null,iri);
} else {
return ontology.expressions._dataRole.call(null,ontology.components.dataRoleName.call(null,iri));
}
}
}));

(ontology.expressions.dataRole.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return ontology.expressions._dataRole.call(null,ontology.components.dataRoleName.call(null,prefix,iri));
}));

(ontology.expressions.dataRole.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return ontology.expressions._dataRole.call(null,ontology.components.dataRoleName.call(null,prefix,iri,namespace));
}));

(ontology.expressions.dataRole.cljs$lang$maxFixedArity = 3);

/**
 * ClassExpression := Class | ObjectIntersectionOf | ObjectUnionOf | ObjectComplementOf | ObjectOneOf | ObjectSomeValuesFrom | ObjectAllValuesFrom |
 *                   ObjectHasValue | ObjectHasSelf | ObjectMinCardinality | ObjectMaxCardinality | ObjectExactCardinality | DataSomeValuesFrom |
 *                   DataAllValuesFrom | DataHasValue | DataMinCardinality | DataMaxCardinality | DataExactCardinality
 */
ontology.expressions._class = (function ontology$expressions$_class(class$){
if(cljs.core.contains_QMARK_.call(null,ontology.expressions.classTypes,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$))){
return cljs.core.assoc.call(null,class$,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"class","class",-2030961996));
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notClass","ontology.expressions/notClass",2121792494),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
});
ontology.expressions.class$ = (function ontology$expressions$class(var_args){
var G__691 = arguments.length;
switch (G__691) {
case 1:
return ontology.expressions.class$.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.expressions.class$.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions.class$.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions.class$.cljs$core$IFn$_invoke$arity$1 = (function (iri){
if(typeof iri === 'string'){
return ontology.expressions._class.call(null,ontology.components.className.call(null,ontology.components.IRI.call(null,iri)));
} else {
if(cljs.core.contains_QMARK_.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348))){
return ontology.expressions._class.call(null,iri);
} else {
return ontology.expressions._class.call(null,ontology.components.className.call(null,iri));
}
}
}));

(ontology.expressions.class$.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return ontology.expressions._class.call(null,ontology.components.className.call(null,prefix,iri));
}));

(ontology.expressions.class$.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return ontology.expressions._class.call(null,ontology.components.className.call(null,prefix,iri,namespace));
}));

(ontology.expressions.class$.cljs$lang$maxFixedArity = 3);

/**
 * ObjectIntersectionOf := 'ObjectIntersectionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'
 */
ontology.expressions._and = (function ontology$expressions$_and(classes){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"class","class",-2030961996));
}),classes)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"classes","classes",2037804510),classes,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"and","and",-971899817),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"and","and",-971899817)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notClass","ontology.expressions/notClass",2121792494),new cljs.core.Keyword(null,"class","class",-2030961996),classes], null))));
}
});
ontology.expressions.and = (function ontology$expressions$and(var_args){
var G__697 = arguments.length;
switch (G__697) {
case 2:
return ontology.expressions.and.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__4757__auto__ = [];
var len__4736__auto___699 = arguments.length;
var i__4737__auto___700 = (0);
while(true){
if((i__4737__auto___700 < len__4736__auto___699)){
args_arr__4757__auto__.push((arguments[i__4737__auto___700]));

var G__701 = (i__4737__auto___700 + (1));
i__4737__auto___700 = G__701;
continue;
} else {
}
break;
}

var argseq__4758__auto__ = (new cljs.core.IndexedSeq(args_arr__4757__auto__.slice((2)),(0),null));
return ontology.expressions.and.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4758__auto__);

}
});

(ontology.expressions.and.cljs$core$IFn$_invoke$arity$2 = (function (class1,class2){
var classSet = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ontology.expressions.class$.call(null,class1),ontology.expressions.class$.call(null,class2)], null));
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,classSet))){
return cljs.core.first.call(null,classSet);
} else {
return ontology.expressions._class.call(null,ontology.expressions._and.call(null,classSet));
}
}));

(ontology.expressions.and.cljs$core$IFn$_invoke$arity$variadic = (function (class1,class2,classes){
var classSet = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.class$,cljs.core.flatten.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [class1,class2,classes], null))));
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,classSet))){
return cljs.core.first.call(null,classSet);
} else {
return ontology.expressions._class.call(null,ontology.expressions._and.call(null,classSet));
}
}));

/** @this {Function} */
(ontology.expressions.and.cljs$lang$applyTo = (function (seq694){
var G__695 = cljs.core.first.call(null,seq694);
var seq694__$1 = cljs.core.next.call(null,seq694);
var G__696 = cljs.core.first.call(null,seq694__$1);
var seq694__$2 = cljs.core.next.call(null,seq694__$1);
var self__4723__auto__ = this;
return self__4723__auto__.cljs$core$IFn$_invoke$arity$variadic(G__695,G__696,seq694__$2);
}));

(ontology.expressions.and.cljs$lang$maxFixedArity = (2));

/**
 * ObjectUnionOf := 'ObjectUnionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'
 */
ontology.expressions._or = (function ontology$expressions$_or(classes){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"class","class",-2030961996));
}),classes)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"classes","classes",2037804510),classes,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"or","or",235744169),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"or","or",235744169)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notClass","ontology.expressions/notClass",2121792494),new cljs.core.Keyword(null,"class","class",-2030961996),classes], null))));
}
});
ontology.expressions.or = (function ontology$expressions$or(var_args){
var G__706 = arguments.length;
switch (G__706) {
case 2:
return ontology.expressions.or.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__4757__auto__ = [];
var len__4736__auto___708 = arguments.length;
var i__4737__auto___709 = (0);
while(true){
if((i__4737__auto___709 < len__4736__auto___708)){
args_arr__4757__auto__.push((arguments[i__4737__auto___709]));

var G__710 = (i__4737__auto___709 + (1));
i__4737__auto___709 = G__710;
continue;
} else {
}
break;
}

var argseq__4758__auto__ = (new cljs.core.IndexedSeq(args_arr__4757__auto__.slice((2)),(0),null));
return ontology.expressions.or.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4758__auto__);

}
});

(ontology.expressions.or.cljs$core$IFn$_invoke$arity$2 = (function (class1,class2){
var classSet = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ontology.expressions.class$.call(null,class1),ontology.expressions.class$.call(null,class2)], null));
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,classSet))){
return cljs.core.first.call(null,classSet);
} else {
return ontology.expressions._class.call(null,ontology.expressions._or.call(null,classSet));
}
}));

(ontology.expressions.or.cljs$core$IFn$_invoke$arity$variadic = (function (class1,class2,classes){
var classSet = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.class$,cljs.core.flatten.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [class1,class2,classes], null))));
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,classSet))){
return cljs.core.first.call(null,classSet);
} else {
return ontology.expressions._class.call(null,ontology.expressions._or.call(null,classSet));
}
}));

/** @this {Function} */
(ontology.expressions.or.cljs$lang$applyTo = (function (seq703){
var G__704 = cljs.core.first.call(null,seq703);
var seq703__$1 = cljs.core.next.call(null,seq703);
var G__705 = cljs.core.first.call(null,seq703__$1);
var seq703__$2 = cljs.core.next.call(null,seq703__$1);
var self__4723__auto__ = this;
return self__4723__auto__.cljs$core$IFn$_invoke$arity$variadic(G__704,G__705,seq703__$2);
}));

(ontology.expressions.or.cljs$lang$maxFixedArity = (2));

/**
 * ObjectComplementOf := 'ObjectComplementOf' '(' ClassExpression ')'
 */
ontology.expressions._not = (function ontology$expressions$_not(class$){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"not","not",-595976884),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"not","not",-595976884)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notClass","ontology.expressions/notClass",2121792494),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
});
ontology.expressions.not = (function ontology$expressions$not(c){
return ontology.expressions.class$.call(null,ontology.expressions._not.call(null,ontology.expressions.class$.call(null,c)));
});
/**
 * ObjectOneOf := 'ObjectOneOf' '(' Individual { Individual }')'
 */
ontology.expressions._nominal = (function ontology$expressions$_nominal(individuals){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"individual","individual",-1643964808));
}),individuals)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"nominal","nominal",413899877),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"nominal","nominal",413899877)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notIndividuals","ontology.expressions/notIndividuals",-2036998385),new cljs.core.Keyword(null,"individuals","individuals",600504845),individuals], null))));
}
});
ontology.expressions.nominal = (function ontology$expressions$nominal(var_args){
var G__714 = arguments.length;
switch (G__714) {
case 1:
return ontology.expressions.nominal.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
var args_arr__4757__auto__ = [];
var len__4736__auto___716 = arguments.length;
var i__4737__auto___717 = (0);
while(true){
if((i__4737__auto___717 < len__4736__auto___716)){
args_arr__4757__auto__.push((arguments[i__4737__auto___717]));

var G__718 = (i__4737__auto___717 + (1));
i__4737__auto___717 = G__718;
continue;
} else {
}
break;
}

var argseq__4758__auto__ = (new cljs.core.IndexedSeq(args_arr__4757__auto__.slice((1)),(0),null));
return ontology.expressions.nominal.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4758__auto__);

}
});

(ontology.expressions.nominal.cljs$core$IFn$_invoke$arity$1 = (function (individual){
return ontology.expressions._class.call(null,ontology.expressions._nominal.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ontology.components.individual.call(null,individual)], null))));
}));

(ontology.expressions.nominal.cljs$core$IFn$_invoke$arity$variadic = (function (individual,individuals){
return ontology.expressions._class.call(null,ontology.expressions._nominal.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.components.individual,cljs.core.flatten.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [individual,individuals], null))))));
}));

/** @this {Function} */
(ontology.expressions.nominal.cljs$lang$applyTo = (function (seq712){
var G__713 = cljs.core.first.call(null,seq712);
var seq712__$1 = cljs.core.next.call(null,seq712);
var self__4723__auto__ = this;
return self__4723__auto__.cljs$core$IFn$_invoke$arity$variadic(G__713,seq712__$1);
}));

(ontology.expressions.nominal.cljs$lang$maxFixedArity = (1));

/**
 * ObjectSomeValuesFrom := 'ObjectSomeValuesFrom' '(' ObjectPropertyExpression ClassExpression ')'
 */
ontology.expressions._exists = (function ontology$expressions$_exists(role,class$){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"exists","exists",1312597120),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"exists","exists",1312597120)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notClass","ontology.expressions/notClass",2121792494),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notRole","ontology.expressions/notRole",1294145566),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
});
ontology.expressions.exists = (function ontology$expressions$exists(r,c){
return ontology.expressions._class.call(null,ontology.expressions._exists.call(null,ontology.expressions.role.call(null,r),ontology.expressions.class$.call(null,c)));
});
/**
 * ObjectAllValuesFrom := 'ObjectAllValuesFrom' '(' ObjectPropertyExpression ClassExpression ')'
 */
ontology.expressions._all = (function ontology$expressions$_all(role,class$){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"all","all",892129742),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"all","all",892129742)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notClass","ontology.expressions/notClass",2121792494),new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notRole","ontology.expressions/notRole",1294145566),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
});
ontology.expressions.all = (function ontology$expressions$all(r,c){
return ontology.expressions._class.call(null,ontology.expressions._all.call(null,ontology.expressions.role.call(null,r),ontology.expressions.class$.call(null,c)));
});
/**
 * ObjectHasValue := 'ObjectHasValue' '(' ObjectPropertyExpression Individual ')'
 */
ontology.expressions._partialRole = (function ontology$expressions$_partialRole(role,individual){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(individual),new cljs.core.Keyword(null,"individual","individual",-1643964808))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"individual","individual",-1643964808),individual,new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"partialRole","partialRole",-52592584),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"partialRole","partialRole",-52592584)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notIndividual","ontology.expressions/notIndividual",220463631),new cljs.core.Keyword(null,"individual","individual",-1643964808),individual], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notRole","ontology.expressions/notRole",1294145566),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
});
ontology.expressions.partialRole = (function ontology$expressions$partialRole(r,i){
return ontology.expressions._class.call(null,ontology.expressions._partialRole.call(null,ontology.expressions.role.call(null,r),ontology.components.individual.call(null,i)));
});
/**
 * ObjectHasSelf := 'ObjectHasSelf' '(' ObjectPropertyExpression ')'
 */
ontology.expressions._Self = (function ontology$expressions$_Self(role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"Self","Self",-346647794),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"Self","Self",-346647794)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notRole","ontology.expressions/notRole",1294145566),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
});
ontology.expressions.Self = (function ontology$expressions$Self(var_args){
var G__720 = arguments.length;
switch (G__720) {
case 1:
return ontology.expressions.Self.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 3:
return ontology.expressions.Self.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions.Self.cljs$core$IFn$_invoke$arity$1 = (function (iri){
return ontology.expressions.class$.call(null,ontology.expressions._Self.call(null,ontology.expressions.role.call(null,iri)));
}));

(ontology.expressions.Self.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return ontology.expressions._class.call(null,ontology.expressions._Self.call(null,ontology.expressions.role.call(null,prefix,iri,namespace)));
}));

(ontology.expressions.Self.cljs$lang$maxFixedArity = 3);

/**
 * ObjectMinCardinality := 'ObjectMinCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'
 */
ontology.expressions.__GT__EQ_exists = (function ontology$expressions$__GT__EQ_exists(var_args){
var G__723 = arguments.length;
switch (G__723) {
case 2:
return ontology.expressions.__GT__EQ_exists.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions.__GT__EQ_exists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions.__GT__EQ_exists.cljs$core$IFn$_invoke$arity$2 = (function (nat,role){
if(((0) <= nat)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"nat","nat",797154347),nat,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,">=exists",">=exists",462675386),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,">=exists",">=exists",462675386)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notRole","ontology.expressions/notRole",1294145566),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notNaturalNumber","ontology.expressions/notNaturalNumber",1968346575),new cljs.core.Keyword(null,"nat","nat",797154347),nat], null))));
}
}));

(ontology.expressions.__GT__EQ_exists.cljs$core$IFn$_invoke$arity$3 = (function (nat,role,class$){
if(((0) <= nat)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"nat","nat",797154347),nat,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,">=exists",">=exists",462675386),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,">=exists",">=exists",462675386)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notClass","ontology.expressions/notClass",2121792494),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notRole","ontology.expressions/notRole",1294145566),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notNaturalNumber","ontology.expressions/notNaturalNumber",1968346575),new cljs.core.Keyword(null,"nat","nat",797154347),nat], null))));
}
}));

(ontology.expressions.__GT__EQ_exists.cljs$lang$maxFixedArity = 3);

ontology.expressions._GT__EQ_exists = (function ontology$expressions$_GT__EQ_exists(var_args){
var G__726 = arguments.length;
switch (G__726) {
case 2:
return ontology.expressions._GT__EQ_exists.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions._GT__EQ_exists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions._GT__EQ_exists.cljs$core$IFn$_invoke$arity$2 = (function (nat,r){
return ontology.expressions._class.call(null,ontology.expressions.__GT__EQ_exists.call(null,nat,ontology.expressions.role.call(null,r)));
}));

(ontology.expressions._GT__EQ_exists.cljs$core$IFn$_invoke$arity$3 = (function (nat,r,c){
return ontology.expressions._class.call(null,ontology.expressions.__GT__EQ_exists.call(null,nat,ontology.expressions.role.call(null,r),ontology.expressions.class$.call(null,c)));
}));

(ontology.expressions._GT__EQ_exists.cljs$lang$maxFixedArity = 3);

/**
 * ObjectMaxCardinality := 'ObjectMaxCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'
 */
ontology.expressions.__LT__EQ_exists = (function ontology$expressions$__LT__EQ_exists(var_args){
var G__729 = arguments.length;
switch (G__729) {
case 2:
return ontology.expressions.__LT__EQ_exists.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions.__LT__EQ_exists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions.__LT__EQ_exists.cljs$core$IFn$_invoke$arity$2 = (function (nat,role){
if(((0) <= nat)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"nat","nat",797154347),nat,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"<=exists","<=exists",-218313476),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"<=exists","<=exists",-218313476)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notRole","ontology.expressions/notRole",1294145566),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notNaturalNumber","ontology.expressions/notNaturalNumber",1968346575),new cljs.core.Keyword(null,"nat","nat",797154347),nat], null))));
}
}));

(ontology.expressions.__LT__EQ_exists.cljs$core$IFn$_invoke$arity$3 = (function (nat,role,class$){
if(((0) <= nat)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"nat","nat",797154347),nat,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"<=exists","<=exists",-218313476),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"<=exists","<=exists",-218313476)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notClass","ontology.expressions/notClass",2121792494),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notRole","ontology.expressions/notRole",1294145566),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notNaturalNumber","ontology.expressions/notNaturalNumber",1968346575),new cljs.core.Keyword(null,"nat","nat",797154347),nat], null))));
}
}));

(ontology.expressions.__LT__EQ_exists.cljs$lang$maxFixedArity = 3);

ontology.expressions._LT__EQ_exists = (function ontology$expressions$_LT__EQ_exists(var_args){
var G__732 = arguments.length;
switch (G__732) {
case 2:
return ontology.expressions._LT__EQ_exists.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions._LT__EQ_exists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions._LT__EQ_exists.cljs$core$IFn$_invoke$arity$2 = (function (nat,r){
return ontology.expressions._class.call(null,ontology.expressions.__LT__EQ_exists.call(null,nat,ontology.expressions.role.call(null,r)));
}));

(ontology.expressions._LT__EQ_exists.cljs$core$IFn$_invoke$arity$3 = (function (nat,r,c){
return ontology.expressions._class.call(null,ontology.expressions.__LT__EQ_exists.call(null,nat,ontology.expressions.role.call(null,r),ontology.expressions.class$.call(null,c)));
}));

(ontology.expressions._LT__EQ_exists.cljs$lang$maxFixedArity = 3);

/**
 * ObjectExactCardinality := 'ObjectExactCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'
 */
ontology.expressions.__EQ_exists = (function ontology$expressions$__EQ_exists(var_args){
var G__735 = arguments.length;
switch (G__735) {
case 2:
return ontology.expressions.__EQ_exists.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions.__EQ_exists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions.__EQ_exists.cljs$core$IFn$_invoke$arity$2 = (function (nat,role){
if(((0) <= nat)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"nat","nat",797154347),nat,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=exists","=exists",1567269302),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=exists","=exists",1567269302)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notRole","ontology.expressions/notRole",1294145566),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notNaturalNumber","ontology.expressions/notNaturalNumber",1968346575),new cljs.core.Keyword(null,"nat","nat",797154347),nat], null))));
}
}));

(ontology.expressions.__EQ_exists.cljs$core$IFn$_invoke$arity$3 = (function (nat,role,class$){
if(((0) <= nat)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"nat","nat",797154347),nat,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=exists","=exists",1567269302),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=exists","=exists",1567269302)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notClass","ontology.expressions/notClass",2121792494),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notRole","ontology.expressions/notRole",1294145566),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notNaturalNumber","ontology.expressions/notNaturalNumber",1968346575),new cljs.core.Keyword(null,"nat","nat",797154347),nat], null))));
}
}));

(ontology.expressions.__EQ_exists.cljs$lang$maxFixedArity = 3);

ontology.expressions._EQ_exists = (function ontology$expressions$_EQ_exists(var_args){
var G__738 = arguments.length;
switch (G__738) {
case 2:
return ontology.expressions._EQ_exists.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions._EQ_exists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions._EQ_exists.cljs$core$IFn$_invoke$arity$2 = (function (nat,r){
return ontology.expressions._class.call(null,ontology.expressions.__EQ_exists.call(null,nat,ontology.expressions.role.call(null,r)));
}));

(ontology.expressions._EQ_exists.cljs$core$IFn$_invoke$arity$3 = (function (nat,r,c){
return ontology.expressions._class.call(null,ontology.expressions.__EQ_exists.call(null,nat,ontology.expressions.role.call(null,r),ontology.expressions.class$.call(null,c)));
}));

(ontology.expressions._EQ_exists.cljs$lang$maxFixedArity = 3);

/**
 * DataSomeValuesFrom := 'DataSomeValuesFrom' '(' DataPropertyExpression { DataPropertyExpression } DataRange ')'
 */
ontology.expressions._dataExists = (function ontology$expressions$_dataExists(dataRoles,dataRange){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746));
}),dataRoles)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRange),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(dataRange),cljs.core.count.call(null,dataRoles))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange,new cljs.core.Keyword(null,"arity","arity",-1808556135),new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(dataRange),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataExists","dataExists",509482988),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataExists","dataExists",509482988)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","incorrectArity","ontology.expressions/incorrectArity",616700756),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRange","ontology.expressions/notDataRange",-1849971660),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRoles","ontology.expressions/notDataRoles",47467514),new cljs.core.Keyword(null,"role","role",-736691072),ontology.expressions.role], null))));
}
});
ontology.expressions.dataExists = (function ontology$expressions$dataExists(dataRoles,dataRange){
return ontology.expressions._class.call(null,ontology.expressions._dataExists.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,((cljs.core.map_QMARK_.call(null,dataRoles))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ontology.expressions.dataRole.call(null,dataRoles)], null):cljs.core.map.call(null,ontology.expressions.dataRole,dataRoles))),ontology.components.dataRange.call(null,dataRange)));
});
/**
 * DataAllValuesFrom := 'DataAllValuesFrom' '(' DataPropertyExpression { DataPropertyExpression } DataRange ')'
 */
ontology.expressions._dataAll = (function ontology$expressions$_dataAll(dataRoles,dataRange){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746));
}),dataRoles)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRange),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(dataRange),cljs.core.count.call(null,dataRoles))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dataRoles","dataRoles",607251019),dataRoles,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange,new cljs.core.Keyword(null,"arity","arity",-1808556135),new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(dataRange),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataAll","dataAll",-520992053),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataAll","dataAll",-520992053)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","incorrectArity","ontology.expressions/incorrectArity",616700756),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRange","ontology.expressions/notDataRange",-1849971660),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRoles","ontology.expressions/notDataRoles",47467514),new cljs.core.Keyword(null,"role","role",-736691072),ontology.expressions.role], null))));
}
});
ontology.expressions.dataAll = (function ontology$expressions$dataAll(dataRoles,dataRange){
return ontology.expressions._class.call(null,ontology.expressions._dataAll.call(null,((cljs.core.map_QMARK_.call(null,dataRoles))?cljs.core.PersistentHashSet.createAsIfByAssoc([ontology.expressions.dataRole.call(null,dataRoles)]):cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.expressions.dataRole,dataRoles))),ontology.components.dataRange.call(null,dataRange)));
});
/**
 * DataMinCardinality := 'DataMinCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'
 */
ontology.expressions.__GT__EQ_dataExists = (function ontology$expressions$__GT__EQ_dataExists(var_args){
var G__741 = arguments.length;
switch (G__741) {
case 2:
return ontology.expressions.__GT__EQ_dataExists.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions.__GT__EQ_dataExists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions.__GT__EQ_dataExists.cljs$core$IFn$_invoke$arity$2 = (function (nat,dataRole){
if(((0) <= nat)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"nat","nat",797154347),nat,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,">=dataExists",">=dataExists",-617023733),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,">=dataExists",">=dataExists",-617023733)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRole","ontology.expressions/notDataRole",-200714889),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notNaturalNumber","ontology.expressions/notNaturalNumber",1968346575),new cljs.core.Keyword(null,"nat","nat",797154347),nat], null))));
}
}));

(ontology.expressions.__GT__EQ_dataExists.cljs$core$IFn$_invoke$arity$3 = (function (nat,dataRole,dataRange){
if(((0) <= nat)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRange),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange,new cljs.core.Keyword(null,"nat","nat",797154347),nat,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,">=dataExists",">=dataExists",-617023733),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,">=dataExists",">=dataExists",-617023733)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRange","ontology.expressions/notDataRange",-1849971660),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRole","ontology.expressions/notDataRole",-200714889),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notNaturalNumber","ontology.expressions/notNaturalNumber",1968346575),new cljs.core.Keyword(null,"nat","nat",797154347),nat], null))));
}
}));

(ontology.expressions.__GT__EQ_dataExists.cljs$lang$maxFixedArity = 3);

ontology.expressions._GT__EQ_dataExists = (function ontology$expressions$_GT__EQ_dataExists(var_args){
var G__744 = arguments.length;
switch (G__744) {
case 2:
return ontology.expressions._GT__EQ_dataExists.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions._GT__EQ_dataExists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions._GT__EQ_dataExists.cljs$core$IFn$_invoke$arity$2 = (function (nat,dr){
return ontology.expressions._class.call(null,ontology.expressions.__GT__EQ_dataExists.call(null,nat,ontology.expressions.dataRole.call(null,dr)));
}));

(ontology.expressions._GT__EQ_dataExists.cljs$core$IFn$_invoke$arity$3 = (function (nat,dr,dataRange){
return ontology.expressions._class.call(null,ontology.expressions.__GT__EQ_dataExists.call(null,nat,ontology.expressions.dataRole.call(null,dr),ontology.components.dataRange.call(null,dataRange)));
}));

(ontology.expressions._GT__EQ_dataExists.cljs$lang$maxFixedArity = 3);

/**
 * DataMaxCardinality := 'DataMaxCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'
 */
ontology.expressions.__LT__EQ_dataExists = (function ontology$expressions$__LT__EQ_dataExists(var_args){
var G__747 = arguments.length;
switch (G__747) {
case 2:
return ontology.expressions.__LT__EQ_dataExists.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions.__LT__EQ_dataExists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions.__LT__EQ_dataExists.cljs$core$IFn$_invoke$arity$2 = (function (nat,dataRole){
if(((0) <= nat)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"nat","nat",797154347),nat,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"<=dataExists","<=dataExists",-757322728),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"<=dataExists","<=dataExists",-757322728)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRole","ontology.expressions/notDataRole",-200714889),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notNaturalNumber","ontology.expressions/notNaturalNumber",1968346575),new cljs.core.Keyword(null,"nat","nat",797154347),nat], null))));
}
}));

(ontology.expressions.__LT__EQ_dataExists.cljs$core$IFn$_invoke$arity$3 = (function (nat,dataRole,dataRange){
if(((0) <= nat)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRange),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange,new cljs.core.Keyword(null,"nat","nat",797154347),nat,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"<=dataExists","<=dataExists",-757322728),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"<=dataExists","<=dataExists",-757322728)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRange","ontology.expressions/notDataRange",-1849971660),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRole","ontology.expressions/notDataRole",-200714889),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notNaturalNumber","ontology.expressions/notNaturalNumber",1968346575),new cljs.core.Keyword(null,"nat","nat",797154347),nat], null))));
}
}));

(ontology.expressions.__LT__EQ_dataExists.cljs$lang$maxFixedArity = 3);

ontology.expressions._LT__EQ_dataExists = (function ontology$expressions$_LT__EQ_dataExists(var_args){
var G__750 = arguments.length;
switch (G__750) {
case 2:
return ontology.expressions._LT__EQ_dataExists.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions._LT__EQ_dataExists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions._LT__EQ_dataExists.cljs$core$IFn$_invoke$arity$2 = (function (nat,dr){
return ontology.expressions._class.call(null,ontology.expressions.__LT__EQ_dataExists.call(null,nat,ontology.expressions.dataRole.call(null,dr)));
}));

(ontology.expressions._LT__EQ_dataExists.cljs$core$IFn$_invoke$arity$3 = (function (nat,dr,dataRange){
return ontology.expressions._class.call(null,ontology.expressions.__LT__EQ_dataExists.call(null,nat,ontology.expressions.dataRole.call(null,dr),ontology.components.dataRange.call(null,dataRange)));
}));

(ontology.expressions._LT__EQ_dataExists.cljs$lang$maxFixedArity = 3);

/**
 * DataExactCardinality := 'DataExactCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'
 */
ontology.expressions.__EQ_dataExists = (function ontology$expressions$__EQ_dataExists(var_args){
var G__753 = arguments.length;
switch (G__753) {
case 2:
return ontology.expressions.__EQ_dataExists.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions.__EQ_dataExists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions.__EQ_dataExists.cljs$core$IFn$_invoke$arity$2 = (function (nat,dataRole){
if(((0) <= nat)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"nat","nat",797154347),nat,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=dataExists","=dataExists",1899851649),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=dataExists","=dataExists",1899851649)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRole","ontology.expressions/notDataRole",-200714889),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notNaturalNumber","ontology.expressions/notNaturalNumber",1968346575),new cljs.core.Keyword(null,"nat","nat",797154347),nat], null))));
}
}));

(ontology.expressions.__EQ_dataExists.cljs$core$IFn$_invoke$arity$3 = (function (nat,dataRole,dataRange){
if(((0) <= nat)){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRange),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange,new cljs.core.Keyword(null,"nat","nat",797154347),nat,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=dataExists","=dataExists",1899851649),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=dataExists","=dataExists",1899851649)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRange","ontology.expressions/notDataRange",-1849971660),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRole","ontology.expressions/notDataRole",-200714889),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notNaturalNumber","ontology.expressions/notNaturalNumber",1968346575),new cljs.core.Keyword(null,"nat","nat",797154347),nat], null))));
}
}));

(ontology.expressions.__EQ_dataExists.cljs$lang$maxFixedArity = 3);

ontology.expressions._EQ_dataExists = (function ontology$expressions$_EQ_dataExists(var_args){
var G__756 = arguments.length;
switch (G__756) {
case 2:
return ontology.expressions._EQ_dataExists.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.expressions._EQ_dataExists.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.expressions._EQ_dataExists.cljs$core$IFn$_invoke$arity$2 = (function (nat,dr){
return ontology.expressions._class.call(null,ontology.expressions.__EQ_dataExists.call(null,nat,ontology.expressions.dataRole.call(null,dr)));
}));

(ontology.expressions._EQ_dataExists.cljs$core$IFn$_invoke$arity$3 = (function (nat,dr,dataRange){
return ontology.expressions._class.call(null,ontology.expressions.__EQ_dataExists.call(null,nat,ontology.expressions.dataRole.call(null,dr),ontology.components.dataRange.call(null,dataRange)));
}));

(ontology.expressions._EQ_dataExists.cljs$lang$maxFixedArity = 3);

/**
 * DataHasValue := 'DataHasValue' '(' DataPropertyExpression Literal ')'
 */
ontology.expressions._partialDataRole = (function ontology$expressions$_partialDataRole(dataRole,literal){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(literal),new cljs.core.Keyword(null,"literal","literal",1664775605))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"literal","literal",1664775605),literal,new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"partialDataRole","partialDataRole",-1749002111),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"partialDataRole","partialDataRole",-1749002111)], null);
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notLiteral","ontology.expressions/notLiteral",-535399921),new cljs.core.Keyword(null,"literal","literal",1664775605),literal], null))));
}
} else {
throw (new ontology.expressions.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.expressions","notDataRole","ontology.expressions/notDataRole",-200714889),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
});
ontology.expressions.partialDataRole = (function ontology$expressions$partialDataRole(dr,literal){
return ontology.expressions._class.call(null,ontology.expressions._partialDataRole.call(null,ontology.expressions.dataRole.call(null,dr),literal));
});

//# sourceMappingURL=expressions.js.map
