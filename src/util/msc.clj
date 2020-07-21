(ns util.msc
 (:require [clojure.string :as str])
 )

(def logfile "for logging" "output.txt")
(defn strToFile "for logging" [file str]
 (spit logfile (with-out-str (println str)) :append true))


(def fib-seq-seq "for testing lazy seqs" ((fn fib [a b] (lazy-seq (cons a (fib b (+ a b))))) 0 1))

(defn lazer
 "makes any valid coll into a lazy-seq,
 with an optional filter and map on elements.
 based on https://clojure.org/reference/lazy"
 ([coll]
  (lazer coll (constantly true) identity))
 ([coll filteringPredicate]
  (lazer coll filteringPredicate identity))
 ([coll filteringPredicate mapFunction]
  (lazy-seq
   ((fn [coll filteringPredicateg mapFunction]
    (when-let [coll (seq coll)]
     (if (filteringPredicate (first coll))
      (cons (mapFunction (first coll)) (lazer (rest coll) filteringPredicate mapFunction))
      (recur (rest coll) filteringPredicate mapFunction))))
   coll filteringPredicate mapFunction))))
