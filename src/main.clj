(ns main
 (:use [clojure.repl])
 (:require [ontology.functions :refer :all]
           [clojure.string :as str][clojure.java.io :as io]))



(defn -main [& args]
       (doseq [x [(implies (exists "r" "a") "b")
                  (implies (-or "b" "c") (-not (-or "d" "e")))
                  (implies (roleChain "r" (inverseRole "s")) "t")
                  (fact (inverseRole "s") "i" "j")
                  (fact "a" "i")
                  (fact "d" "i" (stringLiteral "l"))
                  (implies (<=exists 4 "r" "c") 
                           (-not (-or (-and "d" "e") 
                                      (-not (-and "f" "g")))))
                  (getNNF (implies (<=exists 4 "r" "c") 
                                   (-not (-or (-and "d" "e") 
                                              (-not (-and "f" "g"))))))]]
        (println x))
 )


(def printStyle 
 "Change printStyle to modify how the terminal output looks (files will still output in functional syntax)
 
  toString - standard Functional syntax
  toDLString - DL instead of functional"
 toString) 
(defmethod print-method clojure.lang.PersistentArrayMap [x w](.write w (printStyle x)))