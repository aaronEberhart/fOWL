(ns main
	(:require [ontology.loader :as loader][ontology.components :as components][util.msc :as msc])
)

(def redirectErrors (msc/redirectStdErr msc/stdErr msc/newStdErr))

(defn -main [& args]
	(println (first (loader/getAxioms (loader/loadOntology "enslavedv2.owl"))))
)
