'use strict';

module.exports = class Ask {
  constructor(generator) {
    generator.option('author', {
      type: String,
      description: 'Project author GitHub account'
    });
    this.generator = generator;
  }

  getOption() {
    return this.generator.options.author;
  }

  getPrompt() {
    return this.generator.user.github.username().then(name => {
      return {
        type: 'input',
        name: 'author',
        message: 'Project author GitHub account',
        default: name
      };
    });
  }
};
