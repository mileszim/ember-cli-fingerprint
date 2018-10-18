'use strict';

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);

    this.import('node_modules/fingerprintjs2/fingerprint2.js', {
      using: [
        { transformation: 'cjs', as: 'fingerprintjs2' }
      ]
    });
  }
};
