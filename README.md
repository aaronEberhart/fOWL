# FOWL
FIXME: description

## Usage
This program requires Leiningen. To run a program, simply type code in main or your own files, then run the command


lein run

in the terminal. It is also easy to use in the REPL by running lein repl. A list of OWL functions currently available in main can be seen by running (dir ontology.IO). More detail on each function can be obtained by entering (doc _function name_).

## Examples
```
;show the documentation for a function
main=> (doc makeOWLFile)

;output
-------------------------
ontology.IO/makeOWLFile
([filename ontology])
  Writes an owl file of the ontology in functional syntax with the supplied file name
  

;do some things sequentially without side-effects
main=> (doseq [x [(classImplication (existential "r" "a") "b")
	    (classImplication (-or "b" "c") (-not (-or "d" "e")))
	    (roleImplication (roleChain "r" (inverseRole "s")) "t")
	    (roleFact (inverseRole "s") "i" "j")
	    (classFact "a" "i")
	    (dataRoleFact "D" "i" (stringLiteral "l"))
	    (classImplication (<=role 4 "r" "c") (-not (-or (-and "d" "e") (-not (-and "f" "g")))))
	    (getNNF (classImplication (<=role 4 "r" "c") (-not (-or (-and "d" "e") (-not (-and "f" "g"))))))
	    (let [ont emptyOntology
		  ont (setOntologyIRI ont "<http://www.test.stuff>")
		  ont (addPrefix ont (prefix ":" "<http://www.test.stuff>"))
		  ont (addAxioms ont #{(classImplication ":a" ":b")(classImplication ":b" ":c")(classImplication ":d" ":a")})
		  _ (makeOWLFile "test.owl" ont)]
	    "Ontology Saved")]]
        (println x))

;output
SubClassOf(ObjectSomeValuesFrom(r a) b)
SubClassOf(ObjectUnionOf(b c) ObjectComplementOf(ObjectUnionOf(e d)))
SubObjectPropertyOf(ObjectPropertyChain(r ObjectInverseOf(s)) t)
ObjectPropertyAssertion(ObjectInverseOf(s) i j)
ClassAssertion(a i)
DataPropertyAssertion(D i l)
SubClassOf(ObjectMaxCardinality(4 r c) ObjectComplementOf(ObjectUnionOf(ObjectIntersectionOf(e d) ObjectComplementOf(ObjectIntersectionOf(g f)))))
SubClassOf(ObjectMaxCardinality(4 r c) ObjectIntersectionOf(ObjectUnionOf(ObjectComplementOf(d) ObjectComplementOf(e)) ObjectIntersectionOf(g f)))
Ontology Saved
```

## License
FREE
