(ns ontology.facts
  (:use [slingshot.slingshot :only [throw+]])
  (:require	[ontology.components :as co][ontology.axioms :as ax][ontology.annotations :as ann][ontology.expressions :as ex]))

(def factTypes
  	#{:=individuals :!=individuals :classFact :roleFact :notRoleFact :dataRoleFact :notDataRoleFact})

(defn- -fact [fact]
  "Assertion := SameIndividual | DifferentIndividuals | ClassAssertion | ObjectPropertyAssertion | NegativeObjectPropertyAssertion | DataPropertyAssertion | NegativeDataPropertyAssertion"
      (if (contains? factTypes (:type fact))
        (assoc fact :type :axiom :outerType :fact)
        (throw+ {:type ::notAssertion :fact fact})))

(defn- -=individuals
  "SameIndividual := 'SameIndividual' '(' axiomAnnotations Individual Individual { Individual } ')'"
  ([individuals]
    (if (< 1 (count individuals))
      (if (every? (fn [x] (= (:type x) :individual)) individuals)
        {:individuals individuals :type :=individuals :innerType :=individuals :outerType :=individuals}
        (throw+ {:type ::notIndividuals :individuals individuals}))
      (throw+ {:type ::notEnoughIndividuals :individuals individuals})))
  ([annotations individuals]
    (if (< 1 (count individuals))
      (if (every? (fn [x] (= (:type x) :individual)) individuals)
        (if (= (:type annotations) :axiomAnnotations)
          {:individuals individuals :annotations annotations :type :=individuals :innerType :=individuals :outerType :=individuals}
          (throw+ {:type ::notAnnotations :annotations annotations}))
        (throw+ {:type ::notIndividuals :individuals individuals}))
      (throw+ {:type ::notEnoughIndividuals :individuals individuals}))))

(defn =individuals
  ([individuals]
    (-fact (-=individuals (into #{} (map co/individual individuals)))))
  ([annotations individuals]
    (-fact (-=individuals (ann/axiomAnnotations annotations) (into #{} (map co/individual individuals))))))

(defn- -!=individuals
  "DifferentIndividuals := 'DifferentIndividuals' '(' axiomAnnotations Individual Individual { Individual } ')'"
  ([individuals]
    (if (< 1 (count individuals))
      (if (every? (fn [x] (= (:type x) :individual)) individuals)
        {:individuals individuals :type :!=individuals :innerType :!=individuals :outerType :!=individuals}
        (throw+ {:type ::notIndividuals :individuals individuals}))
      (throw+ {:type ::notEnoughIndividuals :individuals individuals})))
  ([annotations individuals]
    (if (< 1 (count individuals))
      (if (every? (fn [x] (= (:type x) :individual)) individuals)
        (if (= (:type annotations) :axiomAnnotations)
          {:individuals individuals :annotations annotations :type :!=individuals :innerType :!=individuals :outerType :!=individuals}
          (throw+ {:type ::notAnnotations :annotations annotations}))
        (throw+ {:type ::notIndividuals :individuals individuals}))
      (throw+ {:type ::notEnoughIndividuals :individuals individuals}))))

(defn !=individuals
  ([individuals]
    (-fact (-!=individuals (into #{} (map co/individual individuals)))))
  ([annotations individuals]
    (-fact (-!=individuals (ann/axiomAnnotations annotations) (into #{} (map co/individual individuals))))))

(defn- -classFact
  "ClassAssertion := 'ClassAssertion' '(' axiomAnnotations ClassExpression Individual ')'"
  ([class individual]
    (if (= (:type individual) :individual)
      (if (= (:type class) :class)
        {:class class :individual individual :type :classFact :innerType :classFact :outerType :classFact}
        (throw+ {:type ::notClass :class class}))
      (throw+ {:type ::notIndividual :individual individual})))
  ([class individual annotations]
    (if (= (:type individual) :individual)
      (if (= (:type class) :class)
        (if (= (:type annotations) :axiomAnnotations)
          {:class class :individual individual :annotations annotations :type :classFact :innerType :classFact :outerType :classFact}
          (throw+ {:type ::notAnnotations :annotations annotations}))
        (throw+ {:type ::notClass :class class}))
      (throw+ {:type ::notIndividual :individual individual}))))

(defn classFact
  ([class individual]
    (-fact (-classFact (ex/class class) (co/individual individual))))
  ([annotations class individual]
    (-fact (-classFact (ann/axiomAnnotations annotations) (ex/class class) (co/individual individual)))))

(defn- -fromIndividual [individual]
  "sourceIndividual := Individual"
  (if (= (:type individual) :individual)
    (assoc individual :type :fromIndividual)
    (throw+ {:type ::notIndividual :individual individual})))

(defn- -toIndividual [individual]
  "targetIndividual := Individual"
  (if (= (:type individual) :individual)
    (assoc individual :type :toIndividual)
    (throw+ {:type ::notIndividual :individual individual})))

(defn- -toLiteral [literal]
  "targetValue := Literal"
  (if (= (:type literal) :literal)
    (assoc literal :type :toLiteral)
    (throw+ {:type ::notLiteral :literal literal})))

(defn- -roleFact
  "ObjectPropertyAssertion := 'ObjectPropertyAssertion' '(' axiomAnnotations ObjectPropertyExpression sourceIndividual targetIndividual ')'"
  ([role fromIndividual toIndividual]
    (if (and (and (= (:type role) :role)(= (:type fromIndividual) :fromIndividual))(= (:type toIndividual) :toIndividual))
      {:role role :fromIndividual fromIndividual :toIndividual toIndividual :type :roleFact :innerType :roleFact :outerType :roleFact}
    (throw+ {:type ::notRoleFact :role role :fromIndividual fromIndividual :toIndividual toIndividual})))
  ([annotations role fromIndividual toIndividual]
    (if (and (and (= (:type role) :role)(= (:type fromIndividual) :fromIndividual))(= (:type toIndividual) :toIndividual))
      (if (= (:type annotations) :axiomAnnotations)
        {:role role :fromIndividual fromIndividual :toIndividual toIndividual :annotations annotations :type :roleFact :innerType :roleFact :outerType :roleFact}
        (throw+ {:type ::notAnnotations :annotations annotations}))
    (throw+ {:type ::notRoleFact :role role :fromIndividual fromIndividual :toIndividual toIndividual}))))

(defn roleFact
  ([role fromIndividual toIndividual]
    (-fact (-roleFact (ex/role role) (-fromIndividual (co/individual fromIndividual)) (-toIndividual (co/individual toIndividual)))))
  ([annotations role fromIndividual toIndividual]
    (-fact (-roleFact (ann/axiomAnnotations annotations) (ex/role role) (-fromIndividual (co/individual fromIndividual)) (-toIndividual (co/individual toIndividual))))))

(defn- -notRoleFact
  "NegativeObjectPropertyAssertion := 'NegativeObjectPropertyAssertion' '(' axiomAnnotations ObjectPropertyExpression sourceIndividual targetIndividual ')'"
  ([role fromIndividual toIndividual]
    (if (and (and (= (:type role) :role)(= (:type fromIndividual) :fromIndividual))(= (:type toIndividual) :toIndividual))
      {:role role :fromIndividual fromIndividual :toIndividual toIndividual :type :notRoleFact :innerType :notRoleFact :outerType :notRoleFact}
    (throw+ {:type ::notNotRoleFact :role role :fromIndividual fromIndividual :toIndividual toIndividual})))
  ([role fromIndividual toIndividual annotations]
    (if (and (and (= (:type role) :role)(= (:type fromIndividual) :fromIndividual))(= (:type toIndividual) :toIndividual))
      (if (= (:type annotations) :axiomAnnotations)
        {:role role :fromIndividual fromIndividual :toIndividual toIndividual :annotations annotations :type :notRoleFact :innerType :notRoleFact :outerType :notRoleFact}
        (throw+ {:type ::notAnnotations :annotations annotations}))
    (throw+ {:type ::notNotRoleFact :role role :fromIndividual fromIndividual :toIndividual toIndividual}))))

(defn notRoleFact
  ([role fromIndividual toIndividual]
    (-fact (-notRoleFact (ex/role role) (-fromIndividual (co/individual fromIndividual)) (-toIndividual (co/individual toIndividual)))))
  ([annotations role fromIndividual toIndividual]
    (-fact (-notRoleFact (ann/axiomAnnotations annotations) (ex/role role) (-fromIndividual (co/individual fromIndividual)) (-toIndividual (co/individual toIndividual))))))

(defn- -dataRoleFact
  "DataPropertyAssertion := 'DataPropertyAssertion' '(' axiomAnnotations DataPropertyExpression sourceIndividual targetValue ')'"
  ([dataRole fromIndividual toLiteral]
    (if (and (and (= (:type dataRole) :dataRole)(= (:type fromIndividual) :fromIndividual))(= (:type toLiteral) :toLiteral))
      {:dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral :type :dataRoleFact :innerType :dataRoleFact :outerType :dataRoleFact}
      (throw+ {:type ::notDataRoleFact :dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral})))
  ([dataRole fromIndividual toLiteral annotations]
    (if (and (and (= (:type dataRole) :dataRole)(= (:type fromIndividual) :fromIndividual))(= (:type toLiteral) :toLiteral))
      (if (= (:type annotations) :axiomAnnotations)
        {:dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral :annotations annotations :type :dataRoleFact :innerType :dataRoleFact :outerType :dataRoleFact}
        (throw+ {:type ::notAnnotations :annotations annotations}))
      (throw+ {:type ::notDataRoleFact :dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral}))))

(defn dataRoleFact
  ([dataRole fromIndividual toLiteral]
    (-fact (-dataRoleFact (ex/dataRole dataRole) (-fromIndividual (co/individual fromIndividual)) (-toLiteral toLiteral))))
  ([annotations dataRole fromIndividual toLiteral]
    (-fact (-dataRoleFact (ann/axiomAnnotations annotations) (ex/dataRole dataRole) (-fromIndividual (co/individual fromIndividual)) (-toLiteral toLiteral)))))

(defn- -notDataRoleFact
  "NegativeDataPropertyAssertion := 'NegativeDataPropertyAssertion' '(' axiomAnnotations DataPropertyExpression sourceIndividual targetValue ')'"
  ([dataRole fromIndividual toLiteral]
    (if (and (and (= (:type dataRole) :dataRole)(= (:type fromIndividual) :fromIndividual))(= (:type toLiteral) :toLiteral))
      {:dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral :type :notDataRoleFact :innerType :notDataRoleFact :outerType :notDataRoleFact}
      (throw+ {:type ::notNotDataRoleFact :dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral})))
  ([annotations dataRole fromIndividual toLiteral]
    (if (and (and (= (:type dataRole) :dataRole)(= (:type fromIndividual) :fromIndividual))(= (:type toLiteral) :toLiteral))
      (if (= (:type annotations) :axiomAnnotations)
        {:dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral :annotations annotations :type :notDataRoleFact :innerType :notDataRoleFact :outerType :notDataRoleFact}
        (throw+ {:type ::notAnnotations :annotations annotations}))
      (throw+ {:type ::notNotDataRoleFact :dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral}))))

(defn notDataRoleFact
  ([dataRole fromIndividual toLiteral]
    (-fact (-notDataRoleFact (ex/dataRole dataRole) (-fromIndividual (co/individual fromIndividual)) (-toLiteral toLiteral))))
  ([annotations dataRole fromIndividual toLiteral]
    (-fact (-notDataRoleFact (ann/axiomAnnotations annotations) (ex/dataRole dataRole) (-fromIndividual (co/individual fromIndividual)) (-toLiteral toLiteral)))))
