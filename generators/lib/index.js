'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'cli', ['name', 'author', 'description']);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('doc.go.ejs'),
      this.destinationPath('doc.go'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('main.go.ejs'),
      this.destinationPath(`cmd/${this.props.name}-sample/main.go`),
      this.props
    );
  }
};
