const packed = require('./packed.json');

module.exports = {
  // Get license notation
  // @param license: license name.
  // @param year: the year of the software's copyright.
  // @param organization: the name of the organization or individual who holds the copyright to the software.
  // @param project: the name of the software project.
  note: function(license, year, author, project) {
    return packed[license].licenseTemplate
      .replace('{{ year }}', year)
      .replace('{{ author }}', author)
      .replace('{{ project }}', project);
  },

  get: function(license) {
    return packed[license];
  },

  list: function() {
    return Object.keys(packed);
  }
};
