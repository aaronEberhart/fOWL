// Compiled by ClojureScript 1.10.758 {}
goog.provide('ontology.file');
goog.require('cljs.core');
goog.require('ontology.components');
/**
 * ontologyDocument := { prefixDeclaration } Ontology
 */
ontology.file._ontologyFile = (function ontology$file$_ontologyFile(var_args){
var G__1044 = arguments.length;
switch (G__1044) {
case 1:
return ontology.file._ontologyFile.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.file._ontologyFile.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.file._ontologyFile.cljs$core$IFn$_invoke$arity$1 = (function (ontology__$1){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(ontology__$1),new cljs.core.Keyword(null,"ontology","ontology",1513220453))){
return ontology__$1;
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notOntology","ontology.file/notOntology",377392716),new cljs.core.Keyword(null,"ontology","ontology",1513220453),ontology__$1], null))));
}
}));

(ontology.file._ontologyFile.cljs$core$IFn$_invoke$arity$2 = (function (prefixes,ontology__$1){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(prefixes),new cljs.core.Keyword(null,"prefixes","prefixes",1192472197))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(ontology__$1),new cljs.core.Keyword(null,"ontology","ontology",1513220453))){
return cljs.core.assoc.call(null,ontology__$1,new cljs.core.Keyword(null,"prefixes","prefixes",1192472197),new cljs.core.Keyword(null,"prefixes","prefixes",1192472197).cljs$core$IFn$_invoke$arity$1(prefixes));
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notOntology","ontology.file/notOntology",377392716),new cljs.core.Keyword(null,"ontology","ontology",1513220453),ontology__$1], null))));
}
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notPrefixes","ontology.file/notPrefixes",-1599553638),new cljs.core.Keyword(null,"prefixes","prefixes",1192472197),prefixes], null))));
}
}));

(ontology.file._ontologyFile.cljs$lang$maxFixedArity = 2);

/**
 * prefixDeclaration := 'Prefix' '(' prefixName '=' fullIRI ')'
 */
ontology.file.prefix = (function ontology$file$prefix(prefixName,longIRI){
if(((typeof prefixName === 'string') && (typeof longIRI === 'string'))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"prefix","prefix",-265908465),prefixName,new cljs.core.Keyword(null,"iri","iri",423917494),longIRI,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"prefix","prefix",-265908465),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"prefix","prefix",-265908465)], null);
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notIRIs","ontology.file/notIRIs",-676699641),new cljs.core.Keyword(null,"prefixName","prefixName",-321047259),prefixName,new cljs.core.Keyword(null,"longIRI","longIRI",1669178182),longIRI], null))));
}
});
ontology.file.prefixes = (function ontology$file$prefixes(prefixes){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"prefix","prefix",-265908465));
}),prefixes)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"prefixes","prefixes",1192472197),prefixes,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"prefixes","prefixes",1192472197),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"prefixes","prefixes",1192472197)], null);
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notPrefixes","ontology.file/notPrefixes",-1599553638),new cljs.core.Keyword(null,"prefixes","prefixes",1192472197),prefixes], null))));
}
});
/**
 * Ontology := 'Ontology' '(' [ ontologyIRI [ versionIRI ] ] directlyImportsDocuments ontologyAnnotations axioms ')'
 */
ontology.file._ontology = (function ontology$file$_ontology(var_args){
var G__1047 = arguments.length;
switch (G__1047) {
case 3:
return ontology.file._ontology.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.file._ontology.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return ontology.file._ontology.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.file._ontology.cljs$core$IFn$_invoke$arity$3 = (function (directImports,ontologyAnnotations,axioms){
if(((cljs.core._EQ_.call(null,null,directImports)) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(directImports),new cljs.core.Keyword(null,"imports","imports",-1249933394))))){
if(((cljs.core._EQ_.call(null,null,ontologyAnnotations)) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(ontologyAnnotations),new cljs.core.Keyword(null,"annotations","annotations",1640956248))))){
if(((cljs.core._EQ_.call(null,null,axioms)) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(axioms),new cljs.core.Keyword(null,"axioms","axioms",-1585728273))))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"axioms","axioms",-1585728273),new cljs.core.Keyword(null,"axioms","axioms",-1585728273).cljs$core$IFn$_invoke$arity$1(axioms),new cljs.core.Keyword(null,"imports","imports",-1249933394),new cljs.core.Keyword(null,"imports","imports",-1249933394).cljs$core$IFn$_invoke$arity$1(directImports),new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(ontologyAnnotations),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"ontology","ontology",1513220453)], null);
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notaxioms","ontology.file/notaxioms",1247859502),new cljs.core.Keyword(null,"axioms","axioms",-1585728273),axioms], null))));
}
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notontologyAnnotations","ontology.file/notontologyAnnotations",-109651172),new cljs.core.Keyword(null,"ontologyAnnotations","ontologyAnnotations",-1306301761),ontologyAnnotations], null))));
}
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","directImports","ontology.file/directImports",1656814814),new cljs.core.Keyword(null,"directImports","directImports",-1263805285),directImports], null))));
}
}));

(ontology.file._ontology.cljs$core$IFn$_invoke$arity$4 = (function (ontologyIRI,directImports,ontologyAnnotations,axioms){
if(((cljs.core._EQ_.call(null,null,directImports)) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(directImports),new cljs.core.Keyword(null,"imports","imports",-1249933394))))){
if(((cljs.core._EQ_.call(null,null,ontologyAnnotations)) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(ontologyAnnotations),new cljs.core.Keyword(null,"annotations","annotations",1640956248))))){
if(((cljs.core._EQ_.call(null,null,axioms)) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(axioms),new cljs.core.Keyword(null,"axioms","axioms",-1585728273))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(ontologyIRI),new cljs.core.Keyword(null,"ontologyIRI","ontologyIRI",140324263))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ontologyIRI","ontologyIRI",140324263),ontologyIRI,new cljs.core.Keyword(null,"axioms","axioms",-1585728273),new cljs.core.Keyword(null,"axioms","axioms",-1585728273).cljs$core$IFn$_invoke$arity$1(axioms),new cljs.core.Keyword(null,"imports","imports",-1249933394),new cljs.core.Keyword(null,"imports","imports",-1249933394).cljs$core$IFn$_invoke$arity$1(directImports),new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(ontologyAnnotations),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"ontology","ontology",1513220453)], null);
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notontologyIRI","ontology.file/notontologyIRI",1690029560),new cljs.core.Keyword(null,"ontologyIRI","ontologyIRI",140324263),ontologyIRI], null))));
}
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notaxioms","ontology.file/notaxioms",1247859502),new cljs.core.Keyword(null,"axioms","axioms",-1585728273),axioms], null))));
}
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notontologyAnnotations","ontology.file/notontologyAnnotations",-109651172),new cljs.core.Keyword(null,"ontologyAnnotations","ontologyAnnotations",-1306301761),ontologyAnnotations], null))));
}
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","directImports","ontology.file/directImports",1656814814),new cljs.core.Keyword(null,"directImports","directImports",-1263805285),directImports], null))));
}
}));

(ontology.file._ontology.cljs$core$IFn$_invoke$arity$5 = (function (ontologyIRI,versionIRI,directImports,ontologyAnnotations,axioms){
if(((cljs.core._EQ_.call(null,null,directImports)) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(directImports),new cljs.core.Keyword(null,"imports","imports",-1249933394))))){
if(((cljs.core._EQ_.call(null,null,ontologyAnnotations)) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(ontologyAnnotations),new cljs.core.Keyword(null,"annotations","annotations",1640956248))))){
if(((cljs.core._EQ_.call(null,null,axioms)) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(axioms),new cljs.core.Keyword(null,"axioms","axioms",-1585728273))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(ontologyIRI),new cljs.core.Keyword(null,"ontologyIRI","ontologyIRI",140324263))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(versionIRI),new cljs.core.Keyword(null,"versionIRI","versionIRI",831238804))){
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"ontologyIRI","ontologyIRI",140324263),ontologyIRI,new cljs.core.Keyword(null,"versionIRI","versionIRI",831238804),versionIRI,new cljs.core.Keyword(null,"axioms","axioms",-1585728273),new cljs.core.Keyword(null,"axioms","axioms",-1585728273).cljs$core$IFn$_invoke$arity$1(axioms),new cljs.core.Keyword(null,"imports","imports",-1249933394),new cljs.core.Keyword(null,"imports","imports",-1249933394).cljs$core$IFn$_invoke$arity$1(directImports),new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(ontologyAnnotations),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"ontology","ontology",1513220453)], null);
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notversionIRI","ontology.file/notversionIRI",959405580),new cljs.core.Keyword(null,"versionIRI","versionIRI",831238804),versionIRI], null))));
}
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notontologyIRI","ontology.file/notontologyIRI",1690029560),new cljs.core.Keyword(null,"ontologyIRI","ontologyIRI",140324263),ontologyIRI], null))));
}
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notaxioms","ontology.file/notaxioms",1247859502),new cljs.core.Keyword(null,"axioms","axioms",-1585728273),axioms], null))));
}
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notontologyAnnotations","ontology.file/notontologyAnnotations",-109651172),new cljs.core.Keyword(null,"ontologyAnnotations","ontologyAnnotations",-1306301761),ontologyAnnotations], null))));
}
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","directImports","ontology.file/directImports",1656814814),new cljs.core.Keyword(null,"directImports","directImports",-1263805285),directImports], null))));
}
}));

(ontology.file._ontology.cljs$lang$maxFixedArity = 5);

/**
 * ontologyIRI := IRI
 */
ontology.file.ontologyIRI = (function ontology$file$ontologyIRI(iri){
if(typeof iri === 'string'){
if(((cljs.core._EQ_.call(null,cljs.core.subs.call(null,iri,(0),(1)),"<")) && (cljs.core._EQ_.call(null,cljs.core.subs.call(null,iri,(((iri).length) - (1)),((iri).length)),">")))){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,iri),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ontologyIRI","ontologyIRI",140324263),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"ontologyIRI","ontologyIRI",140324263));
} else {
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,["<",iri,">"].join('')),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ontologyIRI","ontologyIRI",140324263),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"ontologyIRI","ontologyIRI",140324263));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(iri))){
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ontologyIRI","ontologyIRI",140324263),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"ontologyIRI","ontologyIRI",140324263));
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notIRI","ontology.file/notIRI",-1051073135),new cljs.core.Keyword(null,"IRI","IRI",-1164613627),iri], null))));
}
}
});
/**
 * versionIRI := IRI
 */
ontology.file.versionIRI = (function ontology$file$versionIRI(iri){
if(typeof iri === 'string'){
if(((cljs.core._EQ_.call(null,cljs.core.subs.call(null,iri,(0),(1)),"<")) && (cljs.core._EQ_.call(null,cljs.core.subs.call(null,iri,(((iri).length) - (1)),((iri).length)),">")))){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,iri),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"versionIRI","versionIRI",831238804),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"versionIRI","versionIRI",831238804));
} else {
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,["<",iri,">"].join('')),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"versionIRI","versionIRI",831238804),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"versionIRI","versionIRI",831238804));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(iri))){
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"versionIRI","versionIRI",831238804),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"versionIRI","versionIRI",831238804));
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notIRI","ontology.file/notIRI",-1051073135),new cljs.core.Keyword(null,"IRI","IRI",-1164613627),iri], null))));
}
}
});
/**
 * directlyImportsDocuments := { 'Import' '(' IRI ')' }
 */
ontology.file.directImports = (function ontology$file$directImports(imports){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"import","import",-1399500709));
}),imports)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"imports","imports",-1249933394),imports,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"imports","imports",-1249933394),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"imports","imports",-1249933394)], null);
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notImports","ontology.file/notImports",708535812),new cljs.core.Keyword(null,"imports","imports",-1249933394),imports], null))));
}
});
/**
 * 'Import' '(' IRI ')'
 */
ontology.file.directImport = (function ontology$file$directImport(iri){
if(typeof iri === 'string'){
if(((cljs.core._EQ_.call(null,cljs.core.subs.call(null,iri,(0),(1)),"<")) && (cljs.core._EQ_.call(null,cljs.core.subs.call(null,iri,(((iri).length) - (1)),((iri).length)),">")))){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,iri),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"import","import",-1399500709),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"import","import",-1399500709));
} else {
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,["<",iri,">"].join('')),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"import","import",-1399500709),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"import","import",-1399500709));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(iri))){
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"import","import",-1399500709),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"import","import",-1399500709));
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notIRI","ontology.file/notIRI",-1051073135),new cljs.core.Keyword(null,"IRIs","IRIs",-481221911),iri], null))));
}
}
});
/**
 * ontologyAnnotations := { Annotation }
 */
ontology.file.ontologyAnnotations = (function ontology$file$ontologyAnnotations(annotations){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"annotation","annotation",-344661666));
}),annotations)){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotations","annotations",1640956248)], null);
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notAnnotations","ontology.file/notAnnotations",-1900057148),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
});
/**
 * axioms := { Axiom }
 */
ontology.file.axioms = (function ontology$file$axioms(axioms){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"axiom","axiom",-1683284564));
}),axioms)){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"axioms","axioms",-1585728273),axioms,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"axioms","axioms",-1585728273)], null);
} else {
throw (new ontology.file.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.file","notAxioms","ontology.file/notAxioms",1935073957),new cljs.core.Keyword(null,"Axioms","Axioms",1436696339),axioms], null))));
}
});
ontology.file.ontologyFile = (function ontology$file$ontologyFile(var_args){
var G__1050 = arguments.length;
switch (G__1050) {
case 1:
return ontology.file.ontologyFile.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.file.ontologyFile.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.file.ontologyFile.cljs$core$IFn$_invoke$arity$1 = (function (ontology__$1){
return ontology.file._ontologyFile.call(null,ontology__$1);
}));

(ontology.file.ontologyFile.cljs$core$IFn$_invoke$arity$2 = (function (pref,ontology__$1){
return ontology.file._ontologyFile.call(null,ontology.file.prefixes.call(null,pref),ontology__$1);
}));

(ontology.file.ontologyFile.cljs$lang$maxFixedArity = 2);

ontology.file.ontology = (function ontology$file$ontology(var_args){
var G__1053 = arguments.length;
switch (G__1053) {
case 3:
return ontology.file.ontology.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return ontology.file.ontology.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return ontology.file.ontology.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.file.ontology.cljs$core$IFn$_invoke$arity$3 = (function (imports,annotations,axiom){
return ontology.file._ontology.call(null,ontology.file.directImports.call(null,imports),ontology.file.ontologyAnnotations.call(null,annotations),ontology.file.axioms.call(null,axiom));
}));

(ontology.file.ontology.cljs$core$IFn$_invoke$arity$4 = (function (onto,imports,annotations,axiom){
return ontology.file._ontology.call(null,ontology.file.ontologyIRI.call(null,onto),ontology.file.directImports.call(null,imports),ontology.file.ontologyAnnotations.call(null,annotations),ontology.file.axioms.call(null,axiom));
}));

(ontology.file.ontology.cljs$core$IFn$_invoke$arity$5 = (function (onto,vers,imports,annotations,axiom){
return ontology.file._ontology.call(null,ontology.file.ontologyIRI.call(null,onto),ontology.file.versionIRI.call(null,vers),ontology.file.directImports.call(null,imports),ontology.file.ontologyAnnotations.call(null,annotations),ontology.file.axioms.call(null,axiom));
}));

(ontology.file.ontology.cljs$lang$maxFixedArity = 5);


//# sourceMappingURL=file.js.map
