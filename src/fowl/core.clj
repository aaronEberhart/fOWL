(ns fowl.core
 (:gen-class)
 (:require [ontology.core :as ont]
           [clojure.repl :refer [doc]][clojure.string :as str][clojure.java.io :as io]))

(defn -main [& args]
 (println (ont/getNNF (ont/fact "SuperCool" "fowl")))
 )
