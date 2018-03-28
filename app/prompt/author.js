'use strict';

module.exports = function(generator) {
  return generator.user.github.username().then(name => {
    return {
      type: 'input',
      name: 'author',
      message: 'Author name',
      default: name
    };
  });
};
