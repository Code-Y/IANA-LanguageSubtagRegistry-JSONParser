# IANA-LanguageSubtagRegistry-JSONParser
A parser that converts the iana language subtag registry to JSON

# Getting Started

```shell
$ npm install [--save[-dev]] iana-languagesubtagregistry-jsonparser
```
# Working Example

```javascript
var IANAParser = require("iana-languagesubtagregistry-jsonparser");

IANAParser
  .fetchRegistry()
  .then(data => console.log("IANA Language Subtag Registry", data))
;
```

# Model
{
  headers: "Object",
  body: "Object"
}
