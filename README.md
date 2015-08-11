# Please
> *A small and modern AJAX library.*

[![NPM](https://nodei.co/npm/please-ajax.png)](https://nodei.co/npm/please-ajax/)

[![Build Status](https://travis-ci.org/fffunction/please.svg?branch=master)](https://travis-ci.org/fffunction/please)

## Breaking changes in 2.0.0

It's no longer necessary to init with the window value. The library now references the window directly, since it'll always be used in a browser.

Old syntax:

```
var plz = require('please-ajax')(window);
```

New syntax:

```
var plz = require('please-ajax');
```

## Features

 - Small
 - Supports Promises
 - Supports file uploads, even in IE9
 - Accepts both FormData objects and forms serialised as strings
 - Supports CommonJS, AMD, and plain old globals.

## Support

Supports modern browsers and IE9+. IE9 requires an ugly hack with a iframe in order to do file uploads, and therefore doesn't support the same events. [How to handle IE9 form uploads](#ie9-form-uploads).

## Usage

Demo:
[![view on requirebin](http://requirebin.com/badge.png)](http://requirebin.com/?gist=d88339076f95291bfddb)

Basic:

```
var plz = require('please-ajax');

plz.get('http://danreev.es/', {
    success: function (d) {
        alert(d);
    }
});
```
Promise:

```
plz.get('http://danreev.es/', {
    promise: true
}).then(function success (d) {
    console.log(d);
}, function error () {});
```

Upload:

```
plz.post('http://danreev.es/', formData, {
    fileForm: formEl,
    loadstart: function (e) {
        console.log('Started');
    },
    progress: function (e) {
        console.log(e.loaded + '%');
    },
    load: function (e) {
        console.log('Done');
    },
    success: function (e) {
        console.log('Successful upload!');
    },
    error: function (e) {
        console.log('Uh oh.');
    }
});
```

## API

### please.get(url[, options])

### please.put(url, data[, options])

### please.post(url, data[, options])

### please.delete(url[, options])

### please.del(url[, options])

Alias to please.delete because some browsers won't let you use the delete keyword. Get around this with either please['delete'] or please.del.

### Options

```
// Defaults
{
    fileForm:  false, // Pass in the DOM node of the form if you're uploading files
    promise:   false, // Set to true if you want to return a promise
    success:   function () {}, // Success handler
    error:     function () {}, // Error handler
    loadstart: function () {}, // Start handler for file uploads
    progress:  function () {}, // Progress handler for file uploads (Not in IE9)
    load:      function () {}  // On load handler for file uploads
}
```

### IE9 form uploads

To support IE9 AJAX uploads, you need to post the form to hidden iframe. Please handles all of that for you but requires two things.

Firstly, it posts the form to the supplied URL with `?ie9` appended. It then checks for that page to contain a `200` message. This is how please knows that the upload has been successful, otherwise it's considered a failure (e.g 500).

The code currently doesn't support a URL that already has GET parameters, is fairly strict in what it expects, and requires a condition on the server side to support IE9 AJAX uploads. 💀

Pull requests welcome!

[Read the related code](https://github.com/fffunction/please/blob/3dcf7fda1bd9ecd4a888d1ed24543e9f2b3d743c/src/please.js#L37-L71)

[Create an issue](https://github.com/fffunction/please/issues/new?title=wat)

[Ask the maintainer](https://twitter.com/intent/tweet?text=%40heydanreeves+%40fffunction+please-ajax+is+broken!!!)
