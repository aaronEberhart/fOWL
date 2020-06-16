(defproject FOWL "0.1.0"
	:description "FIXME: write description"
	:dependencies [[org.clojure/clojure "1.10.1"]
								 [slingshot "0.12.2"]
								 ;[com.hermit-reasoner/org.semanticweb.hermit "1.3.8.4"]
								 ;[net.sourceforge.owlapi/pellet-owlapi-ignazio1977 "2.4.0-ignazio1977" :exclusions [net.sourceforge.owlapi/owlapi-distribution]]
								 ]
	:main main
	:target-path "target/%s"
	:profiles {:uberjar {:aot :all}})
