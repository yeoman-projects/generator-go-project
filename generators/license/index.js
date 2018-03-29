'use strict';

const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'license', ['license']);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    let l = this.props.license;
    this.fs.write(this.destinationPath('LICENSE'), l.licenseText);

    let badgeId = encodeURIComponent(l.id).replace('-', '--');
    this.appendTpl(
      this.templatePath('README.md.ejs'),
      this.destinationPath('README.md'),
      {
        badge: `http://img.shields.io/badge/license-${badgeId}-blue.svg`,
        license: l
      }
    );
  }
};
