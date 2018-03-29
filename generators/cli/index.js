'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'cli', ['project_name', 'author', 'description']);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('main.go.ejs'),
      this.destinationPath('main.go'),
      this.props
    );
    this.appendTpl(
      this.templatePath('README.md.ejs'),
      this.destinationPath('README.md'),
      this.props
    );
    this.appendTpl(
      this.templatePath('Makefile.ejs'),
      this.destinationPath('Makefile'),
      this.props
    );
  }

  install() {
    console.log('Initializing vendoring');
    this.spawnCommandSync('dep', ['init']);
  }
};
