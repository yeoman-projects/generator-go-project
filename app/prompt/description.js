'use strict';

module.exports = function() {
  return Promise.resolve({
    type: 'input',
    name: 'description',
    message: 'Project description'
  });
};
