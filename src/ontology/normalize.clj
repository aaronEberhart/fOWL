(ns ontology.normalize
 "Functions that normalize ontology classes"
 (:require [ontology.axioms :as ax][ontology.expressions :as ex][ontology.components :as co]))

(def ^:no-doc atomics
  #{:className :>=dataExists :<=dataExists :dataExists :dataAll :Self :nominal :partialRole :partialDataRole})

(defn negate
  "same as not, but doesn't make double negations"
  [c]
  (case (:innerType c)
    :not (:class c)
    :className (case (:name c)
                "Thing" co/Bot
                "Nothing" co/Top
                "topObjectProperty" co/TopRole
                "bottomObjectProperty" co/BotRole
                (ex/not c))      
    (ex/not c)))

(defn- notFun [fun]
  (comp fun negate))

(defn- mapToClassSet [fun classes]
  (into #{} (map fun classes)))

(defn- checkInnerClass [class fun]
 (if (contains? atomics (:innerType (:class class)))
  class
  (assoc class :class (fun (:class class)))))

(defn- deMorgan [class fun]
 (case (:innerType (:class class))
  :className class
  :Self class
  :nominal class
  :partialRole class
  :partialDataRole class
  :and (assoc (assoc (:class class) :classes (mapToClassSet (notFun fun) (:classes (:class class)))) :innerType :or)
  :or (assoc (assoc (:class class) :classes (mapToClassSet (notFun fun) (:classes (:class class)))) :innerType :and)
  :exists (assoc (assoc (:class class) :class ((notFun fun) (:class (:class class)))) :innerType :all)
  :all (assoc (assoc (:class class) :class ((notFun fun) (:class (:class class)))) :innerType :exists)
  :<=exists (assoc (assoc (if (:class (:class class)) (checkInnerClass (:class class) fun) (:class class)) :nat (inc (:nat class))) :innerType :>=exists)
  :dataExists (assoc (assoc (:class class) :dataRange (co/dataNot (:dataRange (:class class)))) :innerType :dataAll)
  :dataAll (assoc (assoc (:class class) :dataRange (co/dataNot (:dataRange (:class class)))) :innerType :dataExists)
  :<=dataExists (assoc (assoc (:class class) :nat (inc (:nat class))) :innerType :>=dataExists)
  :=dataExists (if (> (:nat (:class class)) 0)
                (ex/or (assoc (assoc (:class class) :nat (inc (:nat class))) :innerType :>=dataExists)
                       (assoc (assoc (:class class) :nat (dec (:nat class))) :innerType :<=dataExists))
                (assoc (assoc (:class class) :nat 1) :innerType :>=dataExists))
  :>=dataExists (if (> (:nat (:class class)) 0)
                 (assoc (assoc (:class class) :nat (dec (:nat class))) :innerType :<=dataExists)
                 (ex/and (assoc (assoc (:class class) :nat 0) :innerType :<=dataExists)
                         (assoc (:class class) :nat 1)))
  :>=exists (let [class (if (:class (:class class)) (checkInnerClass (:class class) fun) (:class class))]
             (if (> (:nat class) 0)
              (assoc (assoc class :nat (dec (:nat class))) :innerType :<=exists)
              (ex/and (assoc (assoc class :nat 0) :innerType :<=exists)
                      (assoc class :nat 1))))
  :=exists (let [class (if (:class (:class class)) (checkInnerClass (:class class) fun) (:class class)) ]
            (if (> (:nat class) 0)
             (ex/or (assoc (assoc class :nat (inc (:nat class))) :innerType :>=exists)
                    (assoc (assoc class :nat (dec (:nat class))) :innerType :<=exists))
             (assoc (assoc class :nat 1) :innerType :>=exists)))
  (throw (Exception. (str  {:type :notNormalizable :class class})))))

(defn- getClassNNF 
 "Gets the NNF for a class"
 [class]
  (case (:innerType class)
  :className class
  :top class
  :bot class
  :Self class
  :nominal class
  :partialRole class
  :dataExists class
  :dataAll class
  :>=dataExists class
  :<=dataExists class
  :partialDataRole class
  :all (if (:class class) (checkInnerClass class getClassNNF) class)
  :exists (if (:class class) (checkInnerClass class getClassNNF) class)
  :>=exists (if (:class class) (checkInnerClass class getClassNNF) class)
  :<=exists (if (:class class) (checkInnerClass class getClassNNF) class)
  :or (assoc class :classes (mapToClassSet getClassNNF (:classes class)))
  :and (assoc class :classes (mapToClassSet getClassNNF (:classes class)))
  :=dataExists (ex/and (assoc class :innerType :>=dataExists)(assoc class :innerType :<=dataExists))
  :=exists (let [class (if (:class class) (assoc class :class (getClassNNF (:class class))) class)]
            (ex/and (assoc class :innerType :>=exists) (assoc class :innerType :<=exists)))
  :not (case (:innerType (:class class))
        :not (getClassNNF (:class (:class class)))
        :top co/Bot
        :bot co/Top
        (deMorgan class getClassNNF))
  (throw (Exception. (str  {:type :notNormalizable :class class})))))

(defn- iriPermutations 
 [classes]
 (cons (cons (peek classes) (cons (first classes) nil)) (if (> (count classes) 2) (partition 2 1 classes))))

(defn- disjToImp
  ([classes]
    (reduce disjToImp #{} classes))
  ([classes pair]
    (conj classes (ax/classImplication (first pair) (negate (first (rest pair)))))))

(defn- equivToClassImp
  ([classes]
    (reduce equivToClassImp #{} classes))
  ([classes pair]
    (conj classes (ax/classImplication (first pair) (first (rest pair))) (ax/classImplication (first (rest pair)) (first pair)))))

(defn- equivToRoleImp
  ([classes]
    (reduce equivToRoleImp #{} classes))
  ([classes pair]
    (conj classes (ax/roleImplication (first pair) (first (rest pair))) (ax/roleImplication (first (rest pair)) (first pair)))))

(defn- equivToDataRoleImp
  ([classes]
    (reduce equivToRoleImp #{} classes))
  ([classes pair]
    (conj classes (ax/dataRoleImplication (first pair) (first (rest pair))) (ax/dataRoleImplication (first (rest pair)) (first pair)))))

(defn- disjOrToImp
  ([class classes](reduce disjToImp #{} classes))
  ([classes class1 class2](throw (Exception. (str  {:type :notNormalizable :class classes})))))

(defn toClassImplications 
 "Converts a class axiom to an equivalent axiom or set of axioms that are class implications"
 [axiom]
 (case (:innerType axiom)
  :classImplication axiom
  :disjClasses (disjToImp (iriPermutations (into [] (:classes axiom))))
  :=classes (equivToClassImp (iriPermutations (into [] (:classes axiom))))
  :disjOr (apply conj (toClassImplications (ax/disjClasses (:classes axiom))) (toClassImplications (ax/=classes [(:class axiom) (apply ex/or (:classes axiom))])))
  axiom))

(defn toSyntacticEquivalent 
 "Converts an axiom to an equivalent axiom or set of axioms that are class, role, or dataRole implications if such an equivalence :exists. Corresponds to the expanded definitions of syntactic shortcuts in the OWL 2 Specification."
 [axiom]
 (case (:innerType axiom)
  :disjClasses (disjToImp (iriPermutations (into [] (:classes axiom))))
  :=classes (equivToClassImp (iriPermutations (into [] (:classes axiom))))
  :disjOr (apply conj (toSyntacticEquivalent (ax/disjClasses (:classes axiom))) (toSyntacticEquivalent (ax/=classes [(:class axiom) (apply ex/or (:classes axiom))])))
  :=roles (equivToRoleImp (iriPermutations (into [] (:roles axiom))))
  :inverseRoles (toSyntacticEquivalent (ax/=roles #{(:role axiom) (assoc (:inverse axiom) :innerType :inverseRoleName)}))
  :roleDomain (ax/classImplication (ex/exists (:role axiom) co/Top)  (:class axiom)) 
  :roleRange (ax/classImplication co/Top (ex/all (:role axiom) (:class axiom)))
  :functionalRole (ax/classImplication co/Top (ex/<=exists 1 (:role axiom)))
  :functionalInverseRole (ax/classImplication co/Top (ex/<=exists 1 (assoc (:role axiom) :innerType :inverseRoleName)))
  :reflexiveRole (ax/classImplication co/Top (ex/Self (:role axiom)))
  :irreflexiveRole (ax/classImplication (ex/Self (:role axiom)) co/Bot)
  :symmetricRole (ax/roleImplication  (:role axiom) (assoc (:role axiom) :innerType :inverseRoleName))
  :transitiveRole (ax/roleImplication (ax/roleChain (:role axiom) (:role axiom)) (:role axiom))
  :=dataRoles (equivToDataRoleImp (iriPermutations (into [] (:dataRoles axiom))))
  :dataRoleDomain (ax/classImplication (ex/dataExists (:dataRole axiom)) (:class axiom))
  :dataRoleRange (ax/classImplication co/Top (ex/dataAll (:dataRole axiom) (:class axiom)))
  :functionalDataRole (ax/classImplication co/Top (ex/<=dataExists 1 (:role axiom)))
  axiom))

(defn- getClassAxiomNNF 
 "Gets the NNF of a class axiom"
 [axiom]
 (if (= (:innerType axiom) :classImplication)
  (assoc (assoc axiom :consequent (getClassNNF (:consequent axiom))) :antecedent (getClassNNF (:antecedent axiom)))
  (map getClassAxiomNNF (toClassImplications axiom))))

(defn getNNF 
 "Gets the NNF of anything. (non-fowl objects and fowl objects without classes return themselves)"
 [thing]
 (case (:type thing)
  :axiom (case (:outerType thing) 
          :classAxiom (getClassAxiomNNF thing)
          :fact (if (= (:innerType thing) :classFact) 
                 (assoc thing :class (getClassNNF (:class thing))) 
                 thing)
          :roleAxiom (case (:innerType thing) 
                      :roleDomain (assoc thing :class (getClassNNF (:class thing)))
                      :roleRange (assoc thing :class (getClassNNF (:class thing)))
                      (toSyntacticEquivalent thing))
          :dataRoleAxiom (if (= (:innerType thing) :dataRoleDomain) 
                          (assoc thing :class (getClassNNF (:class thing))) 
                          thing)
          :hasKey (assoc thing :class (getClassNNF (:class thing)))
          :rule (assoc (assoc thing :head (mapToClassSet #(if (= (:innerType %) :classAtom) (assoc % :class (getClassNNF (:class %))) %) (:head thing))) :body (mapToClassSet #(if (= (:innerType %) :classAtom) (assoc % :class (getClassNNF (:class %))) %) (:body thing)))
          thing)
  :class (getClassNNF thing)
  thing))

(defn- getClassDSNF 
 [class](prn class)
 (case (:innerType class)
  :className class
  :Self class
  :top class
  :bot class
  :nominal class
  :partialRole (ex/exists (:role class) (ex/nominal (:individual class)))
  :dataExists class
  :dataAll class
  :>=dataExists class
  :<=dataExists class
  :partialDataRole (ex/dataExists (:dataRole class) (co/dataOneOf (:literal class)))
  :all (if (:class class) (checkInnerClass class getClassDSNF) class)
  :exists (if (:class class) (checkInnerClass class getClassDSNF) class)
  :>=exists (if (:class class) (checkInnerClass class getClassDSNF) class)
  :<=exists (if (:class class) (checkInnerClass class getClassDSNF) class)
  :or (assoc class :classes (mapToClassSet getClassDSNF (:classes class)))
  :and (negate (assoc (assoc class :classes (mapToClassSet (notFun getClassDSNF) (:classes class))) :innerType :or))
  :=dataExists (if (> (:nat class) 0)
                (negate (ex/or (assoc (assoc class :nat (inc (:nat class))) :innerType :>=dataExists)
                               (assoc (assoc class :nat (dec (:nat class))) :innerType :<=dataExists)))
                (assoc class :innerType :<=dataExists))
  :=exists (let [class (if (:class class) (assoc class :class (getClassDSNF (:class class))) class)]
            (if (> (:nat class) 0)
             (negate (ex/or (assoc (assoc class :nat (inc (:nat class))) :innerType :>=exists) 
                            (assoc (assoc class :nat (dec (:nat class))) :innerType :<=exists)))
             (assoc class :innerType :<=exists)))
  :not (case (:innerType (:class class))
        :top co/Bot
        :bot co/Top
        :not (getClassDSNF (:class (:class class)))
        :or (assoc class :class (assoc (:class class) :classes (mapToClassSet getClassDSNF (:classes (:class class)))))
        :=exists (negate (getClassDSNF (:class class)))
        :=dataExists (negate (getClassDSNF (:class class)))
        (deMorgan class getClassDSNF))
  (throw (Exception. (str  {:type :notNormalizable :class class})))))

(defn- getClassAxiomDSNF [axiom]
  (if (= (:innerType axiom) :classImplication)
    (ex/or (getClassDSNF (negate (:antecedent axiom))) (getClassDSNF (:consequent axiom)))
    (ex/and (map getClassAxiomDSNF (toClassImplications axiom)))))

(defn ^:no-doc getDSNF 
 "Gets the Disjunctive Syntactic Normal Form for an axiom or class. Unfinished"
 [thing](prn thing)
 (case (:type thing)
  :axiom (case (:outerType thing) 
          :classAxiom (getClassAxiomDSNF thing)
          :fact (if (= (:innerType thing) :classFact) 
                 (assoc thing :class getClassDSNF) 
                 thing)
          :roleAxiom (case (:innerType thing) 
                      :roleDomain (getDSNF (toSyntacticEquivalent thing))
                      :roleRange (getDSNF (toSyntacticEquivalent thing))
                      (toSyntacticEquivalent thing))
          :dataRoleAxiom (if (= (:innerType thing) :dataRoleDomain) 
                          (getDSNF (toSyntacticEquivalent thing))
                          (toSyntacticEquivalent thing))
          :hasKey (assoc thing :class getClassDSNF)
          :rule (assoc (assoc thing :head (mapToClassSet #(if (= (:innerType %) :classAtom) (assoc % :class getClassDSNF) %) (:head thing))) :body (mapToClassSet #(if (= (:innerType %) :classAtom) (assoc % :class getClassDSNF) %) (:body thing)))
          thing)
  :class (getClassDSNF thing)
  thing))

(defn- getClassCSNF 
 [class](prn class)
  (case (:innerType class)
  :className class
  :top class
  :bot class
  :Self class
  :nominal class
  :partialRole (ex/exists (:role class) (ex/nominal (:individual class)))
  :dataExists class
  :dataAll class
  :>=dataExists class
  :<=dataExists class
  :partialDataRole (ex/dataExists (:dataRole class) (co/dataOneOf (:literal class)))
  :all (if (:class class) (checkInnerClass class getClassCSNF) class)
  :exists (if (:class class) (checkInnerClass class getClassCSNF) class)
  :>=exists (if (:class class) (checkInnerClass class getClassCSNF) class)
  :<=exists (if (:class class) (checkInnerClass class getClassCSNF) class)
  :or (negate (assoc (assoc class :classes (mapToClassSet (notFun getClassCSNF) (:classes class))) :innerType :and))
  :and (assoc class :classes (mapToClassSet getClassCSNF (:classes class)))
  :=dataExists (if (> (:nat class) 0)
                (ex/and (assoc class :innerType :>=dataExists)(assoc class :innerType :<=dataExists))
                (assoc class :innerType :<=dataExists))
  :=exists (let [class (if (:class class) (assoc class :class (getClassCSNF (:class class))) class)]
            (if (> (:nat class) 0)
             (ex/and (assoc class :innerType :>=exists) (assoc class :innerType :<=exists))
             (assoc class :innerType :<=exists)))
  :not (case (:innerType (:class class))
        :top co/Bot
        :bot co/Top
        :not (getClassCSNF (:class (:class class)))
        :and (assoc class :class (assoc (:class class) :classes (mapToClassSet getClassCSNF (:classes (:class class)))))
        :=exists (negate (getClassCSNF (:class class)))
        :=dataExists (negate (getClassCSNF (:class class)))
        (deMorgan class getClassCSNF))
  (throw (Exception. (str  {:type :notNormalizable :class class})))))

(defn- getClassAxiomCSNF [axiom]
  (if (= (:innerType axiom) :classImplication)
   (negate (ex/and (getClassCSNF (:antecedent axiom)) (getClassCSNF (negate (:consequent axiom)))))
   (ex/and (map getClassAxiomCSNF (toClassImplications axiom)))))

(defn ^:no-doc getCSNF 
 "Gets the Conjunctive Syntactic Normal Form for an axiom or class. Unfinished"
 [thing](prn thing)
 (case (:type thing)
  :axiom (case (:outerType thing) 
          :classAxiom (getClassAxiomCSNF thing)
          :fact (if (= (:innerType thing) :classFact) 
                 (assoc thing :class (getClassCSNF (:class thing))) 
                 thing)
          :roleAxiom (case (:innerType thing) 
                      :roleDomain (getCSNF (toSyntacticEquivalent thing))
                      :roleRange (getCSNF (toSyntacticEquivalent thing))
                      (toSyntacticEquivalent thing))
          :dataRoleAxiom (if (= (:innerType thing) :dataRoleDomain) 
                          (getCSNF (toSyntacticEquivalent thing))
                          (toSyntacticEquivalent thing))
          :hasKey (assoc thing :class (getClassCSNF (:class thing)))
          :rule (assoc (assoc thing :head (mapToClassSet #(if (= (:innerType %) :classAtom) (assoc % :class (getClassCSNF (:class %))) %) (:head thing))) :body (mapToClassSet #(if (= (:innerType %) :classAtom) (assoc % :class (getClassCSNF (:class %))) %) (:body thing)))
          (toSyntacticEquivalent thing))
  :class (getClassCSNF thing)
  thing))
