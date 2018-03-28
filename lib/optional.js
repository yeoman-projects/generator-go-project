'use strict';

module.exports = function(generator) {
  let props = new Map();

  if (!generator.asks) {
    return Promise.resolve(props);
  }

  return Promise.all(
    generator.asks.map(ask => {
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
      return generator.prompt(required).then(result => {
        Object.assign(props, result);
        return props;
      });
    }
    return Promise.resolve(props);
  });
};
