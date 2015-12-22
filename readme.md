# Github.ExpandinizR

[![devDependencies](http://img.shields.io/david/dev/thecodejunkie/github.expandinizr.svg?style=flat)](https://david-dm.org/thecodejunkie/github.expandinizr#info=devDependencies)

Chrome extension that improves the GitHub experience.

[![Github.ExpandinizR](https://developer.chrome.com/webstore/images/ChromeWebStore_Badge_v2_340x96.png)](https://chrome.google.com/webstore/detail/cbehdjjcilgnejbpnjhobkiiggkedfib)

Currently enhances the following:

- Removes the truncating of file and directory names in the repository browser
- Really long file and directory names will word-wrap
- Fully expands the website, with breakpoints at 1400px, 1600px and 1800px
- Removes truncation in notifications
- Adds shrink/expand button for comment form
- Adds possibility to collapse code previews

## Authors

Andreas Håkansson, Kristian Hellang

## Contributors

- [Bjarki Heiðar Ingason](https://github.com/bjarki)
- [Frank Radocaj](https://github.com/frankradocaj)
- [Kristian Hellang](https://github.com/khellang)
- [Phillip Haydon](https://github.com/phillip-haydon)

## Changelog

- v1.8.0
  - Fixed a bug where file names were not expanded - @khellang
  - Added support for GitHub Enterprise! :sparkles: @ccampanale
- v1.7.1 - Removed ugly `aria-label`s
- v1.7.0
	- Removed truncation in notifications - @khellang
	- Fixed commit comment width - @khellang
	- Fixed collapse code file button - @khellang
	- Added shrink/expand button for comment form - @khellang
- v1.6.0 - Complete rewrite, added build with gulp - @khellang
- v1.5.1 - Removed side-bar expansion, it broke too much stuff
- v1.5.0 - Added possibility to collapse code previews
- v1.4.0 - Expands side-bar for 1400, 1600 and 1800 break points
- v1.3.2 - Improved expanding of activity stream
- v1.3.1 - Fixed a couple of small layout bugs
- v1.3.0 - Changed to a responsive approach - @khellang
- v1.2.0 - Improved the un-truncting to word-wrap - @frankradocaj
- v1.1.1 - Fix for labels on the expanded issue form
- v1.1.0 - Expands the issue form to full width - @phillip-haydon
- v1.0.0 - First release of the extension

## License

The MIT License (MIT)

Copyright (c) 2013 Andreas Håkansson, Kristian Hellang and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
