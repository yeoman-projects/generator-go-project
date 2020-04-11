'use strict';

module.exports = class Ask {
  constructor(generator) {
    // NOTE: Generator.option should be called in the constructor.
    generator.option('author', {
      type: String,
      description: 'Project author GitHub account',
    });
    this.generator = generator;
  }

  getName() {
    return 'author';
  }

  getPrompt() {
    return this.generator.user.github.username().then((name) => {
      return {
        type: 'input',
        message: 'Project author GitHub account',
        default: name,
        required: true,
      };
    });
  }
};
