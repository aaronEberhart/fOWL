(ns ontology.file
  (:use [slingshot.slingshot :only [throw+]]))

(defn- -ontologyFile
 "ontologyDocument := { prefixDeclaration } Ontology"
  ([ontology]
    (if (= (:type ontology) :ontology)
      ontology
      (throw+ {:type ::notOntology :ontology ontology})))
  ([prefixes ontology]
   (if (= (:type prefixes) :prefixes)
      (if (= (:type ontology) :ontology)
        (assoc ontology :prefixes (:prefixes prefixes))
        (throw+ {:type ::notOntology :ontology ontology}))
      (throw+ {:type ::notPrefixes :prefixes prefixes}))))

(defn prefix [prefixName longIRI]
 "prefixDeclaration := 'Prefix' '(' prefixName '=' fullIRI ')'"
 (if (and (string? prefixName)(string? longIRI))
  {:prefix prefixName :iri longIRI :type :prefix :innerType :prefix}
  (throw+ {:type ::notIRIs :prefixName prefixName :longIRI longIRI})))

(defn prefixes [prefixes]
  (if (every? (fn [x] (= (:type x) :prefix)) prefixes)
    {:prefixes prefixes :type :prefixes :innerType :prefixes}
    (throw+ {:type ::notPrefixes :prefixes prefixes})))

(defn- -ontology
 "Ontology := 'Ontology' '(' [ ontologyIRI [ versionIRI ] ] directlyImportsDocuments ontologyAnnotations axioms ')'"
  ([directImports ontologyAnnotations axioms]
    (if (or (= nil directImports)(= (:type directImports) :imports))
      (if (or (= nil ontologyAnnotations)(= (:type ontologyAnnotations) :annotations))
        (if (or (= nil axioms)(= (:type axioms) :axioms))
          {:ontologyIRI nil :versionIRI nil :axioms (:axioms axioms) :imports (:imports directImports) :annotations (:annotations ontologyAnnotations) :type :ontology}
          (throw+ {:type ::notaxioms :axioms axioms}))
        (throw+ {:type ::notontologyAnnotations :ontologyAnnotations ontologyAnnotations}))
      (throw+ {:type ::directImports :directImports directImports})))
  ([ontologyIRI directImports ontologyAnnotations axioms]
    (if (or (= nil directImports)(= (:type directImports) :imports))
      (if (or (= nil ontologyAnnotations)(= (:type ontologyAnnotations) :annotations))
        (if (or (= nil axioms)(= (:type axioms) :axioms))
          (if (= (:type ontologyIRI) :ontologyIRI)
            {:ontologyIRI ontologyIRI :versionIRI nil :axioms (:axioms axioms) :imports (:imports directImports) :annotations (:annotations ontologyAnnotations) :type :ontology}
            (throw+ {:type ::notontologyIRI :ontologyIRI ontologyIRI}))
          (throw+ {:type ::notaxioms :axioms axioms}))
        (throw+ {:type ::notontologyAnnotations :ontologyAnnotations ontologyAnnotations}))
      (throw+ {:type ::directImports :directImports directImports})))
  ([ontologyIRI versionIRI directImports ontologyAnnotations axioms]
    (if (or (= nil directImports)(= (:type directImports) :imports))
      (if (or (= nil ontologyAnnotations)(= (:type ontologyAnnotations) :annotations))
        (if (or (= nil axioms)(= (:type axioms) :axioms))
          (if (= (:type ontologyIRI) :ontologyIRI)
            (if (= (:type versionIRI) :versionIRI)
              {:ontologyIRI ontologyIRI :versionIRI versionIRI :axioms (:axioms axioms) :imports (:imports directImports) :annotations (:annotations ontologyAnnotations) :type :ontology}
              (throw+ {:type ::notversionIRI :versionIRI versionIRI}))
            (throw+ {:type ::notontologyIRI :ontologyIRI ontologyIRI}))
          (throw+ {:type ::notaxioms :axioms axioms}))
        (throw+ {:type ::notontologyAnnotations :ontologyAnnotations ontologyAnnotations}))
      (throw+ {:type ::directImports :directImports directImports}))))

(defn ontologyIRI [iri]
 "ontologyIRI := IRI"
  (if (:iri iri)
    (assoc iri :type :ontologyIRI :innerType :ontologyIRI)
    (throw+ {:type ::notIRI :IRI iri})))

(defn versionIRI [iri]
 "versionIRI := IRI"
  (if (:iri iri)
    (assoc iri :type :versionIRI :innerType :versionIRI)
    (throw+ {:type ::notIRI :IRI iri})))

(defn directImports [imports]
 "directlyImportsDocuments := { 'Import' '(' IRI ')' }"
 (if (every? (fn [x] (= (:type x) :import)) imports)
   {:imports imports :type :imports :innerType :imports}
   (throw+ {:type ::notImports :imports imports})))

(defn directImport [iri]
 "'Import' '(' IRI ')'"
  (if (:iri iri)
	  (assoc iri :type :import :innerType :import)
   (throw+ {:type ::notIRI :IRIs iri})))

(defn ontologyAnnotations [annotations]
 "ontologyAnnotations := { Annotation }"
 (if (every? (fn [x] (= (:type x) :annotation)) annotations)
   {:annotations annotations :type :annotations}
   (throw+ {:type ::notAnnotations :annotations annotations})))

(defn axioms [axioms]
 "axioms := { Axiom }"
 (if (every? (fn [x] (= (:type x) :axiom)) axioms)
    {:axioms axioms :type :axioms}
    (throw+ {:type ::notAxioms :Axioms axioms})))

(defn ontologyFile
  ([ontology](-ontologyFile ontology))
  ([pref ontology](-ontologyFile (prefixes pref) ontology)))

(defn ontology
 ([imports annotations axiom](-ontology (directImports imports) (ontologyAnnotations annotations) (axioms axiom)))
 ([onto imports annotations axiom](-ontology (ontologyIRI onto) (directImports imports) (ontologyAnnotations annotations) (axioms axiom)))
 ([onto vers imports annotations axiom](-ontology (ontologyIRI onto) (versionIRI vers) (directImports imports) (ontologyAnnotations annotations) (axioms axiom))))