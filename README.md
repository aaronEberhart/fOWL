# (f OWL)
(f OWL) is a minimalistic functional programming style ontology editor. Ontologies in (f OWL) are implemented as standalone data structures with internalized types: nested maps containing values and collections of additional maps. (f OWL)'s homogeneous Ontology data structure means that functions for single axioms or expressions will often work identically on an entire ontology. The lazy functional style of Clojure also allows for intuitive and simple Ontology modification with a minimal memory footprint.

## Usage
This program was built with [Leiningen](https://leiningen.org/). If you want to load your own ontology the program can read and write Functional Syntax OWL files, more formats are planned in the future.

To run a program, simply type code in main, or your own files, then run the command `lein run` in the terminal. It is also easy to use in the REPL with the terminal command `lein repl`. A list of OWL functions currently available in main can be seen by entering `(dir ontology.functions)`, and `(doc function)` will show more detail about each function.

## Examples
```
;; show the documentation for a function
main=> (doc makeOWLFile)

-------------------------
ontology.functions/makeOWLFile
([ontology filename])
  Writes an owl file of the ontology in functional syntax with the supplied file name

;; print some things sequentially
main=> (doseq [x [(implies (exists "r" "a") "b")
                  (implies (-or "b" "c") (-not (-or "d" "e")))
                  (implies (roleChain "r" (inverseRole "s")) "t")
                  (fact (inverseRole "s") "i" "j")
                  (fact "a" "i")
                  (fact "d" "i" (stringLiteral "l"))
                  (implies (<=exists 4 "r" "c") 
                           (-not (-or (-and "d" "e") 
                                      (-not (-and "f" "g")))))
                  (getNNF (implies (<=exists 4 "r" "c") 
                                   (-not (-or (-and "d" "e") 
                                              (-not (-and "f" "g"))))))]]
        (println x))

SubClassOf(ObjectSomeValuesFrom(r a) b)
SubClassOf(ObjectUnionOf(c b) ObjectComplementOf(ObjectUnionOf(d e)))
SubObjectPropertyOf(ObjectPropertyChain(r ObjectInverseOf(s)) t)
ObjectPropertyAssertion(ObjectInverseOf(s) i j)
ClassAssertion(a i)
DataPropertyAssertion(d i "l")
SubClassOf(ObjectMaxCardinality(4 r c) ObjectComplementOf(ObjectUnionOf(ObjectIntersectionOf(d e) ObjectComplementOf(ObjectIntersectionOf(g f)))))
SubClassOf(ObjectMaxCardinality(4 r c) ObjectIntersectionOf(ObjectUnionOf(ObjectComplementOf(e) ObjectComplementOf(d)) ObjectIntersectionOf(g f)))
nil

;; Use let to store some values to make an ontology
main=> (let [ont emptyOntologyFile
             ont (setOntologyIRI ont "http://www.test.stuff")
             ont (addAnnotations ont (annotation "annotations" "are fun"))
             ont (addPrefixes ont (prefix "" "http://www.test.stuff/")
                                  (prefix "" "http://www.overwriting.test.stuff/")
                                  (prefix "prefix" "http://www.prefix.stuff/")) 
             ont (addAxioms ont (implies "a" (IRI "prefix" "b"))
                                (implies (IRI "prefix" "b" "http://prefix.overwrites/this#") "c")
                                (implies "d" "a")
                                (implies (inverseRole "r") "s")
                                (fact "a" "i")
                                (fact "r" "j" "i")
                                (notFact "d" "i" (stringLiteral "l")))]
        ont)

Prefix(:=<http://www.overwriting.test/stuff#>)
Prefix(rdf:=<http://www.w3.org/1999/02/22-rdf-syntax-ns#>)
Prefix(rdfs:=<http://www.w3.org/2000/01/rdf-schema#>)
Prefix(prefix:=<http://www.prefix.stuff/>)
Prefix(xsd:=<http://www.w3.org/2001/XMLSchema#>)
Prefix(owl:=<http://www.w3.org/2002/07/owl#>)

Ontology(<http://www.test.stuff>

Annotation(:annotations "are fun")

NegativeDataPropertyAssertion(:d :i "l")
ClassAssertion(:a :i)
ObjectPropertyAssertion(:r :j :i)
SubClassOf(:d :a)
SubObjectPropertyOf(ObjectInverseOf(:r) :s)
SubClassOf(:a prefix:b)
SubClassOf(prefix:b :c)
)

;; use threading to accomplish the same task as the let expression
main=> (-> emptyOntologyFile
          (setOntologyIRI "http://www.test.stuff")
          (addAnnotations (annotation "annotations" "are fun"))
          (addPrefixes (prefix "" "http://www.test.stuff/")
                       (prefix "" "http://www.overwriting.test/stuff#")
                       (prefix "prefix" "http://www.prefix.stuff/"))
          (addAxioms (implies "a" (IRI "prefix" "b"))
                     (implies (IRI "prefix" "b" "http://prefix.overwrites/this#") "c")
                     (implies "d" "a")
                     (implies (inverseRole "r") "s")
                     (fact "a" "i")
                     (fact "r" "j" "i")
                     (notFact "d" "i" (stringLiteral "l"))))

Prefix(:=<http://www.overwriting.test/stuff#>)
Prefix(rdf:=<http://www.w3.org/1999/02/22-rdf-syntax-ns#>)
Prefix(rdfs:=<http://www.w3.org/2000/01/rdf-schema#>)
Prefix(prefix:=<http://www.prefix.stuff/>)
Prefix(xsd:=<http://www.w3.org/2001/XMLSchema#>)
Prefix(owl:=<http://www.w3.org/2002/07/owl#>)

Ontology(<http://www.test.stuff>

Annotation(:annotations "are fun")

NegativeDataPropertyAssertion(:d :i "l")
ClassAssertion(:a :i)
ObjectPropertyAssertion(:r :j :i)
SubClassOf(:d :a)
SubObjectPropertyOf(ObjectInverseOf(:r) :s)
SubClassOf(:a prefix:b)
SubClassOf(prefix:b :c)
)

;; Use a tail-recursive loop to add every third axiom from the vector to the set
main=> (loop [counter 0
              axiomSet #{}
              axioms [(implies (exists "r" "a") "b")
                      (implies (-or "b" "c") (-not (-or "d" "e")))
                      (implies (roleChain "r" (inverseRole "s")) "t")
                      (fact (inverseRole "s") "i" "j")
                      (fact "a" "i")
                      (fact "d" "i" (stringLiteral "l"))
                      (implies (roleChain "s" "q") "t")]]
        (if (empty? axioms)
         axiomSet
         (recur (inc counter) (if (= 0 (mod counter 3)) (conj axiomSet (first axioms)) axiomSet) (rest axioms))))

#{ObjectPropertyAssertion(ObjectInverseOf(s) i j) 
  SubClassOf(ObjectSomeValuesFrom(r a) b)
  SubObjectPropertyOf(ObjectPropertyChain(s q) t)}
```

## License
Don't copy this and say you wrote it.
