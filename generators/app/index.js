'use strict';

const Generator = require('../../lib/prompt_generator.js');
const mkdir = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'app', [
      'project_name',
      'author',
      'description',
      'license',
      'boilerplate',
      'dir'
    ]);
  }

  prompting() {
    return super.prompting().then(props => {
      let compose = src => {
        this.composeWith(require.resolve(src), props);
      };

      props.silent = true;
      [
        '../gitignore/index.js',
        '../document/index.js',
        '../integration/index.js',
        '../makefile/index.js'
      ].forEach(compose);
      switch (props.boilerplate) {
        case 'CLI':
          compose('../cli/index.js');
          break;
        case 'Library':
          compose('../lib/index.js');
          break;
        default:
          // Noop
          break;
      }

      this.props = props;
    });
  }

  writing() {
    mkdir.sync(this.props.dir);
    this.destinationRoot(this.props.dir);
  }
};
