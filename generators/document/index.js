'use strict';

const fulLics = require('spdx-license-list/full');
const Generator = require('../../lib/prompt_generator.js');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'document', [
      'project_name',
      'author',
      'description',
      'project_type',
      'license'
    ]);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    const merge = Object.assign;
    const id = this.props.license;
    let license = merge({}, fulLics[id], { id });

    this.fs.write(this.destinationPath('LICENSE'), license.licenseText);
    let badgeId = encodeURIComponent(license.id).replace('-', '--');
    this.props.badge = `http://img.shields.io/badge/license-${badgeId}-blue.svg`;
    this.fs.copyTpl(
      this.templatePath('README.md.ejs'),
      this.destinationPath('README.md'),
      merge({}, this.props, { license })
    );
  }
};
