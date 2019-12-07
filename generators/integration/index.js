'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'integration', [
      'project_name',
      'author',
      'description',
      'project_type'
    ]);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.fs.copy(
      this.templatePath('github/workflows/review.yml'),
      this.destinationPath('.github/workflows/review.yml')
    );
    this.fs.copy(
      this.templatePath('github/workflows/test.yml'),
      this.destinationPath('.github/workflows/test.yml')
    );
    this.fs.copy(
      this.templatePath('golangci.yml'),
      this.destinationPath('.golangci.yml')
    );
    if (this.props.project_type === 'CLI') {
      this.fs.copy(
        this.templatePath('github/workflows/deploy.yml'),
        this.destinationPath('.github/workflows/deploy.yml')
      );
      this.fs.copyTpl(
        this.templatePath('goreleaser.yml.ejs'),
        this.destinationPath('.goreleaser.yml'),
        this.props
      );
    }
  }
};
