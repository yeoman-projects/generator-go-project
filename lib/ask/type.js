'use strict';

const autocomplete = require('inquirer-autocomplete-prompt');
const Fuse = require('fuse.js');

module.exports = class Ask {
  constructor(generator) {
    // NOTE: Generator.option should be called in the constructor.
    generator.option('type', {
      type: String,
      description: 'A project type (CLI/Library)'
    });
    generator.env.adapter.promptModule.registerPrompt('autocomplete', autocomplete);
  }

  getName() {
    return 'type';
  }

  getPrompt() {
    let choices = ['None', 'CLI', 'Library'].map(id => ({ name: id, value: id }));
    let fuseOptions = {
      shouldSort: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      keys: ['name']
    };
    let fuse = new Fuse(choices, fuseOptions);
    return Promise.resolve({
      type: 'autocomplete',
      message: 'Choose a project type',
      default: 'None',
      source: (answersSoFar, input) => {
        if (!input) {
          return Promise.resolve(choices);
        }

        return Promise.resolve(fuse.search(input));
      }
    });
  }
};
