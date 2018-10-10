import Service from '@ember/service';
//import Fingerprint2 from 'fingerprintjs2'; TODO: Figure out non-global import
import { later } from '@ember/runloop';

// Available Options
const OPTIONS = [
  'swfContainerId',
  'swfPath',
  'userDefinedFonts',
  'excludeUserAgent',
  'excludeLanguage',
  'excludeColorDepth',
  'excludeScreenResolution',
  'excludeAvailableScreenResolution',
  'excludeTimezoneOffset',
  'excludeSessionStorage',
  'excludeIndexedDB',
  'excludeAddBehavior',
  'excludeOpenDatabase',
  'excludeCpuClass',
  'excludePlatform',
  'excludeDoNotTrack',
  'excludeCanvas',
  'excludeWebGL',
  'excludeAdBlock',
  'excludeHasLiedLanguages',
  'excludeHasLiedResolution',
  'excludeHasLiedOs',
  'excludeHasLiedBrowser',
  'excludeJsFonts',
  'excludeFlashFonts',
  'excludePlugins',
  'excludeIEPlugins',
  'excludeTouchSupport',
  'excludePixelRatio',
  'excludeHardwareConcurrency',
  'excludeWebGLVendorAndRenderer',
  'excludeDeviceMemory',
  'excludeAudioFP',
];

const TIMEOUT = 2000 // delay recommended by valve

export default Service.extend({
  fingerprint: null,
  components: null,
  error: null,
  currentOptions: null,

  init() {
    this._super(...arguments);
    this.set('currentOptions', {});
    this.set('components', []);
    later(this, this._takeFingerprint, TIMEOUT);
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
