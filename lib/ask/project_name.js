'use strict';

module.exports = class Ask {
  constructor(generator) {
    // NOTE: Generator.option should be called in the constructor.
    generator.option('project_name', {
      type: String,
      description: 'Project name'
    });
  }

  getName() {
    return 'project_name';
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
