'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'goreleaser', ['project_name', 'author', 'description']);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('goreleaser.yml.ejs'),
      this.destinationPath('goreleaser.yml'),
      this.props
    );
  }
};
