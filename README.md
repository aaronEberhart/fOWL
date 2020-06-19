# FOWL
FIXME: description
## Usage
Functions Currently available in -main:

**File I/O**
|Function Name|args|Description|
|:-|:-:|:-|
|makeOWLFile|filename ontology|writes an owl file of the ontology in functional syntax with the supplied file name|
|readFunctionalFile|file|Reads an OWL file written in functional syntax|
|toString|map|Returns a functional syntax string representation of the map object used to store the OWL object, or the default representation if there is no OWL type contained in the map. Note - this is __*not*__ the same as java toString.|
|toDLString|map|Returns a DL syntax string representation of the map object used to store the OWL object, or the default representation if there is no OWL type contained in the map.|

**Ontology Access**
|Function Name|args|Description|
|:-|:-:|:-|
|emptyOntology|nil|Returns an empty ontology|
|emptyOntologyFile|nil|Returns an empty ontology file|
|getAxioms|ontology|Returns the axioms from an ontology in a lazy sequence|
|getAxiomsNoAnnotations|ontology|Returns the axioms from an ontology without annotations in a lazy sequence|
|getClassAxioms|ontology|Returns the class axioms from an ontology in a lazy sequence|
|getClassAxiomsNoAnnotations|ontology|Returns the class axioms from an ontology without annotations in a lazy sequence|
|getRoleAxioms|ontology|Returns the role axioms from an ontology in a lazy sequence|
|getRoleAxiomsNoAnnotations|ontology|Returns the role axioms from an ontology without annotations in a lazy sequence|
|getDataRoleAxioms|ontology|Returns the data role axioms from an ontology in a lazy sequence|
|getDataRoleAxiomsNoAnnotations|ontology|Returns the data role axioms from an ontology without annotations in a lazy sequence|
|getFacts|ontology|Returns the facts from an ontology in a lazy sequence|
|getFactsNoAnnotations|ontology|Returns the facts from an ontology without annotations in a lazy sequence|
|getPrefixes|ontology|Returns the prefixes from an ontology in a lazy sequence|
|getImports|ontology|Returns the imports from an ontology in a lazy sequence|
|getAnnotations|ontology|Returns the annotations from an ontology in a lazy sequence|
|getOntologyIRI|ontology|Returns the ontology IRI from an ontology|
|getVersionIRI|ontology|Returns the version IRI from an ontology|
|addAxiom|ontology axiom|Adds an axiom to an ontology|
|addPrefix|ontology prefix|Adds a prefix to an ontology|
|addImport|ontology import|Adds an import to an ontology|
|addAnnotation|ontology annotation|Adds an annotation to an ontology|
|dropAxiom|ontology axiom|Drops an axiom from an ontology|
|dropPrefix|ontology prefix|Drops a prefix from an ontology|
|dropImport|ontology import|Drops an import from an ontology|
|dropAnnotation|ontology annotation|Drops an annotation from an ontology|

**Ontology Creation**
|Function Name|args|Description|
|:-|:-:|:-|
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

**Normalization**
|Function Name|args|Description|
|:-|:-:|:-|
|negate|class|| 
|getClassNNF|class|| 
|toClassImplications|classaxiom|| 
|getNNF|axiom|| 

**Expressions**
|Function Name|args|Description|
|:-|:-:|:-|
|-class|iri||
||iri namespace prefix||
|role|iri||
||iri namespace prefix||
|inverseRole|iri||
||iri namespace prefix||
|dataRole|iri||
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

**Axioms**
|Function Name|args|Description|
|:-|:-:|:-|
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

**Facts**
|Function Name|args|Description|
|:-|:-:|:-|
|=individuals|args||
|!=individuals|args||
|classFact|args||
|roleFact|args||
|notRoleFact|args||
|dataRoleFact|args||
|notDataRoleFact|args||

**Annotations**
|Function Name|args|Description|
|:-|:-:|:-|
|annotationRole|iri||
||iri namespace prefix||
|annotationValue|value||
|metaAnnotations|annotations||
|annotation|args||
|annotationSubject|subject||
|axiomAnnotations|annotations||
|annotationDataType|iri||
||iri namespace prefix||

**Components**
|Function Name|args|Description|
|:-|:-:|:-|
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

**SWRL Stuff**
|Function Name|args|Description|
|:-|:-:|:-|
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
