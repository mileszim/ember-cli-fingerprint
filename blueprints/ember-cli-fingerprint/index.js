/* eslint-env node */
module.exports = {
  description: ''

  normalizeEntityName() {},

  afterInstall(options) {
    return this.addPackagesToProject([
        { name: 'fingerprintjs2' },
      ]);
    });
  }
};
