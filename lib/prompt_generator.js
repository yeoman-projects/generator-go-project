'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const ejs = require('ejs');

module.exports = class extends Generator {
  constructor(args, options, name, askModules) {
    super(args, options);
    this.name = name;
    this.asks = [];
    // NOTE: Generator.option should be called in the constructor.
    askModules.forEach(n => {
      const Ask = require('./ask/' + n + '.js');
      this.asks.push(new Ask(this));
    });
  }

  appendTpl(template, destination, data) {
    const done = this.async();
    ejs.renderFile(template, data, null, (err, rendered) => {
      if (err) {
        done(err);
      } else {
        this.fs.append(destination, rendered);
        done();
      }
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    if (!this.options.silent) {
      let name = chalk.red('generator-go-project/' + this.name);
      this.log(yosay(`Welcome to the funkadelic ${name} generator!`));
    }

    let props = new Map();
    if (!this.asks) {
      return Promise.resolve(props);
    }

    return Promise.all(
      this.asks.map(ask => {
        let option = ask.getOption();
        return ask.getPrompt().then(prompt => {
          if (option === undefined) {
            return prompt;
          }
          props[prompt.name] = option;
        });
      })
    ).then(prompts => {
      let required = prompts.filter(n => Boolean(n));
      if (required.length) {
        return this.prompt(required).then(result => {
          Object.assign(props, result);
          this.props = props;
          return props;
        });
      }
      this.props = props;
      return props;
    });
  }
};
