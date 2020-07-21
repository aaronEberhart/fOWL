(ns ontology.expressions
 "Functions that represent OWL expressionss"
 (:require [ontology.components :as co])
 (:refer-clojure :exclude [class and or not]))

(def classTypes
 #{:className :class :and :or :not :nominal :exists :all :partialRole :Self :>=exists :<=exists :=exists :dataExists :dataAll :partialDataRole :>=dataExists :<=dataExists :=dataExists})

(defn- -role
 "ObjectPropertyExpression := ObjectProperty | InverseObjectProperty"
 [role]
 (if (= (:type role) :roleName)
  (assoc role :type :role)
  (if (= (:type role) :role)
   (assoc role :type :role)
  	(throw (Exception. (str  {:type ::notRole :roleName role}))))))

(defn role
 ([iri]
   (if (string? iri)
     (-role (co/roleName (co/IRI iri)))
     (if (contains? iri :type)
     		(if (= (:type iri) :roleChain)
     			iri
       	(-role iri))
       (-role (co/roleName iri)))))
 ([prefix iri](-role (co/roleName prefix iri)))
 ([prefix iri namespace](-role (co/roleName prefix iri namespace))))

(defn inverseRole
 ([iri]
  (if (string? iri)
    (-role (co/inverseRoleName (co/IRI iri)))
    (if (contains? iri :type)
      (if (= (:innerType iri) :inverseRole)
        iri
        (throw (Exception. (str  {:type ::notInverseRole :roleName iri}))))
      (-role (co/inverseRoleName iri)))))
 ([prefix iri](-role (co/inverseRoleName prefix iri)))
 ([prefix iri namespace](-role (co/inverseRoleName prefix iri namespace))))

(defn- -dataRole 
 "DataPropertyExpression := DataProperty"
 [dataRole]
 (if (= (:type dataRole) :dataRole)
  dataRole
  (if (= (:type dataRole) :dataRoleName)
   (assoc dataRole :type :dataRole)
   (throw (Exception. (str  {:type ::notDataRole :dataRole dataRole}))))))

(defn dataRole
 ([iri]
  (if (string? iri)
    (-dataRole (co/dataRoleName (co/IRI iri)))
    (if (contains? iri :type)
      (-dataRole iri)
      (-dataRole (co/dataRoleName iri)))))
 ([prefix iri](-dataRole (co/dataRoleName prefix iri)))
 ([prefix iri namespace](-dataRole (co/dataRoleName prefix iri namespace))))

(defn- -class
 "ClassExpression := Class | ObjectIntersectionOf | ObjectUnionOf | ObjectComplementOf | ObjectOneOf | ObjectSomeValuesFrom | ObjectAllValuesFrom |
                     ObjectHasValue | ObjectHasSelf | ObjectMinCardinality | ObjectMaxCardinality | ObjectExactCardinality | DataSomeValuesFrom |
                     DataAllValuesFrom | DataHasValue | DataMinCardinality | DataMaxCardinality | DataExactCardinality"
 [class]
 (if (contains? classTypes (:type class))
     (assoc class :type :class)
     (throw (Exception. (str  {:type ::notClass :class class})))))

(defn class
 ([iri]
   (if (string? iri)
    (-class (co/className (co/IRI iri)))
    (if (contains? iri :type)
      (-class iri)
      (-class (co/className iri)))))
 ([prefix iri](-class (co/className prefix iri)))
 ([prefix iri namespace](-class (co/className prefix iri namespace))))

(defn- -and 
 "ObjectIntersectionOf := 'ObjectIntersectionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'"
 [classes]
 (if (every? (fn [x] (= (:type x) :class)) classes)
   {:classes classes :type :and :innerType :and}
   (throw (Exception. (str  {:type ::notClass :class classes})))))

(defn and
 ([class1 class2]
  (let [classSet (into #{} [(class class1) (class class2)])]
   (if (= 1 (count classSet))(first classSet)(-class (-and classSet)))))
 ([class1 class2 & classes]
  (let [classSet (into #{} (map class (flatten [class1 class2 classes])))]
   (if (= 1 (count classSet))(first classSet)(-class (-and classSet))))))

(defn- -or 
 "ObjectUnionOf := 'ObjectUnionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'"
 [classes]
 (if (every? (fn [x] (= (:type x) :class)) classes)
   {:classes classes :type :or :innerType :or}
   (throw (Exception. (str  {:type ::notClass :class classes})))))

(defn or
 ([class1 class2]
  (let [classSet (into #{} [(class class1) (class class2)])]
   (if (= 1 (count classSet))(first classSet)(-class (-or classSet)))))
 ([class1 class2 & classes]
  (let [classSet (into #{} (map class (flatten [class1 class2 classes])))]
   (if (= 1 (count classSet))(first classSet)(-class (-or classSet))))))

(defn- -not 
 "ObjectComplementOf := 'ObjectComplementOf' '(' ClassExpression ')'"
 [class]
 (if (= (:type class) :class)
   {:class class :innerType :not :type :not}
   (throw (Exception. (str  {:type ::notClass :class class})))))

(defn not [c]
 (class (-not (class c))))

(defn- -nominal 
 "ObjectOneOf := 'ObjectOneOf' '(' Individual { Individual }')'"
 [individuals]
 (if (every? (fn [x] (= (:type x) :individual)) individuals)
   {:individuals individuals :type :nominal :innerType :nominal}
   (throw (Exception. (str  {:type ::notIndividuals :individuals individuals})))))

(defn nominal
 ([individual](-class (-nominal (into #{} [(co/individual individual)]))))
 ([individual & individuals](-class (-nominal (into #{} (map co/individual (flatten [individual individuals])))))))

(defn- -exists 
 "ObjectSomeValuesFrom := 'ObjectSomeValuesFrom' '(' ObjectPropertyExpression ClassExpression ')'"
 [role class]
 (if (= (:type role) :role)
   (if (= (:type class) :class)
   {:class class :role role :type :exists :innerType :exists}
     (throw (Exception. (str  {:type ::notClass :class class}))))
 (throw (Exception. (str  {:type ::notRole :role role})))))

(defn exists [r c]
 (-class (-exists (role r)(class c))))

(defn- -all 
 "ObjectAllValuesFrom := 'ObjectAllValuesFrom' '(' ObjectPropertyExpression ClassExpression ')'"
 [role class]
 (if (= (:type role) :role)
   (if (= (:type class) :class)
   {:class class :role role :type :all :innerType :all}
     (throw (Exception. (str  {:type ::notClass :role role :class class}))))
 (throw (Exception. (str  {:type ::notRole :role role})))))

(defn all [r c]
 (-class (-all (role r)(class c))))

(defn- -partialRole 
 "ObjectHasValue := 'ObjectHasValue' '(' ObjectPropertyExpression Individual ')'"
 [role individual]
 (if (= (:type role) :role)
   (if (= (:type individual) :individual)
   {:individual individual :role role :type :partialRole :innerType :partialRole}
     (throw (Exception. (str  {:type ::notIndividual :individual individual}))))
 (throw (Exception. (str  {:type ::notRole :role role})))))

(defn partialRole [r i]
 (-class (-partialRole (role r) (co/individual i))))

(defn- -Self 
 "ObjectHasSelf := 'ObjectHasSelf' '(' ObjectPropertyExpression ')'"
 [role]
 (if (= (:type role) :role)
  {:role role :type :Self :innerType :Self}
  (throw (Exception. (str  {:type ::notRole :role role})))))

(defn Self
 ([iri](class (-Self (role iri))))
 ([prefix iri](-class (-Self (role prefix iri))))
 ([prefix iri namespace](-class (-Self (role prefix iri namespace)))))

(defn- ->=exists
 "ObjectMinCardinality := 'ObjectMinCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
 ([nat role]
   (if (<= 0 nat)
     (if (= (:type role) :role)
       {:role role :nat nat :type :>=exists :innerType :>=exists}
       (throw (Exception. (str  {:type ::notRole :role role}))))
     (throw (Exception. (str  {:type ::notNaturalNumber :nat nat})))))
 ([nat role class]
   (if (<= 0 nat)
     (if (= (:type role) :role)
       (if (= (:type class) :class)
         {:role role :class class :nat nat :type :>=exists :innerType :>=exists}
         (throw (Exception. (str  {:type ::notClass :class class}))))
       (throw (Exception. (str  {:type ::notRole :role role}))))
     (throw (Exception. (str  {:type ::notNaturalNumber :nat nat}))))))

(defn >=exists
 ([nat r](-class (->=exists nat (role r))))
 ([nat r c](-class (->=exists nat (role r)(class c)))))

(defn- -<=exists
 "ObjectMaxCardinality := 'ObjectMaxCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
 ([nat role]
   (if (<= 0 nat)
     (if (= (:type role) :role)
       {:role role :nat nat :type :<=exists :innerType :<=exists}
       (throw (Exception. (str  {:type ::notRole :role role}))))
     (throw (Exception. (str  {:type ::notNaturalNumber :nat nat})))))
 ([nat role class]
   (if (<= 0 nat)
     (if (= (:type role) :role)
       (if (= (:type class) :class)
         {:role role :class class :nat nat :type :<=exists :innerType :<=exists}
         (throw (Exception. (str  {:type ::notClass :class class}))))
       (throw (Exception. (str  {:type ::notRole :role role}))))
     (throw (Exception. (str  {:type ::notNaturalNumber :nat nat}))))))

(defn <=exists
 ([nat r](-class (-<=exists nat (role r))))
 ([nat r c](-class (-<=exists nat (role r)(class c)))))

(defn- -=exists
 "ObjectExactCardinality := 'ObjectExactCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
 ([nat role]
   (if (<= 0 nat)
     (if (= (:type role) :role)
       {:role role :nat nat :type :=exists :innerType :=exists}
       (throw (Exception. (str  {:type ::notRole :role role}))))
     (throw (Exception. (str  {:type ::notNaturalNumber :nat nat})))))
 ([nat role class]
   (if (<= 0 nat)
     (if (= (:type role) :role)
       (if (= (:type class) :class)
         {:role role :class class :nat nat :type :=exists :innerType :=exists}
         (throw (Exception. (str  {:type ::notClass :class class}))))
       (throw (Exception. (str  {:type ::notRole :role role}))))
     (throw (Exception. (str  {:type ::notNaturalNumber :nat nat}))))))

(defn =exists
 ([nat r](-class (-=exists nat (role r))))
 ([nat r c](-class (-=exists nat (role r)(class c)))))

(defn- -dataExists
 "DataSomeValuesFrom := 'DataSomeValuesFrom' '(' DataPropertyExpression { DataPropertyExpression } DataRange ')'"
 [dataRoles dataRange]
  (if (every? (fn [x] (= (:type x) :dataRole)) dataRoles)
   (if (= (:type dataRange) :dataRange)
    (if (= (:arity dataRange) (count dataRoles))
     {:dataRoles dataRoles :dataRange dataRange :arity (:arity dataRange) :type :dataExists :innerType :dataExists}
     (throw (Exception. (str  {:type ::incorrectArity :dataRange dataRange}))))
    (throw (Exception. (str  {:type ::notDataRange :dataRange dataRange}))))
   (throw (Exception. (str  {:type ::notDataRoles :role role})))))

(defn dataExists [drs dra]
 (if (string? drs)
  (-class (-dataExists #{(dataRole drs)} (co/dataRange dra)))
  (if (map? drs)
   (-class (-dataExists #{(dataRole drs)} (co/dataRange dra)))
   (-class (-dataExists (into #{} (map dataRole drs)) (co/dataRange dra))))))

(defn- -dataAll 
 "DataAllValuesFrom := 'DataAllValuesFrom' '(' DataPropertyExpression { DataPropertyExpression } DataRange ')'"
 [dataRoles dataRange]
 (if (every? (fn [x] (= (:type x) :dataRole)) dataRoles)
   (if (= (:type dataRange) :dataRange)
     (if (= (:arity dataRange) (count dataRoles))
     {:dataRoles dataRoles :dataRange dataRange :arity (:arity dataRange) :type :dataAll :innerType :dataAll}
       (throw (Exception. (str  {:type ::incorrectArity :dataRange dataRange}))))
     (throw (Exception. (str  {:type ::notDataRange :dataRange dataRange}))))
 (throw (Exception. (str  {:type ::notDataRoles :role role})))))

(defn dataAll [drs dra]
 (if (string? drs)
  (-class (-dataAll #{(dataRole drs)} (co/dataRange dra)))
  (if (map? drs)
   (-class (-dataAll #{(dataRole drs)} (co/dataRange dra)))
   (-class (-dataAll (into #{} (map dataRole drs)) (co/dataRange dra))))))

(defn- ->=dataExists
 "DataMinCardinality := 'DataMinCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
 ([nat dataRole]
   (if (<= 0 nat)
     (if (= (:type dataRole) :dataRole)
       {:dataRole dataRole :nat nat :type :>=dataExists :innerType :>=dataExists}
       (throw (Exception. (str  {:type ::notDataRole :dataRole dataRole}))))
     (throw (Exception. (str  {:type ::notNaturalNumber :nat nat})))))
 ([nat dataRole dataRange]
   (if (<= 0 nat)
     (if (= (:type dataRole) :dataRole)
       (if (= (:type dataRange) :dataRange)
         {:dataRole dataRole :dataRange dataRange :nat nat :type :>=dataExists :innerType :>=dataExists}
         (throw (Exception. (str  {:type ::notDataRange :dataRange dataRange}))))
       (throw (Exception. (str  {:type ::notDataRole :dataRole dataRole}))))
     (throw (Exception. (str  {:type ::notNaturalNumber :nat nat}))))))

(defn >=dataExists
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
       (throw (Exception. (str  {:type ::notDataRole :dataRole dataRole}))))
     (throw (Exception. (str  {:type ::notNaturalNumber :nat nat})))))
 ([nat dataRole dataRange]
   (if (<= 0 nat)
     (if (= (:type dataRole) :dataRole)
       (if (= (:type dataRange) :dataRange)
         {:dataRole dataRole :dataRange dataRange :nat nat :type :<=dataExists :innerType :<=dataExists}
         (throw (Exception. (str  {:type ::notDataRange :dataRange dataRange}))))
       (throw (Exception. (str  {:type ::notDataRole :dataRole dataRole}))))
     (throw (Exception. (str  {:type ::notNaturalNumber :nat nat}))))))

(defn <=dataExists
 ([nat dr](-class (-<=dataExists nat (dataRole dr))))
 ([nat dr dataRange](-class (-<=dataExists nat (dataRole dr) (co/dataRange dataRange)))))

(defn- -=dataExists
 "DataExactCardinality := 'DataExactCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
 ([nat dataRole]
   (if (<= 0 nat)
     (if (= (:type dataRole) :dataRole)
       {:dataRole dataRole :nat nat :type :=dataExists :innerType :=dataExists}
       (throw (Exception. (str  {:type ::notDataRole :dataRole dataRole}))))
     (throw (Exception. (str  {:type ::notNaturalNumber :nat nat})))))
 ([nat dataRole dataRange]
   (if (<= 0 nat)
     (if (= (:type dataRole) :dataRole)
       (if (= (:type dataRange) :dataRange)
         {:dataRole dataRole :dataRange dataRange :nat nat :type :=dataExists :innerType :=dataExists}
         (throw (Exception. (str  {:type ::notDataRange :dataRange dataRange}))))
       (throw (Exception. (str  {:type ::notDataRole :dataRole dataRole}))))
     (throw (Exception. (str  {:type ::notNaturalNumber :nat nat}))))))

(defn =dataExists
 ([nat dr](-class (-=dataExists nat (dataRole dr))))
 ([nat dr dataRange](-class (-=dataExists nat (dataRole dr) (co/dataRange dataRange)))))

(defn- -partialDataRole 
 "DataHasValue := 'DataHasValue' '(' DataPropertyExpression Literal ')'"
 [dataRole literal]
 (if (= (:type dataRole) :dataRole)
   (if (= (:type literal) :literal)
   {:literal literal :dataRole dataRole :type :partialDataRole :innerType :partialDataRole}
     (throw (Exception. (str  {:type ::notLiteral :literal literal}))))
 (throw (Exception. (str  {:type ::notDataRole :dataRole dataRole})))))

(defn partialDataRole [dr literal]
 (-class (-partialDataRole (dataRole dr) literal)))
