/* eslint-env node */
module.exports = {
  description: require('../../package').name,

  afterInstall() {
    return this.addPackageToProject('fingerprintjs2', '^2.0.3');
  }
};
