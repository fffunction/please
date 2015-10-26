(function () {
    'use strict';

    var exports = {};

    var parse = function (req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return {data:result, request:req};
    };

    var xhr = function (type, url, data, opts) {
        var options = {
            fileForm: opts.fileForm || false,
            promise: opts.promise || false,
            headers: opts.headers || {},
            success: opts.success || function () {},
            error: opts.error || function () {},
            loadstart: opts.loadstart || function () {},
            progress: opts.progress || function () {},
            load: opts.load || function () {}
        },
        request,
        isString = typeof data === 'string',
        isJSON = false;
        if (isString) {
            try {
                isJSON = !!JSON.parse(data);
            } catch (e) {
                isJSON = false;
            }
        }
        // IE9 Form Upload
        if (options.fileForm && isString) {
            var iframe  = document.createElement('iframe');
            request = {
                readyState: false,
                status: false,
                onload: function () {},
                onerror: function () {},
                send: function () {
                    iframe.style.display = 'none';
                    iframe.name = iframe.id = 'iframe'+Math.ceil(Math.random() * 1e5).toString();
                    document.body.appendChild(iframe);
                    iframe.addEventListener('load', function () {
                        var result = this.responseText = iframe.contentDocument.body.innerHTML;
                        if (result.toString().match(/^20\d\b/)) { // 20x status code
                            this.readyState = 4;
                            this.status = 200;
                            options.success();
                            this.onload();
                        } else {
                            options.error();
                            this.onerror();
                        }
                        document.body.removeChild(iframe);
                        options.fileForm.action = options.fileForm.action.slice(options.fileForm.action.search(/\?ie9/), 4);
                    }.bind(this));
                    if (options.fileForm.action.search(/\?ie9/) < 0) {
                        options.fileForm.action = (options.fileForm.action) ? options.fileForm.action + '?ie9' : '?ie9';
                    }
                    options.fileForm.target = iframe.id;
                    options.fileForm.submit();
                    options.loadstart();
                }
            };
        } else {
            var XHR = window.XMLHttpRequest || ActiveXObject;
            request = new XHR('MSXML2.XMLHTTP.3.0');
            request.open(type, url, true);
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            if (isString) {
                if (isJSON) request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                else request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
            }
            if (!!request.upload) {
                request.upload.addEventListener('loadstart', options.loadstart, false);
                request.upload.addEventListener('progress', options.progress, false);
                request.upload.addEventListener('load', options.load, false);
            }
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 300) {
                        options.success(parse(request));
                    } else {
                        options.error(parse(request));
                    }
                }
            };
        }
        for (var header in options.headers) {
            if (options.headers.hasOwnProperty(header)) {
                request.setRequestHeader(header, options.headers[header]);
            }
        }
        if (!!window.Promise && options.promise) {
            return new Promise(function(resolve, reject) {
                request.onload = function() {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(request.response);
                    }
                    else {
                        reject(Error(request.statusText));
                    }
                };

                request.onerror = function() {
                    reject(Error('Network Error'));
                };

                request.send(data);
            });
        } else {
            request.send(data);
        }
        return request;
    };

    exports['get'] = function get (url, opts) {
        var options = opts || {};
        return xhr('GET', url, undefined, options);
    };

    exports['put'] = function put (url, data, opts) {
        var options = opts || {};
        return xhr('PUT', url, data, options);
    };

    exports['patch'] = function patch (url, data, opts) {
        var options = opts || {};
        return xhr('PATCH', url, data, options);
    };

    exports['post'] = function post (url, data, opts) {
        var options = opts || {};
        return xhr('POST', url, data, options);
    };

    exports['del'] = exports['delete'] = function del (url, opts) {
        var options = opts || {};
        return xhr('DELETE', url, undefined, options);
    };

    if (typeof define === 'function' && define['amd']) {
      define(function() { return exports; });
    } else if (typeof module !== 'undefined' && module['exports']) {
      module['exports'] = exports;
    } else if (typeof this !== 'undefined') {
      this['please'] = exports;
    }

}).call(this);
