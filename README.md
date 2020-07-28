# (f OWL)
(f OWL) is a minimalistic functional programming style ontology editor. Ontologies in (f OWL) are implemented as standalone data structures with internalized types: nested maps containing values and collections of additional maps. This homogeneous data structure means that functions for single axioms or expressions usually work identically on any part of an Ontology, or even the entire Ontology itself. The lazy functional style of Clojure also allows for intuitive and simple Ontology modification with a minimal memory footprint.

## Usage
This program was built and tested with [Leiningen](https://leiningen.org/).

(f OWL) can be used by itelf or you can import it into your own project. To run a copy of this repository, simply type code in fowl.clj, or your own files, then run the command `lein run` in the terminal. It is also easy to use in the REPL with the terminal command `lein repl`. A list of all OWL functions currently available from fowl.clj can be seen by entering `(dir ontology.functions)`, and `(doc function)` will show more detail about each function. The [ClojureDoc](https://cljdoc.org/d/onto.aaroneberhart/fowl/0.0.1-SNAPSHOT/doc/readme) is also available if you prefer to see functions in the browser.

Importing (f OWL) from [Clojars](https://clojars.org/onto.aaroneberhart/fowl) as a library into your own project is also extremely easy. Just make sure your project.clj file contains `[onto.aaroneberhart/fowl "0.0.1-SNAPSHOT"]` in the project `:dependencies`, and then add `[ontology.functions :as fowl]` to the `:require` entry in any file's namespace. Then you can access any of the (f OWL) functions by prefixing them with your alias, in this case `(fowl/function args)`.

If you want to load your own ontology the program can read and write Functional Syntax OWL files. More formats are planned in the future.

## Examples
```clojure
;; show the documentation for a function
fowl=> (doc fowl/makeOWLFile)

-------------------------
ontology.functions/makeOWLFile
([ontology filename & fileType])
  Writes an owl file of the ontology with the supplied file name. 
  Optional argument allows choice of file type. No option defaults to functional syntax. 
  (Currently only functional syntax defined)

;; print some things sequentially
fowl=> (doseq [x [(fowl/implies (fowl/exists "r" "a") "b")
                  (fowl/implies (fowl/or "b" "c") (fowl/not (fowl/or "d" "e")))
                  (fowl/implies (fowl/roleChain "r" (fowl/inverseRole "s")) "t")
                  (fowl/fact (fowl/inverseRole "s") "i" "j")
                  (fowl/fact "a" "i")
                  (fowl/fact "d" "i" (fowl/stringLiteral "l"))
                  (fowl/implies (fowl/<=exists 4 "r" "c") 
                                (fowl/not (fowl/or (fowl/and "d" "e") 
                                          (fowl/not (fowl/and "f" "g")))))
                  (fowl/getNNF (fowl/implies (fowl/<=exists 4 "r" "c") 
                                             (fowl/not (fowl/or (fowl/and "d" "e") 
                                                       (fowl/not (fowl/and "f" "g"))))))]]
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
fowl=> (let [ont fowl/emptyOntologyFile
             ont (fowl/setOntologyIRI ont "http://www.test.stuff")
             ont (fowl/addAnnotations ont (fowl/annotation "annotations" "are fun"))
             ont (fowl/addPrefixes ont (fowl/prefix "" "http://www.test.stuff/")
                                       (fowl/prefix "" "http://www.overwriting.test.stuff/")
                                       (fowl/prefix "prefix" "http://www.prefix.stuff/")) 
             ont (fowl/addAxioms ont (fowl/implies "a" (fowl/IRI "prefix" "b"))
                                     (fowl/implies (fowl/IRI "prefix" "b" "http://prefix.overwrites/this#") "c")
                                     (fowl/implies "d" "a")
                                     (fowl/implies (fowl/inverseRole "r") "s")
                                     (fowl/fact "a" "i")
                                     (fowl/fact "r" "j" "i")
                                     (fowl/notFact "d" "i" (fowl/stringLiteral "l")))]
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
fowl=> (-> fowl/emptyOntologyFile
           (fowl/setOntologyIRI "http://www.test.stuff")
           (fowl/addAnnotations (fowl/annotation "annotations" "are fun"))
           (fowl/addPrefixes (fowl/prefix "" "http://www.test.stuff/")
                             (fowl/prefix "" "http://www.overwriting.test.stuff/")
                             (fowl/prefix "prefix" "http://www.prefix.stuff/")) 
           (fowl/addAxioms (fowl/implies "a" (fowl/IRI "prefix" "b"))
                           (fowl/implies (fowl/IRI "prefix" "b" "http://prefix.overwrites/this#") "c")
                           (fowl/implies "d" "a")
                           (fowl/implies (fowl/inverseRole "r") "s")
                           (fowl/fact "a" "i")
                           (fowl/fact "r" "j" "i")
                           (fowl/notFact "d" "i" (fowl/stringLiteral "l"))))

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
fowl=> (loop [counter 0
              axiomSet #{}
              axioms [(fowl/implies (fowl/exists "r" "a") "b")
                      (fowl/implies (fowl/or "b" "c") (fowl/not (fowl/or "d" "e")))
                      (fowl/implies (fowl/roleChain "r" (fowl/inverseRole "s")) "t")
                      (fowl/fact (fowl/inverseRole "s") "i" "j")
                      (fowl/fact "a" "i")
                      (fowl/fact "d" "i" (fowl/stringLiteral "l"))
                      (fowl/implies (fowl/roleChain "s" "q") "t")]]
        (if (empty? axioms)
         axiomSet
         (recur (inc counter) (if (= 0 (mod counter 3)) (conj axiomSet (first axioms)) axiomSet) (rest axioms))))

#{ObjectPropertyAssertion(ObjectInverseOf(s) i j) 
  SubClassOf(ObjectSomeValuesFrom(r a) b)
  SubObjectPropertyOf(ObjectPropertyChain(s q) t)}
```

## License
GNU General Public License v3.0
