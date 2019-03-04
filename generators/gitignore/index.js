'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'gitignore', ['boilerplate']);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('gitignore.ejs'),
      this.destinationPath('.gitignore'),
      this.props
    );
  }
};
