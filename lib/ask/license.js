'use strict';

const simpleLics = require('spdx-license-list/simple');
const autocomplete = require('inquirer-autocomplete-prompt');
const Fuse = require('fuse.js');

module.exports = class Ask {
  constructor(generator) {
    // NOTE: Generator.option should be called in the constructor.
    generator.option('license', {
      type: String,
      description: 'License that distributes your project'
    });
    generator.env.adapter.promptModule.registerPrompt('autocomplete', autocomplete);
  }

  getName() {
    return 'license';
  }

  getPrompt() {
    let choices = [...simpleLics].map(id => ({ name: id, value: id }));
    let fuseOptions = {
      shouldSort: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: ['name']
    };
    let fuse = new Fuse(choices, fuseOptions); // "list" is the item array
    return Promise.resolve({
      type: 'autocomplete',
      message: 'Choose a license template',
      default: 'MIT',
      source: (answersSoFar, input) => {
        if (!input) {
          return Promise.resolve(choices);
        }

        return Promise.resolve(fuse.search(input));
      }
    });
  }
};
