'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'linter', []);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.fs.copy(
      this.templatePath('gometalinter.json'),
      this.destinationPath('.gometalinter.json')
    );
  }
};
