(ns util.core
 "Assorted random useful fuctions")

(def logfile 
 "for logging" 
 "output.txt")
(defn strToFile 
 "for logging" 
 ([str]
  (spit logfile (with-out-str (println str)) :append true))
 ([file str]
  (spit file (with-out-str (println str)) :append true)))

(def fib-seq-seq 
 "for testing lazy seqs"
 ((fn fib [a b] (lazy-seq (cons a (fib b (+ a b))))) 0 1))

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

(defn getStuffInNestedMap
 "Function for recursively retreiving data from a nested map"
 ([getThis? doThis stuff]
 (cond
  (and (map? stuff) (getThis? stuff))
    #{(doThis stuff)} 
  (map? stuff) 
   (reduce (partial getStuffInNestedMap getThis? doThis) #{} stuff)
  (coll? stuff) 
   (loop [stuff stuff
          acc #{}]
   (cond 
    (empty? stuff)
     acc
    (getThis? (first stuff))
     (recur (rest stuff) (conj acc (first stuff)))
    :else
    (recur (rest stuff) (apply conj acc (reduce (partial getStuffInNestedMap getThis? doThis) acc (first stuff))))))
  :else stuff))
 ([getThis? doThis acc [k v]]
  (cond
   (getThis? v)
    (conj acc (doThis v)) 
   (coll? v)
    (let [in (getStuffInNestedMap getThis? doThis v)]
    (apply conj acc in))     
   :else
    acc)))
