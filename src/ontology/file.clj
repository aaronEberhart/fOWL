(ns ontology.file
 "Functions that represent OWL ontology documents"
 (:require [ontology.components :as co]))

(defn- -ontologyFile
 "ontologyDocument := { prefixDeclaration } Ontology"
 ([ontology]
   (if (= (:innerType ontology) :ontology)
     ontology
     (throw (Exception. (str  {:type ::notOntology :ontology ontology})))))
 ([prefixes ontology]
  (if (= (:type prefixes) :prefixes)
     (if (= (:innerType ontology) :ontology)
       (assoc ontology :prefixes (:prefixes prefixes))
       (throw (Exception. (str  {:type ::notOntology :ontology ontology}))))
     (throw (Exception. (str  {:type ::notPrefixes :prefixes prefixes}))))))

(defn- -prefix
 "prefixDeclaration := 'Prefix' '(' prefixName '=' fullIRI ')'"
 [prefixName longIRI]
 (if (and (string? prefixName)(:iri longIRI))
  {:prefix prefixName :iri (:iri longIRI) :type :prefix :innerType :prefix}
  (throw (Exception. (str  {:type ::notIRIs :prefixName prefixName :longIRI longIRI})))))

(defn prefix
 "prefixDeclaration := 'Prefix' '(' prefixName '=' fullIRI ')'"
 [prefixName longIRI]
 (-prefix prefixName (co/IRI longIRI)))

(defn prefixes 
 "{ prefixDeclaration }" 
 [prefixes]
 (if (every? (fn [x] (= (:type x) :prefix)) prefixes)
   {:prefixes prefixes :type :prefixes :innerType :prefixes}
   (throw (Exception. (str  {:type ::notPrefixes :prefixes prefixes})))))

(defn- -ontology
 "Ontology := 'Ontology' '(' [ ontologyIRI [ versionIRI ] ] directlyImportsDocuments ontologyAnnotations axioms ')'"
 ([directImports ontologyAnnotations axioms]
  (if (or (= nil directImports)(= (:type directImports) :imports))
    (if (or (= nil ontologyAnnotations)(= (:type ontologyAnnotations) :annotations))
      (if (or (= nil axioms)(= (:type axioms) :axioms))
        {:axioms (:axioms axioms) :imports (:imports directImports) :annotations (:annotations ontologyAnnotations) :innerType :ontology}
        (throw (Exception. (str  {:type ::notaxioms :axioms axioms}))))
      (throw (Exception. (str  {:type ::notontologyAnnotations :ontologyAnnotations ontologyAnnotations}))))
    (throw (Exception. (str  {:type ::directImports :directImports directImports})))))
 ([ontologyIRI directImports ontologyAnnotations axioms]
  (if (or (= nil directImports)(= (:type directImports) :imports))
    (if (or (= nil ontologyAnnotations)(= (:type ontologyAnnotations) :annotations))
      (if (or (= nil axioms)(= (:type axioms) :axioms))
        (if (= (:type ontologyIRI) :ontologyIRI)
          {:ontologyIRI ontologyIRI :axioms (:axioms axioms) :imports (:imports directImports) :annotations (:annotations ontologyAnnotations) :innerType :ontology}
          (throw (Exception. (str  {:type ::notontologyIRI :ontologyIRI ontologyIRI}))))
        (throw (Exception. (str  {:type ::notaxioms :axioms axioms}))))
      (throw (Exception. (str  {:type ::notontologyAnnotations :ontologyAnnotations ontologyAnnotations}))))
    (throw (Exception. (str  {:type ::directImports :directImports directImports})))))
 ([ontologyIRI versionIRI directImports ontologyAnnotations axioms]
  (if (or (= nil directImports)(= (:type directImports) :imports))
    (if (or (= nil ontologyAnnotations)(= (:type ontologyAnnotations) :annotations))
      (if (or (= nil axioms)(= (:type axioms) :axioms))
        (if (= (:type ontologyIRI) :ontologyIRI)
          (if (= (:type versionIRI) :versionIRI)
            {:ontologyIRI ontologyIRI :versionIRI versionIRI :axioms (:axioms axioms) :imports (:imports directImports) :annotations (:annotations ontologyAnnotations) :innerType :ontology}
            (throw (Exception. (str  {:type ::notversionIRI :versionIRI versionIRI}))))
          (throw (Exception. (str  {:type ::notontologyIRI :ontologyIRI ontologyIRI}))))
        (throw (Exception. (str  {:type ::notaxioms :axioms axioms}))))
      (throw (Exception. (str  {:type ::notontologyAnnotations :ontologyAnnotations ontologyAnnotations}))))
    (throw (Exception. (str  {:type ::directImports :directImports directImports}))))))

(defn ontologyIRI
 "ontologyIRI := IRI"
 [iri]
 (if (string? iri)
  (if (and (= (subs iri 0 1) "<")(= (subs iri (- (count iri) 1)(count iri)) ">"))
   (assoc (co/IRI iri) :type :ontologyIRI :innerType :ontologyIRI)
   (assoc (co/IRI (str "<" iri ">" )) :type :ontologyIRI :innerType :ontologyIRI))
  (if (:iri iri)
    (assoc iri :type :ontologyIRI :innerType :ontologyIRI)
    (throw (Exception. (str  {:type ::notIRI :IRI iri}))))))

(defn versionIRI
 "versionIRI := IRI"
 [iri]
 (if (string? iri)
  (if (and (= (subs iri 0 1) "<")(= (subs iri (- (count iri) 1)(count iri)) ">"))
   (assoc (co/IRI iri) :type :versionIRI :innerType :versionIRI)
   (assoc (co/IRI (str "<" iri ">" )) :type :versionIRI :innerType :versionIRI))
  (if (:iri iri)
    (assoc iri :type :versionIRI :innerType :versionIRI)
    (throw (Exception. (str  {:type ::notIRI :IRI iri}))))))

(defn directImports
 "directlyImportsDocuments := { 'Import' '(' IRI ')' }"
 [imports]
 (if (every? (fn [x] (= (:type x) :import)) imports)
   {:imports imports :type :imports :innerType :imports}
   (throw (Exception. (str  {:type ::notImports :imports imports})))))

(defn directImport 
 "'Import' '(' IRI ')'"
 [iri]
 (if (string? iri)
  (if (and (= (subs iri 0 1) "<")(= (subs iri (- (count iri) 1)(count iri)) ">"))
   (assoc (co/IRI iri) :type :import :innerType :import)
   (assoc (co/IRI (str "<" iri ">" )) :type :import :innerType :import))
  (if (:iri iri)
   (assoc iri :type :import :innerType :import)
   (throw (Exception. (str  {:type ::notIRI :IRIs iri}))))))

(defn ontologyAnnotations 
 "ontologyAnnotations := { Annotation }"
 [annotations]
 (if (every? (fn [x] (= (:type x) :annotation)) annotations)
   {:annotations annotations :type :annotations}
   (throw (Exception. (str  {:type ::notAnnotations :annotations annotations})))))

(defn axioms
 "axioms := { Axiom }"
 [axioms]
 (if (every? (fn [x] (= (:type x) :axiom)) axioms)
    {:axioms axioms :type :axioms}
    (throw (Exception. (str  {:type ::notAxioms :Axioms axioms})))))

(defn ontologyFile
 "ontologyDocument := { prefixDeclaration } Ontology"
  ([ontology](-ontologyFile ontology))
  ([pref ontology](-ontologyFile (prefixes pref) ontology)))

(defn ontology
 "Ontology := 'Ontology' '(' [ ontologyIRI [ versionIRI ] ] directlyImportsDocuments ontologyAnnotations axioms ')'"
 ([imports annotations axiom](-ontology (directImports imports) (ontologyAnnotations annotations) (axioms axiom)))
 ([onto imports annotations axiom](-ontology (ontologyIRI onto) (directImports imports) (ontologyAnnotations annotations) (axioms axiom)))
 ([onto vers imports annotations axiom](-ontology (ontologyIRI onto) (versionIRI vers) (directImports imports) (ontologyAnnotations annotations) (axioms axiom))))