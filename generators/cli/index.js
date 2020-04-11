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
      this.templatePath('main.go.ejs'),
      this.destinationPath('main.go'),
      this.props
    );
  }

  install() {
    console.log('Initializing vendoring');
    this.spawnCommandSync('go', [
      'mod',
      'init',
      `github.com/${this.props.author}/${this.props.name}`,
    ]);
  }
};
