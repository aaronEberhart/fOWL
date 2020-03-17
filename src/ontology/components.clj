(ns ontology.components
	(:import (org.eclipse.rdf4j.model.vocabulary OWL RDFS)
					 (org.semanticweb.owlapi.model IRI OWLAnnotation OWLAxiom OWLClass OWLOntology
						 OWLAsymmetricObjectPropertyAxiom OWLClassExpression OWLDataExactCardinality
						 OWLDataPropertyDomainAxiom OWLDataPropertyExpression OWLDataPropertyRangeAxiom
						 OWLDatatype OWLDisjointDataPropertiesAxiom OWLDisjointObjectPropertiesAxiom
						 OWLObjectAllValuesFrom OWLObjectExactCardinality OWLObjectIntersectionOf
						 OWLObjectMaxCardinality OWLObjectMinCardinality OWLObjectPropertyDomainAxiom
						 OWLObjectPropertyExpression OWLObjectSomeValuesFrom OWLObjectUnionOf OWLObjectOneOf
						 OWLPropertyAxiom OWLSubClassOfAxiom OWLSubDataPropertyOfAxiom OWLSubObjectPropertyOfAxiom
						 OWLSubPropertyChainOfAxiom OWLEquivalentClassesAxiom OWLDisjointClassesAxiom
						 OWLDisjointUnionAxiom OWLEquivalentObjectPropertiesAxiom OWLEquivalentDataPropertiesAxiom
						 OWLInverseObjectPropertiesAxiom OWLReflexiveObjectPropertyAxiom OWLIrreflexiveObjectPropertyAxiom
						 OWLSymmetricObjectPropertyAxiom OWLFunctionalObjectPropertyAxiom OWLFunctionalDataPropertyAxiom
						 OWLInverseFunctionalObjectPropertyAxiom OWLTransitiveObjectPropertyAxiom OWLObjectPropertyRangeAxiom)
(uk.ac.manchester.cs.owl.owlapi OWLClassImpl OWLDataAllValuesFromImpl OWLDataMaxCardinalityImpl
						OWLDataSomeValuesFromImpl OWLDatatypeImpl OWLObjectAllValuesFromImpl OWLObjectHasSelfImpl
						OWLObjectMaxCardinalityImpl OWLObjectSomeValuesFromImpl OWLSubClassOfAxiomImpl
						OWLSubObjectPropertyOfAxiomImpl OWLSubPropertyChainAxiomImpl))
)

(def owlThing (OWLClassImpl. (IRI/create (str (OWL/THING)))))
(def owlNothing (OWLClassImpl. (IRI/create (str (OWL/NOTHING)))))
(def rdfsLiteral (OWLDatatypeImpl. (IRI/create (str (RDFS/LITERAL)))))
