(ns ontology.annotations
  (:require [ontology.components :as co])
  (:use [slingshot.slingshot :only [throw+]]))

(def annotationRoles
 #{"rdfs:label" "rdfs:comment" "rdfs:seeAlso" "rdfs:isDefinedBy" "owl:versionInfo" "owl:deprecated" "owl:backwardCompatibleWith" "owl:incompatibleWith" "owl:priorVersion"})

(defn annotationRole
 "AnnotationProperty := IRI"
 ([iri]
    (if (:iri iri)
      (assoc iri :type :annotationRole :innerType :annotationRole)
    (if (not (string? iri))
     (throw+ {:type ::notStringIRI :iri iri})
     {:namespace "" :short iri :prefix "" :iri (str "<" iri ">")})))
  ([iri namespace prefix]
   (if (and (and (string? iri)(string? namespace))(string? prefix))
    (let [check (str prefix iri)]
     {:namespace namespace :short iri :prefix prefix :iri (str "<" namespace iri  ">")}))
     (throw+ {:type ::notStringIRI :iri iri})))

(defn annotationValue 
 "AnnotationValue := AnonymousIndividual | IRI | Literal"
 [value]
 (if (= (:type value) :literal)
   (assoc value :type :annotationValue)
   (if (= (:innerType value) :anonymousIndividual)
     (assoc value :type :annotationValue)
     (if (:iri value)
       (assoc value :innerType :annotationValue :type :annotationValue)
       (throw+ {:type ::notAnnotationValue :value value})))))

(defn- -metaAnnotations 
  "annotationAnnotations := { Annotation }"
  [annotations]
  (if (every? (fn [x] (= (:type x) :annotation)) annotations)
    {:annotations annotations :type :metaAnnotations :innerType :metaAnnotations}
    (throw+ {:type ::notAnnotations :annotations annotations})))

(defn metaAnnotations [annotations]
  (-metaAnnotations annotations))

(defn- -annotation
  "Annotation := 'Annotation' '(' annotationAnnotations AnnotationProperty AnnotationValue ')'"
  ([annotationRole annotationValue]
    (if (and (= (:type annotationRole) :annotationRole)(= (:type annotationValue) :annotationValue))
      {:annotationRole annotationRole :annotationValue annotationValue :type :annotation :innerType :annotation}
      (throw+ {:type ::notAnnotationRoleAndValue :annotationRole annotationRole :annotationValue annotationValue})))
  ([annotations annotationRole annotationValue]
    (if (and (= (:type annotationRole) :annotationRole)(= (:type annotationValue) :annotationValue))
      (if (= (:type annotations) :metaAnnotations)
        {:annotations (:annotations annotations) :annotationRole annotationRole :annotationValue annotationValue :type :annotation :innerType :annotation}
        (throw+ {:type ::notAnnotations :annotations annotations}))
      (throw+ {:type ::notAnnotationRoleAndValue :annotationRole annotationRole :annotationValue annotationValue :annotations annotations}))))

(defn annotation
  ([role value]
    (-annotation (annotationRole role) (annotationValue value)))
  ([annotations role value]
    (-annotation (metaAnnotations annotations) (annotationRole role) (annotationValue value))))

(defn annotationSubject
    "AnnotationSubject := IRI | AnonymousIndividual"
    [subject]
    (if (:iri subject)
      (assoc subject :innerType :annotationSubject :type :annotationSubject)
      (if (= (:innerType subject) :anonymousIndividual)
        (assoc subject :type :annotationSubject)
        (throw+ {:type ::notAnnotationSubject :subject subject}))))

(defn- -axiomAnnotations
  "axiomAnnotations := { Annotation }"
  [annotations]
  (if (every? (fn [x] (= (:type x) :annotation)) annotations)
    {:annotations annotations :type :axiomAnnotations :innerType :axiomAnnotations}
    (throw+ {:type ::notAnnotations :annotations annotations})))

(defn axiomAnnotations [annotations]
  (-axiomAnnotations annotations))

(defn annotationDataType
 "Datatype := IRI"
 ([iri] (assoc (co/XSDDatatype iri) :arity 1 :type :dataType :innerType :dataType))
 ([iri namespace prefix](assoc (co/XSDDatatype iri namespace prefix) :arity 1 :type :dataType :innerType :dataType)))
