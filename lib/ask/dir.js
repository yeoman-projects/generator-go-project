'use strict';

const path = require('path');

module.exports = class Ask {
  constructor(generator) {
    // NOTE: Generator.option should be called in the constructor.
    generator.option('dir', {
      type: String,
      description: 'Path to generate'
    });
  }

  getName() {
    return 'dir';
  }

  _getRoot() {
    let root = process.env.GO_PROJECT_ROOT;
    if (root) {
      return root;
    }

    root = process.env.GOPATH;
    if (root) {
      return path.join(root, 'src');
    }

    const home = process.env.HOME;
    if (home) {
      return path.join(home, 'go', 'src');
    }

    return '.';
  }

  getPrompt() {
    return Promise.resolve({
      type: 'input',
      message: 'Path to generate',
      default: answers => {
        return path.join(
          this._getRoot(),
          'github.com',
          answers.author,
          answers.project_name
        );
      }
    });
  }
};
