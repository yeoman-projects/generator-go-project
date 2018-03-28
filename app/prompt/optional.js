'use strict';

module.exports = function(prompts, generator) {
  const props = new Map();

  if (!prompts) {
    return Promise.resolve(props);
  }

  const required = [];
  prompts.forEach(prompt => {
    const option = generator.options[prompt.name];
    if (option === undefined) {
      required.push(prompt);
    } else {
      props[prompt.name] = option;
    }
  });

  if (required.length) {
    return generator.prompt(required).then(result => {
      Object.assign(props, result);
      return props;
    });
  }

  return Promise.resolve(props);
};
