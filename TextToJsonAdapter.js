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
    .map(i => i.split('\n'))
    .map(i => i.filter(j => !!j))
    ;

  let headings = data
    .shift()
    .filter(i => !!i)
    .map(i => (i || '').trim().split(':'))
    .shift()
    ;

  headings = {
    key: headings.shift().trim(),
    value: new Date(...headings.shift().trim().split('-'))
  };

  var list = data
    .map(i => i.map(j => {
      let z = j.split(":");
      let key = (z.shift() || '').trim();
      let value = (z.pop() || '').trim();

      return {
         [key] : value
      };
    }))
    ;

  return {
    [headings.key]: headings.value,
    list
  };
}
