(ns ontology.SWRL
 "Functions that represent SWRL components"
 (:require [ontology.expressions :as ex][ontology.components :as co]))

(def ^:no-doc atomTypes
  #{:atom :classAtom :roleAtom :dataRoleAtom :dataRangeAtom :builtInAtom :=individualsAtom :!=individualsAtom})

(defn body
 "‘Body’ ‘(’ {Atom} ‘)’"
 [atoms]
 (if (= (:type atoms) :body)
  atoms
  (if (every? (fn [x] (= (:type x) :atom)) atoms)
    {:atoms atoms :type :body :innerType :body}
    (throw (Exception. (str  {:type ::notAtoms :atoms atoms}))))))

(defn head
"‘Head‘ ‘(’ {Atom} ‘)’"
[atoms]
(if (= (:type atoms) :head)
 atoms
 (if (every? (fn [x] (= (:type x) :atom)) atoms)
   {:atoms atoms :type :head :innerType :head}
   (throw (Exception. (str  {:type ::notAtoms :atoms atoms}))))))

(defn- -atom 
 "Atom ::= ClassAtom | DataRangeAtom | ObjectPropertyAtom | DataPropertyAtom | BuiltInAtom | SameIndividualAtom | DifferentIndividualsAtom" 
 [at] 
 (if (contains? atomTypes (:type at))
   (assoc at :type :atom)
   (throw (Exception. (str  {:type ::notAtom :atom at})))))

(defn- -dgAtom
 "DGAtom ::= ClassAtom | ObjectPropertyAtom"
 [at]
 (if (or (= (:type at) :classAtom)(= (:type at) :roleAtom))
   (assoc at :type :atom)
   (throw (Exception. (str  {:type ::notAtom :atom at})))))

(defn- -iArg
 "IArg ::= IndividualID | Variable"
 [arg]
 (if (or (= (:type arg) :variable)(= (:type arg) :individual))
   (assoc arg :type :iarg)
   (throw (Exception. (str  {:type ::notIArg :IArg arg})))))

(defn iArg
 "IArg ::= IndividualID | Variable"
 [arg]
 (if (= (:type arg) :variable)
   (-iArg arg)
   (-iArg (co/individual arg))))

(defn dArg
 "DArg ::= Literal | Variable"
 [arg]
 (if (or (= (:type arg) :variable)(= (:type arg) :literal))
   (assoc arg :type :darg)
   (throw (Exception. (str  {:type ::notDArg :DArg arg})))))

(defn variable
 "Variable := ‘Variable’ ‘(’ IRI ‘)’"
 [iri]
 (if (:iri iri)
   (assoc iri :type :variable :innerType :variable)
   (throw (Exception. (str  {:type ::notIRI :iri iri})))))

(defn- -classAtom
 "ClassAtom := ‘ClassAtom’ ‘(’ ClassExpression IArg ‘)’"
 [class iarg]
 (if (= (:type class) :class)
   (if (= (:type iarg) :iarg)
     {:class class :iarg iarg :type :classAtom :innerType :classAtom}
     (throw (Exception. (str  {:type ::notIarg :iarg iarg}))))
   (throw (Exception. (str  {:type ::notClass :class class})))))

(defn classAtom
 "ClassAtom := ‘ClassAtom’ ‘(’ ClassExpression IArg ‘)’"
 [class iarg]
 (-atom (-classAtom (ex/class class) (iArg iarg))))

(defn- -dataRangeAtom
 "DataRangeAtom := ‘DataRangeAtom’ ‘(’ DataRange DArg ‘)’"
 [dataRange darg]
 (if (= (:type dataRange) :dataRange)
   (if (= (:type darg) :darg)
     {:dataRange dataRange :darg darg :type :dataRangeAtom :innerType :dataRangeAtom}
     (throw (Exception. (str  {:type ::notDarg :darg darg}))))
   (throw (Exception. (str  {:type ::notDataRole :dataRange dataRange})))))

(defn dataRangeAtom
 "DataRangeAtom := ‘DataRangeAtom’ ‘(’ DataRange DArg ‘)’"
 [dataRange darg]
 (-atom (-dataRangeAtom (co/dataRange dataRange) (dArg darg))))

(defn- -roleAtom
 "ObjectPropertyAtom := ‘ObjectPropertyAtom’ ‘(’ ObjectPropertyExpression IArg IArg ‘)’"
 [role iarg1 iarg2]
 (if (= (:type role) :role)
   (if (= (:type iarg1) :iarg)
     (if (= (:type iarg2) :iarg)
       {:role role :iarg1 iarg1 :iarg2 iarg2 :type :roleAtom :innerType :roleAtom}
       (throw (Exception. (str  {:type ::notIarg :iarg iarg2}))))
     (throw (Exception. (str  {:type ::notIarg :iarg iarg1}))))
   (throw (Exception. (str  {:type ::notRole :role role})))))

(defn roleAtom
 "ObjectPropertyAtom := ‘ObjectPropertyAtom’ ‘(’ ObjectPropertyExpression IArg IArg ‘)’"
 [role iarg1 iarg2]
 (-atom (-roleAtom (ex/role role) (iArg iarg1) (iArg iarg2))))

(defn- -dataRoleAtom
 "DataPropertyAtom := ‘DataPropertyAtom’ ‘(’ DataProperty IArg DArg ‘)’"
 [dataRole iarg darg]
 (if (= (:type dataRole) :dataRole)
   (if (= (:type darg) :darg)
     (if (= (:type iarg) :iarg)
       {:dataRole dataRole :iarg iarg :darg darg :type :dataRoleAtom :innerType :dataRoleAtom}
       (throw (Exception. (str  {:type ::notIarg :iarg iarg}))))
     (throw (Exception. (str  {:type ::notDarg :darg darg}))))
   (throw (Exception. (str  {:type ::notDataRole :dataRole dataRole})))))

(defn dataRoleAtom
 "DataPropertyAtom := ‘DataPropertyAtom’ ‘(’ DataProperty IArg DArg ‘)’"
 [dataRole iarg darg]
 (-atom (-dataRoleAtom (ex/dataRole dataRole) (iArg iarg) (dArg darg))))

(defn- -builtInAtom
 "BuiltInAtom := ‘BuiltInAtom’ ‘(’ IRI DArg { DArg } ‘)’"
 [iri dargs]
 (if (< 1 (count dargs))
   (if (every? (fn [x] (= (:type x) :darg)) dargs)
     (if (:iri iri)
       {:iri iri :dargs dargs :type :builtInAtom :innerType :builtInAtom}
       (throw (Exception. (str  {:type ::notIRI :iri iri}))))
     (throw (Exception. (str  {:type ::notDargs :dargs dargs}))))
   (throw (Exception. (str  {:type ::notEnoughDargs :dargs dargs})))))

(defn builtInAtom
 "BuiltInAtom := ‘BuiltInAtom’ ‘(’ IRI DArg { DArg } ‘)’"
 [iri dargs]
 (-atom (-builtInAtom (co/IRI iri) (into #{} (map dArg dargs)))))

(defn- -=individualsAtom
 "SameIndividualAtom := ‘SameIndividualAtom’ ‘(’ IArg IArg ‘)’"
 [iarg1 iarg2]
 (if (= (:type iarg1) :iarg)
   (if (= (:type iarg2) :iarg)
     {:iarg1 iarg1 :iarg2 iarg2 :type :=individualsAtom :innerType :=individualsAtom}
     (throw (Exception. (str  {:type ::notIArg :iarg iarg2}))))
   (throw (Exception. (str  {:type ::notIArg :iarg iarg1})))))

(defn =individualsAtom
 "SameIndividualAtom := ‘SameIndividualAtom’ ‘(’ IArg IArg ‘)’"
 [iarg1 iarg2]
 (-atom (-=individualsAtom (iArg iarg1) (iArg iarg2))))

(defn- -!=individualsAtom
 "DifferentIndividualsAtom := ‘DifferentIndividualsAtom’ ‘(’ IArg IArg ‘)’"
 [iarg1 iarg2]
 (if (= (:type iarg1) :iarg)
   (if (= (:type iarg2) :iarg)
     {:iarg1 iarg1 :iarg2 iarg2 :type :!=individualsAtom :innerType :!=individualsAtom}
     (throw (Exception. (str  {:type ::notIArg :iarg iarg2}))))
   (throw (Exception. (str  {:type ::notIArg :iarg iarg1})))))

(defn !=individualsAtom 
 "DifferentIndividualsAtom := ‘DifferentIndividualsAtom’ ‘(’ IArg IArg ‘)’"
 [iarg1 iarg2]
 (-atom (-!=individualsAtom (iArg iarg1) (iArg iarg2))))

(defn ^:no-doc dgName
 "DGName ::= IRI"
 [iri]
 (if (contains? iri :type)
   (throw (Exception. (str  {:type ::notDGName :iri iri})
   (assoc iri :type :dgName :innerType :dgName)))))

(defn- -dgNodes
 "DGNodes ::= ‘Nodes’‘(’ NodeAssertion { NodeAssertion } ‘)’"
 [nodes]
 (if (< 1 (count nodes))
   (if (every? (fn [x] (= (:type x) :nodeFact)) nodes)
     {:nodes nodes :type :dgNodes :innerType :dgNodes}
     (throw (Exception. (str  {:type ::notNodes :nodes nodes}))))
   (throw (Exception. (str  {:type ::notEnoughNodes :nodes nodes})))))

(defn ^:no-doc dgNode
 "DGNode ::= IRI"
 [iri]
 (if (contains? iri :type)
   (throw (Exception. (str  {:type ::notDGNode :iri iri})))
   (assoc iri :type :dgNode :innerType :dgNode)))

(defn ^:no-doc dgNodes [nodes]
  (-dgNodes (map dgNode nodes)))

(defn- -nodeFact
 "NodeAssertion ::= ‘NodeAssertion’‘(’ Class DGNode ‘)’"
 [class node]
 (if (= (:type class) :class)
   (if (= (:type node) :dgNode)
     {:class class :node node :type :nodeFact :innerType :nodeFact}
     (throw (Exception. (str  {:type ::notDGNode :node node}))))
   (throw (Exception. (str  {:type ::notClass :class class})))))

(defn ^:no-doc nodeFact [class node]
  (-nodeFact (ex/class class) (dgNode node)))

(defn- -dgEdges
 "DGEdges ::= ‘Edges’‘(’ EdgeAssertion { EdgeAssertion } ‘)’"
 [edges]
 (if (< 1 (count edges))
   (if (every? (fn [x] (= (:type x) :edgeFact)) edges)
     {:edges edges :type :dgEdges :innerType :dgEdges}
     (throw (Exception. (str  {:type ::notEdges :edges edges}))))
   (throw (Exception. (str  {:type ::notEnoughEdges :edges edges})))))

(defn- -edgeFact
 "EdgeAssertion ::= ‘EdgeAssertion’ ‘(’ ObjectProperty DGNode DGNode ‘)’"
 [role node1 node2]
 (if (= (:type role) :role)
   (if (= (:type node1) :dgNode)
     (if (= (:type node2) :dgNode)
       {:role role :node1 node1 :node2 node2 :type :edgeFact :innerType :edgeFact}
       (throw (Exception. (str  {:type ::notDGNode :node node2}))))
     (throw (Exception. (str  {:type ::notDGNode :node node1}))))
   (throw (Exception. (str  {:type ::notRole :role role})))))

(defn ^:no-doc edgeFact [role node1 node2]
  (-edgeFact (ex/role role) (dgNode node1) (dgNode node2)))

(defn ^:no-doc dgEdges [edges]
  (-dgEdges (map edgeFact edges)))

(defn- -mainClasses
 "MainClasses ::= ‘MainClasses’ ‘(’ Class { Class } ‘)’"
 [classes]
 (if (< 1 (count classes))
   (if (every? (fn [x] (= (:type x) :class)) classes)
     {:classes classes :type :mainClasses :innerType :mainClasses}
     (throw (Exception. (str  {:type ::notClasses :classes classes}))))
   (throw (Exception. (str  {:type ::notEnoughClasses :classes classes})))))

(defn ^:no-doc mainClasses [classes]
  (-mainClasses (map ex/class classes)))
