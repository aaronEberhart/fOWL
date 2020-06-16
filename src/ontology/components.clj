(ns ontology.components
	(:refer-clojure :exclude [name])
	(:require [clojure.string :as str][clojure.set :as set][clojure.core.reducers :as r])
	(:use [slingshot.slingshot :only [throw+]])
	)

(def xsdNS
	 "http://www.w3.org/2001/XMLSchema#")
(def rdfNS
	 "http://www.w3.org/1999/02/22rdfsyntaxns#")
(def rdfsNS
	 "http://www.w3.org/2000/01/rdfschema#")
(def owlNS
	"http://www.w3.org/2002/07/owl#")
(def dataRangeTypes
	#{:dataRange :dataType :dataAnd :dataOr :dataNot :dataOneOf :datatypeRestriction})
(def nameTypes
	#{:className :dataType :roleName :dataRoleName :annotationRole :namedIndividual})
(def reservedIRIs
	#{"owl:backwardCompatibleWith"	"owl:deprecated" "owl:incompatibleWith"	"owl:priorVersion"	"owl:rational"
		"owl:real" "owl:versionInfo"	"rdf:langRange"	"rdf:PlainLiteral" "rdf:XMLLiteral"	"rdfs:comment"	"rdfs:isDefinedBy"
		"rdfs:label" "rdfs:seeAlso"	"xsd:anyURI"	"xsd:base64Binary"	"xsd:boolean"	"xsd:byte" "xsd:dateTime"	"xsd:dateTimeStamp"	"xsd:decimal"	"xsd:double"	"xsd:float"
		"xsd:hexBinary" "xsd:int" "xsd:integer"	"xsd:language"	"xsd:length" "xsd:long"	"xsd:maxExclusive"	"xsd:maxInclusive"	"xsd:maxLength"	"xsd:minExclusive" "xsd:minInclusive"
		"xsd:minLength" "xsd:Name" "xsd:NCName" "xsd:negativeInteger" "xsd:NMTOKEN"	"xsd:nonNegativeInteger"	"xsd:nonPositiveInteger"	"xsd:normalizedString"	"xsd:pattern"
		"xsd:positiveInteger"	"xsd:short"	"xsd:string" "xsd:token" "xsd:unsignedByte" "xsd:unsignedInt"	"xsd:unsignedLong"	"xsd:unsignedShort"})
(def dataTypeMaps
	#{"rdfs:Literal" "owl:rational"	"owl:real" "xsd:double"	"xsd:float"	"xsd:decimal"	"xsd:integer" "xsd:long"	"xsd:int"	"xsd:short"	"xsd:byte" "xsd:nonNegativeInteger"	"xsd:nonPositiveInteger"
	"xsd:positiveInteger"	"xsd:negativeInteger" "xsd:unsignedLong"	"xsd:unsignedInt" "xsd:unsignedShort"	"xsd:unsignedByte" "rdf:PlainLiteral" "xsd:string"	"xsd:NCName"	"xsd:Name"
	"xsd:NMTOKEN" "xsd:token"	"xsd:language"	"xsd:normalizedString" "xsd:boolean" "xsd:base64Binary"	"xsd:hexBinary" "xsd:anyURI" "xsd:dateTime" "xsd:dateTimeStamp" "rdf:XMLLiteral"})

(def Top
	{:namespace owlNS :short "Thing" :prefix "owl:" :iri (str "<" owlNS "Thing" ">") :type :class :innerType :top})
(def Bot
	{:namespace owlNS :short "Nothing" :prefix "owl:" :iri (str "<" owlNS "Nothing" ">") :type :class :innerType :bot})
(def RDFSLiteral
	{:namespace rdfsNS :short "Literal" :prefix "rdfs:" :iri (str "<" rdfsNS "Literal" ">") :arity 1 :type :dataType :innerType :dataType})
(def TopRole
	{:namespace owlNS :short "topObjectProperty" :prefix "owl:" :iri (str "<" owlNS "topObjectProperty" ">") :type :role :innerType :roleTop})
(def BotRole
	{:namespace owlNS :short "bottomObjectProperty" :prefix "owl:" :iri (str "<" owlNS "bottomObjectProperty" ">") :type :role :innerType :roleBot})
(def TopData
	{:namespace owlNS :short "topDataProperty" :prefix "owl:" :iri (str "<" owlNS "topDataProperty" ">") :type :dataRole :innerType :dataRoleName})
(def BotData
	{:namespace owlNS :short "bottomDataProperty" :prefix "owl:" :iri (str "<" owlNS "bottomDataProperty" ">") :type :dataRole :innerType :dataRoleName})

(defn isReservedIRI? [iri]
	(contains? reservedIRIs iri))

(defn namespace= [iri1 iri2]
	(= (:namespace iri1)(:namespace iri2)))

(defn type= [a b]
	(= (:type a)(:type b)))

(defn innerType= [a b]
	(= (:innerType a)(:innerType b)))

(defn XSDDatatype
	"Type unknown for this function"
	([iri]
		(if (not (string? iri))
			(throw+ {:type ::notStringIRI :iri iri})
			{:knownDataType (contains? dataTypeMaps iri) :namespace "" :short iri :prefix "" :iri iri}))
	([iri namespace prefix]
		(if (not (and (and (string? iri)(string? namespace))(string? prefix)))
			(throw+ {:type ::notStringIRI :iri iri})
			{:knownDataType (contains? dataTypeMaps (str prefix iri)) :namespace namespace :short iri :prefix prefix :iri (str "<" namespace iri ">")})))
(defn- OWLReservedIRI
	"Type unknown for this function"
	([iri]
		(if (not (string? iri))
			(throw+ {:type ::notStringIRI :iri iri})
			(if (not (isReservedIRI? iri))
				(throw+ {:type ::reservedIRI :iri iri})
				{:namespace "" :short iri :prefix "" :iri (str "<" iri ">")})))
	([iri prefix namespace prefix]
		(if (or (or (not (string? iri))(not (string? namespace)))(not (string? prefix)))
			(throw+ {:type ::notStringIRI :iri iri})
			(let [check (str namespace iri)]
				(if (not (isReservedIRI? check))
					(throw+ {:type ::reservedIRI :iri check})
					{:namespace namespace :short iri :prefix prefix :iri (str "<" namespace iri  ">")})))))
(defn- RDFReservedIRI
	"Type unknown for this function"
	([iri]
		(if (not (string? iri))
			(throw+ {:type ::notStringIRI :iri iri})
			(if (not (isReservedIRI? iri))
				(throw+ {:type ::reservedIRI :iri iri})
				{:namespace "" :short iri :prefix "" :iri (str "<" iri ">")})))
	([iri namespace prefix]
		(if (or (or (not (string? iri))(not (string? namespace)))(not (string? prefix)))
			(throw+ {:type ::notStringIRI :iri iri})
			(let [check (str namespace iri)]
				(if (not (isReservedIRI? check))
					(throw+ {:type ::reservedIRI :iri check})
					{:namespace namespace :short iri :prefix prefix :iri (str "<" namespace iri  ">")})))))
(defn- RDFSReservedIRI
	"Type unknown for this function"
	([iri]
		(if (not (string? iri))
			(throw+ {:type ::notStringIRI :iri iri})
			(if (not (isReservedIRI? iri))
				(throw+ {:type ::reservedIRI :iri iri})
				{:namespace "" :short iri :prefix "" :iri (str "<" iri ">")})))
	([iri namespace prefix]
		(if (or (or (not (string? iri))(not (string? namespace)))(not (string? prefix)))
			(throw+ {:type ::notStringIRI :iri iri})
			(let [check (str namespace iri)]
				(if (not (isReservedIRI? check))
					(throw+ {:type ::reservedIRI :iri check})
					{:namespace namespace :short iri :prefix prefix :iri (str "<" namespace iri  ">")})))))

(defn IRI
	"IRI := String"
	([iri]
		(if (string? iri)
			{:reserved (isReservedIRI? iri) :namespace nil :short iri :prefix nil :iri (str "<" iri ">")}
			(if (:iri iri)
				iri
				(throw+ {:type ::notIRI :iri iri}))))
	([iri namespace prefix]
		(if (and (and (string? iri)(string? namespace))(string? prefix))
			{:reserved (isReservedIRI? (str prefix iri)) :namespace namespace :short iri :prefix prefix :iri (str "<" namespace iri  ">")}
			(throw+ {:type ::notStringIRI :iri iri}))))

(defn className
	"Class := IRI"
	([iri]
		(assoc iri :innerType :className :type :className))
	([iri namespace prefix]
		(assoc (IRI iri namespace prefix) :innerType :className :type :className)))

(defn roleName
	"ObjectProperty := IRI"
	([iri]
		(assoc iri :type :roleName :innerType :roleName))
	([iri namespace prefix]
		(assoc (IRI iri namespace prefix) :type :roleName :innerType :roleName)))

(defn- -inverseRoleName [role]
	"InverseObjectProperty := 'ObjectInverseOf' '(' ObjectProperty ')'"
	(if (= (:type role) :roleName)
		(assoc role :innerType :inverseRoleName)
		(throw+ {:type ::notRole :roleName role})))

(defn inverseRoleName
	([iri]
		(-inverseRoleName (roleName iri)))
	([iri namespace prefix]
		(-inverseRoleName (roleName iri namespace prefix))))

(defn dataRoleName
	"DataProperty := IRI"
	([iri](assoc iri :type :dataRoleName :innerType :dataRoleName))
	([iri namespace prefix](assoc (IRI iri namespace prefix) :type :dataRoleName :innerType :dataRoleName)))

(defn- -namedIndividual
	"NamedIndividual := IRI"
	([iri](assoc iri :type :namedIndividual :innerType :namedIndividual))
	([iri namespace prefix](assoc (IRI iri namespace prefix) :type :namedIndividual :innerType :namedIndividual)))

(defn- -anonymousIndividual
	"AnonymousIndividual := nodeID"
	([iri](assoc iri :type :anonymousIndividual :innerType :anonymousIndividual))
	([iri namespace prefix](assoc (IRI iri namespace prefix) :type :anonymousIndividual :innerType :anonymousIndividual)))

(defn- -individual [anyIndividual]
	"Individual := AnonymousIndividual | NamedIndividual"
	(if (or (= (:type anyIndividual) :anonymousIndividual)(= (:type anyIndividual) :namedIndividual))
		(assoc anyIndividual :type :individual)
		(throw+ {:type ::notIndividual :individual anyIndividual})))

(defn individual
	([iri]
		(-individual (if (= (:prefix iri) "_")(-anonymousIndividual iri)(-namedIndividual iri))))
	([iri namespace prefix]
		(-individual (if (= prefix "_")(-anonymousIndividual iri namespace prefix)(-namedIndividual iri namespace prefix)))))

(defn- -dataType
	"Datatype := IRI"
	([iri]
		(if (:iri iri)
			(assoc iri :arity 1 :type :dataType :innerType :dataType)
			(throw+ {:type ::notdataType :iri iri})))
	([iri namespace prefix]
		(if (or (= (str prefix iri) "rdfs:Literal")(or (contains? dataTypeMaps (str prefix iri)) (not (isReservedIRI? (str prefix iri)))))
			(assoc (XSDDatatype iri namespace prefix) :arity 1 :type :dataType :innerType :dataType)
			(throw+ {:type ::notdataType :iri iri :namespace namespace}))))

(defn- -literal [literal]
	"Literal := typedLiteral | stringLiteralNoLanguage | stringLiteralWithLanguage"
	(if (or (or (= (:type literal) :typedLiteral)(= (:type literal) :stringLiteralNoLanguage))(= (:type literal) :stringLiteralWithLanguage))
		(assoc literal :arity 1 :type :literal)
		(throw+ {:type ::notLiteral :literal literal})))

(defn- -typedLiteral [lexicalForm datatype]
	"typedLiteral := lexicalForm '^^' Datatype"
	(if (and (= (:type lexicalForm) :lexicalForm)(= (:type datatype) :dataType))
		(assoc datatype :value (str (:value lexicalForm) \^ \^  (:prefix datatype)(:short datatype)) :type :typedLiteral :innerType :typedLiteral)
		(throw+ {:type ::notTypedLiteral :lexicalForm lexicalForm :dataType datatype})))

(defn- -lexicalForm [stri]
	"lexicalForm := quotedString"
	(if (string? stri)
		{:value  stri :type :lexicalForm :innerType :lexicalForm}
		(throw+ {:type ::notString :string stri})))

(defn typedLiteral [lexicalForm datatype]
	(-literal (-typedLiteral (-lexicalForm lexicalForm) (-dataType datatype))))

(defn- -stringLiteralNoLanguage [string]
	"stringLiteralNoLanguage := quotedString"
	(if (string? string)
		{:value (str string) :type :stringLiteralNoLanguage :innerType :stringLiteralNoLanguage}
		(throw+ {:type ::notStringLiteral :string string})))

(defn stringLiteralNoLanguage [string]
	(-literal (-stringLiteralNoLanguage string)))

(defn- -stringLiteralWithLanguage [string lang]
	"stringLiteralWithLanguage := quotedString languageTag"
	(if (and (string? string) (string? lang))
		{:value (str string \@ lang) :type :stringLiteralWithLanguage :innerType :stringLiteralWithLanguage}
		(throw+ {:type ::notStringLiteralWithLang :string string :lang lang})))

(defn stringLiteralWithLanguage [string lang]
	(-literal (-stringLiteralWithLanguage string lang)))

(defn- -dataOneOf [literals]
	"DataOneOf := 'DataOneOf' '(' Literal { Literal } ')'"
	(if (or (and (set? literals) (every? (fn [x] (= (:type x) :literal)) literals))(= (:type literals) :literal))
		{:literals literals :arity 1 :type :dataOneOf :innerType :dataOneOf}
		(throw+ {:type ::notLiterals :literals literals})))

(defn- -constrainingFacet [iri]
	"constrainingFacet := IRI"
	(if (:iri iri)
		(assoc iri :type :constrainingFacet)
		(throw+ {:type ::notFacet :facet iri})))

(defn- -restrictionValue [literal]
	"restrictionValue := Literal"
	(if (= (:type literal) :literal)
		(assoc literal :type :restrictionValue)
		(throw+ {:type ::notLiteral :literal literal})))

(defn- -restrictedValue [facet restriction]
	"RestrictedFacet := constrainingFacet restrictionValue"
	(if (and (= (:type restriction) :restrictionValue)(= (:type facet) :constrainingFacet))
		(assoc facet :value (:value restriction) :type :restrictedValue :innerType :restrictedValue)
		(throw+ {:type ::notRestrictedValue :facet facet :restriction restriction})))

(defn restrictedValue [facet restriction]
	(-restrictedValue (-constrainingFacet facet) (-restrictionValue restriction)))

(defn- -datatypeRestriction [datatype restrictedvalues]
	"DatatypeRestriction := 'DatatypeRestriction' '(' Datatype RestrictedFacet { RestrictedFacet } ')'"
	(if (and (and (and (> (count restrictedvalues) 0) (every? (fn [x] (= (:type x) :restrictedValue)) restrictedvalues))(= (:innerType datatype) :dataType))(every? (fn [x] (= (:arity x) (:arity (first restrictedvalues)))) restrictedvalues))
		(assoc datatype :restrictedValues restrictedvalues :type :datatypeRestriction  :innerType :datatypeRestriction)
		(throw+ {:type ::notDatatypeRestriction :datatype datatype :restrictedvalues restrictedvalues})))

(defn- -dataAnd [dataranges]
	"DataIntersectionOf := 'DataIntersectionOf' '(' DataRange DataRange { DataRange } ')'"
	(if (and (every? (fn [x] (= (:type x) :dataRange)) dataranges)(every? (fn [x] (= (:arity x) (:arity (first dataranges)))) dataranges))
		{:dataRanges dataranges :arity (:arity (first dataranges)) :type :dataAnd :innerType :dataAnd}
		(throw+ {:type ::notDataAnd :dataRanges	dataranges})))

(defn- -dataOr [dataranges]
	"DataUnionOf := 'DataUnionOf' '(' DataRange DataRange { DataRange } ')'"
	(if (and (every? (fn [x] (= (:type x) :dataRange)) dataranges)(every? (fn [x] (= (:arity x) (:arity (first dataranges)))) dataranges))
		{:dataRanges dataranges :arity (:arity (first dataranges)) :type :dataOr :innerType :dataOr}
		(throw+ {:type ::notDataOr :dataRanges	dataranges})))

(defn- -dataNot [datarange]
	"DataComplementOf := 'DataComplementOf' '(' DataRange ')'"
	(if (= (:type datarange) :dataRange)
		{:dataRange datarange :arity (:arity datarange) :type :dataNot :innerType :dataNot}
		(throw+ {:type ::notDataNot :datarange	datarange})))

(defn- -dataRange [datarange]
	"DataRange := Datatype | DataIntersectionOf | DataUnionOf | DataComplementOf | DataOneOf | DatatypeRestriction"
	(if (contains? dataRangeTypes (:type datarange))
		(assoc datarange :type :dataRange)
		(throw+ {:type ::notDataRange :dataRange datarange})))

(defn dataType
	([iri]
		(if (string? iri)
			(-dataRange (-dataType (IRI iri)))
			(if (contains? iri :type)
				(if (and (= (:innerType iri) :dataType)(= (:type iri) :dataRange))
					iri
					(if (= (:innerType iri) :dataType)
						(-dataRange iri)
						(throw+ {:type ::notDataType :dataType iri})))
				(-dataRange (-dataType iri)))))
	([iri namespace prefix]
		(-dataRange (-dataType (XSDDatatype iri namespace prefix)))))

(defn dataRange [dr]
	(if (contains? dr :type)
		(-dataRange dr)
		(dataType dr)))

(defn dataAnd [datarange1 datarange2 & dataranges]
	(-dataRange (-dataAnd (into #{} (map dataRange [datarange1 datarange2 dataranges])))))

(defn dataOr [datarange1 datarange2 & dataranges]
	(-dataRange (-dataOr (into #{} (map dataRange [datarange1 datarange2 dataranges])))))

(defn dataNot [datarange]
	(-dataRange (-dataNot (dataRange datarange))))

(defn dataOneOf [literal & literals]
	(-dataRange (-dataOneOf (into #{} [literal literals]))))

(defn datatypeRestriction
	[datatype restrictedvalues]
		(-dataRange (-datatypeRestriction (dataType datatype) (into #{} (map restrictedValue (filter #(nil? (:type %)) restrictedvalues) (filter #(= (:type %) :literal) restrictedvalues))))))

(defn name [thing]
  "Entity := 'Class' '(' Class ')' | 'Datatype' '(' Datatype ')' | 'ObjectProperty' '(' ObjectProperty ')' | 'DataProperty' '(' DataProperty ')' | 'AnnotationProperty' '(' AnnotationProperty ')' | 'NamedIndividual' '(' NamedIndividual ')'"
	(if (contains? nameTypes (:innerType thing))
		(assoc thing :type :name)
		(throw+ {:type ::notName :name thing})))

(comment "
nonNegativeInteger := a nonempty finite sequence of digits between 0 and 9
";quotedString := a finite sequence of characters in which " (U+22) and \ (U+5C) occur only in pairs of the form \" (U+5C, U+22) and \\ (U+5C, U+5C), enclosed in a pair of " (U+22) characters
"languageTag := @ (U+40) followed a nonempty sequence of characters matching the langtag production from [BCP 47]
nodeID := a finite sequence of characters matching the BLANK_NODE_LABEL production of [SPARQL]

fullIRI := an IRI as defined in [RFC3987], enclosed in a pair of < (U+3C) and > (U+3E) characters
prefixName := a finite sequence of characters matching the as PNAME_NS production of [SPARQL]
abbreviatedIRI := a finite sequence of characters matching the PNAME_LN production of [SPARQL]
IRI := fullIRI | abbreviatedIRI
")
