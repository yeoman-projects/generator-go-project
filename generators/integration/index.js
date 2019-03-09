'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'integration', [
      'project_name',
      'author',
      'description',
      'boilerplate'
    ]);
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
    this.fs.copy(
      this.templatePath('golangci.yml'),
      this.destinationPath('.golangci.yml')
    );
    if (this.props.boilerplate === 'CLI') {
      this.fs.copyTpl(
        this.templatePath('goreleaser.yml.ejs'),
        this.destinationPath('.goreleaser.yml'),
        this.props
      );
    }
  }
};
