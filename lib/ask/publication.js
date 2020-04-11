'use strict';

module.exports = class Ask {
  constructor(generator) {
    // NOTE: Generator.option should be called in the constructor.
    generator.option('publication', {
      type: String,
      description: 'Year of the publication',
    });
  }

  getName() {
    return 'publication';
  }

  getPrompt() {
    return Promise.resolve({
      type: 'input',
      message: 'Year of the publication',
      default: new Date().getFullYear(),
      required: true,
    });
  }
};
