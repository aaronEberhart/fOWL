(defproject onto.aaroneberhart/fowl "0.0.1-SNAPSHOT"
 :description "(f OWL) is a minimalistic functional programming style ontology editor"
 :url "https://github.com/aaronEberhart/fOWL"
 :scm {:name "git" :url "https://github.com/aaronEberhart/fOWL"}
 :license {:name "GNU General Public License v3.0"
 	         :url "https://www.gnu.org/licenses/"}
 :dependencies [[org.clojure/clojure "1.10.1"]]
 :main fowl.core
 :aot [fowl.core]
 :deploy-repositories [["clojars" {:name "Clojars" :url "https://clojars.org/repo/fOWL"}]]
 :repositories [["clojars" {:name "Clojars" :url "https://clojars.org/repo/"}]]
 :profiles {:uberjar {:aot :all}})
