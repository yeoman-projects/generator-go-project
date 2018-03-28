'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const optionalPrompt = require('./prompt/optional.js');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    if (!this.options.silent) {
      let name = chalk.red('generator-go-project/goreleaser');
      this.log(yosay(`Welcome to the funkadelic ${name} generator!`));
    }

    let promises = [
      './prompt/project_name.js',
      './prompt/author.js',
      './prompt/description.js'
    ].map(n => require(n)(this));
    return Promise.all(promises).then(prompts =>
      optionalPrompt(prompts, this).then(props => {
        this.props = props;
      })
    );
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('goreleaser/goreleaser.yml.ejs'),
      this.destinationPath('goreleaser.yml'),
      this.props
    );
  }
};
