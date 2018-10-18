'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
  });

  app.import('node_modules/fingerprintjs2/fingerprint2.js', {
    using: [
      { transformation: 'cjs', as: 'fingerprintjs2' }
    ]
  });

  return app.toTree();
};
