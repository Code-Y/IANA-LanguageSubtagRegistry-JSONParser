"use strict";
/**
 *
 * @param {*} text
 * @returns {JSON}
 */
module.exports = textToJsonAdapter;

const LANGUAGE_SEPARATOR = /\s%%\s/;
const LB_REGEX = /\n/gi;
const COLON_REGEX = /:\s|\s/gi;
var isRawDate = v => /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/.test(v);
var toCamelCase = (input) => {
  return input
    .toLowerCase()
    .split("-")
    .map((word, index) => {

    if(!index) {
      return word;
    }

    return word.charAt(0).toUpperCase() + word.substr(1);
  })
    .join('');
};


function textToJsonAdapter(text) {
  let body = text
    .split(LANGUAGE_SEPARATOR)
    .map(i => {
      let res = {};

      i.split(LB_REGEX).forEach(j => {
        let item = j.split(COLON_REGEX);
        let key = toCamelCase(item.shift());
        let value = item.pop();

        if(isRawDate(value)) {
          let date = value
            .split('-')
            .map((item, index) => {
              item = Number(item);

              switch(index) {

                case 1:
                  --item;
                  break;
              }

              return item;
            });
            
          value = new Date(
            Date.UTC(date[0], date[1], date[2])
          );
        }

        res[key] = value;
      });

      return res;
    })
    ;

  let header = [body.shift()];


  return {header, body};
}
