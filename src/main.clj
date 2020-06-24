(ns main
 (:use [clojure.repl])
 (:require [ontology.IO :refer :all]
           [util.msc :as msc]
           [clojure.string :as str][clojure.java.io :as io]))

(defn -main [& args]
 (doseq [x [;(classImplication (existential "r" "a") "b")
            ;(classImplication (-or "b" "c") (-not (-or "d" "e")))
            ;(roleImplication (roleChain "r" (inverseRole "s")) "t")
            ;(roleFact (inverseRole "s") "i" "j")
            ;(classFact "a" "i")
            ;(dataRoleFact "d" "i" (stringLiteral "l"))
            ;(classImplication (<=role 4 "r" "c") (-not (-or (-and "d" "e") (-not (-and "f" "g")))))
            ;(getNNF (classImplication (<=role 4 "r" "c") (-not (-or (-and "d" "e") (-not (-and "f" "g"))))))
            (let [ont emptyOntology
                  ont (setOntologyIRI ont "<http://www.test.stuff>")                  
                  ont (addAxioms ont #{(classImplication (IRI "a" "" ":") ":b")(classImplication ":b" ":c")(classImplication ":d" ":a")})
                  ont (addPrefix ont (prefix ":" "<http://www.test.stuff/>"))
                  _ (makeOWLFile "test.owl" ont)
                  names (getClassNamesInObject ont)
                  ;_ (prn (:axioms ont))
                  ]
                  names)
                  ;(str "Ontology Saved Containing " (count names) " Class Names: " names))
                  ]]
       (println x)))