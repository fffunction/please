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

Supports modern browsers and IE9+. IE9 requires an ugly hack with a iframe in order to do file uploads, and therefore doesn't support the same events. More on that later.

## Usage

Demo:
[![view on requirebin](http://requirebin.com/badge.png)](http://requirebin.com/?gist=59b4b7827f3dfa3ac81c)

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
