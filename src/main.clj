(ns main
 (:require [ontology.IO :as oio][ontology.axioms :as ax][ontology.components :as co][ontology.expressions :as ex][ontology.annotations :as ann]
           [ontology.facts :as fct][ontology.file :as fl][ontology.SWRL :as swrl][ontology.normalize :as nml][util.msc :as msc]
           [clojure.string :as str][clojure.java.io :as io]))


(defn -main [& args]
 (doseq [x 
        [(ax/classImplication (ex/or "b" "c") 
                              (ex/not (ex/or "d" "e")))
         (ax/roleImplication (ax/roleChain "r" (ex/inverseRole "s")) "t")
         (fct/roleFact (ex/inverseRole "s") "i" "j")
         (fct/classFact "A" "i")
         (ax/classImplication (ex/<=role 4 "r" "c") 
                              (ex/not (ex/or (ex/and "d" "e") (ex/not (ex/and "f" "g")))))
         (nml/getNNF (ax/classImplication (ex/<=role 4 "r" "c") 
                                          (ex/not (ex/or (ex/and "d" "e") (ex/not (ex/and "f" "g"))))))
         (first (oio/axioms (oio/addAxiom oio/emptyOntology (ax/classImplication "b" "c"))))]]
  (println x)))