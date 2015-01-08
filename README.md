# Please
> A small and modern AJAX library.

## Features

 - Small
 - Supports Promises
 - Supports file uploads, even in IE9
 - Accepts both FormData objects and forms serialised as strings
 - Supports CommonJS, AMD, and plain old globals.

## Support

Supports modern browsers and IE9+. IE9 requires an ugly hack with a iframe in order to do file uploads, and therefore doesn't support the same events. More on that later.

## Usage

Basic:

```
var plz = require('please')(window);

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
