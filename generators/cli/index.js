'use strict';

const Generator = require('../../lib/prompt_generator.js');
const appendTpl = require('../../lib/append_tpl.js');

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
    appendTpl('README.md.ejs', 'README.md', this.props, this);
    appendTpl('Makefile.ejs', 'Makefile', this.props, this);
  }

  install() {
    console.log('Initializing vendoring');
    this.spawnCommandSync('dep', ['init']);
  }
};
