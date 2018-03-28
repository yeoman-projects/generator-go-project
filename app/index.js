'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdir = require('mkdirp');
const optionalPrompt = require('./prompt/optional.js');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    if (!this.options.silent) {
      let name = chalk.red('generator-go-project');
      this.log(yosay(`Welcome to the funkadelic ${name} generator!`));
    }
    let promises = [
      './prompt/project_name.js',
      './prompt/author.js',
      './prompt/description.js',
      './prompt/license.js',
      './prompt/boilerplate.js'
    ].map(n => require(n)(this));
    return Promise.all(promises).then(prompts =>
      optionalPrompt(prompts, this).then(props => {
        let compose = src => {
          this.composeWith(require.resolve(src), props);
        };
        props.silent = true;
        [
          './gitignore.js',
          './readme.js',
          './makefile.js',
          './circleci.js',
          './license.js'
        ].forEach(compose);
        switch (props.boilerplate) {
          case 'CLI':
            compose('./goreleaser.js');
            compose('./cli.js');
            break;
          case 'Library':
            compose('./lib.js');
            break;
          default:
            // Noop
            break;
        }
        this.props = props;
      })
    );
  }

  writing() {
    this.log('Generating tree folders');

    let root = process.env.GOPATH;
    if (!root) {
      let home = process.env.HOME;
      if (home) {
        root = path.join(home, 'go');
      } else {
        root = '.';
      }
    }
    let srcDir = path.join(
      root,
      'src',
      'github.com',
      this.props.author,
      this.props.projectName
    );
    mkdir.sync(srcDir);
    this.destinationRoot(srcDir);
  }
};
