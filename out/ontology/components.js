// Compiled by ClojureScript 1.10.758 {}
goog.provide('ontology.components');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.set');
ontology.components.xsdNS = "http://www.w3.org/2001/XMLSchema#";
ontology.components.rdfNS = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
ontology.components.rdfsNS = "http://www.w3.org/2000/01/rdf-schema#";
ontology.components.owlNS = "http://www.w3.org/2002/07/owl#";
ontology.components.Top = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),ontology.components.owlNS,new cljs.core.Keyword(null,"short","short",1928760516),"Thing",new cljs.core.Keyword(null,"prefix","prefix",-265908465),"owl:",new cljs.core.Keyword(null,"iri","iri",423917494),["<",ontology.components.owlNS,"Thing",">"].join(''),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"top","top",-1856271961)], null);
ontology.components.Bot = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),ontology.components.owlNS,new cljs.core.Keyword(null,"short","short",1928760516),"Nothing",new cljs.core.Keyword(null,"prefix","prefix",-265908465),"owl:",new cljs.core.Keyword(null,"iri","iri",423917494),["<",ontology.components.owlNS,"Nothing",">"].join(''),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"bot","bot",-950896508)], null);
ontology.components.RDFSLiteral = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),ontology.components.rdfsNS,new cljs.core.Keyword(null,"short","short",1928760516),"Literal",new cljs.core.Keyword(null,"prefix","prefix",-265908465),"rdfs:",new cljs.core.Keyword(null,"iri","iri",423917494),["<",ontology.components.rdfsNS,"Literal",">"].join(''),new cljs.core.Keyword(null,"arity","arity",-1808556135),(1),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataType","dataType",1069893619),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataType","dataType",1069893619)], null);
ontology.components.TopRole = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),ontology.components.owlNS,new cljs.core.Keyword(null,"short","short",1928760516),"topObjectProperty",new cljs.core.Keyword(null,"prefix","prefix",-265908465),"owl:",new cljs.core.Keyword(null,"iri","iri",423917494),["<",ontology.components.owlNS,"topObjectProperty",">"].join(''),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"role","role",-736691072),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleTop","roleTop",-578339835)], null);
ontology.components.BotRole = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),ontology.components.owlNS,new cljs.core.Keyword(null,"short","short",1928760516),"bottomObjectProperty",new cljs.core.Keyword(null,"prefix","prefix",-265908465),"owl:",new cljs.core.Keyword(null,"iri","iri",423917494),["<",ontology.components.owlNS,"bottomObjectProperty",">"].join(''),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"role","role",-736691072),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleBot","roleBot",833128280)], null);
ontology.components.TopData = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),ontology.components.owlNS,new cljs.core.Keyword(null,"short","short",1928760516),"topDataProperty",new cljs.core.Keyword(null,"prefix","prefix",-265908465),"owl:",new cljs.core.Keyword(null,"iri","iri",423917494),["<",ontology.components.owlNS,"topDataProperty",">"].join(''),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleName","dataRoleName",1086271076)], null);
ontology.components.BotData = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),ontology.components.owlNS,new cljs.core.Keyword(null,"short","short",1928760516),"bottomDataProperty",new cljs.core.Keyword(null,"prefix","prefix",-265908465),"owl:",new cljs.core.Keyword(null,"iri","iri",423917494),["<",ontology.components.owlNS,"bottomDataProperty",">"].join(''),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRole","dataRole",2021718746),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleName","dataRoleName",1086271076)], null);
ontology.components.dataRangeTypes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"dataAnd","dataAnd",476726497),null,new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),null,new cljs.core.Keyword(null,"datatypeRestriction","datatypeRestriction",-2060391699),null,new cljs.core.Keyword(null,"dataType","dataType",1069893619),null,new cljs.core.Keyword(null,"dataNot","dataNot",1038120535),null,new cljs.core.Keyword(null,"dataOneOf","dataOneOf",515724251),null,new cljs.core.Keyword(null,"dataOr","dataOr",-1115100673),null], null), null);
ontology.components.nameTypes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"roleName","roleName",945308896),null,new cljs.core.Keyword(null,"namedIndividual","namedIndividual",-837668384),null,new cljs.core.Keyword(null,"dataRoleName","dataRoleName",1086271076),null,new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),null,new cljs.core.Keyword(null,"className","className",-1983287057),null,new cljs.core.Keyword(null,"dataType","dataType",1069893619),null], null), null);
ontology.components.reservedIRIs = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 51, ["xsd:integer",null,"xsd:float",null,"xsd:NCName",null,"xsd:nonNegativeInteger",null,"xsd:decimal",null,"xsd:negativeInteger",null,"xsd:unsignedInt",null,"xsd:length",null,"rdf:langRange",null,"xsd:base64Binary",null,"xsd:double",null,"rdfs:seeAlso",null,"xsd:dateTime",null,"xsd:minInclusive",null,"owl:versionInfo",null,"xsd:int",null,"xsd:NMTOKEN",null,"owl:priorVersion",null,"xsd:Name",null,"xsd:minExclusive",null,"xsd:unsignedLong",null,"xsd:minLength",null,"xsd:hexBinary",null,"xsd:short",null,"owl:real",null,"owl:incompatibleWith",null,"xsd:nonPositiveInteger",null,"owl:rational",null,"rdf:XMLLiteral",null,"rdfs:label",null,"xsd:byte",null,"xsd:dateTimeStamp",null,"xsd:pattern",null,"xsd:token",null,"rdf:PlainLiteral",null,"rdfs:comment",null,"owl:deprecated",null,"xsd:maxInclusive",null,"owl:backwardCompatibleWith",null,"xsd:maxLength",null,"xsd:boolean",null,"xsd:positiveInteger",null,"xsd:normalizedString",null,"xsd:unsignedByte",null,"rdfs:isDefinedBy",null,"xsd:language",null,"xsd:maxExclusive",null,"xsd:long",null,"xsd:unsignedShort",null,"xsd:string",null,"xsd:anyURI",null], null), null);
ontology.components.dataTypeMaps = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 34, ["xsd:integer",null,"xsd:float",null,"xsd:NCName",null,"xsd:nonNegativeInteger",null,"xsd:decimal",null,"xsd:negativeInteger",null,"xsd:unsignedInt",null,"xsd:base64Binary",null,"xsd:double",null,"xsd:dateTime",null,"rdfs:Literal",null,"xsd:int",null,"xsd:NMTOKEN",null,"xsd:Name",null,"xsd:unsignedLong",null,"xsd:hexBinary",null,"xsd:short",null,"owl:real",null,"xsd:nonPositiveInteger",null,"owl:rational",null,"rdf:XMLLiteral",null,"xsd:byte",null,"xsd:dateTimeStamp",null,"xsd:token",null,"rdf:PlainLiteral",null,"xsd:boolean",null,"xsd:positiveInteger",null,"xsd:normalizedString",null,"xsd:unsignedByte",null,"xsd:language",null,"xsd:long",null,"xsd:unsignedShort",null,"xsd:string",null,"xsd:anyURI",null], null), null);
ontology.components.isReservedIRI_QMARK_ = (function ontology$components$isReservedIRI_QMARK_(iri){
return cljs.core.contains_QMARK_.call(null,ontology.components.reservedIRIs,iri);
});
/**
 * IRI := String
 */
ontology.components.XSDDatatype = (function ontology$components$XSDDatatype(var_args){
var G__603 = arguments.length;
switch (G__603) {
case 1:
return ontology.components.XSDDatatype.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.components.XSDDatatype.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.components.XSDDatatype.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.components.XSDDatatype.cljs$core$IFn$_invoke$arity$1 = (function (iri){
if((!(typeof iri === 'string'))){
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notStringIRI","ontology.components/notStringIRI",903836919),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
} else {
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"reserved","reserved",-775228297),ontology.components.isReservedIRI_QMARK_.call(null,iri),new cljs.core.Keyword(null,"knownDataType","knownDataType",89130006),cljs.core.contains_QMARK_.call(null,ontology.components.dataTypeMaps,iri),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null);
}
}));

(ontology.components.XSDDatatype.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
if((!(((typeof iri === 'string') && (typeof prefix === 'string'))))){
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notStringIRI","ontology.components/notStringIRI",903836919),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
} else {
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"reserved","reserved",-775228297),ontology.components.isReservedIRI_QMARK_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('')),new cljs.core.Keyword(null,"knownDataType","knownDataType",89130006),cljs.core.contains_QMARK_.call(null,ontology.components.dataTypeMaps,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('')),new cljs.core.Keyword(null,"short","short",1928760516),iri,new cljs.core.Keyword(null,"prefix","prefix",-265908465),prefix,new cljs.core.Keyword(null,"iri","iri",423917494),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('')], null);
}
}));

(ontology.components.XSDDatatype.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
if((!(((((typeof iri === 'string') && (typeof namespace === 'string'))) && (typeof prefix === 'string'))))){
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notStringIRI","ontology.components/notStringIRI",903836919),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
} else {
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"reserved","reserved",-775228297),ontology.components.isReservedIRI_QMARK_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('')),new cljs.core.Keyword(null,"knownDataType","knownDataType",89130006),cljs.core.contains_QMARK_.call(null,ontology.components.dataTypeMaps,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('')),new cljs.core.Keyword(null,"namespace","namespace",-377510372),namespace,new cljs.core.Keyword(null,"short","short",1928760516),iri,new cljs.core.Keyword(null,"prefix","prefix",-265908465),prefix,new cljs.core.Keyword(null,"iri","iri",423917494),["<",cljs.core.str.cljs$core$IFn$_invoke$arity$1(namespace),cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri),">"].join('')], null);
}
}));

(ontology.components.XSDDatatype.cljs$lang$maxFixedArity = 3);

/**
 * IRI := String
 */
ontology.components.IRI = (function ontology$components$IRI(var_args){
var G__606 = arguments.length;
switch (G__606) {
case 1:
return ontology.components.IRI.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.components.IRI.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.components.IRI.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.components.IRI.cljs$core$IFn$_invoke$arity$1 = (function (iri){
if(typeof iri === 'string'){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"reserved","reserved",-775228297),ontology.components.isReservedIRI_QMARK_.call(null,iri),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null);
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(iri))){
return iri;
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notIRI","ontology.components/notIRI",169176619),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
}
}
}));

(ontology.components.IRI.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
if(((typeof iri === 'string') && (typeof prefix === 'string'))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"reserved","reserved",-775228297),ontology.components.isReservedIRI_QMARK_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('')),new cljs.core.Keyword(null,"short","short",1928760516),iri,new cljs.core.Keyword(null,"prefix","prefix",-265908465),prefix,new cljs.core.Keyword(null,"iri","iri",423917494),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('')], null);
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notStringIRI","ontology.components/notStringIRI",903836919),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
}
}));

(ontology.components.IRI.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
if(((((typeof iri === 'string') && (typeof namespace === 'string'))) && (typeof prefix === 'string'))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"reserved","reserved",-775228297),ontology.components.isReservedIRI_QMARK_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('')),new cljs.core.Keyword(null,"namespace","namespace",-377510372),namespace,new cljs.core.Keyword(null,"short","short",1928760516),iri,new cljs.core.Keyword(null,"prefix","prefix",-265908465),prefix,new cljs.core.Keyword(null,"iri","iri",423917494),["<",cljs.core.str.cljs$core$IFn$_invoke$arity$1(namespace),cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri),">"].join('')], null);
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notStringIRI","ontology.components/notStringIRI",903836919),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
}
}));

(ontology.components.IRI.cljs$lang$maxFixedArity = 3);

/**
 * Class := IRI
 */
ontology.components.className = (function ontology$components$className(var_args){
var G__609 = arguments.length;
switch (G__609) {
case 1:
return ontology.components.className.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.components.className.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.components.className.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.components.className.cljs$core$IFn$_invoke$arity$1 = (function (iri){
if(typeof iri === 'string'){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,iri),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"className","className",-1983287057),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"className","className",-1983287057));
} else {
if(cljs.core.contains_QMARK_.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348))){
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notClassName","ontology.components/notClassName",-862164284),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
} else {
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"className","className",-1983287057),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"className","className",-1983287057));
}
}
}));

(ontology.components.className.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,prefix,iri),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"className","className",-1983287057),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"className","className",-1983287057));
}));

(ontology.components.className.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,prefix,iri,namespace),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"className","className",-1983287057),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"className","className",-1983287057));
}));

(ontology.components.className.cljs$lang$maxFixedArity = 3);

/**
 * ObjectProperty := IRI
 */
ontology.components.roleName = (function ontology$components$roleName(var_args){
var G__612 = arguments.length;
switch (G__612) {
case 1:
return ontology.components.roleName.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.components.roleName.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.components.roleName.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.components.roleName.cljs$core$IFn$_invoke$arity$1 = (function (iri){
if(typeof iri === 'string'){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,iri),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleName","roleName",945308896),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleName","roleName",945308896));
} else {
if(cljs.core.contains_QMARK_.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348))){
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notRoleName","ontology.components/notRoleName",1475409741),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
} else {
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleName","roleName",945308896),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleName","roleName",945308896));
}
}
}));

(ontology.components.roleName.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,prefix,iri),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleName","roleName",945308896),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleName","roleName",945308896));
}));

(ontology.components.roleName.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,prefix,iri,namespace),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"roleName","roleName",945308896),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"roleName","roleName",945308896));
}));

(ontology.components.roleName.cljs$lang$maxFixedArity = 3);

/**
 * InverseObjectProperty := 'ObjectInverseOf' '(' ObjectProperty ')'
 */
ontology.components._inverseRoleName = (function ontology$components$_inverseRoleName(role){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(role),new cljs.core.Keyword(null,"roleName","roleName",945308896))){
return cljs.core.assoc.call(null,role,new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"inverseRoleName","inverseRoleName",1800836539));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notRole","ontology.components/notRole",1491867127),new cljs.core.Keyword(null,"roleName","roleName",945308896),role], null))));
}
});
ontology.components.inverseRoleName = (function ontology$components$inverseRoleName(var_args){
var G__615 = arguments.length;
switch (G__615) {
case 1:
return ontology.components.inverseRoleName.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.components.inverseRoleName.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.components.inverseRoleName.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.components.inverseRoleName.cljs$core$IFn$_invoke$arity$1 = (function (iri){
return ontology.components._inverseRoleName.call(null,ontology.components.roleName.call(null,iri));
}));

(ontology.components.inverseRoleName.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return ontology.components._inverseRoleName.call(null,ontology.components.roleName.call(null,prefix,iri));
}));

(ontology.components.inverseRoleName.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return ontology.components._inverseRoleName.call(null,ontology.components.roleName.call(null,prefix,iri,namespace));
}));

(ontology.components.inverseRoleName.cljs$lang$maxFixedArity = 3);

/**
 * DataProperty := IRI
 */
ontology.components.dataRoleName = (function ontology$components$dataRoleName(var_args){
var G__618 = arguments.length;
switch (G__618) {
case 1:
return ontology.components.dataRoleName.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.components.dataRoleName.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.components.dataRoleName.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.components.dataRoleName.cljs$core$IFn$_invoke$arity$1 = (function (iri){
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRoleName","dataRoleName",1086271076),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleName","dataRoleName",1086271076));
}));

(ontology.components.dataRoleName.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,prefix,iri),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRoleName","dataRoleName",1086271076),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleName","dataRoleName",1086271076));
}));

(ontology.components.dataRoleName.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,prefix,iri,namespace),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRoleName","dataRoleName",1086271076),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataRoleName","dataRoleName",1086271076));
}));

(ontology.components.dataRoleName.cljs$lang$maxFixedArity = 3);

/**
 * NamedIndividual := IRI
 */
ontology.components._namedIndividual = (function ontology$components$_namedIndividual(var_args){
var G__621 = arguments.length;
switch (G__621) {
case 1:
return ontology.components._namedIndividual.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.components._namedIndividual.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.components._namedIndividual.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.components._namedIndividual.cljs$core$IFn$_invoke$arity$1 = (function (iri){
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namedIndividual","namedIndividual",-837668384),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"namedIndividual","namedIndividual",-837668384));
}));

(ontology.components._namedIndividual.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,prefix,iri),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namedIndividual","namedIndividual",-837668384),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"namedIndividual","namedIndividual",-837668384));
}));

(ontology.components._namedIndividual.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,prefix,iri,namespace),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namedIndividual","namedIndividual",-837668384),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"namedIndividual","namedIndividual",-837668384));
}));

(ontology.components._namedIndividual.cljs$lang$maxFixedArity = 3);

/**
 * AnonymousIndividual := nodeID
 */
ontology.components._anonymousIndividual = (function ontology$components$_anonymousIndividual(var_args){
var G__624 = arguments.length;
switch (G__624) {
case 1:
return ontology.components._anonymousIndividual.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.components._anonymousIndividual.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.components._anonymousIndividual.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.components._anonymousIndividual.cljs$core$IFn$_invoke$arity$1 = (function (iri){
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"anonymousIndividual","anonymousIndividual",561214977),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"anonymousIndividual","anonymousIndividual",561214977));
}));

(ontology.components._anonymousIndividual.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,prefix,iri),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"anonymousIndividual","anonymousIndividual",561214977),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"anonymousIndividual","anonymousIndividual",561214977));
}));

(ontology.components._anonymousIndividual.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return cljs.core.assoc.call(null,ontology.components.IRI.call(null,prefix,iri,namespace),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"anonymousIndividual","anonymousIndividual",561214977),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"anonymousIndividual","anonymousIndividual",561214977));
}));

(ontology.components._anonymousIndividual.cljs$lang$maxFixedArity = 3);

/**
 * Individual := AnonymousIndividual | NamedIndividual
 */
ontology.components._individual = (function ontology$components$_individual(anyIndividual){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(anyIndividual),new cljs.core.Keyword(null,"anonymousIndividual","anonymousIndividual",561214977))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(anyIndividual),new cljs.core.Keyword(null,"namedIndividual","namedIndividual",-837668384))))){
return cljs.core.assoc.call(null,anyIndividual,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"individual","individual",-1643964808));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notIndividual","ontology.components/notIndividual",-1193606280),new cljs.core.Keyword(null,"individual","individual",-1643964808),anyIndividual], null))));
}
});
ontology.components.individual = (function ontology$components$individual(var_args){
var G__627 = arguments.length;
switch (G__627) {
case 1:
return ontology.components.individual.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.components.individual.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.components.individual.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.components.individual.cljs$core$IFn$_invoke$arity$1 = (function (iri){
if(typeof iri === 'string'){
return ontology.components._individual.call(null,ontology.components._namedIndividual.call(null,ontology.components.IRI.call(null,iri)));
} else {
if(cljs.core.contains_QMARK_.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348))){
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notIndividual","ontology.components/notIndividual",-1193606280),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
} else {
return ontology.components._individual.call(null,((cljs.core._EQ_.call(null,cljs.core.get.call(null,new cljs.core.Keyword(null,"prefix","prefix",-265908465).cljs$core$IFn$_invoke$arity$1(iri),(0)),"_"))?ontology.components._anonymousIndividual.call(null,iri):ontology.components._namedIndividual.call(null,iri)));
}
}
}));

(ontology.components.individual.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return ontology.components._individual.call(null,((cljs.core._EQ_.call(null,cljs.core.get.call(null,prefix,(0)),"_"))?ontology.components._anonymousIndividual.call(null,prefix,iri):ontology.components._namedIndividual.call(null,prefix,iri)));
}));

(ontology.components.individual.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return ontology.components._individual.call(null,((cljs.core._EQ_.call(null,cljs.core.get.call(null,prefix,(0)),"_"))?ontology.components._anonymousIndividual.call(null,prefix,iri,namespace):ontology.components._namedIndividual.call(null,prefix,iri,namespace)));
}));

(ontology.components.individual.cljs$lang$maxFixedArity = 3);

/**
 * Datatype := IRI
 */
ontology.components._dataType = (function ontology$components$_dataType(var_args){
var G__630 = arguments.length;
switch (G__630) {
case 1:
return ontology.components._dataType.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.components._dataType.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.components._dataType.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.components._dataType.cljs$core$IFn$_invoke$arity$1 = (function (iri){
if(cljs.core.truth_(new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(iri))){
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"arity","arity",-1808556135),(1),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataType","dataType",1069893619),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataType","dataType",1069893619));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notdataType","ontology.components/notdataType",-1116333718),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
}
}));

(ontology.components._dataType.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
if(((cljs.core._EQ_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join(''),"rdfs:Literal")) || (((cljs.core.contains_QMARK_.call(null,ontology.components.dataTypeMaps,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join(''))) || ((!(ontology.components.isReservedIRI_QMARK_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join(''))))))))){
return cljs.core.assoc.call(null,ontology.components.XSDDatatype.call(null,prefix,iri),new cljs.core.Keyword(null,"arity","arity",-1808556135),(1),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataType","dataType",1069893619),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataType","dataType",1069893619));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notdataType","ontology.components/notdataType",-1116333718),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
}
}));

(ontology.components._dataType.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
if(((cljs.core._EQ_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join(''),"rdfs:Literal")) || (((cljs.core.contains_QMARK_.call(null,ontology.components.dataTypeMaps,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join(''))) || ((!(ontology.components.isReservedIRI_QMARK_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join(''))))))))){
return cljs.core.assoc.call(null,ontology.components.XSDDatatype.call(null,prefix,iri,namespace),new cljs.core.Keyword(null,"arity","arity",-1808556135),(1),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataType","dataType",1069893619),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataType","dataType",1069893619));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notdataType","ontology.components/notdataType",-1116333718),new cljs.core.Keyword(null,"iri","iri",423917494),iri,new cljs.core.Keyword(null,"namespace","namespace",-377510372),namespace], null))));
}
}));

(ontology.components._dataType.cljs$lang$maxFixedArity = 3);

ontology.components.dataType = (function ontology$components$dataType(var_args){
var G__633 = arguments.length;
switch (G__633) {
case 1:
return ontology.components.dataType.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.components.dataType.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.components.dataType.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.components.dataType.cljs$core$IFn$_invoke$arity$1 = (function (iri){
if(typeof iri === 'string'){
return ontology.components._dataType.call(null,ontology.components.IRI.call(null,iri));
} else {
if(cljs.core.contains_QMARK_.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(iri),new cljs.core.Keyword(null,"dataType","dataType",1069893619))){
return iri;
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notDataType","ontology.components/notDataType",1357887324),new cljs.core.Keyword(null,"dataType","dataType",1069893619),iri], null))));
}
} else {
return ontology.components._dataType.call(null,iri);
}
}
}));

(ontology.components.dataType.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return ontology.components._dataType.call(null,ontology.components.XSDDatatype.call(null,prefix,iri));
}));

(ontology.components.dataType.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return ontology.components._dataType.call(null,ontology.components.XSDDatatype.call(null,prefix,iri,namespace));
}));

(ontology.components.dataType.cljs$lang$maxFixedArity = 3);

/**
 * Literal := typedLiteral | stringLiteralNoLanguage | stringLiteralWithLanguage
 */
ontology.components._literal = (function ontology$components$_literal(literal){
if(((((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(literal),new cljs.core.Keyword(null,"typedLiteral","typedLiteral",979799393))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(literal),new cljs.core.Keyword(null,"stringLiteralNoLanguage","stringLiteralNoLanguage",-365679214))))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(literal),new cljs.core.Keyword(null,"stringLiteralWithLanguage","stringLiteralWithLanguage",893871210))))){
return cljs.core.assoc.call(null,literal,new cljs.core.Keyword(null,"arity","arity",-1808556135),(1),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"literal","literal",1664775605));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notLiteral","ontology.components/notLiteral",198538056),new cljs.core.Keyword(null,"literal","literal",1664775605),literal], null))));
}
});
/**
 * typedLiteral := lexicalForm '^^' Datatype
 */
ontology.components._typedLiteral = (function ontology$components$_typedLiteral(lexicalForm,datatype){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(lexicalForm),new cljs.core.Keyword(null,"lexicalForm","lexicalForm",1796106906))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(datatype),new cljs.core.Keyword(null,"dataType","dataType",1069893619))))){
return cljs.core.assoc.call(null,datatype,new cljs.core.Keyword(null,"value","value",305978217),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(lexicalForm)),"^","^",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"prefix","prefix",-265908465).cljs$core$IFn$_invoke$arity$1(datatype)),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"short","short",1928760516).cljs$core$IFn$_invoke$arity$1(datatype))].join(''),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"typedLiteral","typedLiteral",979799393),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"typedLiteral","typedLiteral",979799393));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notTypedLiteral","ontology.components/notTypedLiteral",1547727333),new cljs.core.Keyword(null,"lexicalForm","lexicalForm",1796106906),lexicalForm,new cljs.core.Keyword(null,"dataType","dataType",1069893619),datatype], null))));
}
});
/**
 * lexicalForm := quotedString
 */
ontology.components._lexicalForm = (function ontology$components$_lexicalForm(stri){
if(typeof stri === 'string'){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),["\"",stri,"\""].join(''),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"lexicalForm","lexicalForm",1796106906),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"lexicalForm","lexicalForm",1796106906)], null);
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notString","ontology.components/notString",-268009319),new cljs.core.Keyword(null,"string","string",-1989541586),stri], null))));
}
});
ontology.components.typedLiteral = (function ontology$components$typedLiteral(lexicalForm,datatype){
return ontology.components._literal.call(null,ontology.components._typedLiteral.call(null,ontology.components._lexicalForm.call(null,lexicalForm),ontology.components.dataType.call(null,datatype)));
});
/**
 * stringLiteralNoLanguage := quotedString
 */
ontology.components._stringLiteralNoLanguage = (function ontology$components$_stringLiteralNoLanguage(string){
if(typeof string === 'string'){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),["\"",string,"\""].join(''),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"stringLiteralNoLanguage","stringLiteralNoLanguage",-365679214),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"stringLiteralNoLanguage","stringLiteralNoLanguage",-365679214)], null);
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notStringLiteral","ontology.components/notStringLiteral",-443716922),new cljs.core.Keyword(null,"string","string",-1989541586),string], null))));
}
});
ontology.components.stringLiteralNoLanguage = (function ontology$components$stringLiteralNoLanguage(string){
return ontology.components._literal.call(null,ontology.components._stringLiteralNoLanguage.call(null,string));
});
/**
 * stringLiteralWithLanguage := quotedString languageTag
 */
ontology.components._stringLiteralWithLanguage = (function ontology$components$_stringLiteralWithLanguage(string,lang){
if(((typeof string === 'string') && (typeof lang === 'string'))){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),["\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(string),"\"","@",cljs.core.str.cljs$core$IFn$_invoke$arity$1(lang)].join(''),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"stringLiteralWithLanguage","stringLiteralWithLanguage",893871210),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"stringLiteralWithLanguage","stringLiteralWithLanguage",893871210)], null);
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notStringLiteralWithLang","ontology.components/notStringLiteralWithLang",310739278),new cljs.core.Keyword(null,"string","string",-1989541586),string,new cljs.core.Keyword(null,"lang","lang",-1819677104),lang], null))));
}
});
ontology.components.stringLiteralWithLanguage = (function ontology$components$stringLiteralWithLanguage(string,lang){
return ontology.components._literal.call(null,ontology.components._stringLiteralWithLanguage.call(null,string,lang));
});
/**
 * DataOneOf := 'DataOneOf' '(' Literal { Literal } ')'
 */
ontology.components._dataOneOf = (function ontology$components$_dataOneOf(literals){
if(((((cljs.core.set_QMARK_.call(null,literals)) && (cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"literal","literal",1664775605));
}),literals)))) || (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(literals),new cljs.core.Keyword(null,"literal","literal",1664775605))))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"literals","literals",-427821498),literals,new cljs.core.Keyword(null,"arity","arity",-1808556135),(1),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataOneOf","dataOneOf",515724251),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataOneOf","dataOneOf",515724251)], null);
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notLiterals","ontology.components/notLiterals",1762905993),new cljs.core.Keyword(null,"literals","literals",-427821498),literals], null))));
}
});
/**
 * constrainingFacet := IRI
 */
ontology.components._constrainingFacet = (function ontology$components$_constrainingFacet(iri){
if(cljs.core.truth_(new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(iri))){
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"constrainingFacet","constrainingFacet",-1744425633));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notFacet","ontology.components/notFacet",-1420304046),new cljs.core.Keyword(null,"facet","facet",-801327574),iri], null))));
}
});
/**
 * restrictionValue := Literal
 */
ontology.components._restrictionValue = (function ontology$components$_restrictionValue(literal){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(literal),new cljs.core.Keyword(null,"literal","literal",1664775605))){
return cljs.core.assoc.call(null,literal,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"restrictionValue","restrictionValue",-1673349086));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notLiteral","ontology.components/notLiteral",198538056),new cljs.core.Keyword(null,"literal","literal",1664775605),literal], null))));
}
});
/**
 * RestrictedFacet := constrainingFacet restrictionValue
 */
ontology.components._restrictedValue = (function ontology$components$_restrictedValue(facet,restriction){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(restriction),new cljs.core.Keyword(null,"restrictionValue","restrictionValue",-1673349086))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(facet),new cljs.core.Keyword(null,"constrainingFacet","constrainingFacet",-1744425633))))){
return cljs.core.assoc.call(null,facet,new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(restriction),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"restrictedValue","restrictedValue",518292746),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"restrictedValue","restrictedValue",518292746));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notRestrictedValue","ontology.components/notRestrictedValue",2125091825),new cljs.core.Keyword(null,"facet","facet",-801327574),facet,new cljs.core.Keyword(null,"restriction","restriction",-1380234912),restriction], null))));
}
});
ontology.components.restrictedValue = (function ontology$components$restrictedValue(facet,restriction){
return ontology.components._restrictedValue.call(null,ontology.components._constrainingFacet.call(null,facet),ontology.components._restrictionValue.call(null,restriction));
});
/**
 * DatatypeRestriction := 'DatatypeRestriction' '(' Datatype RestrictedFacet { RestrictedFacet } ')'
 */
ontology.components._datatypeRestriction = (function ontology$components$_datatypeRestriction(datatype,restrictedvalues){
if((((((((cljs.core.count.call(null,restrictedvalues) > (0))) && (cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"restrictedValue","restrictedValue",518292746));
}),restrictedvalues)))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(datatype),new cljs.core.Keyword(null,"dataType","dataType",1069893619))))) && (cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,restrictedvalues)));
}),restrictedvalues)))){
return cljs.core.assoc.call(null,datatype,new cljs.core.Keyword(null,"restrictedValues","restrictedValues",-1675883463),restrictedvalues,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"datatypeRestriction","datatypeRestriction",-2060391699),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"datatypeRestriction","datatypeRestriction",-2060391699));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notDatatypeRestriction","ontology.components/notDatatypeRestriction",-1262356585),new cljs.core.Keyword(null,"datatype","datatype",147866920),datatype,new cljs.core.Keyword(null,"restrictedvalues","restrictedvalues",984592831),restrictedvalues], null))));
}
});
/**
 * DataIntersectionOf := 'DataIntersectionOf' '(' DataRange DataRange { DataRange } ')'
 */
ontology.components._dataAnd = (function ontology$components$_dataAnd(dataranges){
if(((cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228));
}),dataranges)) && (cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,dataranges)));
}),dataranges)))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dataRanges","dataRanges",-1257763817),dataranges,new cljs.core.Keyword(null,"arity","arity",-1808556135),new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,dataranges)),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataAnd","dataAnd",476726497),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataAnd","dataAnd",476726497)], null);
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notDataAnd","ontology.components/notDataAnd",-448451961),new cljs.core.Keyword(null,"dataRanges","dataRanges",-1257763817),dataranges], null))));
}
});
/**
 * DataUnionOf := 'DataUnionOf' '(' DataRange DataRange { DataRange } ')'
 */
ontology.components._dataOr = (function ontology$components$_dataOr(dataranges){
if(((cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228));
}),dataranges)) && (cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,dataranges)));
}),dataranges)))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dataRanges","dataRanges",-1257763817),dataranges,new cljs.core.Keyword(null,"arity","arity",-1808556135),new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,dataranges)),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataOr","dataOr",-1115100673),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataOr","dataOr",-1115100673)], null);
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notDataOr","ontology.components/notDataOr",-1421487546),new cljs.core.Keyword(null,"dataRanges","dataRanges",-1257763817),dataranges], null))));
}
});
/**
 * DataComplementOf := 'DataComplementOf' '(' DataRange ')'
 */
ontology.components._dataNot = (function ontology$components$_dataNot(datarange){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(datarange),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),datarange,new cljs.core.Keyword(null,"arity","arity",-1808556135),new cljs.core.Keyword(null,"arity","arity",-1808556135).cljs$core$IFn$_invoke$arity$1(datarange),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataNot","dataNot",1038120535),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataNot","dataNot",1038120535)], null);
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notDataNot","ontology.components/notDataNot",-1228147113),new cljs.core.Keyword(null,"datarange","datarange",316019475),datarange], null))));
}
});
/**
 * DataRange := Datatype | DataIntersectionOf | DataUnionOf | DataComplementOf | DataOneOf | DatatypeRestriction
 */
ontology.components._dataRange = (function ontology$components$_dataRange(datarange){
if(cljs.core.contains_QMARK_.call(null,ontology.components.dataRangeTypes,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(datarange))){
return cljs.core.assoc.call(null,datarange,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notDataRange","ontology.components/notDataRange",2113843081),new cljs.core.Keyword(null,"dataRange","dataRange",-1468186228),datarange], null))));
}
});
ontology.components.dataRange = (function ontology$components$dataRange(dr){
if(cljs.core.contains_QMARK_.call(null,dr,new cljs.core.Keyword(null,"type","type",1174270348))){
return ontology.components._dataRange.call(null,dr);
} else {
return ontology.components._dataRange.call(null,ontology.components.dataType.call(null,dr));
}
});
ontology.components.dataAnd = (function ontology$components$dataAnd(var_args){
var G__639 = arguments.length;
switch (G__639) {
case 2:
return ontology.components.dataAnd.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__4757__auto__ = [];
var len__4736__auto___641 = arguments.length;
var i__4737__auto___642 = (0);
while(true){
if((i__4737__auto___642 < len__4736__auto___641)){
args_arr__4757__auto__.push((arguments[i__4737__auto___642]));

var G__643 = (i__4737__auto___642 + (1));
i__4737__auto___642 = G__643;
continue;
} else {
}
break;
}

var argseq__4758__auto__ = (new cljs.core.IndexedSeq(args_arr__4757__auto__.slice((2)),(0),null));
return ontology.components.dataAnd.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4758__auto__);

}
});

(ontology.components.dataAnd.cljs$core$IFn$_invoke$arity$2 = (function (datarange1,datarange2){
var dataRanges = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ontology.components.dataRange.call(null,datarange1),ontology.components.dataRange.call(null,datarange2)], null));
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,dataRanges))){
return cljs.core.first.call(null,dataRanges);
} else {
return ontology.components._dataRange.call(null,ontology.components._dataAnd.call(null,dataRanges));
}
}));

(ontology.components.dataAnd.cljs$core$IFn$_invoke$arity$variadic = (function (datarange1,datarange2,dataranges){
var dataRanges = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.components.dataRange,cljs.core.flatten.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [datarange1,datarange2,dataranges], null))));
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,dataRanges))){
return cljs.core.first.call(null,dataRanges);
} else {
return ontology.components._dataRange.call(null,ontology.components._dataAnd.call(null,dataRanges));
}
}));

/** @this {Function} */
(ontology.components.dataAnd.cljs$lang$applyTo = (function (seq636){
var G__637 = cljs.core.first.call(null,seq636);
var seq636__$1 = cljs.core.next.call(null,seq636);
var G__638 = cljs.core.first.call(null,seq636__$1);
var seq636__$2 = cljs.core.next.call(null,seq636__$1);
var self__4723__auto__ = this;
return self__4723__auto__.cljs$core$IFn$_invoke$arity$variadic(G__637,G__638,seq636__$2);
}));

(ontology.components.dataAnd.cljs$lang$maxFixedArity = (2));

ontology.components.dataOr = (function ontology$components$dataOr(var_args){
var G__648 = arguments.length;
switch (G__648) {
case 2:
return ontology.components.dataOr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__4757__auto__ = [];
var len__4736__auto___650 = arguments.length;
var i__4737__auto___651 = (0);
while(true){
if((i__4737__auto___651 < len__4736__auto___650)){
args_arr__4757__auto__.push((arguments[i__4737__auto___651]));

var G__652 = (i__4737__auto___651 + (1));
i__4737__auto___651 = G__652;
continue;
} else {
}
break;
}

var argseq__4758__auto__ = (new cljs.core.IndexedSeq(args_arr__4757__auto__.slice((2)),(0),null));
return ontology.components.dataOr.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4758__auto__);

}
});

(ontology.components.dataOr.cljs$core$IFn$_invoke$arity$2 = (function (datarange1,datarange2){
var dataRanges = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ontology.components.dataRange.call(null,datarange1),ontology.components.dataRange.call(null,datarange2)], null));
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,dataRanges))){
return cljs.core.first.call(null,dataRanges);
} else {
return ontology.components._dataRange.call(null,ontology.components._dataOr.call(null,dataRanges));
}
}));

(ontology.components.dataOr.cljs$core$IFn$_invoke$arity$variadic = (function (datarange1,datarange2,dataranges){
var dataRanges = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.components.dataRange,cljs.core.flatten.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [datarange1,datarange2,dataranges], null))));
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,dataRanges))){
return cljs.core.first.call(null,dataRanges);
} else {
return ontology.components._dataRange.call(null,ontology.components._dataOr.call(null,dataRanges));
}
}));

/** @this {Function} */
(ontology.components.dataOr.cljs$lang$applyTo = (function (seq645){
var G__646 = cljs.core.first.call(null,seq645);
var seq645__$1 = cljs.core.next.call(null,seq645);
var G__647 = cljs.core.first.call(null,seq645__$1);
var seq645__$2 = cljs.core.next.call(null,seq645__$1);
var self__4723__auto__ = this;
return self__4723__auto__.cljs$core$IFn$_invoke$arity$variadic(G__646,G__647,seq645__$2);
}));

(ontology.components.dataOr.cljs$lang$maxFixedArity = (2));

ontology.components.dataNot = (function ontology$components$dataNot(datarange){
return ontology.components._dataRange.call(null,ontology.components._dataNot.call(null,ontology.components.dataRange.call(null,datarange)));
});
ontology.components.dataOneOf = (function ontology$components$dataOneOf(var_args){
var G__656 = arguments.length;
switch (G__656) {
case 1:
return ontology.components.dataOneOf.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
var args_arr__4757__auto__ = [];
var len__4736__auto___658 = arguments.length;
var i__4737__auto___659 = (0);
while(true){
if((i__4737__auto___659 < len__4736__auto___658)){
args_arr__4757__auto__.push((arguments[i__4737__auto___659]));

var G__660 = (i__4737__auto___659 + (1));
i__4737__auto___659 = G__660;
continue;
} else {
}
break;
}

var argseq__4758__auto__ = (new cljs.core.IndexedSeq(args_arr__4757__auto__.slice((1)),(0),null));
return ontology.components.dataOneOf.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4758__auto__);

}
});

(ontology.components.dataOneOf.cljs$core$IFn$_invoke$arity$1 = (function (literal){
return ontology.components._dataRange.call(null,ontology.components._dataOneOf.call(null,cljs.core.PersistentHashSet.createAsIfByAssoc([literal])));
}));

(ontology.components.dataOneOf.cljs$core$IFn$_invoke$arity$variadic = (function (literal,literals){
return ontology.components._dataRange.call(null,ontology.components._dataOneOf.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.flatten.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [literal,literals], null)))));
}));

/** @this {Function} */
(ontology.components.dataOneOf.cljs$lang$applyTo = (function (seq654){
var G__655 = cljs.core.first.call(null,seq654);
var seq654__$1 = cljs.core.next.call(null,seq654);
var self__4723__auto__ = this;
return self__4723__auto__.cljs$core$IFn$_invoke$arity$variadic(G__655,seq654__$1);
}));

(ontology.components.dataOneOf.cljs$lang$maxFixedArity = (1));

ontology.components.datatypeRestriction = (function ontology$components$datatypeRestriction(datatype,restrictedvalues){
return ontology.components._dataRange.call(null,ontology.components._datatypeRestriction.call(null,ontology.components.dataType.call(null,datatype),cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.map.call(null,ontology.components.restrictedValue,cljs.core.filter.call(null,(function (p1__661_SHARP_){
return (new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(p1__661_SHARP_) == null);
}),restrictedvalues),cljs.core.filter.call(null,(function (p1__662_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(p1__662_SHARP_),new cljs.core.Keyword(null,"literal","literal",1664775605));
}),restrictedvalues)))));
});
/**
 * Entity := 'Class' '(' Class ')' | 'Datatype' '(' Datatype ')' | 'ObjectProperty' '(' ObjectProperty ')' | 'DataProperty' '(' DataProperty ')' | 'AnnotationProperty' '(' AnnotationProperty ')' | 'NamedIndividual' '(' NamedIndividual ')'
 */
ontology.components.entity = (function ontology$components$entity(thing){
if(cljs.core.contains_QMARK_.call(null,ontology.components.nameTypes,new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(thing))){
return cljs.core.assoc.call(null,thing,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"name","name",1843675177));
} else {
throw (new ontology.components.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.components","notName","ontology.components/notName",1421839830),new cljs.core.Keyword(null,"name","name",1843675177),thing], null))));
}
});

//# sourceMappingURL=components.js.map
