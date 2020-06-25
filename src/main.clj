(ns main
 (:use [clojure.repl])
 (:require [ontology.IO :refer :all]
           [util.msc :as msc]
           [clojure.string :as str][clojure.java.io :as io]))



(defn -main [& args]
 )



(def printStyle 
 "Change printStyle to modify how the terminal output looks (files will still output in functional syntax)
 
  toString - standard Functional syntax
  toDLString - DL instead of functional (DL will not show prefixes, for maximum readability)"
 toString) 
(defmethod print-method clojure.lang.PersistentArrayMap [x w](.write w (printStyle x)))