/**
 * @jest-environment jsdom
 */

import config from '../src';
import pkg from '../package.json';

const originalOpen = window.open;

beforeAll(() => {
  window.open = jest.fn().mockImplementation(() => ({ focus: jest.fn() }));
});

afterAll(() => {
  window.open = originalOpen;
});

describe('Config', () => {
  it('has correct version', () => {
    expect(config.VERSION).toEqual(pkg.version);
  });

  it('has correct GRAPH API version', () => {
    expect(config.GRAPH_API_VERSION).toEqual('v2.8');
  });

  it('has correct minimum GRAPH API version', () => {
    expect(config.MIN_GRAPH_API_VERSION).toEqual('v2.5');
  });

  it('has SDK URLs for facebook, facebook debug, twitter and pinterest', () => {
    const sdks = Object.keys(config.SDK);
    expect(sdks.length).toEqual(4);
    expect(sdks.includes('facebook')).toEqual(true);
    expect(sdks.includes('facebookDebug')).toEqual(true);
    expect(sdks.includes('twitter')).toEqual(true);
    expect(sdks.includes('pinterest')).toEqual(true);
  });

  it('has methods', () => {
    expect(typeof config.Popup).toEqual('function');
    expect(typeof config.Load).toEqual('function');
  });

  describe('Popup()', () => {
    it('has called with defaults', () => {
      const spy = jest.spyOn(config, 'Popup');
      config.Popup();
      expect(spy).toHaveBeenCalled();
    });

    xit('calls open() on window', () => {
      const spy = jest.spyOn(open, 'window');
      config.Popup();
      expect(spy).toHaveBeenCalled();
    });

    xit('calls focus() on popup', () => {
      const popup = config.Popup('/foo/bar');
      expect(popup.focus).toHaveBeenCalled();
    });
  });

  describe('Load()', () => {
    xit('returns early if id is in document', () => {
      const spy = jest.spyOn(getElementById, 'document');
      config.Load(document, 'foo');
      expect(spy).toHaveBeenCalled();
    });
  });
});
