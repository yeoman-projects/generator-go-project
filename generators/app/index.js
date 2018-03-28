'use strict';

const Generator = require('../../lib/prompt_generator.js');
const path = require('path');
const mkdir = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options, 'app', [
      'project_name',
      'author',
      'description',
      'license',
      'boilerplate'
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
        '../readme/index.js',
        '../makefile/index.js',
        '../circleci/index.js',
        '../license/index.js'
      ].forEach(compose);
      switch (props.boilerplate) {
        case 'CLI':
          compose('../goreleaser/index.js');
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
    this.log('Generating tree folders');

    let root = process.env.GOPATH;
    if (!root) {
      let home = process.env.HOME;
      if (home) {
        root = path.join(home, 'go');
      } else {
        root = '.';
      }
    }
    let srcDir = path.join(
      root,
      'src',
      'github.com',
      this.props.author,
      this.props.projectName
    );
    mkdir.sync(srcDir);
    this.destinationRoot(srcDir);
  }
};
