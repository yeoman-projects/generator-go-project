'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'Makefile', ['project_type', 'project_name']);
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
