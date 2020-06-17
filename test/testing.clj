(ns testing
 (:use [clojure.test])
 (:require [ontology.IO :as oio][ontology.axioms :as ax][ontology.components :as co][ontology.expressions :as ex][ontology.annotations :as ann]
           [ontology.facts :as fct][ontology.file :as fl]
           [unReasoner.preprocessing :as pre][unReasoner.consistency :as con][unReasoner.tableau :as tab]
           [util.msc :as msc]
           [clojure.string :as str][clojure.java.io :as io]))

(defn runFileTest [file] 
 (if (and (.isFile file) (not (re-matches #"^catalog[\s\S]*" (.getName file))))
  (do (println (.getName file))
    ;(msc/strToFile (str "Reading and Copying " (.getName file)))
    (oio/makeOWLFile (str "OWL/copies/" (.getName file)) (time (oio/readFunctionalFile (io/file file))))
    ;(msc/strToFile (str "Reading Copy Of " (.getName file)))
    ;(oio/readFunctionalFile (str "OWL/copies/" (.getName file)))
    ;(msc/strToFile (str "Moving Original " (.getName file)))
    (io/copy file (io/file (str "OWL/checked/" (.getName file))))
    (io/delete-file file)
    ;(msc/strToFile (str "finished " (.getName file)))
    ))
 true)

(defn runReasonerTest [file]
 (if (and (.isFile file) (not (re-matches #"^catalog[\s\S]*" (.getName file))))
   (let [_ (println "Reading" (.getName file))
     ontology (time (oio/readFunctionalFile (io/file file)))
     prefixes (take-while some? (oio/prefixes ontology))
     _ (println "Prefixes: " (count prefixes))
     ontiri (oio/ontologyIRI ontology)
     _ (println "Ontology IRI: " (:iri ontiri))
     versiri (oio/versionIRI ontology)
     _ (println "Version IRI: " (:iri versiri))
     imp (take-while some? (oio/imports ontology))
     _ (println "Imports: " (count imp))
     ann (take-while some? (oio/annotations ontology))
     _ (println "Ontology Annotations: " (count ann))
     classAxioms (oio/classAxiomsNoAnnotations ontology)
     roleAxioms (oio/roleAxiomsNoAnnotations ontology)
     facts (oio/factsNoAnnotations ontology)
     dataAxioms (oio/dataRoleAxiomsNoAnnotations ontology)
     ]
     (pre/process classAxioms)))
 true);

(deftest fileTests
	(io/delete-file "output.txt" true)
 (doseq [file (file-seq (io/file "OWL/fs/"))] (is (runFileTest file))))

;(deftest reasonerTests
	;(io/delete-file "output.txt" true)
 ;(doseq [file (file-seq (io/file "OWL/fs/"))] (is (runReasonerTest file))))