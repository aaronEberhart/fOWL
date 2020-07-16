// Compiled by ClojureScript 1.10.758 {}
goog.provide('util.msc');
goog.require('cljs.core');
goog.require('clojure.string');
util.msc.file = "output.txt";
util.msc.strToFile = (function util$msc$strToFile(file,str){
return util.msc.spit.call(null,file,(function (){var sb__4667__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__528_532 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__529_533 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__530_534 = true;
var _STAR_print_fn_STAR__temp_val__531_535 = (function (x__4668__auto__){
return sb__4667__auto__.append(x__4668__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__530_534);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__531_535);

try{cljs.core.println.call(null,str);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__529_533);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__528_532);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4667__auto__);
})(),new cljs.core.Keyword(null,"append","append",-291298229),true);
});
util.msc.fib_seq_seq = (function util$msc$fib(a,b){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons.call(null,a,util$msc$fib.call(null,b,(a + b)));
}),null,null));
}).call(null,(0),(1));
/**
 * makes any valid coll into a lazy-seq,
 *  with an optional filter and map on elements.
 *  based on https://clojure.org/reference/lazy
 */
util.msc.lazer = (function util$msc$lazer(var_args){
var G__537 = arguments.length;
switch (G__537) {
case 1:
return util.msc.lazer.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return util.msc.lazer.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return util.msc.lazer.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(util.msc.lazer.cljs$core$IFn$_invoke$arity$1 = (function (coll){
return util.msc.lazer.call(null,coll,cljs.core.constantly.call(null,true),cljs.core.identity);
}));

(util.msc.lazer.cljs$core$IFn$_invoke$arity$2 = (function (coll,filteringPredicate){
return util.msc.lazer.call(null,coll,filteringPredicate,cljs.core.identity);
}));

(util.msc.lazer.cljs$core$IFn$_invoke$arity$3 = (function (coll,filteringPredicate,mapFunction){
return (new cljs.core.LazySeq(null,(function (){
return (function (coll__$1,filteringPredicateg,mapFunction__$1){
while(true){
var temp__5735__auto__ = cljs.core.seq.call(null,coll__$1);
if(temp__5735__auto__){
var coll__$2 = temp__5735__auto__;
if(cljs.core.truth_(filteringPredicate.call(null,cljs.core.first.call(null,coll__$2)))){
return cljs.core.cons.call(null,mapFunction__$1.call(null,cljs.core.first.call(null,coll__$2)),util.msc.lazer.call(null,cljs.core.rest.call(null,coll__$2),filteringPredicate));
} else {
var G__539 = cljs.core.rest.call(null,coll__$2);
var G__540 = filteringPredicate;
var G__541 = mapFunction__$1;
coll__$1 = G__539;
filteringPredicateg = G__540;
mapFunction__$1 = G__541;
continue;
}
} else {
return null;
}
break;
}
}).call(null,coll,filteringPredicate,mapFunction);
}),null,null));
}));

(util.msc.lazer.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=msc.js.map
