'use strict';

module.exports = class Ask {
  constructor(generator) {
    generator.option('projectName', {
      type: String,
      description: 'Project name'
    });
    this.generator = generator;
  }

  getOption() {
    return this.generator.options.projectName;
  }

  getPrompt() {
    return Promise.resolve({
      type: 'input',
      name: 'projectName',
      message: 'Project name'
    });
  }
};
