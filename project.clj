(defproject onto.aaroneberhart/fOWL "0.0.1-SNAPSHOT"
 :description "(f OWL) is a minimalistic functional programming style ontology editor"
 :url "https://github.com/aaronEberhart/fOWL.git"
 :license {:name "Don't steal my stuff"}
 :dependencies [[org.clojure/clojure "1.10.1"]]
 :aot [main]
 :main main 
 :deploy-releases [["releases"  {:sign-releases false :url "https://clojars.org/projects"}]
                   ["snapshots" {:sign-releases false :url "https://clojars.org/projects"}]]
 :profiles {:uberjar {:aot :all}})
 ;CLOJARS_19743277de649a870db38ce46b309e1ae0db53681b8e39a75baa455ea5a7
