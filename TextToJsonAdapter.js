"use strict";
/**
 *
 * @param {*} text
 * @returns {JSON}
 */
module.exports = textToJsonAdapter;

var toCamelCase = require('camelcase');
const LANGUAGE_SEPARATOR = /\s%%\s/;
const LB_REGEX = /\n/gi;
const COLON_REGEX = /:\s|\s/gi;

function textToJsonAdapter(text) {
  let body = text
    .split(LANGUAGE_SEPARATOR)
    .map(i => {
      let res = {};

      i.split(LB_REGEX).forEach(j => {
        let item = j.split(COLON_REGEX);
        let key = toCamelCase(item.shift().toLowerCase());
        let value = item.pop()

        res[key] = value;
      });

      return res;
    })
    ;


  let header = [body.shift()];



  return {header, body};
}
