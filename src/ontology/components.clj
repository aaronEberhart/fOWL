(ns ontology.components
 (:refer-clojure :exclude [name])
 (:require [clojure.string :as str][clojure.set :as set])
 (:use [slingshot.slingshot :only [throw+]]))

(def xsdNS
  "http://www.w3.org/2001/XMLSchema#")
(def rdfNS
  "http://www.w3.org/1999/02/22rdfsyntaxns#")
(def rdfsNS
  "http://www.w3.org/2000/01/rdfschema#")
(def owlNS
 "http://www.w3.org/2002/07/owl#")

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
(def dataRangeTypes
 #{:dataRange :dataType :dataAnd :dataOr :dataNot :dataOneOf :datatypeRestriction})
(def nameTypes
 #{:className :dataType :roleName :dataRoleName :annotationRole :namedIndividual})

(def reservedIRIs
 #{"owl:backwardCompatibleWith" "owl:deprecated" "owl:incompatibleWith" "owl:priorVersion" "owl:rational"
  "owl:real" "owl:versionInfo" "rdf:langRange" "rdf:PlainLiteral" "rdf:XMLLiteral" "rdfs:comment" "rdfs:isDefinedBy"
  "rdfs:label" "rdfs:seeAlso" "xsd:anyURI" "xsd:base64Binary" "xsd:boolean" "xsd:byte" "xsd:dateTime" "xsd:dateTimeStamp" "xsd:decimal" "xsd:double" "xsd:float"
  "xsd:hexBinary" "xsd:int" "xsd:integer" "xsd:language" "xsd:length" "xsd:long" "xsd:maxExclusive" "xsd:maxInclusive" "xsd:maxLength" "xsd:minExclusive" "xsd:minInclusive"
  "xsd:minLength" "xsd:Name" "xsd:NCName" "xsd:negativeInteger" "xsd:NMTOKEN" "xsd:nonNegativeInteger" "xsd:nonPositiveInteger" "xsd:normalizedString" "xsd:pattern"
  "xsd:positiveInteger" "xsd:short" "xsd:string" "xsd:token" "xsd:unsignedByte" "xsd:unsignedInt" "xsd:unsignedLong" "xsd:unsignedShort"})
(def dataTypeMaps
 #{"rdfs:Literal" "owl:rational" "owl:real" "xsd:double" "xsd:float" "xsd:decimal" "xsd:integer" "xsd:long" "xsd:int" "xsd:short" "xsd:byte" "xsd:nonNegativeInteger" "xsd:nonPositiveInteger"
 "xsd:positiveInteger" "xsd:negativeInteger" "xsd:unsignedLong" "xsd:unsignedInt" "xsd:unsignedShort" "xsd:unsignedByte" "rdf:PlainLiteral" "xsd:string" "xsd:NCName" "xsd:Name"
 "xsd:NMTOKEN" "xsd:token" "xsd:language" "xsd:normalizedString" "xsd:boolean" "xsd:base64Binary" "xsd:hexBinary" "xsd:anyURI" "xsd:dateTime" "xsd:dateTimeStamp" "rdf:XMLLiteral"})

(defn- isReservedIRI? [iri]
 (contains? reservedIRIs iri))

(defn XSDDatatype
 "IRI := String"
 ([iri]
  (if (not (string? iri))
   (throw+ {:type ::notStringIRI :iri iri})
   {:knownDataType (contains? dataTypeMaps iri) :iri iri}))
 ([iri namespace prefix]
  (if (not (and (and (string? iri)(string? namespace))(string? prefix)))
   (throw+ {:type ::notStringIRI :iri iri})
   {:knownDataType (contains? dataTypeMaps (str prefix iri)) :namespace namespace :short iri :prefix prefix :iri (str "<" namespace iri ">")})))
(defn- OWLReservedIRI
 "IRI := String"
 ([iri]
  (if (not (string? iri))
   (throw+ {:type ::notStringIRI :iri iri})
   (if (not (isReservedIRI? iri))
    (throw+ {:type ::reservedIRI :iri iri})
    {:namespace nil :short iri ::iri iri})))
 ([iri prefix namespace prefix]
  (if (or (or (not (string? iri))(not (string? namespace)))(not (string? prefix)))
   (throw+ {:type ::notStringIRI :iri iri})
   (let [check (str namespace iri)]
    (if (not (isReservedIRI? check))
     (throw+ {:type ::reservedIRI :iri check})
     {:namespace namespace :short iri :prefix prefix :iri (str "<" namespace iri  ">")})))))
(defn- RDFReservedIRI
 "IRI := String"
 ([iri]
  (if (not (string? iri))
   (throw+ {:type ::notStringIRI :iri iri})
   (if (not (isReservedIRI? iri))
    (throw+ {:type ::reservedIRI :iri iri})
    {:namespace nil :short iri :iri iri})))
 ([iri namespace prefix]
  (if (or (or (not (string? iri))(not (string? namespace)))(not (string? prefix)))
   (throw+ {:type ::notStringIRI :iri iri})
   (let [check (str namespace iri)]
    (if (not (isReservedIRI? check))
     (throw+ {:type ::reservedIRI :iri check})
     {:namespace namespace :short iri :prefix prefix :iri (str "<" namespace iri  ">")})))))
(defn- RDFSReservedIRI
 "IRI := String"
 ([iri]
  (if (not (string? iri))
   (throw+ {:type ::notStringIRI :iri iri})
   (if (not (isReservedIRI? iri))
    (throw+ {:type ::reservedIRI :iri iri})
    {:reserved true :iri iri})))
 ([iri namespace prefix]
  (if (or (or (not (string? iri))(not (string? namespace)))(not (string? prefix)))
   (throw+ {:type ::notStringIRI :iri iri})
   (let [check (str namespace iri)]
    (if (not (isReservedIRI? check))
     (throw+ {:type ::reservedIRI :iri check})
     {:reserved true :namespace namespace :short iri :prefix prefix :iri (str "<" namespace iri  ">")})))))

(defn IRI
 "IRI := String"
 ([iri]
  (if (string? iri)
   {:reserved (isReservedIRI? iri) :iri iri}
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
 	(if (string? iri)
  	(assoc (IRI iri) :innerType :className :type :className)
  	(if (contains? iri :type)
  		(throw+ {:type ::notClassName :iri iri})
  		(assoc iri :innerType :className :type :className))))
 ([iri namespace prefix]
  (assoc (IRI iri namespace prefix) :innerType :className :type :className)))

(defn roleName
 "ObjectProperty := IRI"
 ([iri]
 	(if (string? iri)
  	(assoc (IRI iri) :type :roleName :innerType :roleName)
  	(if (contains? iri :type)
  		(throw+ {:type ::notRoleName :iri iri})
  		(assoc iri :type :roleName :innerType :roleName))))
 ([iri namespace prefix]
  (assoc (IRI iri namespace prefix) :type :roleName :innerType :roleName)))

(defn- -inverseRoleName 
 "InverseObjectProperty := 'ObjectInverseOf' '(' ObjectProperty ')'"
 [role]
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
 ([iri]
  (assoc iri :type :dataRoleName :innerType :dataRoleName))
 ([iri namespace prefix]
  (assoc (IRI iri namespace prefix) :type :dataRoleName :innerType :dataRoleName)))

(defn- -namedIndividual
 "NamedIndividual := IRI"
 ([iri]
  (assoc iri :type :namedIndividual :innerType :namedIndividual))
 ([iri namespace prefix]
  (assoc (IRI iri namespace prefix) :type :namedIndividual :innerType :namedIndividual)))

(defn- -anonymousIndividual
 "AnonymousIndividual := nodeID"
 ([iri]
  (assoc iri :type :anonymousIndividual :innerType :anonymousIndividual))
 ([iri namespace prefix]
  (assoc (IRI iri namespace prefix) :type :anonymousIndividual :innerType :anonymousIndividual)))

(defn- -individual 
 "Individual := AnonymousIndividual | NamedIndividual"
 [anyIndividual]
 (if (or (= (:type anyIndividual) :anonymousIndividual)(= (:type anyIndividual) :namedIndividual))
  (assoc anyIndividual :type :individual)
  (throw+ {:type ::notIndividual :individual anyIndividual})))

(defn individual
 ([iri]
  (if (string? iri)
  	(-individual (-namedIndividual (IRI iri)))
  	(-individual (if (= (:prefix iri) "_")(-anonymousIndividual iri)(-namedIndividual iri)))))
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

(defn dataType
 ([iri]
  (if (string? iri)
   (-dataType (IRI iri))
   (if (contains? iri :type)
    (if (= (:innerType iri) :dataType)
     iri
     (throw+ {:type ::notDataType :dataType iri}))
    (-dataType iri))))
 ([iri namespace prefix]
  (-dataType (XSDDatatype iri namespace prefix))))

(defn- -literal 
 "Literal := typedLiteral | stringLiteralNoLanguage | stringLiteralWithLanguage"
 [literal]
 (if (or (or (= (:type literal) :typedLiteral)(= (:type literal) :stringLiteralNoLanguage))(= (:type literal) :stringLiteralWithLanguage))
  (assoc literal :arity 1 :type :literal)
  (throw+ {:type ::notLiteral :literal literal})))

(defn- -typedLiteral 
 "typedLiteral := lexicalForm '^^' Datatype"
 [lexicalForm datatype]
 (if (and (= (:type lexicalForm) :lexicalForm)(= (:type datatype) :dataType))
  (assoc datatype :value (str (:value lexicalForm) \^ \^  (:prefix datatype)":"(:short datatype)) :type :typedLiteral :innerType :typedLiteral)
  (throw+ {:type ::notTypedLiteral :lexicalForm lexicalForm :dataType datatype})))

(defn- -lexicalForm 
 "lexicalForm := quotedString"
 [stri]
 (if (string? stri)
  {:value  stri :type :lexicalForm :innerType :lexicalForm}
  (throw+ {:type ::notString :string stri})))

(defn typedLiteral [lexicalForm datatype]
 (-literal (-typedLiteral (-lexicalForm lexicalForm) (dataType datatype))))

(defn- -stringLiteralNoLanguage 
 "stringLiteralNoLanguage := quotedString"
 [string]
 (if (string? string)
  {:value (str string) :type :stringLiteralNoLanguage :innerType :stringLiteralNoLanguage}
  (throw+ {:type ::notStringLiteral :string string})))

(defn stringLiteralNoLanguage [string]
 (-literal (-stringLiteralNoLanguage string)))

(defn- -stringLiteralWithLanguage 
 "stringLiteralWithLanguage := quotedString languageTag"
 [string lang]
 (if (and (string? string) (string? lang))
  {:value (str string \@ lang) :type :stringLiteralWithLanguage :innerType :stringLiteralWithLanguage}
  (throw+ {:type ::notStringLiteralWithLang :string string :lang lang})))

(defn stringLiteralWithLanguage [string lang]
 (-literal (-stringLiteralWithLanguage string lang)))

(defn- -dataOneOf 
 "DataOneOf := 'DataOneOf' '(' Literal { Literal } ')'"
 [literals]
 (if (or (and (set? literals) (every? (fn [x] (= (:type x) :literal)) literals))(= (:type literals) :literal))
  {:literals literals :arity 1 :type :dataOneOf :innerType :dataOneOf}
  (throw+ {:type ::notLiterals :literals literals})))

(defn- -constrainingFacet 
 "constrainingFacet := IRI"
 [iri]
 (if (:iri iri)
  (assoc iri :type :constrainingFacet)
  (throw+ {:type ::notFacet :facet iri})))

(defn- -restrictionValue 
 "restrictionValue := Literal"
 [literal]
 (if (= (:type literal) :literal)
  (assoc literal :type :restrictionValue)
  (throw+ {:type ::notLiteral :literal literal})))

(defn- -restrictedValue 
 "RestrictedFacet := constrainingFacet restrictionValue"
 [facet restriction]
 (if (and (= (:type restriction) :restrictionValue)(= (:type facet) :constrainingFacet))
  (assoc facet :value (:value restriction) :type :restrictedValue :innerType :restrictedValue)
  (throw+ {:type ::notRestrictedValue :facet facet :restriction restriction})))

(defn restrictedValue [facet restriction]
 (-restrictedValue (-constrainingFacet facet) (-restrictionValue restriction)))

(defn- -datatypeRestriction 
 "DatatypeRestriction := 'DatatypeRestriction' '(' Datatype RestrictedFacet { RestrictedFacet } ')'"
 [datatype restrictedvalues]
 (if (and (and (and (> (count restrictedvalues) 0) (every? (fn [x] (= (:type x) :restrictedValue)) restrictedvalues))(= (:innerType datatype) :dataType))(every? (fn [x] (= (:arity x) (:arity (first restrictedvalues)))) restrictedvalues))
  (assoc datatype :restrictedValues restrictedvalues :type :datatypeRestriction  :innerType :datatypeRestriction)
  (throw+ {:type ::notDatatypeRestriction :datatype datatype :restrictedvalues restrictedvalues})))

(defn- -dataAnd 
 "DataIntersectionOf := 'DataIntersectionOf' '(' DataRange DataRange { DataRange } ')'"
 [dataranges]
 (if (and (every? (fn [x] (= (:type x) :dataRange)) dataranges)(every? (fn [x] (= (:arity x) (:arity (first dataranges)))) dataranges))
  {:dataRanges dataranges :arity (:arity (first dataranges)) :type :dataAnd :innerType :dataAnd}
  (throw+ {:type ::notDataAnd :dataRanges dataranges})))

(defn- -dataOr 
 "DataUnionOf := 'DataUnionOf' '(' DataRange DataRange { DataRange } ')'"
 [dataranges]
 (if (and (every? (fn [x] (= (:type x) :dataRange)) dataranges)(every? (fn [x] (= (:arity x) (:arity (first dataranges)))) dataranges))
  {:dataRanges dataranges :arity (:arity (first dataranges)) :type :dataOr :innerType :dataOr}
  (throw+ {:type ::notDataOr :dataRanges dataranges})))

(defn- -dataNot 
 "DataComplementOf := 'DataComplementOf' '(' DataRange ')'"
 [datarange]
 (if (= (:type datarange) :dataRange)
  {:dataRange datarange :arity (:arity datarange) :type :dataNot :innerType :dataNot}
  (throw+ {:type ::notDataNot :datarange datarange})))

(defn- -dataRange 
 "DataRange := Datatype | DataIntersectionOf | DataUnionOf | DataComplementOf | DataOneOf | DatatypeRestriction"
 [datarange]
 (if (contains? dataRangeTypes (:type datarange))
  (assoc datarange :type :dataRange)
  (throw+ {:type ::notDataRange :dataRange datarange})))

(defn dataRange [dr]
 (if (contains? dr :type)
  (-dataRange dr)
  (-dataRange (dataType dr))))

(defn dataAnd 
	([datarange1 datarange2]
	 (-dataRange (-dataAnd (into #{} [(dataRange datarange1) (dataRange datarange2)]))))
	([datarange1 datarange2 & dataranges]
	 (-dataRange (-dataAnd (into #{} (map dataRange (flatten [datarange1 datarange2 dataranges])))))))

(defn dataOr 
	([datarange1 datarange2]
	 (-dataRange (-dataOr (into #{} [(dataRange datarange1) (dataRange datarange2)]))))
	([datarange1 datarange2 & dataranges]
	 (-dataRange (-dataOr (into #{} (map dataRange (flatten [datarange1 datarange2 dataranges])))))))

(defn dataNot [datarange]
 (-dataRange (-dataNot (dataRange datarange))))

(defn dataOneOf
	([literal]
	 (-dataRange (-dataOneOf #{literal})))
	([literal & literals]
	 (-dataRange (-dataOneOf (into #{} (flatten [literal literals]))))))

(defn datatypeRestriction
 [datatype restrictedvalues]
  (-dataRange (-datatypeRestriction (dataType datatype) (into #{} (map restrictedValue (filter #(nil? (:type %)) restrictedvalues) (filter #(= (:type %) :literal) restrictedvalues))))))

(defn entity 
 "Entity := 'Class' '(' Class ')' | 'Datatype' '(' Datatype ')' | 'ObjectProperty' '(' ObjectProperty ')' | 'DataProperty' '(' DataProperty ')' | 'AnnotationProperty' '(' AnnotationProperty ')' | 'NamedIndividual' '(' NamedIndividual ')'"
 [thing]
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
