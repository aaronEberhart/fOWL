// Compiled by ClojureScript 1.10.758 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
goog.require('goog.string');
goog.require('goog.string.format');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__1499){
var map__1500 = p__1499;
var map__1500__$1 = (((((!((map__1500 == null))))?(((((map__1500.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1500.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1500):map__1500);
var m = map__1500__$1;
var n = cljs.core.get.call(null,map__1500__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__1500__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,(function (){var or__4126__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4126__auto__)){
return or__4126__auto__;
} else {
return [(function (){var temp__5735__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5735__auto__)){
var ns = temp__5735__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})());

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__1502_1534 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__1503_1535 = null;
var count__1504_1536 = (0);
var i__1505_1537 = (0);
while(true){
if((i__1505_1537 < count__1504_1536)){
var f_1538 = cljs.core._nth.call(null,chunk__1503_1535,i__1505_1537);
cljs.core.println.call(null,"  ",f_1538);


var G__1539 = seq__1502_1534;
var G__1540 = chunk__1503_1535;
var G__1541 = count__1504_1536;
var G__1542 = (i__1505_1537 + (1));
seq__1502_1534 = G__1539;
chunk__1503_1535 = G__1540;
count__1504_1536 = G__1541;
i__1505_1537 = G__1542;
continue;
} else {
var temp__5735__auto___1543 = cljs.core.seq.call(null,seq__1502_1534);
if(temp__5735__auto___1543){
var seq__1502_1544__$1 = temp__5735__auto___1543;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__1502_1544__$1)){
var c__4556__auto___1545 = cljs.core.chunk_first.call(null,seq__1502_1544__$1);
var G__1546 = cljs.core.chunk_rest.call(null,seq__1502_1544__$1);
var G__1547 = c__4556__auto___1545;
var G__1548 = cljs.core.count.call(null,c__4556__auto___1545);
var G__1549 = (0);
seq__1502_1534 = G__1546;
chunk__1503_1535 = G__1547;
count__1504_1536 = G__1548;
i__1505_1537 = G__1549;
continue;
} else {
var f_1550 = cljs.core.first.call(null,seq__1502_1544__$1);
cljs.core.println.call(null,"  ",f_1550);


var G__1551 = cljs.core.next.call(null,seq__1502_1544__$1);
var G__1552 = null;
var G__1553 = (0);
var G__1554 = (0);
seq__1502_1534 = G__1551;
chunk__1503_1535 = G__1552;
count__1504_1536 = G__1553;
i__1505_1537 = G__1554;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_1555 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__4126__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4126__auto__)){
return or__4126__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_1555);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_1555)))?cljs.core.second.call(null,arglists_1555):arglists_1555));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Spec");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__1506_1556 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__1507_1557 = null;
var count__1508_1558 = (0);
var i__1509_1559 = (0);
while(true){
if((i__1509_1559 < count__1508_1558)){
var vec__1520_1560 = cljs.core._nth.call(null,chunk__1507_1557,i__1509_1559);
var name_1561 = cljs.core.nth.call(null,vec__1520_1560,(0),null);
var map__1523_1562 = cljs.core.nth.call(null,vec__1520_1560,(1),null);
var map__1523_1563__$1 = (((((!((map__1523_1562 == null))))?(((((map__1523_1562.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1523_1562.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1523_1562):map__1523_1562);
var doc_1564 = cljs.core.get.call(null,map__1523_1563__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_1565 = cljs.core.get.call(null,map__1523_1563__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_1561);

cljs.core.println.call(null," ",arglists_1565);

if(cljs.core.truth_(doc_1564)){
cljs.core.println.call(null," ",doc_1564);
} else {
}


var G__1566 = seq__1506_1556;
var G__1567 = chunk__1507_1557;
var G__1568 = count__1508_1558;
var G__1569 = (i__1509_1559 + (1));
seq__1506_1556 = G__1566;
chunk__1507_1557 = G__1567;
count__1508_1558 = G__1568;
i__1509_1559 = G__1569;
continue;
} else {
var temp__5735__auto___1570 = cljs.core.seq.call(null,seq__1506_1556);
if(temp__5735__auto___1570){
var seq__1506_1571__$1 = temp__5735__auto___1570;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__1506_1571__$1)){
var c__4556__auto___1572 = cljs.core.chunk_first.call(null,seq__1506_1571__$1);
var G__1573 = cljs.core.chunk_rest.call(null,seq__1506_1571__$1);
var G__1574 = c__4556__auto___1572;
var G__1575 = cljs.core.count.call(null,c__4556__auto___1572);
var G__1576 = (0);
seq__1506_1556 = G__1573;
chunk__1507_1557 = G__1574;
count__1508_1558 = G__1575;
i__1509_1559 = G__1576;
continue;
} else {
var vec__1525_1577 = cljs.core.first.call(null,seq__1506_1571__$1);
var name_1578 = cljs.core.nth.call(null,vec__1525_1577,(0),null);
var map__1528_1579 = cljs.core.nth.call(null,vec__1525_1577,(1),null);
var map__1528_1580__$1 = (((((!((map__1528_1579 == null))))?(((((map__1528_1579.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1528_1579.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1528_1579):map__1528_1579);
var doc_1581 = cljs.core.get.call(null,map__1528_1580__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_1582 = cljs.core.get.call(null,map__1528_1580__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_1578);

cljs.core.println.call(null," ",arglists_1582);

if(cljs.core.truth_(doc_1581)){
cljs.core.println.call(null," ",doc_1581);
} else {
}


var G__1583 = cljs.core.next.call(null,seq__1506_1571__$1);
var G__1584 = null;
var G__1585 = (0);
var G__1586 = (0);
seq__1506_1556 = G__1583;
chunk__1507_1557 = G__1584;
count__1508_1558 = G__1585;
i__1509_1559 = G__1586;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5735__auto__ = cljs.spec.alpha.get_spec.call(null,cljs.core.symbol.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name.call(null,n)),cljs.core.name.call(null,nm)));
if(cljs.core.truth_(temp__5735__auto__)){
var fnspec = temp__5735__auto__;
cljs.core.print.call(null,"Spec");

var seq__1530 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__1531 = null;
var count__1532 = (0);
var i__1533 = (0);
while(true){
if((i__1533 < count__1532)){
var role = cljs.core._nth.call(null,chunk__1531,i__1533);
var temp__5735__auto___1587__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5735__auto___1587__$1)){
var spec_1588 = temp__5735__auto___1587__$1;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_1588));
} else {
}


var G__1589 = seq__1530;
var G__1590 = chunk__1531;
var G__1591 = count__1532;
var G__1592 = (i__1533 + (1));
seq__1530 = G__1589;
chunk__1531 = G__1590;
count__1532 = G__1591;
i__1533 = G__1592;
continue;
} else {
var temp__5735__auto____$1 = cljs.core.seq.call(null,seq__1530);
if(temp__5735__auto____$1){
var seq__1530__$1 = temp__5735__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__1530__$1)){
var c__4556__auto__ = cljs.core.chunk_first.call(null,seq__1530__$1);
var G__1593 = cljs.core.chunk_rest.call(null,seq__1530__$1);
var G__1594 = c__4556__auto__;
var G__1595 = cljs.core.count.call(null,c__4556__auto__);
var G__1596 = (0);
seq__1530 = G__1593;
chunk__1531 = G__1594;
count__1532 = G__1595;
i__1533 = G__1596;
continue;
} else {
var role = cljs.core.first.call(null,seq__1530__$1);
var temp__5735__auto___1597__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5735__auto___1597__$2)){
var spec_1598 = temp__5735__auto___1597__$2;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_1598));
} else {
}


var G__1599 = cljs.core.next.call(null,seq__1530__$1);
var G__1600 = null;
var G__1601 = (0);
var G__1602 = (0);
seq__1530 = G__1599;
chunk__1531 = G__1600;
count__1532 = G__1601;
i__1533 = G__1602;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol(null,"ExceptionInfo","ExceptionInfo",294935087,null):(((t instanceof Error))?cljs.core.symbol.call(null,"js",t.name):null
))], null),(function (){var temp__5735__auto__ = cljs.core.ex_message.call(null,t);
if(cljs.core.truth_(temp__5735__auto__)){
var msg = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = cljs.core.ex_data.call(null,t);
if(cljs.core.truth_(temp__5735__auto__)){
var ed = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})());
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__1603 = cljs.core.conj.call(null,via,t);
var G__1604 = cljs.core.ex_cause.call(null,t);
via = G__1603;
t = G__1604;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek.call(null,via);
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec.call(null,cljs.core.map.call(null,base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5735__auto__ = cljs.core.ex_message.call(null,root);
if(cljs.core.truth_(temp__5735__auto__)){
var root_msg = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = cljs.core.ex_data.call(null,root);
if(cljs.core.truth_(temp__5735__auto__)){
var data = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data.call(null,o));
if(cljs.core.truth_(temp__5735__auto__)){
var phase = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})());
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__1607 = datafied_throwable;
var map__1607__$1 = (((((!((map__1607 == null))))?(((((map__1607.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1607.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1607):map__1607);
var via = cljs.core.get.call(null,map__1607__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.call(null,map__1607__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.call(null,map__1607__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__1608 = cljs.core.last.call(null,via);
var map__1608__$1 = (((((!((map__1608 == null))))?(((((map__1608.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1608.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1608):map__1608);
var type = cljs.core.get.call(null,map__1608__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.call(null,map__1608__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.call(null,map__1608__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__1609 = data;
var map__1609__$1 = (((((!((map__1609 == null))))?(((((map__1609.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1609.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1609):map__1609);
var problems = cljs.core.get.call(null,map__1609__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.call(null,map__1609__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.call(null,map__1609__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__1610 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,via));
var map__1610__$1 = (((((!((map__1610 == null))))?(((((map__1610.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1610.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1610):map__1610);
var top_data = map__1610__$1;
var source = cljs.core.get.call(null,map__1610__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.call(null,(function (){var G__1615 = phase;
var G__1615__$1 = (((G__1615 instanceof cljs.core.Keyword))?G__1615.fqn:null);
switch (G__1615__$1) {
case "read-source":
var map__1616 = data;
var map__1616__$1 = (((((!((map__1616 == null))))?(((((map__1616.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1616.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1616):map__1616);
var line = cljs.core.get.call(null,map__1616__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__1616__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__1618 = cljs.core.merge.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,via)),top_data);
var G__1618__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__1618,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__1618);
var G__1618__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__1618__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__1618__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__1618__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__1618__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__1619 = top_data;
var G__1619__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__1619,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__1619);
var G__1619__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__1619__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__1619__$1);
var G__1619__$3 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__1619__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__1619__$2);
var G__1619__$4 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__1619__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__1619__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__1619__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__1619__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__1620 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__1620,(0),null);
var method = cljs.core.nth.call(null,vec__1620,(1),null);
var file = cljs.core.nth.call(null,vec__1620,(2),null);
var line = cljs.core.nth.call(null,vec__1620,(3),null);
var G__1623 = top_data;
var G__1623__$1 = (cljs.core.truth_(line)?cljs.core.assoc.call(null,G__1623,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__1623);
var G__1623__$2 = (cljs.core.truth_(file)?cljs.core.assoc.call(null,G__1623__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__1623__$1);
var G__1623__$3 = (cljs.core.truth_((function (){var and__4115__auto__ = source__$1;
if(cljs.core.truth_(and__4115__auto__)){
return method;
} else {
return and__4115__auto__;
}
})())?cljs.core.assoc.call(null,G__1623__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__1623__$2);
var G__1623__$4 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__1623__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__1623__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__1623__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__1623__$4;
}

break;
case "execution":
var vec__1624 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__1624,(0),null);
var method = cljs.core.nth.call(null,vec__1624,(1),null);
var file = cljs.core.nth.call(null,vec__1624,(2),null);
var line = cljs.core.nth.call(null,vec__1624,(3),null);
var file__$1 = cljs.core.first.call(null,cljs.core.remove.call(null,(function (p1__1606_SHARP_){
var or__4126__auto__ = (p1__1606_SHARP_ == null);
if(or__4126__auto__){
return or__4126__auto__;
} else {
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,p1__1606_SHARP_);
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__4126__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__4126__auto__)){
return or__4126__auto__;
} else {
return line;
}
})();
var G__1627 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__1627__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.call(null,G__1627,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__1627);
var G__1627__$2 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__1627__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__1627__$1);
var G__1627__$3 = (cljs.core.truth_((function (){var or__4126__auto__ = fn;
if(cljs.core.truth_(or__4126__auto__)){
return or__4126__auto__;
} else {
var and__4115__auto__ = source__$1;
if(cljs.core.truth_(and__4115__auto__)){
return method;
} else {
return and__4115__auto__;
}
}
})())?cljs.core.assoc.call(null,G__1627__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__4126__auto__ = fn;
if(cljs.core.truth_(or__4126__auto__)){
return or__4126__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__1627__$2);
var G__1627__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.call(null,G__1627__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__1627__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__1627__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__1627__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__1615__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__1631){
var map__1632 = p__1631;
var map__1632__$1 = (((((!((map__1632 == null))))?(((((map__1632.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__1632.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__1632):map__1632);
var triage_data = map__1632__$1;
var phase = cljs.core.get.call(null,map__1632__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.call(null,map__1632__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.call(null,map__1632__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__1632__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.call(null,map__1632__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.call(null,map__1632__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.call(null,map__1632__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.call(null,map__1632__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4126__auto__ = source;
if(cljs.core.truth_(or__4126__auto__)){
return or__4126__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4126__auto__ = line;
if(cljs.core.truth_(or__4126__auto__)){
return or__4126__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name.call(null,(function (){var or__4126__auto__ = class$;
if(cljs.core.truth_(or__4126__auto__)){
return or__4126__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__1634 = phase;
var G__1634__$1 = (((G__1634 instanceof cljs.core.Keyword))?G__1634.fqn:null);
switch (G__1634__$1) {
case "read-source":
return format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause);

break;
case "macro-syntax-check":
return format.call(null,"Syntax error macroexpanding %sat (%s).\n%s",(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,(cljs.core.truth_(spec)?(function (){var sb__4667__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__1635_1644 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__1636_1645 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__1637_1646 = true;
var _STAR_print_fn_STAR__temp_val__1638_1647 = (function (x__4668__auto__){
return sb__4667__auto__.append(x__4668__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__1637_1646);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__1638_1647);

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.call(null,(function (p1__1629_SHARP_){
return cljs.core.dissoc.call(null,p1__1629_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__1636_1645);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__1635_1644);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4667__auto__);
})():format.call(null,"%s\n",cause)));

break;
case "macroexpansion":
return format.call(null,"Unexpected error%s macroexpanding %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compile-syntax-check":
return format.call(null,"Syntax error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compilation":
return format.call(null,"Unexpected error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "read-eval-result":
return format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "print-eval-result":
return format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "execution":
if(cljs.core.truth_(spec)){
return format.call(null,"Execution error - invalid arguments to %s at (%s).\n%s",symbol,loc,(function (){var sb__4667__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__1639_1648 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__1640_1649 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__1641_1650 = true;
var _STAR_print_fn_STAR__temp_val__1642_1651 = (function (x__4668__auto__){
return sb__4667__auto__.append(x__4668__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__1641_1650);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__1642_1651);

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.call(null,(function (p1__1630_SHARP_){
return cljs.core.dissoc.call(null,p1__1630_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__1640_1649);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__1639_1648);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4667__auto__);
})());
} else {
return format.call(null,"Execution error%s at %s(%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__1634__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str.call(null,cljs.repl.ex_triage.call(null,cljs.repl.Error__GT_map.call(null,error)));
});

//# sourceMappingURL=repl.js.map
