import Service from '@ember/service';
import Fingerprint2 from 'fingerprintjs2';
import { later } from '@ember/runloop';
import FINGERPRINT_OPTIONS from 'ember-cli-fingerprint/utils/fingerprint-options';

export default Service.extend({
  fingerprint: null,
  delay: 2000, // ms delay recommended by valve
  options: {},


  init() {
    this._super(...arguments);
    // this.set('currentOptions', {});
    // this.set('components', []);
    // later(this, this._takeFingerprint, TIMEOUT);
  },

  setOption(option, value) {
    if (OPTIONS[option]) {
      let currentOptions = this.get('currentOptions');
      currentOptions[option] = value;
      this.set('currentOptions', currentOptions);
      return this.get('currentOptions');
    }
    if (!option) { return new Error({ error: "Option argument requires value." }); }
    return {};
  },

  setOptions(options = {}) {
    for (let [option, value] of options) { this.setOption(option, value); }
    return this.get('currentOptions');
  },

  _takeFingerprint(options = {}) {
    return new Promise((resolve) => {
      if (window.requestIdleCallback) {
        requestIdleCallback(() => {
          Fingerprint2.get(options, (components) => {
            const values = components.map(c => c.value).join('');
            return resolve(Fingerprint2.x64hash128(values, 31));
          });
        });
      } else {
        setTimeout(() => {
          Fingerprint2.get(options, (components) => {
            const values = components.map(c => c.value).join('');
            return resolve(Fingerprint2.x64hash128(values, 31));
          });
        }, TIMEOUT);
      }
    });
  }
});
