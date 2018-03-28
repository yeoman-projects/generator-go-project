'use strict';

const ejs = require('ejs');

module.exports = function(template, destination, data, gen) {
  const done = gen.async();
  ejs.renderFile(gen.templatePath(template), data, null, (err, rendered) => {
    if (err) {
      done(err);
    } else {
      gen.fs.append(gen.destinationPath(destination), rendered);
      done();
    }
  });
};
