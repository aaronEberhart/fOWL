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
  (lazy-seq coll))
 ([coll filteringPredicate]
  (lazy-seq
   ((fn [coll filteringPredicate]
    (when-let [coll (seq coll)]
     (if (filteringPredicate (first coll))
      (cons (first coll) (lazer (rest coll) filteringPredicate))
      (recur (rest coll) filteringPredicate))))
   coll filteringPredicate)))
 ([coll filteringPredicate mapFunction]
  (lazy-seq
   ((fn [coll filteringPredicate mapFunction]
    (when-let [coll (seq coll)]
     (if (filteringPredicate (first coll))
      (cons (mapFunction (first coll)) (lazer (rest coll) filteringPredicate mapFunction))
      (recur (rest coll) filteringPredicate mapFunction))))
   coll filteringPredicate mapFunction))))

(defn fowlWalk
  "Adapted From: https://github.com/clojure/clojure/blob/master/src/clj/clojure/walk.clj
   Traverses any collection, but optimized for (f OWL) structures
   Inner is used to recurse. Outer is applied to terminals."
  [form inner outer]
  (case (:innerType form)

   ;Not an OWL map
   nil (cond 
        (list? form)
         (outer (apply list (map inner form)))
        (instance? clojure.lang.IMapEntry form)
         (outer (clojure.lang.MapEntry/create (inner (key form)) (inner (val form))))
        (seq? form)
         (outer (doall (map inner form)))
        (instance? clojure.lang.IRecord form)
         (outer (reduce (fn [r x] (conj r (inner x))) form form))
        (coll? form)
         (outer (into (empty form) (map inner form)))
        :else (outer form))

   ;atoms
   :lexicalForm (outer form)
   :typedLiteral (outer form)
   :stringLiteralNoLanguage (outer form)
   :stringLiteralWithLanguage (outer form)
   :top (outer form)
   :bot (outer form)
   :roleTop (outer form)
   :roleBot (outer form)
   :dataType (outer form)
   :restrictedValue (outer form)
   :className (outer form)
   :roleName (outer form)
   :inverseRoleName (outer form)
   :dataRoleName (outer form)
   :namedIndividual (outer form)
   :anonymousIndividual (outer form)
   :annotationRole (outer form)
   :annotationSubject (outer form)
   :annotationValue (outer form) 
   :dataNot (outer (update form :dataRange outer))
   :dataOr (outer (update form :dataRanges #(into #{} (map inner %))))
   :dataAnd (outer (update form :dataRanges #(into #{} (map inner %))))
   :dataOneOf (outer (update form :literals #(into #{} (map outer %))))
   :datatypeRestriction (outer (update form :restrictedValues #(into #{} (map inner %))))

   ;filestuff
   :ontology (-> (if (:prefixes form) (update form :prefixes #(into #{} (map outer %))) form)
                 (#(if (:versionIRI %) (update % :versionIRI outer) %))
                 (#(if (:ontologyIRI %) (update % :ontologyIRI outer) %))
                 (#(update % :imports (fn [x] (into #{} (map outer x)))))
                 (#(update % :annotations (fn [x] (into #{} (map inner x)))))
                 (#(update % :axioms (fn [x] (into #{} (map inner x)))))
                 outer)
   :ontologyIRI (outer form) 
   :versionIRI (outer form) 
   :prefix (outer form) 
   :prefixes (outer (update form :prefixes #(into #{} (map outer %))))
   :import (outer form)
   :imports (outer (update form :imports #(into #{} (map outer %))))
   :declaration (outer (update (if (:annotations form) (update form :annotations inner) form) :name outer))

  ;data roles
  :partialDataRole (outer (update form :dataRole outer))
  :=dataExists (outer (update (if (:dataRange form) (update form :dataRange inner) form) :dataRole outer))
  :<=dataExists (outer (update (if (:dataRange form) (update form :dataRange inner) form) :dataRole outer))
  :>=dataExists (outer (update (if (:dataRange form) (update form :dataRange inner) form) :dataRole outer))
  :dataExists (outer (update (update form :dataRoles #(into #{} (map outer %))) :dataRange inner))
  :dataAll (outer (update (update form :dataRoles #(into #{} (map outer %))) :dataRange inner))

   ;roles
   :roleChain (outer (update form :roles #(into [] (map outer %))))
   :partialRole (outer (update form :role outer))
   :=exists (outer (update (if (:class form) (update form :class inner) form) :role outer))
   :<=exists (outer (update (if (:class form) (update form :class inner) form) :role outer))
   :>=exists (outer (update (if (:class form) (update form :class inner) form) :role outer))
   :exists (outer (update (if (:class form) (update form :class inner) form) :role outer))
   :all (outer (update (if (:class form) (update form :class inner) form) :role outer))

   ;classes
   :not (outer (update form :class inner))
   :or (outer (update form :classes #(into #{} (map inner %))))
   :and (outer (update form :classes #(into #{} (map inner %))))
   :Self (outer (update form :role outer))
   :nominal (outer (update form :individuals #(into #{} (map outer %))))

   ;annotation
   :annotation (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :annotationRole outer) :annotationValue outer))
   :axiomAnnotations (outer (update form :annotations #(into #{} (map inner %))))
   :metaAnnotations (outer (update form :annotations #(into #{} (map inner %))))
   :annotationFact (outer (update (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :annotationRole outer) :annotationSubject outer) :annotationValue outer))
   :annotationImplication (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :antecedent inner) :consequent inner))

   ;assertions
   :=individuals (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :individuals #(into #{} (map inner %))))
   :!=individuals  (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :individuals #(into #{} (map inner %))))
   :classFact (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :class inner) :individual outer))
   :roleFact (outer (update (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :role outer) :fromIndividual outer) :toIndividual outer))
   :notRoleFact (outer (update (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :role outer) :fromIndividual outer) :toIndividual outer))
   :dataRoleFact (outer (update (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :dataRole outer) :fromIndividual outer) :toLiteral outer))
   :notDataRoleFact (outer (update (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :dataRole outer) :fromIndividual outer) :toLiteral outer))

   ;axioms
   :hasKey (outer (update (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :class inner) :roles #(into #{} (map outer %))) :dataRoles #(into #{} (map outer %))))
   :annotationDomain (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :annotationRole outer))
   :annotationRange (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :annotationRole outer))
   :classImplication (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :antecedent inner) :consequent inner))
   :=classes (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :classes #(into #{} (map inner %))))
   :disjClasses (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :classes #(into #{} (map inner %))))
   :disjOr (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :classes #(into #{} (map inner %))) :class inner))
   :roleImplication  (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :antecedent inner) :consequent outer))
   :=roles (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :roles #(into #{} (map outer %))))
   :disjRoles (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :roles #(into #{} (map outer %))))
   :inverseRoles (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :role outer) :inverse outer))
   :roleDomain (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :role outer) :class inner))
   :roleRange (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :role outer) :class inner))
   :functionalRole (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :role outer))
   :functionalInverseRole (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :role outer))
   :reflexiveRole (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :role outer))
   :irreflexiveRole (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :role outer))
   :symmetricRole (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :role outer))
   :asymmetricRole (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :role outer))
   :transitiveRole (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :role outer))
   :dataRoleImplication (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :antecedent outer) :consequent outer))
   :=dataRoles (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :dataRoles #(into #{} (map outer %))))
   :disjDataRoles (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :dataRoles #(into #{} (map outer %))))
   :dataRoleDomain (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :dataRole outer) :class inner))
   :dataRoleRange (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :dataRole outer) :dataRange inner))
   :functionalDataRole (outer (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :dataRole outer))
   :newDataType (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :dataType outer) :dataRange inner))

   ;swrl
   :classAtom (outer (update (update form :class inner) :iarg outer))
   :dataRangeAtom (outer (update (update form :dataRange outer) :darg outer))
   :roleAtom (outer (update (update (update form :role outer) :iarg1 outer) :iarg2 outer))
   :dataRoleAtom (outer (update (update (update form :dataRole outer) :iarg outer) :darg outer))
   :builtInAtom (outer (update (update form :iri outer) :dargs #(into #{} (map outer %))))
   :=individualsAtom (outer (update (update form :iarg1 outer) :iarg2 outer))
   :!=individualsAtom (outer (update (update form :iarg1 outer) :iarg2 outer))
   :variable (outer form)
   :dlSafeRule (outer (update (update (if (:annotations form) (update form :annotations #(into #{} (map inner %))) form) :head #(into #{} (map inner %))) :body #(into #{} (map inner %))))))

(defn fowlPostwalk
 "Adapted From: https://github.com/clojure/clojure/blob/master/src/clj/clojure/walk.clj
  Postorder traversal"
  [f form]
  (fowlWalk form (partial fowlPostwalk f) f))

(defn fowlPrewalk
 "Adapted From: https://github.com/clojure/clojure/blob/master/src/clj/clojure/walk.clj
  Preorder traversal"
 [f form]
 (fowlWalk (f form) (partial fowlPrewalk f) identity))