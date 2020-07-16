// Compiled by ClojureScript 1.10.758 {}
goog.provide('ontology.SWRL');
goog.require('cljs.core');
goog.require('ontology.expressions');
goog.require('ontology.components');
ontology.SWRL.atomTypes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"builtInAtom","builtInAtom",721871243),null,new cljs.core.Keyword(null,"roleAtom","roleAtom",-637210131),null,new cljs.core.Keyword(null,"=individualsAtom","=individualsAtom",254081870),null,new cljs.core.Keyword(null,"dataRangeAtom","dataRangeAtom",134939408),null,new cljs.core.Keyword(null,"dataRoleAtom","dataRoleAtom",-1090751118),null,new cljs.core.Keyword(null,"!=individualsAtom","!=individualsAtom",-1490921546),null,new cljs.core.Keyword(null,"classAtom","classAtom",644788249),null], null), null);
ontology.SWRL.body = (function ontology$SWRL$body(atoms){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"atom","atom",-397043653));
}),atoms)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"atoms","atoms",-392247738),atoms,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"body","body",-2049205669),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"body","body",-2049205669)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notAtoms","ontology.SWRL/notAtoms",-337373520),new cljs.core.Keyword(null,"atoms","atoms",-392247738),atoms], null))));
}
});
ontology.SWRL.head = (function ontology$SWRL$head(atoms){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"atom","atom",-397043653));
}),atoms)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"atoms","atoms",-392247738),atoms,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"head","head",-771383919),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"head","head",-771383919)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notAtoms","ontology.SWRL/notAtoms",-337373520),new cljs.core.Keyword(null,"atoms","atoms",-392247738),atoms], null))));
}
});
/**
 * Atom ::= ClassAtom | DataRangeAtom | ObjectPropertyAtom | DataPropertyAtom | BuiltInAtom | SameIndividualAtom | DifferentIndividualsAtom
 */
ontology.SWRL._atom = (function ontology$SWRL$_atom(at){
if(cljs.core.contains_QMARK_.call(null,ontology.SWRL.atomTypes,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(at))){
return cljs.core.assoc.call(null,at,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"atom","atom",-397043653));
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notAtom","ontology.SWRL/notAtom",1995834380),new cljs.core.Keyword(null,"atom","atom",-397043653),at], null))));
}
});
/**
 * DGAtom ::= ClassAtom | ObjectPropertyAtom
 */
ontology.SWRL._dgAtom = (function ontology$SWRL$_dgAtom(at){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(at),new cljs.core.Keyword(null,"classAtom","classAtom",644788249))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(at),new cljs.core.Keyword(null,"roleAtom","roleAtom",-637210131))))){
return cljs.core.assoc.call(null,at,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"atom","atom",-397043653));
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notAtom","ontology.SWRL/notAtom",1995834380),new cljs.core.Keyword(null,"atom","atom",-397043653),at], null))));
}
});
/**
 * IArg ::= IndividualID | Variable
 */
ontology.SWRL._iArg = (function ontology$SWRL$_iArg(arg){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(arg),new cljs.core.Keyword(null,"variable","variable",-281346492))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(arg),new cljs.core.Keyword(null,"individual","individual",-1643964808))))){
return cljs.core.assoc.call(null,arg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"iarg","iarg",-86161638));
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notIArg","ontology.SWRL/notIArg",1133128432),new cljs.core.Keyword(null,"IArg","IArg",-222504500),arg], null))));
}
});
ontology.SWRL.iArg = (function ontology$SWRL$iArg(arg){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(arg),new cljs.core.Keyword(null,"variable","variable",-281346492))){
return ontology.SWRL._iArg.call(null,arg);
} else {
return ontology.SWRL._iArg.call(null,ontology.components.individual.call(null,arg));
}
});
/**
 * DArg ::= Literal | Variable
 */
ontology.SWRL.dArg = (function ontology$SWRL$dArg(arg){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(arg),new cljs.core.Keyword(null,"variable","variable",-281346492))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(arg),new cljs.core.Keyword(null,"literal","literal",1664775605))))){
return cljs.core.assoc.call(null,arg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"darg","darg",-346444863));
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notDArg","ontology.SWRL/notDArg",309769390),new cljs.core.Keyword(null,"DArg","DArg",1397208882),arg], null))));
}
});
/**
 * Variable := ‘Variable’ ‘(’ IRI ‘)’
 */
ontology.SWRL.variable = (function ontology$SWRL$variable(iri){
if(cljs.core.truth_(new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(iri))){
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"variable","variable",-281346492),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"variable","variable",-281346492));
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notIRI","ontology.SWRL/notIRI",-1050625549),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
}
});
/**
 * ClassAtom := ‘ClassAtom’ ‘(’ ClassExpression IArg ‘)’
 */
ontology.SWRL._classAtom = (function ontology$SWRL$_classAtom(class$,iarg){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(iarg),new cljs.core.Keyword(null,"iarg","iarg",-86161638))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"iarg","iarg",-86161638),iarg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"classAtom","classAtom",644788249),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"classAtom","classAtom",644788249)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notIarg","ontology.SWRL/notIarg",-1687680006),new cljs.core.Keyword(null,"iarg","iarg",-86161638),iarg], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notClass","ontology.SWRL/notClass",-754341363),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
});
ontology.SWRL.classAtom = (function ontology$SWRL$classAtom(class$,iarg){
return ontology.SWRL._atom.call(null,ontology.SWRL._classAtom.call(null,ontology.expressions.class$.call(null,class$),ontology.SWRL.iArg.call(null,iarg)));
});
/**
 * DataRangeAtom := ‘DataRangeAtom’ ‘(’ DataRange DArg ‘)’
 */
ontology.SWRL._dataRangeAtom = (function ontology$SWRL$_dataRangeAtom(dataRange,darg){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRange),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(darg),new cljs.core.Keyword(null,"darg","darg",-346444863))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange,new cljs.core.Keyword(null,"darg","darg",-346444863),darg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRangeAtom","dataRangeAtom",134939408),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRangeAtom","dataRangeAtom",134939408)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notDarg","ontology.SWRL/notDarg",934801481),new cljs.core.Keyword(null,"darg","darg",-346444863),darg], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notDataRole","ontology.SWRL/notDataRole",544932696),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),dataRange], null))));
}
});
ontology.SWRL.dataRangeAtom = (function ontology$SWRL$dataRangeAtom(dataRange,darg){
return ontology.SWRL._atom.call(null,ontology.SWRL._dataRangeAtom.call(null,ontology.components.dataRange.call(null,dataRange),ontology.SWRL.dArg.call(null,darg)));
});
/**
 * ObjectPropertyAtom := ‘ObjectPropertyAtom’ ‘(’ ObjectPropertyExpression IArg IArg ‘)’
 */
ontology.SWRL._roleAtom = (function ontology$SWRL$_roleAtom(role,iarg1,iarg2){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(iarg1),new cljs.core.Keyword(null,"iarg","iarg",-86161638))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(iarg2),new cljs.core.Keyword(null,"iarg","iarg",-86161638))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"iarg1","iarg1",330625345),iarg1,new cljs.core.Keyword(null,"iarg2","iarg2",-2111996720),iarg2,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleAtom","roleAtom",-637210131),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleAtom","roleAtom",-637210131)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notIarg","ontology.SWRL/notIarg",-1687680006),new cljs.core.Keyword(null,"iarg","iarg",-86161638),iarg2], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notIarg","ontology.SWRL/notIarg",-1687680006),new cljs.core.Keyword(null,"iarg","iarg",-86161638),iarg1], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notRole","ontology.SWRL/notRole",-1867466305),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
});
ontology.SWRL.roleAtom = (function ontology$SWRL$roleAtom(role,iarg1,iarg2){
return ontology.SWRL._atom.call(null,ontology.SWRL._roleAtom.call(null,ontology.expressions.role.call(null,role),ontology.SWRL.iArg.call(null,iarg1),ontology.SWRL.iArg.call(null,iarg2)));
});
/**
 * DataPropertyAtom := ‘DataPropertyAtom’ ‘(’ DataProperty IArg DArg ‘)’
 */
ontology.SWRL._dataRoleAtom = (function ontology$SWRL$_dataRoleAtom(dataRole,iarg,darg){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(dataRole),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(darg),new cljs.core.Keyword(null,"darg","darg",-346444863))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(iarg),new cljs.core.Keyword(null,"iarg","iarg",-86161638))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole,new cljs.core.Keyword(null,"iarg","iarg",-86161638),iarg,new cljs.core.Keyword(null,"darg","darg",-346444863),darg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRoleAtom","dataRoleAtom",-1090751118),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleAtom","dataRoleAtom",-1090751118)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notIarg","ontology.SWRL/notIarg",-1687680006),new cljs.core.Keyword(null,"iarg","iarg",-86161638),iarg], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notDarg","ontology.SWRL/notDarg",934801481),new cljs.core.Keyword(null,"darg","darg",-346444863),darg], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notDataRole","ontology.SWRL/notDataRole",544932696),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),dataRole], null))));
}
});
ontology.SWRL.dataRoleAtom = (function ontology$SWRL$dataRoleAtom(dataRole,iarg,darg){
return ontology.SWRL._atom.call(null,ontology.SWRL._dataRoleAtom.call(null,ontology.expressions.dataRole.call(null,dataRole),ontology.SWRL.iArg.call(null,iarg),ontology.SWRL.dArg.call(null,darg)));
});
/**
 * BuiltInAtom := ‘BuiltInAtom’ ‘(’ IRI DArg { DArg } ‘)’
 */
ontology.SWRL._builtInAtom = (function ontology$SWRL$_builtInAtom(iri,dargs){
if(((1) < cljs.core.count.call(null,dargs))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"darg","darg",-346444863));
}),dargs)){
if(cljs.core.truth_(new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(iri))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"iri","iri",423917494),iri,new cljs.core.Keyword(null,"dargs","dargs",1129372001),dargs,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"builtInAtom","builtInAtom",721871243),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"builtInAtom","builtInAtom",721871243)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notIRI","ontology.SWRL/notIRI",-1050625549),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notDargs","ontology.SWRL/notDargs",1876325126),new cljs.core.Keyword(null,"dargs","dargs",1129372001),dargs], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notEnoughDargs","ontology.SWRL/notEnoughDargs",-519544188),new cljs.core.Keyword(null,"dargs","dargs",1129372001),dargs], null))));
}
});
ontology.SWRL.builtInAtom = (function ontology$SWRL$builtInAtom(iri,dargs){
return ontology.SWRL._atom.call(null,ontology.SWRL._builtInAtom.call(null,ontology.components.IRI.call(null,iri),cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.SWRL.dArg,dargs))));
});
/**
 * SameIndividualAtom := ‘SameIndividualAtom’ ‘(’ IArg IArg ‘)’
 */
ontology.SWRL.__EQ_individualsAtom = (function ontology$SWRL$__EQ_individualsAtom(iarg1,iarg2){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(iarg1),new cljs.core.Keyword(null,"iarg","iarg",-86161638))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(iarg2),new cljs.core.Keyword(null,"iarg","iarg",-86161638))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"iarg1","iarg1",330625345),iarg1,new cljs.core.Keyword(null,"iarg2","iarg2",-2111996720),iarg2,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"=individualsAtom","=individualsAtom",254081870),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"=individualsAtom","=individualsAtom",254081870)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notIArg","ontology.SWRL/notIArg",1133128432),new cljs.core.Keyword(null,"iarg","iarg",-86161638),iarg2], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notIArg","ontology.SWRL/notIArg",1133128432),new cljs.core.Keyword(null,"iarg","iarg",-86161638),iarg1], null))));
}
});
ontology.SWRL._EQ_individualsAtom = (function ontology$SWRL$_EQ_individualsAtom(iarg1,iarg2){
return ontology.SWRL._atom.call(null,ontology.SWRL.__EQ_individualsAtom.call(null,ontology.SWRL.iArg.call(null,iarg1),ontology.SWRL.iArg.call(null,iarg2)));
});
/**
 * DifferentIndividualsAtom := ‘DifferentIndividualsAtom’ ‘(’ IArg IArg ‘)’
 */
ontology.SWRL.__BANG__EQ_individualsAtom = (function ontology$SWRL$__BANG__EQ_individualsAtom(iarg1,iarg2){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(iarg1),new cljs.core.Keyword(null,"iarg","iarg",-86161638))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(iarg2),new cljs.core.Keyword(null,"iarg","iarg",-86161638))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"iarg1","iarg1",330625345),iarg1,new cljs.core.Keyword(null,"iarg2","iarg2",-2111996720),iarg2,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"!=individualsAtom","!=individualsAtom",-1490921546),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"!=individualsAtom","!=individualsAtom",-1490921546)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notIArg","ontology.SWRL/notIArg",1133128432),new cljs.core.Keyword(null,"iarg","iarg",-86161638),iarg2], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notIArg","ontology.SWRL/notIArg",1133128432),new cljs.core.Keyword(null,"iarg","iarg",-86161638),iarg1], null))));
}
});
ontology.SWRL._BANG__EQ_individualsAtom = (function ontology$SWRL$_BANG__EQ_individualsAtom(iarg1,iarg2){
return ontology.SWRL._atom.call(null,ontology.SWRL.__BANG__EQ_individualsAtom.call(null,ontology.SWRL.iArg.call(null,iarg1),ontology.SWRL.iArg.call(null,iarg2)));
});
/**
 * DGName ::= IRI
 */
ontology.SWRL.dgName = (function ontology$SWRL$dgName(iri){
if(cljs.core.contains_QMARK_.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348))){
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notDGName","ontology.SWRL/notDGName",1379565900),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null)),cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dgName","dgName",-730131169),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dgName","dgName",-730131169))));
} else {
return null;
}
});
/**
 * DGNodes ::= ‘Nodes’‘(’ NodeAssertion { NodeAssertion } ‘)’
 */
ontology.SWRL._dgNodes = (function ontology$SWRL$_dgNodes(nodes){
if(((1) < cljs.core.count.call(null,nodes))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"nodeFact","nodeFact",1848270988));
}),nodes)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"nodes","nodes",-2099585805),nodes,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dgNodes","dgNodes",1862757296),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dgNodes","dgNodes",1862757296)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notNodes","ontology.SWRL/notNodes",867184694),new cljs.core.Keyword(null,"nodes","nodes",-2099585805),nodes], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notEnoughNodes","ontology.SWRL/notEnoughNodes",509175088),new cljs.core.Keyword(null,"nodes","nodes",-2099585805),nodes], null))));
}
});
/**
 * DGNode ::= IRI
 */
ontology.SWRL.dgNode = (function ontology$SWRL$dgNode(iri){
if(cljs.core.contains_QMARK_.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348))){
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notDGNode","ontology.SWRL/notDGNode",1782460165),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
} else {
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dgNode","dgNode",1381498590),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dgNode","dgNode",1381498590));
}
});
ontology.SWRL.dgNodes = (function ontology$SWRL$dgNodes(nodes){
return ontology.SWRL._dgNodes.call(null,cljs.core.map.call(null,ontology.SWRL.dgNode,nodes));
});
/**
 * NodeAssertion ::= ‘NodeAssertion’‘(’ Class DGNode ‘)’
 */
ontology.SWRL._nodeFact = (function ontology$SWRL$_nodeFact(class$,node){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(class$),new cljs.core.Keyword(null,"class","class",-2030961996))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(node),new cljs.core.Keyword(null,"dgNode","dgNode",1381498590))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"class","class",-2030961996),class$,new cljs.core.Keyword(null,"node","node",581201198),node,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"nodeFact","nodeFact",1848270988),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"nodeFact","nodeFact",1848270988)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notDGNode","ontology.SWRL/notDGNode",1782460165),new cljs.core.Keyword(null,"node","node",581201198),node], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notClass","ontology.SWRL/notClass",-754341363),new cljs.core.Keyword(null,"class","class",-2030961996),class$], null))));
}
});
ontology.SWRL.nodeFact = (function ontology$SWRL$nodeFact(class$,node){
return ontology.SWRL._nodeFact.call(null,ontology.expressions.class$.call(null,class$),ontology.SWRL.dgNode.call(null,node));
});
/**
 * DGEdges ::= ‘Edges’‘(’ EdgeAssertion { EdgeAssertion } ‘)’
 */
ontology.SWRL._dgEdges = (function ontology$SWRL$_dgEdges(edges){
if(((1) < cljs.core.count.call(null,edges))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"edgeFact","edgeFact",880585706));
}),edges)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"edges","edges",-694791395),edges,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dgEdges","dgEdges",-1372017659),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dgEdges","dgEdges",-1372017659)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notEdges","ontology.SWRL/notEdges",513693602),new cljs.core.Keyword(null,"edges","edges",-694791395),edges], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notEnoughEdges","ontology.SWRL/notEnoughEdges",96011331),new cljs.core.Keyword(null,"edges","edges",-694791395),edges], null))));
}
});
/**
 * EdgeAssertion ::= ‘EdgeAssertion’ ‘(’ ObjectProperty DGNode DGNode ‘)’
 */
ontology.SWRL._edgeFact = (function ontology$SWRL$_edgeFact(role,node1,node2){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"role","role",-736691072))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(node1),new cljs.core.Keyword(null,"dgNode","dgNode",1381498590))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(node2),new cljs.core.Keyword(null,"dgNode","dgNode",1381498590))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"role","role",-736691072),role,new cljs.core.Keyword(null,"node1","node1",-1781864240),node1,new cljs.core.Keyword(null,"node2","node2",-2031724393),node2,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"edgeFact","edgeFact",880585706),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"edgeFact","edgeFact",880585706)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notDGNode","ontology.SWRL/notDGNode",1782460165),new cljs.core.Keyword(null,"node","node",581201198),node2], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notDGNode","ontology.SWRL/notDGNode",1782460165),new cljs.core.Keyword(null,"node","node",581201198),node1], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notRole","ontology.SWRL/notRole",-1867466305),new cljs.core.Keyword(null,"role","role",-736691072),role], null))));
}
});
ontology.SWRL.edgeFact = (function ontology$SWRL$edgeFact(role,node1,node2){
return ontology.SWRL._edgeFact.call(null,ontology.expressions.role.call(null,role),ontology.SWRL.dgNode.call(null,node1),ontology.SWRL.dgNode.call(null,node2));
});
ontology.SWRL.dgEdges = (function ontology$SWRL$dgEdges(edges){
return ontology.SWRL._dgEdges.call(null,cljs.core.map.call(null,ontology.SWRL.edgeFact,edges));
});
/**
 * MainClasses ::= ‘MainClasses’ ‘(’ Class { Class } ‘)’
 */
ontology.SWRL._mainClasses = (function ontology$SWRL$_mainClasses(classes){
if(((1) < cljs.core.count.call(null,classes))){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"class","class",-2030961996));
}),classes)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"classes","classes",2037804510),classes,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"mainClasses","mainClasses",407984795),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"mainClasses","mainClasses",407984795)], null);
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notClasses","ontology.SWRL/notClasses",-1901925288),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
} else {
throw (new ontology.SWRL.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.SWRL","notEnoughClasses","ontology.SWRL/notEnoughClasses",-1015159525),new cljs.core.Keyword(null,"classes","classes",2037804510),classes], null))));
}
});
ontology.SWRL.mainClasses = (function ontology$SWRL$mainClasses(classes){
return ontology.SWRL._mainClasses.call(null,cljs.core.map.call(null,ontology.expressions.class$,classes));
});

//# sourceMappingURL=SWRL.js.map
