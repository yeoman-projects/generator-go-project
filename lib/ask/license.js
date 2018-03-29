'use strict';

const simpleLics = require('spdx-license-list/simple');
const fulLics = require('spdx-license-list/full');
const autocomplete = require('inquirer-autocomplete-prompt');
const Fuse = require('fuse.js');

module.exports = class Ask {
  constructor(generator) {
    // NOTE: Generator.option should be called in the constructor.
    generator.option('license-id', {
      type: String,
      description: 'License that distributes your project'
    });
    generator.env.adapter.promptModule.registerPrompt('autocomplete', autocomplete);
    this.generator = generator;
  }

  getOption() {
    if ('license' in this.generator.options) {
      return this.generator.options.license;
    }
    const id = this.generator.options['license-id'];
    if (id in fulLics) {
      let obj = fulLics[id];
      obj.id = id;
      return obj;
    }
  }

  getPrompt() {
    let choices = [];
    simpleLics.forEach(id => {
      let obj = fulLics[id];
      obj.id = id;
      choices.push({ name: id, value: obj });
    });
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
      name: 'license',
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
