(ns ontology.components
 "Functions that represent IRI components and datatypes"
 (:require [clojure.string :as s]))

(def ^:no-doc dataRangeTypes
 #{:dataRange :dataType :dataAnd :dataOr :dataNot :dataOneOf :datatypeRestriction})
(def ^:no-doc nameTypes
 #{:className :dataType :roleName :dataRoleName :annotationRole :namedIndividual})

(def xsdNS
 "The XML namespace"
 "http://www.w3.org/2001/XMLSchema#")
(def rdfNS
 "The RDF namespace"
 "http://www.w3.org/1999/02/22-rdf-syntax-ns#")
(def rdfsNS
 "The RDFS namespace"
 "http://www.w3.org/2000/01/rdf-schema#")
(def owlNS
 "The OWL namespace"
 "http://www.w3.org/2002/07/owl#")

(def Top
 "owl:Thing"
 {:namespace owlNS :name "Thing" :prefix "owl" :iri (str "<" owlNS "Thing" ">") :type :class :innerType :top})
(def Bot
 "owl:Nothing"
 {:namespace owlNS :name "Nothing" :prefix "owl" :iri (str "<" owlNS "Nothing" ">") :type :class :innerType :bot})
(def RDFSLiteral
 "rdfs:Literal"
 {:namespace rdfsNS :name "Literal" :prefix "rdfs" :iri (str "<" rdfsNS "Literal" ">") :arity 1 :type :dataType :innerType :dataType})
(def RDFLangString
 {:namespace rdfNS :name "langString" :prefix "rdf" :iri (str "<" rdfNS "langString" ">") :arity 1 :type :dataType :innerType :dataType})
(def TopRole
 "owl:topObjectProperty"
 {:namespace owlNS :name "topObjectProperty" :prefix "owl" :iri (str "<" owlNS "topObjectProperty" ">") :type :role :innerType :roleTop})
(def BotRole
 "owl:bottomObjectProperty"
 {:namespace owlNS :name "bottomObjectProperty" :prefix "owl" :iri (str "<" owlNS "bottomObjectProperty" ">") :type :role :innerType :roleBot})
(def TopData
 "owl:topDataProperty"
 {:namespace owlNS :name "topDataProperty" :prefix "owl" :iri (str "<" owlNS "topDataProperty" ">") :type :dataRole :innerType :dataRoleName})
(def BotData
 "owl:bottomDataProperty"
 {:namespace owlNS :name "bottomDataProperty" :prefix "owl" :iri (str "<" owlNS "bottomDataProperty" ">") :type :dataRole :innerType :dataRoleName})

(def reservedIRIs
"The set of reserved IRIs"
 #{"owl:backwardCompatibleWith" "owl:deprecated" "owl:incompatibleWith" "owl:priorVersion" "owl:rational" "owl:real"
   "owl:versionInfo" "rdf:langRange" "rdf:PlainLiteral" "rdf:XMLLiteral" "rdfs:comment" "rdfs:isDefinedBy" "rdfs:label" 
   "rdfs:seeAlso" "xsd:anyURI" "xsd:base64Binary" "xsd:boolean" "xsd:byte" "xsd:dateTime" "xsd:dateTimeStamp" "xsd:decimal" 
   "xsd:double" "xsd:float" "xsd:hexBinary" "xsd:int" "xsd:integer" "xsd:language" "xsd:length" "xsd:long" "xsd:maxExclusive" 
   "xsd:maxInclusive" "xsd:maxLength" "xsd:minExclusive" "xsd:minInclusive" "xsd:minLength" "xsd:Name" "xsd:NCName" "xsd:name" 
   "xsd:negativeInteger" "xsd:NMTOKEN" "xsd:nonNegativeInteger" "xsd:nonPositiveInteger" "xsd:normalizedString" "xsd:pattern"
   "xsd:positiveInteger" "xsd:string" "xsd:token" "xsd:unsignedByte" "xsd:unsignedInt" "xsd:unsignedLong" "xsd:unsignedShort"})

(def dataTypeMaps
"The set of data type maps"
 #{"rdfs:Literal" "owl:rational" "xsd:double" "xsd:float" "xsd:decimal" "xsd:integer" "xsd:long" "xsd:int" "xsd:name" "xsd:language" 
   "xsd:byte" "xsd:nonNegativeInteger" "xsd:nonPositiveInteger" "xsd:positiveInteger" "xsd:negativeInteger" "xsd:unsignedLong" "xsd:anyURI" 
   "xsd:unsignedInt" "xsd:unsignedShort" "xsd:unsignedByte" "rdf:PlainLiteral" "xsd:string" "xsd:NCName" "xsd:Name"  "xsd:token" "owl:real" 
   "xsd:NMTOKEN" "xsd:normalizedString" "xsd:boolean" "xsd:base64Binary" "xsd:hexBinary" "xsd:dateTime" "xsd:dateTimeStamp" "rdf:XMLLiteral"})

(defn isReservedIRI?
 "Is the IRI in the set of reserved IRIs?"
 [iri]
 (contains? reservedIRIs iri))

(defn IRI
 "IRI := String"
 ([iri]
  (if (string? iri)
   (if (and (= \< (first iri)) (= \> (last iri)))
    {:iri iri}
    (if-some [[_ prefix name] (re-matches #"^([^\<\>\(\)\"\\\s]+)\:([^\:\<\>\(\)\"\\\s]*)" iri)]
     {:name name :prefix prefix :iri iri}
     (if-some [[_ iri1] (re-matches #"^([^\<\>\(\)\"\\\s]+)" iri)]
      {:iri iri1}
      (throw (Exception. (str  {:type ::notIRI :IRI iri}))))))
   (if (and (:iri iri) (not (:type iri)))
    iri
    (throw (Exception. (str  {:type ::notIRI :IRI iri}))))))
 ([prefix name]
  (if (and (re-matches #"^[^\<\>\(\)\"\\\s]+" name)(re-matches #"^[^\<\>\(\)\"\\\s]*" prefix))
   {:name name :prefix prefix :iri (str prefix ":" name)}
   (throw (Exception. (str  {:type ::notIRI :name name :prefix prefix})))))
 ([prefix name namespace]
  (if (and (re-matches #"^[^\<\>\(\)\"\\\s]+" name)(re-matches #"^[^\<\>\(\)\"\\\s]*" prefix)(re-matches #"^([^\:\<\>\(\)\"\\\s]+)\:([^\<\>\(\)\"\\\s]*)" namespace))
   {:namespace namespace :name name :prefix prefix :iri (str "<" namespace name ">")}
   (throw (Exception. (str  {:type ::notIRI :namespace namespace :name name :prefix prefix}))))))

(defn className
 "Class := IRI"
 ([iri]
 	(if (string? iri)
  	(assoc (IRI iri) :innerType :className :type :className)
  	(if (:type iri)
    (if (= (:innerType iri) :className)
     iri
  		 (throw (Exception. (str  {:type ::notClassName :IRI iri}))))
  		(assoc iri :innerType :className :type :className))))
 ([prefix name]
  (assoc (IRI prefix name) :innerType :className :type :className))
 ([prefix name namespace]
  (assoc (IRI prefix name namespace) :innerType :className :type :className)))

(defn roleName
 "ObjectProperty := IRI"
 ([iri]
 	(if (string? iri)
  	(assoc (IRI iri) :type :roleName :innerType :roleName)
  	(if (:type iri)
    (if (= (:innerType iri) :roleName)
     iri
  		 (throw (Exception. (str  {:type ::notRoleName :IRI iri}))))
  		(assoc iri :type :roleName :innerType :roleName))))
 ([prefix name]
  (assoc (IRI prefix name) :type :roleName :innerType :roleName))
 ([prefix name namespace]
  (assoc (IRI prefix name namespace) :type :roleName :innerType :roleName)))

(defn- -inverseRoleName 
 "InverseObjectProperty := 'ObjectInverseOf' '(' ObjectProperty ')'"
 [role]
 (if (= (:type role) :roleName)
  (assoc role :innerType :inverseRoleName)
  (throw (Exception. (str  {:type ::notRole :roleName role})))))

(defn inverseRoleName
 "InverseObjectProperty := 'ObjectInverseOf' '(' ObjectProperty ')'"
 ([iri]
  (-inverseRoleName (roleName iri)))
 ([prefix name]
  (-inverseRoleName (roleName prefix name)))
 ([prefix name namespace]
  (-inverseRoleName (roleName prefix name namespace))))

(defn dataRoleName
 "DataProperty := IRI"
 ([iri]
  (assoc iri :type :dataRoleName :innerType :dataRoleName))
 ([prefix name]
  (assoc (IRI prefix name) :type :dataRoleName :innerType :dataRoleName))
 ([prefix name namespace]
  (assoc (IRI prefix name namespace) :type :dataRoleName :innerType :dataRoleName)))

(defn- -namedIndividual
 "NamedIndividual := IRI"
 ([iri]
  (assoc iri :type :namedIndividual :innerType :namedIndividual))
 ([prefix name]
  (assoc (IRI prefix name) :type :namedIndividual :innerType :namedIndividual))
 ([prefix name namespace]
  (assoc (IRI prefix name namespace) :type :namedIndividual :innerType :namedIndividual)))

(defn- -anonymousIndividual
 "AnonymousIndividual := nodeID"
 ([iri]
  (assoc iri :type :anonymousIndividual :innerType :anonymousIndividual))
 ([prefix name]
  (assoc (IRI prefix name) :type :anonymousIndividual :innerType :anonymousIndividual))
 ([prefix name namespace]
  (assoc (IRI prefix name namespace) :type :anonymousIndividual :innerType :anonymousIndividual)))

(defn- -individual 
 "Individual := AnonymousIndividual | NamedIndividual"
 [anyIndividual]
 (if (or (= (:type anyIndividual) :anonymousIndividual)(= (:type anyIndividual) :namedIndividual))
  (assoc anyIndividual :type :individual)
  (throw (Exception. (str  {:type ::notIndividual :individual anyIndividual})))))

(defn individual
 "Individual := AnonymousIndividual | NamedIndividual"
 ([iri]
  (if (string? iri)
  	(-individual (-namedIndividual (IRI iri)))
   (if (:type iri)
    (if (= (:type iri) :individual)
     iri
     (throw (Exception. (str  {:type ::notIndividual :IRI iri}))))
   	(-individual (if (= (get (:prefix name) 0) \_)(-anonymousIndividual iri)(-namedIndividual iri))))))
 ([prefix name]
  (-individual (if (= (get prefix 0) \_)(-anonymousIndividual prefix name)(-namedIndividual prefix name))))
 ([prefix name namespace]
  (-individual (if (= (get prefix 0) \_)(-anonymousIndividual prefix name namespace)(-namedIndividual prefix name namespace)))))

(defn- -dataType
 "Datatype := IRI"
 ([iri]
  (if (string? iri)
   (assoc (IRI iri) :arity 1 :type :dataType :innerType :dataType)
   (if (:iri iri)
    (assoc iri :arity 1 :type :dataType :innerType :dataType)
    (throw (Exception. (str  {:type ::notdataType :IRI iri}))))))
 ([prefix name]
  (if (or (= (str prefix name) "rdfs:Literal")(contains? dataTypeMaps (str prefix name)) (not (isReservedIRI? (str prefix name))))
   (assoc (IRI prefix name) :arity 1 :type :dataType :innerType :dataType)
   (throw (Exception. (str  {:type ::notdataType :IRI name})))))
 ([prefix name namespace]
  (if (or (= (str prefix name) "rdfs:Literal") (contains? dataTypeMaps (str prefix name)) (not (isReservedIRI? (str prefix name))))
   (assoc (IRI prefix name namespace) :arity 1 :type :dataType :innerType :dataType)
   (throw (Exception. (str  {:type ::notdataType :IRI name :namespace namespace}))))))

(defn dataType
 "Datatype := IRI"
 ([iri]
  (if (string? iri)
   (-dataType (IRI iri))
   (if (:type iri)
    (if (= (:innerType iri) :dataType)
     iri
     (throw (Exception. (str  {:type ::notDataType :dataType iri}))))
    (-dataType iri))))
 ([prefix name]
  (-dataType (IRI prefix name)))
 ([prefix name namespace]
  (-dataType (IRI prefix name namespace))))

(defn- -literal 
 "Literal := typedLiteral | stringLiteralNoLanguage | stringLiteralWithLanguage"
 [literal]
 (if (or (or (= (:type literal) :typedLiteral)(= (:type literal) :stringLiteralNoLanguage))(= (:type literal) :stringLiteralWithLanguage))
  (assoc literal :arity 1 :type :literal)
  (throw (Exception. (str  {:type ::notLiteral :literal literal})))))

(defn- -typedLiteral 
 "typedLiteral := lexicalForm '^^' Datatype"
 [lexicalForm datatype]
 (if (and (= (:type lexicalForm) :lexicalForm)(= (:type datatype) :dataType))
  {:dataType datatype :value (str (:value lexicalForm) \^ \^  (if (:prefix datatype) (str (:prefix datatype)":"(:name datatype)) (:iri datatype))) :type :typedLiteral :innerType :typedLiteral}
  (throw (Exception. (str  {:type ::notTypedLiteral :lexicalForm lexicalForm :dataType datatype})))))

(defn- -lexicalForm 
 "lexicalForm := quotedString"
 [stri]
 (if (string? stri)
  {:value  (str \" stri \" )  :type :lexicalForm :innerType :lexicalForm}
  (throw (Exception. (str  {:type ::notString :string stri})))))

(defn typedLiteral
 "typedLiteral := lexicalForm '^^' Datatype"
 [lexicalForm datatype]
 (-literal (-typedLiteral (-lexicalForm lexicalForm) (dataType datatype))))

(defn- -stringLiteralNoLanguage 
 "stringLiteralNoLanguage := quotedString"
 [string]
 (if (string? string)
  {:value (str \" string \" ) :type :stringLiteralNoLanguage :innerType :stringLiteralNoLanguage}
  (throw (Exception. (str  {:type ::notStringLiteral :string string})))))

(defn stringLiteralNoLanguage
 "stringLiteralNoLanguage := quotedString"
 [string]
 (-literal (-stringLiteralNoLanguage string)))

(defn- -stringLiteralWithLanguage 
 "stringLiteralWithLanguage := quotedString languageTag"
 [string lang]
 (if (and (string? string) (string? lang))
  {:dataType RDFLangString :value (str \" string \" \@ lang) :type :stringLiteralWithLanguage :innerType :stringLiteralWithLanguage}
  (throw (Exception. (str  {:type ::notStringLiteralWithLang :string string :lang lang})))))

(defn stringLiteralWithLanguage
 "stringLiteralWithLanguage := quotedString languageTag"
 [string lang]
 (-literal (-stringLiteralWithLanguage string lang)))

(defn literal
 "literal := stringLiteral | typedLiteral"
 [literalString]
 (if (and (:type literalString) (= (:type literalString) :literal))
  literalString
  (if (string? literalString)
   (if-some [literalTypedMatch (re-matches #"^\"([\s\S]*?(?<!\\)(?:\\\\)*?)\"\s*\^\^\s^(?:(?:[<]([^>]+)[>])|([^\<\>\s\(\)\"\\]*\:[^\<\>\s\(\)\"\\]+))" literalString)]
    (typedLiteral (get literalTypedMatch 1)(if (get literalTypedMatch 2)(get literalTypedMatch 2)(get literalTypedMatch 3)))
    (if-some [literalLangMatch (re-matches #"^\"([\s\S]*?(?<!\\)(?:\\\\)*?)\"\s*\@([^\s\(\)\"\\\:]+)" literalString)]
     (stringLiteralWithLanguage (get literalLangMatch 1)(get literalLangMatch 2))
     (if-some [literalQuotedMatch (re-matches #"^\"([\s\S]*?(?<!\\)(?:\\\\)*?)\"" literalString)]
      (stringLiteralNoLanguage (get literalQuotedMatch 1))
      (throw (Exception. (str {:type ::notLiteral :literal literalString}))))))
  (throw (Exception. (str {:type ::notLiteral :literal literalString}))))))

(defn- -dataOneOf 
 "DataOneOf := 'DataOneOf' '(' Literal { Literal } ')'"
 [literals]
 (if (or (and (set? literals) (every? (fn [x] (= (:type x) :literal)) literals))(= (:type literals) :literal))
  {:literals literals :arity 1 :type :dataOneOf :innerType :dataOneOf}
  (throw (Exception. (str  {:type ::notLiterals :literals literals})))))

(defn- -constrainingFacet 
 "constrainingFacet := IRI"
 [iri]
 (if (string? iri)
  (assoc (IRI iri) :type :constrainingFacet)
  (if (:iri iri)
   (assoc iri :type :constrainingFacet)
   (throw (Exception. (str  {:type ::notFacet :facet iri}))))))

(defn- -restrictionValue 
 "restrictionValue := Literal"
 [literal]
 (if (= (:type literal) :literal)
  (assoc literal :type :restrictionValue)
  (throw (Exception. (str  {:type ::notLiteral :literal literal})))))

(defn- -restrictedValue 
 "RestrictedFacet := constrainingFacet restrictionValue"
 [facet restriction]
 (if (and (= (:type restriction) :restrictionValue)(= (:type facet) :constrainingFacet))
  (assoc facet :value (:value restriction) :type :restrictedValue :innerType :restrictedValue)
  (throw (Exception. (str  {:type ::notRestrictedValue :facet facet :restriction restriction})))))

(defn restrictedValue
 "RestrictedFacet := constrainingFacet restrictionValue" 
 [facet restriction]
 (-restrictedValue (-constrainingFacet facet) (-restrictionValue (literal restriction))))

(defn- -datatypeRestriction 
 "DatatypeRestriction := 'DatatypeRestriction' '(' Datatype RestrictedFacet { RestrictedFacet } ')'"
 [datatype restrictedvalues]
 (if (and (and (and (> (count restrictedvalues) 0) (every? (fn [x] (= (:type x) :restrictedValue)) restrictedvalues))(= (:innerType datatype) :dataType))(every? (fn [x] (= (:arity x) (:arity (first restrictedvalues)))) restrictedvalues))
  (assoc datatype :restrictedValues restrictedvalues :type :datatypeRestriction  :innerType :datatypeRestriction)
  (throw (Exception. (str  {:type ::notDatatypeRestriction :datatype datatype :restrictedvalues restrictedvalues})))))

(defn- -dataAnd 
 "DataIntersectionOf := 'DataIntersectionOf' '(' DataRange DataRange { DataRange } ')'"
 [dataranges]
 (if (and (every? (fn [x] (= (:type x) :dataRange)) dataranges)(every? (fn [x] (= (:arity x) (:arity (first dataranges)))) dataranges))
  {:dataRanges dataranges :arity (:arity (first dataranges)) :type :dataAnd :innerType :dataAnd}
  (throw (Exception. (str  {:type ::notDataAnd :dataRanges dataranges})))))

(defn- -dataOr 
 "DataUnionOf := 'DataUnionOf' '(' DataRange DataRange { DataRange } ')'"
 [dataranges]
 (if (and (every? (fn [x] (= (:type x) :dataRange)) dataranges)(every? (fn [x] (= (:arity x) (:arity (first dataranges)))) dataranges))
  {:dataRanges dataranges :arity (:arity (first dataranges)) :type :dataOr :innerType :dataOr}
  (throw (Exception. (str  {:type ::notDataOr :dataRanges dataranges})))))

(defn- -dataNot 
 "DataComplementOf := 'DataComplementOf' '(' DataRange ')'"
 [datarange]
 (if (= (:type datarange) :dataRange)
  {:dataRange datarange :arity (:arity datarange) :type :dataNot :innerType :dataNot}
  (throw (Exception. (str  {:type ::notDataNot :datarange datarange})))))

(defn- -dataRange 
 "DataRange := Datatype | DataIntersectionOf | DataUnionOf | DataComplementOf | DataOneOf | DatatypeRestriction"
 [datarange]
 (if (contains? dataRangeTypes (:type datarange))
  (assoc datarange :type :dataRange)
  (throw (Exception. (str  {:type ::notDataRange :dataRange datarange})))))

(defn dataRange
 "DataRange := Datatype | DataIntersectionOf | DataUnionOf | DataComplementOf | DataOneOf | DatatypeRestriction"
 [dr]
 (if (string? dr)
  (-dataRange (dataType dr))
  (if (contains? dr :type)
   (-dataRange dr)
   (-dataRange (dataType dr)))))

(defn dataAnd
 "DataIntersectionOf := 'DataIntersectionOf' '(' DataRange DataRange { DataRange } ')'"
	([datarange1 datarange2]
	 (let [dataRanges #{(dataRange datarange1) (dataRange datarange2)}]
   (if (= 1 (count dataRanges)) (first dataRanges) (-dataRange (-dataAnd dataRanges)))))
	([datarange1 datarange2 & dataranges]
  (let [dataRanges (into #{} (conj (if (= (type dataranges) clojure.lang.ArraySeq) (apply map dataRange dataranges)(map dataRange dataranges)) (dataRange datarange1) (dataRange datarange2)))]
	  (if (= 1 (count dataRanges)) (first dataRanges) (-dataRange (-dataAnd dataRanges))))))

(defn dataOr 
 "DataUnionOf := 'DataUnionOf' '(' DataRange DataRange { DataRange } ')'"
	([datarange1 datarange2]
  (let [dataRanges #{(dataRange datarange1) (dataRange datarange2)}]
   (if (= 1 (count dataRanges)) (first dataRanges) (-dataRange (-dataOr dataRanges)))))
 ([datarange1 datarange2 & dataranges]
  (let [dataRanges (into #{} (conj (if (= (type dataranges) clojure.lang.ArraySeq) (apply map dataRange dataranges)(map dataRange dataranges)) (dataRange datarange1) (dataRange datarange2)))]
   (if (= 1 (count dataRanges)) (first dataRanges) (-dataRange (-dataOr dataRanges))))))

(defn dataNot 
 "DataComplementOf := 'DataComplementOf' '(' DataRange ')'"
 [datarange]
 (-dataRange (-dataNot (dataRange datarange))))

(defn dataOneOf
 "DataOneOf := 'DataOneOf' '(' Literal { Literal } ')'"
	([Literal]
	 (-dataRange (-dataOneOf #{(literal Literal)})))
	([Literal & literals]
	 (-dataRange (-dataOneOf (into #{} (conj (if (= (type literals) clojure.lang.ArraySeq) (apply map literal literals)(map literal literals)) (literal Literal)))))))

(defn datatypeRestriction
 "DatatypeRestriction := 'DatatypeRestriction' '(' Datatype RestrictedFacet { RestrictedFacet } ')'"
 [datatype restrictedvalues]
 (-dataRange (-datatypeRestriction (dataType datatype) (into #{} (map (partial apply restrictedValue) (partition-all 2 restrictedvalues))))))

(defn entity 
 "Entity := 'Class' '(' Class ')' | 'Datatype' '(' Datatype ')' | 'ObjectProperty' '(' ObjectProperty ')' | 'DataProperty' '(' DataProperty ')' | 'AnnotationProperty' '(' AnnotationProperty ')' | 'NamedIndividual' '(' NamedIndividual ')'"
 [thing]
 (if (= (:type thing) :name)
  thing
  (if (contains? nameTypes (:innerType thing))
   {:name thing :type :name :innerType :name}
   (throw (Exception. (str  {:type ::notName :name thing}))))))
