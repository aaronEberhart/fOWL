(ns ontology.facts
 "Functions that represent OWL assertions"
 (:require [ontology.components :as co][ontology.axioms :as ax][ontology.annotations :as ann][ontology.expressions :as ex]))

(def factTypes
   #{:=individuals :!=individuals :classFact :roleFact :notRoleFact :dataRoleFact :notDataRoleFact})

(defn- -fact
  "Assertion := SameIndividual | DifferentIndividuals | ClassAssertion | ObjectPropertyAssertion | NegativeObjectPropertyAssertion | DataPropertyAssertion | NegativeDataPropertyAssertion"
  [fact]
  (if (contains? factTypes (:type fact))
    (assoc fact :type :axiom :outerType :fact)
    (throw (Exception. (str  {:type ::notAssertion :fact fact})))))

(defn- -=individuals
  "SameIndividual := 'SameIndividual' '(' axiomAnnotations Individual Individual { Individual } ')'"
  ([individuals]
    (if (< 1 (count individuals))
      (if (every? (fn [x] (= (:type x) :individual)) individuals)
        {:individuals individuals :type :=individuals :innerType :=individuals :outerType :=individuals}
        (throw (Exception. (str  {:type ::notIndividuals :individuals individuals}))))
      (throw (Exception. (str  {:type ::notEnoughIndividuals :individuals individuals})))))
  ([annotations individuals]
    (if (< 1 (count individuals))
      (if (every? (fn [x] (= (:type x) :individual)) individuals)
        (if (= (:type annotations) :axiomAnnotations)
          {:individuals individuals :annotations (:annotations annotations) :type :=individuals :innerType :=individuals :outerType :=individuals}
          (throw (Exception. (str  {:type ::notAnnotations :annotations annotations}))))
        (throw (Exception. (str  {:type ::notIndividuals :individuals individuals}))))
      (throw (Exception. (str  {:type ::notEnoughIndividuals :individuals individuals}))))))

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
        (throw (Exception. (str  {:type ::notIndividuals :individuals individuals}))))
      (throw (Exception. (str  {:type ::notEnoughIndividuals :individuals individuals})))))
  ([annotations individuals]
    (if (< 1 (count individuals))
      (if (every? (fn [x] (= (:type x) :individual)) individuals)
        (if (= (:type annotations) :axiomAnnotations)
          {:individuals individuals :annotations (:annotations annotations) :type :!=individuals :innerType :!=individuals :outerType :!=individuals}
          (throw (Exception. (str  {:type ::notAnnotations :annotations annotations}))))
        (throw (Exception. (str  {:type ::notIndividuals :individuals individuals}))))
      (throw (Exception. (str  {:type ::notEnoughIndividuals :individuals individuals}))))))

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
        (throw (Exception. (str  {:type ::notClass :class class}))))
      (throw (Exception. (str  {:type ::notIndividual :individual individual})))))
  ([annotations class individual]
    (if (= (:type individual) :individual)
      (if (= (:type class) :class)
        (if (= (:type annotations) :axiomAnnotations)
          {:class class :individual individual :annotations (:annotations annotations) :type :classFact :innerType :classFact :outerType :classFact}
          (throw (Exception. (str  {:type ::notAnnotations :annotations annotations}))))
        (throw (Exception. (str  {:type ::notClass :class class}))))
      (throw (Exception. (str  {:type ::notIndividual :individual individual}))))))

(defn classFact
 ([class individual]
  (-fact (-classFact (ex/class class) (co/individual individual))))
 ([annotations class individual]
  (-fact (-classFact (ann/axiomAnnotations annotations) (ex/class class) (co/individual individual)))))

(defn- -fromIndividual 
  "sourceIndividual := Individual"
  [individual]
  (if (= (:type individual) :individual)
    individual
    (throw (Exception. (str  {:type ::notIndividual :individual individual})))))

(defn- -toIndividual 
  "targetIndividual := Individual"
  [individual]
  (if (= (:type individual) :individual)
    individual
    (throw (Exception. (str  {:type ::notIndividual :individual individual})))))

(defn- -toLiteral 
  "targetValue := Literal"
  [literal]
  (if (= (:type literal) :literal)
    literal
    (throw (Exception. (str  {:type ::notLiteral :literal literal})))))

(defn- -roleFact
  "ObjectPropertyAssertion := 'ObjectPropertyAssertion' '(' axiomAnnotations ObjectPropertyExpression sourceIndividual targetIndividual ')'"
  ([role fromIndividual toIndividual]
    (if (and (and (= (:type role) :role)(= (:type fromIndividual) :individual))(= (:type toIndividual) :individual))
      {:role role :fromIndividual fromIndividual :toIndividual toIndividual :type :roleFact :innerType :roleFact :outerType :roleFact}
    (throw (Exception. (str  {:type ::notRoleFact :role role :fromIndividual fromIndividual :toIndividual toIndividual})))))
  ([annotations role fromIndividual toIndividual]
    (if (and (and (= (:type role) :role)(= (:type fromIndividual) :individual))(= (:type toIndividual) :individual))
      (if (= (:type annotations) :axiomAnnotations)
        {:role role :fromIndividual fromIndividual :toIndividual toIndividual :annotations (:annotations annotations) :type :roleFact :innerType :roleFact :outerType :roleFact}
        (throw (Exception. (str  {:type ::notAnnotations :annotations annotations}))))
    (throw (Exception. (str  {:type ::notRoleFact :role role :fromIndividual fromIndividual :toIndividual toIndividual}))))))

(defn roleFact
  ([role fromIndividual toIndividual]
    (-fact (-roleFact (ex/role role) (co/individual fromIndividual) (co/individual toIndividual))))
  ([annotations role fromIndividual toIndividual]
    (-fact (-roleFact (ann/axiomAnnotations annotations) (ex/role role) (co/individual fromIndividual) (co/individual toIndividual)))))

(defn- -notRoleFact
  "NegativeObjectPropertyAssertion := 'NegativeObjectPropertyAssertion' '(' axiomAnnotations ObjectPropertyExpression sourceIndividual targetIndividual ')'"
  ([role fromIndividual toIndividual]
    (if (and (and (= (:type role) :role)(= (:type fromIndividual) :individual))(= (:type toIndividual) :individual))
      {:role role :fromIndividual fromIndividual :toIndividual toIndividual :type :notRoleFact :innerType :notRoleFact :outerType :notRoleFact}
    (throw (Exception. (str  {:type ::notNotRoleFact :role role :fromIndividual fromIndividual :toIndividual toIndividual})))))
  ([annotations role fromIndividual toIndividual]
    (if (and (and (= (:type role) :role)(= (:type fromIndividual) :individual))(= (:type toIndividual) :individual))
      (if (= (:type annotations) :axiomAnnotations)
        {:role role :fromIndividual fromIndividual :toIndividual toIndividual :annotations (:annotations annotations) :type :notRoleFact :innerType :notRoleFact :outerType :notRoleFact}
        (throw (Exception. (str  {:type ::notAnnotations :annotations annotations}))))
    (throw (Exception. (str  {:type ::notNotRoleFact :role role :fromIndividual fromIndividual :toIndividual toIndividual}))))))

(defn notRoleFact
  ([role fromIndividual toIndividual]
    (-fact (-notRoleFact (ex/role role) (co/individual fromIndividual) (co/individual toIndividual))))
  ([annotations role fromIndividual toIndividual]
    (-fact (-notRoleFact (ann/axiomAnnotations annotations) (ex/role role) (co/individual fromIndividual) (co/individual toIndividual)))))

(defn- -dataRoleFact
  "DataPropertyAssertion := 'DataPropertyAssertion' '(' axiomAnnotations DataPropertyExpression sourceIndividual targetValue ')'"
  ([dataRole fromIndividual toLiteral]
    (if (and (and (= (:type dataRole) :dataRole)(= (:type fromIndividual) :individual))(= (:type toLiteral) :literal))
      {:dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral :type :dataRoleFact :innerType :dataRoleFact :outerType :dataRoleFact}
      (throw (Exception. (str  {:type ::notDataRoleFact :dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral})))))
  ([annotations dataRole fromIndividual toLiteral]
    (if (and (and (= (:type dataRole) :dataRole)(= (:type fromIndividual) :individual))(= (:type toLiteral) :literal))
      (if (= (:type annotations) :axiomAnnotations)
        {:dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral :annotations (:annotations annotations) :type :dataRoleFact :innerType :dataRoleFact :outerType :dataRoleFact}
        (throw (Exception. (str  {:type ::notAnnotations :annotations annotations}))))
      (throw (Exception. (str  {:type ::notDataRoleFact :dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral}))))))

(defn dataRoleFact
  ([dataRole fromIndividual toLiteral]
    (-fact (-dataRoleFact (ex/dataRole dataRole) (co/individual fromIndividual) toLiteral)))
  ([annotations dataRole fromIndividual toLiteral]
    (-fact (-dataRoleFact (ann/axiomAnnotations annotations) (ex/dataRole dataRole) (co/individual fromIndividual) toLiteral))))

(defn- -notDataRoleFact
  "NegativeDataPropertyAssertion := 'NegativeDataPropertyAssertion' '(' axiomAnnotations DataPropertyExpression sourceIndividual targetValue ')'"
  ([dataRole fromIndividual toLiteral]
    (if (and (and (= (:type dataRole) :dataRole)(= (:type fromIndividual) :individual))(= (:type toLiteral) :literal))
      {:dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral :type :notDataRoleFact :innerType :notDataRoleFact :outerType :notDataRoleFact}
      (throw (Exception. (str  {:type ::notNotDataRoleFact :dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral})))))
  ([annotations dataRole fromIndividual toLiteral]
    (if (and (and (= (:type dataRole) :dataRole)(= (:type fromIndividual) :individual))(= (:type toLiteral) :literal))
      (if (= (:type annotations) :axiomAnnotations)
        {:dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral :annotations (:annotations annotations) :type :notDataRoleFact :innerType :notDataRoleFact :outerType :notDataRoleFact}
        (throw (Exception. (str  {:type ::notAnnotations :annotations annotations}))))
      (throw (Exception. (str  {:type ::notNotDataRoleFact :dataRole dataRole :fromIndividual fromIndividual :toLiteral toLiteral}))))))

(defn notDataRoleFact
  ([dataRole fromIndividual toLiteral]
    (-fact (-notDataRoleFact  (ex/dataRole dataRole) (co/individual fromIndividual) toLiteral)))
  ([annotations dataRole fromIndividual toLiteral]
    (-fact (-notDataRoleFact (ann/axiomAnnotations annotations) (ex/dataRole dataRole) (co/individual fromIndividual) toLiteral))))
