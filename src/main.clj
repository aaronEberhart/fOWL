(ns main
 (:use [clojure.repl])
 (:require [ontology.IO :refer :all]
           [util.msc :as msc]
           [clojure.string :as str][clojure.java.io :as io]))




(defn -main [& args]
 (let [ax (getAxiomsNoAnnotations (readFunctionalFile (io/file "OWL/fs/enslavedv2.owlfs.owl")))
       _ (prn (getRoleNamesInAxiom (first ax)) (first ax) (count ax))
       _ (prn (getClassesInObject ax) (count ax))
       _ (prn (count ax) (getRolesInObject ax))
      ]
  )
 )