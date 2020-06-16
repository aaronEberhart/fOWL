(ns main
 (:import (java.io PrintStream))
 (:require [ontology.IO :as oio][ontology.axioms :as ax][ontology.components :as co][ontology.expressions :as ex][ontology.annotations :as ann]
           [ontology.facts :as fct][ontology.file :as fl]
           [unReasoner.preprocessing :as pre][unReasoner.consistency :as con][unReasoner.tableau :as tab]
           [util.msc :as msc]
           [clojure.string :as str][clojure.java.io :as io])
 (:use [slingshot.slingshot :only [try+  throw+]])
)

(defn runFileTests []
 (io/delete-file "output.txt" true)
 (doseq [file (file-seq (io/file "OWL/fs/enslavedv2.owlfs.owl"))]
  (if (and (.isFile file) (not (re-matches #"^catalog[\s\S]*" (.getName file))))
   (do (println (.getName file))
     (msc/strToFile (str "Reading and Copying " (.getName file)))
     (oio/makeOWLFile (str "OWL/copies/" (.getName file)) (time (oio/readFunctionalFile (io/file file))))
     (msc/strToFile (str "Reading Copy Of " (.getName file)))
     (prn (type (rest (rest (:axioms (oio/readFunctionalFile (str "OWL/copies/" (.getName file))))))))
     (msc/strToFile (str "Moving Original " (.getName file)))
     (io/copy file (io/file (str "OWL/checked/" (.getName file))))
     ;(io/delete-file file)
     (msc/strToFile (str "finished " (.getName file)))))))

(defn runReasonerTests []
 (io/delete-file "output.txt" true)
 (doseq [file (file-seq (io/file "OWL/fs/cree.owlfs.owl"))]
  (if (and (.isFile file) (not (re-matches #"^catalog[\s\S]*" (.getName file))))
    (let [_ (println "Reading" (.getName file))
       ontology (time (oio/readFunctionalFile (io/file file)))
      prefixes (take-while some? (oio/prefixes ontology))
      _ (println "Prefixes: " (count prefixes))
      ontiri (oio/ontologyIRI ontology)
      _ (println "Ontology IRI: " (:iri ontiri))
      versiri (oio/versionIRI ontology)
      _ (println "Version IRI: " (:iri versiri))
      imp (take-while some? (oio/imports ontology))
      _ (println "Imports: " (count imp))
      ann (take-while some? (oio/annotations ontology))
      _ (println "Ontology Annotations: " (count ann))
      classAxioms (oio/classAxiomsNoAnnotations ontology)
      roleAxioms (oio/roleAxiomsNoAnnotations ontology)
      facts (oio/factsNoAnnotations ontology)
      dataAxioms (oio/dataRoleAxiomsNoAnnotations ontology)
      a (ax/classImplication (ex/or (ex/class "b" "" ":") (ex/class "c" "" ":")) (ex/or (ex/class "d" "" ":") (ex/class "e" "" ":")))
      b (ax/classImplication (ex/not (ex/or (ex/class "b" "" ":") (ex/class "c" "" ":"))) (ex/or (ex/class "a" "" ":") (ex/class "g" "" ":")))
      c (ax/classImplication (ex/or (ex/class "b" "" ":") (ex/class "c" "" ":")) (ex/not (ex/or (ex/class "d" "" ":") (ex/class "e" "" ":"))))
      d (ax/classImplication (ex/not (ex/or (ex/class "b" "" ":") (ex/class "c" "" ":"))) (ex/not (ex/or (ex/class "f" "" ":") (ex/class "m" "" ":"))))
      e (ax/classImplication (ex/not (ex/not (ex/or (ex/class "b" "" ":") (ex/class "c" "" ":"))))(ex/not (ex/not (ex/or (ex/class "r" "" ":") (ex/class "o" "" ":")))))
      f (ax/classImplication (ex/and (ex/class "b" "" ":") (ex/class "c" "" ":")) (ex/and (ex/class "d" "" ":") (ex/class "e" "" ":")))
      g (ax/classImplication (ex/not (ex/and (ex/class "b" "" ":") (ex/class "c" "" ":"))) (ex/and (ex/class "a" "" ":") (ex/class "g" "" ":")))
      h (ax/classImplication (ex/and (ex/class "b" "" ":") (ex/class "c" "" ":")) (ex/not (ex/and (ex/class "d" "" ":") (ex/class "e" "" ":"))))
      i (ax/classImplication (ex/not (ex/and (ex/class "b" "" ":") (ex/class "c" "" ":"))) (ex/not (ex/and (ex/class "f" "" ":") (ex/class "m" "" ":"))))
      j (ax/classImplication (ex/not (ex/not (ex/and (ex/class "b" "" ":") (ex/class "c" "" ":"))))(ex/not (ex/not (ex/and (ex/class "r" "" ":") (ex/class "o" "" ":")))))
      k (ax/classImplication (ex/not (ex/and (ex/not (ex/or (ex/class "b" "" ":") (ex/class "c" "" ":"))) (ex/or (ex/class "a" "" ":") (ex/class "d" "" ":"))))
                  (ex/not (ex/and (ex/or (ex/class "e" "" ":") (ex/class "g" "" ":")) (ex/not (ex/or (ex/class "f" "" ":") (ex/class "h" "" ":"))))))
        l (ax/disjClasses [(ex/class "a" "" ":") (ex/class "b" "" ":") (ex/class "c" "" ":") (ex/class "d" "" ":") (ex/class "e" "" ":")])
      m (ax/disjClasses [(ex/class "a") (ex/class "b")(ex/class "c")])
      ]
      (pre/process classAxioms)))));(lazy-seq (list l m)))))));



(defn -main [& args]
 (runReasonerTests))

(comment " IMPORTANT NOTES

 11 Global Restrictions on Axioms in OWL 2 DL
  The axiom closure Ax (with anonymous individuals standardized apart as explained in Section 5.6.2) of each OWL 2 DL ontology O must satisfy the global restrictions defined in this section. As explained in the literature [SROIQ], this restriction is necessary in order to obtain a decidable language. The formal definition of these conditions is rather technical, so it is split into two parts. Section 11.1 first introduces the notions of a property hierarchy and of simple object property expressions. These notions are then used in Section 11.2 to define the actual conditions on Ax.

  11.1 Property Hierarchy and Simple Object Property Expressions
  For an object property expression OPE, the inverse property expression INV(OPE) is defined as follows:

  If OPE is an object property OP, then INV(OPE) = ObjectInverseOf( OP ).
  if OPE is of the form ObjectInverseOf( OP ) for OP an object property, then INV(OPE) = OP.
  The set AllOPE(Ax) of all object property expressions w.r.t. Ax is the smallest set containing OP and INV(OP) for each object property OP occurring in Ax.

  An object property expression OPE is composite in the set of axioms Ax if

  OPE is equal to owl:topObjectProperty or owl:bottomObjectProperty, or
  Ax contains an axiom of the form
  SubObjectPropertyOf( ObjectPropertyChain( OPE1 ... OPEn ) OPE ) with n > 1, or
  SubObjectPropertyOf( ObjectPropertyChain( OPE1 ... OPEn ) INV(OPE) ) with n > 1, or
  TransitiveObjectProperty( OPE ), or
  TransitiveObjectProperty( INV(OPE) ).
  The relation → is the smallest relation on AllOPE(Ax) for which the following conditions hold (A → B means that → holds for A and B):

  if Ax contains an axiom SubObjectPropertyOf( OPE1 OPE2 ), then OPE1 → OPE2 holds; and
  if Ax contains an axiom EquivalentObjectProperties( OPE1 OPE2 ), then OPE1 → OPE2 and OPE2 → OPE1 hold; and
  if Ax contains an axiom InverseObjectProperties( OPE1 OPE2 ), then OPE1 → INV(OPE2) and INV(OPE2) → OPE1 hold; and
  if Ax contains an axiom SymmetricObjectProperty(OPE), then OPE → INV(OPE) holds; and
  if OPE1 → OPE2 holds, then INV(OPE1) → INV(OPE2) holds as well.
  The property hierarchy relation →* is the reflexive-transitive closure of →.

  An object property expression OPE is simple in Ax if, for each object property expression OPE' such that OPE' →* OPE holds, OPE' is not composite.

  Roughly speaking, a simple object property expression has no direct or indirect subproperties that are either transitive or are defined by means of property chains, where the notion of indirect subproperties is captured by the property hierarchy. Consider the following axioms:

  SubObjectPropertyOf( ObjectPropertyChain( a:hasFather a:hasBrother ) a:hasUncle ) The brother of someone's father is that person's uncle.
  SubObjectPropertyOf( a:hasUncle a:hasRelative ) Having an uncle implies having a relative.
  SubObjectPropertyOf( a:hasBiologicalFather a:hasFather ) Having a biological father implies having a father.
  The object property a:hasUncle occurs in an object subproperty axiom involving a property chain, so it is not simple. Consequently, the object property a:hasRelative is not simple either, because a:hasUncle is a subproperty of a:hasRelative and a:hasUncle is not simple. In contrast, the object property a:hasBiologicalFather is simple, and so is a:hasFather.

  11.2 The Restrictions on the Axiom Closure
  The set of axioms Ax satisfies the global restrictions of OWL 2 DL if all of the following conditions hold.

  Restriction on owl:topDataProperty. The owl:topDataProperty property occurs in Ax only in the superDataPropertyExpression part of SubDataPropertyOf axioms.

  Without this restriction, owl:topDataProperty could be used to write axioms about datatypes, which would invalidate Theorem DS1 from the OWL 2 Direct Semantics [OWL 2 Direct Semantics]. That is, the consequences of an ontology would then not necessarily depend only on the datatypes used in the ontology, but would also depend on the datatypes selected in the OWL 2 datatype map. Thus, if an implementation or a future revision of OWL decided to extend the set of supported datatypes, it would run the risk of possibly changing the consequences of certain ontologies.

  Restrictions on Datatypes.

  Each datatype occurring in Ax satisfies exactly one of the following conditions: it is rdfs:Literal, or it is contained in the OWL 2 datatype map, or it is defined by a single datatype definition axiom in Ax.
  A strict partial order (i.e., an irreflexive and transitive relation) < on the set of all datatypes in Ax exists such that, for each axiom of the form DatatypeDefinition( DT DR ) and each datatype DT1 occurring in DR, we have DT1 < DT.
  The first condition ensures that all datatypes in Ax are given a well-defined interpretation and that datatype definitions do not redefine the datatypes from the OWL 2 datatype map. The second condition ensures that datatype definitions are acyclic — that is, if a datatype DT1 is used in a definition of DT, then DT is not allowed to be used in the definition of DT1 — and it is illustrated by the following example:

  Declaration( Datatype( a:SSN ) ) a:SSN is a datatype.
  Declaration( Datatype( a:TIN ) ) a:TIN is a datatype.
  Declaration( Datatype( a:TaxNumber ) ) a:TaxNumber is a datatype."
  ;DatatypeDefinition(
  ;    a:SSN
  ;    DatatypeRestriction( xsd:string xsd:pattern "[0-9]{3}-[0-9]{2}-[0-9]{4}" )
  ;) A social security number is a string that matches the given regular expression.
  ;DatatypeDefinition(
  ;    a:TIN
  ;    DatatypeRestriction( xsd:string xsd:pattern "[0-9]{11}" )
  ;) A TIN — a tax identification number used in Germany — is a string consisting of 11 digits.
  "DatatypeDefinition( a:TaxNumber DataUnionOf( a:SSN a:TIN ) ) A tax number is either a social security number of a TIN.
  These datatype definitions are acyclic: a:SSN and a:TIN are defined in terms of xsd:string, and a:TaxNumber is defined in terms of a:SSN and a:TIN. To verify this condition formally, it suffices to find one strict partial order < on these datatypes such that each datatype is defined only in terms of the datatypes that are smaller w.r.t. <. For example, it can be readily verified that the partial order < given below fulfills the above conditions.

  xsd:string   <   a:SSN   <   a:TaxNumber
  xsd:string   <   a:TIN   <   a:TaxNumber

  Note that order < is allowed to be partial — that is, some datatypes can be incomparable under <. In the above example, datatypes a:SSN and a:TIN are incomparable under <. Since neither of these two datatypes is defined in terms of the other datatype, the order between the two datatypes is irrelevant.

  The restriction on datatypes is necessary to ensure validity of Theorem DS1 from the OWL 2 Direct Semantics [OWL 2 Direct Semantics]. Furthermore, the restriction is natural given that data ranges describe the set of values exactly. For example, if an axiom defining a:SSN in terms of a:TIN and a:TaxNumber were added to the above axioms, then datatypes a:SSN, a:TIN, and a:TaxNumber could not be simply "unfolded", which is contrary to the intended meaning of these datatypes. This situation, however, is disallowed since no ordering < satisfying the mentioned restrictions exists for the extended axiom set.

  Restriction on Simple Roles. Each class expression and each axiom in Ax of type from the following two lists contains only simple object properties.

  ObjectMinCardinality, ObjectMaxCardinality, ObjectExactCardinality, and ObjectHasSelf .
  FunctionalObjectProperty, InverseFunctionalObjectProperty, IrreflexiveObjectProperty, AsymmetricObjectProperty, and DisjointObjectProperties.
  This restriction is necessary in order to guarantee decidability of the basic reasoning problems for OWL 2 DL [Description Logics].

  Restriction on the Property Hierarchy. A strict partial order (i.e., an irreflexive and transitive relation) < on AllOPE(Ax) exists that fulfills the following conditions:

  OP1 < OP2 if and only if INV(OP1) < OP2 for all object properties OP1 and OP2 occurring in AllOPE(Ax).
  If OPE1 < OPE2 holds, then OPE2 →* OPE1 does not hold;
  Each axiom in Ax of the form SubObjectPropertyOf( ObjectPropertyChain( OPE1 ... OPEn ) OPE ) with n ≥ 2 fulfills the following conditions:
  OPE is equal to owl:topObjectProperty, or
  n = 2 and OPE1 = OPE2 = OPE, or
  OPEi < OPE for each 1 ≤ i ≤ n, or
  OPE1 = OPE and OPEi < OPE for each 2 ≤ i ≤ n, or
  OPEn = OPE and OPEi < OPE for each 1 ≤ i ≤ n-1.
  This restriction is necessary in order to guarantee decidability of the basic reasoning problems for OWL 2 DL [Description Logics].

  The main goal of this restriction is to prevent cyclic definitions involving object subproperty axioms with property chains. Consider the following ontology:

  SubObjectPropertyOf( ObjectPropertyChain( a:hasFather a:hasBrother ) a:hasUncle ) The brother of someone's father is that person's uncle.
  SubObjectPropertyOf( ObjectPropertyChain( a:hasUncle a:hasWife ) a:hasAuntInLaw ) The wife of someone's uncle is that person's aunt-in-law.
  The first axiom defines a:hasUncle in terms of a:hasFather and a:hasBrother, and the second axiom defines a:hasAuntInLaw in terms of a:hasUncle and a:hasWife. The second axiom depends on the first one, but not vice versa; hence, these axioms are not cyclic and can occur together in the axiom closure of an OWL 2 DL ontology. To verify this condition formally, it suffices to find one strict partial order < on object properties such that each property is defined only in terms of the properties that are smaller w.r.t. <. For example, it can be readily verified that the partial order < given below fulfills the above conditions.

  a:hasFather   <   a:hasUncle
  a:hasBrother   <   a:hasUncle
  a:hasUncle   <   a:hasAuntInLaw
  a:hasWife   <   a:hasAuntInLaw

  The first two conditions on < are needed to satisfy the first axiom, while the remaining two conditions on < are needed to satisfy the second axiom from the example OWL 2 DL ontology.

  In contrast to the previous example, the following axioms are cyclic and do not satisfy the restriction on the property hierarchy.

  SubObjectPropertyOf( ObjectPropertyChain( a:hasFather a:hasBrother ) a:hasUncle ) The brother of someone's father is that person's uncle.
  SubObjectPropertyOf( ObjectPropertyChain( a:hasChild a:hasUncle ) a:hasBrother ) The uncle of someone's child is that person's brother.
  The first axiom defines a:hasUncle in terms of a:hasBrother, while the second axiom defines a:hasBrother in terms of a:hasUncle; these two definitions are thus cyclic and cannot occur together in the axiom closure of an OWL 2 DL ontology. To verify this condition formally, note that, for < to satisfy the third subcondition of the third condition, we need a:hasBrother < a:hasUncle (due to the first axiom) and a:hasUncle < a:hasBrother (due to the second axiom); by transitivity of < we then have a:hasUncle < a:hasUncle and a:hasBrother < a:hasBrother; however, this contradicts the requirement that < is irreflexive. Thus, an order < satisfying all the required conditions does not exist.

  A particular kind of cyclic definitions is known not to lead to decidability problems. Consider the following ontology:

  SubObjectPropertyOf( ObjectPropertyChain( a:hasChild a:hasSibling ) a:hasChild ) The sibling of someone's child is that person's child.
  The above definition is cyclic, since the object property a:hasChild occurs in both the subproperty chain and as a superproperty. As per the fourth and the fifth subcondition of the third condition, however, axioms of this form do not violate the restriction on the property hierarchy.

  Restrictions on the Usage of Anonymous Individuals.

  No anonymous individual occurs in Ax in an axiom of type from the following list:
  SameIndividual, DifferentIndividuals, NegativeObjectPropertyAssertion, or NegativeDataPropertyAssertion.
  No anonymous individual occurs in Ax in a class expression of type from the following list:
  ObjectOneOf or ObjectHasValue.
  The anonymous individual graph for Ax is the undirected graph F whose vertices are anonymous individuals occurring in Ax, and that contains an (undirected) edge between each pair of anonymous individuals _:x and _:y for each assertion in Ax of the form ObjectPropertyAssertion( OPE _:x _:y ). Such F is required to satisfy all of the following conditions:
  F is a forest — that is, it should be possible to partition F into zero or more disjoint undirected trees;
  for each pair of anonymous individuals _:x and _:y connected by an edge in F, the set Ax contains at most one assertion of the form ObjectPropertyAssertion( OPE _:x _:y ) or ObjectPropertyAssertion( OPE _:y _:x ); and
  each tree in F contains at least one anonymous individual _:x such that the set Ax contains at most one assertion of the form ObjectPropertyAssertion( OPE _:x a ) or ObjectPropertyAssertion( OPE a _:x ) with a a named individual.
  These restrictions ensure that each OWL 2 DL ontology with anonymous individuals can be transformed to an equivalent ontology without anonymous individuals. Roughly speaking, this is possible if property assertions connect anonymous individuals in a tree-like way. Consider the following ontology:

  ObjectPropertyAssertion( a:hasChild a:Francis _:a1 ) Francis has some (unknown) child.
  ObjectPropertyAssertion( a:hasChild _:a1 a:Meg ) This unknown child has Meg...
  ObjectPropertyAssertion( a:hasChild _:a1 a:Chris ) ...Chris...
  ObjectPropertyAssertion( a:hasChild _:a1 a:Stewie ) ...and Stewie as children.
  The connections between individuals a:Francis, a:Meg, a:Chris, and a:Stewie can be understood as a tree that contains _:a1 as its root. Because of that, the anonymous individuals can be "rolled up"; that is, these four assertions can be replaced by the following equivalent assertion:

  ClassAssertion(
      ObjectSomeValuesFrom( a:hasChild
         ObjectIntersectionOf(
            ObjectHasValue( a:hasChild a:Meg )
            ObjectHasValue( a:hasChild a:Chris )
            ObjectHasValue( a:hasChild a:Stewie )
         )
      )
      a:Francis
  )
  Unlike in the previous example, the following ontology does not satisfy the restrictions on the usage of anonymous individuals:

  ObjectPropertyAssertion( a:hasSibling _:b1 _:b2 )
  ObjectPropertyAssertion( a:hasSibling _:b2 _:b3 )
  ObjectPropertyAssertion( a:hasSibling _:b3 _:b1 )
  The following ontology does not satisfy these restrictions either:

  ObjectPropertyAssertion( a:hasChild _:b1 _:b2 )
  ObjectPropertyAssertion( a:hasDaughter _:b1 _:b2 )
  I
  n both of these examples, the anonymous individuals are connected by property assertions in a non-tree-like way. These assertions can therefore not be replaced with class expressions, which can lead to the undecidability of the basic reasoning problems.
")
