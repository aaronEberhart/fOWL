// Compiled by ClojureScript 1.10.758 {}
goog.provide('ontology.annotations');
goog.require('cljs.core');
goog.require('ontology.components');
ontology.annotations.annotationRoles = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, ["rdfs:seeAlso",null,"owl:versionInfo",null,"owl:priorVersion",null,"owl:incompatibleWith",null,"rdfs:label",null,"rdfs:comment",null,"owl:deprecated",null,"owl:backwardCompatibleWith",null,"rdfs:isDefinedBy",null], null), null);
/**
 * AnnotationProperty := IRI
 */
ontology.annotations.annotationRole = (function ontology$annotations$annotationRole(var_args){
var G__666 = arguments.length;
switch (G__666) {
case 1:
return ontology.annotations.annotationRole.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.annotations.annotationRole.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.annotations.annotationRole.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.annotations.annotationRole.cljs$core$IFn$_invoke$arity$1 = (function (iri){
if(typeof iri === 'string'){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"reserved","reserved",-775228297),ontology.components.isReservedIRI_QMARK_.call(null,iri),new cljs.core.Keyword(null,"iri","iri",423917494),iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139)], null);
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(iri))){
return cljs.core.assoc.call(null,iri,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139));
} else {
throw (new ontology.annotations.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.annotations","notStringIRI","ontology.annotations/notStringIRI",-1913577273),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
}
}
}));

(ontology.annotations.annotationRole.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
if(((typeof iri === 'string') && (typeof prefix === 'string'))){
var check_668 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('');
new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"reserved","reserved",-775228297),ontology.components.isReservedIRI_QMARK_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('')),new cljs.core.Keyword(null,"short","short",1928760516),iri,new cljs.core.Keyword(null,"prefix","prefix",-265908465),prefix,new cljs.core.Keyword(null,"iri","iri",423917494),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('')], null);
} else {
}

throw (new ontology.annotations.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.annotations","notStringIRI","ontology.annotations/notStringIRI",-1913577273),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
}));

(ontology.annotations.annotationRole.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
if(((((typeof iri === 'string') && (typeof namespace === 'string'))) && (typeof prefix === 'string'))){
var check_669 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('');
new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"reserved","reserved",-775228297),ontology.components.isReservedIRI_QMARK_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(prefix),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri)].join('')),new cljs.core.Keyword(null,"namespace","namespace",-377510372),namespace,new cljs.core.Keyword(null,"short","short",1928760516),iri,new cljs.core.Keyword(null,"prefix","prefix",-265908465),prefix,new cljs.core.Keyword(null,"iri","iri",423917494),["<",cljs.core.str.cljs$core$IFn$_invoke$arity$1(namespace),cljs.core.str.cljs$core$IFn$_invoke$arity$1(iri),">"].join('')], null);
} else {
}

throw (new ontology.annotations.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.annotations","notStringIRI","ontology.annotations/notStringIRI",-1913577273),new cljs.core.Keyword(null,"iri","iri",423917494),iri], null))));
}));

(ontology.annotations.annotationRole.cljs$lang$maxFixedArity = 3);

/**
 * AnnotationValue := AnonymousIndividual | IRI | Literal
 */
ontology.annotations.annotationValue = (function ontology$annotations$annotationValue(value){
if(typeof value === 'string'){
return cljs.core.assoc.call(null,ontology.components.stringLiteralNoLanguage.call(null,value),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(value),new cljs.core.Keyword(null,"literal","literal",1664775605))){
return cljs.core.assoc.call(null,value,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(value),new cljs.core.Keyword(null,"anonymousIndividual","anonymousIndividual",561214977))){
return cljs.core.assoc.call(null,value,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456));
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(value))){
return cljs.core.assoc.call(null,value,new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456));
} else {
throw (new ontology.annotations.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.annotations","notAnnotationValue","ontology.annotations/notAnnotationValue",152739592),new cljs.core.Keyword(null,"value","value",305978217),value], null))));
}
}
}
}
});
/**
 * annotationAnnotations := { Annotation }
 */
ontology.annotations._metaAnnotations = (function ontology$annotations$_metaAnnotations(annotations){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"annotation","annotation",-344661666));
}),annotations)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"metaAnnotations","metaAnnotations",543163467),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"metaAnnotations","metaAnnotations",543163467)], null);
} else {
throw (new ontology.annotations.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.annotations","notAnnotations","ontology.annotations/notAnnotations",1700745366),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
});
ontology.annotations.metaAnnotations = (function ontology$annotations$metaAnnotations(annotations){
return ontology.annotations._metaAnnotations.call(null,annotations);
});
/**
 * Annotation := 'Annotation' '(' annotationAnnotations AnnotationProperty AnnotationValue ')'
 */
ontology.annotations._annotation = (function ontology$annotations$_annotation(var_args){
var G__671 = arguments.length;
switch (G__671) {
case 2:
return ontology.annotations._annotation.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.annotations._annotation.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.annotations._annotation.cljs$core$IFn$_invoke$arity$2 = (function (annotationRole,annotationValue){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationRole),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationValue),new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456))))){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456),annotationValue,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotation","annotation",-344661666),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotation","annotation",-344661666)], null);
} else {
throw (new ontology.annotations.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.annotations","notAnnotationRoleAndValue","ontology.annotations/notAnnotationRoleAndValue",-1325740662),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456),annotationValue], null))));
}
}));

(ontology.annotations._annotation.cljs$core$IFn$_invoke$arity$3 = (function (annotations,annotationRole,annotationValue){
if(((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationRole),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotationValue),new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456))))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"metaAnnotations","metaAnnotations",543163467))){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"annotations","annotations",1640956248),new cljs.core.Keyword(null,"annotations","annotations",1640956248).cljs$core$IFn$_invoke$arity$1(annotations),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456),annotationValue,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotation","annotation",-344661666),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotation","annotation",-344661666)], null);
} else {
throw (new ontology.annotations.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.annotations","notAnnotations","ontology.annotations/notAnnotations",1700745366),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
} else {
throw (new ontology.annotations.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.annotations","notAnnotationRoleAndValue","ontology.annotations/notAnnotationRoleAndValue",-1325740662),new cljs.core.Keyword(null,"annotationRole","annotationRole",-514733139),annotationRole,new cljs.core.Keyword(null,"annotationValue","annotationValue",1879888456),annotationValue,new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
}));

(ontology.annotations._annotation.cljs$lang$maxFixedArity = 3);

ontology.annotations.annotation = (function ontology$annotations$annotation(var_args){
var G__674 = arguments.length;
switch (G__674) {
case 2:
return ontology.annotations.annotation.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.annotations.annotation.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.annotations.annotation.cljs$core$IFn$_invoke$arity$2 = (function (role,value){
return ontology.annotations._annotation.call(null,ontology.annotations.annotationRole.call(null,role),ontology.annotations.annotationValue.call(null,value));
}));

(ontology.annotations.annotation.cljs$core$IFn$_invoke$arity$3 = (function (annotations,role,value){
return ontology.annotations._annotation.call(null,ontology.annotations.metaAnnotations.call(null,annotations),ontology.annotations.annotationRole.call(null,role),ontology.annotations.annotationValue.call(null,value));
}));

(ontology.annotations.annotation.cljs$lang$maxFixedArity = 3);

/**
 * AnnotationSubject := IRI | AnonymousIndividual
 */
ontology.annotations.annotationSubject = (function ontology$annotations$annotationSubject(subject){
if(cljs.core.truth_(new cljs.core.Keyword(null,"iri","iri",423917494).cljs$core$IFn$_invoke$arity$1(subject))){
return cljs.core.assoc.call(null,subject,new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"annotationSubject","annotationSubject",-569521707),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationSubject","annotationSubject",-569521707));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"innerType","innerType",-115667780).cljs$core$IFn$_invoke$arity$1(subject),new cljs.core.Keyword(null,"anonymousIndividual","anonymousIndividual",561214977))){
return cljs.core.assoc.call(null,subject,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"annotationSubject","annotationSubject",-569521707));
} else {
throw (new ontology.annotations.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.annotations","notAnnotationSubject","ontology.annotations/notAnnotationSubject",1001726638),new cljs.core.Keyword(null,"subject","subject",-1411880451),subject], null))));
}
}
});
/**
 * axiomAnnotations := { Annotation }
 */
ontology.annotations._axiomAnnotations = (function ontology$annotations$_axiomAnnotations(annotations){
if(cljs.core.every_QMARK_.call(null,(function (x){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"annotation","annotation",-344661666));
}),annotations)){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"axiomAnnotations","axiomAnnotations",-2077370945)], null);
} else {
throw (new ontology.annotations.Exception(cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("ontology.annotations","notAnnotations","ontology.annotations/notAnnotations",1700745366),new cljs.core.Keyword(null,"annotations","annotations",1640956248),annotations], null))));
}
});
ontology.annotations.axiomAnnotations = (function ontology$annotations$axiomAnnotations(annotations){
return ontology.annotations._axiomAnnotations.call(null,annotations);
});
/**
 * Datatype := IRI
 */
ontology.annotations.annotationDataType = (function ontology$annotations$annotationDataType(var_args){
var G__677 = arguments.length;
switch (G__677) {
case 1:
return ontology.annotations.annotationDataType.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return ontology.annotations.annotationDataType.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return ontology.annotations.annotationDataType.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(ontology.annotations.annotationDataType.cljs$core$IFn$_invoke$arity$1 = (function (iri){
return cljs.core.assoc.call(null,ontology.components.XSDDatatype.call(null,iri),new cljs.core.Keyword(null,"arity","arity",-1808556135),(1),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataType","dataType",1069893619),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataType","dataType",1069893619));
}));

(ontology.annotations.annotationDataType.cljs$core$IFn$_invoke$arity$2 = (function (prefix,iri){
return cljs.core.assoc.call(null,ontology.components.XSDDatatype.call(null,prefix,iri),new cljs.core.Keyword(null,"arity","arity",-1808556135),(1),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataType","dataType",1069893619),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataType","dataType",1069893619));
}));

(ontology.annotations.annotationDataType.cljs$core$IFn$_invoke$arity$3 = (function (prefix,iri,namespace){
return cljs.core.assoc.call(null,ontology.components.XSDDatatype.call(null,prefix,iri,namespace),new cljs.core.Keyword(null,"arity","arity",-1808556135),(1),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"dataType","dataType",1069893619),new cljs.core.Keyword(null,"innerType","innerType",-115667780),new cljs.core.Keyword(null,"dataType","dataType",1069893619));
}));

(ontology.annotations.annotationDataType.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=annotations.js.map
