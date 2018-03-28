'use strict';

module.exports = class Ask {
  constructor(generator) {
    generator.option('boilerplate', {
      type: String,
      description: 'A project type to create boilerplate (CLI/Library)'
    });
    this.generator = generator;
  }

  getOption() {
    return this.generator.options.boilerplate;
  }

  getPrompt() {
    return Promise.resolve({
      type: 'list',
      name: 'boilerplate',
      message: 'Choose a project type to create boilerplate (CLI/Library)',
      default: 'None',
      choices: ['None', 'CLI', 'Library']
    });
  }
};
