(ns ontology.normalize
  (:require [ontology.axioms :as ax][ontology.expressions :as ex][ontology.components :as co]
            [util.msc :as msc]
            [clojure.string :as str])
  (:use [slingshot.slingshot :only [throw+]]))

(def one
  (constantly 1))
(def zero
  (constantly 0))
(def -or
  (constantly :or))
(def -and
  (constantly :and))
(def universal
  (constantly :universal))
(def existential
  (constantly :existential))
(def <=role
  (constantly :<=role))
(def >=role
  (constantly :>=role))
(def dataUniversal
  (constantly :dataUniversal))
(def dataExistential
  (constantly :dataExistential))
(def <=dataRole
  (constantly :<=dataRole))
(def >=dataRole
  (constantly :>=dataRole))
(def atomics
  #{:className :>=dataRole :<=dataRole :dataExistential :dataUniversal :Self :nominal :partialRole :partialDataRole})

(defn negate [c]
  "same as not, but doesn't make double negations"
  (case (:innerType c)
    :not (:class c)
    :className
      (case (:short c)
      "Thing" co/Bot
      "Nothing" co/Top
      "topObjectProperty" co/TopRole
      "bottomObjectProperty" co/BotRole
      (ex/not c))
    (ex/not c)))

(defn- notFun [fun]
  (comp fun negate))

(defn- constantlyMapToClassSet [fun classes]
  (constantly (into #{} (map fun classes))))

(defn- checkInnerClass [class fun]
 (if (contains? atomics (:innerType (:class class)))
  class
  (update class :class fun)))

(defn- deMorgan [class fun]
 (case (:innerType (:class class))
  :className class
  :Self class
  :nominal class
  :partialRole class
  :partialDataRole class
  :and (update (update (:class class) :classes (constantlyMapToClassSet (notFun fun) (:classes (:class class)))) :innerType -or)
  :or (update (update (:class class) :classes (constantlyMapToClassSet (notFun fun) (:classes (:class class)))) :innerType -and)
  :existential (update (update (:class class) :class (notFun fun)) :innerType universal)
  :universal (update (update (:class class) :class (notFun fun)) :innerType existential)
  :<=role (update (update (if (:class (:class class)) (checkInnerClass (:class class) fun) (:class class)) :nat inc) :innerType >=role)
  :dataExistential (update (update (:class class) :dataRange co/dataNot) :innerType dataUniversal)
  :dataUniversal (update (update (:class class) :dataRange co/dataNot) :innerType dataExistential)
  :<=dataRole (update (update (:class class) :nat inc) :innerType >=dataRole)
  :=dataRole (ex/and (update (if (> (:nat (:class class)) 0) (:class class) (update (:class class) :nat one)) :innerType >=dataRole)
                       (update (if (> (:nat (:class class)) 0) (:class class) (update (:class class) :nat zero)) :innerType <=dataRole))
   :>=dataRole (if (> (:nat (:class class)) 0)
                   (update (update (:class class) :nat dec) :innerType <=dataRole)
                   (ex/and (update (update (:class class) :nat zero) :innerType <=dataRole)
                           (update (:class class) :nat one)))
  :>=role (let [class (if (:class (:class class)) (checkInnerClass (:class class) fun) (:class class))]
             (if (> (:nat class) 0)
               (update (update class :nat dec) :innerType <=role)
               (ex/and (update (update class :nat zero) :innerType <=role)
                       (update class :nat one))))
   :=role (let [class (if (:class (:class class)) (checkInnerClass (:class class) fun) (:class class))]
              (ex/and (update (if (> (:nat class) 0) class (update class :nat one)) :innerType >=role)
                 (update (if (> (:nat class) 0) class (update class :nat zero)) :innerType <=role)))
  (throw+ {:type ::notNormalizable :class class})))

(defn getClassNNF [class]
  (case (:innerType class)
  :className class
  :Self class
  :nominal class
  :partialRole class
  :dataExistential class
  :dataUniversal class
  :>=dataRole class
  :<=dataRole class
  :partialDataRole class
  :universal (if (:class class) (checkInnerClass class getClassNNF) class)
  :existential (if (:class class) (checkInnerClass class getClassNNF) class)
  :>=role (if (:class class) (checkInnerClass class getClassNNF) class)
  :<=role (if (:class class) (checkInnerClass class getClassNNF) class)
  :or (update class :classes (constantlyMapToClassSet getClassNNF (:classes class)))
  :and (update class :classes (constantlyMapToClassSet getClassNNF (:classes class)))
  :=dataRole (ex/and (update class :innerType >=dataRole)(update class :innerType <=dataRole))
  :=role (let [class (if (:class class) (update class :class getClassNNF) class)]
              (ex/and (update class :innerType >=role) (update class :innerType <=role)))
  :not (if (= :not (:innerType (:class class)))
        (getClassNNF (:class (:class class)))
        (deMorgan class getClassNNF))
  (throw+ {:type ::notNormalizable :class class})))

(defn- classesPermutations [classes]
  (cons (cons (peek classes) (cons (first classes) nil)) (if (> (count classes) 2) (partition 2 1 classes))))

(defn- disjToImp
  ([classes]
    (reduce disjToImp #{} classes))
  ([classes pair]
    (conj classes (ax/classImplication (first pair) (negate (first (rest pair)))))))

(defn- equivToImp
  ([classes]
    (reduce disjToImp #{} classes))
  ([classes pair]
    (conj classes (ax/classImplication (first pair) (first (rest pair))) (ax/classImplication (first (rest pair)) (first pair)))))

(defn- disjOrToImp
  ([class classes]classes)
  ([class class1 class2]class))

(defn toClassImplications [axiom]
  (case (:innerType axiom)
    :disjClasses (disjToImp (classesPermutations (into [] (:classes axiom))))
    :=Classes (equivToImp (classesPermutations (into [] (:classes axiom))))
    :disjOr (throw+ {:type ::notNormalizableYet :axiom axiom})
    (throw+ {:type ::incompatibleClassAxiom :axiom axiom})))

(defn getClassAxiomNNF [axiom]
 (if (= (:innerType axiom) :classImplication)
  (update (update axiom :consequentClass getClassNNF) :antecedentClass getClassNNF)
  (map getClassAxiomNNF (toClassImplications axiom))))

(defn getNNF [axiom]
 ((case (:outerType axiom)
   :classAxiom getClassAxiomNNF
   :roleAxiom identity
   :dataRoleAxiom identity
   :fact identity)
    axiom))

(defn- getClassDSNF [class]
 (case (:innerType class)
  :className class
  :Self class
  :top class
  :bot class
  :nominal class
  :partialRole class
  :dataExistential class
  :dataUniversal class
  :>=dataRole class
  :<=dataRole class
  :partialDataRole class
  :universal (if (:class class) (checkInnerClass class getClassDSNF) class)
  :existential (if (:class class) (checkInnerClass class getClassDSNF) class)
  :>=role (if (:class class) (checkInnerClass class getClassDSNF) class)
  :<=role (if (:class class) (checkInnerClass class getClassDSNF) class)
  :or (update class :classes (constantlyMapToClassSet getClassDSNF (:classes class)))
  :and (negate (update (update class :classes (constantlyMapToClassSet (notFun getClassDSNF) (:classes class))) :innerType -or))
  :=dataRole (negate (ex/or (negate (update class :innerType >=dataRole))(negate (update class :innerType <=dataRole))))
  :=role (let [class (if (:class class) (update class :class getClassDSNF) class)]
          (negate (ex/or (update class :innerType >=role) (update class :innerType <=role))))
  :not (case (:innerType (:class class))
        :not (getClassDSNF (:class (:class class)))
        :or (update class :class (constantly (update (:class class) :classes (constantlyMapToClassSet getClassDSNF (:classes (:class class))))))
        (deMorgan class getClassDSNF))
  (throw+ {:type ::notNormalizable :class class})))

(defn- getClassAxiomDSNF [axiom]
  (if (= (:innerType axiom) :classImplication)
    (ex/or (getClassDSNF (negate (:antecedentClass axiom))) (getClassDSNF (:consequentClass axiom)))
    (map getClassAxiomDSNF (toClassImplications axiom))))

(defn getDSNF [axiom]
  ((case (:outerType axiom)
   :classAxiom getClassAxiomDSNF
   :roleAxiom identity
   :dataRoleAxiom identity
   :fact identity)
    axiom))

(defn- getClassCSNF [class]
  (case (:innerType class)
  :className class
  :Self class
  :nominal class
  :partialRole class
  :dataExistential class
  :dataUniversal class
  :>=dataRole class
  :<=dataRole class
  :partialDataRole class
  :universal (if (:class class) (checkInnerClass class getClassCSNF) class)
  :existential (if (:class class) (checkInnerClass class getClassCSNF) class)
  :>=role (if (:class class) (checkInnerClass class getClassCSNF) class)
  :<=role (if (:class class) (checkInnerClass class getClassCSNF) class)
  :or (negate (update (update class :classes (constantlyMapToClassSet (notFun getClassCSNF) (:classes class))) :innerType -and))
  :and (update class :classes (constantlyMapToClassSet getClassCSNF (:classes class)))
  :=dataRole (ex/and (update class :innerType >=dataRole)(update class :innerType <=dataRole))
  :=role (let [class (if (:class class) (update class :class getClassCSNF) class)]
          (ex/and (update class :innerType >=role) (update class :innerType <=role)))
  :not (case (:innerType (:class class))
        :not (getClassCSNF (:class (:class class)))
        :and (update class :class (constantly (update (:class class) :classes (constantlyMapToClassSet getClassCSNF (:classes (:class class))))))
        (deMorgan class getClassCSNF))
  (throw+ {:type ::notNormalizable :class class})))

(defn- getClassAxiomCSNF [axiom]
  (if (= (:innerType axiom) :classImplication)
   (negate (ex/and (getClassCSNF (:antecedentClass axiom)) (getClassCSNF (negate (:consequentClass axiom)))))
   (map getClassAxiomCSNF (toClassImplications axiom))))

(defn getCSNF [axiom]
  ((case (:outerType axiom)
   :classAxiom getClassAxiomCSNF
   :roleAxiom identity
   :dataRoleAxiom identity
   :fact identity)
    axiom))
