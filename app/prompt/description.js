'use strict';

module.exports = class Ask {
  constructor(generator) {
    generator.option('description', {
      type: String,
      description: 'Project description'
    });
    this.generator = generator;
  }

  getOption() {
    return this.generator.options.description;
  }

  getPrompt() {
    return Promise.resolve({
      type: 'input',
      name: 'description',
      message: 'Project description'
    });
  }
};
