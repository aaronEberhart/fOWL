(ns main
	(:import (java.io FileOutputStream PrintStream))
	(:require [ontology.loader :as l][ontology.components :as c])
)

(def closeStdError (.close System/err))

(defn -main [& args]
	(println (str c/rdfsLiteral))
	(println (type (l/getAxioms (l/loadOntology "enslavedv2.owl"))))
)
