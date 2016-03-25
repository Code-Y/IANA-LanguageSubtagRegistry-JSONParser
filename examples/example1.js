var fs = require('fs');
var IANAParser = require('../index');

IANAParser
  .fetchRegistry()
  .then(result => JSON.stringify(result, null, 2))
  .then((data) => {
    return fs.writeFileSync(
      `./dist/result.json`,
      data,
      {encoding: 'utf-8'}
    );
  })
;
