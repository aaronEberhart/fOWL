(ns main
 (:require [ontology.IO :refer :all]
           [util.msc :as msc]
           [clojure.string :as str][clojure.java.io :as io]))


(defn -main [& args]
 (doseq [x 
        [(classImplication (-or "b" "c") 
                           (-not (-or "d" "e")))
         (roleImplication (roleChain "r" (inverseRole "s")) "t")
         (roleFact (inverseRole "s") "i" "j")
         (classFact "A" "i")
         (dataRoleFact "D" "i" (stringLiteralNoLanguage "l"))
         (classImplication (<=role 4 "r" "c")
                           (-not (-or (-and "d" "e") (-not (-and "f" "g")))))
         (getNNF (classImplication (<=role 4 "r" "c") 
                                   (-not (-or (-and "d" "e") (-not (-and "f" "g"))))))
         (first (getAxioms (addAxiom emptyOntology (classImplication "b" "c"))))
         ]]
  (println x)))