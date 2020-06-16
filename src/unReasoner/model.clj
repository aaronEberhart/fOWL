(ns unReasoner.model
	(:require	[clojure.java.io :as io][clojure.string :as str]
						[ontology.normalize :as norm][ontology.axioms :as ax][ontology.expressions :as ex][ontology.components :as co])
	(:use [slingshot.slingshot :only [throw+]]))

(defn init [& args]
  {:classNames #{} :classDefinitions {} :classHierarchy {} :roleNames #{} :roleHierarchy {} ; TODO
		})
