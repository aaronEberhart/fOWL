(ns ontology.annotations
 "Functions that represent OWL annotations"
 (:require [ontology.components :as co]))

(def ^:no-doc annotationRoles
 #{"rdfs:label" "rdfs:comment" "rdfs:seeAlso" "rdfs:isDefinedBy" "owl:versionInfo" "owl:deprecated" "owl:backwardCompatibleWith" "owl:incompatibleWith" "owl:priorVersion"})

(defn annotationRole
 "AnnotationProperty := IRI"
 ([iri]
 (if (string? iri)
    {:reserved (co/isReservedIRI? iri) :iri iri :type :annotationRole :innerType :annotationRole}
    (if (:iri iri)
     (assoc iri :type :annotationRole :innerType :annotationRole)
     (throw (Exception. (str  {:type ::notStringIRI :iri iri}))))))
 ([prefix name]
   (if (and (string? name)(string? prefix))
    (let [check (str prefix name)]
     {:reserved (co/isReservedIRI? (str prefix ":" name)) :short name :prefix prefix :iri (str prefix ":" name )}))
     (throw (Exception. (str  {:type ::notStringIRI :iri name}))))
  ([prefix name namespace]
   (if (and (and (string? name)(string? namespace))(string? prefix))
    (let [check (str prefix name)]
     {:reserved (co/isReservedIRI? (str prefix ":" name)) :namespace namespace :short name :prefix prefix :iri (str "<" namespace name ">")}))
     (throw (Exception. (str  {:type ::notStringIRI :iri name})))))

(defn annotationValue 
 "AnnotationValue := AnonymousIndividual | IRI | Literal"
 [value]
 (if (string? value)
  (assoc (co/stringLiteralNoLanguage value) :type :annotationValue)
  (if (= (:type value) :literal)
    (assoc value :type :annotationValue)
    (if (= (:innerType value) :anonymousIndividual)
      (assoc value :type :annotationValue)
      (if (:iri value)
        (assoc value :innerType :annotationValue :type :annotationValue)
        (throw (Exception. (str  {:type ::notAnnotationValue :value value}))))))))

(defn- -metaAnnotations 
  "annotationAnnotations := { Annotation }"
  [annotations]
  (if (every? (fn [x] (= (:type x) :annotation)) annotations)
    {:annotations annotations :type :metaAnnotations :innerType :metaAnnotations}
    (throw (Exception. (str  {:type ::notAnnotations :annotations annotations})))))

(defn metaAnnotations 
 "annotationAnnotations := { Annotation }"
 [annotations]
 (-metaAnnotations annotations))

(defn- -annotation
  "Annotation := 'Annotation' '(' annotationAnnotations AnnotationProperty AnnotationValue ')'"
  ([annotationRole annotationValue]
    (if (and (= (:type annotationRole) :annotationRole)(= (:type annotationValue) :annotationValue))
      {:annotationRole annotationRole :annotationValue annotationValue :type :annotation :innerType :annotation}
      (throw (Exception. (str  {:type ::notAnnotationRoleAndValue :annotationRole annotationRole :annotationValue annotationValue})))))
  ([annotations annotationRole annotationValue]
    (if (and (= (:type annotationRole) :annotationRole)(= (:type annotationValue) :annotationValue))
      (if (= (:type annotations) :metaAnnotations)
        {:annotations (:annotations annotations) :annotationRole annotationRole :annotationValue annotationValue :type :annotation :innerType :annotation}
        (throw (Exception. (str  {:type ::notAnnotations :annotations annotations}))))
      (throw (Exception. (str  {:type ::notAnnotationRoleAndValue :annotationRole annotationRole :annotationValue annotationValue :annotations annotations}))))))

(defn annotation
 "Annotation := 'Annotation' '(' annotationAnnotations AnnotationProperty AnnotationValue ')'"
  ([role value]
    (-annotation (annotationRole role) (annotationValue value)))
  ([annotations role value]
    (-annotation (if (= (:type annotations) :annotation) (metaAnnotations #{annotations}) (metaAnnotations (into #{} annotations))) (annotationRole role) (annotationValue value))))

(defn annotationSubject
 "AnnotationSubject := IRI | AnonymousIndividual"
 [subject]
 (if (:iri subject)
   (assoc subject :innerType :annotationSubject :type :annotationSubject)
   (if (= (:innerType subject) :anonymousIndividual)
     (assoc subject :type :annotationSubject)
     (throw (Exception. (str  {:type ::notAnnotationSubject :subject subject}))))))

(defn- -axiomAnnotations
  "axiomAnnotations := { Annotation }"
  [annotations]
  (if (every? (fn [x] (= (:type x) :annotation)) annotations)
    {:annotations annotations :type :axiomAnnotations :innerType :axiomAnnotations}
    (throw (Exception. (str  {:type ::notAnnotations :annotations annotations})))))

(defn axiomAnnotations 
 "axiomAnnotations := { Annotation }"
 [annotations]
 (-axiomAnnotations annotations))

(defn annotationDataType
 "Datatype := IRI"
 ([iri] (assoc (co/XSDDatatype iri) :arity 1 :type :dataType :innerType :dataType))
 ([prefix name](assoc (co/XSDDatatype prefix name) :arity 1 :type :dataType :innerType :dataType))
 ([prefix name namespace](assoc (co/XSDDatatype prefix name namespace) :arity 1 :type :dataType :innerType :dataType)))
