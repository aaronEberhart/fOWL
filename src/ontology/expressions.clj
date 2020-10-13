(ns ontology.expressions
 "Functions that represent OWL expressionss"
 (:require [ontology.components :as co])
 (:refer-clojure :exclude [class and or not]))

(def ^:no-doc classTypes
 #{:className :class :and :or :not :nominal :exists :all :partialRole :Self :>=exists :<=exists :=exists :dataExists :dataAll :partialDataRole :>=dataExists :<=dataExists :=dataExists})

(defn- -role
 "ObjectPropertyExpression := ObjectProperty | InverseObjectProperty"
 [role]
 (if (= (:type role) :roleName)
 (assoc role :type :role)
 (if (= (:type role) :role)
  (assoc role :type :role)
 	(throw (Exception. (str {:type ::notRole :roleName role}))))))

(defn role
 "ObjectPropertyExpression := ObjectProperty | InverseObjectProperty"
 ([iri]
  (if (string? iri)
   (-role (co/roleName (co/IRI iri)))
   (if (:type iri)
   		(if (= (:type iri) :roleChain)
   			iri
    	(-role iri))
    (-role (co/roleName iri)))))
 ([prefix name](-role (co/roleName prefix name)))
 ([prefix name namespace](-role (co/roleName prefix name namespace))))

(defn inverseRole
 "ObjectPropertyExpression := ObjectProperty | InverseObjectProperty"
 ([iri]
 (if (string? iri)
  (-role (co/inverseRoleName (co/IRI iri)))
  (if (:type iri)
   (if (= (:innerType iri) :inverseRole)
    iri
    (throw (Exception. (str {:type ::notInverseRole :roleName iri}))))
   (-role (co/inverseRoleName iri)))))
 ([prefix name](-role (co/inverseRoleName prefix name)))
 ([prefix name namespace](-role (co/inverseRoleName prefix name namespace))))

(defn- -dataRole 
 "DataPropertyExpression := DataProperty"
 [dataRole]
 (if (= (:type dataRole) :dataRole)
 dataRole
 (if (= (:type dataRole) :dataRoleName)
  (assoc dataRole :type :dataRole)
  (throw (Exception. (str {:type ::notDataRole :dataRole dataRole}))))))

(defn dataRole
 "DataPropertyExpression := DataProperty"
 ([iri]
 (if (string? iri)
  (-dataRole (co/dataRoleName (co/IRI iri)))
  (if (:type iri)
   (-dataRole iri)
   (-dataRole (co/dataRoleName iri)))))
 ([prefix name](-dataRole (co/dataRoleName prefix name)))
 ([prefix name namespace](-dataRole (co/dataRoleName prefix name namespace))))

(defn- -class
 "ClassExpression := Class | ObjectIntersectionOf | ObjectUnionOf | ObjectComplementOf | ObjectOneOf | ObjectSomeValuesFrom | ObjectAllValuesFrom |
           ObjectHasValue | ObjectHasSelf | ObjectMinCardinality | ObjectMaxCardinality | ObjectExactCardinality | DataSomeValuesFrom |
           DataAllValuesFrom | DataHasValue | DataMinCardinality | DataMaxCardinality | DataExactCardinality"
 [class]
 (if (contains? classTypes (:type class))
  (assoc class :type :class)
  (throw (Exception. (str {:type ::notClass :class class})))))

(defn class
 "ClassExpression := Class | ObjectIntersectionOf | ObjectUnionOf | ObjectComplementOf | ObjectOneOf | ObjectSomeValuesFrom | ObjectAllValuesFrom |
           ObjectHasValue | ObjectHasSelf | ObjectMinCardinality | ObjectMaxCardinality | ObjectExactCardinality | DataSomeValuesFrom |
           DataAllValuesFrom | DataHasValue | DataMinCardinality | DataMaxCardinality | DataExactCardinality"
 ([iri]
  (if (string? iri)
   (-class (co/className (co/IRI iri)))
   (if (:type iri)
    (-class iri)
    (-class (co/className iri)))))
 ([prefix name](prn prefix name)(-class (co/className prefix name)))
 ([prefix name namespace](-class (co/className prefix name namespace))))

(defn- -and 
 "ObjectIntersectionOf := 'ObjectIntersectionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'"
 [classes]
 (if (every? (fn [x] (= (:type x) :class)) classes)
  {:classes classes :type :and :innerType :and}
  (throw (Exception. (str {:type ::notClass :class classes})))))

(defn and
 "ObjectIntersectionOf := 'ObjectIntersectionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'"
 ([class1 class2]
 (let [classSet #{(class class1) (class class2)}]
  (if (= 1 (count classSet))(first classSet)(-class (-and classSet)))))
 ([class1 class2 & classes]
 (let [classes (if (= (type classes) clojure.lang.ArraySeq) (apply map class classes)(map class classes))
       classSet (into #{} (conj classes (class class1) (class class2)))]
  (if (= 1 (count classSet))(first classSet)(-class (-and classSet))))))

(defn- -or 
 "ObjectUnionOf := 'ObjectUnionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'"
 [classes]
 (if (every? (fn [x] (= (:type x) :class)) classes)
  {:classes classes :type :or :innerType :or}
  (throw (Exception. (str {:type ::notClass :class classes})))))

(defn or
 "ObjectUnionOf := 'ObjectUnionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'"
 ([class1 class2]
 (let [classSet #{(class class1) (class class2)}]
  (if (= 1 (count classSet))(first classSet)(-class (-or classSet)))))
 ([class1 class2 & classes]
 (let [classes (if (= (type classes) clojure.lang.ArraySeq) (apply map class classes)(map class classes))
       classSet (into #{} (conj classes (class class1) (class class2)))]
  (if (= 1 (count classSet))(first classSet)(-class (-or classSet))))))

(defn- -not 
 "ObjectComplementOf := 'ObjectComplementOf' '(' ClassExpression ')'"
 [class]
 (if (= (:type class) :class)
  {:class class :innerType :not :type :not}
  (throw (Exception. (str {:type ::notClass :class class})))))

(defn not 
 "ObjectComplementOf := 'ObjectComplementOf' '(' ClassExpression ')'"
 [c]
 (class (-not (class c))))

(defn- -nominal 
 "ObjectOneOf := 'ObjectOneOf' '(' Individual { Individual }')'"
 [individuals]
 (if (every? (fn [x] (= (:type x) :individual)) individuals)
  {:individuals individuals :type :nominal :innerType :nominal}
  (throw (Exception. (str {:type ::notIndividuals :individuals individuals})))))

(defn nominal
 "ObjectOneOf := 'ObjectOneOf' '(' Individual { Individual }')'"
 ([individual](-class (-nominal #{(co/individual individual)})))
 ([individual & individuals](-class (-nominal (into #{} (conj (if (= (type individuals) clojure.lang.ArraySeq) (apply map co/individual individuals) (map co/individual individuals))(co/individual individual)))))))

(defn- -exists 
 "ObjectSomeValuesFrom := 'ObjectSomeValuesFrom' '(' ObjectPropertyExpression ClassExpression ')'"
 [role class]
 (if (= (:type role) :role)
  (if (= (:type class) :class)
   {:class class :role role :type :exists :innerType :exists}
   (throw (Exception. (str {:type ::notClass :class class}))))
  (throw (Exception. (str {:type ::notRole :role role})))))

(defn exists 
 "ObjectSomeValuesFrom := 'ObjectSomeValuesFrom' '(' ObjectPropertyExpression ClassExpression ')'"
 [r c]
 (-class (-exists (role r)(class c))))

(defn- -all 
 "ObjectAllValuesFrom := 'ObjectAllValuesFrom' '(' ObjectPropertyExpression ClassExpression ')'"
 [role class]
 (if (= (:type role) :role)
  (if (= (:type class) :class)
   {:class class :role role :type :all :innerType :all}
   (throw (Exception. (str {:type ::notClass :role role :class class}))))
  (throw (Exception. (str {:type ::notRole :role role})))))

(defn all 
 "ObjectAllValuesFrom := 'ObjectAllValuesFrom' '(' ObjectPropertyExpression ClassExpression ')'"
 [r c]
 (-class (-all (role r)(class c))))

(defn- -partialRole 
 "ObjectHasValue := 'ObjectHasValue' '(' ObjectPropertyExpression Individual ')'"
 [role individual]
 (if (= (:type role) :role)
  (if (= (:type individual) :individual)
   {:individual individual :role role :type :partialRole :innerType :partialRole}
   (throw (Exception. (str {:type ::notIndividual :individual individual}))))
  (throw (Exception. (str {:type ::notRole :role role})))))

(defn partialRole 
 "ObjectHasValue := 'ObjectHasValue' '(' ObjectPropertyExpression Individual ')'"
 [r i]
 (-class (-partialRole (role r) (co/individual i))))

(defn- -Self 
 "ObjectHasSelf := 'ObjectHasSelf' '(' ObjectPropertyExpression ')'"
 [role]
 (if (= (:type role) :role)
  {:role role :type :Self :innerType :Self}
  (throw (Exception. (str {:type ::notRole :role role})))))

(defn Self
 "ObjectHasSelf := 'ObjectHasSelf' '(' ObjectPropertyExpression ')'"
 ([iri](class (-Self (role iri))))
 ([prefix name](-class (-Self (role prefix name))))
 ([prefix name namespace](-class (-Self (role prefix name namespace)))))

(defn- ->=exists
 "ObjectMinCardinality := 'ObjectMinCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
 ([nat role]
  (if (<= 0 nat)
   (if (= (:type role) :role)
    {:role role :nat nat :type :>=exists :innerType :>=exists}
    (throw (Exception. (str {:type ::notRole :role role}))))
   (throw (Exception. (str {:type ::notNaturalNumber :nat nat})))))
 ([nat role class]
  (if (<= 0 nat)
   (if (= (:type role) :role)
    (if (= (:type class) :class)
     {:role role :class class :nat nat :type :>=exists :innerType :>=exists}
     (throw (Exception. (str {:type ::notClass :class class}))))
    (throw (Exception. (str {:type ::notRole :role role}))))
   (throw (Exception. (str {:type ::notNaturalNumber :nat nat}))))))

(defn >=exists
 "ObjectMinCardinality := 'ObjectMinCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
 ([nat r](-class (->=exists nat (role r))))
 ([nat r c](-class (->=exists nat (role r)(class c)))))

(defn- -<=exists
 "ObjectMaxCardinality := 'ObjectMaxCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
 ([nat role]
  (if (<= 0 nat)
   (if (= (:type role) :role)
    {:role role :nat nat :type :<=exists :innerType :<=exists}
    (throw (Exception. (str {:type ::notRole :role role}))))
   (throw (Exception. (str {:type ::notNaturalNumber :nat nat})))))
 ([nat role class]
  (if (<= 0 nat)
   (if (= (:type role) :role)
    (if (= (:type class) :class)
     {:role role :class class :nat nat :type :<=exists :innerType :<=exists}
     (throw (Exception. (str {:type ::notClass :class class}))))
    (throw (Exception. (str {:type ::notRole :role role}))))
   (throw (Exception. (str {:type ::notNaturalNumber :nat nat}))))))

(defn <=exists
 "ObjectMaxCardinality := 'ObjectMaxCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
 ([nat r](-class (-<=exists nat (role r))))
 ([nat r c](-class (-<=exists nat (role r)(class c)))))

(defn- -=exists
 "ObjectExactCardinality := 'ObjectExactCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
 ([nat role]
  (if (<= 0 nat)
   (if (= (:type role) :role)
    {:role role :nat nat :type :=exists :innerType :=exists}
    (throw (Exception. (str {:type ::notRole :role role}))))
   (throw (Exception. (str {:type ::notNaturalNumber :nat nat})))))
 ([nat role class]
  (if (<= 0 nat)
   (if (= (:type role) :role)
    (if (= (:type class) :class)
     {:role role :class class :nat nat :type :=exists :innerType :=exists}
     (throw (Exception. (str {:type ::notClass :class class}))))
    (throw (Exception. (str {:type ::notRole :role role}))))
   (throw (Exception. (str {:type ::notNaturalNumber :nat nat}))))))

(defn =exists
 "ObjectExactCardinality := 'ObjectExactCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
 ([nat r](-class (-=exists nat (role r))))
 ([nat r c](-class (-=exists nat (role r)(class c)))))

(defn- -dataExists
 "DataSomeValuesFrom := 'DataSomeValuesFrom' '(' DataPropertyExpression { DataPropertyExpression } DataRange ')'"
 [dataRoles dataRange]
 (if (every? (fn [x] (= (:type x) :dataRole)) dataRoles)
  (if (= (:type dataRange) :dataRange)
   (if (= (:arity dataRange) (count dataRoles))
    {:dataRoles dataRoles :dataRange dataRange :arity (:arity dataRange) :type :dataExists :innerType :dataExists}
    (throw (Exception. (str {:type ::incorrectArity :dataRange dataRange}))))
   (throw (Exception. (str {:type ::notDataRange :dataRange dataRange}))))
  (throw (Exception. (str {:type ::notDataRoles :role role})))))

(defn dataExists 
 "DataSomeValuesFrom := 'DataSomeValuesFrom' '(' DataPropertyExpression { DataPropertyExpression } DataRange ')'"
 [dataRoles dataRange]
 (if (string? dataRoles)
  (-class (-dataExists #{(dataRole dataRoles)} (co/dataRange dataRange)))
  (if (map? dataRoles)
   (-class (-dataExists #{(dataRole dataRoles)} (co/dataRange dataRange)))
   (-class (-dataExists (into #{} (map dataRole dataRoles)) (co/dataRange dataRange))))))

(defn- -dataAll 
 "DataAllValuesFrom := 'DataAllValuesFrom' '(' DataPropertyExpression { DataPropertyExpression } DataRange ')'"
 [dataRoles dataRange]
 (if (every? (fn [x] (= (:type x) :dataRole)) dataRoles)
  (if (= (:type dataRange) :dataRange)
   (if (= (:arity dataRange) (count dataRoles))
    {:dataRoles dataRoles :dataRange dataRange :arity (:arity dataRange) :type :dataAll :innerType :dataAll}
    (throw (Exception. (str {:type ::incorrectArity :dataRange dataRange}))))
   (throw (Exception. (str {:type ::notDataRange :dataRange dataRange}))))
 (throw (Exception. (str {:type ::notDataRoles :role role})))))

(defn dataAll 
 "DataAllValuesFrom := 'DataAllValuesFrom' '(' DataPropertyExpression { DataPropertyExpression } DataRange ')'"
 [dataRoles dataRange]
 (if (string? dataRoles)
  (-class (-dataAll #{(dataRole dataRoles)} (co/dataRange dataRange)))
  (if (map? dataRoles)
   (-class (-dataAll #{(dataRole dataRoles)} (co/dataRange dataRange)))
   (-class (-dataAll (into #{} (map dataRole dataRoles)) (co/dataRange dataRange))))))

(defn- ->=dataExists
 "DataMinCardinality := 'DataMinCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
 ([nat dataRole]
  (if (<= 0 nat)
   (if (= (:type dataRole) :dataRole)
    {:dataRole dataRole :nat nat :type :>=dataExists :innerType :>=dataExists}
    (throw (Exception. (str {:type ::notDataRole :dataRole dataRole}))))
   (throw (Exception. (str {:type ::notNaturalNumber :nat nat})))))
 ([nat dataRole dataRange]
  (if (<= 0 nat)
   (if (= (:type dataRole) :dataRole)
    (if (= (:type dataRange) :dataRange)
     {:dataRole dataRole :dataRange dataRange :nat nat :type :>=dataExists :innerType :>=dataExists}
     (throw (Exception. (str {:type ::notDataRange :dataRange dataRange}))))
    (throw (Exception. (str {:type ::notDataRole :dataRole dataRole}))))
   (throw (Exception. (str {:type ::notNaturalNumber :nat nat}))))))

(defn >=dataExists
 "DataMinCardinality := 'DataMinCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
 ([nat dr]
  (-class (->=dataExists nat (dataRole dr))))
 ([nat dr dataRange]
  (-class (->=dataExists nat (dataRole dr) (co/dataRange dataRange)))))

(defn- -<=dataExists
 "DataMaxCardinality := 'DataMaxCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
 ([nat dataRole]
  (if (<= 0 nat)
   (if (= (:type dataRole) :dataRole)
    {:dataRole dataRole :nat nat :type :<=dataExists :innerType :<=dataExists}
    (throw (Exception. (str {:type ::notDataRole :dataRole dataRole}))))
   (throw (Exception. (str {:type ::notNaturalNumber :nat nat})))))
 ([nat dataRole dataRange]
  (if (<= 0 nat)
   (if (= (:type dataRole) :dataRole)
    (if (= (:type dataRange) :dataRange)
     {:dataRole dataRole :dataRange dataRange :nat nat :type :<=dataExists :innerType :<=dataExists}
     (throw (Exception. (str {:type ::notDataRange :dataRange dataRange}))))
    (throw (Exception. (str {:type ::notDataRole :dataRole dataRole}))))
   (throw (Exception. (str {:type ::notNaturalNumber :nat nat}))))))

(defn <=dataExists
 "DataMaxCardinality := 'DataMaxCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
 ([nat dr](-class (-<=dataExists nat (dataRole dr))))
 ([nat dr dataRange](-class (-<=dataExists nat (dataRole dr) (co/dataRange dataRange)))))

(defn- -=dataExists
 "DataExactCardinality := 'DataExactCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
 ([nat dataRole]
  (if (<= 0 nat)
   (if (= (:type dataRole) :dataRole)
    {:dataRole dataRole :nat nat :type :=dataExists :innerType :=dataExists}
    (throw (Exception. (str {:type ::notDataRole :dataRole dataRole}))))
   (throw (Exception. (str {:type ::notNaturalNumber :nat nat})))))
 ([nat dataRole dataRange]
  (if (<= 0 nat)
   (if (= (:type dataRole) :dataRole)
    (if (= (:type dataRange) :dataRange)
     {:dataRole dataRole :dataRange dataRange :nat nat :type :=dataExists :innerType :=dataExists}
     (throw (Exception. (str {:type ::notDataRange :dataRange dataRange}))))
    (throw (Exception. (str {:type ::notDataRole :dataRole dataRole}))))
   (throw (Exception. (str {:type ::notNaturalNumber :nat nat}))))))

(defn =dataExists
 "DataExactCardinality := 'DataExactCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
 ([nat dr](-class (-=dataExists nat (dataRole dr))))
 ([nat dr dataRange](-class (-=dataExists nat (dataRole dr) (co/dataRange dataRange)))))

(defn- -partialDataRole 
 "DataHasValue := 'DataHasValue' '(' DataPropertyExpression Literal ')'"
 [dataRole literal]
 (if (= (:type dataRole) :dataRole)
  (if (= (:type literal) :literal)
   {:literal literal :dataRole dataRole :type :partialDataRole :innerType :partialDataRole}
   (throw (Exception. (str {:type ::notLiteral :literal literal}))))
 (throw (Exception. (str {:type ::notDataRole :dataRole dataRole})))))

(defn partialDataRole 
 "DataHasValue := 'DataHasValue' '(' DataPropertyExpression Literal ')'"
 [dr literal]
 (-class (-partialDataRole (dataRole dr) (co/literal literal))))
