(defproject FOWL "0.1.0"
 :description "FIXME: write description"
 :dependencies [[org.clojure/clojure "1.10.1"]
                [slingshot "0.12.2"]]
 :main main
 :target-path "target/%s"
 :profiles {:uberjar {:aot :all}})
