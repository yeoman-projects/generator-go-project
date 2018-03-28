'use strict';

module.exports = function() {
  return Promise.resolve({
    type: 'input',
    name: 'projectName',
    message: 'Project name'
  });
};
