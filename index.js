"use strict";

var fs = require('fs');
var adapter = require('./TextToJsonAdapter');

var data = fs.readFileSync('./data/20160321_language-subtag-registry.txt', 'utf-8');
var result = adapter(data);
console.log(result.list.length);

//result.list.forEach(i => console.log(i));
//console.log(1, result.list);
