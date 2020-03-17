(ns main.core
  (:require [ontology.loader :as l][ontology.components :as c])
  )

(defn -main [& args]
  (println (str c/rdfLiteral))
  ; (println (l/getAxioms (l/loadOntology "enslavedv2.owl")))
  )
