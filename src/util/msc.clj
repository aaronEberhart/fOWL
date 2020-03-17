(ns util.msc)

(defn streamToList [stream]
	(iterator-seq (.iterator stream))
)
