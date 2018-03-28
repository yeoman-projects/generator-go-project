'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'readme', ['project_name', 'author', 'description']);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('README.md.ejs'),
      this.destinationPath('README.md'),
      this.props
    );
  }
};
