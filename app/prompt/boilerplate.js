'use strict';

module.exports = function() {
  return Promise.resolve({
    type: 'list',
    name: 'boilerplate',
    message: 'Choose a type to create boilerplate',
    default: 'None',
    choices: ['None', 'CLI', 'Library']
  });
};
