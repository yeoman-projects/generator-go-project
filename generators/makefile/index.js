'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'Makefile', ['type', 'name']);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('Makefile.ejs'),
      this.destinationPath('Makefile'),
      this.props
    );
  }
};
