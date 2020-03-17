(ns main.core
  (:require [ontology.loader :as l])
  )

(defn -main [& args]
  (println (l/getAxioms (l/loadOntology "enslavedv2.owl")))
  )
