'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const optionalPrompt = require('./prompt/optional.js');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    if (!this.options.silent) {
      let name = chalk.red('generator-go-project/gitignore');
      this.log(yosay(`Welcome to the funkadelic ${name} generator!`));
    }
    let promises = [].map(n => require(n)(this));
    return Promise.all(promises).then(prompts =>
      optionalPrompt(prompts, this).then(props => {
        this.props = props;
      })
    );
  }

  writing() {
    this.fs.copy(
      this.templatePath('gitignore/gitignore'),
      this.destinationPath('.gitignore')
    );
  }
};
