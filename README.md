# ember-cli-fingerprint #
[![Build Status](https://travis-ci.org/mileszim/ember-particle.svg?branch=master)](https://travis-ci.org/mileszim/ember-particle) [![npm version](https://badge.fury.io/js/ember-particle.svg)](https://badge.fury.io/js/ember-particle) [![Ember Observer Score](https://emberobserver.com/badges/ember-particle.svg)](https://emberobserver.com/addons/ember-particle)


**WORK IN PROGRESS**

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-fingerprint
```


Usage
------------------------------------------------------------------------------

*I realized starting to write out this README I did not consider fastboot handling, so right noe this is a lame ripoff of the cave scene in Monty Python's Holy Grail*

> "It reads here may be found the last words of Joseph of Aramethea. He who is valiant and pure of spirit may find the holy grail in the castle of... auuuuughhhh?" https://www.youtube.com/watch?v=LJfowXTXOfU

The simplest way to get a fingerprint once a user session begins is to load the service into `app/routes/application.js`, and trigger the fingerprint action **TODO: determine best course of action with fastboot handling**

```javascript
//...
import { inject as service } from '@ember/service';

export default Controller.extend({
  particle: service('fingerprint'),

  actions: {

  }
});
```

## Options, Components, & Settings ##
You can add, alter, or remove methods used in fingerprinting. When changed, the service stores them for consistency. **Caution:** altering the options after getting a fingerprint hash will, as you would expect, yield a different hash.

```javascript
// Default Options
{
  preprocessor: null,
  audio: {
    timeout: 1000,
      // On iOS 11, audio context can only be used in response to user interaction.
      // We require users to explicitly enable audio fingerprinting on iOS 11.
      // See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
    excludeIOS11: true
  },
  fonts: {
    swfContainerId: 'fingerprintjs2',
    swfPath: 'flash/compiled/FontList.swf',
    userDefinedFonts: [],
    extendedJsFonts: false
  },
  screen: {
     // To ensure consistent fingerprints when users rotate their mobile devices
    detectScreenOrientation: true
  },
  plugins: {
    sortPluginsFor: [/palemoon/i],
    excludeIE: false
  },
  extraComponents: [],
  excludes: {
    // Unreliable on Windows, see https://github.com/Valve/fingerprintjs2/issues/375
    'enumerateDevices': true,
    // devicePixelRatio depends on browser zoom, and it's impossible to detect browser zoom
    'pixelRatio': true,
    // DNT depends on incognito mode for some browsers (Chrome) and it's impossible to detect incognito mode
    'doNotTrack': true,
    // uses js fonts already
    'fontsFlash': true
  },
  NOT_AVAILABLE: 'not available',
  ERROR: 'error',
  EXCLUDED: 'excluded'
}
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-cli-fingerprint`
* `yarn install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
