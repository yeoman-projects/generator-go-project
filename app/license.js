'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const optionalPrompt = require('./prompt/optional.js');
const appendTpl = require('./lib/append_tpl.js');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    if (!this.options.silent) {
      let name = chalk.red('generator-go-project/license');
      this.log(yosay(`Welcome to the funkadelic ${name} generator!`));
    }
    let promises = ['./prompt/license.js'].map(n => require(n)(this));
    return Promise.all(promises).then(prompts =>
      optionalPrompt(prompts, this).then(props => {
        this.props = props;
      })
    );
  }

  writing() {
    let l = this.props.license;
    this.fs.write(this.destinationPath('LICENSE'), l.licenseText);

    let badgeId = encodeURIComponent(l.id).replace('-', '--');
    let data = {
      badge: `http://img.shields.io/badge/license-${badgeId}-blue.svg`,
      license: l
    };

    appendTpl('license/README.md.ejs', 'README.md', data, this);
  }
};
