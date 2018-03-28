'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'circleci', ['project_name', 'author']);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('circleci.yml.ejs'),
      this.destinationPath('.circleci/config.yml'),
      this.props
    );
  }
};
