'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const optionalPrompt = require('./prompt/optional.js');
const appendTpl = require('./lib/append_tpl.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    const requires = ['project_name', 'author', 'description'];
    this.asks = [];
    requires.forEach(n => {
      const Ask = require('./prompt/' + n + '.js');
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
      this.templatePath('cli/main.go.ejs'),
      this.destinationPath('main.go'),
      this.props
    );
    appendTpl('cli/README.md.ejs', 'README.md', this.props, this);
    appendTpl('cli/Makefile.ejs', 'Makefile', this.props, this);
  }

  install() {
    console.log('Initializing vendoring');
    this.spawnCommandSync('dep', ['init']);
  }
};
