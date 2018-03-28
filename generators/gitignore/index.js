'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    if (!this.options.silent) {
      let name = chalk.red('generator-go-project/gitignore');
      this.log(yosay(`Welcome to the funkadelic ${name} generator!`));
    }

    return Promise.resolve(new Map());
  }

  writing() {
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
  }
};
