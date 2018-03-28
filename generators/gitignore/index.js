'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'gitignore', []);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
  }
};
