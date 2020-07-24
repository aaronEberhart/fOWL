(ns fowl
 (:gen-class)
 (:require [ontology.functions :as fowl]
           [clojure.repl :refer [doc]][clojure.string :as str][clojure.java.io :as io]))

(defn -main [& args]
 (println (fowl/fact "superCool" "fowl"))
 )