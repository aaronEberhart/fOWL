(ns util.msc (:import (java.io PrintStream)))

(def stdErr (System/err))
(def newStdErr (PrintStream. (clojure.java.io/file "err")))

(defn streamToList [stream]
	(iterator-seq (.iterator stream))
)

(defn closePrintStream [stream]
	(.close stream)
)

(defn setStdErr [err]
	(System/setErr err)
)

(defn redirectStdErr [old new]
	(closePrintStream old)(setStdErr new)
)
