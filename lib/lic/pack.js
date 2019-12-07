'use strict';

const simpleLics = require('spdx-license-list/simple');
const fullLics = require('spdx-license-list/full');
const path = require('path');
const fs = require('fs');

const suffix = '.tmpl';

async function serialize(location) {
  let dict = {};
  await Promise.all(
    [...simpleLics].map(id => {
      let name = path.join(location, id.toLowerCase() + suffix);

      return fs.promises
        .readFile(name, { encoding: 'utf-8' })
        .then(content => {
          console.info('found: ' + id);
          dict[id] = Object.assign({}, fullLics[id], { licenseTemplate: content });
        })
        .catch(e => {
          console.warn(e.toString());
        });
    })
  );

  await fs.promises.writeFile(
    path.join(location, 'packed.json'),
    JSON.stringify(dict, null, 2)
  );
}

serialize('./').catch(console.error);
