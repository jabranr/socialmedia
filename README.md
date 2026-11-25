# `socialmedia.js` (Deprecated)

> [!WARNING]
> This library is deprecated and no longer maintained. It will not receive fixes, including security fixes. Do not use it in new projects.

`socialmedia` wrapped the JavaScript SDKs of Facebook, Twitter, Google Plus and Pinterest. Those SDKs have moved on since it was last updated:

- **Google+** shut down in 2019, so the Google Plus module no longer works.
- **Facebook**: the library targets Graph API v2.8, which Facebook retired years ago, and several of the dialogs it wraps (`friends`, `pay`, `pagetab`) have been removed.
- **Twitter / X** and **Pinterest** widgets have changed their APIs since 2016.

## Alternatives

- Facebook in React: [`use-facebook`](https://github.com/jabranr/use-facebook)
- Otherwise, load each platform's official SDK directly:
  - [Facebook JavaScript SDK](https://developers.facebook.com/docs/javascript)
  - [X for Websites](https://developer.x.com/en/docs/x-for-websites)
  - [Pinterest widget builder](https://developers.pinterest.com/tools/widget-builder/)

## License

[MIT License](http://opensource.org/licenses/MIT)

&copy; Jabran Rafique ([@jabranr](https://twitter.com/jabranr)) 2014-2015
