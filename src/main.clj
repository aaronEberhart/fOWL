(ns main
	(:require [ontology.loader :as l][ontology.components :as c])
)

(defn -main [& args]
	(println (str c/rdfsLiteral))
	(println (type (l/getAxioms (l/loadOntology "enslavedv2.owl"))))
)
