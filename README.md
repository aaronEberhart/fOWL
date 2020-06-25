# FOWL
FIXME: Make good description

## Usage
This program requires [Leiningen](https://leiningen.org/). If you want to load your own ontology the program can read and write Functional Syntax OWL files, more formats are planned in the future.

To run a program, simply type code in main, or your own files, then run the command `lein run` in the terminal. It is also easy to use in the REPL with the terminal command `lein repl`. A list of OWL functions currently available in main can be seen by entering `(dir ontology.IO)`, and `(doc function_name)` will show more detail about each function.

## Examples
```
;show the documentation for a function
main=> (doc makeOWLFile)

;output
-------------------------
ontology.IO/makeOWLFile
([ontology filename])
  Writes an owl file of the ontology in functional syntax with the supplied file name
  

;do some things sequentially
main=> (doseq [x [(classImplication (existential "r" "a") "b")
                  (classImplication (-or "b" "c") (-not (-or "d" "e")))
                  (roleImplication (roleChain "r" (inverseRole "s")) "t")
                  (roleFact (inverseRole "s") "i" "j")
                  (classFact "a" "i")
                  (dataRoleFact "d" "i" (stringLiteral "l"))
                  (classImplication (<=role 4 "r" "c") (-not (-or (-and "d" "e") (-not (-and "f" "g")))))
                  (getNNF (classImplication (<=role 4 "r" "c") (-not (-or (-and "d" "e") (-not (-and "f" "g"))))))
                  ;Use let to store some values and write a file
                  (let [ont emptyOntologyFile
                        ont (setOntologyIRI ont "<http://www.test.stuff>")
                        ont (addPrefixes ont (prefix "" "<http://www.test.stuff/>")(prefix "" "<http://www.overwriting.test.stuff/>")(prefix "prefix" "<http://www.prefix.stuff/>")) 
                        ont (addAxioms ont (classImplication "a" (IRI "prefix" "b"))(classImplication (IRI "prefix" "b" "http://www.namespace/") "c")(classImplication "d" "a")))]
                  (makeOWLFile ont "test.owl"))]]
       (println x))

;output
SubClassOf(ObjectSomeValuesFrom(r a) b)
SubClassOf(ObjectUnionOf(c b) ObjectComplementOf(ObjectUnionOf(d e)))
SubObjectPropertyOf(ObjectPropertyChain(r ObjectInverseOf(s)) t)
ObjectPropertyAssertion(ObjectInverseOf(s) i j)
ClassAssertion(a i)
DataPropertyAssertion(d i l)
SubClassOf(ObjectMaxCardinality(4 r c) ObjectComplementOf(ObjectUnionOf(ObjectIntersectionOf(d e) ObjectComplementOf(ObjectIntersectionOf(g f)))))
SubClassOf(ObjectMaxCardinality(4 r c) ObjectIntersectionOf(ObjectUnionOf(ObjectComplementOf(e) ObjectComplementOf(d)) ObjectIntersectionOf(g f)))
nil

;use threading to accomplish the same task as the let expression
main=> (-> emptyOntologyFile
          (setOntologyIRI "<http://www.test.stuff>")
          (addAnnotations (annotation "annotations" "are fun"))
          (addPrefixes (prefix "" "<http://www.test.stuff/>")(prefix "" "<http://www.overwriting.test.stuff/>")(prefix "prefix" "<http://www.prefix.stuff/>"))
          (addAxioms (classImplication "a" (IRI "prefix" "b"))(classImplication (IRI "prefix" "b" "http://www.namespace/") "c")(classImplication "d" "a"))
          (makeOWLFile "test.owl")
          println)

;output
nil
```

## License
FREE
