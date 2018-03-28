'use strict';

const Generator = require('../../lib/prompt_generator.js');
const appendTpl = require('../../lib/append_tpl.js');

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
    let data = {
      badge: `http://img.shields.io/badge/license-${badgeId}-blue.svg`,
      license: l
    };

    appendTpl('README.md.ejs', 'README.md', data, this);
  }
};
