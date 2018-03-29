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
      this.templatePath('package.go.ejs'),
      this.destinationPath(this.props.projectName + '.go'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('doc.go.ejs'),
      this.destinationPath('doc.go'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('main.go.ejs'),
      this.destinationPath(`cmd/${this.props.projectName}-sample/main.go`),
      this.props
    );
    this.appendTpl(
      this.templatePath('Makefile.ejs'),
      this.destinationPath(`Makefile`),
      this.props
    );
  }

  install() {
    console.log('Initializing vendoring');
    this.spawnCommandSync('dep', ['init']);
  }
};
