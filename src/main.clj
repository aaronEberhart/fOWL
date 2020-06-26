(ns main
 (:use [clojure.repl])
 (:require [ontology.IO :refer :all]
           [clojure.string :as str][clojure.java.io :as io]))



(defn -main [& args]
 (-> emptyOntologyFile
          (setOntologyIRI "<http://www.test.stuff>")
          (addAnnotations (annotation "annotations" "are fun"))
          (addPrefixes (prefix "" "<http://www.test.stuff/>")
                       (prefix "" "<http://www.overwriting.test/stuff#>")
                       (prefix "prefix" "<http://www.prefix.stuff/>"))
          (addAxioms (classImplication "a" (IRI "prefix" "b"))
                     (classImplication (IRI "prefix" "b" "http://www.hasNamespace.but/overwrittenBy/prefix#") "c")
                     (classImplication "d" "a"))
          (makeOWLFile "test.owl")
          println))



(def printStyle 
 "Change printStyle to modify how the terminal output looks (files will still output in functional syntax)
 
  toString - standard Functional syntax
  toDLString - DL instead of functional"
 toString) 
(defmethod print-method clojure.lang.PersistentArrayMap [x w](.write w (printStyle x)))