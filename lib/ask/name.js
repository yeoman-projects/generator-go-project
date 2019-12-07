'use strict';

module.exports = class Ask {
  constructor(generator) {
    // NOTE: Generator.option should be called in the constructor.
    generator.option('name', {
      type: String,
      description: 'Project name'
    });
  }

  getName() {
    return 'name';
  }

  getPrompt() {
    return Promise.resolve({
      type: 'input',
      message: 'Project name',
      required: true,
      validate: input => Boolean(input) || 'cannot be set empty name'
    });
  }
};
