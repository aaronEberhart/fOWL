(ns ontology.SWRL
  (:use [slingshot.slingshot :only [throw+]])
  (:require [ontology.expressions :as ex][ontology.components :as co]))

(def atomTypes
  #{:classAtom :roleAtom :dataRoleAtom :dataRangeAtom :builtInAtom :=individualsAtom :!=individualsAtom})

(defn body [atoms]
  (if (every? (fn [x] (= (:type x) :atom)) atoms)
    {:atoms atoms :type :body :innerType :body}
    (throw+ {:type ::notAtoms :atoms atoms})))

(defn head [atoms]
  (if (every? (fn [x] (= (:type x) :atom)) atoms)
    {:atoms atoms :type :head :innerType :head}
    (throw+ {:type ::notAtoms :atoms atoms})))

(defn- -atom [at]
  "Atom ::= ClassAtom | DataRangeAtom | ObjectPropertyAtom | DataPropertyAtom | BuiltInAtom | SameIndividualAtom | DifferentIndividualsAtom"
  (if (contains? atomTypes (:type at))
    (assoc at :type :atom)
    (throw+ {:type ::notAtom :atom at})))

(defn- -dgAtom [at]
  "DGAtom ::= ClassAtom | ObjectPropertyAtom"
  (if (or (= (:type at) :classAtom)(= (:type at) :roleAtom))
    (assoc at :type :atom)
    (throw+ {:type ::notAtom :atom at})))

(defn- -iArg [arg]
  "IArg ::= IndividualID | Variable"
  (if (or (= (:type arg) :variable)(= (:type arg) :individual))
    (assoc arg :type :iarg)
    (throw+ {:type ::notIArg :IArg arg})))

(defn iArg [arg]
  (if (= (:type arg) :variable)
    (-iArg arg)
    (-iArg (co/individual arg))))

(defn dArg [arg]
  "DArg ::= Literal | Variable"
  (if (or (= (:type arg) :variable)(= (:type arg) :literal))
    (assoc arg :type :darg)
    (throw+ {:type ::notDArg :DArg arg})))

(defn variable [iri]
  "Variable := ‘Variable’ ‘(’ IRI ‘)’"
  (if (:iri iri)
    (assoc iri :type :variable :innerType :variable)
    (throw+ {:type ::notIRI :iri iri})))

(defn- -classAtom [class iarg]
  "ClassAtom := ‘ClassAtom’ ‘(’ ClassExpression IArg ‘)’"
  (if (= (:type class) :class)
    (if (= (:type iarg) :iarg)
      {:class class :iarg iarg :type :classAtom :innerType :classAtom}
      (throw+ {:type ::notIarg :iarg iarg}))
    (throw+ {:type ::notClass :class class})))

(defn classAtom [class iarg]
    (-atom (-classAtom (ex/class class) (iArg iarg))))

(defn- -dataRangeAtom [dataRange darg]
  "DataRangeAtom := ‘DataRangeAtom’ ‘(’ DataRange DArg ‘)’"
  (if (= (:type dataRange) :dataRange)
    (if (= (:type darg) :darg)
      {:dataRange dataRange :darg darg :type :dataRangeAtom :innerType :dataRangeAtom}
      (throw+ {:type ::notDarg :darg darg}))
    (throw+ {:type ::notDataRole :dataRange dataRange})))

(defn dataRangeAtom [dataRange darg]
  (-atom (-dataRangeAtom (co/dataRange dataRange) (dArg darg))))

(defn- -roleAtom [role iarg1 iarg2]
  "ObjectPropertyAtom := ‘ObjectPropertyAtom’ ‘(’ ObjectPropertyExpression IArg IArg ‘)’"
  (if (= (:type role) :role)
    (if (= (:type iarg1) :iarg)
      (if (= (:type iarg2) :iarg)
        {:role role :iarg1 iarg1 :iarg2 iarg2 :type :roleAtom :innerType :roleAtom}
        (throw+ {:type ::notIarg :iarg iarg2}))
      (throw+ {:type ::notIarg :iarg iarg1}))
    (throw+ {:type ::notRole :role role})))

(defn roleAtom [role iarg1 iarg2]
  (-atom (-roleAtom (ex/role role) (iArg iarg1) (iArg iarg2))))

(defn- -dataRoleAtom [dataRole iarg darg]
  "DataPropertyAtom := ‘DataPropertyAtom’ ‘(’ DataProperty IArg DArg ‘)’"
  (if (= (:type dataRole) :dataRole)
    (if (= (:type darg) :darg)
      (if (= (:type iarg) :iarg)
        {:dataRole dataRole :iarg iarg :darg darg :type :dataRoleAtom :innerType :dataRoleAtom}
        (throw+ {:type ::notIarg :iarg iarg}))
      (throw+ {:type ::notDarg :darg darg}))
    (throw+ {:type ::notDataRole :dataRole dataRole})))

(defn dataRoleAtom [dataRole iarg darg]
  (-atom (-dataRoleAtom (ex/dataRole dataRole) (iArg iarg) (dArg darg))))

(defn- -builtInAtom [iri dargs]
  "BuiltInAtom := ‘BuiltInAtom’ ‘(’ IRI DArg { DArg } ‘)’"
  (if (< 1 (count dargs))
    (if (every? (fn [x] (= (:type x) :darg)) dargs)
      (if (:iri iri)
        {:iri iri :dargs dargs :type :builtInAtom :innerType :builtInAtom}
        (throw+ {:type ::notIRI :iri iri}))
      (throw+ {:type ::notDargs :dargs dargs}))
    (throw+ {:type ::notEnoughDargs :dargs dargs})))

(defn builtInAtom [iri dargs]
  (-atom (-builtInAtom (co/IRI iri) (into #{} (map dArg dargs)))))

(defn- -=individualsAtom [iarg1 iarg2]
  "SameIndividualAtom := ‘SameIndividualAtom’ ‘(’ IArg IArg ‘)’"
  (if (= (:type iarg1) :iarg)
    (if (= (:type iarg2) :iarg)
      {:iarg1 iarg1 :iarg2 iarg2 :type :=individualsAtom :innerType :=individualsAtom}
      (throw+ {:type ::notIArg :iarg iarg2}))
    (throw+ {:type ::notIArg :iarg iarg1})))

(defn =individualsAtom [iarg1 iarg2]
  (-atom (-=individualsAtom (iArg iarg1) (iArg iarg2))))

(defn- -!=individualsAtom [iarg1 iarg2]
  "DifferentIndividualsAtom := ‘DifferentIndividualsAtom’ ‘(’ IArg IArg ‘)’"
  (if (= (:type iarg1) :iarg)
    (if (= (:type iarg2) :iarg)
      {:iarg1 iarg1 :iarg2 iarg2 :type :!=individualsAtom :innerType :!=individualsAtom}
      (throw+ {:type ::notIArg :iarg iarg2}))
    (throw+ {:type ::notIArg :iarg iarg1})))

(defn !=individualsAtom [iarg1 iarg2]
  (-atom (-!=individualsAtom (iArg iarg1) (iArg iarg2))))

(defn dgName [iri]
  "DGName ::= IRI"
  (if (contains? iri :type)
    (throw+ {:type ::notDGName :iri iri})
    (assoc iri :type :dgName :innerType :dgName)))

(defn- -dgNodes [nodes]
  "DGNodes ::= ‘Nodes’‘(’ NodeAssertion { NodeAssertion } ‘)’"
  (if (< 1 (count nodes))
    (if (every? (fn [x] (= (:type x) :nodeFact)) nodes)
      {:nodes nodes :type :dgNodes :innerType :dgNodes}
      (throw+ {:type ::notNodes :nodes nodes}))
    (throw+ {:type ::notEnoughNodes :nodes nodes})))

(defn dgNode [iri]
  "DGNode ::= IRI"
  (if (contains? iri :type)
    (throw+ {:type ::notDGNode :iri iri})
    (assoc iri :type :dgNode :innerType :dgNode)))

(defn dgNodes [nodes]
  (-dgNodes (map dgNode nodes)))

(defn- -nodeFact [class node]
  "NodeAssertion ::= ‘NodeAssertion’‘(’ Class DGNode ‘)’"
  (if (= (:type class) :class)
    (if (= (:type node) :dgNode)
      {:class class :node node :type :nodeFact :innerType :nodeFact}
      (throw+ {:type ::notDGNode :node node}))
    (throw+ {:type ::notClass :class class})))

(defn nodeFact [class node]
  (-nodeFact (ex/class class) (dgNode node)))

(defn- -dgEdges [edges]
  "DGEdges ::= ‘Edges’‘(’ EdgeAssertion { EdgeAssertion } ‘)’"
  (if (< 1 (count edges))
    (if (every? (fn [x] (= (:type x) :edgeFact)) edges)
      {:edges edges :type :dgEdges :innerType :dgEdges}
      (throw+ {:type ::notEdges :edges edges}))
    (throw+ {:type ::notEnoughEdges :edges edges})))

(defn- -edgeFact [role node1 node2]
  "EdgeAssertion ::= ‘EdgeAssertion’ ‘(’ ObjectProperty DGNode DGNode ‘)’"
  (if (= (:type role) :role)
    (if (= (:type node1) :dgNode)
      (if (= (:type node2) :dgNode)
        {:role role :node1 node1 :node2 node2 :type :edgeFact :innerType :edgeFact}
        (throw+ {:type ::notDGNode :node node2}))
      (throw+ {:type ::notDGNode :node node1}))
    (throw+ {:type ::notRole :role role})))

(defn edgeFact [role node1 node2]
  (-edgeFact (ex/role role) (dgNode node1) (dgNode node2)))

(defn dgEdges [edges]
  (-dgEdges (map edgeFact edges)))

(defn- -mainClasses [classes]
  "MainClasses ::= ‘MainClasses’ ‘(’ Class { Class } ‘)’"
  (if (< 1 (count classes))
    (if (every? (fn [x] (= (:type x) :class)) classes)
      {:classes classes :type :mainClasses :innerType :mainClasses}
      (throw+ {:type ::notClasses :classes classes}))
    (throw+ {:type ::notEnoughClasses :classes classes})))

(defn mainClasses [classes]
  (-mainClasses (map ex/class classes)))
