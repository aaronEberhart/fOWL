# ![(f OWL)](https://raw.githubusercontent.com/aaronEberhart/me/master/docs/img/fOWLiconsmall.png)
(f OWL) is a minimalistic functional programming style ontology editor. Ontologies in (f OWL) are implemented as standalone data structures with internalized types: nested maps containing values and collections of additional maps. This homogeneous data structure means that functions for single axioms or expressions usually work identically on any part of an Ontology, or even the entire Ontology itself. The lazy functional style of Clojure also allows for intuitive and simple Ontology modification with a minimal memory footprint.

## Usage
This program was built and tested with [Leiningen](https://leiningen.org/).

(f OWL) can be used by itelf or you can import it into your own project. To run a copy of this repository, simply type code in fowl/core.clj, or your own files, then run the command `lein run` in the terminal. It is also easy to use in the REPL with the terminal command `lein repl`. A list of all OWL ontology functions currently available from fowl/core.clj can be seen by entering `(dir ontology.core)`, and `(doc function)` will show more detail about each function. The [ClojureDoc](https://cljdoc.org/d/onto.aaroneberhart/fowl/0.0.1-SNAPSHOT/doc/readme) is also available if you prefer to see functions in the browser.

Importing (f OWL) from [Clojars](https://clojars.org/onto.aaroneberhart/fowl) as a library into your own project is also extremely easy. Just make sure your project.clj file contains `[onto.aaroneberhart/fowl "0.0.1-SNAPSHOT"]` in the project `:dependencies`, and then add `[ontology.core :as ont]` to the `:require` entry in any file's namespace. Then you can access any of the (f OWL) functions by prefixing them with your alias, in this case `(ont/function args)`.

If you want to load your own ontology the program can read and write Functional Syntax OWL files. More formats are planned in the future.

## Examples
```clojure
;; show the documentation for a function
fowl.core=> (doc fowl/makeOWLFile)
```
```
-------------------------
ontology.functions/makeOWLFile
([ontology filename & fileType])
  Writes an owl file of the ontology with the supplied file name. 
  Optional argument allows choice of file type. No option defaults to functional syntax. 
  (Currently only functional syntax defined)
```
```clojure
;; print some things sequentially
fowl.core=> (doseq [x [(ont/implies (ont/exists "r" "a") "b")
                       (ont/implies (ont/or "b" "c") (ont/not (ont/or "d" "e")))
                       (ont/implies (ont/roleChain "r" (ont/inverseRole "s")) "t")
                       (ont/fact (ont/inverseRole "s") "i" "j")
                       (ont/fact "a" "i")
                       (ont/fact "d" "i" (ont/stringLiteral "l"))
                       (ont/implies (ont/<=exists 4 "r" "c") 
                                    (ont/not (ont/or (ont/and "d" "e") 
                                             (ont/not (ont/and "f" "g")))))
                       (ont/getNNF (ont/implies (ont/<=exists 4 "r" "c") 
                                                (ont/not (ont/or (ont/and "d" "e") 
                                                           (ont/not (ont/and "f" "g"))))))]]
             (println x))
```
```
SubClassOf(ObjectSomeValuesFrom(r a) b)
SubClassOf(ObjectUnionOf(c b) ObjectComplementOf(ObjectUnionOf(d e)))
SubObjectPropertyOf(ObjectPropertyChain(r ObjectInverseOf(s)) t)
ObjectPropertyAssertion(ObjectInverseOf(s) i j)
ClassAssertion(a i)
DataPropertyAssertion(d i "l")
SubClassOf(ObjectMaxCardinality(4 r c) ObjectComplementOf(ObjectUnionOf(ObjectIntersectionOf(d e) ObjectComplementOf(ObjectIntersectionOf(g f)))))
SubClassOf(ObjectMaxCardinality(4 r c) ObjectIntersectionOf(ObjectUnionOf(ObjectComplementOf(e) ObjectComplementOf(d)) ObjectIntersectionOf(g f)))
nil
```
```clojure
;; Use let to store some values to make an ontology
fowl.core=> (let [ontology ont/emptyOntologyFile
                  ontology (ont/setOntologyIRI ontology "http://www.test.stuff")
                  ontology (ont/addAnnotations ontology (ont/annotation "annotations" "are fun"))
                  ontology (ont/addPrefixes ontology (ont/prefix "" "http://www.test.stuff/")
                                            (ont/prefix "" "http://www.overwriting.test.stuff/")
                                            (ont/prefix "prefix" "http://www.prefix.stuff/")) 
                  ontology (ont/addAxioms ontology (ont/implies "a" (ont/IRI "prefix" "b"))
                            (ont/implies (ont/IRI "prefix" "b" "http://prefix.overwrites/this#") "c")
                            (ont/implies "d" "a")
                            (ont/implies (ont/inverseRole "r") "s")
                            (ont/fact "a" "i")
                            (ont/fact "r" "j" "i")
                            (ont/notFact "d" "i" (ont/stringLiteral "l")))]
             ontology)
```
```
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
```
```clojure
;; use threading to accomplish the same task as the let expression
fowl.core=> (-> ont/emptyOntologyFile
           (ont/setOntologyIRI "http://www.test.stuff")
           (ont/addAnnotations (ont/annotation "annotations" "are fun"))
           (ont/addPrefixes (ont/prefix "" "http://www.test.stuff/")
                             (ont/prefix "" "http://www.overwriting.test.stuff/")
                             (ont/prefix "prefix" "http://www.prefix.stuff/")) 
           (ont/addAxioms (ont/implies "a" (ont/IRI "prefix" "b"))
                           (ont/implies (ont/IRI "prefix" "b" "http://prefix.overwrites/this#") "c")
                           (ont/implies "d" "a")
                           (ont/implies (ont/inverseRole "r") "s")
                           (ont/fact "a" "i")
                           (ont/fact "r" "j" "i")
                           (ont/notFact "d" "i" (ont/stringLiteral "l"))))
```
```
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
```
```clojure
;; Use a tail-recursive loop to add every third axiom from the vector to the set
fowl.core=> (loop [counter 0
              axiomSet #{}
              axioms [(ont/implies (ont/exists "r" "a") "b")
                      (ont/implies (ont/or "b" "c") (ont/not (ont/or "d" "e")))
                      (ont/implies (ont/roleChain "r" (ont/inverseRole "s")) "t")
                      (ont/fact (ont/inverseRole "s") "i" "j")
                      (ont/fact "a" "i")
                      (ont/fact "d" "i" (ont/stringLiteral "l"))
                      (ont/implies (ont/roleChain "s" "q") "t")]]
        (if (empty? axioms)
         axiomSet
         (recur (inc counter) (if (= 0 (mod counter 3)) (conj axiomSet (first axioms)) axiomSet) (rest axioms))))
```
```
#{ObjectPropertyAssertion(ObjectInverseOf(s) i j) 
  SubClassOf(ObjectSomeValuesFrom(r a) b)
  SubObjectPropertyOf(ObjectPropertyChain(s q) t)}
```

## License
GNU General Public License v3.0
