# FOWL
FIXME: description
## Usage
Functions Currently available in -main:
|Function Name|args|Description|
|:---:|:-:|:--------:|
|*File I/O*|||
|makeOWLFile|filename ontology||
||filename prefixes ontologyIRI versionIRI imports annotations axioms||
|readFunctionalFile|file||
|toString|map||
|toDLString|map||
|Ontology Access|||
|emptyOntology|nil||
|getAxioms|ontology||
|getAxiomsNoAnnotations|ontology||
|getClassAxioms|ontology||
|getClassAxiomsNoAnnotations|ontology||
|getRoleAxioms|ontology||
|getRoleAxiomsNoAnnotations|ontology||
|getDataRoleAxioms|ontology||
|getDataRoleAxiomsNoAnnotations|ontology||
|getFacts|ontology||
|getFactsNoAnnotations|ontology||
|getPrefixes|ontology||
|getImports|ontology||
|getAnnotations|ontology||
|getOntologyIRI|ontology||
|getVersionIRI|ontology||
|addAxiom|ontology axiom||
|addPrefix|ontology prefix||
|addImport|ontology import||
|addAnnotation|ontology annotation||
|dropAxiom|ontology axiom||
|dropPrefix|ontology prefix||
|dropImport|ontology import||
|dropAnnotation|ontology annotation||
|Ontology Creation|||
|prefix|prefixName longIRI|| 
|prefixes|prefixes|| 
|ontology|nil|emptyOntology|
||directImports ontologyAnnotations axioms||
||ontologyIRI directImports ontologyAnnotations axioms||
||ontologyIRI versionIRI directImports ontologyAnnotations axioms||
|ontologyIRI|iri|| 
|versionIRI|iri|| 
|directImports|imports|| 
|directImport|iri|| 
|ontologyAnnotations|annotations|| 
|axioms|axioms|| 
|ontologyFile|ontology||
||prefixes ontology||
|Expressions|||
|negate|class|| 
|getClassNNF|class|| 
|toClassImplications|classaxiom|| 
|getNNF|axiom|| 
||||
|-class|iri||
||iri namespace prefix||
|-and|class1 class2||
||class1 class2 classes||
|-or|class1 class2||
||class1 class2 classes||
|-not|c||
|nominal|individual||
||individual individuals||
|existential|r c||
|universal|r c||
|partialRole|r i||
|Self|iri||
||iri namespace prefix||
|>=role|nat r||
||nat r c||
|<=role|nat r||
||nat r c||
|=role|nat r||
||nat r c||
|dataExistential|dataRoles dataRange||
|dataUniversal|dataRoles dataRange||
|>=dataRole|nat dr||
||nat dr dataRange||
|<=dataRole|nat dr||
||nat dr dataRange||
|=dataRole|nat dr||
||nat dr dataRange||
|partialDataRole|dr literal||
|Axioms|||
|declaration|args||
|classImplication|args||
|=Classes|args||
|disjClasses|args||
|disjOr|args||
|roleChain|role1 role2||
||role1 role2 roles||
|roleImplication|args||
|=Roles|args||
|disjRoles|args||
|roleDomain|args||
|roleRange|args||
|inverseRoles|args||
|functionalRole|args||
|functionalInverseRole|args||
|reflexiveRole|args||
|irreflexiveRole|args||
|symmetricRole|args||
|asymmetricRole|args||
|transitiveRole|args||
|dataRoleImplication|args||
|=DataRoles|args||
|disjDataRoles|args||
|dataRoleDomain|args||
|dataRoleRange|args||
|functionalDataRole|args||
|hasKey|args||
|dataTypeDefinition|args||
|annotationFact|args||
|annotationImplication|args||
|annotationDomain|args||
|annotationRange|args||
|Facts|||
|=individuals|args||
|!=individuals|args||
|classFact|args||
|roleFact|args||
|notRoleFact|args||
|dataRoleFact|args||
|notDataRoleFact|args||
|Annotations|||
|annotationRole|iri||
||iri namespace prefix||
|annotationValue|value||
|metaAnnotations|annotations||
|annotation|args||
|annotationSubject|subject||
|axiomAnnotations|annotations||
|annotationDataType|iri||
||iri namespace prefix||
|Components|||
|IRI|iri||
||iri namespace prefix||
|className|iri||
||iri namespace prefix||
|roleName|iri||
||iri namespace prefix||
|inverseRoleName|iri||
||iri namespace prefix||
|dataRoleName|iri||
||iri namespace prefix||
|individual|iri||
||iri namespace prefix||
|typedLiteral|lexicalForm datatype||
|stringLiteralNoLanguage|string||
|stringLiteralWithLanguage|string lang||
|restrictedValue|facet restriction||
|dataType|iri||
||iri namespace prefix||
|dataRange|dr||
|dataAnd|datarange1 datarange2||
||datarange1 datarange2 dataranges||
|dataOr|datarange1 datarange2||
||datarange1 datarange2 dataranges||
|dataNot|datarange||
|dataOneOf|literal||
||literal literals||
|datatypeRestriction|args||
|entity|thing||
|role|iri||
||iri namespace prefix||
|inverseRole|iri||
||iri namespace prefix||
|dataRole|iri||
||iri namespace prefix||
|SWRL Stuff|||
|dlSafeRule|args||
|body|atoms||
|head|atoms|| 
|iArg|arg|| 
|dArg|arg|| 
|variable|iri|| 
|classAtom|class iarg|| 
|dataRangeAtom|dataRange darg|| 
|roleAtom|role iarg1 iarg2|| 
|dataRoleAtom|dataRole iarg darg|| 
|builtInAtom|iri dargs|| 
|=individualsAtom|iarg1 iarg2|| 
|!=individualsAtom|iarg1 iarg2||

## Examples
...
## License
FREE
