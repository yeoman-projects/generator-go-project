'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const optionalPrompt = require('../../lib/optional.js');
const appendTpl = require('../../lib/append_tpl.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    const requires = ['project_name', 'author', 'description'];
    this.asks = [];
    requires.forEach(n => {
      const Ask = require('../../lib/ask/' + n + '.js');
      this.asks.push(new Ask(this));
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    if (!this.options.silent) {
      let name = chalk.red('generator-go-project/cli');
      this.log(yosay(`Welcome to the funkadelic ${name} generator!`));
    }
    return optionalPrompt(this).then(props => {
      this.props = props;
    });
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
      this.templatePath('main.go.ejs'), // +build sample
      this.destinationPath(`cmd/${this.props.projectName}-sample/main.go`),
      this.props
    );
    appendTpl('Makefile.ejs', `Makefile`, this.props, this);
  }

  install() {
    console.log('Initializing vendoring');
    this.spawnCommandSync('dep', ['init']);
  }
};
