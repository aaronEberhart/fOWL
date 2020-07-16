// Compiled by ClojureScript 1.10.758 {}
goog.provide('ontology.normalize');
goog.require('cljs.core');
goog.require('ontology.axioms');
goog.require('ontology.expressions');
goog.require('ontology.components');
goog.require('util.msc');
goog.require('clojure.string');
ontology.normalize.one = cljs.core.constantly.call(null,(1));
ontology.normalize.zero = cljs.core.constantly.call(null,(0));
ontology.normalize._or = cljs.core.constantly.call(null,new cljs.core.Keyword(null,"or","or",235744169));
ontology.normalize._and = cljs.core.constantly.call(null,new cljs.core.Keyword(null,"and","and",-971899817));
ontology.normalize.all = cljs.core.constantly.call(null,new cljs.core.Keyword(null,"all","all",892129742));
ontology.normalize.exists = cljs.core.constantly.call(null,new cljs.core.Keyword(null,"exists","exists",1312597120));
ontology.normalize._LT__EQ_exists = cljs.core.constantly.call(null,new cljs.core.Keyword(null,"<=exists","<=exists",-218313476));
ontology.normalize._GT__EQ_exists = cljs.core.constantly.call(null,new cljs.core.Keyword(null,">=exists",">=exists",462675386));
ontology.normalize.dataAll = cljs.core.constantly.call(null,new cljs.core.Keyword(null,"dataAll","dataAll",-520992053));
ontology.normalize.dataExists = cljs.core.constantly.call(null,new cljs.core.Keyword(null,"dataExists","dataExists",509482988));
ontology.normalize._LT__EQ_dataExists = cljs.core.constantly.call(null,new cljs.core.Keyword(null,"<=dataExists","<=dataExists",-757322728));
ontology.normalize._GT__EQ_dataExists = cljs.core.constantly.call(null,new cljs.core.Keyword(null,">=dataExists",">=dataExists",-617023733));
ontology.normalize.atomics = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, [new cljs.core.Keyword(null,"partialDataRole","partialDataRole",-1749002111),null,new cljs.core.Keyword(null,"nominal","nominal",413899877),null,new cljs.core.Keyword(null,"dataAll","dataAll",-520992053),null,new cljs.core.Keyword(null,">=dataExists",">=dataExists",-617023733),null,new cljs.core.Keyword(null,"dataExists","dataExists",509482988),null,new cljs.core.Keyword(null,"Self","Self",-346647794),null,new cljs.core.Keyword(null,"className","className",-1983287057),null,new cljs.core.Keyword(null,"<=dataExists","<=dataExists",-757322728),null,new cljs.core.Keyword(null,"partialRole","partialRole",-52592584),null], null), null);
/**
 * same as not, but doesn't make double negations
 */
ontology.normalize.negate = (function ontology$normalize$negate(c){
var G__964 = new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(c);
var G__964__$1 = (((G__964 instanceof cljs.core.Keyword))?G__964.fqn:null);
switch (G__964__$1) {
case "not":
return new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(c);

break;
case "className":
var G__965 = new cljs.core.Keyword(null,"short","short",1928760516).cljs$core$IFn$_invoke$arity$1(c);
switch (G__965) {
case "Thing":
return ontology.components.Bot;

break;
case "Nothing":
return ontology.components.Top;

break;
case "topObjectProperty":
return ontology.components.TopRole;

break;
case "bottomObjectProperty":
return ontology.components.BotRole;

break;
default:
return ontology.expressions.not.call(null,c);

}

break;
default:
return ontology.expressions.not.call(null,c);

}
});
ontology.normalize.notFun = (function ontology$normalize$notFun(fun){
return cljs.core.comp.call(null,fun,ontology.normalize.negate);
});
ontology.normalize.constantlyMapToClassSet = (function ontology$normalize$constantlyMapToClassSet(fun,classes){
return cljs.core.constantly.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,fun,classes)));
});
ontology.normalize.checkInnerClass = (function ontology$normalize$checkInnerClass(class$,fun){
if(cljs.core.contains_QMARK_.call(null,ontology.normalize.atomics,new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)))){
return class$;
} else {
return cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"class","class",-2030961996),fun);
}
});
ontology.normalize.deMorgan = (function ontology$normalize$deMorgan(class$,fun){
var G__968 = new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$));
var G__968__$1 = (((G__968 instanceof cljs.core.Keyword))?G__968.fqn:null);
switch (G__968__$1) {
case "className":
return class$;

break;
case "Self":
return class$;

break;
case "nominal":
return class$;

break;
case "partialRole":
return class$;

break;
case "partialDataRole":
return class$;

break;
case "and":
return cljs.core.update.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"classes","classes",2037804510),ontology.normalize.constantlyMapToClassSet.call(null,ontology.normalize.notFun.call(null,fun),new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)))),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._or);

break;
case "or":
return cljs.core.update.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"classes","classes",2037804510),ontology.normalize.constantlyMapToClassSet.call(null,ontology.normalize.notFun.call(null,fun),new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)))),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._and);

break;
case "exists":
return cljs.core.update.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996),ontology.normalize.notFun.call(null,fun)),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize.all);

break;
case "all":
return cljs.core.update.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996),ontology.normalize.notFun.call(null,fun)),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize.exists);

break;
case "<=exists":
return cljs.core.update.call(null,cljs.core.update.call(null,(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)))?ontology.normalize.checkInnerClass.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),fun):new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)),new cljs.core.Keyword(null,"nat","nat",797154347),cljs.core.inc),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._GT__EQ_exists);

break;
case "dataExists":
return cljs.core.update.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),ontology.components.dataNot),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize.dataAll);

break;
case "dataAll":
return cljs.core.update.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),ontology.components.dataNot),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize.dataExists);

break;
case "<=dataExists":
return cljs.core.update.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"nat","nat",797154347),cljs.core.inc),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._GT__EQ_dataExists);

break;
case "=dataExists":
if((new cljs.core.Keyword(null,"nat","nat",797154347).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)) > (0))){
return ontology.expressions.or.call(null,cljs.core.update.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"nat","nat",797154347),cljs.core.inc),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._GT__EQ_dataExists),cljs.core.update.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"nat","nat",797154347),cljs.core.dec),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._LT__EQ_dataExists));
} else {
return cljs.core.update.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"nat","nat",797154347),ontology.normalize.one),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._GT__EQ_dataExists);
}

break;
case ">=dataExists":
if((new cljs.core.Keyword(null,"nat","nat",797154347).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)) > (0))){
return cljs.core.update.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"nat","nat",797154347),cljs.core.dec),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._LT__EQ_dataExists);
} else {
return ontology.expressions.and.call(null,cljs.core.update.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"nat","nat",797154347),ontology.normalize.zero),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._LT__EQ_dataExists),cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"nat","nat",797154347),ontology.normalize.one));
}

break;
case ">=exists":
var class$__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)))?ontology.normalize.checkInnerClass.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),fun):new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$));
if((new cljs.core.Keyword(null,"nat","nat",797154347).cljs$core$IFn$_invoke$arity$1(class$__$1) > (0))){
return cljs.core.update.call(null,cljs.core.update.call(null,class$__$1,new cljs.core.Keyword(null,"nat","nat",797154347),cljs.core.dec),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._LT__EQ_exists);
} else {
return ontology.expressions.and.call(null,cljs.core.update.call(null,cljs.core.update.call(null,class$__$1,new cljs.core.Keyword(null,"nat","nat",797154347),ontology.normalize.zero),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._LT__EQ_exists),cljs.core.update.call(null,class$__$1,new cljs.core.Keyword(null,"nat","nat",797154347),ontology.normalize.one));
}

break;
case "=exists":
var class$__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)))?ontology.normalize.checkInnerClass.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),fun):new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$));
if((new cljs.core.Keyword(null,"nat","nat",797154347).cljs$core$IFn$_invoke$arity$1(class$__$1) > (0))){
ontology.expressions.or.call(null,cljs.core.update.call(null,cljs.core.update.call(null,class$__$1,new cljs.core.Keyword(null,"nat","nat",797154347),cljs.core.inc),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._GT__EQ_exists),cljs.core.update.call(null,cljs.core.update.call(null,class$__$1,new cljs.core.Keyword(null,"nat","nat",797154347),cljs.core.dec),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._LT__EQ_exists));
} else {
}

return cljs.core.update.call(null,cljs.core.update.call(null,class$__$1,new cljs.core.Keyword(null,"nat","nat",797154347),ontology.normalize.one),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._GT__EQ_exists);

break;
default:
throw (new ontology.normalize.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.normalize","notNormalizable","ontology.normalize/notNormalizable",-1211667875),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));

}
});
/**
 * Gets the NNF for a class
 */
ontology.normalize.getClassNNF = (function ontology$normalize$getClassNNF(class$){
var G__970 = new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(class$);
var G__970__$1 = (((G__970 instanceof cljs.core.Keyword))?G__970.fqn:null);
switch (G__970__$1) {
case "className":
return class$;

break;
case "Self":
return class$;

break;
case "nominal":
return class$;

break;
case "partialRole":
return class$;

break;
case "dataExists":
return class$;

break;
case "dataAll":
return class$;

break;
case ">=dataExists":
return class$;

break;
case "<=dataExists":
return class$;

break;
case "partialDataRole":
return class$;

break;
case "all":
if(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))){
return ontology.normalize.checkInnerClass.call(null,class$,ontology.normalize.getClassNNF);
} else {
return class$;
}

break;
case "exists":
if(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))){
return ontology.normalize.checkInnerClass.call(null,class$,ontology.normalize.getClassNNF);
} else {
return class$;
}

break;
case ">=exists":
if(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))){
return ontology.normalize.checkInnerClass.call(null,class$,ontology.normalize.getClassNNF);
} else {
return class$;
}

break;
case "<=exists":
if(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))){
return ontology.normalize.checkInnerClass.call(null,class$,ontology.normalize.getClassNNF);
} else {
return class$;
}

break;
case "or":
return cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"classes","classes",2037804510),ontology.normalize.constantlyMapToClassSet.call(null,ontology.normalize.getClassNNF,new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(class$)));

break;
case "and":
return cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"classes","classes",2037804510),ontology.normalize.constantlyMapToClassSet.call(null,ontology.normalize.getClassNNF,new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(class$)));

break;
case "=dataExists":
return ontology.expressions.and.call(null,cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._GT__EQ_dataExists),cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._LT__EQ_dataExists));

break;
case "=exists":
var class$__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))?cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"class","class",-2030961996),ontology.normalize.getClassNNF):class$);
return ontology.expressions.and.call(null,cljs.core.update.call(null,class$__$1,new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._GT__EQ_exists),cljs.core.update.call(null,class$__$1,new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._LT__EQ_exists));

break;
case "not":
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"not","not",-595976884),new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)))){
return ontology.normalize.getClassNNF.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)));
} else {
return ontology.normalize.deMorgan.call(null,class$,ontology.normalize.getClassNNF);
}

break;
default:
throw (new ontology.normalize.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.normalize","notNormalizable","ontology.normalize/notNormalizable",-1211667875),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));

}
});
ontology.normalize.classesPermutations = (function ontology$normalize$classesPermutations(classes){
return cljs.core.cons.call(null,cljs.core.cons.call(null,cljs.core.peek.call(null,classes),cljs.core.cons.call(null,cljs.core.first.call(null,classes),null)),(((cljs.core.count.call(null,classes) > (2)))?cljs.core.partition.call(null,(2),(1),classes):null));
});
ontology.normalize.disjToImp = (function ontology$normalize$disjToImp(var_args){
var G__973 = arguments.length;
switch (G__973) {
case 1:
return ontology.normalize.disjToImp.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.normalize.disjToImp.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.normalize.disjToImp.cljs$core$IFn$_invoke$arity$1 = (function (classes){
return cljs.core.reduce.call(null,ontology.normalize.disjToImp,cljs.core.PersistentHashSet.EMPTY,classes);
}));

(ontology.normalize.disjToImp.cljs$core$IFn$_invoke$arity$2 = (function (classes,pair){
return cljs.core.conj.call(null,classes,ontology.axioms.classImplication.call(null,cljs.core.first.call(null,pair),ontology.normalize.negate.call(null,cljs.core.first.call(null,cljs.core.rest.call(null,pair)))));
}));

(ontology.normalize.disjToImp.cljs$lang$maxFixedArity = 2);

ontology.normalize.equivToImp = (function ontology$normalize$equivToImp(var_args){
var G__976 = arguments.length;
switch (G__976) {
case 1:
return ontology.normalize.equivToImp.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.normalize.equivToImp.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.normalize.equivToImp.cljs$core$IFn$_invoke$arity$1 = (function (classes){
return cljs.core.reduce.call(null,ontology.normalize.equivToImp,cljs.core.PersistentHashSet.EMPTY,classes);
}));

(ontology.normalize.equivToImp.cljs$core$IFn$_invoke$arity$2 = (function (classes,pair){
return cljs.core.conj.call(null,classes,ontology.axioms.classImplication.call(null,cljs.core.first.call(null,pair),cljs.core.first.call(null,cljs.core.rest.call(null,pair))),ontology.axioms.classImplication.call(null,cljs.core.first.call(null,cljs.core.rest.call(null,pair)),cljs.core.first.call(null,pair)));
}));

(ontology.normalize.equivToImp.cljs$lang$maxFixedArity = 2);

ontology.normalize.disjOrToImp = (function ontology$normalize$disjOrToImp(var_args){
var G__979 = arguments.length;
switch (G__979) {
case 2:
return ontology.normalize.disjOrToImp.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.normalize.disjOrToImp.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.normalize.disjOrToImp.cljs$core$IFn$_invoke$arity$2 = (function (class$,classes){
return cljs.core.reduce.call(null,ontology.normalize.disjToImp,cljs.core.PersistentHashSet.EMPTY,classes);
}));

(ontology.normalize.disjOrToImp.cljs$core$IFn$_invoke$arity$3 = (function (classes,class1,class2){
throw (new ontology.normalize.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.normalize","notNormalizable","ontology.normalize/notNormalizable",-1211667875),new cljs.core.Keyword(null,"class","class",-2030961996),ontology.normalize.class$], null))));
}));

(ontology.normalize.disjOrToImp.cljs$lang$maxFixedArity = 3);

/**
 * Converts an axiom to an equivalent axiom or set of axioms that are class implications
 */
ontology.normalize.toClassImplications = (function ontology$normalize$toClassImplications(axiom){
var G__981 = new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(axiom);
var G__981__$1 = (((G__981 instanceof cljs.core.Keyword))?G__981.fqn:null);
switch (G__981__$1) {
case "classImplication":
return axiom;

break;
case "disjClasses":
return ontology.normalize.disjToImp.call(null,ontology.normalize.classesPermutations.call(null,cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(axiom))));

break;
case "=Classes":
return ontology.normalize.equivToImp.call(null,ontology.normalize.classesPermutations.call(null,cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(axiom))));

break;
case "disjOr":
throw (new ontology.normalize.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.normalize","notNormalizableYet","ontology.normalize/notNormalizableYet",902597698),new cljs.core.Keyword(null,"axiom","axiom",-1683284564),axiom], null))));

break;
default:
throw (new ontology.normalize.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.normalize","incompatibleClassAxiom","ontology.normalize/incompatibleClassAxiom",825383616),new cljs.core.Keyword(null,"axiom","axiom",-1683284564),axiom], null))));

}
});
/**
 * Gets the NNF of a class axiom
 */
ontology.normalize.getClassAxiomNNF = (function ontology$normalize$getClassAxiomNNF(axiom){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(axiom),new cljs.core.Keyword(null,"classImplication","classImplication",964999104))){
return cljs.core.update.call(null,cljs.core.update.call(null,axiom,new cljs.core.Keyword(null,"consequentClass","consequentClass",1301299136),ontology.normalize.getClassNNF),new cljs.core.Keyword(null,"antecedentClass","antecedentClass",1658877533),ontology.normalize.getClassNNF);
} else {
return cljs.core.map.call(null,ontology.normalize.getClassAxiomNNF,ontology.normalize.toClassImplications.call(null,axiom));
}
});
/**
 * Gets the NNF of any axiom or class. (anything besides a class axiom returns itself)
 */
ontology.normalize.getNNF = (function ontology$normalize$getNNF(thing){
var G__983 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(thing);
var G__983__$1 = (((G__983 instanceof cljs.core.Keyword))?G__983.fqn:null);
switch (G__983__$1) {
case "axiom":
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"outerType","outerType",1894167495).cljs$core$IFn$_invoke$arity$1(thing),new cljs.core.Keyword(null,"classAxiom","classAxiom",2001762552))){
return ontology.normalize.getClassAxiomNNF.call(null,thing);
} else {
return thing;
}

break;
case "class":
return ontology.normalize.getClassNNF.call(null,thing);

break;
default:
return thing;

}
});
ontology.normalize.getClassDSNF = (function ontology$normalize$getClassDSNF(class$){
var G__985 = new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(class$);
var G__985__$1 = (((G__985 instanceof cljs.core.Keyword))?G__985.fqn:null);
switch (G__985__$1) {
case "className":
return class$;

break;
case "Self":
return class$;

break;
case "top":
return class$;

break;
case "bot":
return class$;

break;
case "nominal":
return class$;

break;
case "partialRole":
return class$;

break;
case "dataExists":
return class$;

break;
case "dataAll":
return class$;

break;
case ">=dataExists":
return class$;

break;
case "<=dataExists":
return class$;

break;
case "partialDataRole":
return class$;

break;
case "all":
if(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))){
return ontology.normalize.checkInnerClass.call(null,class$,ontology.normalize.getClassDSNF);
} else {
return class$;
}

break;
case "exists":
if(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))){
return ontology.normalize.checkInnerClass.call(null,class$,ontology.normalize.getClassDSNF);
} else {
return class$;
}

break;
case ">=exists":
if(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))){
return ontology.normalize.checkInnerClass.call(null,class$,ontology.normalize.getClassDSNF);
} else {
return class$;
}

break;
case "<=exists":
if(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))){
return ontology.normalize.checkInnerClass.call(null,class$,ontology.normalize.getClassDSNF);
} else {
return class$;
}

break;
case "or":
return cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"classes","classes",2037804510),ontology.normalize.constantlyMapToClassSet.call(null,ontology.normalize.getClassDSNF,new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(class$)));

break;
case "and":
return ontology.normalize.negate.call(null,cljs.core.update.call(null,cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"classes","classes",2037804510),ontology.normalize.constantlyMapToClassSet.call(null,ontology.normalize.notFun.call(null,ontology.normalize.getClassDSNF),new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(class$))),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._or));

break;
case "=dataExists":
return ontology.normalize.negate.call(null,ontology.expressions.or.call(null,cljs.core.update.call(null,cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"nat","nat",797154347),(((new cljs.core.Keyword(null,"nat","nat",797154347).cljs$core$IFn$_invoke$arity$1(class$) > (0)))?cljs.core.inc:ontology.normalize.one)),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._GT__EQ_dataExists),cljs.core.update.call(null,cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"nat","nat",797154347),(((new cljs.core.Keyword(null,"nat","nat",797154347).cljs$core$IFn$_invoke$arity$1(class$) > (0)))?cljs.core.dec:ontology.normalize.zero)),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._LT__EQ_dataExists)));

break;
case "=exists":
var class$__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))?cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"class","class",-2030961996),ontology.normalize.getClassDSNF):class$);
return ontology.normalize.negate.call(null,ontology.expressions.or.call(null,cljs.core.update.call(null,cljs.core.update.call(null,class$__$1,new cljs.core.Keyword(null,"nat","nat",797154347),(((new cljs.core.Keyword(null,"nat","nat",797154347).cljs$core$IFn$_invoke$arity$1(class$__$1) > (0)))?cljs.core.inc:ontology.normalize.one)),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._GT__EQ_exists),cljs.core.update.call(null,cljs.core.update.call(null,class$__$1,new cljs.core.Keyword(null,"nat","nat",797154347),(((new cljs.core.Keyword(null,"nat","nat",797154347).cljs$core$IFn$_invoke$arity$1(class$__$1) > (0)))?cljs.core.dec:ontology.normalize.zero)),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._LT__EQ_exists)));

break;
case "not":
var G__986 = new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$));
var G__986__$1 = (((G__986 instanceof cljs.core.Keyword))?G__986.fqn:null);
switch (G__986__$1) {
case "not":
return ontology.normalize.getClassDSNF.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)));

break;
case "or":
return cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"class","class",-2030961996),cljs.core.constantly.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"classes","classes",2037804510),ontology.normalize.constantlyMapToClassSet.call(null,ontology.normalize.getClassDSNF,new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))))));

break;
case "=exists":
var class$__$1 = ontology.normalize.negate.call(null,cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"class","class",-2030961996),ontology.normalize.getClassDSNF));
var _ = cljs.core.prn.call(null,"D",class$__$1);
return class$__$1;

break;
case "=dataExists":
return cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"class","class",-2030961996),ontology.normalize.getClassDSNF);

break;
default:
return ontology.normalize.deMorgan.call(null,class$,ontology.normalize.getClassDSNF);

}

break;
default:
throw (new ontology.normalize.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.normalize","notNormalizable","ontology.normalize/notNormalizable",-1211667875),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));

}
});
ontology.normalize.getClassAxiomDSNF = (function ontology$normalize$getClassAxiomDSNF(axiom){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(axiom),new cljs.core.Keyword(null,"classImplication","classImplication",964999104))){
return ontology.expressions.or.call(null,ontology.normalize.getClassDSNF.call(null,ontology.normalize.negate.call(null,new cljs.core.Keyword(null,"antecedentClass","antecedentClass",1658877533).cljs$core$IFn$_invoke$arity$1(axiom))),ontology.normalize.getClassDSNF.call(null,new cljs.core.Keyword(null,"consequentClass","consequentClass",1301299136).cljs$core$IFn$_invoke$arity$1(axiom)));
} else {
return cljs.core.map.call(null,ontology.normalize.getClassAxiomDSNF,ontology.normalize.toClassImplications.call(null,axiom));
}
});
/**
 * Gets the Disjunctive Syntactic Normal Form for an axiom or class. Unfinished
 */
ontology.normalize.getDSNF = (function ontology$normalize$getDSNF(thing){
var G__989 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(thing);
var G__989__$1 = (((G__989 instanceof cljs.core.Keyword))?G__989.fqn:null);
switch (G__989__$1) {
case "axiom":
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"outerType","outerType",1894167495).cljs$core$IFn$_invoke$arity$1(thing),new cljs.core.Keyword(null,"classAxiom","classAxiom",2001762552))){
return ontology.normalize.getClassAxiomDSNF.call(null,thing);
} else {
return thing;
}

break;
case "class":
return ontology.normalize.getClassDSNF.call(null,thing);

break;
default:
return thing;

}
});
ontology.normalize.getClassCSNF = (function ontology$normalize$getClassCSNF(class$){
var G__991 = new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(class$);
var G__991__$1 = (((G__991 instanceof cljs.core.Keyword))?G__991.fqn:null);
switch (G__991__$1) {
case "className":
return class$;

break;
case "Self":
return class$;

break;
case "nominal":
return class$;

break;
case "partialRole":
return class$;

break;
case "dataExists":
return class$;

break;
case "dataAll":
return class$;

break;
case ">=dataExists":
return class$;

break;
case "<=dataExists":
return class$;

break;
case "partialDataRole":
return class$;

break;
case "all":
if(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))){
return ontology.normalize.checkInnerClass.call(null,class$,ontology.normalize.getClassCSNF);
} else {
return class$;
}

break;
case "exists":
if(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))){
return ontology.normalize.checkInnerClass.call(null,class$,ontology.normalize.getClassCSNF);
} else {
return class$;
}

break;
case ">=exists":
if(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))){
return ontology.normalize.checkInnerClass.call(null,class$,ontology.normalize.getClassCSNF);
} else {
return class$;
}

break;
case "<=exists":
if(cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))){
return ontology.normalize.checkInnerClass.call(null,class$,ontology.normalize.getClassCSNF);
} else {
return class$;
}

break;
case "or":
return ontology.normalize.negate.call(null,cljs.core.update.call(null,cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"classes","classes",2037804510),ontology.normalize.constantlyMapToClassSet.call(null,ontology.normalize.notFun.call(null,ontology.normalize.getClassCSNF),new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(class$))),new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._and));

break;
case "and":
return cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"classes","classes",2037804510),ontology.normalize.constantlyMapToClassSet.call(null,ontology.normalize.getClassCSNF,new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(class$)));

break;
case "=dataExists":
return ontology.expressions.and.call(null,cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._GT__EQ_dataExists),cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._LT__EQ_dataExists));

break;
case "=exists":
var class$__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))?cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"class","class",-2030961996),ontology.normalize.getClassCSNF):class$);
return ontology.expressions.and.call(null,cljs.core.update.call(null,class$__$1,new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._GT__EQ_exists),cljs.core.update.call(null,class$__$1,new cljs.core.Keyword(null,"innerType","innerType",-115667780),ontology.normalize._LT__EQ_exists));

break;
case "not":
var G__992 = new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$));
var G__992__$1 = (((G__992 instanceof cljs.core.Keyword))?G__992.fqn:null);
switch (G__992__$1) {
case "not":
return ontology.normalize.getClassCSNF.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$)));

break;
case "and":
return cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"class","class",-2030961996),cljs.core.constantly.call(null,cljs.core.update.call(null,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"classes","classes",2037804510),ontology.normalize.constantlyMapToClassSet.call(null,ontology.normalize.getClassCSNF,new cljs.core.Keyword(null,"classes","classes",2037804510).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(class$))))));

break;
case "=exists":
var class$__$1 = cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"class","class",-2030961996),ontology.normalize.getClassCSNF);
var _ = cljs.core.prn.call(null,"C",class$__$1);
return class$__$1;

break;
case "=dataExists":
return cljs.core.update.call(null,class$,new cljs.core.Keyword(null,"class","class",-2030961996),ontology.normalize.getClassCSNF);

break;
default:
return ontology.normalize.deMorgan.call(null,class$,ontology.normalize.getClassCSNF);

}

break;
default:
throw (new ontology.normalize.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.normalize","notNormalizable","ontology.normalize/notNormalizable",-1211667875),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));

}
});
ontology.normalize.getClassAxiomCSNF = (function ontology$normalize$getClassAxiomCSNF(axiom){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(axiom),new cljs.core.Keyword(null,"classImplication","classImplication",964999104))){
return ontology.normalize.negate.call(null,ontology.expressions.and.call(null,ontology.normalize.getClassCSNF.call(null,new cljs.core.Keyword(null,"antecedentClass","antecedentClass",1658877533).cljs$core$IFn$_invoke$arity$1(axiom)),ontology.normalize.getClassCSNF.call(null,ontology.normalize.negate.call(null,new cljs.core.Keyword(null,"consequentClass","consequentClass",1301299136).cljs$core$IFn$_invoke$arity$1(axiom)))));
} else {
return cljs.core.map.call(null,ontology.normalize.getClassAxiomCSNF,ontology.normalize.toClassImplications.call(null,axiom));
}
});
/**
 * Gets the Conjunctive Syntactic Normal Form for an axiom or class. Unfinished
 */
ontology.normalize.getCSNF = (function ontology$normalize$getCSNF(thing){
var G__995 = new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(thing);
var G__995__$1 = (((G__995 instanceof cljs.core.Keyword))?G__995.fqn:null);
switch (G__995__$1) {
case "axiom":
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"outerType","outerType",1894167495).cljs$core$IFn$_invoke$arity$1(thing),new cljs.core.Keyword(null,"classAxiom","classAxiom",2001762552))){
return ontology.normalize.getClassAxiomCSNF.call(null,thing);
} else {
return thing;
}

break;
case "class":
return ontology.normalize.getClassCSNF.call(null,thing);

break;
default:
return thing;

}
});

//# sourceMappingURL=normalize.js.map
