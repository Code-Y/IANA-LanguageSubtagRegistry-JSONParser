"use strict";
/**
 *
 * @param {*} text
 * @returns {JSON}
 */
module.exports = textToJsonAdapter;

const LANGUAGE_SEPARATOR = "%%";
function textToJsonAdapter(text) {
  let data = text
    .split(LANGUAGE_SEPARATOR)
    .map(i => i.split(/\n ?/))
    .map(i => i.filter(j => !!j))
    ;

  let headings = data
    .shift()
    .filter(i => !!i)
    .map(i => (i || '').trim().split(/: ?/))
    .shift()
    ;

  headings = [
    {
      key: headings.shift().trim().toLowerCase(),
      value: new Date(...headings.shift().trim().split(/- ?/))
    }
  ];

  var list = [];
  for(var z = 0; z < data.length; z++) {
    list[z] = {};
    for(var x = 0; x < data[z].length; x++) {
      var obj = data[z][x].split(/: ?/);
      list[z][obj[0].toLowerCase()] = obj[1];
    }
  }

  return {
    meta: headings,
    list
  };
}
