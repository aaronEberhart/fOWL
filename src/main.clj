(ns main
 (:use [clojure.repl])
 (:require [ontology.IO :refer :all]
           [util.msc :as msc]
           [clojure.string :as str][clojure.java.io :as io]))




(defn -main [& args]
 (doseq [x [(classImplication (existential "r" "a") "b")
           (classImplication (-or "b" "c") (-not (-or "d" "e")))
           (roleImplication (roleChain "r" (inverseRole "s")) "t")
           (roleFact (inverseRole "s") "i" "j")
           (classFact "a" "i")
           (dataRoleFact "d" "i" (stringLiteral "l"))
           (classImplication (<=role 4 "r" "c") (-not (-or (-and "d" "e") (-not (-and "f" "g")))))
           (getNNF (classImplication (<=role 4 "r" "c") (-not (-or (-and "d" "e") (-not (-and "f" "g"))))))
           (let [ont emptyOntologyFile
                 ont (setOntologyIRI ont "<http://www.test.stuff>")
          ont (addPrefix ont (prefix ":" "<http://www.test.stuff>"))
          ont (addAxioms ont #{(classImplication ":a" ":b")(classImplication ":b" ":c")(classImplication ":d" ":a")})
          _ (makeOWLFile "test.owl" ont)]
          (getClassNamesInObject ont))]]
       (println x))
 )