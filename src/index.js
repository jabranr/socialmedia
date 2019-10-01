// if (typeof window !== 'undefined') {
//   throw new Error('This library only runs in a web browser.');
// }

import { version } from '../package.json';

const DEFAULT_PROTOCOL =
  window.location && window.location.protocol === 'https:' ? 'https:' : 'http:';

export default {
  VERSION: version,
  GRAPH_API_VERSION: 'v2.8',
  MIN_GRAPH_API_VERSION: 'v2.5',
  SDK: {
    facebook: `${DEFAULT_PROTOCOL}//connect.facebook.net/en_US/sdk.js`,
    facebookDebug: `${DEFAULT_PROTOCOL}//connect.facebook.net/en_US/sdk/debug.js`,
    twitter: `${DEFAULT_PROTOCOL}//platform.twitter.com/widgets.js`,
    pinterest: `${DEFAULT_PROTOCOL}//assets.pinterest.com/js/pinit.js`
  },

  Popup: (uri = 'about:blank', settings = {}) => {
    const {
      width = 600,
      height = 300,
      features = ['dialog', 'location', 'dependent']
    } = settings;

    const getFeatures = () => {
      return `width=${width},height=${height},left=${window.outerWidth / 2 -
        width / 2},top=${window.outerHeight / 2 - height / 2},${features.join(
        ','
      )}`;
    };

    const popup = window.open(uri, `__jr_${+new Date()}`, getFeatures());

    if (popup) {
      popup.focus();
    }

    return popup;
  },

  Load: (id, src) => {
    if (document.getElementById(id)) {
      return;
    }

    const sdk = document.createElement('script');
    sdk.id = id;
    sdk.async = true;
    sdk.defer = true;
    sdk.src = src;
    const ref = document.getElementsByTagName('script')[0];
    ref.parentNode.insertBefore(sdk, ref);

    if (id === 'fb-jssdk') {
      const div = document.createElement('div');
      div.id = 'fb-root';
      ref.parentNode.insertBefore(div, ref);
    }
  }
};
