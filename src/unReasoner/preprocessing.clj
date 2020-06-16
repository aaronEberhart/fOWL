(ns unReasoner.preprocessing
 (:require [clojure.java.io :as io][clojure.string :as str]
           [unReasoner.model :as mdl]
           [ontology.normalize :as norm][ontology.axioms :as ax][ontology.expressions :as ex][ontology.components :as co]
           [util.msc :as msc])
 (:use [slingshot.slingshot :only [throw+]]))

(defn unfold [model axiom]
 (let [_ (prn axiom)
    nnf (norm/getNNF axiom)
    _ (prn nnf)
    csnf (norm/getCSNF axiom)
    _ (prn csnf)
    dsnf (norm/getDSNF axiom)
    _ (prn dsnf)
    _ (if (seq? nnf)
      (msc/strToFile (str "Original " axiom "\nNNF      " (str/join "\n         " nnf)"\nCSNF     " (str/join "\n         " csnf) "\nDSNF     " (str/join "\n         " dsnf) "\n"))
      (msc/strToFile (str "Original " axiom "\nNNF      " nnf "\nCSNF     " csnf "\nDSNF     " dsnf "\n")))
    ]
    [model axiom]
 ))

(defn process
 ([axioms](reduce process (mdl/init) axioms))
 ([model axiom]
  (let [;_ (println axiom "\n" model)
     [model axiom] (unfold model axiom)]
   model)))
