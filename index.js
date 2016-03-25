"use strict";

const REGISTRY_URL = "http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry";

var
  http = require('http'),
  parser = require('./TextToJsonAdapter')
  ;

class IANAParser {

  get registryUrl() {
    return REGISTRY_URL;
  }

  parser() {
    return parser.apply(this, arguments);
  }

  fetchRegistry() {
    return new Promise((resolve, reject) => {
        http
          .get(this.registryUrl, (res) => {
            let body = "";

            res
              .setEncoding("utf8")
              .on('data', (chunk) => (body += chunk))
              .on('end', () => resolve(this.parser(body)))
            ;

          })
          .on('error', (err) => reject(err))
      ;
    });
  }
}

module.exports = new IANAParser();
