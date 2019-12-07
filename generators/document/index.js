'use strict';

const Generator = require('../../lib/prompt_generator.js');
const lic = require('../../lib/lic');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'document', [
      'name',
      'author',
      'description',
      'type',
      'publication',
      'license'
    ]);
  }

  prompting() {
    return super.prompting();
  }

  writing() {
    const merge = Object.assign;

    this.fs.write(
      this.destinationPath('LICENSE'),
      lic.note(
        this.props.license,
        this.props.publication,
        this.props.author,
        this.props.name
      )
    );

    let badgeId = encodeURIComponent(this.props.license).replace('-', '--');
    this.props.badge = `http://img.shields.io/badge/license-${badgeId}-blue.svg`;
    this.fs.copyTpl(
      this.templatePath('README.md.ejs'),
      this.destinationPath('README.md'),
      merge({}, this.props, { license: lic.get(this.props.license) })
    );
  }
};
