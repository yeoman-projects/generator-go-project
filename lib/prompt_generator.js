'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const optionalPrompt = require('./optional.js');

module.exports = class extends Generator {
  constructor(args, options, name, askModules) {
    super(args, options);
    this.name = name;
    this.asks = [];
    askModules.forEach(n => {
      const Ask = require('./ask/' + n + '.js');
      this.asks.push(new Ask(this));
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    if (!this.options.silent) {
      let name = chalk.red('generator-go-project/' + this.name);
      this.log(yosay(`Welcome to the funkadelic ${name} generator!`));
    }
    return optionalPrompt(this).then(props => {
      this.props = props;
      return props;
    });
  }
};
