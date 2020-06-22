(ns main
 (:require [ontology.IO :refer :all]
           [util.msc :as msc]
           [clojure.string :as str][clojure.java.io :as io]))


(defn -main [& args]
 "Example Usage"
 (doseq [x 
        [(classImplication (existential "R" "a") "b")
         (classImplication (-or "b" "c") 
                           (-not (-or "d" "e")))
         (roleImplication (roleChain "r" (inverseRole "s")) "t")
         (roleFact (inverseRole "s") "i" "j")
         (classFact "A" "i")
         (dataRoleFact "D" "i" (stringLiteral "l"))
         (classImplication (<=role 4 "r" "c")
                           (-not (-or (-and "d" "e") (-not (-and "f" "g")))))
         (getNNF (classImplication (<=role 4 "r" "c") 
                                   (-not (-or (-and "d" "e") (-not (-and "f" "g"))))))
         (let [ont emptyOntology
               ont (setOntologyIRI ont "<http://www.test.stuff>")
               ont (addPrefix ont (prefix ":" "<http://www.test.stuff>"))
               ont (addAxioms ont #{(classImplication ":a" ":b")(classImplication ":b" ":c")(classImplication ":d" ":a")})
               _ (makeOWLFile "test.owl" ont)]
         "done")         
         ]]
  (println x)))