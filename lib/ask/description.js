'use strict';

module.exports = class Ask {
  constructor(generator) {
    // NOTE: Generator.option should be called in the constructor.
    generator.option('description', {
      type: String,
      description: 'Project description',
    });
  }

  getName() {
    return 'description';
  }

  getPrompt() {
    return Promise.resolve({
      type: 'input',
      message: 'Project description',
    });
  }
};
