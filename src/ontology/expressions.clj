(ns ontology.expressions
  (:require [ontology.components :as co])
  (:refer-clojure :exclude [class and or not])
  (:use [slingshot.slingshot :only [throw+]]))

(def classTypes
  #{:className :class :and :or :not :nominal :existential :universal :partialRole :Self :>=role :<=role :=role :dataExistential :dataUniversal :partialDataRole :>=dataRole :<=dataRole :=dataRole})

(defn- -role [role]
 "ObjectPropertyExpression := ObjectProperty | InverseObjectProperty"
 (if (= (:type role) :roleName)
  (assoc role :type :role)
    (if (= (:type role) :role)
      (assoc role :type :role)
    (throw+ {:type ::notRole :roleName role}))))

(defn role
  ([iri]
    (if (string? iri)
      (-role (co/roleName (co/IRI iri)))
      (if (contains? iri :type)
        (-role iri)
        (-role (co/roleName iri)))))
  ([iri namespace prefix](-role (co/roleName iri namespace prefix))))

(defn inverseRole
  ([iri]
    (if (contains? iri :type)
      (if (= (:innerType iri) :inverseRole)
        iri
        (throw+ {:type ::notInverseRole :roleName iri}))
      (-role (co/inverseRoleName iri)) ))
  ([iri namespace prefix](-role (co/inverseRoleName iri namespace prefix))))

(defn- -dataRole [dataRole]
 "DataPropertyExpression := DataProperty"
 (if (= (:type dataRole) :dataRole)
    dataRole
    (if (= (:type dataRole) :dataRoleName)
    (assoc dataRole :type :dataRole)
    (throw+ {:type ::notDataRole :dataRole dataRole}))))

(defn dataRole
  ([iri]
    (if (string? iri)
      (-dataRole (co/dataRoleName (co/IRI iri)))
      (if (contains? iri :type)
        (-dataRole iri)
        (-dataRole (co/dataRoleName iri)))))
  ([iri namespace prefix](-dataRole (co/dataRoleName iri namespace prefix))))

(defn- -class [class]
  "ClassExpression := Class | ObjectIntersectionOf | ObjectUnionOf | ObjectComplementOf | ObjectOneOf | ObjectSomeValuesFrom | ObjectAllValuesFrom |
                      ObjectHasValue | ObjectHasSelf | ObjectMinCardinality | ObjectMaxCardinality | ObjectExactCardinality | DataSomeValuesFrom |
                      DataAllValuesFrom | DataHasValue | DataMinCardinality | DataMaxCardinality | DataExactCardinality"
  (if (contains? classTypes (:type class))
      (assoc class :type :class)
      (throw+ {:type ::notClass :class class})))

(defn class
  ([iri]
    (if (string? iri)
    (-class (co/className (co/IRI iri)))
      (if (contains? iri :type)
        (-class iri)
        (-class (co/className iri)))))
  ([iri namespace prefix](-class (co/className iri namespace prefix))))

(defn- -and [classes]
  "ObjectIntersectionOf := 'ObjectIntersectionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'"
  (if (every? (fn [x] (= (:type x) :class)) classes)
    {:classes classes :type :and :innerType :and}
    (throw+ {:type ::notClass :class classes})))

(defn and
  ([class1 class2](-class (-and (into #{} [(class class1) (class class2)]))))
  ([class1 class2 & classes](-class (-and (into #{} (map class (flatten [class1 class2 classes])))))))

(defn- -or [classes]
  "ObjectUnionOf := 'ObjectUnionOf' '(' ClassExpression ClassExpression { ClassExpression } ')'"
  (if (every? (fn [x] (= (:type x) :class)) classes)
    {:classes classes :type :or :innerType :or}
    (throw+ {:type ::notClass :class classes})))

(defn or
  ([class1 class2](-class (-or (into #{} [(class class1) (class class2)]))))
  ([class1 class2 & classes](-class (-or (into #{} (map class (flatten [class1 class2 classes])))))))

(defn- -not [class]
  "ObjectComplementOf := 'ObjectComplementOf' '(' ClassExpression ')'"
  (if (= (:type class) :class)
    {:class class :innerType :not :type :not}
    (throw+ {:type ::notClass :class class})))

(defn not [c]
  (class (-not (class c))))

(defn- -nominal [individuals]
  "ObjectOneOf := 'ObjectOneOf' '(' Individual { Individual }')'"
  (if (every? (fn [x] (= (:type x) :individual)) individuals)
    {:individuals individuals :type :nominal :innerType :nominal}
    (throw+ {:type ::notIndividuals :individuals individuals})))

(defn nominal
  ([individual](-class (-nominal (into #{} [(co/individual individual)]))))
  ([individual & individuals](-class (-nominal (into #{} (map co/individual (flatten [individual individuals])))))))

(defn- -existential [role class]
  "ObjectSomeValuesFrom := 'ObjectSomeValuesFrom' '(' ObjectPropertyExpression ClassExpression ')'"
  (if (= (:type role) :role)
    (if (= (:type class) :class)
    {:class class :role role :type :existential :innerType :existential}
      (throw+ {:type ::notClass :class class}))
  (throw+ {:type ::notRole :role role})))

(defn existential [r c]
  (-class (-existential (role r)(class c))))

(defn- -universal [role class]
  "ObjectAllValuesFrom := 'ObjectAllValuesFrom' '(' ObjectPropertyExpression ClassExpression ')'"
  (if (= (:type role) :role)
    (if (= (:type class) :class)
    {:class class :role role :type :universal :innerType :universal}
      (throw+ {:type ::notClass :role role :class class}))
  (throw+ {:type ::notRole :role role})))

(defn universal [r c]
  (-class (-universal (role r)(class c))))

(defn- -partialRole [role individual]
  "ObjectHasValue := 'ObjectHasValue' '(' ObjectPropertyExpression Individual ')'"
  (if (= (:type role) :role)
    (if (= (:type individual) :individual)
    {:individual individual :role role :type :partialRole :innerType :partialRole}
      (throw+ {:type ::notIndividual :individual individual}))
  (throw+ {:type ::notRole :role role})))

(defn partialRole [r i]
  (-class (-partialRole (role r) (co/individual i))))

(defn- -Self [role]
  "ObjectHasSelf := 'ObjectHasSelf' '(' ObjectPropertyExpression ')'"
  (if (= (:type role) :role)
  {:role role :type :Self :innerType :Self}
  (throw+ {:type ::notRole :role role})))

(defn Self
  ([iri](class (-Self (role iri))))
  ([iri namespace prefix](-class (-Self (role iri namespace prefix)))))

(defn- ->=role
  "ObjectMinCardinality := 'ObjectMinCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
  ([nat role]
    (if (<= 0 nat)
      (if (= (:type role) :role)
        {:role role :nat nat :type :>=role :innerType :>=role}
        (throw+ {:type ::notRole :role role}))
      (throw+ {:type ::notNaturalNumber :nat nat})))
  ([nat role class]
    (if (<= 0 nat)
      (if (= (:type role) :role)
        (if (= (:type class) :class)
          {:role role :class class :nat nat :type :>=role :innerType :>=role}
          (throw+ {:type ::notClass :class class}))
        (throw+ {:type ::notRole :role role}))
      (throw+ {:type ::notNaturalNumber :nat nat}))))

(defn >=role
  ([nat r](-class (->=role nat (role r))))
  ([nat r c](-class (->=role nat (role r)(class c)))))

(defn- -<=role
  "ObjectMaxCardinality := 'ObjectMaxCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
  ([nat role]
    (if (<= 0 nat)
      (if (= (:type role) :role)
        {:role role :nat nat :type :<=role :innerType :<=role}
        (throw+ {:type ::notRole :role role}))
      (throw+ {:type ::notNaturalNumber :nat nat})))
  ([nat role class]
    (if (<= 0 nat)
      (if (= (:type role) :role)
        (if (= (:type class) :class)
          {:role role :class class :nat nat :type :<=role :innerType :<=role}
          (throw+ {:type ::notClass :class class}))
        (throw+ {:type ::notRole :role role}))
      (throw+ {:type ::notNaturalNumber :nat nat}))))

(defn <=role
  ([nat r](-class (-<=role nat (role r))))
  ([nat r c](-class (-<=role nat (role r)(class c)))))

(defn- -=role
  "ObjectExactCardinality := 'ObjectExactCardinality' '(' nonNegativeInteger ObjectPropertyExpression [ ClassExpression ] ')'"
  ([nat role]
    (if (<= 0 nat)
      (if (= (:type role) :role)
        {:role role :nat nat :type :=role :innerType :=role}
        (throw+ {:type ::notRole :role role}))
      (throw+ {:type ::notNaturalNumber :nat nat})))
  ([nat role class]
    (if (<= 0 nat)
      (if (= (:type role) :role)
        (if (= (:type class) :class)
          {:role role :class class :nat nat :type :=role :innerType :=role}
          (throw+ {:type ::notClass :class class}))
        (throw+ {:type ::notRole :role role}))
      (throw+ {:type ::notNaturalNumber :nat nat}))))

(defn =role
  ([nat r](-class (-=role nat (role r))))
  ([nat r c](-class (-=role nat (role r)(class c)))))

(defn- -dataExistential [dataRoles dataRange]
  "DataSomeValuesFrom := 'DataSomeValuesFrom' '(' DataPropertyExpression { DataPropertyExpression } DataRange ')'"
  (if (every? (fn [x] (= (:type x) :dataRole)) dataRoles)
    (if (= (:type dataRange) :dataRange)
      (if (= (:arity dataRange) (count dataRoles))
      {:dataRoles dataRoles :dataRange dataRange :arity (:arity dataRange) :type :dataExistential :innerType :dataExistential}
        (throw+ {:type ::incorrectArity :dataRange dataRange}))
      (throw+ {:type ::notDataRange :dataRange dataRange}))
  (throw+ {:type ::notDataRoles :role role})))

(defn dataExistential [dataRoles dataRange]
  (-class (-dataExistential (into #{} (if (map? dataRoles) [(dataRole dataRoles)] (map dataRole dataRoles))) (co/dataRange dataRange))))

(defn- -dataUniversal [dataRoles dataRange]
  "DataAllValuesFrom := 'DataAllValuesFrom' '(' DataPropertyExpression { DataPropertyExpression } DataRange ')'"
  (if (every? (fn [x] (= (:type x) :dataRole)) dataRoles)
    (if (= (:type dataRange) :dataRange)
      (if (= (:arity dataRange) (count dataRoles))
      {:dataRoles dataRoles :dataRange dataRange :arity (:arity dataRange) :type :dataUniversal :innerType :dataUniversal}
        (throw+ {:type ::incorrectArity :dataRange dataRange}))
      (throw+ {:type ::notDataRange :dataRange dataRange}))
  (throw+ {:type ::notDataRoles :role role})))

(defn dataUniversal [dataRoles dataRange]
  (-class (-dataUniversal (if (map? dataRoles) #{(dataRole dataRoles)} (into #{} (map dataRole dataRoles))) (co/dataRange dataRange))))

(defn- ->=dataRole
  "DataMinCardinality := 'DataMinCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
  ([nat dataRole]
    (if (<= 0 nat)
      (if (= (:type dataRole) :dataRole)
        {:dataRole dataRole :nat nat :type :>=dataRole :innerType :>=dataRole}
        (throw+ {:type ::notDataRole :dataRole dataRole}))
      (throw+ {:type ::notNaturalNumber :nat nat})))
  ([nat dataRole dataRange]
    (if (<= 0 nat)
      (if (= (:type dataRole) :dataRole)
        (if (= (:type dataRange) :dataRange)
          {:dataRole dataRole :dataRange dataRange :nat nat :type :>=dataRole :innerType :>=dataRole}
          (throw+ {:type ::notDataRange :dataRange dataRange}))
        (throw+ {:type ::notDataRole :dataRole dataRole}))
      (throw+ {:type ::notNaturalNumber :nat nat}))))

(defn >=dataRole
  ([nat dr]
    (-class (->=dataRole nat (dataRole dr))))
  ([nat dr dataRange]
    (-class (->=dataRole nat (dataRole dr) (co/dataRange dataRange)))))

(defn- -<=dataRole
  "DataMaxCardinality := 'DataMaxCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
  ([nat dataRole]
    (if (<= 0 nat)
      (if (= (:type dataRole) :dataRole)
        {:dataRole dataRole :nat nat :type :<=dataRole :innerType :<=dataRole}
        (throw+ {:type ::notDataRole :dataRole dataRole}))
      (throw+ {:type ::notNaturalNumber :nat nat})))
  ([nat dataRole dataRange]
    (if (<= 0 nat)
      (if (= (:type dataRole) :dataRole)
        (if (= (:type dataRange) :dataRange)
          {:dataRole dataRole :dataRange dataRange :nat nat :type :<=dataRole :innerType :<=dataRole}
          (throw+ {:type ::notDataRange :dataRange dataRange}))
        (throw+ {:type ::notDataRole :dataRole dataRole}))
      (throw+ {:type ::notNaturalNumber :nat nat}))))

(defn <=dataRole
  ([nat dr](-class (-<=dataRole nat (dataRole dr))))
  ([nat dr dataRange](-class (-<=dataRole nat (dataRole dr) (co/dataRange dataRange)))))

(defn- -=dataRole
  "DataExactCardinality := 'DataExactCardinality' '(' nonNegativeInteger DataPropertyExpression [ DataRange ] ')'"
  ([nat dataRole]
    (if (<= 0 nat)
      (if (= (:type dataRole) :dataRole)
        {:dataRole dataRole :nat nat :type :=dataRole :innerType :=dataRole}
        (throw+ {:type ::notDataRole :dataRole dataRole}))
      (throw+ {:type ::notNaturalNumber :nat nat})))
  ([nat dataRole dataRange]
    (if (<= 0 nat)
      (if (= (:type dataRole) :dataRole)
        (if (= (:type dataRange) :dataRange)
          {:dataRole dataRole :dataRange dataRange :nat nat :type :=dataRole :innerType :=dataRole}
          (throw+ {:type ::notDataRange :dataRange dataRange}))
        (throw+ {:type ::notDataRole :dataRole dataRole}))
      (throw+ {:type ::notNaturalNumber :nat nat}))))

(defn =dataRole
  ([nat dr](-class (-=dataRole nat (dataRole dr))))
  ([nat dr dataRange](-class (-=dataRole nat (dataRole dr) (co/dataRange dataRange)))))

(defn- -partialDataRole [dataRole literal]
  "DataHasValue := 'DataHasValue' '(' DataPropertyExpression Literal ')'"
  (if (= (:type dataRole) :dataRole)
    (if (= (:type literal) :literal)
    {:literal literal :dataRole dataRole :type :partialDataRole :innerType :partialDataRole}
      (throw+ {:type ::notLiteral :literal literal}))
  (throw+ {:type ::notDataRole :dataRole dataRole})))

(defn partialDataRole [dr literal]
  (-class (-partialDataRole (dataRole dr) literal)))
