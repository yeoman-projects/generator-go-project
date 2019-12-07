'use strict';

module.exports = class Ask {
  constructor(generator) {
    // NOTE: Generator.option should be called in the constructor.
    generator.option('project_type', {
      type: String,
      description: 'A project type (CLI/Library)'
    });
  }

  getName() {
    return 'project_type';
  }

  getPrompt() {
    return Promise.resolve({
      type: 'list',
      message: 'Choose a project type (CLI/Library)',
      default: 'None',
      choices: ['None', 'CLI', 'Library']
    });
  }
};
