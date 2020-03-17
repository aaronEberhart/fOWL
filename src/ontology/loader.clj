(ns ontology.loader
  (:require [clojure.java.io :as io][util.msc :as util])
  (:import (org.semanticweb.owlapi.apibinding OWLManager))
  )

(defn loadOntology [ontologyFile]
   (-> (OWLManager/createOWLOntologyManager) (.loadOntologyFromOntologyDocument (io/file ontologyFile)))
)

(defn getAxioms [ontology]
  (util/streamToList (.axioms nil ontology))
)
