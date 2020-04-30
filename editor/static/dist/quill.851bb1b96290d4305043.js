/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "static/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./quill.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/isomorphic.js/iso-browser.js":
/*!***************************************************!*\
  !*** ./node_modules/isomorphic.js/iso-browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-env browser */
const perf = typeof performance === 'undefined' ? null : performance

const isoCrypto = typeof crypto === 'undefined' ? null : crypto

/**
 * @type {function(number):ArrayBuffer}
 */
const cryptoRandomBuffer = isoCrypto !== null
  ? len => {
    // browser
    const arr = new Uint8Array(len)
    isoCrypto.getRandomValues(arr)
    return arr.buffer
  }
  : len => {
    // polyfill
    const arr = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      arr[i] = Math.ceil((Math.random() * 0xFFFFFFFF) >>> 0)
    }
    return arr.buffer
  }

exports.performance = perf
exports.cryptoRandomBuffer = cryptoRandomBuffer


/***/ }),

/***/ "./node_modules/lib0/array.js":
/*!************************************!*\
  !*** ./node_modules/lib0/array.js ***!
  \************************************/
/*! exports provided: last, create, copy, appendTo, from, every, some, equalFlat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "last", function() { return last; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendTo", function() { return appendTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return from; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "every", function() { return every; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "some", function() { return some; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalFlat", function() { return equalFlat; });
/**
 * Utility module to work with Arrays.
 *
 * @module array
 */

/**
 * Return the last element of an array. The element must exist
 *
 * @template L
 * @param {Array<L>} arr
 * @return {L}
 */
const last = arr => arr[arr.length - 1]

/**
 * @template C
 * @return {Array<C>}
 */
const create = () => /** @type {Array<C>} */ ([])

/**
 * @template D
 * @param {Array<D>} a
 * @return {Array<D>}
 */
const copy = a => /** @type {Array<D>} */ (a.slice())

/**
 * Append elements from src to dest
 *
 * @template M
 * @param {Array<M>} dest
 * @param {Array<M>} src
 */
const appendTo = (dest, src) => {
  for (let i = 0; i < src.length; i++) {
    dest.push(src[i])
  }
}

/**
 * Transforms something array-like to an actual Array.
 *
 * @function
 * @template T
 * @param {ArrayLike<T>|Iterable<T>} arraylike
 * @return {T}
 */
const from = Array.from

/**
 * True iff condition holds on every element in the Array.
 *
 * @function
 * @template ITEM
 *
 * @param {Array<ITEM>} arr
 * @param {function(ITEM, number, Array<ITEM>):boolean} f
 * @return {boolean}
 */
const every = (arr, f) => arr.every(f)

/**
 * True iff condition holds on some element in the Array.
 *
 * @function
 * @template S
 * @param {Array<S>} arr
 * @param {function(S, number, Array<S>):boolean} f
 * @return {boolean}
 */
const some = (arr, f) => arr.some(f)

/**
 * @template ELEM
 *
 * @param {Array<ELEM>} a
 * @param {Array<ELEM>} b
 * @return {boolean}
 */
const equalFlat = (a, b) => a.length === b.length && every(a, (item, index) => item === b[index])


/***/ }),

/***/ "./node_modules/lib0/binary.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/binary.js ***!
  \*************************************/
/*! exports provided: BIT1, BIT2, BIT3, BIT4, BIT5, BIT6, BIT7, BIT8, BIT9, BIT10, BIT11, BIT12, BIT13, BIT14, BIT15, BIT16, BIT17, BIT18, BIT19, BIT20, BIT21, BIT22, BIT23, BIT24, BIT25, BIT26, BIT27, BIT28, BIT29, BIT30, BIT31, BIT32, BITS0, BITS1, BITS2, BITS3, BITS4, BITS5, BITS6, BITS7, BITS8, BITS9, BITS10, BITS11, BITS12, BITS13, BITS14, BITS15, BITS16, BITS17, BITS18, BITS19, BITS20, BITS21, BITS22, BITS23, BITS24, BITS25, BITS26, BITS27, BITS28, BITS29, BITS30, BITS31, BITS32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT1", function() { return BIT1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT2", function() { return BIT2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT3", function() { return BIT3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT4", function() { return BIT4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT5", function() { return BIT5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT6", function() { return BIT6; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT7", function() { return BIT7; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT8", function() { return BIT8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT9", function() { return BIT9; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT10", function() { return BIT10; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT11", function() { return BIT11; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT12", function() { return BIT12; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT13", function() { return BIT13; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT14", function() { return BIT14; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT15", function() { return BIT15; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT16", function() { return BIT16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT17", function() { return BIT17; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT18", function() { return BIT18; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT19", function() { return BIT19; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT20", function() { return BIT20; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT21", function() { return BIT21; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT22", function() { return BIT22; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT23", function() { return BIT23; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT24", function() { return BIT24; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT25", function() { return BIT25; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT26", function() { return BIT26; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT27", function() { return BIT27; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT28", function() { return BIT28; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT29", function() { return BIT29; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT30", function() { return BIT30; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT31", function() { return BIT31; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT32", function() { return BIT32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS0", function() { return BITS0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS1", function() { return BITS1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS2", function() { return BITS2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS3", function() { return BITS3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS4", function() { return BITS4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS5", function() { return BITS5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS6", function() { return BITS6; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS7", function() { return BITS7; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS8", function() { return BITS8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS9", function() { return BITS9; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS10", function() { return BITS10; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS11", function() { return BITS11; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS12", function() { return BITS12; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS13", function() { return BITS13; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS14", function() { return BITS14; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS15", function() { return BITS15; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS16", function() { return BITS16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS17", function() { return BITS17; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS18", function() { return BITS18; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS19", function() { return BITS19; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS20", function() { return BITS20; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS21", function() { return BITS21; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS22", function() { return BITS22; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS23", function() { return BITS23; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS24", function() { return BITS24; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS25", function() { return BITS25; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS26", function() { return BITS26; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS27", function() { return BITS27; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS28", function() { return BITS28; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS29", function() { return BITS29; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS30", function() { return BITS30; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS31", function() { return BITS31; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS32", function() { return BITS32; });
/* eslint-env browser */

/**
 * Binary data constants.
 *
 * @module binary
 */

/**
 * n-th bit activated.
 *
 * @type {number}
 */
const BIT1 = 1
const BIT2 = 2
const BIT3 = 4
const BIT4 = 8
const BIT5 = 16
const BIT6 = 32
const BIT7 = 64
const BIT8 = 128
const BIT9 = 256
const BIT10 = 512
const BIT11 = 1024
const BIT12 = 2048
const BIT13 = 4096
const BIT14 = 8192
const BIT15 = 16384
const BIT16 = 32768
const BIT17 = 65536
const BIT18 = 1 << 17
const BIT19 = 1 << 18
const BIT20 = 1 << 19
const BIT21 = 1 << 20
const BIT22 = 1 << 21
const BIT23 = 1 << 22
const BIT24 = 1 << 23
const BIT25 = 1 << 24
const BIT26 = 1 << 25
const BIT27 = 1 << 26
const BIT28 = 1 << 27
const BIT29 = 1 << 28
const BIT30 = 1 << 29
const BIT31 = 1 << 30
const BIT32 = 1 << 31

/**
 * First n bits activated.
 *
 * @type {number}
 */
const BITS0 = 0
const BITS1 = 1
const BITS2 = 3
const BITS3 = 7
const BITS4 = 15
const BITS5 = 31
const BITS6 = 63
const BITS7 = 127
const BITS8 = 255
const BITS9 = 511
const BITS10 = 1023
const BITS11 = 2047
const BITS12 = 4095
const BITS13 = 8191
const BITS14 = 16383
const BITS15 = 32767
const BITS16 = 65535
const BITS17 = BIT18 - 1
const BITS18 = BIT19 - 1
const BITS19 = BIT20 - 1
const BITS20 = BIT21 - 1
const BITS21 = BIT22 - 1
const BITS22 = BIT23 - 1
const BITS23 = BIT24 - 1
const BITS24 = BIT25 - 1
const BITS25 = BIT26 - 1
const BITS26 = BIT27 - 1
const BITS27 = BIT28 - 1
const BITS28 = BIT29 - 1
const BITS29 = BIT30 - 1
const BITS30 = BIT31 - 1
const BITS31 = 0x7FFFFFFF
const BITS32 = 0xFFFFFFFF


/***/ }),

/***/ "./node_modules/lib0/broadcastchannel.js":
/*!***********************************************!*\
  !*** ./node_modules/lib0/broadcastchannel.js ***!
  \***********************************************/
/*! exports provided: subscribe, unsubscribe, publish */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsubscribe", function() { return unsubscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return publish; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/lib0/map.js");
/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buffer.js */ "./node_modules/lib0/buffer.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage.js */ "./node_modules/lib0/storage.js");
/* eslint-env browser */

/**
 * Helpers for cross-tab communication using broadcastchannel with LocalStorage fallback.
 *
 * ```js
 * // In browser window A:
 * broadcastchannel.subscribe('my events', data => console.log(data))
 * broadcastchannel.publish('my events', 'Hello world!') // => A: 'Hello world!' fires synchronously in same tab
 *
 * // In browser window B:
 * broadcastchannel.publish('my events', 'hello from tab B') // => A: 'hello from tab B'
 * ```
 *
 * @module broadcastchannel
 */

// @todo before next major: use Uint8Array instead as buffer object





/**
 * @typedef {Object} Channel
 * @property {Set<Function>} Channel.subs
 * @property {any} Channel.bc
 */

/**
 * @type {Map<string, Channel>}
 */
const channels = new Map()

class LocalStoragePolyfill {
  /**
   * @param {string} room
   */
  constructor (room) {
    this.room = room
    /**
     * @type {null|function({data:ArrayBuffer}):void}
     */
    this.onmessage = null
    addEventListener('storage', e => e.key === room && this.onmessage !== null && this.onmessage({ data: _buffer_js__WEBPACK_IMPORTED_MODULE_1__["fromBase64"](e.newValue || '') }))
  }

  /**
   * @param {ArrayBuffer} buf
   */
  postMessage (buf) {
    _storage_js__WEBPACK_IMPORTED_MODULE_2__["varStorage"].setItem(this.room, _buffer_js__WEBPACK_IMPORTED_MODULE_1__["toBase64"](_buffer_js__WEBPACK_IMPORTED_MODULE_1__["createUint8ArrayFromArrayBuffer"](buf)))
  }
}

// Use BroadcastChannel or Polyfill
const BC = typeof BroadcastChannel === 'undefined' ? LocalStoragePolyfill : BroadcastChannel

/**
 * @param {string} room
 * @return {Channel}
 */
const getChannel = room =>
  _map_js__WEBPACK_IMPORTED_MODULE_0__["setIfUndefined"](channels, room, () => {
    const subs = new Set()
    const bc = new BC(room)
    /**
     * @param {{data:ArrayBuffer}} e
     */
    bc.onmessage = e => subs.forEach(sub => sub(e.data))
    return {
      bc, subs
    }
  })

/**
 * Subscribe to global `publish` events.
 *
 * @function
 * @param {string} room
 * @param {function(any):any} f
 */
const subscribe = (room, f) => getChannel(room).subs.add(f)

/**
 * Unsubscribe from `publish` global events.
 *
 * @function
 * @param {string} room
 * @param {function(any):any} f
 */
const unsubscribe = (room, f) => getChannel(room).subs.delete(f)

/**
 * Publish data to all subscribers (including subscribers on this tab)
 *
 * @function
 * @param {string} room
 * @param {any} data
 */
const publish = (room, data) => {
  const c = getChannel(room)
  c.bc.postMessage(data)
  c.subs.forEach(sub => sub(data))
}


/***/ }),

/***/ "./node_modules/lib0/buffer.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/buffer.js ***!
  \*************************************/
/*! exports provided: createUint8ArrayFromLen, createUint8ArrayViewFromArrayBuffer, createUint8ArrayFromArrayBuffer, toBase64, fromBase64, copyUint8Array */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUint8ArrayFromLen", function() { return createUint8ArrayFromLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUint8ArrayViewFromArrayBuffer", function() { return createUint8ArrayViewFromArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUint8ArrayFromArrayBuffer", function() { return createUint8ArrayFromArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toBase64", function() { return toBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromBase64", function() { return fromBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyUint8Array", function() { return copyUint8Array; });
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string.js */ "./node_modules/lib0/string.js");
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environment.js */ "./node_modules/lib0/environment.js");
/**
 * Utility functions to work with buffers (Uint8Array).
 *
 * @module buffer
 */




/**
 * @param {number} len
 */
const createUint8ArrayFromLen = len => new Uint8Array(len)

/**
 * Create Uint8Array with initial content from buffer
 *
 * @param {ArrayBuffer} buffer
 * @param {number} byteOffset
 * @param {number} length
 */
const createUint8ArrayViewFromArrayBuffer = (buffer, byteOffset, length) => new Uint8Array(buffer, byteOffset, length)

/**
 * Create Uint8Array with initial content from buffer
 *
 * @param {ArrayBuffer} buffer
 */
const createUint8ArrayFromArrayBuffer = buffer => new Uint8Array(buffer)

/* istanbul ignore next */
/**
 * @param {Uint8Array} bytes
 * @return {string}
 */
const toBase64Browser = bytes => {
  let s = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    s += _string_js__WEBPACK_IMPORTED_MODULE_0__["fromCharCode"](bytes[i])
  }
  // eslint-disable-next-line no-undef
  return btoa(s)
}

/**
 * @param {Uint8Array} bytes
 * @return {string}
 */
const toBase64Node = bytes => Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString('base64')

/* istanbul ignore next */
/**
 * @param {string} s
 * @return {Uint8Array}
 */
const fromBase64Browser = s => {
  // eslint-disable-next-line no-undef
  const a = atob(s)
  const bytes = createUint8ArrayFromLen(a.length)
  for (let i = 0; i < a.length; i++) {
    bytes[i] = a.charCodeAt(i)
  }
  return bytes
}

/**
 * @param {string} s
 */
const fromBase64Node = s => new Uint8Array(Buffer.from(s, 'base64').buffer)

/* istanbul ignore next */
const toBase64 = _environment_js__WEBPACK_IMPORTED_MODULE_1__["isBrowser"] ? toBase64Browser : toBase64Node

/* istanbul ignore next */
const fromBase64 = _environment_js__WEBPACK_IMPORTED_MODULE_1__["isBrowser"] ? fromBase64Browser : fromBase64Node

/**
 * Copy the content of an Uint8Array view to a new ArrayBuffer.
 *
 * @param {Uint8Array} uint8Array
 * @return {Uint8Array}
 */
const copyUint8Array = uint8Array => {
  const newBuf = createUint8ArrayFromLen(uint8Array.byteLength)
  newBuf.set(uint8Array)
  return newBuf
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/lib0/conditions.js":
/*!*****************************************!*\
  !*** ./node_modules/lib0/conditions.js ***!
  \*****************************************/
/*! exports provided: undefinedToNull */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "undefinedToNull", function() { return undefinedToNull; });
/**
 * Often used conditions.
 *
 * @module conditions
 */

/**
 * @template T
 * @param {T|null|undefined} v
 * @return {T|null}
 */
/* istanbul ignore next */
const undefinedToNull = v => v === undefined ? null : v


/***/ }),

/***/ "./node_modules/lib0/decoding.js":
/*!***************************************!*\
  !*** ./node_modules/lib0/decoding.js ***!
  \***************************************/
/*! exports provided: Decoder, createDecoder, hasContent, clone, readUint8Array, readVarUint8Array, readTailAsUint8Array, skip8, readUint8, readUint16, readUint32, peekUint8, peekUint16, peekUint32, readVarUint, readVarInt, peekVarUint, peekVarInt, readVarString, peekVarString, readFromDataView, readFloat32, readFloat64, readBigInt64, readBigUint64, readAny */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Decoder", function() { return Decoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDecoder", function() { return createDecoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasContent", function() { return hasContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readUint8Array", function() { return readUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readVarUint8Array", function() { return readVarUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readTailAsUint8Array", function() { return readTailAsUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skip8", function() { return skip8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readUint8", function() { return readUint8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readUint16", function() { return readUint16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readUint32", function() { return readUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekUint8", function() { return peekUint8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekUint16", function() { return peekUint16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekUint32", function() { return peekUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readVarUint", function() { return readVarUint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readVarInt", function() { return readVarInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekVarUint", function() { return peekVarUint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekVarInt", function() { return peekVarInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readVarString", function() { return readVarString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekVarString", function() { return peekVarString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readFromDataView", function() { return readFromDataView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readFloat32", function() { return readFloat32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readFloat64", function() { return readFloat64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readBigInt64", function() { return readBigInt64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readBigUint64", function() { return readBigUint64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readAny", function() { return readAny; });
/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buffer.js */ "./node_modules/lib0/buffer.js");
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binary.js */ "./node_modules/lib0/binary.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./string.js */ "./node_modules/lib0/string.js");
/**
 * Efficient schema-less binary decoding with support for variable length encoding.
 *
 * Use [lib0/decoding] with [lib0/encoding]. Every encoding function has a corresponding decoding function.
 *
 * Encodes numbers in little-endian order (least to most significant byte order)
 * and is compatible with Golang's binary encoding (https://golang.org/pkg/encoding/binary/)
 * which is also used in Protocol Buffers.
 *
 * ```js
 * // encoding step
 * const encoder = new encoding.createEncoder()
 * encoding.writeVarUint(encoder, 256)
 * encoding.writeVarString(encoder, 'Hello world!')
 * const buf = encoding.toUint8Array(encoder)
 * ```
 *
 * ```js
 * // decoding step
 * const decoder = new decoding.createDecoder(buf)
 * decoding.readVarUint(decoder) // => 256
 * decoding.readVarString(decoder) // => 'Hello world!'
 * decoding.hasContent(decoder) // => false - all data is read
 * ```
 *
 * @module decoding
 */





/**
 * A Decoder handles the decoding of an Uint8Array.
 */
class Decoder {
  /**
   * @param {Uint8Array} uint8Array Binary data to decode
   */
  constructor (uint8Array) {
    /**
     * Decoding target.
     *
     * @type {Uint8Array}
     */
    this.arr = uint8Array
    /**
     * Current decoding position.
     *
     * @type {number}
     */
    this.pos = 0
  }
}

/**
 * @function
 * @param {Uint8Array} uint8Array
 * @return {Decoder}
 */
const createDecoder = uint8Array => new Decoder(uint8Array)

/**
 * @function
 * @param {Decoder} decoder
 * @return {boolean}
 */
const hasContent = decoder => decoder.pos !== decoder.arr.length

/**
 * Clone a decoder instance.
 * Optionally set a new position parameter.
 *
 * @function
 * @param {Decoder} decoder The decoder instance
 * @param {number} [newPos] Defaults to current position
 * @return {Decoder} A clone of `decoder`
 */
const clone = (decoder, newPos = decoder.pos) => {
  const _decoder = createDecoder(decoder.arr)
  _decoder.pos = newPos
  return _decoder
}

/**
 * Create an Uint8Array view of the next `len` bytes and advance the position by `len`.
 *
 * Important: The Uint8Array still points to the underlying ArrayBuffer. Make sure to discard the result as soon as possible to prevent any memory leaks.
 *            Use `buffer.copyUint8Array` to copy the result into a new Uint8Array.
 *
 * @function
 * @param {Decoder} decoder The decoder instance
 * @param {number} len The length of bytes to read
 * @return {Uint8Array}
 */
const readUint8Array = (decoder, len) => {
  const view = _buffer_js__WEBPACK_IMPORTED_MODULE_0__["createUint8ArrayViewFromArrayBuffer"](decoder.arr.buffer, decoder.pos + decoder.arr.byteOffset, len)
  decoder.pos += len
  return view
}

/**
 * Read variable length Uint8Array.
 *
 * Important: The Uint8Array still points to the underlying ArrayBuffer. Make sure to discard the result as soon as possible to prevent any memory leaks.
 *            Use `buffer.copyUint8Array` to copy the result into a new Uint8Array.
 *
 * @function
 * @param {Decoder} decoder
 * @return {Uint8Array}
 */
const readVarUint8Array = decoder => readUint8Array(decoder, readVarUint(decoder))

/**
 * Read the rest of the content as an ArrayBuffer
 * @function
 * @param {Decoder} decoder
 * @return {Uint8Array}
 */
const readTailAsUint8Array = decoder => readUint8Array(decoder, decoder.arr.length - decoder.pos)

/**
 * Skip one byte, jump to the next position.
 * @function
 * @param {Decoder} decoder The decoder instance
 * @return {number} The next position
 */
const skip8 = decoder => decoder.pos++

/**
 * Read one byte as unsigned integer.
 * @function
 * @param {Decoder} decoder The decoder instance
 * @return {number} Unsigned 8-bit integer
 */
const readUint8 = decoder => decoder.arr[decoder.pos++]

/**
 * Read 2 bytes as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */
const readUint16 = decoder => {
  const uint =
    decoder.arr[decoder.pos] +
    (decoder.arr[decoder.pos + 1] << 8)
  decoder.pos += 2
  return uint
}

/**
 * Read 4 bytes as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */
const readUint32 = decoder => {
  const uint =
    (decoder.arr[decoder.pos] +
    (decoder.arr[decoder.pos + 1] << 8) +
    (decoder.arr[decoder.pos + 2] << 16) +
    (decoder.arr[decoder.pos + 3] << 24)) >>> 0
  decoder.pos += 4
  return uint
}

/**
 * Look ahead without incrementing position.
 * to the next byte and read it as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */
const peekUint8 = decoder => decoder.arr[decoder.pos]

/**
 * Look ahead without incrementing position.
 * to the next byte and read it as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */
const peekUint16 = decoder =>
  decoder.arr[decoder.pos] +
  (decoder.arr[decoder.pos + 1] << 8)

/**
 * Look ahead without incrementing position.
 * to the next byte and read it as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */
const peekUint32 = decoder => (
  decoder.arr[decoder.pos] +
  (decoder.arr[decoder.pos + 1] << 8) +
  (decoder.arr[decoder.pos + 2] << 16) +
  (decoder.arr[decoder.pos + 3] << 24)
) >>> 0

/**
 * Read unsigned integer (32bit) with variable length.
 * 1/8th of the storage is used as encoding overhead.
 *  * numbers < 2^7 is stored in one bytlength
 *  * numbers < 2^14 is stored in two bylength
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.length
 */
const readVarUint = decoder => {
  let num = 0
  let len = 0
  while (true) {
    const r = decoder.arr[decoder.pos++]
    num = num | ((r & _binary_js__WEBPACK_IMPORTED_MODULE_1__["BITS7"]) << len)
    len += 7
    if (r < _binary_js__WEBPACK_IMPORTED_MODULE_1__["BIT8"]) {
      return num >>> 0 // return unsigned number!
    }
    /* istanbul ignore if */
    if (len > 35) {
      throw new Error('Integer out of range!')
    }
  }
}

/**
 * Read signed integer (32bit) with variable length.
 * 1/8th of the storage is used as encoding overhead.
 *  * numbers < 2^7 is stored in one bytlength
 *  * numbers < 2^14 is stored in two bylength
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.length
 */
const readVarInt = decoder => {
  let r = decoder.arr[decoder.pos++]
  let num = r & _binary_js__WEBPACK_IMPORTED_MODULE_1__["BITS6"]
  let len = 6
  const sign = (r & _binary_js__WEBPACK_IMPORTED_MODULE_1__["BIT7"]) > 0 ? -1 : 1
  if ((r & _binary_js__WEBPACK_IMPORTED_MODULE_1__["BIT8"]) === 0) {
    // don't continue reading
    return sign * num
  }
  while (true) {
    r = decoder.arr[decoder.pos++]
    num = num | ((r & _binary_js__WEBPACK_IMPORTED_MODULE_1__["BITS7"]) << len)
    len += 7
    if (r < _binary_js__WEBPACK_IMPORTED_MODULE_1__["BIT8"]) {
      return sign * num
    }
    /* istanbul ignore if */
    if (len > 41) {
      throw new Error('Integer out of range!')
    }
  }
}

/**
 * Look ahead and read varUint without incrementing position
 *
 * @function
 * @param {Decoder} decoder
 * @return {number}
 */
const peekVarUint = decoder => {
  const pos = decoder.pos
  const s = readVarUint(decoder)
  decoder.pos = pos
  return s
}

/**
 * Look ahead and read varUint without incrementing position
 *
 * @function
 * @param {Decoder} decoder
 * @return {number}
 */
const peekVarInt = decoder => {
  const pos = decoder.pos
  const s = readVarInt(decoder)
  decoder.pos = pos
  return s
}

/**
 * Read string of variable length
 * * varUint is used to store the length of the string
 *
 * Transforming utf8 to a string is pretty expensive. The code performs 10x better
 * when String.fromCodePoint is fed with all characters as arguments.
 * But most environments have a maximum number of arguments per functions.
 * For effiency reasons we apply a maximum of 10000 characters at once.
 *
 * @function
 * @param {Decoder} decoder
 * @return {String} The read String.
 */
const readVarString = decoder =>
  _string_js__WEBPACK_IMPORTED_MODULE_2__["decodeUtf8"](readVarUint8Array(decoder))

/**
 * Look ahead and read varString without incrementing position
 *
 * @function
 * @param {Decoder} decoder
 * @return {string}
 */
const peekVarString = decoder => {
  const pos = decoder.pos
  const s = readVarString(decoder)
  decoder.pos = pos
  return s
}

/**
 * @param {Decoder} decoder
 * @param {number} len
 * @return {DataView}
 */
const readFromDataView = (decoder, len) => {
  const dv = new DataView(decoder.arr.buffer, decoder.arr.byteOffset + decoder.pos, len)
  decoder.pos += len
  return dv
}

/**
 * @param {Decoder} decoder
 */
const readFloat32 = decoder => readFromDataView(decoder, 4).getFloat32(0)

/**
 * @param {Decoder} decoder
 */
const readFloat64 = decoder => readFromDataView(decoder, 8).getFloat64(0)

/**
 * @param {Decoder} decoder
 */
const readBigInt64 = decoder => /** @type {any} */ (readFromDataView(decoder, 8)).getBigInt64(0)

/**
 * @param {Decoder} decoder
 */
const readBigUint64 = decoder => /** @type {any} */ (readFromDataView(decoder, 8)).getBigUint64(0)

/**
 * @type {Array<function(Decoder):any>}
 */
const readAnyLookupTable = [
  decoder => undefined, // CASE 127: undefined
  decoder => null, // CASE 126: null
  readVarInt, // CASE 125: integer
  readFloat32, // CASE 124: float32
  readFloat64, // CASE 123: float64
  readBigInt64, // CASE 122: bigint
  decoder => false, // CASE 121: boolean (false)
  decoder => true, // CASE 120: boolean (true)
  readVarString, // CASE 119: string
  decoder => { // CASE 118: object<string,any>
    const len = readVarUint(decoder)
    /**
     * @type {Object<string,any>}
     */
    const obj = {}
    for (let i = 0; i < len; i++) {
      const key = readVarString(decoder)
      obj[key] = readAny(decoder)
    }
    return obj
  },
  decoder => { // CASE 117: array<any>
    const len = readVarUint(decoder)
    const arr = []
    for (let i = 0; i < len; i++) {
      arr.push(readAny(decoder))
    }
    return arr
  },
  readVarUint8Array // CASE 116: Uint8Array
]

/**
 * @param {Decoder} decoder
 */
const readAny = decoder => readAnyLookupTable[127 - readUint8(decoder)](decoder)


/***/ }),

/***/ "./node_modules/lib0/encoding.js":
/*!***************************************!*\
  !*** ./node_modules/lib0/encoding.js ***!
  \***************************************/
/*! exports provided: Encoder, createEncoder, length, toUint8Array, write, set, writeUint8, setUint8, writeUint16, setUint16, writeUint32, setUint32, writeVarUint, writeVarInt, writeVarString, writeBinaryEncoder, writeUint8Array, writeVarUint8Array, writeOnDataView, writeFloat32, writeFloat64, writeBigInt64, writeBigUint64, writeAny */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Encoder", function() { return Encoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEncoder", function() { return createEncoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUint8Array", function() { return toUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "write", function() { return write; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeUint8", function() { return writeUint8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUint8", function() { return setUint8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeUint16", function() { return writeUint16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUint16", function() { return setUint16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeUint32", function() { return writeUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUint32", function() { return setUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeVarUint", function() { return writeVarUint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeVarInt", function() { return writeVarInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeVarString", function() { return writeVarString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeBinaryEncoder", function() { return writeBinaryEncoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeUint8Array", function() { return writeUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeVarUint8Array", function() { return writeVarUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeOnDataView", function() { return writeOnDataView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeFloat32", function() { return writeFloat32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeFloat64", function() { return writeFloat64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeBigInt64", function() { return writeBigInt64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeBigUint64", function() { return writeBigUint64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeAny", function() { return writeAny; });
/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buffer.js */ "./node_modules/lib0/buffer.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./number.js */ "./node_modules/lib0/number.js");
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./binary.js */ "./node_modules/lib0/binary.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./string.js */ "./node_modules/lib0/string.js");
/**
 * Efficient schema-less binary encoding with support for variable length encoding.
 *
 * Use [lib0/encoding] with [lib0/decoding]. Every encoding function has a corresponding decoding function.
 *
 * Encodes numbers in little-endian order (least to most significant byte order)
 * and is compatible with Golang's binary encoding (https://golang.org/pkg/encoding/binary/)
 * which is also used in Protocol Buffers.
 *
 * ```js
 * // encoding step
 * const encoder = new encoding.createEncoder()
 * encoding.writeVarUint(encoder, 256)
 * encoding.writeVarString(encoder, 'Hello world!')
 * const buf = encoding.toUint8Array(encoder)
 * ```
 *
 * ```js
 * // decoding step
 * const decoder = new decoding.createDecoder(buf)
 * decoding.readVarUint(decoder) // => 256
 * decoding.readVarString(decoder) // => 'Hello world!'
 * decoding.hasContent(decoder) // => false - all data is read
 * ```
 *
 * @module encoding
 */







/**
 * A BinaryEncoder handles the encoding to an Uint8Array.
 */
class Encoder {
  constructor () {
    this.cpos = 0
    this.cbuf = new Uint8Array(100)
    /**
     * @type {Array<Uint8Array>}
     */
    this.bufs = []
  }
}

/**
 * @function
 * @return {Encoder}
 */
const createEncoder = () => new Encoder()

/**
 * The current length of the encoded data.
 *
 * @function
 * @param {Encoder} encoder
 * @return {number}
 */
const length = encoder => {
  let len = encoder.cpos
  for (let i = 0; i < encoder.bufs.length; i++) {
    len += encoder.bufs[i].length
  }
  return len
}

/**
 * Transform to Uint8Array.
 *
 * @function
 * @param {Encoder} encoder
 * @return {Uint8Array} The created ArrayBuffer.
 */
const toUint8Array = encoder => {
  const uint8arr = new Uint8Array(length(encoder))
  let curPos = 0
  for (let i = 0; i < encoder.bufs.length; i++) {
    const d = encoder.bufs[i]
    uint8arr.set(d, curPos)
    curPos += d.length
  }
  uint8arr.set(_buffer_js__WEBPACK_IMPORTED_MODULE_0__["createUint8ArrayViewFromArrayBuffer"](encoder.cbuf.buffer, 0, encoder.cpos), curPos)
  return uint8arr
}

/**
 * Verify that it is possible to write `len` bytes wtihout checking. If
 * necessary, a new Buffer with the required length is attached.
 *
 * @param {Encoder} encoder
 * @param {number} len
 */
const verifyLen = (encoder, len) => {
  const bufferLen = encoder.cbuf.length
  if (bufferLen - encoder.cpos < len) {
    encoder.bufs.push(_buffer_js__WEBPACK_IMPORTED_MODULE_0__["createUint8ArrayViewFromArrayBuffer"](encoder.cbuf.buffer, 0, encoder.cpos))
    encoder.cbuf = new Uint8Array(_math_js__WEBPACK_IMPORTED_MODULE_1__["max"](bufferLen, len) * 2)
    encoder.cpos = 0
  }
}

/**
 * Write one byte to the encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The byte that is to be encoded.
 */
const write = (encoder, num) => {
  const bufferLen = encoder.cbuf.length
  if (encoder.cpos === bufferLen) {
    encoder.bufs.push(encoder.cbuf)
    encoder.cbuf = new Uint8Array(bufferLen * 2)
    encoder.cpos = 0
  }
  encoder.cbuf[encoder.cpos++] = num
}

/**
 * Write one byte at a specific position.
 * Position must already be written (i.e. encoder.length > pos)
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos Position to which to write data
 * @param {number} num Unsigned 8-bit integer
 */
const set = (encoder, pos, num) => {
  let buffer = null
  // iterate all buffers and adjust position
  for (let i = 0; i < encoder.bufs.length && buffer === null; i++) {
    const b = encoder.bufs[i]
    if (pos < b.length) {
      buffer = b // found buffer
    } else {
      pos -= b.length
    }
  }
  if (buffer === null) {
    // use current buffer
    buffer = encoder.cbuf
  }
  buffer[pos] = num
}

/**
 * Write one byte as an unsigned integer.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeUint8 = write

/**
 * Write one byte as an unsigned Integer at a specific location.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos The location where the data will be written.
 * @param {number} num The number that is to be encoded.
 */
const setUint8 = set

/**
 * Write two bytes as an unsigned integer.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeUint16 = (encoder, num) => {
  write(encoder, num & _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS8"])
  write(encoder, (num >>> 8) & _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS8"])
}
/**
 * Write two bytes as an unsigned integer at a specific location.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos The location where the data will be written.
 * @param {number} num The number that is to be encoded.
 */
const setUint16 = (encoder, pos, num) => {
  set(encoder, pos, num & _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS8"])
  set(encoder, pos + 1, (num >>> 8) & _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS8"])
}

/**
 * Write two bytes as an unsigned integer
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeUint32 = (encoder, num) => {
  for (let i = 0; i < 4; i++) {
    write(encoder, num & _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS8"])
    num >>>= 8
  }
}

/**
 * Write two bytes as an unsigned integer at a specific location.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos The location where the data will be written.
 * @param {number} num The number that is to be encoded.
 */
const setUint32 = (encoder, pos, num) => {
  for (let i = 0; i < 4; i++) {
    set(encoder, pos + i, num & _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS8"])
    num >>>= 8
  }
}

/**
 * Write a variable length unsigned integer.
 *
 * Encodes integers in the range from [0, 4294967295] / [0, 0xffffffff]. (max 32 bit unsigned integer)
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeVarUint = (encoder, num) => {
  while (num > _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS7"]) {
    write(encoder, _binary_js__WEBPACK_IMPORTED_MODULE_3__["BIT8"] | (_binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS7"] & num))
    num >>>= 7
  }
  write(encoder, _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS7"] & num)
}

/**
 * Write a variable length integer.
 *
 * Encodes integers in the range from [-2147483648, -2147483647].
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeVarInt = (encoder, num) => {
  let isNegative = false
  if (num < 0) {
    num = -num
    isNegative = true
  }
  //             |- whether to continue reading         |- whether is negative     |- number
  write(encoder, (num > _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS6"] ? _binary_js__WEBPACK_IMPORTED_MODULE_3__["BIT8"] : 0) | (isNegative ? _binary_js__WEBPACK_IMPORTED_MODULE_3__["BIT7"] : 0) | (_binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS6"] & num))
  num >>>= 6
  // We don't need to consider the case of num === 0 so we can use a different
  // pattern here than above.
  while (num > 0) {
    write(encoder, (num > _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS7"] ? _binary_js__WEBPACK_IMPORTED_MODULE_3__["BIT8"] : 0) | (_binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS7"] & num))
    num >>>= 7
  }
}

/**
 * Write a variable length string.
 *
 * @function
 * @param {Encoder} encoder
 * @param {String} str The string that is to be encoded.
 */
const writeVarString = (encoder, str) =>
  writeVarUint8Array(encoder, _string_js__WEBPACK_IMPORTED_MODULE_4__["encodeUtf8"](str))

/**
 * Write the content of another Encoder.
 *
 * TODO: can be improved!
 *
 * @function
 * @param {Encoder} encoder The enUint8Arr
 * @param {Encoder} append The BinaryEncoder to be written.
 */
const writeBinaryEncoder = (encoder, append) => writeUint8Array(encoder, toUint8Array(append))

/**
 * Append fixed-length Uint8Array to the encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {Uint8Array} uint8Array
 */
const writeUint8Array = (encoder, uint8Array) => {
  const bufferLen = encoder.cbuf.length
  const cpos = encoder.cpos
  const leftCopyLen = _math_js__WEBPACK_IMPORTED_MODULE_1__["min"](bufferLen - cpos, uint8Array.length)
  const rightCopyLen = uint8Array.length - leftCopyLen
  encoder.cbuf.set(uint8Array.subarray(0, leftCopyLen), cpos)
  encoder.cpos += leftCopyLen
  if (rightCopyLen > 0) {
    // Still something to write, write right half..
    // Append new buffer
    encoder.bufs.push(encoder.cbuf)
    // must have at least size of remaining buffer
    encoder.cbuf = new Uint8Array(_math_js__WEBPACK_IMPORTED_MODULE_1__["max"](bufferLen * 2, rightCopyLen))
    // copy array
    encoder.cbuf.set(uint8Array.subarray(leftCopyLen))
    encoder.cpos = rightCopyLen
  }
}

/**
 * Append an Uint8Array to Encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {Uint8Array} uint8Array
 */
const writeVarUint8Array = (encoder, uint8Array) => {
  writeVarUint(encoder, uint8Array.byteLength)
  writeUint8Array(encoder, uint8Array)
}

/**
 * Create an DataView of the next `len` bytes. Use it to write data after
 * calling this function.
 *
 * ```js
 * // write float32 using DataView
 * const dv = writeOnDataView(encoder, 4)
 * dv.setFloat32(0, 1.1)
 * // read float32 using DataView
 * const dv = readFromDataView(encoder, 4)
 * dv.getFloat32(0) // => 1.100000023841858 (leaving it to the reader to find out why this is the correct result)
 * ```
 *
 * @param {Encoder} encoder
 * @param {number} len
 * @return {DataView}
 */
const writeOnDataView = (encoder, len) => {
  verifyLen(encoder, len)
  const dview = new DataView(encoder.cbuf.buffer, encoder.cpos, len)
  encoder.cpos += len
  return dview
}

/**
 * @param {Encoder} encoder
 * @param {number} num
 */
const writeFloat32 = (encoder, num) => writeOnDataView(encoder, 4).setFloat32(0, num)

/**
 * @param {Encoder} encoder
 * @param {number} num
 */
const writeFloat64 = (encoder, num) => writeOnDataView(encoder, 8).setFloat64(0, num)

/**
 * @param {Encoder} encoder
 * @param {bigint} num
 */
const writeBigInt64 = (encoder, num) => /** @type {any} */ (writeOnDataView(encoder, 8)).setBigInt64(0, num)

/**
 * @param {Encoder} encoder
 * @param {bigint} num
 */
const writeBigUint64 = (encoder, num) => /** @type {any} */ (writeOnDataView(encoder, 8)).setBigUint64(0, num)

const floatTestBed = new DataView(new ArrayBuffer(4))
/**
 * Check if a number can be encoded as a 32 bit float.
 *
 * @param {number} num
 * @return {boolean}
 */
const isFloat32 = num => {
  floatTestBed.setFloat32(0, num)
  return floatTestBed.getFloat32(0) === num
}

/**
 * Encode data with efficient binary format.
 *
 * Differences to JSON:
 * • Transforms data to a binary format (not to a string)
 * • Encodes undefined, NaN, and ArrayBuffer (these can't be represented in JSON)
 * • Numbers are efficiently encoded either as a variable length integer, as a
 *   32 bit float, as a 64 bit float, or as a 64 bit bigint.
 *
 * Encoding table:
 *
 * | Data Type           | Prefix   | Encoding Method    | Comment |
 * | ------------------- | -------- | ------------------ | ------- |
 * | undefined           | 127      |                    | Functions, symbol, and everything that cannot be identified is encoded as undefined |
 * | null                | 126      |                    | |
 * | integer             | 125      | writeVarInt        | Only encodes 32 bit signed integers |
 * | float32             | 124      | writeFloat32       | |
 * | float64             | 123      | writeFloat64       | |
 * | bigint              | 122      | writeBigInt64      | |
 * | boolean (false)     | 121      |                    | True and false are different data types so we save the following byte |
 * | boolean (true)      | 120      |                    | - 0b01111000 so the last bit determines whether true or false |
 * | string              | 119      | writeVarString     | |
 * | object<string,any>  | 118      | custom             | Writes {length} then {length} key-value pairs |
 * | array<any>          | 117      | custom             | Writes {length} then {length} json values |
 * | Uint8Array          | 116      | writeVarUint8Array | We use Uint8Array for any kind of binary data |
 *
 * Reasons for the decreasing prefix:
 * We need the first bit for extendability (later we may want to encode the
 * prefix with writeVarUint). The remaining 7 bits are divided as follows:
 * [0-30]   the beginning of the data range is used for custom purposes
 *          (defined by the function that uses this library)
 * [31-127] the end of the data range is used for data encoding by
 *          lib0/encoding.js
 *
 * @param {Encoder} encoder
 * @param {undefined|null|number|bigint|boolean|string|Object<string,any>|Array<any>|Uint8Array} data
 */
const writeAny = (encoder, data) => {
  switch (typeof data) {
    case 'string':
      // TYPE 119: STRING
      write(encoder, 119)
      writeVarString(encoder, data)
      break
    case 'number':
      if (_number_js__WEBPACK_IMPORTED_MODULE_2__["isInteger"](data) && data <= _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS31"]) {
        // TYPE 125: INTEGER
        write(encoder, 125)
        writeVarInt(encoder, data)
      } else if (isFloat32(data)) {
        // TYPE 124: FLOAT32
        write(encoder, 124)
        writeFloat32(encoder, data)
      } else {
        // TYPE 123: FLOAT64
        write(encoder, 123)
        writeFloat64(encoder, data)
      }
      break
    case 'bigint':
      // TYPE 122: BigInt
      write(encoder, 122)
      writeBigInt64(encoder, data)
      break
    case 'object':
      if (data === null) {
        // TYPE 126: null
        write(encoder, 126)
      } else if (data instanceof Array) {
        // TYPE 117: Array
        write(encoder, 117)
        writeVarUint(encoder, data.length)
        for (let i = 0; i < data.length; i++) {
          writeAny(encoder, data[i])
        }
      } else if (data instanceof Uint8Array) {
        // TYPE 116: ArrayBuffer
        write(encoder, 116)
        writeVarUint8Array(encoder, data)
      } else {
        // TYPE 118: Object
        write(encoder, 118)
        const keys = Object.keys(data)
        writeVarUint(encoder, keys.length)
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          writeVarString(encoder, key)
          writeAny(encoder, data[key])
        }
      }
      break
    case 'boolean':
      // TYPE 120/121: boolean (true/false)
      write(encoder, data ? 120 : 121)
      break
    default:
      // TYPE 127: undefined
      write(encoder, 127)
  }
}


/***/ }),

/***/ "./node_modules/lib0/environment.js":
/*!******************************************!*\
  !*** ./node_modules/lib0/environment.js ***!
  \******************************************/
/*! exports provided: isNode, isBrowser, isMac, hasParam, getParam, getVariable, getConf, hasConf, production */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNode", function() { return isNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBrowser", function() { return isBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMac", function() { return isMac; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasParam", function() { return hasParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParam", function() { return getParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVariable", function() { return getVariable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConf", function() { return getConf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasConf", function() { return hasConf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "production", function() { return production; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/lib0/map.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./string.js */ "./node_modules/lib0/string.js");
/* harmony import */ var _conditions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conditions.js */ "./node_modules/lib0/conditions.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage.js */ "./node_modules/lib0/storage.js");
/**
 * Isomorphic module to work access the environment (query params, env variables).
 *
 * @module map
 */






/* istanbul ignore next */
// @ts-ignore
const isNode = typeof process !== 'undefined' && process.release && /node|io\.js/.test(process.release.name)
/* istanbul ignore next */
const isBrowser = typeof window !== 'undefined' && !isNode
/* istanbul ignore next */
const isMac = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false

/**
 * @type {Map<string,string>}
 */
let params
const args = []

/* istanbul ignore next */
const computeParams = () => {
  if (params === undefined) {
    if (isNode) {
      params = _map_js__WEBPACK_IMPORTED_MODULE_0__["create"]()
      const pargs = process.argv
      let currParamName = null
      /* istanbul ignore next */
      for (let i = 0; i < pargs.length; i++) {
        const parg = pargs[i]
        if (parg[0] === '-') {
          if (currParamName !== null) {
            params.set(currParamName, '')
          }
          currParamName = parg
        } else {
          if (currParamName !== null) {
            params.set(currParamName, parg)
            currParamName = null
          } else {
            args.push(parg)
          }
        }
      }
      if (currParamName !== null) {
        params.set(currParamName, '')
      }
    } else {
      params = _map_js__WEBPACK_IMPORTED_MODULE_0__["create"]()
      // eslint-disable-next-line no-undef
      ;(location.search || '?').slice(1).split('&').forEach(kv => {
        if (kv.length !== 0) {
          const [key, value] = kv.split('=')
          params.set(`--${_string_js__WEBPACK_IMPORTED_MODULE_1__["fromCamelCase"](key, '-')}`, value)
          params.set(`-${_string_js__WEBPACK_IMPORTED_MODULE_1__["fromCamelCase"](key, '-')}`, value)
        }
      })
    }
  }
  return params
}

/**
 * @param {string} name
 * @return {boolean}
 */
/* istanbul ignore next */
const hasParam = name => computeParams().has(name)

/**
 * @param {string} name
 * @param {string} defaultVal
 * @return {string}
 */
/* istanbul ignore next */
const getParam = (name, defaultVal) => computeParams().get(name) || defaultVal
// export const getArgs = name => computeParams() && args

/**
 * @param {string} name
 * @return {string|null}
 */
/* istanbul ignore next */
const getVariable = name => isNode ? _conditions_js__WEBPACK_IMPORTED_MODULE_2__["undefinedToNull"](process.env[name.toUpperCase()]) : _conditions_js__WEBPACK_IMPORTED_MODULE_2__["undefinedToNull"](_storage_js__WEBPACK_IMPORTED_MODULE_3__["varStorage"].getItem(name))

/**
 * @param {string} name
 * @return {string|null}
 */
const getConf = name => computeParams().get('--' + name) || getVariable(name)

/**
 * @param {string} name
 * @return {boolean}
 */
/* istanbul ignore next */
const hasConf = name => hasParam('--' + name) || getVariable(name) !== null

/* istanbul ignore next */
const production = hasConf('production')

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/lib0/error.js":
/*!************************************!*\
  !*** ./node_modules/lib0/error.js ***!
  \************************************/
/*! exports provided: create, methodUnimplemented, unexpectedCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "methodUnimplemented", function() { return methodUnimplemented; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unexpectedCase", function() { return unexpectedCase; });
/**
 * Error helpers.
 *
 * @module error
 */

/**
 * @param {string} s
 * @return {Error}
 */
/* istanbul ignore next */
const create = s => new Error(s)

/**
 * @throws {Error}
 * @return {never}
 */
/* istanbul ignore next */
const methodUnimplemented = () => {
  throw create('Method unimplemented')
}

/**
 * @throws {Error}
 * @return {never}
 */
/* istanbul ignore next */
const unexpectedCase = () => {
  throw create('Unexpected case')
}


/***/ }),

/***/ "./node_modules/lib0/function.js":
/*!***************************************!*\
  !*** ./node_modules/lib0/function.js ***!
  \***************************************/
/*! exports provided: callAll, nop, apply, id, equalityStrict, equalityFlat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callAll", function() { return callAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nop", function() { return nop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apply", function() { return apply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "id", function() { return id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalityStrict", function() { return equalityStrict; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalityFlat", function() { return equalityFlat; });
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array.js */ "./node_modules/lib0/array.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object.js */ "./node_modules/lib0/object.js");
/**
 * Common functions and function call helpers.
 *
 * @module function
 */




/**
 * Calls all functions in `fs` with args. Only throws after all functions were called.
 *
 * @param {Array<function>} fs
 * @param {Array<any>} args
 */
const callAll = (fs, args, i = 0) => {
  try {
    for (; i < fs.length; i++) {
      fs[i](...args)
    }
  } finally {
    if (i < fs.length) {
      callAll(fs, args, i + 1)
    }
  }
}

const nop = () => {}

/**
 * @template T
 * @param {function():T} f
 * @return {T}
 */
const apply = f => f()

/**
 * @template A
 *
 * @param {A} a
 * @return {A}
 */
const id = a => a

/**
 * @template T
 *
 * @param {T} a
 * @param {T} b
 * @return {boolean}
 */
const equalityStrict = (a, b) => a === b

/**
 * @template T
 *
 * @param {Array<T>|object} a
 * @param {Array<T>|object} b
 * @return {boolean}
 */
const equalityFlat = (a, b) => a === b || (a != null && b != null && a.constructor === b.constructor && ((a instanceof Array && _array_js__WEBPACK_IMPORTED_MODULE_0__["equalFlat"](a, /** @type {Array<T>} */ (b))) || (typeof a === 'object' && _object_js__WEBPACK_IMPORTED_MODULE_1__["equalFlat"](a, b))))


/***/ }),

/***/ "./node_modules/lib0/isomorphic.js":
/*!*****************************************!*\
  !*** ./node_modules/lib0/isomorphic.js ***!
  \*****************************************/
/*! exports provided: performance, cryptoRandomBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "performance", function() { return performance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cryptoRandomBuffer", function() { return cryptoRandomBuffer; });
/* harmony import */ var isomorphic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! isomorphic.js */ "./node_modules/isomorphic.js/iso-browser.js");
/* harmony import */ var isomorphic_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(isomorphic_js__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Isomorphic library exports from isomorphic.js.
 *
 * @module isomorphic
 */

// @ts-ignore


const performance = /** @type {any} */ (isomorphic_js__WEBPACK_IMPORTED_MODULE_0___default.a.performance)
const cryptoRandomBuffer = /** @type {any} */ (isomorphic_js__WEBPACK_IMPORTED_MODULE_0___default.a.cryptoRandomBuffer)


/***/ }),

/***/ "./node_modules/lib0/iterator.js":
/*!***************************************!*\
  !*** ./node_modules/lib0/iterator.js ***!
  \***************************************/
/*! exports provided: mapIterator, createIterator, iteratorFilter, iteratorMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapIterator", function() { return mapIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIterator", function() { return createIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iteratorFilter", function() { return iteratorFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iteratorMap", function() { return iteratorMap; });
/**
 * Utility module to create and manipulate Iterators.
 *
 * @module iterator
 */

/**
 * @template T,R
 * @param {Iterator<T>} iterator
 * @param {function(T):R} f
 * @return {IterableIterator<R>}
 */
const mapIterator = (iterator, f) => ({
  /**
   * @param {function(T):R} f
   */
  [Symbol.iterator] () {
    return this
  },
  // @ts-ignore
  next () {
    const r = iterator.next()
    return { value: r.done ? undefined : f(r.value), done: r.done }
  }
})

/**
 * @template T
 * @param {function():IteratorResult<T>} next
 * @return {IterableIterator<T>}
 */
const createIterator = next => ({
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator] () {
    return this
  },
  // @ts-ignore
  next
})

/**
 * @template T
 * @param {Iterator<T>} iterator
 * @param {function(T):boolean} filter
 */
const iteratorFilter = (iterator, filter) => createIterator(() => {
  let res
  do {
    res = iterator.next()
  } while (!res.done && !filter(res.value))
  return res
})

/**
 * @template T,M
 * @param {Iterator<T>} iterator
 * @param {function(T):M} fmap
 */
const iteratorMap = (iterator, fmap) => createIterator(() => {
  const { done, value } = iterator.next()
  return { done, value: done ? undefined : fmap(value) }
})


/***/ }),

/***/ "./node_modules/lib0/map.js":
/*!**********************************!*\
  !*** ./node_modules/lib0/map.js ***!
  \**********************************/
/*! exports provided: create, copy, setIfUndefined, map, any, all */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIfUndefined", function() { return setIfUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "any", function() { return any; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return all; });
/**
 * Utility module to work with key-value stores.
 *
 * @module map
 */

/**
 * Creates a new Map instance.
 *
 * @function
 * @return {Map<any, any>}
 *
 * @function
 */
const create = () => new Map()

/**
 * Copy a Map object into a fresh Map object.
 *
 * @function
 * @template X,Y
 * @param {Map<X,Y>} m
 * @return {Map<X,Y>}
 */
const copy = m => {
  const r = create()
  m.forEach((v, k) => { r.set(k, v) })
  return r
}

/**
 * Get map property. Create T if property is undefined and set T on map.
 *
 * ```js
 * const listeners = map.setIfUndefined(events, 'eventName', set.create)
 * listeners.add(listener)
 * ```
 *
 * @function
 * @template T,K
 * @param {Map<K, T>} map
 * @param {K} key
 * @param {function():T} createT
 * @return {T}
 */
const setIfUndefined = (map, key, createT) => {
  let set = map.get(key)
  if (set === undefined) {
    map.set(key, set = createT())
  }
  return set
}

/**
 * Creates an Array and populates it with the content of all key-value pairs using the `f(value, key)` function.
 *
 * @function
 * @template K
 * @template V
 * @template R
 * @param {Map<K,V>} m
 * @param {function(V,K):R} f
 * @return {Array<R>}
 */
const map = (m, f) => {
  const res = []
  for (const [key, value] of m) {
    res.push(f(value, key))
  }
  return res
}

/**
 * Tests whether any key-value pairs pass the test implemented by `f(value, key)`.
 *
 * @todo should rename to some - similarly to Array.some
 *
 * @function
 * @template K
 * @template V
 * @param {Map<K,V>} m
 * @param {function(V,K):boolean} f
 * @return {boolean}
 */
const any = (m, f) => {
  for (const [key, value] of m) {
    if (f(value, key)) {
      return true
    }
  }
  return false
}

/**
 * Tests whether all key-value pairs pass the test implemented by `f(value, key)`.
 *
 * @function
 * @template K
 * @template V
 * @param {Map<K,V>} m
 * @param {function(V,K):boolean} f
 * @return {boolean}
 */
const all = (m, f) => {
  for (const [key, value] of m) {
    if (!f(value, key)) {
      return false
    }
  }
  return true
}


/***/ }),

/***/ "./node_modules/lib0/math.js":
/*!***********************************!*\
  !*** ./node_modules/lib0/math.js ***!
  \***********************************/
/*! exports provided: floor, ceil, abs, imul, round, log10, log2, log, sqrt, add, min, max, isNaN, pow, exp10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abs", function() { return abs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imul", function() { return imul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log10", function() { return log10; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log2", function() { return log2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrt", function() { return sqrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNaN", function() { return isNaN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pow", function() { return pow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exp10", function() { return exp10; });
/**
 * Common Math expressions.
 *
 * @module math
 */

const floor = Math.floor
const ceil = Math.ceil
const abs = Math.abs
const imul = Math.imul
const round = Math.round
const log10 = Math.log10
const log2 = Math.log2
const log = Math.log
const sqrt = Math.sqrt

/**
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number} The sum of a and b
 */
const add = (a, b) => a + b

/**
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number} The smaller element of a and b
 */
const min = (a, b) => a < b ? a : b

/**
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number} The bigger element of a and b
 */
const max = (a, b) => a > b ? a : b

const isNaN = Number.isNaN

const pow = Math.pow
/**
 * Base 10 exponential function. Returns the value of 10 raised to the power of pow.
 *
 * @param {number} exp
 * @return {number}
 */
const exp10 = exp => Math.pow(10, exp)


/***/ }),

/***/ "./node_modules/lib0/metric.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/metric.js ***!
  \*************************************/
/*! exports provided: yotta, zetta, exa, peta, tera, giga, mega, kilo, hecto, deca, deci, centi, milli, micro, nano, pico, femto, atto, zepto, yocto, prefix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yotta", function() { return yotta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zetta", function() { return zetta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exa", function() { return exa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peta", function() { return peta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tera", function() { return tera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "giga", function() { return giga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mega", function() { return mega; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kilo", function() { return kilo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hecto", function() { return hecto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deca", function() { return deca; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deci", function() { return deci; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "centi", function() { return centi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "milli", function() { return milli; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "micro", function() { return micro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nano", function() { return nano; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pico", function() { return pico; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "femto", function() { return femto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atto", function() { return atto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zepto", function() { return zepto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yocto", function() { return yocto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefix", function() { return prefix; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/lib0/math.js");
/**
 * Utility module to convert metric values.
 *
 * @module metric
 */



const yotta = 1e24
const zetta = 1e21
const exa = 1e18
const peta = 1e15
const tera = 1e12
const giga = 1e9
const mega = 1e6
const kilo = 1e3
const hecto = 1e2
const deca = 10
const deci = 0.1
const centi = 0.01
const milli = 1e-3
const micro = 1e-6
const nano = 1e-9
const pico = 1e-12
const femto = 1e-15
const atto = 1e-18
const zepto = 1e-21
const yocto = 1e-24

const prefixUp = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
const prefixDown = ['', 'm', 'μ', 'n', 'p', 'f', 'a', 'z', 'y']

/**
 * Calculate the metric prefix for a number. Assumes E.g. `prefix(1000) = { n: 1, prefix: 'k' }`
 *
 * @param {number} n
 * @param {number} [baseMultiplier] Multiplier of the base (10^(3*baseMultiplier)). E.g. `convert(time, -3)` if time is already in milli seconds
 * @return {{n:number,prefix:string}}
 */
const prefix = (n, baseMultiplier = 0) => {
  const nPow = n === 0 ? 0 : _math_js__WEBPACK_IMPORTED_MODULE_0__["log10"](n)
  let mult = 0
  while (nPow < mult * 3 && baseMultiplier > -8) {
    baseMultiplier--
    mult--
  }
  while (nPow >= 3 + mult * 3 && baseMultiplier < 8) {
    baseMultiplier++
    mult++
  }
  const prefix = baseMultiplier < 0 ? prefixDown[-baseMultiplier] : prefixUp[baseMultiplier]
  return {
    n: _math_js__WEBPACK_IMPORTED_MODULE_0__["round"]((mult > 0 ? n / _math_js__WEBPACK_IMPORTED_MODULE_0__["exp10"](mult * 3) : n * _math_js__WEBPACK_IMPORTED_MODULE_0__["exp10"](mult * -3)) * 1e12) / 1e12,
    prefix
  }
}


/***/ }),

/***/ "./node_modules/lib0/mutex.js":
/*!************************************!*\
  !*** ./node_modules/lib0/mutex.js ***!
  \************************************/
/*! exports provided: createMutex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMutex", function() { return createMutex; });
/**
 * Mutual exclude for JavaScript.
 *
 * @module mutex
 */

/**
 * @callback mutex
 * @param {function():void} cb Only executed when this mutex is not in the current stack
 * @param {function():void} [elseCb] Executed when this mutex is in the current stack
 */

/**
 * Creates a mutual exclude function with the following property:
 *
 * ```js
 * const mutex = createMutex()
 * mutex(() => {
 *   // This function is immediately executed
 *   mutex(() => {
 *     // This function is not executed, as the mutex is already active.
 *   })
 * })
 * ```
 *
 * @return {mutex} A mutual exclude function
 * @public
 */
const createMutex = () => {
  let token = true
  return (f, g) => {
    if (token) {
      token = false
      try {
        f()
      } finally {
        token = true
      }
    } else if (g !== undefined) {
      g()
    }
  }
}


/***/ }),

/***/ "./node_modules/lib0/number.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/number.js ***!
  \*************************************/
/*! exports provided: MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, LOWEST_INT32, HIGHEST_INT32, isInteger, isNaN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_SAFE_INTEGER", function() { return MAX_SAFE_INTEGER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_SAFE_INTEGER", function() { return MIN_SAFE_INTEGER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOWEST_INT32", function() { return LOWEST_INT32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HIGHEST_INT32", function() { return HIGHEST_INT32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInteger", function() { return isInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNaN", function() { return isNaN; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binary.js */ "./node_modules/lib0/binary.js");
/**
 * Utility helpers for working with numbers.
 *
 * @module number
 */




const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER
const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER

const LOWEST_INT32 = 1 << 31
const HIGHEST_INT32 = _binary_js__WEBPACK_IMPORTED_MODULE_1__["BITS31"]

/**
 * @module number
 */

/* istanbul ignore next */
const isInteger = Number.isInteger || (num => typeof num === 'number' && isFinite(num) && _math_js__WEBPACK_IMPORTED_MODULE_0__["floor"](num) === num)
const isNaN = Number.isNaN


/***/ }),

/***/ "./node_modules/lib0/object.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/object.js ***!
  \*************************************/
/*! exports provided: create, assign, keys, forEach, map, length, some, every, hasProperty, equalFlat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "some", function() { return some; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "every", function() { return every; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasProperty", function() { return hasProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalFlat", function() { return equalFlat; });
/**
 * Utility functions for working with EcmaScript objects.
 *
 * @module object
 */

/**
 * @return {Object<string,any>} obj
 */
const create = () => Object.create(null)

/**
 * Object.assign
 */
const assign = Object.assign

/**
 * @param {Object<string,any>} obj
 */
const keys = Object.keys

/**
 * @param {Object<string,any>} obj
 * @param {function(any,string):any} f
 */
const forEach = (obj, f) => {
  for (const key in obj) {
    f(obj[key], key)
  }
}

/**
 * @template R
 * @param {Object<string,any>} obj
 * @param {function(any,string):R} f
 * @return {Array<R>}
 */
const map = (obj, f) => {
  const results = []
  for (const key in obj) {
    results.push(f(obj[key], key))
  }
  return results
}

/**
 * @param {Object<string,any>} obj
 * @return {number}
 */
const length = obj => keys(obj).length

/**
 * @param {Object<string,any>} obj
 * @param {function(any,string):boolean} f
 * @return {boolean}
 */
const some = (obj, f) => {
  for (const key in obj) {
    if (f(obj[key], key)) {
      return true
    }
  }
  return false
}

/**
 * @param {Object<string,any>} obj
 * @param {function(any,string):boolean} f
 * @return {boolean}
 */
const every = (obj, f) => {
  for (const key in obj) {
    if (!f(obj[key], key)) {
      return false
    }
  }
  return true
}

/**
 * Calls `Object.prototype.hasOwnProperty`.
 *
 * @param {any} obj
 * @param {string|symbol} key
 * @return {boolean}
 */
const hasProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

/**
 * @param {Object<string,any>} a
 * @param {Object<string,any>} b
 * @return {boolean}
 */
const equalFlat = (a, b) => a === b || (length(a) === length(b) && every(a, (val, key) => (val !== undefined || hasProperty(b, key)) && b[key] === val))


/***/ }),

/***/ "./node_modules/lib0/observable.js":
/*!*****************************************!*\
  !*** ./node_modules/lib0/observable.js ***!
  \*****************************************/
/*! exports provided: Observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return Observable; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/lib0/map.js");
/* harmony import */ var _set_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./set.js */ "./node_modules/lib0/set.js");
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array.js */ "./node_modules/lib0/array.js");
/**
 * Observable class prototype.
 *
 * @module observable
 */





/**
 * Handles named events.
 *
 * @template N
 */
class Observable {
  constructor () {
    /**
     * Some desc.
     * @type {Map<N, any>}
     */
    this._observers = _map_js__WEBPACK_IMPORTED_MODULE_0__["create"]()
  }

  /**
   * @param {N} name
   * @param {function} f
   */
  on (name, f) {
    _map_js__WEBPACK_IMPORTED_MODULE_0__["setIfUndefined"](this._observers, name, _set_js__WEBPACK_IMPORTED_MODULE_1__["create"]).add(f)
  }

  /**
   * @param {N} name
   * @param {function} f
   */
  once (name, f) {
    /**
     * @param  {...any} args
     */
    const _f = (...args) => {
      this.off(name, f)
      f(...args)
    }
    this.on(name, _f)
  }

  /**
   * @param {N} name
   * @param {function} f
   */
  off (name, f) {
    const observers = this._observers.get(name)
    if (observers !== undefined) {
      observers.delete(f)
      if (observers.size === 0) {
        this._observers.delete(name)
      }
    }
  }

  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @param {N} name The event name.
   * @param {Array<any>} args The arguments that are applied to the event listener.
   */
  emit (name, args) {
    // copy all listeners to an array first to make sure that no event is emitted to listeners that are subscribed while the event handler is called.
    return _array_js__WEBPACK_IMPORTED_MODULE_2__["from"]((this._observers.get(name) || _map_js__WEBPACK_IMPORTED_MODULE_0__["create"]()).values()).forEach(f => f(...args))
  }

  destroy () {
    this._observers = _map_js__WEBPACK_IMPORTED_MODULE_0__["create"]()
  }
}


/***/ }),

/***/ "./node_modules/lib0/random.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/random.js ***!
  \*************************************/
/*! exports provided: rand, uint32, oneOf, uuidv4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rand", function() { return rand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uint32", function() { return uint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "oneOf", function() { return oneOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uuidv4", function() { return uuidv4; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var _isomorphic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isomorphic.js */ "./node_modules/lib0/isomorphic.js");

/**
 * Isomorphic module for true random numbers / buffers / uuids.
 *
 * Attention: falls back to Math.random if the browser does not support crypto.
 *
 * @module random
 */




const rand = Math.random

/* istanbul ignore next */
const uint32 = () => new Uint32Array(Object(_isomorphic_js__WEBPACK_IMPORTED_MODULE_1__["cryptoRandomBuffer"])(4))[0]

/**
 * @template T
 * @param {Array<T>} arr
 * @return {T}
 */
const oneOf = arr => arr[_math_js__WEBPACK_IMPORTED_MODULE_0__["floor"](rand() * arr.length)]

// @ts-ignore
const uuidv4Template = [1e7] + -1e3 + -4e3 + -8e3 + -1e11
const uuidv4 = () => uuidv4Template.replace(/[018]/g, /** @param {number} c */ c =>
  (c ^ uint32() & 15 >> c / 4).toString(16)
)


/***/ }),

/***/ "./node_modules/lib0/set.js":
/*!**********************************!*\
  !*** ./node_modules/lib0/set.js ***!
  \**********************************/
/*! exports provided: create, toArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/**
 * Utility module to work with sets.
 *
 * @module set
 */

const create = () => new Set()

/**
 * @template T
 * @param {Set<T>} set
 * @return {Array<T>}
 */
const toArray = set => Array.from(set)


/***/ }),

/***/ "./node_modules/lib0/storage.js":
/*!**************************************!*\
  !*** ./node_modules/lib0/storage.js ***!
  \**************************************/
/*! exports provided: varStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "varStorage", function() { return varStorage; });
/* global localStorage */

/**
 * Isomorphic variable storage.
 *
 * Uses LocalStorage in the browser and falls back to in-memory storage.
 *
 * @module storage
 */

/* istanbul ignore next */
class VarStoragePolyfill {
  constructor () {
    this.map = new Map()
  }

  /**
   * @param {string} key
   * @param {any} value
   */
  setItem (key, value) {
    this.map.set(key, value)
  }

  /**
   * @param {string} key
   */
  getItem (key) {
    return this.map.get(key)
  }
}

/* istanbul ignore next */
/**
 * @type {any}
 */
let _localStorage = new VarStoragePolyfill()

try {
  // if the same-origin rule is violated, accessing localStorage might thrown an error
  /* istanbul ignore next */
  if (typeof localStorage !== 'undefined') {
    _localStorage = localStorage
  }
} catch (e) { }

/* istanbul ignore next */
/**
 * This is basically localStorage in browser, or a polyfill in nodejs
 */
const varStorage = _localStorage


/***/ }),

/***/ "./node_modules/lib0/string.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/string.js ***!
  \*************************************/
/*! exports provided: fromCharCode, fromCodePoint, trimLeft, fromCamelCase, utf8ByteLength, _encodeUtf8Polyfill, utf8TextEncoder, _encodeUtf8Native, encodeUtf8, _decodeUtf8Polyfill, utf8TextDecoder, _decodeUtf8Native, decodeUtf8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromCharCode", function() { return fromCharCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromCodePoint", function() { return fromCodePoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimLeft", function() { return trimLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromCamelCase", function() { return fromCamelCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utf8ByteLength", function() { return utf8ByteLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_encodeUtf8Polyfill", function() { return _encodeUtf8Polyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utf8TextEncoder", function() { return utf8TextEncoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_encodeUtf8Native", function() { return _encodeUtf8Native; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeUtf8", function() { return encodeUtf8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_decodeUtf8Polyfill", function() { return _decodeUtf8Polyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utf8TextDecoder", function() { return utf8TextDecoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_decodeUtf8Native", function() { return _decodeUtf8Native; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeUtf8", function() { return decodeUtf8; });
/**
 * Utility module to work with strings.
 *
 * @module string
 */

const fromCharCode = String.fromCharCode
const fromCodePoint = String.fromCodePoint

/**
 * @param {string} s
 * @return {string}
 */
const toLowerCase = s => s.toLowerCase()

const trimLeftRegex = /^\s*/g

/**
 * @param {string} s
 * @return {string}
 */
const trimLeft = s => s.replace(trimLeftRegex, '')

const fromCamelCaseRegex = /([A-Z])/g

/**
 * @param {string} s
 * @param {string} separator
 * @return {string}
 */
const fromCamelCase = (s, separator) => trimLeft(s.replace(fromCamelCaseRegex, match => `${separator}${toLowerCase(match)}`))

/**
 * Compute the utf8ByteLength
 * @param {string} str
 * @return {number}
 */
const utf8ByteLength = str => unescape(encodeURIComponent(str)).length

/**
 * @param {string} str
 * @return {Uint8Array}
 */
const _encodeUtf8Polyfill = str => {
  const encodedString = unescape(encodeURIComponent(str))
  const len = encodedString.length
  const buf = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    buf[i] = /** @type {number} */ (encodedString.codePointAt(i))
  }
  return buf
}

/* istanbul ignore next */
const utf8TextEncoder = /** @type {TextEncoder} */ (typeof TextEncoder !== 'undefined' ? new TextEncoder() : null)

/**
 * @param {string} str
 * @return {Uint8Array}
 */
const _encodeUtf8Native = str => utf8TextEncoder.encode(str)

/**
 * @param {string} str
 * @return {Uint8Array}
 */
/* istanbul ignore next */
const encodeUtf8 = utf8TextEncoder ? _encodeUtf8Native : _encodeUtf8Polyfill

/**
 * @param {Uint8Array} buf
 * @return {string}
 */
const _decodeUtf8Polyfill = buf => {
  let remainingLen = buf.length
  let encodedString = ''
  let bufPos = 0
  while (remainingLen > 0) {
    const nextLen = remainingLen < 10000 ? remainingLen : 10000
    const bytes = new Array(nextLen)
    for (let i = 0; i < nextLen; i++) {
      bytes[i] = buf[bufPos++]
    }
    encodedString += String.fromCodePoint.apply(null, bytes)
    remainingLen -= nextLen
  }
  return decodeURIComponent(escape(encodedString))
}

/* istanbul ignore next */
const utf8TextDecoder = typeof TextDecoder === 'undefined' ? null : new TextDecoder('utf-8', { fatal: true, ignoreBOM: true })

/**
 * @param {Uint8Array} buf
 * @return {string}
 */
const _decodeUtf8Native = buf => /** @type {TextDecoder} */ (utf8TextDecoder).decode(buf)

/**
 * @param {Uint8Array} buf
 * @return {string}
 */
/* istanbul ignore next */
const decodeUtf8 = utf8TextDecoder ? _decodeUtf8Native : _decodeUtf8Polyfill


/***/ }),

/***/ "./node_modules/lib0/time.js":
/*!***********************************!*\
  !*** ./node_modules/lib0/time.js ***!
  \***********************************/
/*! exports provided: getDate, getUnixTime, humanizeDuration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDate", function() { return getDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnixTime", function() { return getUnixTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanizeDuration", function() { return humanizeDuration; });
/* harmony import */ var _metric_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metric.js */ "./node_modules/lib0/metric.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/lib0/math.js");
/**
 * Utility module to work with time.
 *
 * @module time
 */




/**
 * Return current time.
 *
 * @return {Date}
 */
const getDate = () => new Date()

/**
 * Return current unix time.
 *
 * @return {number}
 */
const getUnixTime = Date.now

/**
 * Transform time (in ms) to a human readable format. E.g. 1100 => 1.1s. 60s => 1min. .001 => 10μs.
 *
 * @param {number} d duration in milliseconds
 * @return {string} humanized approximation of time
 */
const humanizeDuration = d => {
  if (d < 60000) {
    const p = _metric_js__WEBPACK_IMPORTED_MODULE_0__["prefix"](d, -1)
    return _math_js__WEBPACK_IMPORTED_MODULE_1__["round"](p.n * 100) / 100 + p.prefix + 's'
  }
  d = _math_js__WEBPACK_IMPORTED_MODULE_1__["floor"](d / 1000)
  const seconds = d % 60
  const minutes = _math_js__WEBPACK_IMPORTED_MODULE_1__["floor"](d / 60) % 60
  const hours = _math_js__WEBPACK_IMPORTED_MODULE_1__["floor"](d / 3600) % 24
  const days = _math_js__WEBPACK_IMPORTED_MODULE_1__["floor"](d / 86400)
  if (days > 0) {
    return days + 'd' + ((hours > 0 || minutes > 30) ? ' ' + (minutes > 30 ? hours + 1 : hours) + 'h' : '')
  }
  if (hours > 0) {
    /* istanbul ignore next */
    return hours + 'h' + ((minutes > 0 || seconds > 30) ? ' ' + (seconds > 30 ? minutes + 1 : minutes) + 'min' : '')
  }
  return minutes + 'min' + (seconds > 0 ? ' ' + seconds + 's' : '')
}


/***/ }),

/***/ "./node_modules/lib0/url.js":
/*!**********************************!*\
  !*** ./node_modules/lib0/url.js ***!
  \**********************************/
/*! exports provided: decodeQueryParams, encodeQueryParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeQueryParams", function() { return decodeQueryParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeQueryParams", function() { return encodeQueryParams; });
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object.js */ "./node_modules/lib0/object.js");
/**
 * Utility module to work with urls.
 *
 * @module url
 */



/**
 * Parse query parameters from an url.
 *
 * @param {string} url
 * @return {Object<string,string>}
 */
const decodeQueryParams = url => {
  /**
   * @type {Object<string,string>}
   */
  const query = {}
  const urlQuerySplit = url.split('?')
  const pairs = urlQuerySplit[urlQuerySplit.length - 1].split('&')
  for (var i = 0; i < pairs.length; i++) {
    const item = pairs[i]
    if (item.length > 0) {
      const pair = item.split('=')
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
    }
  }
  return query
}

/**
 * @param {Object<string,string>} params
 * @return {string}
 */
const encodeQueryParams = params =>
  _object_js__WEBPACK_IMPORTED_MODULE_0__["map"](params, (val, key) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&')


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/quill-cursors/dist/quill-cursors.js":
/*!**********************************************************!*\
  !*** ./node_modules/quill-cursors/dist/quill-cursors.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(window,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(6),i=function(){function t(t,e,n){this.id=t,this.name=e,this.color=n}return t.prototype.build=function(e){var n=document.createElement(t.CONTAINER_ELEMENT_TAG);n.classList.add(t.CURSOR_CLASS),n.id="ql-cursor-"+this.id,n.innerHTML=e.template;var r=n.getElementsByClassName(t.SELECTION_CLASS)[0],i=n.getElementsByClassName(t.CARET_CONTAINER_CLASS)[0],o=i.getElementsByClassName(t.CARET_CLASS)[0],s=n.getElementsByClassName(t.FLAG_CLASS)[0];return s.style.backgroundColor=this.color,o.style.backgroundColor=this.color,n.getElementsByClassName(t.NAME_CLASS)[0].textContent=this.name,this._hideDelay=e.hideDelayMs+"ms",this._hideSpeedMs=e.hideSpeedMs,this._positionFlag=e.positionFlag,s.style.transitionDelay=this._hideDelay,s.style.transitionDuration=this._hideSpeedMs+"ms",this._el=n,this._selectionEl=r,this._caretEl=i,this._flagEl=s,this._el},t.prototype.show=function(){this._el.classList.remove(t.HIDDEN_CLASS)},t.prototype.hide=function(){this._el.classList.add(t.HIDDEN_CLASS)},t.prototype.remove=function(){this._el.parentNode.removeChild(this._el)},t.prototype.toggleFlag=function(e){var n=this;this._flagEl.classList.toggle(t.SHOW_FLAG_CLASS,e)||(this._flagEl.classList.add(t.NO_DELAY_CLASS),setTimeout((function(){return n._flagEl.classList.remove(t.NO_DELAY_CLASS)}),this._hideSpeedMs))},t.prototype.updateCaret=function(t,e){this._caretEl.style.top=t.top+"px",this._caretEl.style.left=t.left+"px",this._caretEl.style.height=t.height+"px",this._positionFlag?this._positionFlag(this._flagEl,t,e):this._updateCaretFlag(t,e)},t.prototype.updateSelection=function(t,e){var n=this;this._clearSelection(),t=t||[],t=Array.from(t),t=this._sanitize(t),(t=this._sortByDomPosition(t)).forEach((function(t){return n._addSelection(t,e)}))},t.prototype._updateCaretFlag=function(e,n){this._flagEl.style.width="";var r=this._flagEl.getBoundingClientRect();this._flagEl.classList.remove(t.FLAG_FLIPPED_CLASS),e.left>n.width-r.width&&this._flagEl.classList.add(t.FLAG_FLIPPED_CLASS),this._flagEl.style.left=e.left+"px",this._flagEl.style.top=e.top+"px",this._flagEl.style.width=Math.ceil(r.width)+"px"},t.prototype._clearSelection=function(){this._selectionEl.innerHTML=""},t.prototype._addSelection=function(t,e){var n=this._selectionBlock(t,e);this._selectionEl.appendChild(n)},t.prototype._selectionBlock=function(e,n){var i=document.createElement(t.SELECTION_ELEMENT_TAG);return i.classList.add(t.SELECTION_BLOCK_CLASS),i.style.top=e.top-n.top+"px",i.style.left=e.left-n.left+"px",i.style.width=e.width+"px",i.style.height=e.height+"px",i.style.backgroundColor=r(this.color).setAlpha(.3).toString(),i},t.prototype._sortByDomPosition=function(t){return t.sort((function(t,e){return t.top===e.top?t.left-e.left:t.top-e.top}))},t.prototype._sanitize=function(t){var e=this,n=new Set;return t.filter((function(t){if(!t.width||!t.height)return!1;var r=e._serialize(t);return!n.has(r)&&(n.add(r),!0)}))},t.prototype._serialize=function(t){return["top:"+t.top,"right:"+t.right,"bottom:"+t.bottom,"left:"+t.left].join(";")},t.CONTAINER_ELEMENT_TAG="SPAN",t.SELECTION_ELEMENT_TAG="SPAN",t.CURSOR_CLASS="ql-cursor",t.SELECTION_CLASS="ql-cursor-selections",t.SELECTION_BLOCK_CLASS="ql-cursor-selection-block",t.CARET_CLASS="ql-cursor-caret",t.CARET_CONTAINER_CLASS="ql-cursor-caret-container",t.FLAG_CLASS="ql-cursor-flag",t.SHOW_FLAG_CLASS="show-flag",t.FLAG_FLIPPED_CLASS="flag-flipped",t.NAME_CLASS="ql-cursor-name",t.HIDDEN_CLASS="hidden",t.NO_DELAY_CLASS="no-delay",t}();e.default=i},function(t,e,n){var r=Array.prototype.slice,i=n(12),o=n(13),s=t.exports=function(t,e,n){return n||(n={}),t===e||(t instanceof Date&&e instanceof Date?t.getTime()===e.getTime():!t||!e||"object"!=typeof t&&"object"!=typeof e?n.strict?t===e:t==e:function(t,e,n){var l,c;if(a(t)||a(e))return!1;if(t.prototype!==e.prototype)return!1;if(o(t))return!!o(e)&&(t=r.call(t),e=r.call(e),s(t,e,n));if(u(t)){if(!u(e))return!1;if(t.length!==e.length)return!1;for(l=0;l<t.length;l++)if(t[l]!==e[l])return!1;return!0}try{var f=i(t),h=i(e)}catch(t){return!1}if(f.length!=h.length)return!1;for(f.sort(),h.sort(),l=f.length-1;l>=0;l--)if(f[l]!=h[l])return!1;for(l=f.length-1;l>=0;l--)if(c=f[l],!s(t[c],e[c],n))return!1;return typeof t==typeof e}(t,e,n))};function a(t){return null==t}function u(t){return!(!t||"object"!=typeof t||"number"!=typeof t.length)&&("function"==typeof t.copy&&"function"==typeof t.slice&&!(t.length>0&&"number"!=typeof t[0]))}},function(t,e,n){"use strict";var r=Object.prototype.hasOwnProperty,i=Object.prototype.toString,o=Object.defineProperty,s=Object.getOwnPropertyDescriptor,a=function(t){return"function"==typeof Array.isArray?Array.isArray(t):"[object Array]"===i.call(t)},u=function(t){if(!t||"[object Object]"!==i.call(t))return!1;var e,n=r.call(t,"constructor"),o=t.constructor&&t.constructor.prototype&&r.call(t.constructor.prototype,"isPrototypeOf");if(t.constructor&&!n&&!o)return!1;for(e in t);return void 0===e||r.call(t,e)},l=function(t,e){o&&"__proto__"===e.name?o(t,e.name,{enumerable:!0,configurable:!0,value:e.newValue,writable:!0}):t[e.name]=e.newValue},c=function(t,e){if("__proto__"===e){if(!r.call(t,e))return;if(s)return s(t,e).value}return t[e]};t.exports=function t(){var e,n,r,i,o,s,f=arguments[0],h=1,p=arguments.length,d=!1;for("boolean"==typeof f&&(d=f,f=arguments[1]||{},h=2),(null==f||"object"!=typeof f&&"function"!=typeof f)&&(f={});h<p;++h)if(null!=(e=arguments[h]))for(n in e)r=c(f,n),f!==(i=c(e,n))&&(d&&i&&(u(i)||(o=a(i)))?(o?(o=!1,s=r&&a(r)?r:[]):s=r&&u(r)?r:{},l(f,{name:n,newValue:t(d,s,i)})):void 0!==i&&l(f,{name:n,newValue:i}));return f}},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i,o=r(n(16));!function(t){t.iterator=function(t){return new o.default(t)},t.length=function(t){return"number"==typeof t.delete?t.delete:"number"==typeof t.retain?t.retain:"string"==typeof t.insert?t.insert.length:1}}(i||(i={})),e.default=i},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=r(n(5));e.default=i.default;var o=r(n(0));e.Cursor=o.default,n(17)},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(0)),s=i(n(7)),a=r(n(8)),u=r(n(9)),l=n(11),c=function(){function t(t,e){void 0===e&&(e={}),this._cursors={},this._quill=t,this._options=this._setDefaults(e),this._container=this._quill.addContainer(this._options.containerClass),this._boundsContainer=this._options.boundsContainer||this._quill.container,this._currentSelection=this._quill.getSelection(),this._registerSelectionChangeListeners(),this._registerTextChangeListener(),this._registerDomListeners()}return t.prototype.createCursor=function(t,e,n){var r=this._cursors[t];if(!r){r=new o.default(t,e,n),this._cursors[t]=r;var i=r.build(this._options);this._container.appendChild(i)}return r},t.prototype.moveCursor=function(t,e){var n=this._cursors[t];n&&(n.range=e,this._updateCursor(n))},t.prototype.removeCursor=function(t){var e=this._cursors[t];e&&(e.remove(),delete this._cursors[t])},t.prototype.update=function(){var t=this;this.cursors().forEach((function(e){return t._updateCursor(e)}))},t.prototype.clearCursors=function(){var t=this;this.cursors().forEach((function(e){return t.removeCursor(e.id)}))},t.prototype.toggleFlag=function(t,e){var n=this._cursors[t];n&&n.toggleFlag(e)},t.prototype.cursors=function(){var t=this;return Object.keys(this._cursors).map((function(e){return t._cursors[e]}))},t.prototype._registerSelectionChangeListeners=function(){var t=this;this._quill.on(this._quill.constructor.events.SELECTION_CHANGE,(function(e){t._currentSelection=e}))},t.prototype._registerTextChangeListener=function(){var t=this;this._quill.on(this._quill.constructor.events.TEXT_CHANGE,(function(e){return t._handleTextChange(e)}))},t.prototype._registerDomListeners=function(){var t=this,e=this._quill.container.getElementsByClassName("ql-editor")[0];e.addEventListener("scroll",(function(){return t.update()})),new u.default((function(){return t.update()})).observe(e)},t.prototype._updateCursor=function(t){if(!t.range)return t.hide();var e=this._indexWithinQuillBounds(t.range.index),n=this._indexWithinQuillBounds(t.range.index+t.range.length),r=this._quill.getLeaf(e),i=this._quill.getLeaf(n);if(!this._leafIsValid(r)||!this._leafIsValid(i))return t.hide();t.show();var o=this._boundsContainer.getBoundingClientRect(),a=this._quill.getBounds(n);t.updateCaret(a,o);var u=this._lineRanges(t,r,i).reduce((function(t,e){return t.concat(Array.from(s.getClientRects(e)))}),[]);t.updateSelection(u,o)},t.prototype._indexWithinQuillBounds=function(t){var e=this._quill.getLength(),n=e?e-1:0;return t=Math.max(t,0),t=Math.min(t,n)},t.prototype._leafIsValid=function(t){return t&&t[0]&&t[0].domNode&&t[1]>=0},t.prototype._handleTextChange=function(t){var e=this;window.setTimeout((function(){e._options.transformOnTextChange&&e._transformCursors(t),e._options.selectionChangeSource&&(e._emitSelection(),e.update())}))},t.prototype._emitSelection=function(){this._quill.emitter.emit(this._quill.constructor.events.SELECTION_CHANGE,this._quill.getSelection(),this._currentSelection,this._options.selectionChangeSource)},t.prototype._setDefaults=function(t){return(t=Object.assign({},t)).template=t.template||a.default,t.containerClass=t.containerClass||"ql-cursors",null!==t.selectionChangeSource&&(t.selectionChangeSource=t.selectionChangeSource||this._quill.constructor.sources.API),t.hideDelayMs=Number.isInteger(t.hideDelayMs)?t.hideDelayMs:3e3,t.hideSpeedMs=Number.isInteger(t.hideSpeedMs)?t.hideSpeedMs:400,t.transformOnTextChange=!!t.transformOnTextChange,t},t.prototype._lineRanges=function(t,e,n){var r=this._quill.getLines(t.range);return r.reduce((function(t,i,o){if(!i.children){var s=document.createRange();return s.selectNode(i.domNode),t.concat(s)}var a=0===o?e:i.path(0).pop(),u=a[0],l=a[1],c=o===r.length-1?n:i.path(i.length()-1).pop(),f=c[0],h=c[1],p=document.createRange();return p.setStart(u.domNode,l),p.setEnd(f.domNode,h),t.concat(p)}),[])},t.prototype._transformCursors=function(t){var e=this;t=new l(t),this.cursors().filter((function(t){return t.range})).forEach((function(n){n.range.index=t.transformPosition(n.range.index),e._updateCursor(n)}))},t}();e.default=c},function(t,e,n){var r;!function(i){var o=/^\s+/,s=/\s+$/,a=0,u=i.round,l=i.min,c=i.max,f=i.random;function h(t,e){if(e=e||{},(t=t||"")instanceof h)return t;if(!(this instanceof h))return new h(t,e);var n=function(t){var e={r:0,g:0,b:0},n=1,r=null,a=null,u=null,f=!1,h=!1;"string"==typeof t&&(t=function(t){t=t.replace(o,"").replace(s,"").toLowerCase();var e,n=!1;if(M[t])t=M[t],n=!0;else if("transparent"==t)return{r:0,g:0,b:0,a:0,format:"name"};if(e=G.rgb.exec(t))return{r:e[1],g:e[2],b:e[3]};if(e=G.rgba.exec(t))return{r:e[1],g:e[2],b:e[3],a:e[4]};if(e=G.hsl.exec(t))return{h:e[1],s:e[2],l:e[3]};if(e=G.hsla.exec(t))return{h:e[1],s:e[2],l:e[3],a:e[4]};if(e=G.hsv.exec(t))return{h:e[1],s:e[2],v:e[3]};if(e=G.hsva.exec(t))return{h:e[1],s:e[2],v:e[3],a:e[4]};if(e=G.hex8.exec(t))return{r:q(e[1]),g:q(e[2]),b:q(e[3]),a:H(e[4]),format:n?"name":"hex8"};if(e=G.hex6.exec(t))return{r:q(e[1]),g:q(e[2]),b:q(e[3]),format:n?"name":"hex"};if(e=G.hex4.exec(t))return{r:q(e[1]+""+e[1]),g:q(e[2]+""+e[2]),b:q(e[3]+""+e[3]),a:H(e[4]+""+e[4]),format:n?"name":"hex8"};if(e=G.hex3.exec(t))return{r:q(e[1]+""+e[1]),g:q(e[2]+""+e[2]),b:q(e[3]+""+e[3]),format:n?"name":"hex"};return!1}(t));"object"==typeof t&&(U(t.r)&&U(t.g)&&U(t.b)?(p=t.r,d=t.g,g=t.b,e={r:255*T(p,255),g:255*T(d,255),b:255*T(g,255)},f=!0,h="%"===String(t.r).substr(-1)?"prgb":"rgb"):U(t.h)&&U(t.s)&&U(t.v)?(r=F(t.s),a=F(t.v),e=function(t,e,n){t=6*T(t,360),e=T(e,100),n=T(n,100);var r=i.floor(t),o=t-r,s=n*(1-e),a=n*(1-o*e),u=n*(1-(1-o)*e),l=r%6;return{r:255*[n,a,s,s,u,n][l],g:255*[u,n,n,a,s,s][l],b:255*[s,s,u,n,n,a][l]}}(t.h,r,a),f=!0,h="hsv"):U(t.h)&&U(t.s)&&U(t.l)&&(r=F(t.s),u=F(t.l),e=function(t,e,n){var r,i,o;function s(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t}if(t=T(t,360),e=T(e,100),n=T(n,100),0===e)r=i=o=n;else{var a=n<.5?n*(1+e):n+e-n*e,u=2*n-a;r=s(u,a,t+1/3),i=s(u,a,t),o=s(u,a,t-1/3)}return{r:255*r,g:255*i,b:255*o}}(t.h,r,u),f=!0,h="hsl"),t.hasOwnProperty("a")&&(n=t.a));var p,d,g;return n=j(n),{ok:f,format:t.format||h,r:l(255,c(e.r,0)),g:l(255,c(e.g,0)),b:l(255,c(e.b,0)),a:n}}(t);this._originalInput=t,this._r=n.r,this._g=n.g,this._b=n.b,this._a=n.a,this._roundA=u(100*this._a)/100,this._format=e.format||n.format,this._gradientType=e.gradientType,this._r<1&&(this._r=u(this._r)),this._g<1&&(this._g=u(this._g)),this._b<1&&(this._b=u(this._b)),this._ok=n.ok,this._tc_id=a++}function p(t,e,n){t=T(t,255),e=T(e,255),n=T(n,255);var r,i,o=c(t,e,n),s=l(t,e,n),a=(o+s)/2;if(o==s)r=i=0;else{var u=o-s;switch(i=a>.5?u/(2-o-s):u/(o+s),o){case t:r=(e-n)/u+(e<n?6:0);break;case e:r=(n-t)/u+2;break;case n:r=(t-e)/u+4}r/=6}return{h:r,s:i,l:a}}function d(t,e,n){t=T(t,255),e=T(e,255),n=T(n,255);var r,i,o=c(t,e,n),s=l(t,e,n),a=o,u=o-s;if(i=0===o?0:u/o,o==s)r=0;else{switch(o){case t:r=(e-n)/u+(e<n?6:0);break;case e:r=(n-t)/u+2;break;case n:r=(t-e)/u+4}r/=6}return{h:r,s:i,v:a}}function g(t,e,n,r){var i=[D(u(t).toString(16)),D(u(e).toString(16)),D(u(n).toString(16))];return r&&i[0].charAt(0)==i[0].charAt(1)&&i[1].charAt(0)==i[1].charAt(1)&&i[2].charAt(0)==i[2].charAt(1)?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0):i.join("")}function b(t,e,n,r){return[D(I(r)),D(u(t).toString(16)),D(u(e).toString(16)),D(u(n).toString(16))].join("")}function v(t,e){e=0===e?0:e||10;var n=h(t).toHsl();return n.s-=e/100,n.s=N(n.s),h(n)}function _(t,e){e=0===e?0:e||10;var n=h(t).toHsl();return n.s+=e/100,n.s=N(n.s),h(n)}function y(t){return h(t).desaturate(100)}function m(t,e){e=0===e?0:e||10;var n=h(t).toHsl();return n.l+=e/100,n.l=N(n.l),h(n)}function A(t,e){e=0===e?0:e||10;var n=h(t).toRgb();return n.r=c(0,l(255,n.r-u(-e/100*255))),n.g=c(0,l(255,n.g-u(-e/100*255))),n.b=c(0,l(255,n.b-u(-e/100*255))),h(n)}function x(t,e){e=0===e?0:e||10;var n=h(t).toHsl();return n.l-=e/100,n.l=N(n.l),h(n)}function C(t,e){var n=h(t).toHsl(),r=(n.h+e)%360;return n.h=r<0?360+r:r,h(n)}function w(t){var e=h(t).toHsl();return e.h=(e.h+180)%360,h(e)}function S(t){var e=h(t).toHsl(),n=e.h;return[h(t),h({h:(n+120)%360,s:e.s,l:e.l}),h({h:(n+240)%360,s:e.s,l:e.l})]}function E(t){var e=h(t).toHsl(),n=e.h;return[h(t),h({h:(n+90)%360,s:e.s,l:e.l}),h({h:(n+180)%360,s:e.s,l:e.l}),h({h:(n+270)%360,s:e.s,l:e.l})]}function O(t){var e=h(t).toHsl(),n=e.h;return[h(t),h({h:(n+72)%360,s:e.s,l:e.l}),h({h:(n+216)%360,s:e.s,l:e.l})]}function L(t,e,n){e=e||6,n=n||30;var r=h(t).toHsl(),i=360/n,o=[h(t)];for(r.h=(r.h-(i*e>>1)+720)%360;--e;)r.h=(r.h+i)%360,o.push(h(r));return o}function k(t,e){e=e||6;for(var n=h(t).toHsv(),r=n.h,i=n.s,o=n.v,s=[],a=1/e;e--;)s.push(h({h:r,s:i,v:o})),o=(o+a)%1;return s}h.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},getLuminance:function(){var t,e,n,r=this.toRgb();return t=r.r/255,e=r.g/255,n=r.b/255,.2126*(t<=.03928?t/12.92:i.pow((t+.055)/1.055,2.4))+.7152*(e<=.03928?e/12.92:i.pow((e+.055)/1.055,2.4))+.0722*(n<=.03928?n/12.92:i.pow((n+.055)/1.055,2.4))},setAlpha:function(t){return this._a=j(t),this._roundA=u(100*this._a)/100,this},toHsv:function(){var t=d(this._r,this._g,this._b);return{h:360*t.h,s:t.s,v:t.v,a:this._a}},toHsvString:function(){var t=d(this._r,this._g,this._b),e=u(360*t.h),n=u(100*t.s),r=u(100*t.v);return 1==this._a?"hsv("+e+", "+n+"%, "+r+"%)":"hsva("+e+", "+n+"%, "+r+"%, "+this._roundA+")"},toHsl:function(){var t=p(this._r,this._g,this._b);return{h:360*t.h,s:t.s,l:t.l,a:this._a}},toHslString:function(){var t=p(this._r,this._g,this._b),e=u(360*t.h),n=u(100*t.s),r=u(100*t.l);return 1==this._a?"hsl("+e+", "+n+"%, "+r+"%)":"hsla("+e+", "+n+"%, "+r+"%, "+this._roundA+")"},toHex:function(t){return g(this._r,this._g,this._b,t)},toHexString:function(t){return"#"+this.toHex(t)},toHex8:function(t){return function(t,e,n,r,i){var o=[D(u(t).toString(16)),D(u(e).toString(16)),D(u(n).toString(16)),D(I(r))];if(i&&o[0].charAt(0)==o[0].charAt(1)&&o[1].charAt(0)==o[1].charAt(1)&&o[2].charAt(0)==o[2].charAt(1)&&o[3].charAt(0)==o[3].charAt(1))return o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0)+o[3].charAt(0);return o.join("")}(this._r,this._g,this._b,this._a,t)},toHex8String:function(t){return"#"+this.toHex8(t)},toRgb:function(){return{r:u(this._r),g:u(this._g),b:u(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+u(this._r)+", "+u(this._g)+", "+u(this._b)+")":"rgba("+u(this._r)+", "+u(this._g)+", "+u(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:u(100*T(this._r,255))+"%",g:u(100*T(this._g,255))+"%",b:u(100*T(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+u(100*T(this._r,255))+"%, "+u(100*T(this._g,255))+"%, "+u(100*T(this._b,255))+"%)":"rgba("+u(100*T(this._r,255))+"%, "+u(100*T(this._g,255))+"%, "+u(100*T(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":!(this._a<1)&&(R[g(this._r,this._g,this._b,!0)]||!1)},toFilter:function(t){var e="#"+b(this._r,this._g,this._b,this._a),n=e,r=this._gradientType?"GradientType = 1, ":"";if(t){var i=h(t);n="#"+b(i._r,i._g,i._b,i._a)}return"progid:DXImageTransform.Microsoft.gradient("+r+"startColorstr="+e+",endColorstr="+n+")"},toString:function(t){var e=!!t;t=t||this._format;var n=!1,r=this._a<1&&this._a>=0;return e||!r||"hex"!==t&&"hex6"!==t&&"hex3"!==t&&"hex4"!==t&&"hex8"!==t&&"name"!==t?("rgb"===t&&(n=this.toRgbString()),"prgb"===t&&(n=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(n=this.toHexString()),"hex3"===t&&(n=this.toHexString(!0)),"hex4"===t&&(n=this.toHex8String(!0)),"hex8"===t&&(n=this.toHex8String()),"name"===t&&(n=this.toName()),"hsl"===t&&(n=this.toHslString()),"hsv"===t&&(n=this.toHsvString()),n||this.toHexString()):"name"===t&&0===this._a?this.toName():this.toRgbString()},clone:function(){return h(this.toString())},_applyModification:function(t,e){var n=t.apply(null,[this].concat([].slice.call(e)));return this._r=n._r,this._g=n._g,this._b=n._b,this.setAlpha(n._a),this},lighten:function(){return this._applyModification(m,arguments)},brighten:function(){return this._applyModification(A,arguments)},darken:function(){return this._applyModification(x,arguments)},desaturate:function(){return this._applyModification(v,arguments)},saturate:function(){return this._applyModification(_,arguments)},greyscale:function(){return this._applyModification(y,arguments)},spin:function(){return this._applyModification(C,arguments)},_applyCombination:function(t,e){return t.apply(null,[this].concat([].slice.call(e)))},analogous:function(){return this._applyCombination(L,arguments)},complement:function(){return this._applyCombination(w,arguments)},monochromatic:function(){return this._applyCombination(k,arguments)},splitcomplement:function(){return this._applyCombination(O,arguments)},triad:function(){return this._applyCombination(S,arguments)},tetrad:function(){return this._applyCombination(E,arguments)}},h.fromRatio=function(t,e){if("object"==typeof t){var n={};for(var r in t)t.hasOwnProperty(r)&&(n[r]="a"===r?t[r]:F(t[r]));t=n}return h(t,e)},h.equals=function(t,e){return!(!t||!e)&&h(t).toRgbString()==h(e).toRgbString()},h.random=function(){return h.fromRatio({r:f(),g:f(),b:f()})},h.mix=function(t,e,n){n=0===n?0:n||50;var r=h(t).toRgb(),i=h(e).toRgb(),o=n/100;return h({r:(i.r-r.r)*o+r.r,g:(i.g-r.g)*o+r.g,b:(i.b-r.b)*o+r.b,a:(i.a-r.a)*o+r.a})},h.readability=function(t,e){var n=h(t),r=h(e);return(i.max(n.getLuminance(),r.getLuminance())+.05)/(i.min(n.getLuminance(),r.getLuminance())+.05)},h.isReadable=function(t,e,n){var r,i,o=h.readability(t,e);switch(i=!1,(r=function(t){var e,n;e=((t=t||{level:"AA",size:"small"}).level||"AA").toUpperCase(),n=(t.size||"small").toLowerCase(),"AA"!==e&&"AAA"!==e&&(e="AA");"small"!==n&&"large"!==n&&(n="small");return{level:e,size:n}}(n)).level+r.size){case"AAsmall":case"AAAlarge":i=o>=4.5;break;case"AAlarge":i=o>=3;break;case"AAAsmall":i=o>=7}return i},h.mostReadable=function(t,e,n){var r,i,o,s,a=null,u=0;i=(n=n||{}).includeFallbackColors,o=n.level,s=n.size;for(var l=0;l<e.length;l++)(r=h.readability(t,e[l]))>u&&(u=r,a=h(e[l]));return h.isReadable(t,a,{level:o,size:s})||!i?a:(n.includeFallbackColors=!1,h.mostReadable(t,["#fff","#000"],n))};var M=h.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},R=h.hexNames=function(t){var e={};for(var n in t)t.hasOwnProperty(n)&&(e[t[n]]=n);return e}(M);function j(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function T(t,e){(function(t){return"string"==typeof t&&-1!=t.indexOf(".")&&1===parseFloat(t)})(t)&&(t="100%");var n=function(t){return"string"==typeof t&&-1!=t.indexOf("%")}(t);return t=l(e,c(0,parseFloat(t))),n&&(t=parseInt(t*e,10)/100),i.abs(t-e)<1e-6?1:t%e/parseFloat(e)}function N(t){return l(1,c(0,t))}function q(t){return parseInt(t,16)}function D(t){return 1==t.length?"0"+t:""+t}function F(t){return t<=1&&(t=100*t+"%"),t}function I(t){return i.round(255*parseFloat(t)).toString(16)}function H(t){return q(t)/255}var P,B,z,G=(B="[\\s|\\(]+("+(P="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)")+")[,|\\s]+("+P+")[,|\\s]+("+P+")\\s*\\)?",z="[\\s|\\(]+("+P+")[,|\\s]+("+P+")[,|\\s]+("+P+")[,|\\s]+("+P+")\\s*\\)?",{CSS_UNIT:new RegExp(P),rgb:new RegExp("rgb"+B),rgba:new RegExp("rgba"+z),hsl:new RegExp("hsl"+B),hsla:new RegExp("hsla"+z),hsv:new RegExp("hsv"+B),hsva:new RegExp("hsva"+z),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/});function U(t){return!!G.CSS_UNIT.exec(t)}t.exports?t.exports=h:void 0===(r=function(){return h}.call(e,n,e,t))||(t.exports=r)}(Math)},function(t,e,n){var r,i;
/*!
 * RangeFix v0.2.8
 * https://github.com/edg2s/rangefix
 *
 * Copyright 2014-17 Ed Sanders.
 * Released under the MIT license
 */void 0===(i="function"==typeof(r=function(){var t,e={};function n(t){var e;return t?screen.deviceXDPI===screen.logicalXDPI?t:"length"in t?Array.prototype.map.call(t,n):(e=screen.deviceXDPI/screen.logicalXDPI,{top:t.top/e,bottom:t.bottom/e,left:t.left/e,right:t.right/e,width:t.width/e,height:t.height/e}):t}function r(t,e){var n,r=0;if(1024>=e.length)return Array.prototype.push.apply(t,e);for(;r<e.length;)n=Array.prototype.push.apply(t,Array.prototype.slice.call(e,r,r+1024)),r+=1024;return n}return e.isBroken=function(){var e,n,r,i,o,s,a,u;return void 0===t&&(n=document.createElement("p"),r=document.createElement("span"),i=document.createTextNode("aa"),o=document.createTextNode("aa"),(s=document.createElement("img")).setAttribute("src","data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="),a=document.createRange(),t={},n.appendChild(i),n.appendChild(r),r.appendChild(s),r.appendChild(o),document.body.appendChild(n),a.setStart(i,1),a.setEnd(r,0),t.getClientRects=t.getBoundingClientRect=a.getClientRects().length>1,t.getClientRects||(a.setEnd(o,1),t.getClientRects=t.getBoundingClientRect=2===a.getClientRects().length),t.getBoundingClientRect||(a.setEnd(a.startContainer,a.startOffset),e=a.getBoundingClientRect(),t.getBoundingClientRect=0===e.top&&0===e.left),document.body.removeChild(n),u=window.ActiveXObject&&new Function("/*@cc_on return @_jscript_version; @*/")(),t.ieZoom=!!u&&u<=10),t},e.getClientRects=function(t){var e,i,o,s,a,u=this.isBroken();if(u.ieZoom)return n(t.getClientRects());if(!u.getClientRects)return t.getClientRects();for(e=[],o=[],i=t.endContainer,s=t.endOffset,a=document.createRange();i!==t.commonAncestorContainer;)a.setStart(i,0),a.setEnd(i,s),r(o,a.getClientRects()),s=Array.prototype.indexOf.call(i.parentNode.childNodes,i),i=i.parentNode;return(a=t.cloneRange()).setEnd(i,s),r(e,a.getClientRects()),r(e,o),e},e.getBoundingClientRect=function(t){var e,r,i,o,s,a,u=this.getClientRects(t);if(0===u.length)return null;if(s=t.getBoundingClientRect(),(a=this.isBroken()).ieZoom)return n(s);if(!a.getBoundingClientRect)return s;if(0===s.width&&0===s.height)return u[0];for(e=0,r=u.length;e<r;e++)o=u[e],i?(i.left=Math.min(i.left,o.left),i.top=Math.min(i.top,o.top),i.right=Math.max(i.right,o.right),i.bottom=Math.max(i.bottom,o.bottom)):i={left:o.left,top:o.top,right:o.right,bottom:o.bottom};return i&&(i.width=i.right-i.left,i.height=i.bottom-i.top),i},e})?r.call(e,n,e,t):r)||(t.exports=i)},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=r(n(0)),o='\n  <span class="'+i.default.SELECTION_CLASS+'"></span>\n  <span class="'+i.default.CARET_CONTAINER_CLASS+'">\n    <span class="'+i.default.CARET_CLASS+'"></span>\n  </span>\n  <div class="'+i.default.FLAG_CLASS+'">\n    <small class="'+i.default.NAME_CLASS+'"></small>\n  </div>\n';e.default=o},function(t,e,n){"use strict";n.r(e),function(t){var n=function(){if("undefined"!=typeof Map)return Map;function t(t,e){var n=-1;return t.some((function(t,r){return t[0]===e&&(n=r,!0)})),n}return(function(){function e(){this.__entries__=[]}return Object.defineProperty(e.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),e.prototype.get=function(e){var n=t(this.__entries__,e),r=this.__entries__[n];return r&&r[1]},e.prototype.set=function(e,n){var r=t(this.__entries__,e);~r?this.__entries__[r][1]=n:this.__entries__.push([e,n])},e.prototype.delete=function(e){var n=this.__entries__,r=t(n,e);~r&&n.splice(r,1)},e.prototype.has=function(e){return!!~t(this.__entries__,e)},e.prototype.clear=function(){this.__entries__.splice(0)},e.prototype.forEach=function(t,e){void 0===e&&(e=null);for(var n=0,r=this.__entries__;n<r.length;n++){var i=r[n];t.call(e,i[1],i[0])}},e}())}(),r="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,i=void 0!==t&&t.Math===Math?t:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),o="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(i):function(t){return setTimeout((function(){return t(Date.now())}),1e3/60)};var s=["top","right","bottom","left","width","height","size","weight"],a="undefined"!=typeof MutationObserver,u=function(){function t(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(t,e){var n=!1,r=!1,i=0;function s(){n&&(n=!1,t()),r&&u()}function a(){o(s)}function u(){var t=Date.now();if(n){if(t-i<2)return;r=!0}else n=!0,r=!1,setTimeout(a,e);i=t}return u}(this.refresh.bind(this),20)}return t.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},t.prototype.removeObserver=function(t){var e=this.observers_,n=e.indexOf(t);~n&&e.splice(n,1),!e.length&&this.connected_&&this.disconnect_()},t.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},t.prototype.updateObservers_=function(){var t=this.observers_.filter((function(t){return t.gatherActive(),t.hasActive()}));return t.forEach((function(t){return t.broadcastActive()})),t.length>0},t.prototype.connect_=function(){r&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),a?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},t.prototype.disconnect_=function(){r&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},t.prototype.onTransitionEnd_=function(t){var e=t.propertyName,n=void 0===e?"":e;s.some((function(t){return!!~n.indexOf(t)}))&&this.refresh()},t.getInstance=function(){return this.instance_||(this.instance_=new t),this.instance_},t.instance_=null,t}(),l=function(t,e){for(var n=0,r=Object.keys(e);n<r.length;n++){var i=r[n];Object.defineProperty(t,i,{value:e[i],enumerable:!1,writable:!1,configurable:!0})}return t},c=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||i},f=v(0,0,0,0);function h(t){return parseFloat(t)||0}function p(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return e.reduce((function(e,n){return e+h(t["border-"+n+"-width"])}),0)}function d(t){var e=t.clientWidth,n=t.clientHeight;if(!e&&!n)return f;var r=c(t).getComputedStyle(t),i=function(t){for(var e={},n=0,r=["top","right","bottom","left"];n<r.length;n++){var i=r[n],o=t["padding-"+i];e[i]=h(o)}return e}(r),o=i.left+i.right,s=i.top+i.bottom,a=h(r.width),u=h(r.height);if("border-box"===r.boxSizing&&(Math.round(a+o)!==e&&(a-=p(r,"left","right")+o),Math.round(u+s)!==n&&(u-=p(r,"top","bottom")+s)),!function(t){return t===c(t).document.documentElement}(t)){var l=Math.round(a+o)-e,d=Math.round(u+s)-n;1!==Math.abs(l)&&(a-=l),1!==Math.abs(d)&&(u-=d)}return v(i.left,i.top,a,u)}var g="undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof c(t).SVGGraphicsElement}:function(t){return t instanceof c(t).SVGElement&&"function"==typeof t.getBBox};function b(t){return r?g(t)?function(t){var e=t.getBBox();return v(0,0,e.width,e.height)}(t):d(t):f}function v(t,e,n,r){return{x:t,y:e,width:n,height:r}}var _=function(){function t(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=v(0,0,0,0),this.target=t}return t.prototype.isActive=function(){var t=b(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},t.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},t}(),y=function(t,e){var n,r,i,o,s,a,u,c=(r=(n=e).x,i=n.y,o=n.width,s=n.height,a="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,u=Object.create(a.prototype),l(u,{x:r,y:i,width:o,height:s,top:i,right:r+o,bottom:s+i,left:r}),u);l(this,{target:t,contentRect:c})},m=function(){function t(t,e,r){if(this.activeObservations_=[],this.observations_=new n,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=e,this.callbackCtx_=r}return t.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof c(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new _(t)),this.controller_.addObserver(this),this.controller_.refresh())}},t.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof c(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e.delete(t),e.size||this.controller_.removeObserver(this))}},t.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},t.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach((function(e){e.isActive()&&t.activeObservations_.push(e)}))},t.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map((function(t){return new y(t.target,t.broadcastRect())}));this.callback_.call(t,e,t),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t}(),A="undefined"!=typeof WeakMap?new WeakMap:new n,x=function t(e){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=u.getInstance(),r=new m(e,n,this);A.set(this,r)};["observe","unobserve","disconnect"].forEach((function(t){x.prototype[t]=function(){var e;return(e=A.get(this))[t].apply(e,arguments)}}));var C=void 0!==i.ResizeObserver?i.ResizeObserver:x;e.default=C}.call(this,n(10))},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},i=r(n(1)),o=r(n(2)),s=r(n(14)),a=r(n(15)),u=r(n(3)),l=String.fromCharCode(0),c=function(){function t(t){Array.isArray(t)?this.ops=t:null!=t&&Array.isArray(t.ops)?this.ops=t.ops:this.ops=[]}return t.prototype.insert=function(t,e){var n={};return"string"==typeof t&&0===t.length?this:(n.insert=t,null!=e&&"object"==typeof e&&Object.keys(e).length>0&&(n.attributes=e),this.push(n))},t.prototype.delete=function(t){return t<=0?this:this.push({delete:t})},t.prototype.retain=function(t,e){if(t<=0)return this;var n={retain:t};return null!=e&&"object"==typeof e&&Object.keys(e).length>0&&(n.attributes=e),this.push(n)},t.prototype.push=function(t){var e=this.ops.length,n=this.ops[e-1];if(t=o.default(!0,{},t),"object"==typeof n){if("number"==typeof t.delete&&"number"==typeof n.delete)return this.ops[e-1]={delete:n.delete+t.delete},this;if("number"==typeof n.delete&&null!=t.insert&&(e-=1,"object"!=typeof(n=this.ops[e-1])))return this.ops.unshift(t),this;if(i.default(t.attributes,n.attributes)){if("string"==typeof t.insert&&"string"==typeof n.insert)return this.ops[e-1]={insert:n.insert+t.insert},"object"==typeof t.attributes&&(this.ops[e-1].attributes=t.attributes),this;if("number"==typeof t.retain&&"number"==typeof n.retain)return this.ops[e-1]={retain:n.retain+t.retain},"object"==typeof t.attributes&&(this.ops[e-1].attributes=t.attributes),this}}return e===this.ops.length?this.ops.push(t):this.ops.splice(e,0,t),this},t.prototype.chop=function(){var t=this.ops[this.ops.length-1];return t&&t.retain&&!t.attributes&&this.ops.pop(),this},t.prototype.filter=function(t){return this.ops.filter(t)},t.prototype.forEach=function(t){this.ops.forEach(t)},t.prototype.map=function(t){return this.ops.map(t)},t.prototype.partition=function(t){var e=[],n=[];return this.forEach((function(r){(t(r)?e:n).push(r)})),[e,n]},t.prototype.reduce=function(t,e){return this.ops.reduce(t,e)},t.prototype.changeLength=function(){return this.reduce((function(t,e){return e.insert?t+u.default.length(e):e.delete?t-e.delete:t}),0)},t.prototype.length=function(){return this.reduce((function(t,e){return t+u.default.length(e)}),0)},t.prototype.slice=function(e,n){void 0===e&&(e=0),void 0===n&&(n=1/0);for(var r=[],i=u.default.iterator(this.ops),o=0;o<n&&i.hasNext();){var s=void 0;o<e?s=i.next(e-o):(s=i.next(n-o),r.push(s)),o+=u.default.length(s)}return new t(r)},t.prototype.compose=function(e){var n=u.default.iterator(this.ops),r=u.default.iterator(e.ops),o=[],s=r.peek();if(null!=s&&"number"==typeof s.retain&&null==s.attributes){for(var l=s.retain;"insert"===n.peekType()&&n.peekLength()<=l;)l-=n.peekLength(),o.push(n.next());s.retain-l>0&&r.next(s.retain-l)}for(var c=new t(o);n.hasNext()||r.hasNext();)if("insert"===r.peekType())c.push(r.next());else if("delete"===n.peekType())c.push(n.next());else{var f=Math.min(n.peekLength(),r.peekLength()),h=n.next(f),p=r.next(f);if("number"==typeof p.retain){var d={};"number"==typeof h.retain?d.retain=f:d.insert=h.insert;var g=a.default.compose(h.attributes,p.attributes,"number"==typeof h.retain);if(g&&(d.attributes=g),c.push(d),!r.hasNext()&&i.default(c.ops[c.ops.length-1],d)){var b=new t(n.rest());return c.concat(b).chop()}}else"number"==typeof p.delete&&"number"==typeof h.retain&&c.push(p)}return c.chop()},t.prototype.concat=function(e){var n=new t(this.ops.slice());return e.ops.length>0&&(n.push(e.ops[0]),n.ops=n.ops.concat(e.ops.slice(1))),n},t.prototype.diff=function(e,n){if(this.ops===e.ops)return new t;var r=[this,e].map((function(t){return t.map((function(n){if(null!=n.insert)return"string"==typeof n.insert?n.insert:l;throw new Error("diff() called "+(t===e?"on":"with")+" non-document")})).join("")})),o=new t,c=s.default(r[0],r[1],n),f=u.default.iterator(this.ops),h=u.default.iterator(e.ops);return c.forEach((function(t){for(var e=t[1].length;e>0;){var n=0;switch(t[0]){case s.default.INSERT:n=Math.min(h.peekLength(),e),o.push(h.next(n));break;case s.default.DELETE:n=Math.min(e,f.peekLength()),f.next(n),o.delete(n);break;case s.default.EQUAL:n=Math.min(f.peekLength(),h.peekLength(),e);var r=f.next(n),u=h.next(n);i.default(r.insert,u.insert)?o.retain(n,a.default.diff(r.attributes,u.attributes)):o.push(u).delete(n)}e-=n}})),o.chop()},t.prototype.eachLine=function(e,n){void 0===n&&(n="\n");for(var r=u.default.iterator(this.ops),i=new t,o=0;r.hasNext();){if("insert"!==r.peekType())return;var s=r.peek(),a=u.default.length(s)-r.peekLength(),l="string"==typeof s.insert?s.insert.indexOf(n,a)-a:-1;if(l<0)i.push(r.next());else if(l>0)i.push(r.next(l));else{if(!1===e(i,r.next(1).attributes||{},o))return;o+=1,i=new t}}i.length()>0&&e(i,{},o)},t.prototype.invert=function(e){var n=new t;return this.reduce((function(t,r){if(r.insert)n.delete(u.default.length(r));else{if(r.retain&&null==r.attributes)return n.retain(r.retain),t+r.retain;if(r.delete||r.retain&&r.attributes){var i=r.delete||r.retain;return e.slice(t,t+i).forEach((function(t){r.delete?n.push(t):r.retain&&r.attributes&&n.retain(u.default.length(t),a.default.invert(r.attributes,t.attributes))})),t+i}}return t}),0),n.chop()},t.prototype.transform=function(e,n){if(void 0===n&&(n=!1),n=!!n,"number"==typeof e)return this.transformPosition(e,n);for(var r=e,i=u.default.iterator(this.ops),o=u.default.iterator(r.ops),s=new t;i.hasNext()||o.hasNext();)if("insert"!==i.peekType()||!n&&"insert"===o.peekType())if("insert"===o.peekType())s.push(o.next());else{var l=Math.min(i.peekLength(),o.peekLength()),c=i.next(l),f=o.next(l);if(c.delete)continue;f.delete?s.push(f):s.retain(l,a.default.transform(c.attributes,f.attributes,n))}else s.retain(u.default.length(i.next()));return s.chop()},t.prototype.transformPosition=function(t,e){void 0===e&&(e=!1),e=!!e;for(var n=u.default.iterator(this.ops),r=0;n.hasNext()&&r<=t;){var i=n.peekLength(),o=n.peekType();n.next(),"delete"!==o?("insert"===o&&(r<t||!e)&&(t+=i),r+=i):t-=Math.min(i,t-r)}return t},t.Op=u.default,t.AttributeMap=a.default,t}();t.exports=c},function(t,e){function n(t){var e=[];for(var n in t)e.push(n);return e}(t.exports="function"==typeof Object.keys?Object.keys:n).shim=n},function(t,e){var n="[object Arguments]"==function(){return Object.prototype.toString.call(arguments)}();function r(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function i(t){return t&&"object"==typeof t&&"number"==typeof t.length&&Object.prototype.hasOwnProperty.call(t,"callee")&&!Object.prototype.propertyIsEnumerable.call(t,"callee")||!1}(e=t.exports=n?r:i).supported=r,e.unsupported=i},function(t,e){function n(t,e,s,a){if(t===e)return t?[[0,t]]:[];if(null!=s){var f=function(t,e,n){var r="number"==typeof n?{index:n,length:0}:n.oldRange,i="number"==typeof n?null:n.newRange,o=t.length,s=e.length;if(0===r.length&&(null===i||0===i.length)){var a=r.index,u=t.slice(0,a),l=t.slice(a),f=i?i.index:null,h=a+s-o;if((null===f||f===h)&&!(h<0||h>s)){var p=e.slice(0,h);if((m=e.slice(h))===l){var d=Math.min(a,h),g=u.slice(0,d),b=p.slice(0,d);if(g===b){var v=u.slice(d),_=p.slice(d);return c(g,v,_,l)}}}if(null===f||f===a){var y=a,m=(p=e.slice(0,y),e.slice(y));if(p===u){var A=Math.min(o-y,s-y),x=l.slice(l.length-A),C=m.slice(m.length-A);if(x===C){v=l.slice(0,l.length-A),_=m.slice(0,m.length-A);return c(u,v,_,x)}}}}if(r.length>0&&i&&0===i.length){g=t.slice(0,r.index),x=t.slice(r.index+r.length),d=g.length,A=x.length;if(!(s<d+A)){b=e.slice(0,d),C=e.slice(s-A);if(g===b&&x===C){v=t.slice(d,o-A),_=e.slice(d,s-A);return c(g,v,_,x)}}}return null}(t,e,s);if(f)return f}var h=i(t,e),p=t.substring(0,h);h=o(t=t.substring(h),e=e.substring(h));var d=t.substring(t.length-h),g=function(t,e){var s;if(!t)return[[1,e]];if(!e)return[[-1,t]];var a=t.length>e.length?t:e,u=t.length>e.length?e:t,l=a.indexOf(u);if(-1!==l)return s=[[1,a.substring(0,l)],[0,u],[1,a.substring(l+u.length)]],t.length>e.length&&(s[0][0]=s[2][0]=-1),s;if(1===u.length)return[[-1,t],[1,e]];var c=function(t,e){var n=t.length>e.length?t:e,r=t.length>e.length?e:t;if(n.length<4||2*r.length<n.length)return null;function s(t,e,n){for(var r,s,a,u,l=t.substring(n,n+Math.floor(t.length/4)),c=-1,f="";-1!==(c=e.indexOf(l,c+1));){var h=i(t.substring(n),e.substring(c)),p=o(t.substring(0,n),e.substring(0,c));f.length<p+h&&(f=e.substring(c-p,c)+e.substring(c,c+h),r=t.substring(0,n-p),s=t.substring(n+h),a=e.substring(0,c-p),u=e.substring(c+h))}return 2*f.length>=t.length?[r,s,a,u,f]:null}var a,u,l,c,f,h=s(n,r,Math.ceil(n.length/4)),p=s(n,r,Math.ceil(n.length/2));if(!h&&!p)return null;a=p?h&&h[4].length>p[4].length?h:p:h;t.length>e.length?(u=a[0],l=a[1],c=a[2],f=a[3]):(c=a[0],f=a[1],u=a[2],l=a[3]);var d=a[4];return[u,l,c,f,d]}(t,e);if(c){var f=c[0],h=c[1],p=c[2],d=c[3],g=c[4],b=n(f,p),v=n(h,d);return b.concat([[0,g]],v)}return function(t,e){for(var n=t.length,i=e.length,o=Math.ceil((n+i)/2),s=o,a=2*o,u=new Array(a),l=new Array(a),c=0;c<a;c++)u[c]=-1,l[c]=-1;u[s+1]=0,l[s+1]=0;for(var f=n-i,h=f%2!=0,p=0,d=0,g=0,b=0,v=0;v<o;v++){for(var _=-v+p;_<=v-d;_+=2){for(var y=s+_,m=(S=_===-v||_!==v&&u[y-1]<u[y+1]?u[y+1]:u[y-1]+1)-_;S<n&&m<i&&t.charAt(S)===e.charAt(m);)S++,m++;if(u[y]=S,S>n)d+=2;else if(m>i)p+=2;else if(h){if((C=s+f-_)>=0&&C<a&&-1!==l[C]){var A=n-l[C];if(S>=A)return r(t,e,S,m)}}}for(var x=-v+g;x<=v-b;x+=2){for(var C=s+x,w=(A=x===-v||x!==v&&l[C-1]<l[C+1]?l[C+1]:l[C-1]+1)-x;A<n&&w<i&&t.charAt(n-A-1)===e.charAt(i-w-1);)A++,w++;if(l[C]=A,A>n)b+=2;else if(w>i)g+=2;else if(!h){if((y=s+f-x)>=0&&y<a&&-1!==u[y]){var S=u[y];m=s+S-y;if(S>=(A=n-A))return r(t,e,S,m)}}}}return[[-1,t],[1,e]]}(t,e)}(t=t.substring(0,t.length-h),e=e.substring(0,e.length-h));return p&&g.unshift([0,p]),d&&g.push([0,d]),function t(e,n){e.push([0,""]);var r,s=0,a=0,c=0,f="",h="";for(;s<e.length;)if(s<e.length-1&&!e[s][1])e.splice(s,1);else switch(e[s][0]){case 1:c++,h+=e[s][1],s++;break;case-1:a++,f+=e[s][1],s++;break;case 0:var p=s-c-a-1;if(n){if(p>=0&&l(e[p][1])){var d=e[p][1].slice(-1);if(e[p][1]=e[p][1].slice(0,-1),f=d+f,h=d+h,!e[p][1]){e.splice(p,1),s--;var g=p-1;e[g]&&1===e[g][0]&&(c++,h=e[g][1]+h,g--),e[g]&&-1===e[g][0]&&(a++,f=e[g][1]+f,g--),p=g}}if(u(e[s][1])){d=e[s][1].charAt(0);e[s][1]=e[s][1].slice(1),f+=d,h+=d}}if(s<e.length-1&&!e[s][1]){e.splice(s,1);break}if(f.length>0||h.length>0){f.length>0&&h.length>0&&(0!==(r=i(h,f))&&(p>=0?e[p][1]+=h.substring(0,r):(e.splice(0,0,[0,h.substring(0,r)]),s++),h=h.substring(r),f=f.substring(r)),0!==(r=o(h,f))&&(e[s][1]=h.substring(h.length-r)+e[s][1],h=h.substring(0,h.length-r),f=f.substring(0,f.length-r)));var b=c+a;0===f.length&&0===h.length?(e.splice(s-b,b),s-=b):0===f.length?(e.splice(s-b,b,[1,h]),s=s-b+1):0===h.length?(e.splice(s-b,b,[-1,f]),s=s-b+1):(e.splice(s-b,b,[-1,f],[1,h]),s=s-b+2)}0!==s&&0===e[s-1][0]?(e[s-1][1]+=e[s][1],e.splice(s,1)):s++,c=0,a=0,f="",h=""}""===e[e.length-1][1]&&e.pop();var v=!1;s=1;for(;s<e.length-1;)0===e[s-1][0]&&0===e[s+1][0]&&(e[s][1].substring(e[s][1].length-e[s-1][1].length)===e[s-1][1]?(e[s][1]=e[s-1][1]+e[s][1].substring(0,e[s][1].length-e[s-1][1].length),e[s+1][1]=e[s-1][1]+e[s+1][1],e.splice(s-1,1),v=!0):e[s][1].substring(0,e[s+1][1].length)==e[s+1][1]&&(e[s-1][1]+=e[s+1][1],e[s][1]=e[s][1].substring(e[s+1][1].length)+e[s+1][1],e.splice(s+1,1),v=!0)),s++;v&&t(e,n)}(g,a),g}function r(t,e,r,i){var o=t.substring(0,r),s=e.substring(0,i),a=t.substring(r),u=e.substring(i),l=n(o,s),c=n(a,u);return l.concat(c)}function i(t,e){if(!t||!e||t.charAt(0)!==e.charAt(0))return 0;for(var n=0,r=Math.min(t.length,e.length),i=r,o=0;n<i;)t.substring(o,i)==e.substring(o,i)?o=n=i:r=i,i=Math.floor((r-n)/2+n);return s(t.charCodeAt(i-1))&&i--,i}function o(t,e){if(!t||!e||t.slice(-1)!==e.slice(-1))return 0;for(var n=0,r=Math.min(t.length,e.length),i=r,o=0;n<i;)t.substring(t.length-i,t.length-o)==e.substring(e.length-i,e.length-o)?o=n=i:r=i,i=Math.floor((r-n)/2+n);return a(t.charCodeAt(t.length-i))&&i--,i}function s(t){return t>=55296&&t<=56319}function a(t){return t>=56320&&t<=57343}function u(t){return a(t.charCodeAt(0))}function l(t){return s(t.charCodeAt(t.length-1))}function c(t,e,n,r){return l(t)||u(r)?null:function(t){for(var e=[],n=0;n<t.length;n++)t[n][1].length>0&&e.push(t[n]);return e}([[0,t],[-1,e],[1,n],[0,r]])}function f(t,e,r){return n(t,e,r,!0)}f.INSERT=1,f.DELETE=-1,f.EQUAL=0,t.exports=f},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i,o=r(n(1)),s=r(n(2));!function(t){t.compose=function(t,e,n){void 0===t&&(t={}),void 0===e&&(e={}),"object"!=typeof t&&(t={}),"object"!=typeof e&&(e={});var r=s.default(!0,{},e);for(var i in n||(r=Object.keys(r).reduce((function(t,e){return null!=r[e]&&(t[e]=r[e]),t}),{})),t)void 0!==t[i]&&void 0===e[i]&&(r[i]=t[i]);return Object.keys(r).length>0?r:void 0},t.diff=function(t,e){void 0===t&&(t={}),void 0===e&&(e={}),"object"!=typeof t&&(t={}),"object"!=typeof e&&(e={});var n=Object.keys(t).concat(Object.keys(e)).reduce((function(n,r){return o.default(t[r],e[r])||(n[r]=void 0===e[r]?null:e[r]),n}),{});return Object.keys(n).length>0?n:void 0},t.invert=function(t,e){void 0===t&&(t={}),void 0===e&&(e={}),t=t||{};var n=Object.keys(e).reduce((function(n,r){return e[r]!==t[r]&&void 0!==t[r]&&(n[r]=e[r]),n}),{});return Object.keys(t).reduce((function(n,r){return t[r]!==e[r]&&void 0===e[r]&&(n[r]=null),n}),n)},t.transform=function(t,e,n){if(void 0===n&&(n=!1),"object"!=typeof t)return e;if("object"==typeof e){if(!n)return e;var r=Object.keys(e).reduce((function(n,r){return void 0===t[r]&&(n[r]=e[r]),n}),{});return Object.keys(r).length>0?r:void 0}}}(i||(i={})),e.default=i},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=r(n(3)),o=function(){function t(t){this.ops=t,this.index=0,this.offset=0}return t.prototype.hasNext=function(){return this.peekLength()<1/0},t.prototype.next=function(t){t||(t=1/0);var e=this.ops[this.index];if(e){var n=this.offset,r=i.default.length(e);if(t>=r-n?(t=r-n,this.index+=1,this.offset=0):this.offset+=t,"number"==typeof e.delete)return{delete:t};var o={};return e.attributes&&(o.attributes=e.attributes),"number"==typeof e.retain?o.retain=t:"string"==typeof e.insert?o.insert=e.insert.substr(n,t):o.insert=e.insert,o}return{retain:1/0}},t.prototype.peek=function(){return this.ops[this.index]},t.prototype.peekLength=function(){return this.ops[this.index]?i.default.length(this.ops[this.index])-this.offset:1/0},t.prototype.peekType=function(){return this.ops[this.index]?"number"==typeof this.ops[this.index].delete?"delete":"number"==typeof this.ops[this.index].retain?"retain":"insert":"retain"},t.prototype.rest=function(){if(this.hasNext()){if(0===this.offset)return this.ops.slice(this.index);var t=this.offset,e=this.index,n=this.next(),r=this.ops.slice(this.index);return this.offset=t,this.index=e,[n].concat(r)}return[]},t}();e.default=o},function(t,e,n){var r=n(18),i=n(19);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[t.i,i,""]]);var o={insert:"head",singleton:!1},s=(r(t.i,i,o),i.locals?i.locals:{});t.exports=s},function(t,e,n){"use strict";var r,i=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},o=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),s={};function a(t,e,n){for(var r=0;r<e.length;r++){var i={css:e[r][1],media:e[r][2],sourceMap:e[r][3]};s[t][r]?s[t][r](i):s[t].push(g(i,n))}}function u(t){var e=document.createElement("style"),r=t.attributes||{};if(void 0===r.nonce){var i=n.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(t){e.setAttribute(t,r[t])})),"function"==typeof t.insert)t.insert(e);else{var s=o(t.insert||"head");if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(e)}return e}var l,c=(l=[],function(t,e){return l[t]=e,l.filter(Boolean).join("\n")});function f(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=c(e,i);else{var o=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}function h(t,e,n){var r=n.css,i=n.media,o=n.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),o&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var p=null,d=0;function g(t,e){var n,r,i;if(e.singleton){var o=d++;n=p||(p=u(e)),r=f.bind(null,n,o,!1),i=f.bind(null,n,o,!0)}else n=u(e),r=h.bind(null,n,e),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else i()}}t.exports=function(t,e,n){return(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=i()),t=n.base?t+n.base:t,e=e||[],s[t]||(s[t]=[]),a(t,e,n),function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){s[t]||(s[t]=[]),a(t,e,n);for(var r=e.length;r<s[t].length;r++)s[t][r]();s[t].length=e.length,0===s[t].length&&delete s[t]}}}},function(t,e,n){(e=n(20)(!1)).push([t.i,".ql-container{position:relative;overflow:hidden}.ql-cursor.hidden{display:none}.ql-cursor .ql-cursor-caret-container,.ql-cursor .ql-cursor-flag{position:absolute}.ql-cursor .ql-cursor-flag{z-index:1;transform:translate3d(-1px, -100%, 0);opacity:0;visibility:hidden;color:white;padding-bottom:2px;border-radius:0 3px 3px 0}.ql-cursor .ql-cursor-flag.flag-flipped{border-radius:3px 0 0 3px;transform:translate3d(calc(-100% + 1px), -100%, 0)}@media screen{.ql-cursor .ql-cursor-flag{transition:opacity 0ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms,visibility 0ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms}}.ql-cursor .ql-cursor-flag .ql-cursor-name{margin-left:5px;margin-right:5px;display:inline-block;margin-top:-2px;white-space:nowrap}.ql-cursor .ql-cursor-flag:hover,.ql-cursor .ql-cursor-flag.show-flag,.ql-cursor .ql-cursor-caret-container:hover+.ql-cursor-flag{opacity:1;visibility:visible;transition:none}.ql-cursor .ql-cursor-flag.no-delay[style]{transition-delay:unset !important}.ql-cursor .ql-cursor-caret-container{margin-left:-9px;padding:0 9px;z-index:1}.ql-cursor .ql-cursor-caret-container .ql-cursor-caret{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background-color:attr(data-color)}.ql-cursor .ql-cursor-selection-block{position:absolute;pointer-events:none}\n",""]),t.exports=e},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var i=(s=r,a=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),u="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(u," */")),o=r.sources.map((function(t){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(t," */")}));return[n].concat(o).concat([i]).join("\n")}var s,a,u;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,r){"string"==typeof t&&(t=[[null,t,""]]);var i={};if(r)for(var o=0;o<this.length;o++){var s=this[o][0];null!=s&&(i[s]=!0)}for(var a=0;a<t.length;a++){var u=[].concat(t[a]);r&&i[u[0]]||(n&&(u[2]?u[2]="".concat(n," and ").concat(u[2]):u[2]=n),e.push(u))}},e}}]).default}));

/***/ }),

/***/ "./node_modules/quill/dist/quill.js":
/*!******************************************!*\
  !*** ./node_modules/quill/dist/quill.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
 * Quill Editor v1.3.7
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 109);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(17);
var format_1 = __webpack_require__(18);
var leaf_1 = __webpack_require__(19);
var scroll_1 = __webpack_require__(45);
var inline_1 = __webpack_require__(46);
var block_1 = __webpack_require__(47);
var embed_1 = __webpack_require__(48);
var text_1 = __webpack_require__(49);
var attributor_1 = __webpack_require__(12);
var class_1 = __webpack_require__(32);
var style_1 = __webpack_require__(33);
var store_1 = __webpack_require__(31);
var Registry = __webpack_require__(1);
var Parchment = {
    Scope: Registry.Scope,
    create: Registry.create,
    find: Registry.find,
    query: Registry.query,
    register: Registry.register,
    Container: container_1.default,
    Format: format_1.default,
    Leaf: leaf_1.default,
    Embed: embed_1.default,
    Scroll: scroll_1.default,
    Block: block_1.default,
    Inline: inline_1.default,
    Text: text_1.default,
    Attributor: {
        Attribute: attributor_1.default,
        Class: class_1.default,
        Style: style_1.default,
        Store: store_1.default,
    },
};
exports.default = Parchment;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ParchmentError = /** @class */ (function (_super) {
    __extends(ParchmentError, _super);
    function ParchmentError(message) {
        var _this = this;
        message = '[Parchment] ' + message;
        _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = _this.constructor.name;
        return _this;
    }
    return ParchmentError;
}(Error));
exports.ParchmentError = ParchmentError;
var attributes = {};
var classes = {};
var tags = {};
var types = {};
exports.DATA_KEY = '__blot';
var Scope;
(function (Scope) {
    Scope[Scope["TYPE"] = 3] = "TYPE";
    Scope[Scope["LEVEL"] = 12] = "LEVEL";
    Scope[Scope["ATTRIBUTE"] = 13] = "ATTRIBUTE";
    Scope[Scope["BLOT"] = 14] = "BLOT";
    Scope[Scope["INLINE"] = 7] = "INLINE";
    Scope[Scope["BLOCK"] = 11] = "BLOCK";
    Scope[Scope["BLOCK_BLOT"] = 10] = "BLOCK_BLOT";
    Scope[Scope["INLINE_BLOT"] = 6] = "INLINE_BLOT";
    Scope[Scope["BLOCK_ATTRIBUTE"] = 9] = "BLOCK_ATTRIBUTE";
    Scope[Scope["INLINE_ATTRIBUTE"] = 5] = "INLINE_ATTRIBUTE";
    Scope[Scope["ANY"] = 15] = "ANY";
})(Scope = exports.Scope || (exports.Scope = {}));
function create(input, value) {
    var match = query(input);
    if (match == null) {
        throw new ParchmentError("Unable to create " + input + " blot");
    }
    var BlotClass = match;
    var node = 
    // @ts-ignore
    input instanceof Node || input['nodeType'] === Node.TEXT_NODE ? input : BlotClass.create(value);
    return new BlotClass(node, value);
}
exports.create = create;
function find(node, bubble) {
    if (bubble === void 0) { bubble = false; }
    if (node == null)
        return null;
    // @ts-ignore
    if (node[exports.DATA_KEY] != null)
        return node[exports.DATA_KEY].blot;
    if (bubble)
        return find(node.parentNode, bubble);
    return null;
}
exports.find = find;
function query(query, scope) {
    if (scope === void 0) { scope = Scope.ANY; }
    var match;
    if (typeof query === 'string') {
        match = types[query] || attributes[query];
        // @ts-ignore
    }
    else if (query instanceof Text || query['nodeType'] === Node.TEXT_NODE) {
        match = types['text'];
    }
    else if (typeof query === 'number') {
        if (query & Scope.LEVEL & Scope.BLOCK) {
            match = types['block'];
        }
        else if (query & Scope.LEVEL & Scope.INLINE) {
            match = types['inline'];
        }
    }
    else if (query instanceof HTMLElement) {
        var names = (query.getAttribute('class') || '').split(/\s+/);
        for (var i in names) {
            match = classes[names[i]];
            if (match)
                break;
        }
        match = match || tags[query.tagName];
    }
    if (match == null)
        return null;
    // @ts-ignore
    if (scope & Scope.LEVEL & match.scope && scope & Scope.TYPE & match.scope)
        return match;
    return null;
}
exports.query = query;
function register() {
    var Definitions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Definitions[_i] = arguments[_i];
    }
    if (Definitions.length > 1) {
        return Definitions.map(function (d) {
            return register(d);
        });
    }
    var Definition = Definitions[0];
    if (typeof Definition.blotName !== 'string' && typeof Definition.attrName !== 'string') {
        throw new ParchmentError('Invalid definition');
    }
    else if (Definition.blotName === 'abstract') {
        throw new ParchmentError('Cannot register abstract class');
    }
    types[Definition.blotName || Definition.attrName] = Definition;
    if (typeof Definition.keyName === 'string') {
        attributes[Definition.keyName] = Definition;
    }
    else {
        if (Definition.className != null) {
            classes[Definition.className] = Definition;
        }
        if (Definition.tagName != null) {
            if (Array.isArray(Definition.tagName)) {
                Definition.tagName = Definition.tagName.map(function (tagName) {
                    return tagName.toUpperCase();
                });
            }
            else {
                Definition.tagName = Definition.tagName.toUpperCase();
            }
            var tagNames = Array.isArray(Definition.tagName) ? Definition.tagName : [Definition.tagName];
            tagNames.forEach(function (tag) {
                if (tags[tag] == null || Definition.className == null) {
                    tags[tag] = Definition;
                }
            });
        }
    }
    return Definition;
}
exports.register = register;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var diff = __webpack_require__(51);
var equal = __webpack_require__(11);
var extend = __webpack_require__(3);
var op = __webpack_require__(20);


var NULL_CHARACTER = String.fromCharCode(0);  // Placeholder char for embed in diff()


var Delta = function (ops) {
  // Assume we are given a well formed ops
  if (Array.isArray(ops)) {
    this.ops = ops;
  } else if (ops != null && Array.isArray(ops.ops)) {
    this.ops = ops.ops;
  } else {
    this.ops = [];
  }
};


Delta.prototype.insert = function (text, attributes) {
  var newOp = {};
  if (text.length === 0) return this;
  newOp.insert = text;
  if (attributes != null && typeof attributes === 'object' && Object.keys(attributes).length > 0) {
    newOp.attributes = attributes;
  }
  return this.push(newOp);
};

Delta.prototype['delete'] = function (length) {
  if (length <= 0) return this;
  return this.push({ 'delete': length });
};

Delta.prototype.retain = function (length, attributes) {
  if (length <= 0) return this;
  var newOp = { retain: length };
  if (attributes != null && typeof attributes === 'object' && Object.keys(attributes).length > 0) {
    newOp.attributes = attributes;
  }
  return this.push(newOp);
};

Delta.prototype.push = function (newOp) {
  var index = this.ops.length;
  var lastOp = this.ops[index - 1];
  newOp = extend(true, {}, newOp);
  if (typeof lastOp === 'object') {
    if (typeof newOp['delete'] === 'number' && typeof lastOp['delete'] === 'number') {
      this.ops[index - 1] = { 'delete': lastOp['delete'] + newOp['delete'] };
      return this;
    }
    // Since it does not matter if we insert before or after deleting at the same index,
    // always prefer to insert first
    if (typeof lastOp['delete'] === 'number' && newOp.insert != null) {
      index -= 1;
      lastOp = this.ops[index - 1];
      if (typeof lastOp !== 'object') {
        this.ops.unshift(newOp);
        return this;
      }
    }
    if (equal(newOp.attributes, lastOp.attributes)) {
      if (typeof newOp.insert === 'string' && typeof lastOp.insert === 'string') {
        this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };
        if (typeof newOp.attributes === 'object') this.ops[index - 1].attributes = newOp.attributes
        return this;
      } else if (typeof newOp.retain === 'number' && typeof lastOp.retain === 'number') {
        this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };
        if (typeof newOp.attributes === 'object') this.ops[index - 1].attributes = newOp.attributes
        return this;
      }
    }
  }
  if (index === this.ops.length) {
    this.ops.push(newOp);
  } else {
    this.ops.splice(index, 0, newOp);
  }
  return this;
};

Delta.prototype.chop = function () {
  var lastOp = this.ops[this.ops.length - 1];
  if (lastOp && lastOp.retain && !lastOp.attributes) {
    this.ops.pop();
  }
  return this;
};

Delta.prototype.filter = function (predicate) {
  return this.ops.filter(predicate);
};

Delta.prototype.forEach = function (predicate) {
  this.ops.forEach(predicate);
};

Delta.prototype.map = function (predicate) {
  return this.ops.map(predicate);
};

Delta.prototype.partition = function (predicate) {
  var passed = [], failed = [];
  this.forEach(function(op) {
    var target = predicate(op) ? passed : failed;
    target.push(op);
  });
  return [passed, failed];
};

Delta.prototype.reduce = function (predicate, initial) {
  return this.ops.reduce(predicate, initial);
};

Delta.prototype.changeLength = function () {
  return this.reduce(function (length, elem) {
    if (elem.insert) {
      return length + op.length(elem);
    } else if (elem.delete) {
      return length - elem.delete;
    }
    return length;
  }, 0);
};

Delta.prototype.length = function () {
  return this.reduce(function (length, elem) {
    return length + op.length(elem);
  }, 0);
};

Delta.prototype.slice = function (start, end) {
  start = start || 0;
  if (typeof end !== 'number') end = Infinity;
  var ops = [];
  var iter = op.iterator(this.ops);
  var index = 0;
  while (index < end && iter.hasNext()) {
    var nextOp;
    if (index < start) {
      nextOp = iter.next(start - index);
    } else {
      nextOp = iter.next(end - index);
      ops.push(nextOp);
    }
    index += op.length(nextOp);
  }
  return new Delta(ops);
};


Delta.prototype.compose = function (other) {
  var thisIter = op.iterator(this.ops);
  var otherIter = op.iterator(other.ops);
  var ops = [];
  var firstOther = otherIter.peek();
  if (firstOther != null && typeof firstOther.retain === 'number' && firstOther.attributes == null) {
    var firstLeft = firstOther.retain;
    while (thisIter.peekType() === 'insert' && thisIter.peekLength() <= firstLeft) {
      firstLeft -= thisIter.peekLength();
      ops.push(thisIter.next());
    }
    if (firstOther.retain - firstLeft > 0) {
      otherIter.next(firstOther.retain - firstLeft);
    }
  }
  var delta = new Delta(ops);
  while (thisIter.hasNext() || otherIter.hasNext()) {
    if (otherIter.peekType() === 'insert') {
      delta.push(otherIter.next());
    } else if (thisIter.peekType() === 'delete') {
      delta.push(thisIter.next());
    } else {
      var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
      var thisOp = thisIter.next(length);
      var otherOp = otherIter.next(length);
      if (typeof otherOp.retain === 'number') {
        var newOp = {};
        if (typeof thisOp.retain === 'number') {
          newOp.retain = length;
        } else {
          newOp.insert = thisOp.insert;
        }
        // Preserve null when composing with a retain, otherwise remove it for inserts
        var attributes = op.attributes.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === 'number');
        if (attributes) newOp.attributes = attributes;
        delta.push(newOp);

        // Optimization if rest of other is just retain
        if (!otherIter.hasNext() && equal(delta.ops[delta.ops.length - 1], newOp)) {
          var rest = new Delta(thisIter.rest());
          return delta.concat(rest).chop();
        }

      // Other op should be delete, we could be an insert or retain
      // Insert + delete cancels out
      } else if (typeof otherOp['delete'] === 'number' && typeof thisOp.retain === 'number') {
        delta.push(otherOp);
      }
    }
  }
  return delta.chop();
};

Delta.prototype.concat = function (other) {
  var delta = new Delta(this.ops.slice());
  if (other.ops.length > 0) {
    delta.push(other.ops[0]);
    delta.ops = delta.ops.concat(other.ops.slice(1));
  }
  return delta;
};

Delta.prototype.diff = function (other, index) {
  if (this.ops === other.ops) {
    return new Delta();
  }
  var strings = [this, other].map(function (delta) {
    return delta.map(function (op) {
      if (op.insert != null) {
        return typeof op.insert === 'string' ? op.insert : NULL_CHARACTER;
      }
      var prep = (delta === other) ? 'on' : 'with';
      throw new Error('diff() called ' + prep + ' non-document');
    }).join('');
  });
  var delta = new Delta();
  var diffResult = diff(strings[0], strings[1], index);
  var thisIter = op.iterator(this.ops);
  var otherIter = op.iterator(other.ops);
  diffResult.forEach(function (component) {
    var length = component[1].length;
    while (length > 0) {
      var opLength = 0;
      switch (component[0]) {
        case diff.INSERT:
          opLength = Math.min(otherIter.peekLength(), length);
          delta.push(otherIter.next(opLength));
          break;
        case diff.DELETE:
          opLength = Math.min(length, thisIter.peekLength());
          thisIter.next(opLength);
          delta['delete'](opLength);
          break;
        case diff.EQUAL:
          opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);
          var thisOp = thisIter.next(opLength);
          var otherOp = otherIter.next(opLength);
          if (equal(thisOp.insert, otherOp.insert)) {
            delta.retain(opLength, op.attributes.diff(thisOp.attributes, otherOp.attributes));
          } else {
            delta.push(otherOp)['delete'](opLength);
          }
          break;
      }
      length -= opLength;
    }
  });
  return delta.chop();
};

Delta.prototype.eachLine = function (predicate, newline) {
  newline = newline || '\n';
  var iter = op.iterator(this.ops);
  var line = new Delta();
  var i = 0;
  while (iter.hasNext()) {
    if (iter.peekType() !== 'insert') return;
    var thisOp = iter.peek();
    var start = op.length(thisOp) - iter.peekLength();
    var index = typeof thisOp.insert === 'string' ?
      thisOp.insert.indexOf(newline, start) - start : -1;
    if (index < 0) {
      line.push(iter.next());
    } else if (index > 0) {
      line.push(iter.next(index));
    } else {
      if (predicate(line, iter.next(1).attributes || {}, i) === false) {
        return;
      }
      i += 1;
      line = new Delta();
    }
  }
  if (line.length() > 0) {
    predicate(line, {}, i);
  }
};

Delta.prototype.transform = function (other, priority) {
  priority = !!priority;
  if (typeof other === 'number') {
    return this.transformPosition(other, priority);
  }
  var thisIter = op.iterator(this.ops);
  var otherIter = op.iterator(other.ops);
  var delta = new Delta();
  while (thisIter.hasNext() || otherIter.hasNext()) {
    if (thisIter.peekType() === 'insert' && (priority || otherIter.peekType() !== 'insert')) {
      delta.retain(op.length(thisIter.next()));
    } else if (otherIter.peekType() === 'insert') {
      delta.push(otherIter.next());
    } else {
      var length = Math.min(thisIter.peekLength(), otherIter.peekLength());
      var thisOp = thisIter.next(length);
      var otherOp = otherIter.next(length);
      if (thisOp['delete']) {
        // Our delete either makes their delete redundant or removes their retain
        continue;
      } else if (otherOp['delete']) {
        delta.push(otherOp);
      } else {
        // We retain either their retain or insert
        delta.retain(length, op.attributes.transform(thisOp.attributes, otherOp.attributes, priority));
      }
    }
  }
  return delta.chop();
};

Delta.prototype.transformPosition = function (index, priority) {
  priority = !!priority;
  var thisIter = op.iterator(this.ops);
  var offset = 0;
  while (thisIter.hasNext() && offset <= index) {
    var length = thisIter.peekLength();
    var nextType = thisIter.peekType();
    thisIter.next();
    if (nextType === 'delete') {
      index -= Math.min(length, index - offset);
      continue;
    } else if (nextType === 'insert' && (offset < index || !priority)) {
      index += length;
    }
    offset += length;
  }
  return index;
};


module.exports = Delta;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockEmbed = exports.bubbleFormats = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _break = __webpack_require__(16);

var _break2 = _interopRequireDefault(_break);

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

var _text = __webpack_require__(7);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NEWLINE_LENGTH = 1;

var BlockEmbed = function (_Parchment$Embed) {
  _inherits(BlockEmbed, _Parchment$Embed);

  function BlockEmbed() {
    _classCallCheck(this, BlockEmbed);

    return _possibleConstructorReturn(this, (BlockEmbed.__proto__ || Object.getPrototypeOf(BlockEmbed)).apply(this, arguments));
  }

  _createClass(BlockEmbed, [{
    key: 'attach',
    value: function attach() {
      _get(BlockEmbed.prototype.__proto__ || Object.getPrototypeOf(BlockEmbed.prototype), 'attach', this).call(this);
      this.attributes = new _parchment2.default.Attributor.Store(this.domNode);
    }
  }, {
    key: 'delta',
    value: function delta() {
      return new _quillDelta2.default().insert(this.value(), (0, _extend2.default)(this.formats(), this.attributes.values()));
    }
  }, {
    key: 'format',
    value: function format(name, value) {
      var attribute = _parchment2.default.query(name, _parchment2.default.Scope.BLOCK_ATTRIBUTE);
      if (attribute != null) {
        this.attributes.attribute(attribute, value);
      }
    }
  }, {
    key: 'formatAt',
    value: function formatAt(index, length, name, value) {
      this.format(name, value);
    }
  }, {
    key: 'insertAt',
    value: function insertAt(index, value, def) {
      if (typeof value === 'string' && value.endsWith('\n')) {
        var block = _parchment2.default.create(Block.blotName);
        this.parent.insertBefore(block, index === 0 ? this : this.next);
        block.insertAt(0, value.slice(0, -1));
      } else {
        _get(BlockEmbed.prototype.__proto__ || Object.getPrototypeOf(BlockEmbed.prototype), 'insertAt', this).call(this, index, value, def);
      }
    }
  }]);

  return BlockEmbed;
}(_parchment2.default.Embed);

BlockEmbed.scope = _parchment2.default.Scope.BLOCK_BLOT;
// It is important for cursor behavior BlockEmbeds use tags that are block level elements


var Block = function (_Parchment$Block) {
  _inherits(Block, _Parchment$Block);

  function Block(domNode) {
    _classCallCheck(this, Block);

    var _this2 = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, domNode));

    _this2.cache = {};
    return _this2;
  }

  _createClass(Block, [{
    key: 'delta',
    value: function delta() {
      if (this.cache.delta == null) {
        this.cache.delta = this.descendants(_parchment2.default.Leaf).reduce(function (delta, leaf) {
          if (leaf.length() === 0) {
            return delta;
          } else {
            return delta.insert(leaf.value(), bubbleFormats(leaf));
          }
        }, new _quillDelta2.default()).insert('\n', bubbleFormats(this));
      }
      return this.cache.delta;
    }
  }, {
    key: 'deleteAt',
    value: function deleteAt(index, length) {
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'deleteAt', this).call(this, index, length);
      this.cache = {};
    }
  }, {
    key: 'formatAt',
    value: function formatAt(index, length, name, value) {
      if (length <= 0) return;
      if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK)) {
        if (index + length === this.length()) {
          this.format(name, value);
        }
      } else {
        _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'formatAt', this).call(this, index, Math.min(length, this.length() - index - 1), name, value);
      }
      this.cache = {};
    }
  }, {
    key: 'insertAt',
    value: function insertAt(index, value, def) {
      if (def != null) return _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertAt', this).call(this, index, value, def);
      if (value.length === 0) return;
      var lines = value.split('\n');
      var text = lines.shift();
      if (text.length > 0) {
        if (index < this.length() - 1 || this.children.tail == null) {
          _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertAt', this).call(this, Math.min(index, this.length() - 1), text);
        } else {
          this.children.tail.insertAt(this.children.tail.length(), text);
        }
        this.cache = {};
      }
      var block = this;
      lines.reduce(function (index, line) {
        block = block.split(index, true);
        block.insertAt(0, line);
        return line.length;
      }, index + text.length);
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(blot, ref) {
      var head = this.children.head;
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'insertBefore', this).call(this, blot, ref);
      if (head instanceof _break2.default) {
        head.remove();
      }
      this.cache = {};
    }
  }, {
    key: 'length',
    value: function length() {
      if (this.cache.length == null) {
        this.cache.length = _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'length', this).call(this) + NEWLINE_LENGTH;
      }
      return this.cache.length;
    }
  }, {
    key: 'moveChildren',
    value: function moveChildren(target, ref) {
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'moveChildren', this).call(this, target, ref);
      this.cache = {};
    }
  }, {
    key: 'optimize',
    value: function optimize(context) {
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'optimize', this).call(this, context);
      this.cache = {};
    }
  }, {
    key: 'path',
    value: function path(index) {
      return _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'path', this).call(this, index, true);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'removeChild', this).call(this, child);
      this.cache = {};
    }
  }, {
    key: 'split',
    value: function split(index) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (force && (index === 0 || index >= this.length() - NEWLINE_LENGTH)) {
        var clone = this.clone();
        if (index === 0) {
          this.parent.insertBefore(clone, this);
          return this;
        } else {
          this.parent.insertBefore(clone, this.next);
          return clone;
        }
      } else {
        var next = _get(Block.prototype.__proto__ || Object.getPrototypeOf(Block.prototype), 'split', this).call(this, index, force);
        this.cache = {};
        return next;
      }
    }
  }]);

  return Block;
}(_parchment2.default.Block);

Block.blotName = 'block';
Block.tagName = 'P';
Block.defaultChild = 'break';
Block.allowedChildren = [_inline2.default, _parchment2.default.Embed, _text2.default];

function bubbleFormats(blot) {
  var formats = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (blot == null) return formats;
  if (typeof blot.formats === 'function') {
    formats = (0, _extend2.default)(formats, blot.formats());
  }
  if (blot.parent == null || blot.parent.blotName == 'scroll' || blot.parent.statics.scope !== blot.statics.scope) {
    return formats;
  }
  return bubbleFormats(blot.parent, formats);
}

exports.bubbleFormats = bubbleFormats;
exports.BlockEmbed = BlockEmbed;
exports.default = Block;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.overload = exports.expandConfig = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(50);

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _editor = __webpack_require__(14);

var _editor2 = _interopRequireDefault(_editor);

var _emitter3 = __webpack_require__(8);

var _emitter4 = _interopRequireDefault(_emitter3);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _selection = __webpack_require__(15);

var _selection2 = _interopRequireDefault(_selection);

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _logger = __webpack_require__(10);

var _logger2 = _interopRequireDefault(_logger);

var _theme = __webpack_require__(34);

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _logger2.default)('quill');

var Quill = function () {
  _createClass(Quill, null, [{
    key: 'debug',
    value: function debug(limit) {
      if (limit === true) {
        limit = 'log';
      }
      _logger2.default.level(limit);
    }
  }, {
    key: 'find',
    value: function find(node) {
      return node.__quill || _parchment2.default.find(node);
    }
  }, {
    key: 'import',
    value: function _import(name) {
      if (this.imports[name] == null) {
        debug.error('Cannot import ' + name + '. Are you sure it was registered?');
      }
      return this.imports[name];
    }
  }, {
    key: 'register',
    value: function register(path, target) {
      var _this = this;

      var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (typeof path !== 'string') {
        var name = path.attrName || path.blotName;
        if (typeof name === 'string') {
          // register(Blot | Attributor, overwrite)
          this.register('formats/' + name, path, target);
        } else {
          Object.keys(path).forEach(function (key) {
            _this.register(key, path[key], target);
          });
        }
      } else {
        if (this.imports[path] != null && !overwrite) {
          debug.warn('Overwriting ' + path + ' with', target);
        }
        this.imports[path] = target;
        if ((path.startsWith('blots/') || path.startsWith('formats/')) && target.blotName !== 'abstract') {
          _parchment2.default.register(target);
        } else if (path.startsWith('modules') && typeof target.register === 'function') {
          target.register();
        }
      }
    }
  }]);

  function Quill(container) {
    var _this2 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Quill);

    this.options = expandConfig(container, options);
    this.container = this.options.container;
    if (this.container == null) {
      return debug.error('Invalid Quill container', container);
    }
    if (this.options.debug) {
      Quill.debug(this.options.debug);
    }
    var html = this.container.innerHTML.trim();
    this.container.classList.add('ql-container');
    this.container.innerHTML = '';
    this.container.__quill = this;
    this.root = this.addContainer('ql-editor');
    this.root.classList.add('ql-blank');
    this.root.setAttribute('data-gramm', false);
    this.scrollingContainer = this.options.scrollingContainer || this.root;
    this.emitter = new _emitter4.default();
    this.scroll = _parchment2.default.create(this.root, {
      emitter: this.emitter,
      whitelist: this.options.formats
    });
    this.editor = new _editor2.default(this.scroll);
    this.selection = new _selection2.default(this.scroll, this.emitter);
    this.theme = new this.options.theme(this, this.options);
    this.keyboard = this.theme.addModule('keyboard');
    this.clipboard = this.theme.addModule('clipboard');
    this.history = this.theme.addModule('history');
    this.theme.init();
    this.emitter.on(_emitter4.default.events.EDITOR_CHANGE, function (type) {
      if (type === _emitter4.default.events.TEXT_CHANGE) {
        _this2.root.classList.toggle('ql-blank', _this2.editor.isBlank());
      }
    });
    this.emitter.on(_emitter4.default.events.SCROLL_UPDATE, function (source, mutations) {
      var range = _this2.selection.lastRange;
      var index = range && range.length === 0 ? range.index : undefined;
      modify.call(_this2, function () {
        return _this2.editor.update(null, mutations, index);
      }, source);
    });
    var contents = this.clipboard.convert('<div class=\'ql-editor\' style="white-space: normal;">' + html + '<p><br></p></div>');
    this.setContents(contents);
    this.history.clear();
    if (this.options.placeholder) {
      this.root.setAttribute('data-placeholder', this.options.placeholder);
    }
    if (this.options.readOnly) {
      this.disable();
    }
  }

  _createClass(Quill, [{
    key: 'addContainer',
    value: function addContainer(container) {
      var refNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (typeof container === 'string') {
        var className = container;
        container = document.createElement('div');
        container.classList.add(className);
      }
      this.container.insertBefore(container, refNode);
      return container;
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.selection.setRange(null);
    }
  }, {
    key: 'deleteText',
    value: function deleteText(index, length, source) {
      var _this3 = this;

      var _overload = overload(index, length, source);

      var _overload2 = _slicedToArray(_overload, 4);

      index = _overload2[0];
      length = _overload2[1];
      source = _overload2[3];

      return modify.call(this, function () {
        return _this3.editor.deleteText(index, length);
      }, source, index, -1 * length);
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.enable(false);
    }
  }, {
    key: 'enable',
    value: function enable() {
      var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.scroll.enable(enabled);
      this.container.classList.toggle('ql-disabled', !enabled);
    }
  }, {
    key: 'focus',
    value: function focus() {
      var scrollTop = this.scrollingContainer.scrollTop;
      this.selection.focus();
      this.scrollingContainer.scrollTop = scrollTop;
      this.scrollIntoView();
    }
  }, {
    key: 'format',
    value: function format(name, value) {
      var _this4 = this;

      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _emitter4.default.sources.API;

      return modify.call(this, function () {
        var range = _this4.getSelection(true);
        var change = new _quillDelta2.default();
        if (range == null) {
          return change;
        } else if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK)) {
          change = _this4.editor.formatLine(range.index, range.length, _defineProperty({}, name, value));
        } else if (range.length === 0) {
          _this4.selection.format(name, value);
          return change;
        } else {
          change = _this4.editor.formatText(range.index, range.length, _defineProperty({}, name, value));
        }
        _this4.setSelection(range, _emitter4.default.sources.SILENT);
        return change;
      }, source);
    }
  }, {
    key: 'formatLine',
    value: function formatLine(index, length, name, value, source) {
      var _this5 = this;

      var formats = void 0;

      var _overload3 = overload(index, length, name, value, source);

      var _overload4 = _slicedToArray(_overload3, 4);

      index = _overload4[0];
      length = _overload4[1];
      formats = _overload4[2];
      source = _overload4[3];

      return modify.call(this, function () {
        return _this5.editor.formatLine(index, length, formats);
      }, source, index, 0);
    }
  }, {
    key: 'formatText',
    value: function formatText(index, length, name, value, source) {
      var _this6 = this;

      var formats = void 0;

      var _overload5 = overload(index, length, name, value, source);

      var _overload6 = _slicedToArray(_overload5, 4);

      index = _overload6[0];
      length = _overload6[1];
      formats = _overload6[2];
      source = _overload6[3];

      return modify.call(this, function () {
        return _this6.editor.formatText(index, length, formats);
      }, source, index, 0);
    }
  }, {
    key: 'getBounds',
    value: function getBounds(index) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var bounds = void 0;
      if (typeof index === 'number') {
        bounds = this.selection.getBounds(index, length);
      } else {
        bounds = this.selection.getBounds(index.index, index.length);
      }
      var containerBounds = this.container.getBoundingClientRect();
      return {
        bottom: bounds.bottom - containerBounds.top,
        height: bounds.height,
        left: bounds.left - containerBounds.left,
        right: bounds.right - containerBounds.left,
        top: bounds.top - containerBounds.top,
        width: bounds.width
      };
    }
  }, {
    key: 'getContents',
    value: function getContents() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;

      var _overload7 = overload(index, length);

      var _overload8 = _slicedToArray(_overload7, 2);

      index = _overload8[0];
      length = _overload8[1];

      return this.editor.getContents(index, length);
    }
  }, {
    key: 'getFormat',
    value: function getFormat() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getSelection(true);
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (typeof index === 'number') {
        return this.editor.getFormat(index, length);
      } else {
        return this.editor.getFormat(index.index, index.length);
      }
    }
  }, {
    key: 'getIndex',
    value: function getIndex(blot) {
      return blot.offset(this.scroll);
    }
  }, {
    key: 'getLength',
    value: function getLength() {
      return this.scroll.length();
    }
  }, {
    key: 'getLeaf',
    value: function getLeaf(index) {
      return this.scroll.leaf(index);
    }
  }, {
    key: 'getLine',
    value: function getLine(index) {
      return this.scroll.line(index);
    }
  }, {
    key: 'getLines',
    value: function getLines() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;

      if (typeof index !== 'number') {
        return this.scroll.lines(index.index, index.length);
      } else {
        return this.scroll.lines(index, length);
      }
    }
  }, {
    key: 'getModule',
    value: function getModule(name) {
      return this.theme.modules[name];
    }
  }, {
    key: 'getSelection',
    value: function getSelection() {
      var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (focus) this.focus();
      this.update(); // Make sure we access getRange with editor in consistent state
      return this.selection.getRange()[0];
    }
  }, {
    key: 'getText',
    value: function getText() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLength() - index;

      var _overload9 = overload(index, length);

      var _overload10 = _slicedToArray(_overload9, 2);

      index = _overload10[0];
      length = _overload10[1];

      return this.editor.getText(index, length);
    }
  }, {
    key: 'hasFocus',
    value: function hasFocus() {
      return this.selection.hasFocus();
    }
  }, {
    key: 'insertEmbed',
    value: function insertEmbed(index, embed, value) {
      var _this7 = this;

      var source = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Quill.sources.API;

      return modify.call(this, function () {
        return _this7.editor.insertEmbed(index, embed, value);
      }, source, index);
    }
  }, {
    key: 'insertText',
    value: function insertText(index, text, name, value, source) {
      var _this8 = this;

      var formats = void 0;

      var _overload11 = overload(index, 0, name, value, source);

      var _overload12 = _slicedToArray(_overload11, 4);

      index = _overload12[0];
      formats = _overload12[2];
      source = _overload12[3];

      return modify.call(this, function () {
        return _this8.editor.insertText(index, text, formats);
      }, source, index, text.length);
    }
  }, {
    key: 'isEnabled',
    value: function isEnabled() {
      return !this.container.classList.contains('ql-disabled');
    }
  }, {
    key: 'off',
    value: function off() {
      return this.emitter.off.apply(this.emitter, arguments);
    }
  }, {
    key: 'on',
    value: function on() {
      return this.emitter.on.apply(this.emitter, arguments);
    }
  }, {
    key: 'once',
    value: function once() {
      return this.emitter.once.apply(this.emitter, arguments);
    }
  }, {
    key: 'pasteHTML',
    value: function pasteHTML(index, html, source) {
      this.clipboard.dangerouslyPasteHTML(index, html, source);
    }
  }, {
    key: 'removeFormat',
    value: function removeFormat(index, length, source) {
      var _this9 = this;

      var _overload13 = overload(index, length, source);

      var _overload14 = _slicedToArray(_overload13, 4);

      index = _overload14[0];
      length = _overload14[1];
      source = _overload14[3];

      return modify.call(this, function () {
        return _this9.editor.removeFormat(index, length);
      }, source, index);
    }
  }, {
    key: 'scrollIntoView',
    value: function scrollIntoView() {
      this.selection.scrollIntoView(this.scrollingContainer);
    }
  }, {
    key: 'setContents',
    value: function setContents(delta) {
      var _this10 = this;

      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;

      return modify.call(this, function () {
        delta = new _quillDelta2.default(delta);
        var length = _this10.getLength();
        var deleted = _this10.editor.deleteText(0, length);
        var applied = _this10.editor.applyDelta(delta);
        var lastOp = applied.ops[applied.ops.length - 1];
        if (lastOp != null && typeof lastOp.insert === 'string' && lastOp.insert[lastOp.insert.length - 1] === '\n') {
          _this10.editor.deleteText(_this10.getLength() - 1, 1);
          applied.delete(1);
        }
        var ret = deleted.compose(applied);
        return ret;
      }, source);
    }
  }, {
    key: 'setSelection',
    value: function setSelection(index, length, source) {
      if (index == null) {
        this.selection.setRange(null, length || Quill.sources.API);
      } else {
        var _overload15 = overload(index, length, source);

        var _overload16 = _slicedToArray(_overload15, 4);

        index = _overload16[0];
        length = _overload16[1];
        source = _overload16[3];

        this.selection.setRange(new _selection.Range(index, length), source);
        if (source !== _emitter4.default.sources.SILENT) {
          this.selection.scrollIntoView(this.scrollingContainer);
        }
      }
    }
  }, {
    key: 'setText',
    value: function setText(text) {
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;

      var delta = new _quillDelta2.default().insert(text);
      return this.setContents(delta, source);
    }
  }, {
    key: 'update',
    value: function update() {
      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _emitter4.default.sources.USER;

      var change = this.scroll.update(source); // Will update selection before selection.update() does if text changes
      this.selection.update(source);
      return change;
    }
  }, {
    key: 'updateContents',
    value: function updateContents(delta) {
      var _this11 = this;

      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _emitter4.default.sources.API;

      return modify.call(this, function () {
        delta = new _quillDelta2.default(delta);
        return _this11.editor.applyDelta(delta, source);
      }, source, true);
    }
  }]);

  return Quill;
}();

Quill.DEFAULTS = {
  bounds: null,
  formats: null,
  modules: {},
  placeholder: '',
  readOnly: false,
  scrollingContainer: null,
  strict: true,
  theme: 'default'
};
Quill.events = _emitter4.default.events;
Quill.sources = _emitter4.default.sources;
// eslint-disable-next-line no-undef
Quill.version =  false ? undefined : "1.3.7";

Quill.imports = {
  'delta': _quillDelta2.default,
  'parchment': _parchment2.default,
  'core/module': _module2.default,
  'core/theme': _theme2.default
};

function expandConfig(container, userConfig) {
  userConfig = (0, _extend2.default)(true, {
    container: container,
    modules: {
      clipboard: true,
      keyboard: true,
      history: true
    }
  }, userConfig);
  if (!userConfig.theme || userConfig.theme === Quill.DEFAULTS.theme) {
    userConfig.theme = _theme2.default;
  } else {
    userConfig.theme = Quill.import('themes/' + userConfig.theme);
    if (userConfig.theme == null) {
      throw new Error('Invalid theme ' + userConfig.theme + '. Did you register it?');
    }
  }
  var themeConfig = (0, _extend2.default)(true, {}, userConfig.theme.DEFAULTS);
  [themeConfig, userConfig].forEach(function (config) {
    config.modules = config.modules || {};
    Object.keys(config.modules).forEach(function (module) {
      if (config.modules[module] === true) {
        config.modules[module] = {};
      }
    });
  });
  var moduleNames = Object.keys(themeConfig.modules).concat(Object.keys(userConfig.modules));
  var moduleConfig = moduleNames.reduce(function (config, name) {
    var moduleClass = Quill.import('modules/' + name);
    if (moduleClass == null) {
      debug.error('Cannot load ' + name + ' module. Are you sure you registered it?');
    } else {
      config[name] = moduleClass.DEFAULTS || {};
    }
    return config;
  }, {});
  // Special case toolbar shorthand
  if (userConfig.modules != null && userConfig.modules.toolbar && userConfig.modules.toolbar.constructor !== Object) {
    userConfig.modules.toolbar = {
      container: userConfig.modules.toolbar
    };
  }
  userConfig = (0, _extend2.default)(true, {}, Quill.DEFAULTS, { modules: moduleConfig }, themeConfig, userConfig);
  ['bounds', 'container', 'scrollingContainer'].forEach(function (key) {
    if (typeof userConfig[key] === 'string') {
      userConfig[key] = document.querySelector(userConfig[key]);
    }
  });
  userConfig.modules = Object.keys(userConfig.modules).reduce(function (config, name) {
    if (userConfig.modules[name]) {
      config[name] = userConfig.modules[name];
    }
    return config;
  }, {});
  return userConfig;
}

// Handle selection preservation and TEXT_CHANGE emission
// common to modification APIs
function modify(modifier, source, index, shift) {
  if (this.options.strict && !this.isEnabled() && source === _emitter4.default.sources.USER) {
    return new _quillDelta2.default();
  }
  var range = index == null ? null : this.getSelection();
  var oldDelta = this.editor.delta;
  var change = modifier();
  if (range != null) {
    if (index === true) index = range.index;
    if (shift == null) {
      range = shiftRange(range, change, source);
    } else if (shift !== 0) {
      range = shiftRange(range, index, shift, source);
    }
    this.setSelection(range, _emitter4.default.sources.SILENT);
  }
  if (change.length() > 0) {
    var _emitter;

    var args = [_emitter4.default.events.TEXT_CHANGE, change, oldDelta, source];
    (_emitter = this.emitter).emit.apply(_emitter, [_emitter4.default.events.EDITOR_CHANGE].concat(args));
    if (source !== _emitter4.default.sources.SILENT) {
      var _emitter2;

      (_emitter2 = this.emitter).emit.apply(_emitter2, args);
    }
  }
  return change;
}

function overload(index, length, name, value, source) {
  var formats = {};
  if (typeof index.index === 'number' && typeof index.length === 'number') {
    // Allow for throwaway end (used by insertText/insertEmbed)
    if (typeof length !== 'number') {
      source = value, value = name, name = length, length = index.length, index = index.index;
    } else {
      length = index.length, index = index.index;
    }
  } else if (typeof length !== 'number') {
    source = value, value = name, name = length, length = 0;
  }
  // Handle format being object, two format name/value strings or excluded
  if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
    formats = name;
    source = value;
  } else if (typeof name === 'string') {
    if (value != null) {
      formats[name] = value;
    } else {
      source = name;
    }
  }
  // Handle optional source
  source = source || _emitter4.default.sources.API;
  return [index, length, formats, source];
}

function shiftRange(range, index, length, source) {
  if (range == null) return null;
  var start = void 0,
      end = void 0;
  if (index instanceof _quillDelta2.default) {
    var _map = [range.index, range.index + range.length].map(function (pos) {
      return index.transformPosition(pos, source !== _emitter4.default.sources.USER);
    });

    var _map2 = _slicedToArray(_map, 2);

    start = _map2[0];
    end = _map2[1];
  } else {
    var _map3 = [range.index, range.index + range.length].map(function (pos) {
      if (pos < index || pos === index && source === _emitter4.default.sources.USER) return pos;
      if (length >= 0) {
        return pos + length;
      } else {
        return Math.max(index, pos + length);
      }
    });

    var _map4 = _slicedToArray(_map3, 2);

    start = _map4[0];
    end = _map4[1];
  }
  return new _selection.Range(start, end - start);
}

exports.expandConfig = expandConfig;
exports.overload = overload;
exports.default = Quill;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _text = __webpack_require__(7);

var _text2 = _interopRequireDefault(_text);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inline = function (_Parchment$Inline) {
  _inherits(Inline, _Parchment$Inline);

  function Inline() {
    _classCallCheck(this, Inline);

    return _possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
  }

  _createClass(Inline, [{
    key: 'formatAt',
    value: function formatAt(index, length, name, value) {
      if (Inline.compare(this.statics.blotName, name) < 0 && _parchment2.default.query(name, _parchment2.default.Scope.BLOT)) {
        var blot = this.isolate(index, length);
        if (value) {
          blot.wrap(name, value);
        }
      } else {
        _get(Inline.prototype.__proto__ || Object.getPrototypeOf(Inline.prototype), 'formatAt', this).call(this, index, length, name, value);
      }
    }
  }, {
    key: 'optimize',
    value: function optimize(context) {
      _get(Inline.prototype.__proto__ || Object.getPrototypeOf(Inline.prototype), 'optimize', this).call(this, context);
      if (this.parent instanceof Inline && Inline.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
        var parent = this.parent.isolate(this.offset(), this.length());
        this.moveChildren(parent);
        parent.wrap(this);
      }
    }
  }], [{
    key: 'compare',
    value: function compare(self, other) {
      var selfIndex = Inline.order.indexOf(self);
      var otherIndex = Inline.order.indexOf(other);
      if (selfIndex >= 0 || otherIndex >= 0) {
        return selfIndex - otherIndex;
      } else if (self === other) {
        return 0;
      } else if (self < other) {
        return -1;
      } else {
        return 1;
      }
    }
  }]);

  return Inline;
}(_parchment2.default.Inline);

Inline.allowedChildren = [Inline, _parchment2.default.Embed, _text2.default];
// Lower index means deeper in the DOM tree, since not found (-1) is for embeds
Inline.order = ['cursor', 'inline', // Must be lower
'underline', 'strike', 'italic', 'bold', 'script', 'link', 'code' // Must be higher
];

exports.default = Inline;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextBlot = function (_Parchment$Text) {
  _inherits(TextBlot, _Parchment$Text);

  function TextBlot() {
    _classCallCheck(this, TextBlot);

    return _possibleConstructorReturn(this, (TextBlot.__proto__ || Object.getPrototypeOf(TextBlot)).apply(this, arguments));
  }

  return TextBlot;
}(_parchment2.default.Text);

exports.default = TextBlot;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _eventemitter = __webpack_require__(54);

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _logger = __webpack_require__(10);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = (0, _logger2.default)('quill:events');

var EVENTS = ['selectionchange', 'mousedown', 'mouseup', 'click'];

EVENTS.forEach(function (eventName) {
  document.addEventListener(eventName, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    [].slice.call(document.querySelectorAll('.ql-container')).forEach(function (node) {
      // TODO use WeakMap
      if (node.__quill && node.__quill.emitter) {
        var _node$__quill$emitter;

        (_node$__quill$emitter = node.__quill.emitter).handleDOM.apply(_node$__quill$emitter, args);
      }
    });
  });
});

var Emitter = function (_EventEmitter) {
  _inherits(Emitter, _EventEmitter);

  function Emitter() {
    _classCallCheck(this, Emitter);

    var _this = _possibleConstructorReturn(this, (Emitter.__proto__ || Object.getPrototypeOf(Emitter)).call(this));

    _this.listeners = {};
    _this.on('error', debug.error);
    return _this;
  }

  _createClass(Emitter, [{
    key: 'emit',
    value: function emit() {
      debug.log.apply(debug, arguments);
      _get(Emitter.prototype.__proto__ || Object.getPrototypeOf(Emitter.prototype), 'emit', this).apply(this, arguments);
    }
  }, {
    key: 'handleDOM',
    value: function handleDOM(event) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (this.listeners[event.type] || []).forEach(function (_ref) {
        var node = _ref.node,
            handler = _ref.handler;

        if (event.target === node || node.contains(event.target)) {
          handler.apply(undefined, [event].concat(args));
        }
      });
    }
  }, {
    key: 'listenDOM',
    value: function listenDOM(eventName, node, handler) {
      if (!this.listeners[eventName]) {
        this.listeners[eventName] = [];
      }
      this.listeners[eventName].push({ node: node, handler: handler });
    }
  }]);

  return Emitter;
}(_eventemitter2.default);

Emitter.events = {
  EDITOR_CHANGE: 'editor-change',
  SCROLL_BEFORE_UPDATE: 'scroll-before-update',
  SCROLL_OPTIMIZE: 'scroll-optimize',
  SCROLL_UPDATE: 'scroll-update',
  SELECTION_CHANGE: 'selection-change',
  TEXT_CHANGE: 'text-change'
};
Emitter.sources = {
  API: 'api',
  SILENT: 'silent',
  USER: 'user'
};

exports.default = Emitter;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Module = function Module(quill) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, Module);

  this.quill = quill;
  this.options = options;
};

Module.DEFAULTS = {};

exports.default = Module;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var levels = ['error', 'warn', 'log', 'info'];
var level = 'warn';

function debug(method) {
  if (levels.indexOf(method) <= levels.indexOf(level)) {
    var _console;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    (_console = console)[method].apply(_console, args); // eslint-disable-line no-console
  }
}

function namespace(ns) {
  return levels.reduce(function (logger, method) {
    logger[method] = debug.bind(console, method, ns);
    return logger;
  }, {});
}

debug.level = namespace.level = function (newLevel) {
  level = newLevel;
};

exports.default = namespace;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(52);
var isArguments = __webpack_require__(53);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Registry = __webpack_require__(1);
var Attributor = /** @class */ (function () {
    function Attributor(attrName, keyName, options) {
        if (options === void 0) { options = {}; }
        this.attrName = attrName;
        this.keyName = keyName;
        var attributeBit = Registry.Scope.TYPE & Registry.Scope.ATTRIBUTE;
        if (options.scope != null) {
            // Ignore type bits, force attribute bit
            this.scope = (options.scope & Registry.Scope.LEVEL) | attributeBit;
        }
        else {
            this.scope = Registry.Scope.ATTRIBUTE;
        }
        if (options.whitelist != null)
            this.whitelist = options.whitelist;
    }
    Attributor.keys = function (node) {
        return [].map.call(node.attributes, function (item) {
            return item.name;
        });
    };
    Attributor.prototype.add = function (node, value) {
        if (!this.canAdd(node, value))
            return false;
        node.setAttribute(this.keyName, value);
        return true;
    };
    Attributor.prototype.canAdd = function (node, value) {
        var match = Registry.query(node, Registry.Scope.BLOT & (this.scope | Registry.Scope.TYPE));
        if (match == null)
            return false;
        if (this.whitelist == null)
            return true;
        if (typeof value === 'string') {
            return this.whitelist.indexOf(value.replace(/["']/g, '')) > -1;
        }
        else {
            return this.whitelist.indexOf(value) > -1;
        }
    };
    Attributor.prototype.remove = function (node) {
        node.removeAttribute(this.keyName);
    };
    Attributor.prototype.value = function (node) {
        var value = node.getAttribute(this.keyName);
        if (this.canAdd(node, value) && value) {
            return value;
        }
        return '';
    };
    return Attributor;
}());
exports.default = Attributor;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Code = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

var _text = __webpack_require__(7);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Code = function (_Inline) {
  _inherits(Code, _Inline);

  function Code() {
    _classCallCheck(this, Code);

    return _possibleConstructorReturn(this, (Code.__proto__ || Object.getPrototypeOf(Code)).apply(this, arguments));
  }

  return Code;
}(_inline2.default);

Code.blotName = 'code';
Code.tagName = 'CODE';

var CodeBlock = function (_Block) {
  _inherits(CodeBlock, _Block);

  function CodeBlock() {
    _classCallCheck(this, CodeBlock);

    return _possibleConstructorReturn(this, (CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock)).apply(this, arguments));
  }

  _createClass(CodeBlock, [{
    key: 'delta',
    value: function delta() {
      var _this3 = this;

      var text = this.domNode.textContent;
      if (text.endsWith('\n')) {
        // Should always be true
        text = text.slice(0, -1);
      }
      return text.split('\n').reduce(function (delta, frag) {
        return delta.insert(frag).insert('\n', _this3.formats());
      }, new _quillDelta2.default());
    }
  }, {
    key: 'format',
    value: function format(name, value) {
      if (name === this.statics.blotName && value) return;

      var _descendant = this.descendant(_text2.default, this.length() - 1),
          _descendant2 = _slicedToArray(_descendant, 1),
          text = _descendant2[0];

      if (text != null) {
        text.deleteAt(text.length() - 1, 1);
      }
      _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'format', this).call(this, name, value);
    }
  }, {
    key: 'formatAt',
    value: function formatAt(index, length, name, value) {
      if (length === 0) return;
      if (_parchment2.default.query(name, _parchment2.default.Scope.BLOCK) == null || name === this.statics.blotName && value === this.statics.formats(this.domNode)) {
        return;
      }
      var nextNewline = this.newlineIndex(index);
      if (nextNewline < 0 || nextNewline >= index + length) return;
      var prevNewline = this.newlineIndex(index, true) + 1;
      var isolateLength = nextNewline - prevNewline + 1;
      var blot = this.isolate(prevNewline, isolateLength);
      var next = blot.next;
      blot.format(name, value);
      if (next instanceof CodeBlock) {
        next.formatAt(0, index - prevNewline + length - isolateLength, name, value);
      }
    }
  }, {
    key: 'insertAt',
    value: function insertAt(index, value, def) {
      if (def != null) return;

      var _descendant3 = this.descendant(_text2.default, index),
          _descendant4 = _slicedToArray(_descendant3, 2),
          text = _descendant4[0],
          offset = _descendant4[1];

      text.insertAt(offset, value);
    }
  }, {
    key: 'length',
    value: function length() {
      var length = this.domNode.textContent.length;
      if (!this.domNode.textContent.endsWith('\n')) {
        return length + 1;
      }
      return length;
    }
  }, {
    key: 'newlineIndex',
    value: function newlineIndex(searchIndex) {
      var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!reverse) {
        var offset = this.domNode.textContent.slice(searchIndex).indexOf('\n');
        return offset > -1 ? searchIndex + offset : -1;
      } else {
        return this.domNode.textContent.slice(0, searchIndex).lastIndexOf('\n');
      }
    }
  }, {
    key: 'optimize',
    value: function optimize(context) {
      if (!this.domNode.textContent.endsWith('\n')) {
        this.appendChild(_parchment2.default.create('text', '\n'));
      }
      _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'optimize', this).call(this, context);
      var next = this.next;
      if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === next.statics.formats(next.domNode)) {
        next.optimize(context);
        next.moveChildren(this);
        next.remove();
      }
    }
  }, {
    key: 'replace',
    value: function replace(target) {
      _get(CodeBlock.prototype.__proto__ || Object.getPrototypeOf(CodeBlock.prototype), 'replace', this).call(this, target);
      [].slice.call(this.domNode.querySelectorAll('*')).forEach(function (node) {
        var blot = _parchment2.default.find(node);
        if (blot == null) {
          node.parentNode.removeChild(node);
        } else if (blot instanceof _parchment2.default.Embed) {
          blot.remove();
        } else {
          blot.unwrap();
        }
      });
    }
  }], [{
    key: 'create',
    value: function create(value) {
      var domNode = _get(CodeBlock.__proto__ || Object.getPrototypeOf(CodeBlock), 'create', this).call(this, value);
      domNode.setAttribute('spellcheck', false);
      return domNode;
    }
  }, {
    key: 'formats',
    value: function formats() {
      return true;
    }
  }]);

  return CodeBlock;
}(_block2.default);

CodeBlock.blotName = 'code-block';
CodeBlock.tagName = 'PRE';
CodeBlock.TAB = '  ';

exports.Code = Code;
exports.default = CodeBlock;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _op = __webpack_require__(20);

var _op2 = _interopRequireDefault(_op);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _code = __webpack_require__(13);

var _code2 = _interopRequireDefault(_code);

var _cursor = __webpack_require__(24);

var _cursor2 = _interopRequireDefault(_cursor);

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

var _break = __webpack_require__(16);

var _break2 = _interopRequireDefault(_break);

var _clone = __webpack_require__(21);

var _clone2 = _interopRequireDefault(_clone);

var _deepEqual = __webpack_require__(11);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ASCII = /^[ -~]*$/;

var Editor = function () {
  function Editor(scroll) {
    _classCallCheck(this, Editor);

    this.scroll = scroll;
    this.delta = this.getDelta();
  }

  _createClass(Editor, [{
    key: 'applyDelta',
    value: function applyDelta(delta) {
      var _this = this;

      var consumeNextNewline = false;
      this.scroll.update();
      var scrollLength = this.scroll.length();
      this.scroll.batchStart();
      delta = normalizeDelta(delta);
      delta.reduce(function (index, op) {
        var length = op.retain || op.delete || op.insert.length || 1;
        var attributes = op.attributes || {};
        if (op.insert != null) {
          if (typeof op.insert === 'string') {
            var text = op.insert;
            if (text.endsWith('\n') && consumeNextNewline) {
              consumeNextNewline = false;
              text = text.slice(0, -1);
            }
            if (index >= scrollLength && !text.endsWith('\n')) {
              consumeNextNewline = true;
            }
            _this.scroll.insertAt(index, text);

            var _scroll$line = _this.scroll.line(index),
                _scroll$line2 = _slicedToArray(_scroll$line, 2),
                line = _scroll$line2[0],
                offset = _scroll$line2[1];

            var formats = (0, _extend2.default)({}, (0, _block.bubbleFormats)(line));
            if (line instanceof _block2.default) {
              var _line$descendant = line.descendant(_parchment2.default.Leaf, offset),
                  _line$descendant2 = _slicedToArray(_line$descendant, 1),
                  leaf = _line$descendant2[0];

              formats = (0, _extend2.default)(formats, (0, _block.bubbleFormats)(leaf));
            }
            attributes = _op2.default.attributes.diff(formats, attributes) || {};
          } else if (_typeof(op.insert) === 'object') {
            var key = Object.keys(op.insert)[0]; // There should only be one key
            if (key == null) return index;
            _this.scroll.insertAt(index, key, op.insert[key]);
          }
          scrollLength += length;
        }
        Object.keys(attributes).forEach(function (name) {
          _this.scroll.formatAt(index, length, name, attributes[name]);
        });
        return index + length;
      }, 0);
      delta.reduce(function (index, op) {
        if (typeof op.delete === 'number') {
          _this.scroll.deleteAt(index, op.delete);
          return index;
        }
        return index + (op.retain || op.insert.length || 1);
      }, 0);
      this.scroll.batchEnd();
      return this.update(delta);
    }
  }, {
    key: 'deleteText',
    value: function deleteText(index, length) {
      this.scroll.deleteAt(index, length);
      return this.update(new _quillDelta2.default().retain(index).delete(length));
    }
  }, {
    key: 'formatLine',
    value: function formatLine(index, length) {
      var _this2 = this;

      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      this.scroll.update();
      Object.keys(formats).forEach(function (format) {
        if (_this2.scroll.whitelist != null && !_this2.scroll.whitelist[format]) return;
        var lines = _this2.scroll.lines(index, Math.max(length, 1));
        var lengthRemaining = length;
        lines.forEach(function (line) {
          var lineLength = line.length();
          if (!(line instanceof _code2.default)) {
            line.format(format, formats[format]);
          } else {
            var codeIndex = index - line.offset(_this2.scroll);
            var codeLength = line.newlineIndex(codeIndex + lengthRemaining) - codeIndex + 1;
            line.formatAt(codeIndex, codeLength, format, formats[format]);
          }
          lengthRemaining -= lineLength;
        });
      });
      this.scroll.optimize();
      return this.update(new _quillDelta2.default().retain(index).retain(length, (0, _clone2.default)(formats)));
    }
  }, {
    key: 'formatText',
    value: function formatText(index, length) {
      var _this3 = this;

      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      Object.keys(formats).forEach(function (format) {
        _this3.scroll.formatAt(index, length, format, formats[format]);
      });
      return this.update(new _quillDelta2.default().retain(index).retain(length, (0, _clone2.default)(formats)));
    }
  }, {
    key: 'getContents',
    value: function getContents(index, length) {
      return this.delta.slice(index, index + length);
    }
  }, {
    key: 'getDelta',
    value: function getDelta() {
      return this.scroll.lines().reduce(function (delta, line) {
        return delta.concat(line.delta());
      }, new _quillDelta2.default());
    }
  }, {
    key: 'getFormat',
    value: function getFormat(index) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var lines = [],
          leaves = [];
      if (length === 0) {
        this.scroll.path(index).forEach(function (path) {
          var _path = _slicedToArray(path, 1),
              blot = _path[0];

          if (blot instanceof _block2.default) {
            lines.push(blot);
          } else if (blot instanceof _parchment2.default.Leaf) {
            leaves.push(blot);
          }
        });
      } else {
        lines = this.scroll.lines(index, length);
        leaves = this.scroll.descendants(_parchment2.default.Leaf, index, length);
      }
      var formatsArr = [lines, leaves].map(function (blots) {
        if (blots.length === 0) return {};
        var formats = (0, _block.bubbleFormats)(blots.shift());
        while (Object.keys(formats).length > 0) {
          var blot = blots.shift();
          if (blot == null) return formats;
          formats = combineFormats((0, _block.bubbleFormats)(blot), formats);
        }
        return formats;
      });
      return _extend2.default.apply(_extend2.default, formatsArr);
    }
  }, {
    key: 'getText',
    value: function getText(index, length) {
      return this.getContents(index, length).filter(function (op) {
        return typeof op.insert === 'string';
      }).map(function (op) {
        return op.insert;
      }).join('');
    }
  }, {
    key: 'insertEmbed',
    value: function insertEmbed(index, embed, value) {
      this.scroll.insertAt(index, embed, value);
      return this.update(new _quillDelta2.default().retain(index).insert(_defineProperty({}, embed, value)));
    }
  }, {
    key: 'insertText',
    value: function insertText(index, text) {
      var _this4 = this;

      var formats = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      this.scroll.insertAt(index, text);
      Object.keys(formats).forEach(function (format) {
        _this4.scroll.formatAt(index, text.length, format, formats[format]);
      });
      return this.update(new _quillDelta2.default().retain(index).insert(text, (0, _clone2.default)(formats)));
    }
  }, {
    key: 'isBlank',
    value: function isBlank() {
      if (this.scroll.children.length == 0) return true;
      if (this.scroll.children.length > 1) return false;
      var block = this.scroll.children.head;
      if (block.statics.blotName !== _block2.default.blotName) return false;
      if (block.children.length > 1) return false;
      return block.children.head instanceof _break2.default;
    }
  }, {
    key: 'removeFormat',
    value: function removeFormat(index, length) {
      var text = this.getText(index, length);

      var _scroll$line3 = this.scroll.line(index + length),
          _scroll$line4 = _slicedToArray(_scroll$line3, 2),
          line = _scroll$line4[0],
          offset = _scroll$line4[1];

      var suffixLength = 0,
          suffix = new _quillDelta2.default();
      if (line != null) {
        if (!(line instanceof _code2.default)) {
          suffixLength = line.length() - offset;
        } else {
          suffixLength = line.newlineIndex(offset) - offset + 1;
        }
        suffix = line.delta().slice(offset, offset + suffixLength - 1).insert('\n');
      }
      var contents = this.getContents(index, length + suffixLength);
      var diff = contents.diff(new _quillDelta2.default().insert(text).concat(suffix));
      var delta = new _quillDelta2.default().retain(index).concat(diff);
      return this.applyDelta(delta);
    }
  }, {
    key: 'update',
    value: function update(change) {
      var mutations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var cursorIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      var oldDelta = this.delta;
      if (mutations.length === 1 && mutations[0].type === 'characterData' && mutations[0].target.data.match(ASCII) && _parchment2.default.find(mutations[0].target)) {
        // Optimization for character changes
        var textBlot = _parchment2.default.find(mutations[0].target);
        var formats = (0, _block.bubbleFormats)(textBlot);
        var index = textBlot.offset(this.scroll);
        var oldValue = mutations[0].oldValue.replace(_cursor2.default.CONTENTS, '');
        var oldText = new _quillDelta2.default().insert(oldValue);
        var newText = new _quillDelta2.default().insert(textBlot.value());
        var diffDelta = new _quillDelta2.default().retain(index).concat(oldText.diff(newText, cursorIndex));
        change = diffDelta.reduce(function (delta, op) {
          if (op.insert) {
            return delta.insert(op.insert, formats);
          } else {
            return delta.push(op);
          }
        }, new _quillDelta2.default());
        this.delta = oldDelta.compose(change);
      } else {
        this.delta = this.getDelta();
        if (!change || !(0, _deepEqual2.default)(oldDelta.compose(change), this.delta)) {
          change = oldDelta.diff(this.delta, cursorIndex);
        }
      }
      return change;
    }
  }]);

  return Editor;
}();

function combineFormats(formats, combined) {
  return Object.keys(combined).reduce(function (merged, name) {
    if (formats[name] == null) return merged;
    if (combined[name] === formats[name]) {
      merged[name] = combined[name];
    } else if (Array.isArray(combined[name])) {
      if (combined[name].indexOf(formats[name]) < 0) {
        merged[name] = combined[name].concat([formats[name]]);
      }
    } else {
      merged[name] = [combined[name], formats[name]];
    }
    return merged;
  }, {});
}

function normalizeDelta(delta) {
  return delta.reduce(function (delta, op) {
    if (op.insert === 1) {
      var attributes = (0, _clone2.default)(op.attributes);
      delete attributes['image'];
      return delta.insert({ image: op.attributes.image }, attributes);
    }
    if (op.attributes != null && (op.attributes.list === true || op.attributes.bullet === true)) {
      op = (0, _clone2.default)(op);
      if (op.attributes.list) {
        op.attributes.list = 'ordered';
      } else {
        op.attributes.list = 'bullet';
        delete op.attributes.bullet;
      }
    }
    if (typeof op.insert === 'string') {
      var text = op.insert.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      return delta.insert(text, op.attributes);
    }
    return delta.push(op);
  }, new _quillDelta2.default());
}

exports.default = Editor;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Range = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _clone = __webpack_require__(21);

var _clone2 = _interopRequireDefault(_clone);

var _deepEqual = __webpack_require__(11);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _emitter3 = __webpack_require__(8);

var _emitter4 = _interopRequireDefault(_emitter3);

var _logger = __webpack_require__(10);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = (0, _logger2.default)('quill:selection');

var Range = function Range(index) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  _classCallCheck(this, Range);

  this.index = index;
  this.length = length;
};

var Selection = function () {
  function Selection(scroll, emitter) {
    var _this = this;

    _classCallCheck(this, Selection);

    this.emitter = emitter;
    this.scroll = scroll;
    this.composing = false;
    this.mouseDown = false;
    this.root = this.scroll.domNode;
    this.cursor = _parchment2.default.create('cursor', this);
    // savedRange is last non-null range
    this.lastRange = this.savedRange = new Range(0, 0);
    this.handleComposition();
    this.handleDragging();
    this.emitter.listenDOM('selectionchange', document, function () {
      if (!_this.mouseDown) {
        setTimeout(_this.update.bind(_this, _emitter4.default.sources.USER), 1);
      }
    });
    this.emitter.on(_emitter4.default.events.EDITOR_CHANGE, function (type, delta) {
      if (type === _emitter4.default.events.TEXT_CHANGE && delta.length() > 0) {
        _this.update(_emitter4.default.sources.SILENT);
      }
    });
    this.emitter.on(_emitter4.default.events.SCROLL_BEFORE_UPDATE, function () {
      if (!_this.hasFocus()) return;
      var native = _this.getNativeRange();
      if (native == null) return;
      if (native.start.node === _this.cursor.textNode) return; // cursor.restore() will handle
      // TODO unclear if this has negative side effects
      _this.emitter.once(_emitter4.default.events.SCROLL_UPDATE, function () {
        try {
          _this.setNativeRange(native.start.node, native.start.offset, native.end.node, native.end.offset);
        } catch (ignored) {}
      });
    });
    this.emitter.on(_emitter4.default.events.SCROLL_OPTIMIZE, function (mutations, context) {
      if (context.range) {
        var _context$range = context.range,
            startNode = _context$range.startNode,
            startOffset = _context$range.startOffset,
            endNode = _context$range.endNode,
            endOffset = _context$range.endOffset;

        _this.setNativeRange(startNode, startOffset, endNode, endOffset);
      }
    });
    this.update(_emitter4.default.sources.SILENT);
  }

  _createClass(Selection, [{
    key: 'handleComposition',
    value: function handleComposition() {
      var _this2 = this;

      this.root.addEventListener('compositionstart', function () {
        _this2.composing = true;
      });
      this.root.addEventListener('compositionend', function () {
        _this2.composing = false;
        if (_this2.cursor.parent) {
          var range = _this2.cursor.restore();
          if (!range) return;
          setTimeout(function () {
            _this2.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset);
          }, 1);
        }
      });
    }
  }, {
    key: 'handleDragging',
    value: function handleDragging() {
      var _this3 = this;

      this.emitter.listenDOM('mousedown', document.body, function () {
        _this3.mouseDown = true;
      });
      this.emitter.listenDOM('mouseup', document.body, function () {
        _this3.mouseDown = false;
        _this3.update(_emitter4.default.sources.USER);
      });
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (this.hasFocus()) return;
      this.root.focus();
      this.setRange(this.savedRange);
    }
  }, {
    key: 'format',
    value: function format(_format, value) {
      if (this.scroll.whitelist != null && !this.scroll.whitelist[_format]) return;
      this.scroll.update();
      var nativeRange = this.getNativeRange();
      if (nativeRange == null || !nativeRange.native.collapsed || _parchment2.default.query(_format, _parchment2.default.Scope.BLOCK)) return;
      if (nativeRange.start.node !== this.cursor.textNode) {
        var blot = _parchment2.default.find(nativeRange.start.node, false);
        if (blot == null) return;
        // TODO Give blot ability to not split
        if (blot instanceof _parchment2.default.Leaf) {
          var after = blot.split(nativeRange.start.offset);
          blot.parent.insertBefore(this.cursor, after);
        } else {
          blot.insertBefore(this.cursor, nativeRange.start.node); // Should never happen
        }
        this.cursor.attach();
      }
      this.cursor.format(_format, value);
      this.scroll.optimize();
      this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length);
      this.update();
    }
  }, {
    key: 'getBounds',
    value: function getBounds(index) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var scrollLength = this.scroll.length();
      index = Math.min(index, scrollLength - 1);
      length = Math.min(index + length, scrollLength - 1) - index;
      var node = void 0,
          _scroll$leaf = this.scroll.leaf(index),
          _scroll$leaf2 = _slicedToArray(_scroll$leaf, 2),
          leaf = _scroll$leaf2[0],
          offset = _scroll$leaf2[1];
      if (leaf == null) return null;

      var _leaf$position = leaf.position(offset, true);

      var _leaf$position2 = _slicedToArray(_leaf$position, 2);

      node = _leaf$position2[0];
      offset = _leaf$position2[1];

      var range = document.createRange();
      if (length > 0) {
        range.setStart(node, offset);

        var _scroll$leaf3 = this.scroll.leaf(index + length);

        var _scroll$leaf4 = _slicedToArray(_scroll$leaf3, 2);

        leaf = _scroll$leaf4[0];
        offset = _scroll$leaf4[1];

        if (leaf == null) return null;

        var _leaf$position3 = leaf.position(offset, true);

        var _leaf$position4 = _slicedToArray(_leaf$position3, 2);

        node = _leaf$position4[0];
        offset = _leaf$position4[1];

        range.setEnd(node, offset);
        return range.getBoundingClientRect();
      } else {
        var side = 'left';
        var rect = void 0;
        if (node instanceof Text) {
          if (offset < node.data.length) {
            range.setStart(node, offset);
            range.setEnd(node, offset + 1);
          } else {
            range.setStart(node, offset - 1);
            range.setEnd(node, offset);
            side = 'right';
          }
          rect = range.getBoundingClientRect();
        } else {
          rect = leaf.domNode.getBoundingClientRect();
          if (offset > 0) side = 'right';
        }
        return {
          bottom: rect.top + rect.height,
          height: rect.height,
          left: rect[side],
          right: rect[side],
          top: rect.top,
          width: 0
        };
      }
    }
  }, {
    key: 'getNativeRange',
    value: function getNativeRange() {
      var selection = document.getSelection();
      if (selection == null || selection.rangeCount <= 0) return null;
      var nativeRange = selection.getRangeAt(0);
      if (nativeRange == null) return null;
      var range = this.normalizeNative(nativeRange);
      debug.info('getNativeRange', range);
      return range;
    }
  }, {
    key: 'getRange',
    value: function getRange() {
      var normalized = this.getNativeRange();
      if (normalized == null) return [null, null];
      var range = this.normalizedToRange(normalized);
      return [range, normalized];
    }
  }, {
    key: 'hasFocus',
    value: function hasFocus() {
      return document.activeElement === this.root;
    }
  }, {
    key: 'normalizedToRange',
    value: function normalizedToRange(range) {
      var _this4 = this;

      var positions = [[range.start.node, range.start.offset]];
      if (!range.native.collapsed) {
        positions.push([range.end.node, range.end.offset]);
      }
      var indexes = positions.map(function (position) {
        var _position = _slicedToArray(position, 2),
            node = _position[0],
            offset = _position[1];

        var blot = _parchment2.default.find(node, true);
        var index = blot.offset(_this4.scroll);
        if (offset === 0) {
          return index;
        } else if (blot instanceof _parchment2.default.Container) {
          return index + blot.length();
        } else {
          return index + blot.index(node, offset);
        }
      });
      var end = Math.min(Math.max.apply(Math, _toConsumableArray(indexes)), this.scroll.length() - 1);
      var start = Math.min.apply(Math, [end].concat(_toConsumableArray(indexes)));
      return new Range(start, end - start);
    }
  }, {
    key: 'normalizeNative',
    value: function normalizeNative(nativeRange) {
      if (!contains(this.root, nativeRange.startContainer) || !nativeRange.collapsed && !contains(this.root, nativeRange.endContainer)) {
        return null;
      }
      var range = {
        start: { node: nativeRange.startContainer, offset: nativeRange.startOffset },
        end: { node: nativeRange.endContainer, offset: nativeRange.endOffset },
        native: nativeRange
      };
      [range.start, range.end].forEach(function (position) {
        var node = position.node,
            offset = position.offset;
        while (!(node instanceof Text) && node.childNodes.length > 0) {
          if (node.childNodes.length > offset) {
            node = node.childNodes[offset];
            offset = 0;
          } else if (node.childNodes.length === offset) {
            node = node.lastChild;
            offset = node instanceof Text ? node.data.length : node.childNodes.length + 1;
          } else {
            break;
          }
        }
        position.node = node, position.offset = offset;
      });
      return range;
    }
  }, {
    key: 'rangeToNative',
    value: function rangeToNative(range) {
      var _this5 = this;

      var indexes = range.collapsed ? [range.index] : [range.index, range.index + range.length];
      var args = [];
      var scrollLength = this.scroll.length();
      indexes.forEach(function (index, i) {
        index = Math.min(scrollLength - 1, index);
        var node = void 0,
            _scroll$leaf5 = _this5.scroll.leaf(index),
            _scroll$leaf6 = _slicedToArray(_scroll$leaf5, 2),
            leaf = _scroll$leaf6[0],
            offset = _scroll$leaf6[1];
        var _leaf$position5 = leaf.position(offset, i !== 0);

        var _leaf$position6 = _slicedToArray(_leaf$position5, 2);

        node = _leaf$position6[0];
        offset = _leaf$position6[1];

        args.push(node, offset);
      });
      if (args.length < 2) {
        args = args.concat(args);
      }
      return args;
    }
  }, {
    key: 'scrollIntoView',
    value: function scrollIntoView(scrollingContainer) {
      var range = this.lastRange;
      if (range == null) return;
      var bounds = this.getBounds(range.index, range.length);
      if (bounds == null) return;
      var limit = this.scroll.length() - 1;

      var _scroll$line = this.scroll.line(Math.min(range.index, limit)),
          _scroll$line2 = _slicedToArray(_scroll$line, 1),
          first = _scroll$line2[0];

      var last = first;
      if (range.length > 0) {
        var _scroll$line3 = this.scroll.line(Math.min(range.index + range.length, limit));

        var _scroll$line4 = _slicedToArray(_scroll$line3, 1);

        last = _scroll$line4[0];
      }
      if (first == null || last == null) return;
      var scrollBounds = scrollingContainer.getBoundingClientRect();
      if (bounds.top < scrollBounds.top) {
        scrollingContainer.scrollTop -= scrollBounds.top - bounds.top;
      } else if (bounds.bottom > scrollBounds.bottom) {
        scrollingContainer.scrollTop += bounds.bottom - scrollBounds.bottom;
      }
    }
  }, {
    key: 'setNativeRange',
    value: function setNativeRange(startNode, startOffset) {
      var endNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : startNode;
      var endOffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : startOffset;
      var force = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      debug.info('setNativeRange', startNode, startOffset, endNode, endOffset);
      if (startNode != null && (this.root.parentNode == null || startNode.parentNode == null || endNode.parentNode == null)) {
        return;
      }
      var selection = document.getSelection();
      if (selection == null) return;
      if (startNode != null) {
        if (!this.hasFocus()) this.root.focus();
        var native = (this.getNativeRange() || {}).native;
        if (native == null || force || startNode !== native.startContainer || startOffset !== native.startOffset || endNode !== native.endContainer || endOffset !== native.endOffset) {

          if (startNode.tagName == "BR") {
            startOffset = [].indexOf.call(startNode.parentNode.childNodes, startNode);
            startNode = startNode.parentNode;
          }
          if (endNode.tagName == "BR") {
            endOffset = [].indexOf.call(endNode.parentNode.childNodes, endNode);
            endNode = endNode.parentNode;
          }
          var range = document.createRange();
          range.setStart(startNode, startOffset);
          range.setEnd(endNode, endOffset);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        selection.removeAllRanges();
        this.root.blur();
        document.body.focus(); // root.blur() not enough on IE11+Travis+SauceLabs (but not local VMs)
      }
    }
  }, {
    key: 'setRange',
    value: function setRange(range) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _emitter4.default.sources.API;

      if (typeof force === 'string') {
        source = force;
        force = false;
      }
      debug.info('setRange', range);
      if (range != null) {
        var args = this.rangeToNative(range);
        this.setNativeRange.apply(this, _toConsumableArray(args).concat([force]));
      } else {
        this.setNativeRange(null);
      }
      this.update(source);
    }
  }, {
    key: 'update',
    value: function update() {
      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _emitter4.default.sources.USER;

      var oldRange = this.lastRange;

      var _getRange = this.getRange(),
          _getRange2 = _slicedToArray(_getRange, 2),
          lastRange = _getRange2[0],
          nativeRange = _getRange2[1];

      this.lastRange = lastRange;
      if (this.lastRange != null) {
        this.savedRange = this.lastRange;
      }
      if (!(0, _deepEqual2.default)(oldRange, this.lastRange)) {
        var _emitter;

        if (!this.composing && nativeRange != null && nativeRange.native.collapsed && nativeRange.start.node !== this.cursor.textNode) {
          this.cursor.restore();
        }
        var args = [_emitter4.default.events.SELECTION_CHANGE, (0, _clone2.default)(this.lastRange), (0, _clone2.default)(oldRange), source];
        (_emitter = this.emitter).emit.apply(_emitter, [_emitter4.default.events.EDITOR_CHANGE].concat(args));
        if (source !== _emitter4.default.sources.SILENT) {
          var _emitter2;

          (_emitter2 = this.emitter).emit.apply(_emitter2, args);
        }
      }
    }
  }]);

  return Selection;
}();

function contains(parent, descendant) {
  try {
    // Firefox inserts inaccessible nodes around video elements
    descendant.parentNode;
  } catch (e) {
    return false;
  }
  // IE11 has bug with Text nodes
  // https://connect.microsoft.com/IE/feedback/details/780874/node-contains-is-incorrect
  if (descendant instanceof Text) {
    descendant = descendant.parentNode;
  }
  return parent.contains(descendant);
}

exports.Range = Range;
exports.default = Selection;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Break = function (_Parchment$Embed) {
  _inherits(Break, _Parchment$Embed);

  function Break() {
    _classCallCheck(this, Break);

    return _possibleConstructorReturn(this, (Break.__proto__ || Object.getPrototypeOf(Break)).apply(this, arguments));
  }

  _createClass(Break, [{
    key: 'insertInto',
    value: function insertInto(parent, ref) {
      if (parent.children.length === 0) {
        _get(Break.prototype.__proto__ || Object.getPrototypeOf(Break.prototype), 'insertInto', this).call(this, parent, ref);
      } else {
        this.remove();
      }
    }
  }, {
    key: 'length',
    value: function length() {
      return 0;
    }
  }, {
    key: 'value',
    value: function value() {
      return '';
    }
  }], [{
    key: 'value',
    value: function value() {
      return undefined;
    }
  }]);

  return Break;
}(_parchment2.default.Embed);

Break.blotName = 'break';
Break.tagName = 'BR';

exports.default = Break;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var linked_list_1 = __webpack_require__(44);
var shadow_1 = __webpack_require__(30);
var Registry = __webpack_require__(1);
var ContainerBlot = /** @class */ (function (_super) {
    __extends(ContainerBlot, _super);
    function ContainerBlot(domNode) {
        var _this = _super.call(this, domNode) || this;
        _this.build();
        return _this;
    }
    ContainerBlot.prototype.appendChild = function (other) {
        this.insertBefore(other);
    };
    ContainerBlot.prototype.attach = function () {
        _super.prototype.attach.call(this);
        this.children.forEach(function (child) {
            child.attach();
        });
    };
    ContainerBlot.prototype.build = function () {
        var _this = this;
        this.children = new linked_list_1.default();
        // Need to be reversed for if DOM nodes already in order
        [].slice
            .call(this.domNode.childNodes)
            .reverse()
            .forEach(function (node) {
            try {
                var child = makeBlot(node);
                _this.insertBefore(child, _this.children.head || undefined);
            }
            catch (err) {
                if (err instanceof Registry.ParchmentError)
                    return;
                else
                    throw err;
            }
        });
    };
    ContainerBlot.prototype.deleteAt = function (index, length) {
        if (index === 0 && length === this.length()) {
            return this.remove();
        }
        this.children.forEachAt(index, length, function (child, offset, length) {
            child.deleteAt(offset, length);
        });
    };
    ContainerBlot.prototype.descendant = function (criteria, index) {
        var _a = this.children.find(index), child = _a[0], offset = _a[1];
        if ((criteria.blotName == null && criteria(child)) ||
            (criteria.blotName != null && child instanceof criteria)) {
            return [child, offset];
        }
        else if (child instanceof ContainerBlot) {
            return child.descendant(criteria, offset);
        }
        else {
            return [null, -1];
        }
    };
    ContainerBlot.prototype.descendants = function (criteria, index, length) {
        if (index === void 0) { index = 0; }
        if (length === void 0) { length = Number.MAX_VALUE; }
        var descendants = [];
        var lengthLeft = length;
        this.children.forEachAt(index, length, function (child, index, length) {
            if ((criteria.blotName == null && criteria(child)) ||
                (criteria.blotName != null && child instanceof criteria)) {
                descendants.push(child);
            }
            if (child instanceof ContainerBlot) {
                descendants = descendants.concat(child.descendants(criteria, index, lengthLeft));
            }
            lengthLeft -= length;
        });
        return descendants;
    };
    ContainerBlot.prototype.detach = function () {
        this.children.forEach(function (child) {
            child.detach();
        });
        _super.prototype.detach.call(this);
    };
    ContainerBlot.prototype.formatAt = function (index, length, name, value) {
        this.children.forEachAt(index, length, function (child, offset, length) {
            child.formatAt(offset, length, name, value);
        });
    };
    ContainerBlot.prototype.insertAt = function (index, value, def) {
        var _a = this.children.find(index), child = _a[0], offset = _a[1];
        if (child) {
            child.insertAt(offset, value, def);
        }
        else {
            var blot = def == null ? Registry.create('text', value) : Registry.create(value, def);
            this.appendChild(blot);
        }
    };
    ContainerBlot.prototype.insertBefore = function (childBlot, refBlot) {
        if (this.statics.allowedChildren != null &&
            !this.statics.allowedChildren.some(function (child) {
                return childBlot instanceof child;
            })) {
            throw new Registry.ParchmentError("Cannot insert " + childBlot.statics.blotName + " into " + this.statics.blotName);
        }
        childBlot.insertInto(this, refBlot);
    };
    ContainerBlot.prototype.length = function () {
        return this.children.reduce(function (memo, child) {
            return memo + child.length();
        }, 0);
    };
    ContainerBlot.prototype.moveChildren = function (targetParent, refNode) {
        this.children.forEach(function (child) {
            targetParent.insertBefore(child, refNode);
        });
    };
    ContainerBlot.prototype.optimize = function (context) {
        _super.prototype.optimize.call(this, context);
        if (this.children.length === 0) {
            if (this.statics.defaultChild != null) {
                var child = Registry.create(this.statics.defaultChild);
                this.appendChild(child);
                child.optimize(context);
            }
            else {
                this.remove();
            }
        }
    };
    ContainerBlot.prototype.path = function (index, inclusive) {
        if (inclusive === void 0) { inclusive = false; }
        var _a = this.children.find(index, inclusive), child = _a[0], offset = _a[1];
        var position = [[this, index]];
        if (child instanceof ContainerBlot) {
            return position.concat(child.path(offset, inclusive));
        }
        else if (child != null) {
            position.push([child, offset]);
        }
        return position;
    };
    ContainerBlot.prototype.removeChild = function (child) {
        this.children.remove(child);
    };
    ContainerBlot.prototype.replace = function (target) {
        if (target instanceof ContainerBlot) {
            target.moveChildren(this);
        }
        _super.prototype.replace.call(this, target);
    };
    ContainerBlot.prototype.split = function (index, force) {
        if (force === void 0) { force = false; }
        if (!force) {
            if (index === 0)
                return this;
            if (index === this.length())
                return this.next;
        }
        var after = this.clone();
        this.parent.insertBefore(after, this.next);
        this.children.forEachAt(index, this.length(), function (child, offset, length) {
            child = child.split(offset, force);
            after.appendChild(child);
        });
        return after;
    };
    ContainerBlot.prototype.unwrap = function () {
        this.moveChildren(this.parent, this.next);
        this.remove();
    };
    ContainerBlot.prototype.update = function (mutations, context) {
        var _this = this;
        var addedNodes = [];
        var removedNodes = [];
        mutations.forEach(function (mutation) {
            if (mutation.target === _this.domNode && mutation.type === 'childList') {
                addedNodes.push.apply(addedNodes, mutation.addedNodes);
                removedNodes.push.apply(removedNodes, mutation.removedNodes);
            }
        });
        removedNodes.forEach(function (node) {
            // Check node has actually been removed
            // One exception is Chrome does not immediately remove IFRAMEs
            // from DOM but MutationRecord is correct in its reported removal
            if (node.parentNode != null &&
                // @ts-ignore
                node.tagName !== 'IFRAME' &&
                document.body.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                return;
            }
            var blot = Registry.find(node);
            if (blot == null)
                return;
            if (blot.domNode.parentNode == null || blot.domNode.parentNode === _this.domNode) {
                blot.detach();
            }
        });
        addedNodes
            .filter(function (node) {
            return node.parentNode == _this.domNode;
        })
            .sort(function (a, b) {
            if (a === b)
                return 0;
            if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) {
                return 1;
            }
            return -1;
        })
            .forEach(function (node) {
            var refBlot = null;
            if (node.nextSibling != null) {
                refBlot = Registry.find(node.nextSibling);
            }
            var blot = makeBlot(node);
            if (blot.next != refBlot || blot.next == null) {
                if (blot.parent != null) {
                    blot.parent.removeChild(_this);
                }
                _this.insertBefore(blot, refBlot || undefined);
            }
        });
    };
    return ContainerBlot;
}(shadow_1.default));
function makeBlot(node) {
    var blot = Registry.find(node);
    if (blot == null) {
        try {
            blot = Registry.create(node);
        }
        catch (e) {
            blot = Registry.create(Registry.Scope.INLINE);
            [].slice.call(node.childNodes).forEach(function (child) {
                // @ts-ignore
                blot.domNode.appendChild(child);
            });
            if (node.parentNode) {
                node.parentNode.replaceChild(blot.domNode, node);
            }
            blot.attach();
        }
    }
    return blot;
}
exports.default = ContainerBlot;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var attributor_1 = __webpack_require__(12);
var store_1 = __webpack_require__(31);
var container_1 = __webpack_require__(17);
var Registry = __webpack_require__(1);
var FormatBlot = /** @class */ (function (_super) {
    __extends(FormatBlot, _super);
    function FormatBlot(domNode) {
        var _this = _super.call(this, domNode) || this;
        _this.attributes = new store_1.default(_this.domNode);
        return _this;
    }
    FormatBlot.formats = function (domNode) {
        if (typeof this.tagName === 'string') {
            return true;
        }
        else if (Array.isArray(this.tagName)) {
            return domNode.tagName.toLowerCase();
        }
        return undefined;
    };
    FormatBlot.prototype.format = function (name, value) {
        var format = Registry.query(name);
        if (format instanceof attributor_1.default) {
            this.attributes.attribute(format, value);
        }
        else if (value) {
            if (format != null && (name !== this.statics.blotName || this.formats()[name] !== value)) {
                this.replaceWith(name, value);
            }
        }
    };
    FormatBlot.prototype.formats = function () {
        var formats = this.attributes.values();
        var format = this.statics.formats(this.domNode);
        if (format != null) {
            formats[this.statics.blotName] = format;
        }
        return formats;
    };
    FormatBlot.prototype.replaceWith = function (name, value) {
        var replacement = _super.prototype.replaceWith.call(this, name, value);
        this.attributes.copy(replacement);
        return replacement;
    };
    FormatBlot.prototype.update = function (mutations, context) {
        var _this = this;
        _super.prototype.update.call(this, mutations, context);
        if (mutations.some(function (mutation) {
            return mutation.target === _this.domNode && mutation.type === 'attributes';
        })) {
            this.attributes.build();
        }
    };
    FormatBlot.prototype.wrap = function (name, value) {
        var wrapper = _super.prototype.wrap.call(this, name, value);
        if (wrapper instanceof FormatBlot && wrapper.statics.scope === this.statics.scope) {
            this.attributes.move(wrapper);
        }
        return wrapper;
    };
    return FormatBlot;
}(container_1.default));
exports.default = FormatBlot;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var shadow_1 = __webpack_require__(30);
var Registry = __webpack_require__(1);
var LeafBlot = /** @class */ (function (_super) {
    __extends(LeafBlot, _super);
    function LeafBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeafBlot.value = function (domNode) {
        return true;
    };
    LeafBlot.prototype.index = function (node, offset) {
        if (this.domNode === node ||
            this.domNode.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
            return Math.min(offset, 1);
        }
        return -1;
    };
    LeafBlot.prototype.position = function (index, inclusive) {
        var offset = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
        if (index > 0)
            offset += 1;
        return [this.parent.domNode, offset];
    };
    LeafBlot.prototype.value = function () {
        var _a;
        return _a = {}, _a[this.statics.blotName] = this.statics.value(this.domNode) || true, _a;
    };
    LeafBlot.scope = Registry.Scope.INLINE_BLOT;
    return LeafBlot;
}(shadow_1.default));
exports.default = LeafBlot;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var equal = __webpack_require__(11);
var extend = __webpack_require__(3);


var lib = {
  attributes: {
    compose: function (a, b, keepNull) {
      if (typeof a !== 'object') a = {};
      if (typeof b !== 'object') b = {};
      var attributes = extend(true, {}, b);
      if (!keepNull) {
        attributes = Object.keys(attributes).reduce(function (copy, key) {
          if (attributes[key] != null) {
            copy[key] = attributes[key];
          }
          return copy;
        }, {});
      }
      for (var key in a) {
        if (a[key] !== undefined && b[key] === undefined) {
          attributes[key] = a[key];
        }
      }
      return Object.keys(attributes).length > 0 ? attributes : undefined;
    },

    diff: function(a, b) {
      if (typeof a !== 'object') a = {};
      if (typeof b !== 'object') b = {};
      var attributes = Object.keys(a).concat(Object.keys(b)).reduce(function (attributes, key) {
        if (!equal(a[key], b[key])) {
          attributes[key] = b[key] === undefined ? null : b[key];
        }
        return attributes;
      }, {});
      return Object.keys(attributes).length > 0 ? attributes : undefined;
    },

    transform: function (a, b, priority) {
      if (typeof a !== 'object') return b;
      if (typeof b !== 'object') return undefined;
      if (!priority) return b;  // b simply overwrites us without priority
      var attributes = Object.keys(b).reduce(function (attributes, key) {
        if (a[key] === undefined) attributes[key] = b[key];  // null is a valid value
        return attributes;
      }, {});
      return Object.keys(attributes).length > 0 ? attributes : undefined;
    }
  },

  iterator: function (ops) {
    return new Iterator(ops);
  },

  length: function (op) {
    if (typeof op['delete'] === 'number') {
      return op['delete'];
    } else if (typeof op.retain === 'number') {
      return op.retain;
    } else {
      return typeof op.insert === 'string' ? op.insert.length : 1;
    }
  }
};


function Iterator(ops) {
  this.ops = ops;
  this.index = 0;
  this.offset = 0;
};

Iterator.prototype.hasNext = function () {
  return this.peekLength() < Infinity;
};

Iterator.prototype.next = function (length) {
  if (!length) length = Infinity;
  var nextOp = this.ops[this.index];
  if (nextOp) {
    var offset = this.offset;
    var opLength = lib.length(nextOp)
    if (length >= opLength - offset) {
      length = opLength - offset;
      this.index += 1;
      this.offset = 0;
    } else {
      this.offset += length;
    }
    if (typeof nextOp['delete'] === 'number') {
      return { 'delete': length };
    } else {
      var retOp = {};
      if (nextOp.attributes) {
        retOp.attributes = nextOp.attributes;
      }
      if (typeof nextOp.retain === 'number') {
        retOp.retain = length;
      } else if (typeof nextOp.insert === 'string') {
        retOp.insert = nextOp.insert.substr(offset, length);
      } else {
        // offset should === 0, length should === 1
        retOp.insert = nextOp.insert;
      }
      return retOp;
    }
  } else {
    return { retain: Infinity };
  }
};

Iterator.prototype.peek = function () {
  return this.ops[this.index];
};

Iterator.prototype.peekLength = function () {
  if (this.ops[this.index]) {
    // Should never return 0 if our index is being managed correctly
    return lib.length(this.ops[this.index]) - this.offset;
  } else {
    return Infinity;
  }
};

Iterator.prototype.peekType = function () {
  if (this.ops[this.index]) {
    if (typeof this.ops[this.index]['delete'] === 'number') {
      return 'delete';
    } else if (typeof this.ops[this.index].retain === 'number') {
      return 'retain';
    } else {
      return 'insert';
    }
  }
  return 'retain';
};

Iterator.prototype.rest = function () {
  if (!this.hasNext()) {
    return [];
  } else if (this.offset === 0) {
    return this.ops.slice(this.index);
  } else {
    var offset = this.offset;
    var index = this.index;
    var next = this.next();
    var rest = this.ops.slice(this.index);
    this.offset = offset;
    this.index = index;
    return [next].concat(rest);
  }
};


module.exports = lib;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var clone = (function() {
'use strict';

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      if (Buffer.allocUnsafe) {
        // Node.js >= 4.5.0
        child = Buffer.allocUnsafe(parent.length);
      } else {
        // Older Node.js versions
        child = new Buffer(parent.length);
      }
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (typeof module === 'object' && module.exports) {
  module.exports = clone;
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _emitter = __webpack_require__(8);

var _emitter2 = _interopRequireDefault(_emitter);

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

var _break = __webpack_require__(16);

var _break2 = _interopRequireDefault(_break);

var _code = __webpack_require__(13);

var _code2 = _interopRequireDefault(_code);

var _container = __webpack_require__(25);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isLine(blot) {
  return blot instanceof _block2.default || blot instanceof _block.BlockEmbed;
}

var Scroll = function (_Parchment$Scroll) {
  _inherits(Scroll, _Parchment$Scroll);

  function Scroll(domNode, config) {
    _classCallCheck(this, Scroll);

    var _this = _possibleConstructorReturn(this, (Scroll.__proto__ || Object.getPrototypeOf(Scroll)).call(this, domNode));

    _this.emitter = config.emitter;
    if (Array.isArray(config.whitelist)) {
      _this.whitelist = config.whitelist.reduce(function (whitelist, format) {
        whitelist[format] = true;
        return whitelist;
      }, {});
    }
    // Some reason fixes composition issues with character languages in Windows/Chrome, Safari
    _this.domNode.addEventListener('DOMNodeInserted', function () {});
    _this.optimize();
    _this.enable();
    return _this;
  }

  _createClass(Scroll, [{
    key: 'batchStart',
    value: function batchStart() {
      this.batch = true;
    }
  }, {
    key: 'batchEnd',
    value: function batchEnd() {
      this.batch = false;
      this.optimize();
    }
  }, {
    key: 'deleteAt',
    value: function deleteAt(index, length) {
      var _line = this.line(index),
          _line2 = _slicedToArray(_line, 2),
          first = _line2[0],
          offset = _line2[1];

      var _line3 = this.line(index + length),
          _line4 = _slicedToArray(_line3, 1),
          last = _line4[0];

      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'deleteAt', this).call(this, index, length);
      if (last != null && first !== last && offset > 0) {
        if (first instanceof _block.BlockEmbed || last instanceof _block.BlockEmbed) {
          this.optimize();
          return;
        }
        if (first instanceof _code2.default) {
          var newlineIndex = first.newlineIndex(first.length(), true);
          if (newlineIndex > -1) {
            first = first.split(newlineIndex + 1);
            if (first === last) {
              this.optimize();
              return;
            }
          }
        } else if (last instanceof _code2.default) {
          var _newlineIndex = last.newlineIndex(0);
          if (_newlineIndex > -1) {
            last.split(_newlineIndex + 1);
          }
        }
        var ref = last.children.head instanceof _break2.default ? null : last.children.head;
        first.moveChildren(last, ref);
        first.remove();
      }
      this.optimize();
    }
  }, {
    key: 'enable',
    value: function enable() {
      var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.domNode.setAttribute('contenteditable', enabled);
    }
  }, {
    key: 'formatAt',
    value: function formatAt(index, length, format, value) {
      if (this.whitelist != null && !this.whitelist[format]) return;
      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'formatAt', this).call(this, index, length, format, value);
      this.optimize();
    }
  }, {
    key: 'insertAt',
    value: function insertAt(index, value, def) {
      if (def != null && this.whitelist != null && !this.whitelist[value]) return;
      if (index >= this.length()) {
        if (def == null || _parchment2.default.query(value, _parchment2.default.Scope.BLOCK) == null) {
          var blot = _parchment2.default.create(this.statics.defaultChild);
          this.appendChild(blot);
          if (def == null && value.endsWith('\n')) {
            value = value.slice(0, -1);
          }
          blot.insertAt(0, value, def);
        } else {
          var embed = _parchment2.default.create(value, def);
          this.appendChild(embed);
        }
      } else {
        _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'insertAt', this).call(this, index, value, def);
      }
      this.optimize();
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(blot, ref) {
      if (blot.statics.scope === _parchment2.default.Scope.INLINE_BLOT) {
        var wrapper = _parchment2.default.create(this.statics.defaultChild);
        wrapper.appendChild(blot);
        blot = wrapper;
      }
      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'insertBefore', this).call(this, blot, ref);
    }
  }, {
    key: 'leaf',
    value: function leaf(index) {
      return this.path(index).pop() || [null, -1];
    }
  }, {
    key: 'line',
    value: function line(index) {
      if (index === this.length()) {
        return this.line(index - 1);
      }
      return this.descendant(isLine, index);
    }
  }, {
    key: 'lines',
    value: function lines() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_VALUE;

      var getLines = function getLines(blot, index, length) {
        var lines = [],
            lengthLeft = length;
        blot.children.forEachAt(index, length, function (child, index, length) {
          if (isLine(child)) {
            lines.push(child);
          } else if (child instanceof _parchment2.default.Container) {
            lines = lines.concat(getLines(child, index, lengthLeft));
          }
          lengthLeft -= length;
        });
        return lines;
      };
      return getLines(this, index, length);
    }
  }, {
    key: 'optimize',
    value: function optimize() {
      var mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.batch === true) return;
      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'optimize', this).call(this, mutations, context);
      if (mutations.length > 0) {
        this.emitter.emit(_emitter2.default.events.SCROLL_OPTIMIZE, mutations, context);
      }
    }
  }, {
    key: 'path',
    value: function path(index) {
      return _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'path', this).call(this, index).slice(1); // Exclude self
    }
  }, {
    key: 'update',
    value: function update(mutations) {
      if (this.batch === true) return;
      var source = _emitter2.default.sources.USER;
      if (typeof mutations === 'string') {
        source = mutations;
      }
      if (!Array.isArray(mutations)) {
        mutations = this.observer.takeRecords();
      }
      if (mutations.length > 0) {
        this.emitter.emit(_emitter2.default.events.SCROLL_BEFORE_UPDATE, source, mutations);
      }
      _get(Scroll.prototype.__proto__ || Object.getPrototypeOf(Scroll.prototype), 'update', this).call(this, mutations.concat([])); // pass copy
      if (mutations.length > 0) {
        this.emitter.emit(_emitter2.default.events.SCROLL_UPDATE, source, mutations);
      }
    }
  }]);

  return Scroll;
}(_parchment2.default.Scroll);

Scroll.blotName = 'scroll';
Scroll.className = 'ql-editor';
Scroll.tagName = 'DIV';
Scroll.defaultChild = 'block';
Scroll.allowedChildren = [_block2.default, _block.BlockEmbed, _container2.default];

exports.default = Scroll;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHORTKEY = exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clone = __webpack_require__(21);

var _clone2 = _interopRequireDefault(_clone);

var _deepEqual = __webpack_require__(11);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _op = __webpack_require__(20);

var _op2 = _interopRequireDefault(_op);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _logger = __webpack_require__(10);

var _logger2 = _interopRequireDefault(_logger);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = (0, _logger2.default)('quill:keyboard');

var SHORTKEY = /Mac/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';

var Keyboard = function (_Module) {
  _inherits(Keyboard, _Module);

  _createClass(Keyboard, null, [{
    key: 'match',
    value: function match(evt, binding) {
      binding = normalize(binding);
      if (['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].some(function (key) {
        return !!binding[key] !== evt[key] && binding[key] !== null;
      })) {
        return false;
      }
      return binding.key === (evt.which || evt.keyCode);
    }
  }]);

  function Keyboard(quill, options) {
    _classCallCheck(this, Keyboard);

    var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this, quill, options));

    _this.bindings = {};
    Object.keys(_this.options.bindings).forEach(function (name) {
      if (name === 'list autofill' && quill.scroll.whitelist != null && !quill.scroll.whitelist['list']) {
        return;
      }
      if (_this.options.bindings[name]) {
        _this.addBinding(_this.options.bindings[name]);
      }
    });
    _this.addBinding({ key: Keyboard.keys.ENTER, shiftKey: null }, handleEnter);
    _this.addBinding({ key: Keyboard.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, function () {});
    if (/Firefox/i.test(navigator.userAgent)) {
      // Need to handle delete and backspace for Firefox in the general case #1171
      _this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: true }, handleBackspace);
      _this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: true }, handleDelete);
    } else {
      _this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: true, prefix: /^.?$/ }, handleBackspace);
      _this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: true, suffix: /^.?$/ }, handleDelete);
    }
    _this.addBinding({ key: Keyboard.keys.BACKSPACE }, { collapsed: false }, handleDeleteRange);
    _this.addBinding({ key: Keyboard.keys.DELETE }, { collapsed: false }, handleDeleteRange);
    _this.addBinding({ key: Keyboard.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null }, { collapsed: true, offset: 0 }, handleBackspace);
    _this.listen();
    return _this;
  }

  _createClass(Keyboard, [{
    key: 'addBinding',
    value: function addBinding(key) {
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var handler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var binding = normalize(key);
      if (binding == null || binding.key == null) {
        return debug.warn('Attempted to add invalid keyboard binding', binding);
      }
      if (typeof context === 'function') {
        context = { handler: context };
      }
      if (typeof handler === 'function') {
        handler = { handler: handler };
      }
      binding = (0, _extend2.default)(binding, context, handler);
      this.bindings[binding.key] = this.bindings[binding.key] || [];
      this.bindings[binding.key].push(binding);
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this2 = this;

      this.quill.root.addEventListener('keydown', function (evt) {
        if (evt.defaultPrevented) return;
        var which = evt.which || evt.keyCode;
        var bindings = (_this2.bindings[which] || []).filter(function (binding) {
          return Keyboard.match(evt, binding);
        });
        if (bindings.length === 0) return;
        var range = _this2.quill.getSelection();
        if (range == null || !_this2.quill.hasFocus()) return;

        var _quill$getLine = _this2.quill.getLine(range.index),
            _quill$getLine2 = _slicedToArray(_quill$getLine, 2),
            line = _quill$getLine2[0],
            offset = _quill$getLine2[1];

        var _quill$getLeaf = _this2.quill.getLeaf(range.index),
            _quill$getLeaf2 = _slicedToArray(_quill$getLeaf, 2),
            leafStart = _quill$getLeaf2[0],
            offsetStart = _quill$getLeaf2[1];

        var _ref = range.length === 0 ? [leafStart, offsetStart] : _this2.quill.getLeaf(range.index + range.length),
            _ref2 = _slicedToArray(_ref, 2),
            leafEnd = _ref2[0],
            offsetEnd = _ref2[1];

        var prefixText = leafStart instanceof _parchment2.default.Text ? leafStart.value().slice(0, offsetStart) : '';
        var suffixText = leafEnd instanceof _parchment2.default.Text ? leafEnd.value().slice(offsetEnd) : '';
        var curContext = {
          collapsed: range.length === 0,
          empty: range.length === 0 && line.length() <= 1,
          format: _this2.quill.getFormat(range),
          offset: offset,
          prefix: prefixText,
          suffix: suffixText
        };
        var prevented = bindings.some(function (binding) {
          if (binding.collapsed != null && binding.collapsed !== curContext.collapsed) return false;
          if (binding.empty != null && binding.empty !== curContext.empty) return false;
          if (binding.offset != null && binding.offset !== curContext.offset) return false;
          if (Array.isArray(binding.format)) {
            // any format is present
            if (binding.format.every(function (name) {
              return curContext.format[name] == null;
            })) {
              return false;
            }
          } else if (_typeof(binding.format) === 'object') {
            // all formats must match
            if (!Object.keys(binding.format).every(function (name) {
              if (binding.format[name] === true) return curContext.format[name] != null;
              if (binding.format[name] === false) return curContext.format[name] == null;
              return (0, _deepEqual2.default)(binding.format[name], curContext.format[name]);
            })) {
              return false;
            }
          }
          if (binding.prefix != null && !binding.prefix.test(curContext.prefix)) return false;
          if (binding.suffix != null && !binding.suffix.test(curContext.suffix)) return false;
          return binding.handler.call(_this2, range, curContext) !== true;
        });
        if (prevented) {
          evt.preventDefault();
        }
      });
    }
  }]);

  return Keyboard;
}(_module2.default);

Keyboard.keys = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46
};

Keyboard.DEFAULTS = {
  bindings: {
    'bold': makeFormatHandler('bold'),
    'italic': makeFormatHandler('italic'),
    'underline': makeFormatHandler('underline'),
    'indent': {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: Keyboard.keys.TAB,
      format: ['blockquote', 'indent', 'list'],
      handler: function handler(range, context) {
        if (context.collapsed && context.offset !== 0) return true;
        this.quill.format('indent', '+1', _quill2.default.sources.USER);
      }
    },
    'outdent': {
      key: Keyboard.keys.TAB,
      shiftKey: true,
      format: ['blockquote', 'indent', 'list'],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler: function handler(range, context) {
        if (context.collapsed && context.offset !== 0) return true;
        this.quill.format('indent', '-1', _quill2.default.sources.USER);
      }
    },
    'outdent backspace': {
      key: Keyboard.keys.BACKSPACE,
      collapsed: true,
      shiftKey: null,
      metaKey: null,
      ctrlKey: null,
      altKey: null,
      format: ['indent', 'list'],
      offset: 0,
      handler: function handler(range, context) {
        if (context.format.indent != null) {
          this.quill.format('indent', '-1', _quill2.default.sources.USER);
        } else if (context.format.list != null) {
          this.quill.format('list', false, _quill2.default.sources.USER);
        }
      }
    },
    'indent code-block': makeCodeBlockHandler(true),
    'outdent code-block': makeCodeBlockHandler(false),
    'remove tab': {
      key: Keyboard.keys.TAB,
      shiftKey: true,
      collapsed: true,
      prefix: /\t$/,
      handler: function handler(range) {
        this.quill.deleteText(range.index - 1, 1, _quill2.default.sources.USER);
      }
    },
    'tab': {
      key: Keyboard.keys.TAB,
      handler: function handler(range) {
        this.quill.history.cutoff();
        var delta = new _quillDelta2.default().retain(range.index).delete(range.length).insert('\t');
        this.quill.updateContents(delta, _quill2.default.sources.USER);
        this.quill.history.cutoff();
        this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
      }
    },
    'list empty enter': {
      key: Keyboard.keys.ENTER,
      collapsed: true,
      format: ['list'],
      empty: true,
      handler: function handler(range, context) {
        this.quill.format('list', false, _quill2.default.sources.USER);
        if (context.format.indent) {
          this.quill.format('indent', false, _quill2.default.sources.USER);
        }
      }
    },
    'checklist enter': {
      key: Keyboard.keys.ENTER,
      collapsed: true,
      format: { list: 'checked' },
      handler: function handler(range) {
        var _quill$getLine3 = this.quill.getLine(range.index),
            _quill$getLine4 = _slicedToArray(_quill$getLine3, 2),
            line = _quill$getLine4[0],
            offset = _quill$getLine4[1];

        var formats = (0, _extend2.default)({}, line.formats(), { list: 'checked' });
        var delta = new _quillDelta2.default().retain(range.index).insert('\n', formats).retain(line.length() - offset - 1).retain(1, { list: 'unchecked' });
        this.quill.updateContents(delta, _quill2.default.sources.USER);
        this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
        this.quill.scrollIntoView();
      }
    },
    'header enter': {
      key: Keyboard.keys.ENTER,
      collapsed: true,
      format: ['header'],
      suffix: /^$/,
      handler: function handler(range, context) {
        var _quill$getLine5 = this.quill.getLine(range.index),
            _quill$getLine6 = _slicedToArray(_quill$getLine5, 2),
            line = _quill$getLine6[0],
            offset = _quill$getLine6[1];

        var delta = new _quillDelta2.default().retain(range.index).insert('\n', context.format).retain(line.length() - offset - 1).retain(1, { header: null });
        this.quill.updateContents(delta, _quill2.default.sources.USER);
        this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
        this.quill.scrollIntoView();
      }
    },
    'list autofill': {
      key: ' ',
      collapsed: true,
      format: { list: false },
      prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
      handler: function handler(range, context) {
        var length = context.prefix.length;

        var _quill$getLine7 = this.quill.getLine(range.index),
            _quill$getLine8 = _slicedToArray(_quill$getLine7, 2),
            line = _quill$getLine8[0],
            offset = _quill$getLine8[1];

        if (offset > length) return true;
        var value = void 0;
        switch (context.prefix.trim()) {
          case '[]':case '[ ]':
            value = 'unchecked';
            break;
          case '[x]':
            value = 'checked';
            break;
          case '-':case '*':
            value = 'bullet';
            break;
          default:
            value = 'ordered';
        }
        this.quill.insertText(range.index, ' ', _quill2.default.sources.USER);
        this.quill.history.cutoff();
        var delta = new _quillDelta2.default().retain(range.index - offset).delete(length + 1).retain(line.length() - 2 - offset).retain(1, { list: value });
        this.quill.updateContents(delta, _quill2.default.sources.USER);
        this.quill.history.cutoff();
        this.quill.setSelection(range.index - length, _quill2.default.sources.SILENT);
      }
    },
    'code exit': {
      key: Keyboard.keys.ENTER,
      collapsed: true,
      format: ['code-block'],
      prefix: /\n\n$/,
      suffix: /^\s+$/,
      handler: function handler(range) {
        var _quill$getLine9 = this.quill.getLine(range.index),
            _quill$getLine10 = _slicedToArray(_quill$getLine9, 2),
            line = _quill$getLine10[0],
            offset = _quill$getLine10[1];

        var delta = new _quillDelta2.default().retain(range.index + line.length() - offset - 2).retain(1, { 'code-block': null }).delete(1);
        this.quill.updateContents(delta, _quill2.default.sources.USER);
      }
    },
    'embed left': makeEmbedArrowHandler(Keyboard.keys.LEFT, false),
    'embed left shift': makeEmbedArrowHandler(Keyboard.keys.LEFT, true),
    'embed right': makeEmbedArrowHandler(Keyboard.keys.RIGHT, false),
    'embed right shift': makeEmbedArrowHandler(Keyboard.keys.RIGHT, true)
  }
};

function makeEmbedArrowHandler(key, shiftKey) {
  var _ref3;

  var where = key === Keyboard.keys.LEFT ? 'prefix' : 'suffix';
  return _ref3 = {
    key: key,
    shiftKey: shiftKey,
    altKey: null
  }, _defineProperty(_ref3, where, /^$/), _defineProperty(_ref3, 'handler', function handler(range) {
    var index = range.index;
    if (key === Keyboard.keys.RIGHT) {
      index += range.length + 1;
    }

    var _quill$getLeaf3 = this.quill.getLeaf(index),
        _quill$getLeaf4 = _slicedToArray(_quill$getLeaf3, 1),
        leaf = _quill$getLeaf4[0];

    if (!(leaf instanceof _parchment2.default.Embed)) return true;
    if (key === Keyboard.keys.LEFT) {
      if (shiftKey) {
        this.quill.setSelection(range.index - 1, range.length + 1, _quill2.default.sources.USER);
      } else {
        this.quill.setSelection(range.index - 1, _quill2.default.sources.USER);
      }
    } else {
      if (shiftKey) {
        this.quill.setSelection(range.index, range.length + 1, _quill2.default.sources.USER);
      } else {
        this.quill.setSelection(range.index + range.length + 1, _quill2.default.sources.USER);
      }
    }
    return false;
  }), _ref3;
}

function handleBackspace(range, context) {
  if (range.index === 0 || this.quill.getLength() <= 1) return;

  var _quill$getLine11 = this.quill.getLine(range.index),
      _quill$getLine12 = _slicedToArray(_quill$getLine11, 1),
      line = _quill$getLine12[0];

  var formats = {};
  if (context.offset === 0) {
    var _quill$getLine13 = this.quill.getLine(range.index - 1),
        _quill$getLine14 = _slicedToArray(_quill$getLine13, 1),
        prev = _quill$getLine14[0];

    if (prev != null && prev.length() > 1) {
      var curFormats = line.formats();
      var prevFormats = this.quill.getFormat(range.index - 1, 1);
      formats = _op2.default.attributes.diff(curFormats, prevFormats) || {};
    }
  }
  // Check for astral symbols
  var length = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(context.prefix) ? 2 : 1;
  this.quill.deleteText(range.index - length, length, _quill2.default.sources.USER);
  if (Object.keys(formats).length > 0) {
    this.quill.formatLine(range.index - length, length, formats, _quill2.default.sources.USER);
  }
  this.quill.focus();
}

function handleDelete(range, context) {
  // Check for astral symbols
  var length = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(context.suffix) ? 2 : 1;
  if (range.index >= this.quill.getLength() - length) return;
  var formats = {},
      nextLength = 0;

  var _quill$getLine15 = this.quill.getLine(range.index),
      _quill$getLine16 = _slicedToArray(_quill$getLine15, 1),
      line = _quill$getLine16[0];

  if (context.offset >= line.length() - 1) {
    var _quill$getLine17 = this.quill.getLine(range.index + 1),
        _quill$getLine18 = _slicedToArray(_quill$getLine17, 1),
        next = _quill$getLine18[0];

    if (next) {
      var curFormats = line.formats();
      var nextFormats = this.quill.getFormat(range.index, 1);
      formats = _op2.default.attributes.diff(curFormats, nextFormats) || {};
      nextLength = next.length();
    }
  }
  this.quill.deleteText(range.index, length, _quill2.default.sources.USER);
  if (Object.keys(formats).length > 0) {
    this.quill.formatLine(range.index + nextLength - 1, length, formats, _quill2.default.sources.USER);
  }
}

function handleDeleteRange(range) {
  var lines = this.quill.getLines(range);
  var formats = {};
  if (lines.length > 1) {
    var firstFormats = lines[0].formats();
    var lastFormats = lines[lines.length - 1].formats();
    formats = _op2.default.attributes.diff(lastFormats, firstFormats) || {};
  }
  this.quill.deleteText(range, _quill2.default.sources.USER);
  if (Object.keys(formats).length > 0) {
    this.quill.formatLine(range.index, 1, formats, _quill2.default.sources.USER);
  }
  this.quill.setSelection(range.index, _quill2.default.sources.SILENT);
  this.quill.focus();
}

function handleEnter(range, context) {
  var _this3 = this;

  if (range.length > 0) {
    this.quill.scroll.deleteAt(range.index, range.length); // So we do not trigger text-change
  }
  var lineFormats = Object.keys(context.format).reduce(function (lineFormats, format) {
    if (_parchment2.default.query(format, _parchment2.default.Scope.BLOCK) && !Array.isArray(context.format[format])) {
      lineFormats[format] = context.format[format];
    }
    return lineFormats;
  }, {});
  this.quill.insertText(range.index, '\n', lineFormats, _quill2.default.sources.USER);
  // Earlier scroll.deleteAt might have messed up our selection,
  // so insertText's built in selection preservation is not reliable
  this.quill.setSelection(range.index + 1, _quill2.default.sources.SILENT);
  this.quill.focus();
  Object.keys(context.format).forEach(function (name) {
    if (lineFormats[name] != null) return;
    if (Array.isArray(context.format[name])) return;
    if (name === 'link') return;
    _this3.quill.format(name, context.format[name], _quill2.default.sources.USER);
  });
}

function makeCodeBlockHandler(indent) {
  return {
    key: Keyboard.keys.TAB,
    shiftKey: !indent,
    format: { 'code-block': true },
    handler: function handler(range) {
      var CodeBlock = _parchment2.default.query('code-block');
      var index = range.index,
          length = range.length;

      var _quill$scroll$descend = this.quill.scroll.descendant(CodeBlock, index),
          _quill$scroll$descend2 = _slicedToArray(_quill$scroll$descend, 2),
          block = _quill$scroll$descend2[0],
          offset = _quill$scroll$descend2[1];

      if (block == null) return;
      var scrollIndex = this.quill.getIndex(block);
      var start = block.newlineIndex(offset, true) + 1;
      var end = block.newlineIndex(scrollIndex + offset + length);
      var lines = block.domNode.textContent.slice(start, end).split('\n');
      offset = 0;
      lines.forEach(function (line, i) {
        if (indent) {
          block.insertAt(start + offset, CodeBlock.TAB);
          offset += CodeBlock.TAB.length;
          if (i === 0) {
            index += CodeBlock.TAB.length;
          } else {
            length += CodeBlock.TAB.length;
          }
        } else if (line.startsWith(CodeBlock.TAB)) {
          block.deleteAt(start + offset, CodeBlock.TAB.length);
          offset -= CodeBlock.TAB.length;
          if (i === 0) {
            index -= CodeBlock.TAB.length;
          } else {
            length -= CodeBlock.TAB.length;
          }
        }
        offset += line.length + 1;
      });
      this.quill.update(_quill2.default.sources.USER);
      this.quill.setSelection(index, length, _quill2.default.sources.SILENT);
    }
  };
}

function makeFormatHandler(format) {
  return {
    key: format[0].toUpperCase(),
    shortKey: true,
    handler: function handler(range, context) {
      this.quill.format(format, !context.format[format], _quill2.default.sources.USER);
    }
  };
}

function normalize(binding) {
  if (typeof binding === 'string' || typeof binding === 'number') {
    return normalize({ key: binding });
  }
  if ((typeof binding === 'undefined' ? 'undefined' : _typeof(binding)) === 'object') {
    binding = (0, _clone2.default)(binding, false);
  }
  if (typeof binding.key === 'string') {
    if (Keyboard.keys[binding.key.toUpperCase()] != null) {
      binding.key = Keyboard.keys[binding.key.toUpperCase()];
    } else if (binding.key.length === 1) {
      binding.key = binding.key.toUpperCase().charCodeAt(0);
    } else {
      return null;
    }
  }
  if (binding.shortKey) {
    binding[SHORTKEY] = binding.shortKey;
    delete binding.shortKey;
  }
  return binding;
}

exports.default = Keyboard;
exports.SHORTKEY = SHORTKEY;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _text = __webpack_require__(7);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cursor = function (_Parchment$Embed) {
  _inherits(Cursor, _Parchment$Embed);

  _createClass(Cursor, null, [{
    key: 'value',
    value: function value() {
      return undefined;
    }
  }]);

  function Cursor(domNode, selection) {
    _classCallCheck(this, Cursor);

    var _this = _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this, domNode));

    _this.selection = selection;
    _this.textNode = document.createTextNode(Cursor.CONTENTS);
    _this.domNode.appendChild(_this.textNode);
    _this._length = 0;
    return _this;
  }

  _createClass(Cursor, [{
    key: 'detach',
    value: function detach() {
      // super.detach() will also clear domNode.__blot
      if (this.parent != null) this.parent.removeChild(this);
    }
  }, {
    key: 'format',
    value: function format(name, value) {
      if (this._length !== 0) {
        return _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'format', this).call(this, name, value);
      }
      var target = this,
          index = 0;
      while (target != null && target.statics.scope !== _parchment2.default.Scope.BLOCK_BLOT) {
        index += target.offset(target.parent);
        target = target.parent;
      }
      if (target != null) {
        this._length = Cursor.CONTENTS.length;
        target.optimize();
        target.formatAt(index, Cursor.CONTENTS.length, name, value);
        this._length = 0;
      }
    }
  }, {
    key: 'index',
    value: function index(node, offset) {
      if (node === this.textNode) return 0;
      return _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'index', this).call(this, node, offset);
    }
  }, {
    key: 'length',
    value: function length() {
      return this._length;
    }
  }, {
    key: 'position',
    value: function position() {
      return [this.textNode, this.textNode.data.length];
    }
  }, {
    key: 'remove',
    value: function remove() {
      _get(Cursor.prototype.__proto__ || Object.getPrototypeOf(Cursor.prototype), 'remove', this).call(this);
      this.parent = null;
    }
  }, {
    key: 'restore',
    value: function restore() {
      if (this.selection.composing || this.parent == null) return;
      var textNode = this.textNode;
      var range = this.selection.getNativeRange();
      var restoreText = void 0,
          start = void 0,
          end = void 0;
      if (range != null && range.start.node === textNode && range.end.node === textNode) {
        var _ref = [textNode, range.start.offset, range.end.offset];
        restoreText = _ref[0];
        start = _ref[1];
        end = _ref[2];
      }
      // Link format will insert text outside of anchor tag
      while (this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode) {
        this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
      }
      if (this.textNode.data !== Cursor.CONTENTS) {
        var text = this.textNode.data.split(Cursor.CONTENTS).join('');
        if (this.next instanceof _text2.default) {
          restoreText = this.next.domNode;
          this.next.insertAt(0, text);
          this.textNode.data = Cursor.CONTENTS;
        } else {
          this.textNode.data = text;
          this.parent.insertBefore(_parchment2.default.create(this.textNode), this);
          this.textNode = document.createTextNode(Cursor.CONTENTS);
          this.domNode.appendChild(this.textNode);
        }
      }
      this.remove();
      if (start != null) {
        var _map = [start, end].map(function (offset) {
          return Math.max(0, Math.min(restoreText.data.length, offset - 1));
        });

        var _map2 = _slicedToArray(_map, 2);

        start = _map2[0];
        end = _map2[1];

        return {
          startNode: restoreText,
          startOffset: start,
          endNode: restoreText,
          endOffset: end
        };
      }
    }
  }, {
    key: 'update',
    value: function update(mutations, context) {
      var _this2 = this;

      if (mutations.some(function (mutation) {
        return mutation.type === 'characterData' && mutation.target === _this2.textNode;
      })) {
        var range = this.restore();
        if (range) context.range = range;
      }
    }
  }, {
    key: 'value',
    value: function value() {
      return '';
    }
  }]);

  return Cursor;
}(_parchment2.default.Embed);

Cursor.blotName = 'cursor';
Cursor.className = 'ql-cursor';
Cursor.tagName = 'span';
Cursor.CONTENTS = '\uFEFF'; // Zero width no break space


exports.default = Cursor;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_Parchment$Container) {
  _inherits(Container, _Parchment$Container);

  function Container() {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
  }

  return Container;
}(_parchment2.default.Container);

Container.allowedChildren = [_block2.default, _block.BlockEmbed, Container];

exports.default = Container;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorStyle = exports.ColorClass = exports.ColorAttributor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorAttributor = function (_Parchment$Attributor) {
  _inherits(ColorAttributor, _Parchment$Attributor);

  function ColorAttributor() {
    _classCallCheck(this, ColorAttributor);

    return _possibleConstructorReturn(this, (ColorAttributor.__proto__ || Object.getPrototypeOf(ColorAttributor)).apply(this, arguments));
  }

  _createClass(ColorAttributor, [{
    key: 'value',
    value: function value(domNode) {
      var value = _get(ColorAttributor.prototype.__proto__ || Object.getPrototypeOf(ColorAttributor.prototype), 'value', this).call(this, domNode);
      if (!value.startsWith('rgb(')) return value;
      value = value.replace(/^[^\d]+/, '').replace(/[^\d]+$/, '');
      return '#' + value.split(',').map(function (component) {
        return ('00' + parseInt(component).toString(16)).slice(-2);
      }).join('');
    }
  }]);

  return ColorAttributor;
}(_parchment2.default.Attributor.Style);

var ColorClass = new _parchment2.default.Attributor.Class('color', 'ql-color', {
  scope: _parchment2.default.Scope.INLINE
});
var ColorStyle = new ColorAttributor('color', 'color', {
  scope: _parchment2.default.Scope.INLINE
});

exports.ColorAttributor = ColorAttributor;
exports.ColorClass = ColorClass;
exports.ColorStyle = ColorStyle;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitize = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Link = function (_Inline) {
  _inherits(Link, _Inline);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).apply(this, arguments));
  }

  _createClass(Link, [{
    key: 'format',
    value: function format(name, value) {
      if (name !== this.statics.blotName || !value) return _get(Link.prototype.__proto__ || Object.getPrototypeOf(Link.prototype), 'format', this).call(this, name, value);
      value = this.constructor.sanitize(value);
      this.domNode.setAttribute('href', value);
    }
  }], [{
    key: 'create',
    value: function create(value) {
      var node = _get(Link.__proto__ || Object.getPrototypeOf(Link), 'create', this).call(this, value);
      value = this.sanitize(value);
      node.setAttribute('href', value);
      node.setAttribute('rel', 'noopener noreferrer');
      node.setAttribute('target', '_blank');
      return node;
    }
  }, {
    key: 'formats',
    value: function formats(domNode) {
      return domNode.getAttribute('href');
    }
  }, {
    key: 'sanitize',
    value: function sanitize(url) {
      return _sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
    }
  }]);

  return Link;
}(_inline2.default);

Link.blotName = 'link';
Link.tagName = 'A';
Link.SANITIZED_URL = 'about:blank';
Link.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel'];

function _sanitize(url, protocols) {
  var anchor = document.createElement('a');
  anchor.href = url;
  var protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  return protocols.indexOf(protocol) > -1;
}

exports.default = Link;
exports.sanitize = _sanitize;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keyboard = __webpack_require__(23);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _dropdown = __webpack_require__(107);

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var optionsCounter = 0;

function toggleAriaAttribute(element, attribute) {
  element.setAttribute(attribute, !(element.getAttribute(attribute) === 'true'));
}

var Picker = function () {
  function Picker(select) {
    var _this = this;

    _classCallCheck(this, Picker);

    this.select = select;
    this.container = document.createElement('span');
    this.buildPicker();
    this.select.style.display = 'none';
    this.select.parentNode.insertBefore(this.container, this.select);

    this.label.addEventListener('mousedown', function () {
      _this.togglePicker();
    });
    this.label.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        // Allows the "Enter" key to open the picker
        case _keyboard2.default.keys.ENTER:
          _this.togglePicker();
          break;

        // Allows the "Escape" key to close the picker
        case _keyboard2.default.keys.ESCAPE:
          _this.escape();
          event.preventDefault();
          break;
        default:
      }
    });
    this.select.addEventListener('change', this.update.bind(this));
  }

  _createClass(Picker, [{
    key: 'togglePicker',
    value: function togglePicker() {
      this.container.classList.toggle('ql-expanded');
      // Toggle aria-expanded and aria-hidden to make the picker accessible
      toggleAriaAttribute(this.label, 'aria-expanded');
      toggleAriaAttribute(this.options, 'aria-hidden');
    }
  }, {
    key: 'buildItem',
    value: function buildItem(option) {
      var _this2 = this;

      var item = document.createElement('span');
      item.tabIndex = '0';
      item.setAttribute('role', 'button');

      item.classList.add('ql-picker-item');
      if (option.hasAttribute('value')) {
        item.setAttribute('data-value', option.getAttribute('value'));
      }
      if (option.textContent) {
        item.setAttribute('data-label', option.textContent);
      }
      item.addEventListener('click', function () {
        _this2.selectItem(item, true);
      });
      item.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
          // Allows the "Enter" key to select an item
          case _keyboard2.default.keys.ENTER:
            _this2.selectItem(item, true);
            event.preventDefault();
            break;

          // Allows the "Escape" key to close the picker
          case _keyboard2.default.keys.ESCAPE:
            _this2.escape();
            event.preventDefault();
            break;
          default:
        }
      });

      return item;
    }
  }, {
    key: 'buildLabel',
    value: function buildLabel() {
      var label = document.createElement('span');
      label.classList.add('ql-picker-label');
      label.innerHTML = _dropdown2.default;
      label.tabIndex = '0';
      label.setAttribute('role', 'button');
      label.setAttribute('aria-expanded', 'false');
      this.container.appendChild(label);
      return label;
    }
  }, {
    key: 'buildOptions',
    value: function buildOptions() {
      var _this3 = this;

      var options = document.createElement('span');
      options.classList.add('ql-picker-options');

      // Don't want screen readers to read this until options are visible
      options.setAttribute('aria-hidden', 'true');
      options.tabIndex = '-1';

      // Need a unique id for aria-controls
      options.id = 'ql-picker-options-' + optionsCounter;
      optionsCounter += 1;
      this.label.setAttribute('aria-controls', options.id);

      this.options = options;

      [].slice.call(this.select.options).forEach(function (option) {
        var item = _this3.buildItem(option);
        options.appendChild(item);
        if (option.selected === true) {
          _this3.selectItem(item);
        }
      });
      this.container.appendChild(options);
    }
  }, {
    key: 'buildPicker',
    value: function buildPicker() {
      var _this4 = this;

      [].slice.call(this.select.attributes).forEach(function (item) {
        _this4.container.setAttribute(item.name, item.value);
      });
      this.container.classList.add('ql-picker');
      this.label = this.buildLabel();
      this.buildOptions();
    }
  }, {
    key: 'escape',
    value: function escape() {
      var _this5 = this;

      // Close menu and return focus to trigger label
      this.close();
      // Need setTimeout for accessibility to ensure that the browser executes
      // focus on the next process thread and after any DOM content changes
      setTimeout(function () {
        return _this5.label.focus();
      }, 1);
    }
  }, {
    key: 'close',
    value: function close() {
      this.container.classList.remove('ql-expanded');
      this.label.setAttribute('aria-expanded', 'false');
      this.options.setAttribute('aria-hidden', 'true');
    }
  }, {
    key: 'selectItem',
    value: function selectItem(item) {
      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var selected = this.container.querySelector('.ql-selected');
      if (item === selected) return;
      if (selected != null) {
        selected.classList.remove('ql-selected');
      }
      if (item == null) return;
      item.classList.add('ql-selected');
      this.select.selectedIndex = [].indexOf.call(item.parentNode.children, item);
      if (item.hasAttribute('data-value')) {
        this.label.setAttribute('data-value', item.getAttribute('data-value'));
      } else {
        this.label.removeAttribute('data-value');
      }
      if (item.hasAttribute('data-label')) {
        this.label.setAttribute('data-label', item.getAttribute('data-label'));
      } else {
        this.label.removeAttribute('data-label');
      }
      if (trigger) {
        if (typeof Event === 'function') {
          this.select.dispatchEvent(new Event('change'));
        } else if ((typeof Event === 'undefined' ? 'undefined' : _typeof(Event)) === 'object') {
          // IE11
          var event = document.createEvent('Event');
          event.initEvent('change', true, true);
          this.select.dispatchEvent(event);
        }
        this.close();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var option = void 0;
      if (this.select.selectedIndex > -1) {
        var item = this.container.querySelector('.ql-picker-options').children[this.select.selectedIndex];
        option = this.select.options[this.select.selectedIndex];
        this.selectItem(item);
      } else {
        this.selectItem(null);
      }
      var isActive = option != null && option !== this.select.querySelector('option[selected]');
      this.label.classList.toggle('ql-active', isActive);
    }
  }]);

  return Picker;
}();

exports.default = Picker;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

var _break = __webpack_require__(16);

var _break2 = _interopRequireDefault(_break);

var _container = __webpack_require__(25);

var _container2 = _interopRequireDefault(_container);

var _cursor = __webpack_require__(24);

var _cursor2 = _interopRequireDefault(_cursor);

var _embed = __webpack_require__(35);

var _embed2 = _interopRequireDefault(_embed);

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

var _scroll = __webpack_require__(22);

var _scroll2 = _interopRequireDefault(_scroll);

var _text = __webpack_require__(7);

var _text2 = _interopRequireDefault(_text);

var _clipboard = __webpack_require__(55);

var _clipboard2 = _interopRequireDefault(_clipboard);

var _history = __webpack_require__(42);

var _history2 = _interopRequireDefault(_history);

var _keyboard = __webpack_require__(23);

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_quill2.default.register({
  'blots/block': _block2.default,
  'blots/block/embed': _block.BlockEmbed,
  'blots/break': _break2.default,
  'blots/container': _container2.default,
  'blots/cursor': _cursor2.default,
  'blots/embed': _embed2.default,
  'blots/inline': _inline2.default,
  'blots/scroll': _scroll2.default,
  'blots/text': _text2.default,

  'modules/clipboard': _clipboard2.default,
  'modules/history': _history2.default,
  'modules/keyboard': _keyboard2.default
});

_parchment2.default.register(_block2.default, _break2.default, _cursor2.default, _inline2.default, _scroll2.default, _text2.default);

exports.default = _quill2.default;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Registry = __webpack_require__(1);
var ShadowBlot = /** @class */ (function () {
    function ShadowBlot(domNode) {
        this.domNode = domNode;
        // @ts-ignore
        this.domNode[Registry.DATA_KEY] = { blot: this };
    }
    Object.defineProperty(ShadowBlot.prototype, "statics", {
        // Hack for accessing inherited static methods
        get: function () {
            return this.constructor;
        },
        enumerable: true,
        configurable: true
    });
    ShadowBlot.create = function (value) {
        if (this.tagName == null) {
            throw new Registry.ParchmentError('Blot definition missing tagName');
        }
        var node;
        if (Array.isArray(this.tagName)) {
            if (typeof value === 'string') {
                value = value.toUpperCase();
                if (parseInt(value).toString() === value) {
                    value = parseInt(value);
                }
            }
            if (typeof value === 'number') {
                node = document.createElement(this.tagName[value - 1]);
            }
            else if (this.tagName.indexOf(value) > -1) {
                node = document.createElement(value);
            }
            else {
                node = document.createElement(this.tagName[0]);
            }
        }
        else {
            node = document.createElement(this.tagName);
        }
        if (this.className) {
            node.classList.add(this.className);
        }
        return node;
    };
    ShadowBlot.prototype.attach = function () {
        if (this.parent != null) {
            this.scroll = this.parent.scroll;
        }
    };
    ShadowBlot.prototype.clone = function () {
        var domNode = this.domNode.cloneNode(false);
        return Registry.create(domNode);
    };
    ShadowBlot.prototype.detach = function () {
        if (this.parent != null)
            this.parent.removeChild(this);
        // @ts-ignore
        delete this.domNode[Registry.DATA_KEY];
    };
    ShadowBlot.prototype.deleteAt = function (index, length) {
        var blot = this.isolate(index, length);
        blot.remove();
    };
    ShadowBlot.prototype.formatAt = function (index, length, name, value) {
        var blot = this.isolate(index, length);
        if (Registry.query(name, Registry.Scope.BLOT) != null && value) {
            blot.wrap(name, value);
        }
        else if (Registry.query(name, Registry.Scope.ATTRIBUTE) != null) {
            var parent = Registry.create(this.statics.scope);
            blot.wrap(parent);
            parent.format(name, value);
        }
    };
    ShadowBlot.prototype.insertAt = function (index, value, def) {
        var blot = def == null ? Registry.create('text', value) : Registry.create(value, def);
        var ref = this.split(index);
        this.parent.insertBefore(blot, ref);
    };
    ShadowBlot.prototype.insertInto = function (parentBlot, refBlot) {
        if (refBlot === void 0) { refBlot = null; }
        if (this.parent != null) {
            this.parent.children.remove(this);
        }
        var refDomNode = null;
        parentBlot.children.insertBefore(this, refBlot);
        if (refBlot != null) {
            refDomNode = refBlot.domNode;
        }
        if (this.domNode.parentNode != parentBlot.domNode ||
            this.domNode.nextSibling != refDomNode) {
            parentBlot.domNode.insertBefore(this.domNode, refDomNode);
        }
        this.parent = parentBlot;
        this.attach();
    };
    ShadowBlot.prototype.isolate = function (index, length) {
        var target = this.split(index);
        target.split(length);
        return target;
    };
    ShadowBlot.prototype.length = function () {
        return 1;
    };
    ShadowBlot.prototype.offset = function (root) {
        if (root === void 0) { root = this.parent; }
        if (this.parent == null || this == root)
            return 0;
        return this.parent.children.offset(this) + this.parent.offset(root);
    };
    ShadowBlot.prototype.optimize = function (context) {
        // TODO clean up once we use WeakMap
        // @ts-ignore
        if (this.domNode[Registry.DATA_KEY] != null) {
            // @ts-ignore
            delete this.domNode[Registry.DATA_KEY].mutations;
        }
    };
    ShadowBlot.prototype.remove = function () {
        if (this.domNode.parentNode != null) {
            this.domNode.parentNode.removeChild(this.domNode);
        }
        this.detach();
    };
    ShadowBlot.prototype.replace = function (target) {
        if (target.parent == null)
            return;
        target.parent.insertBefore(this, target.next);
        target.remove();
    };
    ShadowBlot.prototype.replaceWith = function (name, value) {
        var replacement = typeof name === 'string' ? Registry.create(name, value) : name;
        replacement.replace(this);
        return replacement;
    };
    ShadowBlot.prototype.split = function (index, force) {
        return index === 0 ? this : this.next;
    };
    ShadowBlot.prototype.update = function (mutations, context) {
        // Nothing to do by default
    };
    ShadowBlot.prototype.wrap = function (name, value) {
        var wrapper = typeof name === 'string' ? Registry.create(name, value) : name;
        if (this.parent != null) {
            this.parent.insertBefore(wrapper, this.next);
        }
        wrapper.appendChild(this);
        return wrapper;
    };
    ShadowBlot.blotName = 'abstract';
    return ShadowBlot;
}());
exports.default = ShadowBlot;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var attributor_1 = __webpack_require__(12);
var class_1 = __webpack_require__(32);
var style_1 = __webpack_require__(33);
var Registry = __webpack_require__(1);
var AttributorStore = /** @class */ (function () {
    function AttributorStore(domNode) {
        this.attributes = {};
        this.domNode = domNode;
        this.build();
    }
    AttributorStore.prototype.attribute = function (attribute, value) {
        // verb
        if (value) {
            if (attribute.add(this.domNode, value)) {
                if (attribute.value(this.domNode) != null) {
                    this.attributes[attribute.attrName] = attribute;
                }
                else {
                    delete this.attributes[attribute.attrName];
                }
            }
        }
        else {
            attribute.remove(this.domNode);
            delete this.attributes[attribute.attrName];
        }
    };
    AttributorStore.prototype.build = function () {
        var _this = this;
        this.attributes = {};
        var attributes = attributor_1.default.keys(this.domNode);
        var classes = class_1.default.keys(this.domNode);
        var styles = style_1.default.keys(this.domNode);
        attributes
            .concat(classes)
            .concat(styles)
            .forEach(function (name) {
            var attr = Registry.query(name, Registry.Scope.ATTRIBUTE);
            if (attr instanceof attributor_1.default) {
                _this.attributes[attr.attrName] = attr;
            }
        });
    };
    AttributorStore.prototype.copy = function (target) {
        var _this = this;
        Object.keys(this.attributes).forEach(function (key) {
            var value = _this.attributes[key].value(_this.domNode);
            target.format(key, value);
        });
    };
    AttributorStore.prototype.move = function (target) {
        var _this = this;
        this.copy(target);
        Object.keys(this.attributes).forEach(function (key) {
            _this.attributes[key].remove(_this.domNode);
        });
        this.attributes = {};
    };
    AttributorStore.prototype.values = function () {
        var _this = this;
        return Object.keys(this.attributes).reduce(function (attributes, name) {
            attributes[name] = _this.attributes[name].value(_this.domNode);
            return attributes;
        }, {});
    };
    return AttributorStore;
}());
exports.default = AttributorStore;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var attributor_1 = __webpack_require__(12);
function match(node, prefix) {
    var className = node.getAttribute('class') || '';
    return className.split(/\s+/).filter(function (name) {
        return name.indexOf(prefix + "-") === 0;
    });
}
var ClassAttributor = /** @class */ (function (_super) {
    __extends(ClassAttributor, _super);
    function ClassAttributor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassAttributor.keys = function (node) {
        return (node.getAttribute('class') || '').split(/\s+/).map(function (name) {
            return name
                .split('-')
                .slice(0, -1)
                .join('-');
        });
    };
    ClassAttributor.prototype.add = function (node, value) {
        if (!this.canAdd(node, value))
            return false;
        this.remove(node);
        node.classList.add(this.keyName + "-" + value);
        return true;
    };
    ClassAttributor.prototype.remove = function (node) {
        var matches = match(node, this.keyName);
        matches.forEach(function (name) {
            node.classList.remove(name);
        });
        if (node.classList.length === 0) {
            node.removeAttribute('class');
        }
    };
    ClassAttributor.prototype.value = function (node) {
        var result = match(node, this.keyName)[0] || '';
        var value = result.slice(this.keyName.length + 1); // +1 for hyphen
        return this.canAdd(node, value) ? value : '';
    };
    return ClassAttributor;
}(attributor_1.default));
exports.default = ClassAttributor;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var attributor_1 = __webpack_require__(12);
function camelize(name) {
    var parts = name.split('-');
    var rest = parts
        .slice(1)
        .map(function (part) {
        return part[0].toUpperCase() + part.slice(1);
    })
        .join('');
    return parts[0] + rest;
}
var StyleAttributor = /** @class */ (function (_super) {
    __extends(StyleAttributor, _super);
    function StyleAttributor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StyleAttributor.keys = function (node) {
        return (node.getAttribute('style') || '').split(';').map(function (value) {
            var arr = value.split(':');
            return arr[0].trim();
        });
    };
    StyleAttributor.prototype.add = function (node, value) {
        if (!this.canAdd(node, value))
            return false;
        // @ts-ignore
        node.style[camelize(this.keyName)] = value;
        return true;
    };
    StyleAttributor.prototype.remove = function (node) {
        // @ts-ignore
        node.style[camelize(this.keyName)] = '';
        if (!node.getAttribute('style')) {
            node.removeAttribute('style');
        }
    };
    StyleAttributor.prototype.value = function (node) {
        // @ts-ignore
        var value = node.style[camelize(this.keyName)];
        return this.canAdd(node, value) ? value : '';
    };
    return StyleAttributor;
}(attributor_1.default));
exports.default = StyleAttributor;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Theme = function () {
  function Theme(quill, options) {
    _classCallCheck(this, Theme);

    this.quill = quill;
    this.options = options;
    this.modules = {};
  }

  _createClass(Theme, [{
    key: 'init',
    value: function init() {
      var _this = this;

      Object.keys(this.options.modules).forEach(function (name) {
        if (_this.modules[name] == null) {
          _this.addModule(name);
        }
      });
    }
  }, {
    key: 'addModule',
    value: function addModule(name) {
      var moduleClass = this.quill.constructor.import('modules/' + name);
      this.modules[name] = new moduleClass(this.quill, this.options.modules[name] || {});
      return this.modules[name];
    }
  }]);

  return Theme;
}();

Theme.DEFAULTS = {
  modules: {}
};
Theme.themes = {
  'default': Theme
};

exports.default = Theme;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _text = __webpack_require__(7);

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GUARD_TEXT = '\uFEFF';

var Embed = function (_Parchment$Embed) {
  _inherits(Embed, _Parchment$Embed);

  function Embed(node) {
    _classCallCheck(this, Embed);

    var _this = _possibleConstructorReturn(this, (Embed.__proto__ || Object.getPrototypeOf(Embed)).call(this, node));

    _this.contentNode = document.createElement('span');
    _this.contentNode.setAttribute('contenteditable', false);
    [].slice.call(_this.domNode.childNodes).forEach(function (childNode) {
      _this.contentNode.appendChild(childNode);
    });
    _this.leftGuard = document.createTextNode(GUARD_TEXT);
    _this.rightGuard = document.createTextNode(GUARD_TEXT);
    _this.domNode.appendChild(_this.leftGuard);
    _this.domNode.appendChild(_this.contentNode);
    _this.domNode.appendChild(_this.rightGuard);
    return _this;
  }

  _createClass(Embed, [{
    key: 'index',
    value: function index(node, offset) {
      if (node === this.leftGuard) return 0;
      if (node === this.rightGuard) return 1;
      return _get(Embed.prototype.__proto__ || Object.getPrototypeOf(Embed.prototype), 'index', this).call(this, node, offset);
    }
  }, {
    key: 'restore',
    value: function restore(node) {
      var range = void 0,
          textNode = void 0;
      var text = node.data.split(GUARD_TEXT).join('');
      if (node === this.leftGuard) {
        if (this.prev instanceof _text2.default) {
          var prevLength = this.prev.length();
          this.prev.insertAt(prevLength, text);
          range = {
            startNode: this.prev.domNode,
            startOffset: prevLength + text.length
          };
        } else {
          textNode = document.createTextNode(text);
          this.parent.insertBefore(_parchment2.default.create(textNode), this);
          range = {
            startNode: textNode,
            startOffset: text.length
          };
        }
      } else if (node === this.rightGuard) {
        if (this.next instanceof _text2.default) {
          this.next.insertAt(0, text);
          range = {
            startNode: this.next.domNode,
            startOffset: text.length
          };
        } else {
          textNode = document.createTextNode(text);
          this.parent.insertBefore(_parchment2.default.create(textNode), this.next);
          range = {
            startNode: textNode,
            startOffset: text.length
          };
        }
      }
      node.data = GUARD_TEXT;
      return range;
    }
  }, {
    key: 'update',
    value: function update(mutations, context) {
      var _this2 = this;

      mutations.forEach(function (mutation) {
        if (mutation.type === 'characterData' && (mutation.target === _this2.leftGuard || mutation.target === _this2.rightGuard)) {
          var range = _this2.restore(mutation.target);
          if (range) context.range = range;
        }
      });
    }
  }]);

  return Embed;
}(_parchment2.default.Embed);

exports.default = Embed;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlignStyle = exports.AlignClass = exports.AlignAttribute = undefined;

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  scope: _parchment2.default.Scope.BLOCK,
  whitelist: ['right', 'center', 'justify']
};

var AlignAttribute = new _parchment2.default.Attributor.Attribute('align', 'align', config);
var AlignClass = new _parchment2.default.Attributor.Class('align', 'ql-align', config);
var AlignStyle = new _parchment2.default.Attributor.Style('align', 'text-align', config);

exports.AlignAttribute = AlignAttribute;
exports.AlignClass = AlignClass;
exports.AlignStyle = AlignStyle;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundStyle = exports.BackgroundClass = undefined;

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _color = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BackgroundClass = new _parchment2.default.Attributor.Class('background', 'ql-bg', {
  scope: _parchment2.default.Scope.INLINE
});
var BackgroundStyle = new _color.ColorAttributor('background', 'background-color', {
  scope: _parchment2.default.Scope.INLINE
});

exports.BackgroundClass = BackgroundClass;
exports.BackgroundStyle = BackgroundStyle;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionStyle = exports.DirectionClass = exports.DirectionAttribute = undefined;

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  scope: _parchment2.default.Scope.BLOCK,
  whitelist: ['rtl']
};

var DirectionAttribute = new _parchment2.default.Attributor.Attribute('direction', 'dir', config);
var DirectionClass = new _parchment2.default.Attributor.Class('direction', 'ql-direction', config);
var DirectionStyle = new _parchment2.default.Attributor.Style('direction', 'direction', config);

exports.DirectionAttribute = DirectionAttribute;
exports.DirectionClass = DirectionClass;
exports.DirectionStyle = DirectionStyle;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FontClass = exports.FontStyle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = {
  scope: _parchment2.default.Scope.INLINE,
  whitelist: ['serif', 'monospace']
};

var FontClass = new _parchment2.default.Attributor.Class('font', 'ql-font', config);

var FontStyleAttributor = function (_Parchment$Attributor) {
  _inherits(FontStyleAttributor, _Parchment$Attributor);

  function FontStyleAttributor() {
    _classCallCheck(this, FontStyleAttributor);

    return _possibleConstructorReturn(this, (FontStyleAttributor.__proto__ || Object.getPrototypeOf(FontStyleAttributor)).apply(this, arguments));
  }

  _createClass(FontStyleAttributor, [{
    key: 'value',
    value: function value(node) {
      return _get(FontStyleAttributor.prototype.__proto__ || Object.getPrototypeOf(FontStyleAttributor.prototype), 'value', this).call(this, node).replace(/["']/g, '');
    }
  }]);

  return FontStyleAttributor;
}(_parchment2.default.Attributor.Style);

var FontStyle = new FontStyleAttributor('font', 'font-family', config);

exports.FontStyle = FontStyle;
exports.FontClass = FontClass;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SizeStyle = exports.SizeClass = undefined;

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SizeClass = new _parchment2.default.Attributor.Class('size', 'ql-size', {
  scope: _parchment2.default.Scope.INLINE,
  whitelist: ['small', 'large', 'huge']
});
var SizeStyle = new _parchment2.default.Attributor.Style('size', 'font-size', {
  scope: _parchment2.default.Scope.INLINE,
  whitelist: ['10px', '18px', '32px']
});

exports.SizeClass = SizeClass;
exports.SizeStyle = SizeStyle;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  'align': {
    '': __webpack_require__(76),
    'center': __webpack_require__(77),
    'right': __webpack_require__(78),
    'justify': __webpack_require__(79)
  },
  'background': __webpack_require__(80),
  'blockquote': __webpack_require__(81),
  'bold': __webpack_require__(82),
  'clean': __webpack_require__(83),
  'code': __webpack_require__(58),
  'code-block': __webpack_require__(58),
  'color': __webpack_require__(84),
  'direction': {
    '': __webpack_require__(85),
    'rtl': __webpack_require__(86)
  },
  'float': {
    'center': __webpack_require__(87),
    'full': __webpack_require__(88),
    'left': __webpack_require__(89),
    'right': __webpack_require__(90)
  },
  'formula': __webpack_require__(91),
  'header': {
    '1': __webpack_require__(92),
    '2': __webpack_require__(93)
  },
  'italic': __webpack_require__(94),
  'image': __webpack_require__(95),
  'indent': {
    '+1': __webpack_require__(96),
    '-1': __webpack_require__(97)
  },
  'link': __webpack_require__(98),
  'list': {
    'ordered': __webpack_require__(99),
    'bullet': __webpack_require__(100),
    'check': __webpack_require__(101)
  },
  'script': {
    'sub': __webpack_require__(102),
    'super': __webpack_require__(103)
  },
  'strike': __webpack_require__(104),
  'underline': __webpack_require__(105),
  'video': __webpack_require__(106)
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastChangeIndex = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var History = function (_Module) {
  _inherits(History, _Module);

  function History(quill, options) {
    _classCallCheck(this, History);

    var _this = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this, quill, options));

    _this.lastRecorded = 0;
    _this.ignoreChange = false;
    _this.clear();
    _this.quill.on(_quill2.default.events.EDITOR_CHANGE, function (eventName, delta, oldDelta, source) {
      if (eventName !== _quill2.default.events.TEXT_CHANGE || _this.ignoreChange) return;
      if (!_this.options.userOnly || source === _quill2.default.sources.USER) {
        _this.record(delta, oldDelta);
      } else {
        _this.transform(delta);
      }
    });
    _this.quill.keyboard.addBinding({ key: 'Z', shortKey: true }, _this.undo.bind(_this));
    _this.quill.keyboard.addBinding({ key: 'Z', shortKey: true, shiftKey: true }, _this.redo.bind(_this));
    if (/Win/i.test(navigator.platform)) {
      _this.quill.keyboard.addBinding({ key: 'Y', shortKey: true }, _this.redo.bind(_this));
    }
    return _this;
  }

  _createClass(History, [{
    key: 'change',
    value: function change(source, dest) {
      if (this.stack[source].length === 0) return;
      var delta = this.stack[source].pop();
      this.stack[dest].push(delta);
      this.lastRecorded = 0;
      this.ignoreChange = true;
      this.quill.updateContents(delta[source], _quill2.default.sources.USER);
      this.ignoreChange = false;
      var index = getLastChangeIndex(delta[source]);
      this.quill.setSelection(index);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.stack = { undo: [], redo: [] };
    }
  }, {
    key: 'cutoff',
    value: function cutoff() {
      this.lastRecorded = 0;
    }
  }, {
    key: 'record',
    value: function record(changeDelta, oldDelta) {
      if (changeDelta.ops.length === 0) return;
      this.stack.redo = [];
      var undoDelta = this.quill.getContents().diff(oldDelta);
      var timestamp = Date.now();
      if (this.lastRecorded + this.options.delay > timestamp && this.stack.undo.length > 0) {
        var delta = this.stack.undo.pop();
        undoDelta = undoDelta.compose(delta.undo);
        changeDelta = delta.redo.compose(changeDelta);
      } else {
        this.lastRecorded = timestamp;
      }
      this.stack.undo.push({
        redo: changeDelta,
        undo: undoDelta
      });
      if (this.stack.undo.length > this.options.maxStack) {
        this.stack.undo.shift();
      }
    }
  }, {
    key: 'redo',
    value: function redo() {
      this.change('redo', 'undo');
    }
  }, {
    key: 'transform',
    value: function transform(delta) {
      this.stack.undo.forEach(function (change) {
        change.undo = delta.transform(change.undo, true);
        change.redo = delta.transform(change.redo, true);
      });
      this.stack.redo.forEach(function (change) {
        change.undo = delta.transform(change.undo, true);
        change.redo = delta.transform(change.redo, true);
      });
    }
  }, {
    key: 'undo',
    value: function undo() {
      this.change('undo', 'redo');
    }
  }]);

  return History;
}(_module2.default);

History.DEFAULTS = {
  delay: 1000,
  maxStack: 100,
  userOnly: false
};

function endsWithNewlineChange(delta) {
  var lastOp = delta.ops[delta.ops.length - 1];
  if (lastOp == null) return false;
  if (lastOp.insert != null) {
    return typeof lastOp.insert === 'string' && lastOp.insert.endsWith('\n');
  }
  if (lastOp.attributes != null) {
    return Object.keys(lastOp.attributes).some(function (attr) {
      return _parchment2.default.query(attr, _parchment2.default.Scope.BLOCK) != null;
    });
  }
  return false;
}

function getLastChangeIndex(delta) {
  var deleteLength = delta.reduce(function (length, op) {
    length += op.delete || 0;
    return length;
  }, 0);
  var changeIndex = delta.length() - deleteLength;
  if (endsWithNewlineChange(delta)) {
    changeIndex -= 1;
  }
  return changeIndex;
}

exports.default = History;
exports.getLastChangeIndex = getLastChangeIndex;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BaseTooltip = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _emitter = __webpack_require__(8);

var _emitter2 = _interopRequireDefault(_emitter);

var _keyboard = __webpack_require__(23);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _theme = __webpack_require__(34);

var _theme2 = _interopRequireDefault(_theme);

var _colorPicker = __webpack_require__(59);

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _iconPicker = __webpack_require__(60);

var _iconPicker2 = _interopRequireDefault(_iconPicker);

var _picker = __webpack_require__(28);

var _picker2 = _interopRequireDefault(_picker);

var _tooltip = __webpack_require__(61);

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ALIGNS = [false, 'center', 'right', 'justify'];

var COLORS = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];

var FONTS = [false, 'serif', 'monospace'];

var HEADERS = ['1', '2', '3', false];

var SIZES = ['small', false, 'large', 'huge'];

var BaseTheme = function (_Theme) {
  _inherits(BaseTheme, _Theme);

  function BaseTheme(quill, options) {
    _classCallCheck(this, BaseTheme);

    var _this = _possibleConstructorReturn(this, (BaseTheme.__proto__ || Object.getPrototypeOf(BaseTheme)).call(this, quill, options));

    var listener = function listener(e) {
      if (!document.body.contains(quill.root)) {
        return document.body.removeEventListener('click', listener);
      }
      if (_this.tooltip != null && !_this.tooltip.root.contains(e.target) && document.activeElement !== _this.tooltip.textbox && !_this.quill.hasFocus()) {
        _this.tooltip.hide();
      }
      if (_this.pickers != null) {
        _this.pickers.forEach(function (picker) {
          if (!picker.container.contains(e.target)) {
            picker.close();
          }
        });
      }
    };
    quill.emitter.listenDOM('click', document.body, listener);
    return _this;
  }

  _createClass(BaseTheme, [{
    key: 'addModule',
    value: function addModule(name) {
      var module = _get(BaseTheme.prototype.__proto__ || Object.getPrototypeOf(BaseTheme.prototype), 'addModule', this).call(this, name);
      if (name === 'toolbar') {
        this.extendToolbar(module);
      }
      return module;
    }
  }, {
    key: 'buildButtons',
    value: function buildButtons(buttons, icons) {
      buttons.forEach(function (button) {
        var className = button.getAttribute('class') || '';
        className.split(/\s+/).forEach(function (name) {
          if (!name.startsWith('ql-')) return;
          name = name.slice('ql-'.length);
          if (icons[name] == null) return;
          if (name === 'direction') {
            button.innerHTML = icons[name][''] + icons[name]['rtl'];
          } else if (typeof icons[name] === 'string') {
            button.innerHTML = icons[name];
          } else {
            var value = button.value || '';
            if (value != null && icons[name][value]) {
              button.innerHTML = icons[name][value];
            }
          }
        });
      });
    }
  }, {
    key: 'buildPickers',
    value: function buildPickers(selects, icons) {
      var _this2 = this;

      this.pickers = selects.map(function (select) {
        if (select.classList.contains('ql-align')) {
          if (select.querySelector('option') == null) {
            fillSelect(select, ALIGNS);
          }
          return new _iconPicker2.default(select, icons.align);
        } else if (select.classList.contains('ql-background') || select.classList.contains('ql-color')) {
          var format = select.classList.contains('ql-background') ? 'background' : 'color';
          if (select.querySelector('option') == null) {
            fillSelect(select, COLORS, format === 'background' ? '#ffffff' : '#000000');
          }
          return new _colorPicker2.default(select, icons[format]);
        } else {
          if (select.querySelector('option') == null) {
            if (select.classList.contains('ql-font')) {
              fillSelect(select, FONTS);
            } else if (select.classList.contains('ql-header')) {
              fillSelect(select, HEADERS);
            } else if (select.classList.contains('ql-size')) {
              fillSelect(select, SIZES);
            }
          }
          return new _picker2.default(select);
        }
      });
      var update = function update() {
        _this2.pickers.forEach(function (picker) {
          picker.update();
        });
      };
      this.quill.on(_emitter2.default.events.EDITOR_CHANGE, update);
    }
  }]);

  return BaseTheme;
}(_theme2.default);

BaseTheme.DEFAULTS = (0, _extend2.default)(true, {}, _theme2.default.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula: function formula() {
          this.quill.theme.tooltip.edit('formula');
        },
        image: function image() {
          var _this3 = this;

          var fileInput = this.container.querySelector('input.ql-image[type=file]');
          if (fileInput == null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
            fileInput.classList.add('ql-image');
            fileInput.addEventListener('change', function () {
              if (fileInput.files != null && fileInput.files[0] != null) {
                var reader = new FileReader();
                reader.onload = function (e) {
                  var range = _this3.quill.getSelection(true);
                  _this3.quill.updateContents(new _quillDelta2.default().retain(range.index).delete(range.length).insert({ image: e.target.result }), _emitter2.default.sources.USER);
                  _this3.quill.setSelection(range.index + 1, _emitter2.default.sources.SILENT);
                  fileInput.value = "";
                };
                reader.readAsDataURL(fileInput.files[0]);
              }
            });
            this.container.appendChild(fileInput);
          }
          fileInput.click();
        },
        video: function video() {
          this.quill.theme.tooltip.edit('video');
        }
      }
    }
  }
});

var BaseTooltip = function (_Tooltip) {
  _inherits(BaseTooltip, _Tooltip);

  function BaseTooltip(quill, boundsContainer) {
    _classCallCheck(this, BaseTooltip);

    var _this4 = _possibleConstructorReturn(this, (BaseTooltip.__proto__ || Object.getPrototypeOf(BaseTooltip)).call(this, quill, boundsContainer));

    _this4.textbox = _this4.root.querySelector('input[type="text"]');
    _this4.listen();
    return _this4;
  }

  _createClass(BaseTooltip, [{
    key: 'listen',
    value: function listen() {
      var _this5 = this;

      this.textbox.addEventListener('keydown', function (event) {
        if (_keyboard2.default.match(event, 'enter')) {
          _this5.save();
          event.preventDefault();
        } else if (_keyboard2.default.match(event, 'escape')) {
          _this5.cancel();
          event.preventDefault();
        }
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.hide();
    }
  }, {
    key: 'edit',
    value: function edit() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'link';
      var preview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      this.root.classList.remove('ql-hidden');
      this.root.classList.add('ql-editing');
      if (preview != null) {
        this.textbox.value = preview;
      } else if (mode !== this.root.getAttribute('data-mode')) {
        this.textbox.value = '';
      }
      this.position(this.quill.getBounds(this.quill.selection.savedRange));
      this.textbox.select();
      this.textbox.setAttribute('placeholder', this.textbox.getAttribute('data-' + mode) || '');
      this.root.setAttribute('data-mode', mode);
    }
  }, {
    key: 'restoreFocus',
    value: function restoreFocus() {
      var scrollTop = this.quill.scrollingContainer.scrollTop;
      this.quill.focus();
      this.quill.scrollingContainer.scrollTop = scrollTop;
    }
  }, {
    key: 'save',
    value: function save() {
      var value = this.textbox.value;
      switch (this.root.getAttribute('data-mode')) {
        case 'link':
          {
            var scrollTop = this.quill.root.scrollTop;
            if (this.linkRange) {
              this.quill.formatText(this.linkRange, 'link', value, _emitter2.default.sources.USER);
              delete this.linkRange;
            } else {
              this.restoreFocus();
              this.quill.format('link', value, _emitter2.default.sources.USER);
            }
            this.quill.root.scrollTop = scrollTop;
            break;
          }
        case 'video':
          {
            value = extractVideoUrl(value);
          } // eslint-disable-next-line no-fallthrough
        case 'formula':
          {
            if (!value) break;
            var range = this.quill.getSelection(true);
            if (range != null) {
              var index = range.index + range.length;
              this.quill.insertEmbed(index, this.root.getAttribute('data-mode'), value, _emitter2.default.sources.USER);
              if (this.root.getAttribute('data-mode') === 'formula') {
                this.quill.insertText(index + 1, ' ', _emitter2.default.sources.USER);
              }
              this.quill.setSelection(index + 2, _emitter2.default.sources.USER);
            }
            break;
          }
        default:
      }
      this.textbox.value = '';
      this.hide();
    }
  }]);

  return BaseTooltip;
}(_tooltip2.default);

function extractVideoUrl(url) {
  var match = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return (match[1] || 'https') + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
  }
  if (match = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {
    // eslint-disable-line no-cond-assign
    return (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/';
  }
  return url;
}

function fillSelect(select, values) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  values.forEach(function (value) {
    var option = document.createElement('option');
    if (value === defaultValue) {
      option.setAttribute('selected', 'selected');
    } else {
      option.setAttribute('value', value);
    }
    select.appendChild(option);
  });
}

exports.BaseTooltip = BaseTooltip;
exports.default = BaseTheme;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = this.tail = null;
        this.length = 0;
    }
    LinkedList.prototype.append = function () {
        var nodes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nodes[_i] = arguments[_i];
        }
        this.insertBefore(nodes[0], null);
        if (nodes.length > 1) {
            this.append.apply(this, nodes.slice(1));
        }
    };
    LinkedList.prototype.contains = function (node) {
        var cur, next = this.iterator();
        while ((cur = next())) {
            if (cur === node)
                return true;
        }
        return false;
    };
    LinkedList.prototype.insertBefore = function (node, refNode) {
        if (!node)
            return;
        node.next = refNode;
        if (refNode != null) {
            node.prev = refNode.prev;
            if (refNode.prev != null) {
                refNode.prev.next = node;
            }
            refNode.prev = node;
            if (refNode === this.head) {
                this.head = node;
            }
        }
        else if (this.tail != null) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        else {
            node.prev = null;
            this.head = this.tail = node;
        }
        this.length += 1;
    };
    LinkedList.prototype.offset = function (target) {
        var index = 0, cur = this.head;
        while (cur != null) {
            if (cur === target)
                return index;
            index += cur.length();
            cur = cur.next;
        }
        return -1;
    };
    LinkedList.prototype.remove = function (node) {
        if (!this.contains(node))
            return;
        if (node.prev != null)
            node.prev.next = node.next;
        if (node.next != null)
            node.next.prev = node.prev;
        if (node === this.head)
            this.head = node.next;
        if (node === this.tail)
            this.tail = node.prev;
        this.length -= 1;
    };
    LinkedList.prototype.iterator = function (curNode) {
        if (curNode === void 0) { curNode = this.head; }
        // TODO use yield when we can
        return function () {
            var ret = curNode;
            if (curNode != null)
                curNode = curNode.next;
            return ret;
        };
    };
    LinkedList.prototype.find = function (index, inclusive) {
        if (inclusive === void 0) { inclusive = false; }
        var cur, next = this.iterator();
        while ((cur = next())) {
            var length = cur.length();
            if (index < length ||
                (inclusive && index === length && (cur.next == null || cur.next.length() !== 0))) {
                return [cur, index];
            }
            index -= length;
        }
        return [null, 0];
    };
    LinkedList.prototype.forEach = function (callback) {
        var cur, next = this.iterator();
        while ((cur = next())) {
            callback(cur);
        }
    };
    LinkedList.prototype.forEachAt = function (index, length, callback) {
        if (length <= 0)
            return;
        var _a = this.find(index), startNode = _a[0], offset = _a[1];
        var cur, curIndex = index - offset, next = this.iterator(startNode);
        while ((cur = next()) && curIndex < index + length) {
            var curLength = cur.length();
            if (index > curIndex) {
                callback(cur, index - curIndex, Math.min(length, curIndex + curLength - index));
            }
            else {
                callback(cur, 0, Math.min(curLength, index + length - curIndex));
            }
            curIndex += curLength;
        }
    };
    LinkedList.prototype.map = function (callback) {
        return this.reduce(function (memo, cur) {
            memo.push(callback(cur));
            return memo;
        }, []);
    };
    LinkedList.prototype.reduce = function (callback, memo) {
        var cur, next = this.iterator();
        while ((cur = next())) {
            memo = callback(memo, cur);
        }
        return memo;
    };
    return LinkedList;
}());
exports.default = LinkedList;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(17);
var Registry = __webpack_require__(1);
var OBSERVER_CONFIG = {
    attributes: true,
    characterData: true,
    characterDataOldValue: true,
    childList: true,
    subtree: true,
};
var MAX_OPTIMIZE_ITERATIONS = 100;
var ScrollBlot = /** @class */ (function (_super) {
    __extends(ScrollBlot, _super);
    function ScrollBlot(node) {
        var _this = _super.call(this, node) || this;
        _this.scroll = _this;
        _this.observer = new MutationObserver(function (mutations) {
            _this.update(mutations);
        });
        _this.observer.observe(_this.domNode, OBSERVER_CONFIG);
        _this.attach();
        return _this;
    }
    ScrollBlot.prototype.detach = function () {
        _super.prototype.detach.call(this);
        this.observer.disconnect();
    };
    ScrollBlot.prototype.deleteAt = function (index, length) {
        this.update();
        if (index === 0 && length === this.length()) {
            this.children.forEach(function (child) {
                child.remove();
            });
        }
        else {
            _super.prototype.deleteAt.call(this, index, length);
        }
    };
    ScrollBlot.prototype.formatAt = function (index, length, name, value) {
        this.update();
        _super.prototype.formatAt.call(this, index, length, name, value);
    };
    ScrollBlot.prototype.insertAt = function (index, value, def) {
        this.update();
        _super.prototype.insertAt.call(this, index, value, def);
    };
    ScrollBlot.prototype.optimize = function (mutations, context) {
        var _this = this;
        if (mutations === void 0) { mutations = []; }
        if (context === void 0) { context = {}; }
        _super.prototype.optimize.call(this, context);
        // We must modify mutations directly, cannot make copy and then modify
        var records = [].slice.call(this.observer.takeRecords());
        // Array.push currently seems to be implemented by a non-tail recursive function
        // so we cannot just mutations.push.apply(mutations, this.observer.takeRecords());
        while (records.length > 0)
            mutations.push(records.pop());
        // TODO use WeakMap
        var mark = function (blot, markParent) {
            if (markParent === void 0) { markParent = true; }
            if (blot == null || blot === _this)
                return;
            if (blot.domNode.parentNode == null)
                return;
            // @ts-ignore
            if (blot.domNode[Registry.DATA_KEY].mutations == null) {
                // @ts-ignore
                blot.domNode[Registry.DATA_KEY].mutations = [];
            }
            if (markParent)
                mark(blot.parent);
        };
        var optimize = function (blot) {
            // Post-order traversal
            if (
            // @ts-ignore
            blot.domNode[Registry.DATA_KEY] == null ||
                // @ts-ignore
                blot.domNode[Registry.DATA_KEY].mutations == null) {
                return;
            }
            if (blot instanceof container_1.default) {
                blot.children.forEach(optimize);
            }
            blot.optimize(context);
        };
        var remaining = mutations;
        for (var i = 0; remaining.length > 0; i += 1) {
            if (i >= MAX_OPTIMIZE_ITERATIONS) {
                throw new Error('[Parchment] Maximum optimize iterations reached');
            }
            remaining.forEach(function (mutation) {
                var blot = Registry.find(mutation.target, true);
                if (blot == null)
                    return;
                if (blot.domNode === mutation.target) {
                    if (mutation.type === 'childList') {
                        mark(Registry.find(mutation.previousSibling, false));
                        [].forEach.call(mutation.addedNodes, function (node) {
                            var child = Registry.find(node, false);
                            mark(child, false);
                            if (child instanceof container_1.default) {
                                child.children.forEach(function (grandChild) {
                                    mark(grandChild, false);
                                });
                            }
                        });
                    }
                    else if (mutation.type === 'attributes') {
                        mark(blot.prev);
                    }
                }
                mark(blot);
            });
            this.children.forEach(optimize);
            remaining = [].slice.call(this.observer.takeRecords());
            records = remaining.slice();
            while (records.length > 0)
                mutations.push(records.pop());
        }
    };
    ScrollBlot.prototype.update = function (mutations, context) {
        var _this = this;
        if (context === void 0) { context = {}; }
        mutations = mutations || this.observer.takeRecords();
        // TODO use WeakMap
        mutations
            .map(function (mutation) {
            var blot = Registry.find(mutation.target, true);
            if (blot == null)
                return null;
            // @ts-ignore
            if (blot.domNode[Registry.DATA_KEY].mutations == null) {
                // @ts-ignore
                blot.domNode[Registry.DATA_KEY].mutations = [mutation];
                return blot;
            }
            else {
                // @ts-ignore
                blot.domNode[Registry.DATA_KEY].mutations.push(mutation);
                return null;
            }
        })
            .forEach(function (blot) {
            if (blot == null ||
                blot === _this ||
                //@ts-ignore
                blot.domNode[Registry.DATA_KEY] == null)
                return;
            // @ts-ignore
            blot.update(blot.domNode[Registry.DATA_KEY].mutations || [], context);
        });
        // @ts-ignore
        if (this.domNode[Registry.DATA_KEY].mutations != null) {
            // @ts-ignore
            _super.prototype.update.call(this, this.domNode[Registry.DATA_KEY].mutations, context);
        }
        this.optimize(mutations, context);
    };
    ScrollBlot.blotName = 'scroll';
    ScrollBlot.defaultChild = 'block';
    ScrollBlot.scope = Registry.Scope.BLOCK_BLOT;
    ScrollBlot.tagName = 'DIV';
    return ScrollBlot;
}(container_1.default));
exports.default = ScrollBlot;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var format_1 = __webpack_require__(18);
var Registry = __webpack_require__(1);
// Shallow object comparison
function isEqual(obj1, obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length)
        return false;
    // @ts-ignore
    for (var prop in obj1) {
        // @ts-ignore
        if (obj1[prop] !== obj2[prop])
            return false;
    }
    return true;
}
var InlineBlot = /** @class */ (function (_super) {
    __extends(InlineBlot, _super);
    function InlineBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InlineBlot.formats = function (domNode) {
        if (domNode.tagName === InlineBlot.tagName)
            return undefined;
        return _super.formats.call(this, domNode);
    };
    InlineBlot.prototype.format = function (name, value) {
        var _this = this;
        if (name === this.statics.blotName && !value) {
            this.children.forEach(function (child) {
                if (!(child instanceof format_1.default)) {
                    child = child.wrap(InlineBlot.blotName, true);
                }
                _this.attributes.copy(child);
            });
            this.unwrap();
        }
        else {
            _super.prototype.format.call(this, name, value);
        }
    };
    InlineBlot.prototype.formatAt = function (index, length, name, value) {
        if (this.formats()[name] != null || Registry.query(name, Registry.Scope.ATTRIBUTE)) {
            var blot = this.isolate(index, length);
            blot.format(name, value);
        }
        else {
            _super.prototype.formatAt.call(this, index, length, name, value);
        }
    };
    InlineBlot.prototype.optimize = function (context) {
        _super.prototype.optimize.call(this, context);
        var formats = this.formats();
        if (Object.keys(formats).length === 0) {
            return this.unwrap(); // unformatted span
        }
        var next = this.next;
        if (next instanceof InlineBlot && next.prev === this && isEqual(formats, next.formats())) {
            next.moveChildren(this);
            next.remove();
        }
    };
    InlineBlot.blotName = 'inline';
    InlineBlot.scope = Registry.Scope.INLINE_BLOT;
    InlineBlot.tagName = 'SPAN';
    return InlineBlot;
}(format_1.default));
exports.default = InlineBlot;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var format_1 = __webpack_require__(18);
var Registry = __webpack_require__(1);
var BlockBlot = /** @class */ (function (_super) {
    __extends(BlockBlot, _super);
    function BlockBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlockBlot.formats = function (domNode) {
        var tagName = Registry.query(BlockBlot.blotName).tagName;
        if (domNode.tagName === tagName)
            return undefined;
        return _super.formats.call(this, domNode);
    };
    BlockBlot.prototype.format = function (name, value) {
        if (Registry.query(name, Registry.Scope.BLOCK) == null) {
            return;
        }
        else if (name === this.statics.blotName && !value) {
            this.replaceWith(BlockBlot.blotName);
        }
        else {
            _super.prototype.format.call(this, name, value);
        }
    };
    BlockBlot.prototype.formatAt = function (index, length, name, value) {
        if (Registry.query(name, Registry.Scope.BLOCK) != null) {
            this.format(name, value);
        }
        else {
            _super.prototype.formatAt.call(this, index, length, name, value);
        }
    };
    BlockBlot.prototype.insertAt = function (index, value, def) {
        if (def == null || Registry.query(value, Registry.Scope.INLINE) != null) {
            // Insert text or inline
            _super.prototype.insertAt.call(this, index, value, def);
        }
        else {
            var after = this.split(index);
            var blot = Registry.create(value, def);
            after.parent.insertBefore(blot, after);
        }
    };
    BlockBlot.prototype.update = function (mutations, context) {
        if (navigator.userAgent.match(/Trident/)) {
            this.build();
        }
        else {
            _super.prototype.update.call(this, mutations, context);
        }
    };
    BlockBlot.blotName = 'block';
    BlockBlot.scope = Registry.Scope.BLOCK_BLOT;
    BlockBlot.tagName = 'P';
    return BlockBlot;
}(format_1.default));
exports.default = BlockBlot;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var leaf_1 = __webpack_require__(19);
var EmbedBlot = /** @class */ (function (_super) {
    __extends(EmbedBlot, _super);
    function EmbedBlot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmbedBlot.formats = function (domNode) {
        return undefined;
    };
    EmbedBlot.prototype.format = function (name, value) {
        // super.formatAt wraps, which is what we want in general,
        // but this allows subclasses to overwrite for formats
        // that just apply to particular embeds
        _super.prototype.formatAt.call(this, 0, this.length(), name, value);
    };
    EmbedBlot.prototype.formatAt = function (index, length, name, value) {
        if (index === 0 && length === this.length()) {
            this.format(name, value);
        }
        else {
            _super.prototype.formatAt.call(this, index, length, name, value);
        }
    };
    EmbedBlot.prototype.formats = function () {
        return this.statics.formats(this.domNode);
    };
    return EmbedBlot;
}(leaf_1.default));
exports.default = EmbedBlot;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var leaf_1 = __webpack_require__(19);
var Registry = __webpack_require__(1);
var TextBlot = /** @class */ (function (_super) {
    __extends(TextBlot, _super);
    function TextBlot(node) {
        var _this = _super.call(this, node) || this;
        _this.text = _this.statics.value(_this.domNode);
        return _this;
    }
    TextBlot.create = function (value) {
        return document.createTextNode(value);
    };
    TextBlot.value = function (domNode) {
        var text = domNode.data;
        // @ts-ignore
        if (text['normalize'])
            text = text['normalize']();
        return text;
    };
    TextBlot.prototype.deleteAt = function (index, length) {
        this.domNode.data = this.text = this.text.slice(0, index) + this.text.slice(index + length);
    };
    TextBlot.prototype.index = function (node, offset) {
        if (this.domNode === node) {
            return offset;
        }
        return -1;
    };
    TextBlot.prototype.insertAt = function (index, value, def) {
        if (def == null) {
            this.text = this.text.slice(0, index) + value + this.text.slice(index);
            this.domNode.data = this.text;
        }
        else {
            _super.prototype.insertAt.call(this, index, value, def);
        }
    };
    TextBlot.prototype.length = function () {
        return this.text.length;
    };
    TextBlot.prototype.optimize = function (context) {
        _super.prototype.optimize.call(this, context);
        this.text = this.statics.value(this.domNode);
        if (this.text.length === 0) {
            this.remove();
        }
        else if (this.next instanceof TextBlot && this.next.prev === this) {
            this.insertAt(this.length(), this.next.value());
            this.next.remove();
        }
    };
    TextBlot.prototype.position = function (index, inclusive) {
        if (inclusive === void 0) { inclusive = false; }
        return [this.domNode, index];
    };
    TextBlot.prototype.split = function (index, force) {
        if (force === void 0) { force = false; }
        if (!force) {
            if (index === 0)
                return this;
            if (index === this.length())
                return this.next;
        }
        var after = Registry.create(this.domNode.splitText(index));
        this.parent.insertBefore(after, this.next);
        this.text = this.statics.value(this.domNode);
        return after;
    };
    TextBlot.prototype.update = function (mutations, context) {
        var _this = this;
        if (mutations.some(function (mutation) {
            return mutation.type === 'characterData' && mutation.target === _this.domNode;
        })) {
            this.text = this.statics.value(this.domNode);
        }
    };
    TextBlot.prototype.value = function () {
        return this.text;
    };
    TextBlot.blotName = 'text';
    TextBlot.scope = Registry.Scope.INLINE_BLOT;
    return TextBlot;
}(leaf_1.default));
exports.default = TextBlot;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var elem = document.createElement('div');
elem.classList.toggle('test-class', false);
if (elem.classList.contains('test-class')) {
  var _toggle = DOMTokenList.prototype.toggle;
  DOMTokenList.prototype.toggle = function (token, force) {
    if (arguments.length > 1 && !this.contains(token) === !force) {
      return force;
    } else {
      return _toggle.call(this, token);
    }
  };
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (searchString, position) {
    var subjectString = this.toString();
    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  };
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, "find", {
    value: function value(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Disable resizing in Firefox
  document.execCommand("enableObjectResizing", false, false);
  // Disable automatic linkifying in IE11
  document.execCommand("autoUrlDetect", false, false);
});

/***/ }),
/* 51 */
/***/ (function(module, exports) {

/**
 * This library modifies the diff-patch-match library by Neil Fraser
 * by removing the patch and match functionality and certain advanced
 * options in the diff function. The original license is as follows:
 *
 * ===
 *
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;


/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {Int} cursor_pos Expected edit position in text1 (optional)
 * @return {Array} Array of diff tuples.
 */
function diff_main(text1, text2, cursor_pos) {
  // Check for equality (speedup).
  if (text1 == text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  // Check cursor_pos within bounds
  if (cursor_pos < 0 || text1.length < cursor_pos) {
    cursor_pos = null;
  }

  // Trim off common prefix (speedup).
  var commonlength = diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = diff_compute_(text1, text2);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  diff_cleanupMerge(diffs);
  if (cursor_pos != null) {
    diffs = fix_cursor(diffs, cursor_pos);
  }
  diffs = fix_emoji(diffs);
  return diffs;
};


/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 */
function diff_compute_(text1, text2) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i != -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [[DIFF_INSERT, longtext.substring(0, i)],
             [DIFF_EQUAL, shorttext],
             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length == 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }

  // Check to see if the problem can be split in two.
  var hm = diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = diff_main(text1_a, text2_a);
    var diffs_b = diff_main(text1_b, text2_b);
    // Merge the results.
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  return diff_bisect_(text1, text2);
};


/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 * @private
 */
function diff_bisect_(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = (delta % 2 != 0);
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length &&
             text1.charAt(x1) == text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (x2 < text1_length && y2 < text2_length &&
             text1.charAt(text1_length - x2 - 1) ==
             text2.charAt(text2_length - y2 - 1)) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};


/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @return {Array} Array of diff tuples.
 */
function diff_bisectSplit_(text1, text2, x, y) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = diff_main(text1a, text2a);
  var diffsb = diff_main(text1b, text2b);

  return diffs.concat(diffsb);
};


/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
function diff_commonPrefix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) ==
        text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
function diff_commonSuffix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 ||
      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 */
function diff_halfMatch_(text1, text2) {
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;  // Pointless.
  }

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
      var prefixLength = diff_commonPrefix(longtext.substring(i),
                                           shorttext.substring(j));
      var suffixLength = diff_commonSuffix(longtext.substring(0, i),
                                           shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(j - suffixLength, j) +
            shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [best_longtext_a, best_longtext_b,
              best_shorttext_a, best_shorttext_b, best_common];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {Array} diffs Array of diff tuples.
 */
function diff_cleanupMerge(diffs) {
  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            // Factor out any common prefixies.
            commonlength = diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if ((pointer - count_delete - count_insert) > 0 &&
                  diffs[pointer - count_delete - count_insert - 1][0] ==
                  DIFF_EQUAL) {
                diffs[pointer - count_delete - count_insert - 1][1] +=
                    text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL,
                                    text_insert.substring(0, commonlength)]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixies.
            commonlength = diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length -
                  commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length -
                  commonlength);
              text_delete = text_delete.substring(0, text_delete.length -
                  commonlength);
            }
          }
          // Delete the offending records and add the merged ones.
          if (count_delete === 0) {
            diffs.splice(pointer - count_insert,
                count_delete + count_insert, [DIFF_INSERT, text_insert]);
          } else if (count_insert === 0) {
            diffs.splice(pointer - count_delete,
                count_delete + count_insert, [DIFF_DELETE, text_delete]);
          } else {
            diffs.splice(pointer - count_delete - count_insert,
                count_delete + count_insert, [DIFF_DELETE, text_delete],
                [DIFF_INSERT, text_insert]);
          }
          pointer = pointer - count_delete - count_insert +
                    (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
            diffs[pointer][1].substring(0, diffs[pointer][1].length -
                                        diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
          diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
            diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    diff_cleanupMerge(diffs);
  }
};


var diff = diff_main;
diff.INSERT = DIFF_INSERT;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = DIFF_EQUAL;

module.exports = diff;

/*
 * Modify a diff such that the cursor position points to the start of a change:
 * E.g.
 *   cursor_normalize_diff([[DIFF_EQUAL, 'abc']], 1)
 *     => [1, [[DIFF_EQUAL, 'a'], [DIFF_EQUAL, 'bc']]]
 *   cursor_normalize_diff([[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xyz']], 2)
 *     => [2, [[DIFF_INSERT, 'new'], [DIFF_DELETE, 'xy'], [DIFF_DELETE, 'z']]]
 *
 * @param {Array} diffs Array of diff tuples
 * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
 * @return {Array} A tuple [cursor location in the modified diff, modified diff]
 */
function cursor_normalize_diff (diffs, cursor_pos) {
  if (cursor_pos === 0) {
    return [DIFF_EQUAL, diffs];
  }
  for (var current_pos = 0, i = 0; i < diffs.length; i++) {
    var d = diffs[i];
    if (d[0] === DIFF_DELETE || d[0] === DIFF_EQUAL) {
      var next_pos = current_pos + d[1].length;
      if (cursor_pos === next_pos) {
        return [i + 1, diffs];
      } else if (cursor_pos < next_pos) {
        // copy to prevent side effects
        diffs = diffs.slice();
        // split d into two diff changes
        var split_pos = cursor_pos - current_pos;
        var d_left = [d[0], d[1].slice(0, split_pos)];
        var d_right = [d[0], d[1].slice(split_pos)];
        diffs.splice(i, 1, d_left, d_right);
        return [i + 1, diffs];
      } else {
        current_pos = next_pos;
      }
    }
  }
  throw new Error('cursor_pos is out of bounds!')
}

/*
 * Modify a diff such that the edit position is "shifted" to the proposed edit location (cursor_position).
 *
 * Case 1)
 *   Check if a naive shift is possible:
 *     [0, X], [ 1, Y] -> [ 1, Y], [0, X]    (if X + Y === Y + X)
 *     [0, X], [-1, Y] -> [-1, Y], [0, X]    (if X + Y === Y + X) - holds same result
 * Case 2)
 *   Check if the following shifts are possible:
 *     [0, 'pre'], [ 1, 'prefix'] -> [ 1, 'pre'], [0, 'pre'], [ 1, 'fix']
 *     [0, 'pre'], [-1, 'prefix'] -> [-1, 'pre'], [0, 'pre'], [-1, 'fix']
 *         ^            ^
 *         d          d_next
 *
 * @param {Array} diffs Array of diff tuples
 * @param {Int} cursor_pos Suggested edit position. Must not be out of bounds!
 * @return {Array} Array of diff tuples
 */
function fix_cursor (diffs, cursor_pos) {
  var norm = cursor_normalize_diff(diffs, cursor_pos);
  var ndiffs = norm[1];
  var cursor_pointer = norm[0];
  var d = ndiffs[cursor_pointer];
  var d_next = ndiffs[cursor_pointer + 1];

  if (d == null) {
    // Text was deleted from end of original string,
    // cursor is now out of bounds in new string
    return diffs;
  } else if (d[0] !== DIFF_EQUAL) {
    // A modification happened at the cursor location.
    // This is the expected outcome, so we can return the original diff.
    return diffs;
  } else {
    if (d_next != null && d[1] + d_next[1] === d_next[1] + d[1]) {
      // Case 1)
      // It is possible to perform a naive shift
      ndiffs.splice(cursor_pointer, 2, d_next, d)
      return merge_tuples(ndiffs, cursor_pointer, 2)
    } else if (d_next != null && d_next[1].indexOf(d[1]) === 0) {
      // Case 2)
      // d[1] is a prefix of d_next[1]
      // We can assume that d_next[0] !== 0, since d[0] === 0
      // Shift edit locations..
      ndiffs.splice(cursor_pointer, 2, [d_next[0], d[1]], [0, d[1]]);
      var suffix = d_next[1].slice(d[1].length);
      if (suffix.length > 0) {
        ndiffs.splice(cursor_pointer + 2, 0, [d_next[0], suffix]);
      }
      return merge_tuples(ndiffs, cursor_pointer, 3)
    } else {
      // Not possible to perform any modification
      return diffs;
    }
  }
}

/*
 * Check diff did not split surrogate pairs.
 * Ex. [0, '\uD83D'], [-1, '\uDC36'], [1, '\uDC2F'] -> [-1, '\uD83D\uDC36'], [1, '\uD83D\uDC2F']
 *     '\uD83D\uDC36' === '🐶', '\uD83D\uDC2F' === '🐯'
 *
 * @param {Array} diffs Array of diff tuples
 * @return {Array} Array of diff tuples
 */
function fix_emoji (diffs) {
  var compact = false;
  var starts_with_pair_end = function(str) {
    return str.charCodeAt(0) >= 0xDC00 && str.charCodeAt(0) <= 0xDFFF;
  }
  var ends_with_pair_start = function(str) {
    return str.charCodeAt(str.length-1) >= 0xD800 && str.charCodeAt(str.length-1) <= 0xDBFF;
  }
  for (var i = 2; i < diffs.length; i += 1) {
    if (diffs[i-2][0] === DIFF_EQUAL && ends_with_pair_start(diffs[i-2][1]) &&
        diffs[i-1][0] === DIFF_DELETE && starts_with_pair_end(diffs[i-1][1]) &&
        diffs[i][0] === DIFF_INSERT && starts_with_pair_end(diffs[i][1])) {
      compact = true;

      diffs[i-1][1] = diffs[i-2][1].slice(-1) + diffs[i-1][1];
      diffs[i][1] = diffs[i-2][1].slice(-1) + diffs[i][1];

      diffs[i-2][1] = diffs[i-2][1].slice(0, -1);
    }
  }
  if (!compact) {
    return diffs;
  }
  var fixed_diffs = [];
  for (var i = 0; i < diffs.length; i += 1) {
    if (diffs[i][1].length > 0) {
      fixed_diffs.push(diffs[i]);
    }
  }
  return fixed_diffs;
}

/*
 * Try to merge tuples with their neigbors in a given range.
 * E.g. [0, 'a'], [0, 'b'] -> [0, 'ab']
 *
 * @param {Array} diffs Array of diff tuples.
 * @param {Int} start Position of the first element to merge (diffs[start] is also merged with diffs[start - 1]).
 * @param {Int} length Number of consecutive elements to check.
 * @return {Array} Array of merged diff tuples.
 */
function merge_tuples (diffs, start, length) {
  // Check from (start-1) to (start+length).
  for (var i = start + length - 1; i >= 0 && i >= start - 1; i--) {
    if (i + 1 < diffs.length) {
      var left_d = diffs[i];
      var right_d = diffs[i+1];
      if (left_d[0] === right_d[1]) {
        diffs.splice(i, 2, [left_d[0], left_d[1] + right_d[1]]);
      }
    }
  }
  return diffs;
}


/***/ }),
/* 52 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 53 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

'use strict';

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @api private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {Mixed} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Boolean} exists Only check if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn The listener function.
 * @param {Mixed} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events[evt]) this._events[evt] = listener, this._eventsCount++;
  else if (!this._events[evt].fn) this._events[evt].push(listener);
  else this._events[evt] = [this._events[evt], listener];

  return this;
};

/**
 * Remove the listeners of a given event.
 *
 * @param {String|Symbol} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {Mixed} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
         listeners.fn === fn
      && (!once || listeners.once)
      && (!context || listeners.context === context)
    ) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
           listeners[i].fn !== fn
        || (once && !listeners[i].once)
        || (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else if (--this._eventsCount === 0) this._events = new Events();
    else delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {String|Symbol} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) {
      if (--this._eventsCount === 0) this._events = new Events();
      else delete this._events[evt];
    }
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchText = exports.matchSpacing = exports.matchNewline = exports.matchBlot = exports.matchAttributor = exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extend2 = __webpack_require__(3);

var _extend3 = _interopRequireDefault(_extend2);

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _logger = __webpack_require__(10);

var _logger2 = _interopRequireDefault(_logger);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

var _align = __webpack_require__(36);

var _background = __webpack_require__(37);

var _code = __webpack_require__(13);

var _code2 = _interopRequireDefault(_code);

var _color = __webpack_require__(26);

var _direction = __webpack_require__(38);

var _font = __webpack_require__(39);

var _size = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = (0, _logger2.default)('quill:clipboard');

var DOM_KEY = '__ql-matcher';

var CLIPBOARD_CONFIG = [[Node.TEXT_NODE, matchText], [Node.TEXT_NODE, matchNewline], ['br', matchBreak], [Node.ELEMENT_NODE, matchNewline], [Node.ELEMENT_NODE, matchBlot], [Node.ELEMENT_NODE, matchSpacing], [Node.ELEMENT_NODE, matchAttributor], [Node.ELEMENT_NODE, matchStyles], ['li', matchIndent], ['b', matchAlias.bind(matchAlias, 'bold')], ['i', matchAlias.bind(matchAlias, 'italic')], ['style', matchIgnore]];

var ATTRIBUTE_ATTRIBUTORS = [_align.AlignAttribute, _direction.DirectionAttribute].reduce(function (memo, attr) {
  memo[attr.keyName] = attr;
  return memo;
}, {});

var STYLE_ATTRIBUTORS = [_align.AlignStyle, _background.BackgroundStyle, _color.ColorStyle, _direction.DirectionStyle, _font.FontStyle, _size.SizeStyle].reduce(function (memo, attr) {
  memo[attr.keyName] = attr;
  return memo;
}, {});

var Clipboard = function (_Module) {
  _inherits(Clipboard, _Module);

  function Clipboard(quill, options) {
    _classCallCheck(this, Clipboard);

    var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this, quill, options));

    _this.quill.root.addEventListener('paste', _this.onPaste.bind(_this));
    _this.container = _this.quill.addContainer('ql-clipboard');
    _this.container.setAttribute('contenteditable', true);
    _this.container.setAttribute('tabindex', -1);
    _this.matchers = [];
    CLIPBOARD_CONFIG.concat(_this.options.matchers).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          selector = _ref2[0],
          matcher = _ref2[1];

      if (!options.matchVisual && matcher === matchSpacing) return;
      _this.addMatcher(selector, matcher);
    });
    return _this;
  }

  _createClass(Clipboard, [{
    key: 'addMatcher',
    value: function addMatcher(selector, matcher) {
      this.matchers.push([selector, matcher]);
    }
  }, {
    key: 'convert',
    value: function convert(html) {
      if (typeof html === 'string') {
        this.container.innerHTML = html.replace(/\>\r?\n +\</g, '><'); // Remove spaces between tags
        return this.convert();
      }
      var formats = this.quill.getFormat(this.quill.selection.savedRange.index);
      if (formats[_code2.default.blotName]) {
        var text = this.container.innerText;
        this.container.innerHTML = '';
        return new _quillDelta2.default().insert(text, _defineProperty({}, _code2.default.blotName, formats[_code2.default.blotName]));
      }

      var _prepareMatching = this.prepareMatching(),
          _prepareMatching2 = _slicedToArray(_prepareMatching, 2),
          elementMatchers = _prepareMatching2[0],
          textMatchers = _prepareMatching2[1];

      var delta = traverse(this.container, elementMatchers, textMatchers);
      // Remove trailing newline
      if (deltaEndsWith(delta, '\n') && delta.ops[delta.ops.length - 1].attributes == null) {
        delta = delta.compose(new _quillDelta2.default().retain(delta.length() - 1).delete(1));
      }
      debug.log('convert', this.container.innerHTML, delta);
      this.container.innerHTML = '';
      return delta;
    }
  }, {
    key: 'dangerouslyPasteHTML',
    value: function dangerouslyPasteHTML(index, html) {
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _quill2.default.sources.API;

      if (typeof index === 'string') {
        this.quill.setContents(this.convert(index), html);
        this.quill.setSelection(0, _quill2.default.sources.SILENT);
      } else {
        var paste = this.convert(html);
        this.quill.updateContents(new _quillDelta2.default().retain(index).concat(paste), source);
        this.quill.setSelection(index + paste.length(), _quill2.default.sources.SILENT);
      }
    }
  }, {
    key: 'onPaste',
    value: function onPaste(e) {
      var _this2 = this;

      if (e.defaultPrevented || !this.quill.isEnabled()) return;
      var range = this.quill.getSelection();
      var delta = new _quillDelta2.default().retain(range.index);
      var scrollTop = this.quill.scrollingContainer.scrollTop;
      this.container.focus();
      this.quill.selection.update(_quill2.default.sources.SILENT);
      setTimeout(function () {
        delta = delta.concat(_this2.convert()).delete(range.length);
        _this2.quill.updateContents(delta, _quill2.default.sources.USER);
        // range.length contributes to delta.length()
        _this2.quill.setSelection(delta.length() - range.length, _quill2.default.sources.SILENT);
        _this2.quill.scrollingContainer.scrollTop = scrollTop;
        _this2.quill.focus();
      }, 1);
    }
  }, {
    key: 'prepareMatching',
    value: function prepareMatching() {
      var _this3 = this;

      var elementMatchers = [],
          textMatchers = [];
      this.matchers.forEach(function (pair) {
        var _pair = _slicedToArray(pair, 2),
            selector = _pair[0],
            matcher = _pair[1];

        switch (selector) {
          case Node.TEXT_NODE:
            textMatchers.push(matcher);
            break;
          case Node.ELEMENT_NODE:
            elementMatchers.push(matcher);
            break;
          default:
            [].forEach.call(_this3.container.querySelectorAll(selector), function (node) {
              // TODO use weakmap
              node[DOM_KEY] = node[DOM_KEY] || [];
              node[DOM_KEY].push(matcher);
            });
            break;
        }
      });
      return [elementMatchers, textMatchers];
    }
  }]);

  return Clipboard;
}(_module2.default);

Clipboard.DEFAULTS = {
  matchers: [],
  matchVisual: true
};

function applyFormat(delta, format, value) {
  if ((typeof format === 'undefined' ? 'undefined' : _typeof(format)) === 'object') {
    return Object.keys(format).reduce(function (delta, key) {
      return applyFormat(delta, key, format[key]);
    }, delta);
  } else {
    return delta.reduce(function (delta, op) {
      if (op.attributes && op.attributes[format]) {
        return delta.push(op);
      } else {
        return delta.insert(op.insert, (0, _extend3.default)({}, _defineProperty({}, format, value), op.attributes));
      }
    }, new _quillDelta2.default());
  }
}

function computeStyle(node) {
  if (node.nodeType !== Node.ELEMENT_NODE) return {};
  var DOM_KEY = '__ql-computed-style';
  return node[DOM_KEY] || (node[DOM_KEY] = window.getComputedStyle(node));
}

function deltaEndsWith(delta, text) {
  var endText = "";
  for (var i = delta.ops.length - 1; i >= 0 && endText.length < text.length; --i) {
    var op = delta.ops[i];
    if (typeof op.insert !== 'string') break;
    endText = op.insert + endText;
  }
  return endText.slice(-1 * text.length) === text;
}

function isLine(node) {
  if (node.childNodes.length === 0) return false; // Exclude embed blocks
  var style = computeStyle(node);
  return ['block', 'list-item'].indexOf(style.display) > -1;
}

function traverse(node, elementMatchers, textMatchers) {
  // Post-order
  if (node.nodeType === node.TEXT_NODE) {
    return textMatchers.reduce(function (delta, matcher) {
      return matcher(node, delta);
    }, new _quillDelta2.default());
  } else if (node.nodeType === node.ELEMENT_NODE) {
    return [].reduce.call(node.childNodes || [], function (delta, childNode) {
      var childrenDelta = traverse(childNode, elementMatchers, textMatchers);
      if (childNode.nodeType === node.ELEMENT_NODE) {
        childrenDelta = elementMatchers.reduce(function (childrenDelta, matcher) {
          return matcher(childNode, childrenDelta);
        }, childrenDelta);
        childrenDelta = (childNode[DOM_KEY] || []).reduce(function (childrenDelta, matcher) {
          return matcher(childNode, childrenDelta);
        }, childrenDelta);
      }
      return delta.concat(childrenDelta);
    }, new _quillDelta2.default());
  } else {
    return new _quillDelta2.default();
  }
}

function matchAlias(format, node, delta) {
  return applyFormat(delta, format, true);
}

function matchAttributor(node, delta) {
  var attributes = _parchment2.default.Attributor.Attribute.keys(node);
  var classes = _parchment2.default.Attributor.Class.keys(node);
  var styles = _parchment2.default.Attributor.Style.keys(node);
  var formats = {};
  attributes.concat(classes).concat(styles).forEach(function (name) {
    var attr = _parchment2.default.query(name, _parchment2.default.Scope.ATTRIBUTE);
    if (attr != null) {
      formats[attr.attrName] = attr.value(node);
      if (formats[attr.attrName]) return;
    }
    attr = ATTRIBUTE_ATTRIBUTORS[name];
    if (attr != null && (attr.attrName === name || attr.keyName === name)) {
      formats[attr.attrName] = attr.value(node) || undefined;
    }
    attr = STYLE_ATTRIBUTORS[name];
    if (attr != null && (attr.attrName === name || attr.keyName === name)) {
      attr = STYLE_ATTRIBUTORS[name];
      formats[attr.attrName] = attr.value(node) || undefined;
    }
  });
  if (Object.keys(formats).length > 0) {
    delta = applyFormat(delta, formats);
  }
  return delta;
}

function matchBlot(node, delta) {
  var match = _parchment2.default.query(node);
  if (match == null) return delta;
  if (match.prototype instanceof _parchment2.default.Embed) {
    var embed = {};
    var value = match.value(node);
    if (value != null) {
      embed[match.blotName] = value;
      delta = new _quillDelta2.default().insert(embed, match.formats(node));
    }
  } else if (typeof match.formats === 'function') {
    delta = applyFormat(delta, match.blotName, match.formats(node));
  }
  return delta;
}

function matchBreak(node, delta) {
  if (!deltaEndsWith(delta, '\n')) {
    delta.insert('\n');
  }
  return delta;
}

function matchIgnore() {
  return new _quillDelta2.default();
}

function matchIndent(node, delta) {
  var match = _parchment2.default.query(node);
  if (match == null || match.blotName !== 'list-item' || !deltaEndsWith(delta, '\n')) {
    return delta;
  }
  var indent = -1,
      parent = node.parentNode;
  while (!parent.classList.contains('ql-clipboard')) {
    if ((_parchment2.default.query(parent) || {}).blotName === 'list') {
      indent += 1;
    }
    parent = parent.parentNode;
  }
  if (indent <= 0) return delta;
  return delta.compose(new _quillDelta2.default().retain(delta.length() - 1).retain(1, { indent: indent }));
}

function matchNewline(node, delta) {
  if (!deltaEndsWith(delta, '\n')) {
    if (isLine(node) || delta.length() > 0 && node.nextSibling && isLine(node.nextSibling)) {
      delta.insert('\n');
    }
  }
  return delta;
}

function matchSpacing(node, delta) {
  if (isLine(node) && node.nextElementSibling != null && !deltaEndsWith(delta, '\n\n')) {
    var nodeHeight = node.offsetHeight + parseFloat(computeStyle(node).marginTop) + parseFloat(computeStyle(node).marginBottom);
    if (node.nextElementSibling.offsetTop > node.offsetTop + nodeHeight * 1.5) {
      delta.insert('\n');
    }
  }
  return delta;
}

function matchStyles(node, delta) {
  var formats = {};
  var style = node.style || {};
  if (style.fontStyle && computeStyle(node).fontStyle === 'italic') {
    formats.italic = true;
  }
  if (style.fontWeight && (computeStyle(node).fontWeight.startsWith('bold') || parseInt(computeStyle(node).fontWeight) >= 700)) {
    formats.bold = true;
  }
  if (Object.keys(formats).length > 0) {
    delta = applyFormat(delta, formats);
  }
  if (parseFloat(style.textIndent || 0) > 0) {
    // Could be 0.5in
    delta = new _quillDelta2.default().insert('\t').concat(delta);
  }
  return delta;
}

function matchText(node, delta) {
  var text = node.data;
  // Word represents empty line with <o:p>&nbsp;</o:p>
  if (node.parentNode.tagName === 'O:P') {
    return delta.insert(text.trim());
  }
  if (text.trim().length === 0 && node.parentNode.classList.contains('ql-clipboard')) {
    return delta;
  }
  if (!computeStyle(node.parentNode).whiteSpace.startsWith('pre')) {
    // eslint-disable-next-line func-style
    var replacer = function replacer(collapse, match) {
      match = match.replace(/[^\u00a0]/g, ''); // \u00a0 is nbsp;
      return match.length < 1 && collapse ? ' ' : match;
    };
    text = text.replace(/\r\n/g, ' ').replace(/\n/g, ' ');
    text = text.replace(/\s\s+/g, replacer.bind(replacer, true)); // collapse whitespace
    if (node.previousSibling == null && isLine(node.parentNode) || node.previousSibling != null && isLine(node.previousSibling)) {
      text = text.replace(/^\s+/, replacer.bind(replacer, false));
    }
    if (node.nextSibling == null && isLine(node.parentNode) || node.nextSibling != null && isLine(node.nextSibling)) {
      text = text.replace(/\s+$/, replacer.bind(replacer, false));
    }
  }
  return delta.insert(text);
}

exports.default = Clipboard;
exports.matchAttributor = matchAttributor;
exports.matchBlot = matchBlot;
exports.matchNewline = matchNewline;
exports.matchSpacing = matchSpacing;
exports.matchText = matchText;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bold = function (_Inline) {
  _inherits(Bold, _Inline);

  function Bold() {
    _classCallCheck(this, Bold);

    return _possibleConstructorReturn(this, (Bold.__proto__ || Object.getPrototypeOf(Bold)).apply(this, arguments));
  }

  _createClass(Bold, [{
    key: 'optimize',
    value: function optimize(context) {
      _get(Bold.prototype.__proto__ || Object.getPrototypeOf(Bold.prototype), 'optimize', this).call(this, context);
      if (this.domNode.tagName !== this.statics.tagName[0]) {
        this.replaceWith(this.statics.blotName);
      }
    }
  }], [{
    key: 'create',
    value: function create() {
      return _get(Bold.__proto__ || Object.getPrototypeOf(Bold), 'create', this).call(this);
    }
  }, {
    key: 'formats',
    value: function formats() {
      return true;
    }
  }]);

  return Bold;
}(_inline2.default);

Bold.blotName = 'bold';
Bold.tagName = ['STRONG', 'B'];

exports.default = Bold;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addControls = exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _quillDelta = __webpack_require__(2);

var _quillDelta2 = _interopRequireDefault(_quillDelta);

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _logger = __webpack_require__(10);

var _logger2 = _interopRequireDefault(_logger);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var debug = (0, _logger2.default)('quill:toolbar');

var Toolbar = function (_Module) {
  _inherits(Toolbar, _Module);

  function Toolbar(quill, options) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, quill, options));

    if (Array.isArray(_this.options.container)) {
      var container = document.createElement('div');
      addControls(container, _this.options.container);
      quill.container.parentNode.insertBefore(container, quill.container);
      _this.container = container;
    } else if (typeof _this.options.container === 'string') {
      _this.container = document.querySelector(_this.options.container);
    } else {
      _this.container = _this.options.container;
    }
    if (!(_this.container instanceof HTMLElement)) {
      var _ret;

      return _ret = debug.error('Container required for toolbar', _this.options), _possibleConstructorReturn(_this, _ret);
    }
    _this.container.classList.add('ql-toolbar');
    _this.controls = [];
    _this.handlers = {};
    Object.keys(_this.options.handlers).forEach(function (format) {
      _this.addHandler(format, _this.options.handlers[format]);
    });
    [].forEach.call(_this.container.querySelectorAll('button, select'), function (input) {
      _this.attach(input);
    });
    _this.quill.on(_quill2.default.events.EDITOR_CHANGE, function (type, range) {
      if (type === _quill2.default.events.SELECTION_CHANGE) {
        _this.update(range);
      }
    });
    _this.quill.on(_quill2.default.events.SCROLL_OPTIMIZE, function () {
      var _this$quill$selection = _this.quill.selection.getRange(),
          _this$quill$selection2 = _slicedToArray(_this$quill$selection, 1),
          range = _this$quill$selection2[0]; // quill.getSelection triggers update


      _this.update(range);
    });
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'addHandler',
    value: function addHandler(format, handler) {
      this.handlers[format] = handler;
    }
  }, {
    key: 'attach',
    value: function attach(input) {
      var _this2 = this;

      var format = [].find.call(input.classList, function (className) {
        return className.indexOf('ql-') === 0;
      });
      if (!format) return;
      format = format.slice('ql-'.length);
      if (input.tagName === 'BUTTON') {
        input.setAttribute('type', 'button');
      }
      if (this.handlers[format] == null) {
        if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[format] == null) {
          debug.warn('ignoring attaching to disabled format', format, input);
          return;
        }
        if (_parchment2.default.query(format) == null) {
          debug.warn('ignoring attaching to nonexistent format', format, input);
          return;
        }
      }
      var eventName = input.tagName === 'SELECT' ? 'change' : 'click';
      input.addEventListener(eventName, function (e) {
        var value = void 0;
        if (input.tagName === 'SELECT') {
          if (input.selectedIndex < 0) return;
          var selected = input.options[input.selectedIndex];
          if (selected.hasAttribute('selected')) {
            value = false;
          } else {
            value = selected.value || false;
          }
        } else {
          if (input.classList.contains('ql-active')) {
            value = false;
          } else {
            value = input.value || !input.hasAttribute('value');
          }
          e.preventDefault();
        }
        _this2.quill.focus();

        var _quill$selection$getR = _this2.quill.selection.getRange(),
            _quill$selection$getR2 = _slicedToArray(_quill$selection$getR, 1),
            range = _quill$selection$getR2[0];

        if (_this2.handlers[format] != null) {
          _this2.handlers[format].call(_this2, value);
        } else if (_parchment2.default.query(format).prototype instanceof _parchment2.default.Embed) {
          value = prompt('Enter ' + format);
          if (!value) return;
          _this2.quill.updateContents(new _quillDelta2.default().retain(range.index).delete(range.length).insert(_defineProperty({}, format, value)), _quill2.default.sources.USER);
        } else {
          _this2.quill.format(format, value, _quill2.default.sources.USER);
        }
        _this2.update(range);
      });
      // TODO use weakmap
      this.controls.push([format, input]);
    }
  }, {
    key: 'update',
    value: function update(range) {
      var formats = range == null ? {} : this.quill.getFormat(range);
      this.controls.forEach(function (pair) {
        var _pair = _slicedToArray(pair, 2),
            format = _pair[0],
            input = _pair[1];

        if (input.tagName === 'SELECT') {
          var option = void 0;
          if (range == null) {
            option = null;
          } else if (formats[format] == null) {
            option = input.querySelector('option[selected]');
          } else if (!Array.isArray(formats[format])) {
            var value = formats[format];
            if (typeof value === 'string') {
              value = value.replace(/\"/g, '\\"');
            }
            option = input.querySelector('option[value="' + value + '"]');
          }
          if (option == null) {
            input.value = ''; // TODO make configurable?
            input.selectedIndex = -1;
          } else {
            option.selected = true;
          }
        } else {
          if (range == null) {
            input.classList.remove('ql-active');
          } else if (input.hasAttribute('value')) {
            // both being null should match (default values)
            // '1' should match with 1 (headers)
            var isActive = formats[format] === input.getAttribute('value') || formats[format] != null && formats[format].toString() === input.getAttribute('value') || formats[format] == null && !input.getAttribute('value');
            input.classList.toggle('ql-active', isActive);
          } else {
            input.classList.toggle('ql-active', formats[format] != null);
          }
        }
      });
    }
  }]);

  return Toolbar;
}(_module2.default);

Toolbar.DEFAULTS = {};

function addButton(container, format, value) {
  var input = document.createElement('button');
  input.setAttribute('type', 'button');
  input.classList.add('ql-' + format);
  if (value != null) {
    input.value = value;
  }
  container.appendChild(input);
}

function addControls(container, groups) {
  if (!Array.isArray(groups[0])) {
    groups = [groups];
  }
  groups.forEach(function (controls) {
    var group = document.createElement('span');
    group.classList.add('ql-formats');
    controls.forEach(function (control) {
      if (typeof control === 'string') {
        addButton(group, control);
      } else {
        var format = Object.keys(control)[0];
        var value = control[format];
        if (Array.isArray(value)) {
          addSelect(group, format, value);
        } else {
          addButton(group, format, value);
        }
      }
    });
    container.appendChild(group);
  });
}

function addSelect(container, format, values) {
  var input = document.createElement('select');
  input.classList.add('ql-' + format);
  values.forEach(function (value) {
    var option = document.createElement('option');
    if (value !== false) {
      option.setAttribute('value', value);
    } else {
      option.setAttribute('selected', 'selected');
    }
    input.appendChild(option);
  });
  container.appendChild(input);
}

Toolbar.DEFAULTS = {
  container: null,
  handlers: {
    clean: function clean() {
      var _this3 = this;

      var range = this.quill.getSelection();
      if (range == null) return;
      if (range.length == 0) {
        var formats = this.quill.getFormat();
        Object.keys(formats).forEach(function (name) {
          // Clean functionality in existing apps only clean inline formats
          if (_parchment2.default.query(name, _parchment2.default.Scope.INLINE) != null) {
            _this3.quill.format(name, false);
          }
        });
      } else {
        this.quill.removeFormat(range, _quill2.default.sources.USER);
      }
    },
    direction: function direction(value) {
      var align = this.quill.getFormat()['align'];
      if (value === 'rtl' && align == null) {
        this.quill.format('align', 'right', _quill2.default.sources.USER);
      } else if (!value && align === 'right') {
        this.quill.format('align', false, _quill2.default.sources.USER);
      }
      this.quill.format('direction', value, _quill2.default.sources.USER);
    },
    indent: function indent(value) {
      var range = this.quill.getSelection();
      var formats = this.quill.getFormat(range);
      var indent = parseInt(formats.indent || 0);
      if (value === '+1' || value === '-1') {
        var modifier = value === '+1' ? 1 : -1;
        if (formats.direction === 'rtl') modifier *= -1;
        this.quill.format('indent', indent + modifier, _quill2.default.sources.USER);
      }
    },
    link: function link(value) {
      if (value === true) {
        value = prompt('Enter link URL:');
      }
      this.quill.format('link', value, _quill2.default.sources.USER);
    },
    list: function list(value) {
      var range = this.quill.getSelection();
      var formats = this.quill.getFormat(range);
      if (value === 'check') {
        if (formats['list'] === 'checked' || formats['list'] === 'unchecked') {
          this.quill.format('list', false, _quill2.default.sources.USER);
        } else {
          this.quill.format('list', 'unchecked', _quill2.default.sources.USER);
        }
      } else {
        this.quill.format('list', value, _quill2.default.sources.USER);
      }
    }
  }
};

exports.default = Toolbar;
exports.addControls = addControls;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <polyline class=\"ql-even ql-stroke\" points=\"5 7 3 9 5 11\"></polyline> <polyline class=\"ql-even ql-stroke\" points=\"13 7 15 9 13 11\"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>";

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _picker = __webpack_require__(28);

var _picker2 = _interopRequireDefault(_picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = function (_Picker) {
  _inherits(ColorPicker, _Picker);

  function ColorPicker(select, label) {
    _classCallCheck(this, ColorPicker);

    var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this, select));

    _this.label.innerHTML = label;
    _this.container.classList.add('ql-color-picker');
    [].slice.call(_this.container.querySelectorAll('.ql-picker-item'), 0, 7).forEach(function (item) {
      item.classList.add('ql-primary');
    });
    return _this;
  }

  _createClass(ColorPicker, [{
    key: 'buildItem',
    value: function buildItem(option) {
      var item = _get(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'buildItem', this).call(this, option);
      item.style.backgroundColor = option.getAttribute('value') || '';
      return item;
    }
  }, {
    key: 'selectItem',
    value: function selectItem(item, trigger) {
      _get(ColorPicker.prototype.__proto__ || Object.getPrototypeOf(ColorPicker.prototype), 'selectItem', this).call(this, item, trigger);
      var colorLabel = this.label.querySelector('.ql-color-label');
      var value = item ? item.getAttribute('data-value') || '' : '';
      if (colorLabel) {
        if (colorLabel.tagName === 'line') {
          colorLabel.style.stroke = value;
        } else {
          colorLabel.style.fill = value;
        }
      }
    }
  }]);

  return ColorPicker;
}(_picker2.default);

exports.default = ColorPicker;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _picker = __webpack_require__(28);

var _picker2 = _interopRequireDefault(_picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconPicker = function (_Picker) {
  _inherits(IconPicker, _Picker);

  function IconPicker(select, icons) {
    _classCallCheck(this, IconPicker);

    var _this = _possibleConstructorReturn(this, (IconPicker.__proto__ || Object.getPrototypeOf(IconPicker)).call(this, select));

    _this.container.classList.add('ql-icon-picker');
    [].forEach.call(_this.container.querySelectorAll('.ql-picker-item'), function (item) {
      item.innerHTML = icons[item.getAttribute('data-value') || ''];
    });
    _this.defaultItem = _this.container.querySelector('.ql-selected');
    _this.selectItem(_this.defaultItem);
    return _this;
  }

  _createClass(IconPicker, [{
    key: 'selectItem',
    value: function selectItem(item, trigger) {
      _get(IconPicker.prototype.__proto__ || Object.getPrototypeOf(IconPicker.prototype), 'selectItem', this).call(this, item, trigger);
      item = item || this.defaultItem;
      this.label.innerHTML = item.innerHTML;
    }
  }]);

  return IconPicker;
}(_picker2.default);

exports.default = IconPicker;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tooltip = function () {
  function Tooltip(quill, boundsContainer) {
    var _this = this;

    _classCallCheck(this, Tooltip);

    this.quill = quill;
    this.boundsContainer = boundsContainer || document.body;
    this.root = quill.addContainer('ql-tooltip');
    this.root.innerHTML = this.constructor.TEMPLATE;
    if (this.quill.root === this.quill.scrollingContainer) {
      this.quill.root.addEventListener('scroll', function () {
        _this.root.style.marginTop = -1 * _this.quill.root.scrollTop + 'px';
      });
    }
    this.hide();
  }

  _createClass(Tooltip, [{
    key: 'hide',
    value: function hide() {
      this.root.classList.add('ql-hidden');
    }
  }, {
    key: 'position',
    value: function position(reference) {
      var left = reference.left + reference.width / 2 - this.root.offsetWidth / 2;
      // root.scrollTop should be 0 if scrollContainer !== root
      var top = reference.bottom + this.quill.root.scrollTop;
      this.root.style.left = left + 'px';
      this.root.style.top = top + 'px';
      this.root.classList.remove('ql-flip');
      var containerBounds = this.boundsContainer.getBoundingClientRect();
      var rootBounds = this.root.getBoundingClientRect();
      var shift = 0;
      if (rootBounds.right > containerBounds.right) {
        shift = containerBounds.right - rootBounds.right;
        this.root.style.left = left + shift + 'px';
      }
      if (rootBounds.left < containerBounds.left) {
        shift = containerBounds.left - rootBounds.left;
        this.root.style.left = left + shift + 'px';
      }
      if (rootBounds.bottom > containerBounds.bottom) {
        var height = rootBounds.bottom - rootBounds.top;
        var verticalShift = reference.bottom - reference.top + height;
        this.root.style.top = top - verticalShift + 'px';
        this.root.classList.add('ql-flip');
      }
      return shift;
    }
  }, {
    key: 'show',
    value: function show() {
      this.root.classList.remove('ql-editing');
      this.root.classList.remove('ql-hidden');
    }
  }]);

  return Tooltip;
}();

exports.default = Tooltip;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _emitter = __webpack_require__(8);

var _emitter2 = _interopRequireDefault(_emitter);

var _base = __webpack_require__(43);

var _base2 = _interopRequireDefault(_base);

var _link = __webpack_require__(27);

var _link2 = _interopRequireDefault(_link);

var _selection = __webpack_require__(15);

var _icons = __webpack_require__(41);

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TOOLBAR_CONFIG = [[{ header: ['1', '2', '3', false] }], ['bold', 'italic', 'underline', 'link'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']];

var SnowTheme = function (_BaseTheme) {
  _inherits(SnowTheme, _BaseTheme);

  function SnowTheme(quill, options) {
    _classCallCheck(this, SnowTheme);

    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
      options.modules.toolbar.container = TOOLBAR_CONFIG;
    }

    var _this = _possibleConstructorReturn(this, (SnowTheme.__proto__ || Object.getPrototypeOf(SnowTheme)).call(this, quill, options));

    _this.quill.container.classList.add('ql-snow');
    return _this;
  }

  _createClass(SnowTheme, [{
    key: 'extendToolbar',
    value: function extendToolbar(toolbar) {
      toolbar.container.classList.add('ql-snow');
      this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), _icons2.default);
      this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), _icons2.default);
      this.tooltip = new SnowTooltip(this.quill, this.options.bounds);
      if (toolbar.container.querySelector('.ql-link')) {
        this.quill.keyboard.addBinding({ key: 'K', shortKey: true }, function (range, context) {
          toolbar.handlers['link'].call(toolbar, !context.format.link);
        });
      }
    }
  }]);

  return SnowTheme;
}(_base2.default);

SnowTheme.DEFAULTS = (0, _extend2.default)(true, {}, _base2.default.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link: function link(value) {
          if (value) {
            var range = this.quill.getSelection();
            if (range == null || range.length == 0) return;
            var preview = this.quill.getText(range);
            if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf('mailto:') !== 0) {
              preview = 'mailto:' + preview;
            }
            var tooltip = this.quill.theme.tooltip;
            tooltip.edit('link', preview);
          } else {
            this.quill.format('link', false);
          }
        }
      }
    }
  }
});

var SnowTooltip = function (_BaseTooltip) {
  _inherits(SnowTooltip, _BaseTooltip);

  function SnowTooltip(quill, bounds) {
    _classCallCheck(this, SnowTooltip);

    var _this2 = _possibleConstructorReturn(this, (SnowTooltip.__proto__ || Object.getPrototypeOf(SnowTooltip)).call(this, quill, bounds));

    _this2.preview = _this2.root.querySelector('a.ql-preview');
    return _this2;
  }

  _createClass(SnowTooltip, [{
    key: 'listen',
    value: function listen() {
      var _this3 = this;

      _get(SnowTooltip.prototype.__proto__ || Object.getPrototypeOf(SnowTooltip.prototype), 'listen', this).call(this);
      this.root.querySelector('a.ql-action').addEventListener('click', function (event) {
        if (_this3.root.classList.contains('ql-editing')) {
          _this3.save();
        } else {
          _this3.edit('link', _this3.preview.textContent);
        }
        event.preventDefault();
      });
      this.root.querySelector('a.ql-remove').addEventListener('click', function (event) {
        if (_this3.linkRange != null) {
          var range = _this3.linkRange;
          _this3.restoreFocus();
          _this3.quill.formatText(range, 'link', false, _emitter2.default.sources.USER);
          delete _this3.linkRange;
        }
        event.preventDefault();
        _this3.hide();
      });
      this.quill.on(_emitter2.default.events.SELECTION_CHANGE, function (range, oldRange, source) {
        if (range == null) return;
        if (range.length === 0 && source === _emitter2.default.sources.USER) {
          var _quill$scroll$descend = _this3.quill.scroll.descendant(_link2.default, range.index),
              _quill$scroll$descend2 = _slicedToArray(_quill$scroll$descend, 2),
              link = _quill$scroll$descend2[0],
              offset = _quill$scroll$descend2[1];

          if (link != null) {
            _this3.linkRange = new _selection.Range(range.index - offset, link.length());
            var preview = _link2.default.formats(link.domNode);
            _this3.preview.textContent = preview;
            _this3.preview.setAttribute('href', preview);
            _this3.show();
            _this3.position(_this3.quill.getBounds(_this3.linkRange));
            return;
          }
        } else {
          delete _this3.linkRange;
        }
        _this3.hide();
      });
    }
  }, {
    key: 'show',
    value: function show() {
      _get(SnowTooltip.prototype.__proto__ || Object.getPrototypeOf(SnowTooltip.prototype), 'show', this).call(this);
      this.root.removeAttribute('data-mode');
    }
  }]);

  return SnowTooltip;
}(_base.BaseTooltip);

SnowTooltip.TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join('');

exports.default = SnowTheme;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(29);

var _core2 = _interopRequireDefault(_core);

var _align = __webpack_require__(36);

var _direction = __webpack_require__(38);

var _indent = __webpack_require__(64);

var _blockquote = __webpack_require__(65);

var _blockquote2 = _interopRequireDefault(_blockquote);

var _header = __webpack_require__(66);

var _header2 = _interopRequireDefault(_header);

var _list = __webpack_require__(67);

var _list2 = _interopRequireDefault(_list);

var _background = __webpack_require__(37);

var _color = __webpack_require__(26);

var _font = __webpack_require__(39);

var _size = __webpack_require__(40);

var _bold = __webpack_require__(56);

var _bold2 = _interopRequireDefault(_bold);

var _italic = __webpack_require__(68);

var _italic2 = _interopRequireDefault(_italic);

var _link = __webpack_require__(27);

var _link2 = _interopRequireDefault(_link);

var _script = __webpack_require__(69);

var _script2 = _interopRequireDefault(_script);

var _strike = __webpack_require__(70);

var _strike2 = _interopRequireDefault(_strike);

var _underline = __webpack_require__(71);

var _underline2 = _interopRequireDefault(_underline);

var _image = __webpack_require__(72);

var _image2 = _interopRequireDefault(_image);

var _video = __webpack_require__(73);

var _video2 = _interopRequireDefault(_video);

var _code = __webpack_require__(13);

var _code2 = _interopRequireDefault(_code);

var _formula = __webpack_require__(74);

var _formula2 = _interopRequireDefault(_formula);

var _syntax = __webpack_require__(75);

var _syntax2 = _interopRequireDefault(_syntax);

var _toolbar = __webpack_require__(57);

var _toolbar2 = _interopRequireDefault(_toolbar);

var _icons = __webpack_require__(41);

var _icons2 = _interopRequireDefault(_icons);

var _picker = __webpack_require__(28);

var _picker2 = _interopRequireDefault(_picker);

var _colorPicker = __webpack_require__(59);

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _iconPicker = __webpack_require__(60);

var _iconPicker2 = _interopRequireDefault(_iconPicker);

var _tooltip = __webpack_require__(61);

var _tooltip2 = _interopRequireDefault(_tooltip);

var _bubble = __webpack_require__(108);

var _bubble2 = _interopRequireDefault(_bubble);

var _snow = __webpack_require__(62);

var _snow2 = _interopRequireDefault(_snow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_core2.default.register({
  'attributors/attribute/direction': _direction.DirectionAttribute,

  'attributors/class/align': _align.AlignClass,
  'attributors/class/background': _background.BackgroundClass,
  'attributors/class/color': _color.ColorClass,
  'attributors/class/direction': _direction.DirectionClass,
  'attributors/class/font': _font.FontClass,
  'attributors/class/size': _size.SizeClass,

  'attributors/style/align': _align.AlignStyle,
  'attributors/style/background': _background.BackgroundStyle,
  'attributors/style/color': _color.ColorStyle,
  'attributors/style/direction': _direction.DirectionStyle,
  'attributors/style/font': _font.FontStyle,
  'attributors/style/size': _size.SizeStyle
}, true);

_core2.default.register({
  'formats/align': _align.AlignClass,
  'formats/direction': _direction.DirectionClass,
  'formats/indent': _indent.IndentClass,

  'formats/background': _background.BackgroundStyle,
  'formats/color': _color.ColorStyle,
  'formats/font': _font.FontClass,
  'formats/size': _size.SizeClass,

  'formats/blockquote': _blockquote2.default,
  'formats/code-block': _code2.default,
  'formats/header': _header2.default,
  'formats/list': _list2.default,

  'formats/bold': _bold2.default,
  'formats/code': _code.Code,
  'formats/italic': _italic2.default,
  'formats/link': _link2.default,
  'formats/script': _script2.default,
  'formats/strike': _strike2.default,
  'formats/underline': _underline2.default,

  'formats/image': _image2.default,
  'formats/video': _video2.default,

  'formats/list/item': _list.ListItem,

  'modules/formula': _formula2.default,
  'modules/syntax': _syntax2.default,
  'modules/toolbar': _toolbar2.default,

  'themes/bubble': _bubble2.default,
  'themes/snow': _snow2.default,

  'ui/icons': _icons2.default,
  'ui/picker': _picker2.default,
  'ui/icon-picker': _iconPicker2.default,
  'ui/color-picker': _colorPicker2.default,
  'ui/tooltip': _tooltip2.default
}, true);

exports.default = _core2.default;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndentClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IdentAttributor = function (_Parchment$Attributor) {
  _inherits(IdentAttributor, _Parchment$Attributor);

  function IdentAttributor() {
    _classCallCheck(this, IdentAttributor);

    return _possibleConstructorReturn(this, (IdentAttributor.__proto__ || Object.getPrototypeOf(IdentAttributor)).apply(this, arguments));
  }

  _createClass(IdentAttributor, [{
    key: 'add',
    value: function add(node, value) {
      if (value === '+1' || value === '-1') {
        var indent = this.value(node) || 0;
        value = value === '+1' ? indent + 1 : indent - 1;
      }
      if (value === 0) {
        this.remove(node);
        return true;
      } else {
        return _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'add', this).call(this, node, value);
      }
    }
  }, {
    key: 'canAdd',
    value: function canAdd(node, value) {
      return _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'canAdd', this).call(this, node, value) || _get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'canAdd', this).call(this, node, parseInt(value));
    }
  }, {
    key: 'value',
    value: function value(node) {
      return parseInt(_get(IdentAttributor.prototype.__proto__ || Object.getPrototypeOf(IdentAttributor.prototype), 'value', this).call(this, node)) || undefined; // Don't return NaN
    }
  }]);

  return IdentAttributor;
}(_parchment2.default.Attributor.Class);

var IndentClass = new IdentAttributor('indent', 'ql-indent', {
  scope: _parchment2.default.Scope.BLOCK,
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});

exports.IndentClass = IndentClass;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Blockquote = function (_Block) {
  _inherits(Blockquote, _Block);

  function Blockquote() {
    _classCallCheck(this, Blockquote);

    return _possibleConstructorReturn(this, (Blockquote.__proto__ || Object.getPrototypeOf(Blockquote)).apply(this, arguments));
  }

  return Blockquote;
}(_block2.default);

Blockquote.blotName = 'blockquote';
Blockquote.tagName = 'blockquote';

exports.default = Blockquote;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Block) {
  _inherits(Header, _Block);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, null, [{
    key: 'formats',
    value: function formats(domNode) {
      return this.tagName.indexOf(domNode.tagName) + 1;
    }
  }]);

  return Header;
}(_block2.default);

Header.blotName = 'header';
Header.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

exports.default = Header;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ListItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _block = __webpack_require__(4);

var _block2 = _interopRequireDefault(_block);

var _container = __webpack_require__(25);

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = function (_Block) {
  _inherits(ListItem, _Block);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
  }

  _createClass(ListItem, [{
    key: 'format',
    value: function format(name, value) {
      if (name === List.blotName && !value) {
        this.replaceWith(_parchment2.default.create(this.statics.scope));
      } else {
        _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'format', this).call(this, name, value);
      }
    }
  }, {
    key: 'remove',
    value: function remove() {
      if (this.prev == null && this.next == null) {
        this.parent.remove();
      } else {
        _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'remove', this).call(this);
      }
    }
  }, {
    key: 'replaceWith',
    value: function replaceWith(name, value) {
      this.parent.isolate(this.offset(this.parent), this.length());
      if (name === this.parent.statics.blotName) {
        this.parent.replaceWith(name, value);
        return this;
      } else {
        this.parent.unwrap();
        return _get(ListItem.prototype.__proto__ || Object.getPrototypeOf(ListItem.prototype), 'replaceWith', this).call(this, name, value);
      }
    }
  }], [{
    key: 'formats',
    value: function formats(domNode) {
      return domNode.tagName === this.tagName ? undefined : _get(ListItem.__proto__ || Object.getPrototypeOf(ListItem), 'formats', this).call(this, domNode);
    }
  }]);

  return ListItem;
}(_block2.default);

ListItem.blotName = 'list-item';
ListItem.tagName = 'LI';

var List = function (_Container) {
  _inherits(List, _Container);

  _createClass(List, null, [{
    key: 'create',
    value: function create(value) {
      var tagName = value === 'ordered' ? 'OL' : 'UL';
      var node = _get(List.__proto__ || Object.getPrototypeOf(List), 'create', this).call(this, tagName);
      if (value === 'checked' || value === 'unchecked') {
        node.setAttribute('data-checked', value === 'checked');
      }
      return node;
    }
  }, {
    key: 'formats',
    value: function formats(domNode) {
      if (domNode.tagName === 'OL') return 'ordered';
      if (domNode.tagName === 'UL') {
        if (domNode.hasAttribute('data-checked')) {
          return domNode.getAttribute('data-checked') === 'true' ? 'checked' : 'unchecked';
        } else {
          return 'bullet';
        }
      }
      return undefined;
    }
  }]);

  function List(domNode) {
    _classCallCheck(this, List);

    var _this2 = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, domNode));

    var listEventHandler = function listEventHandler(e) {
      if (e.target.parentNode !== domNode) return;
      var format = _this2.statics.formats(domNode);
      var blot = _parchment2.default.find(e.target);
      if (format === 'checked') {
        blot.format('list', 'unchecked');
      } else if (format === 'unchecked') {
        blot.format('list', 'checked');
      }
    };

    domNode.addEventListener('touchstart', listEventHandler);
    domNode.addEventListener('mousedown', listEventHandler);
    return _this2;
  }

  _createClass(List, [{
    key: 'format',
    value: function format(name, value) {
      if (this.children.length > 0) {
        this.children.tail.format(name, value);
      }
    }
  }, {
    key: 'formats',
    value: function formats() {
      // We don't inherit from FormatBlot
      return _defineProperty({}, this.statics.blotName, this.statics.formats(this.domNode));
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(blot, ref) {
      if (blot instanceof ListItem) {
        _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'insertBefore', this).call(this, blot, ref);
      } else {
        var index = ref == null ? this.length() : ref.offset(this);
        var after = this.split(index);
        after.parent.insertBefore(blot, after);
      }
    }
  }, {
    key: 'optimize',
    value: function optimize(context) {
      _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'optimize', this).call(this, context);
      var next = this.next;
      if (next != null && next.prev === this && next.statics.blotName === this.statics.blotName && next.domNode.tagName === this.domNode.tagName && next.domNode.getAttribute('data-checked') === this.domNode.getAttribute('data-checked')) {
        next.moveChildren(this);
        next.remove();
      }
    }
  }, {
    key: 'replace',
    value: function replace(target) {
      if (target.statics.blotName !== this.statics.blotName) {
        var item = _parchment2.default.create(this.statics.defaultChild);
        target.moveChildren(item);
        this.appendChild(item);
      }
      _get(List.prototype.__proto__ || Object.getPrototypeOf(List.prototype), 'replace', this).call(this, target);
    }
  }]);

  return List;
}(_container2.default);

List.blotName = 'list';
List.scope = _parchment2.default.Scope.BLOCK_BLOT;
List.tagName = ['OL', 'UL'];
List.defaultChild = 'list-item';
List.allowedChildren = [ListItem];

exports.ListItem = ListItem;
exports.default = List;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bold = __webpack_require__(56);

var _bold2 = _interopRequireDefault(_bold);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Italic = function (_Bold) {
  _inherits(Italic, _Bold);

  function Italic() {
    _classCallCheck(this, Italic);

    return _possibleConstructorReturn(this, (Italic.__proto__ || Object.getPrototypeOf(Italic)).apply(this, arguments));
  }

  return Italic;
}(_bold2.default);

Italic.blotName = 'italic';
Italic.tagName = ['EM', 'I'];

exports.default = Italic;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Script = function (_Inline) {
  _inherits(Script, _Inline);

  function Script() {
    _classCallCheck(this, Script);

    return _possibleConstructorReturn(this, (Script.__proto__ || Object.getPrototypeOf(Script)).apply(this, arguments));
  }

  _createClass(Script, null, [{
    key: 'create',
    value: function create(value) {
      if (value === 'super') {
        return document.createElement('sup');
      } else if (value === 'sub') {
        return document.createElement('sub');
      } else {
        return _get(Script.__proto__ || Object.getPrototypeOf(Script), 'create', this).call(this, value);
      }
    }
  }, {
    key: 'formats',
    value: function formats(domNode) {
      if (domNode.tagName === 'SUB') return 'sub';
      if (domNode.tagName === 'SUP') return 'super';
      return undefined;
    }
  }]);

  return Script;
}(_inline2.default);

Script.blotName = 'script';
Script.tagName = ['SUB', 'SUP'];

exports.default = Script;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Strike = function (_Inline) {
  _inherits(Strike, _Inline);

  function Strike() {
    _classCallCheck(this, Strike);

    return _possibleConstructorReturn(this, (Strike.__proto__ || Object.getPrototypeOf(Strike)).apply(this, arguments));
  }

  return Strike;
}(_inline2.default);

Strike.blotName = 'strike';
Strike.tagName = 'S';

exports.default = Strike;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inline = __webpack_require__(6);

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Underline = function (_Inline) {
  _inherits(Underline, _Inline);

  function Underline() {
    _classCallCheck(this, Underline);

    return _possibleConstructorReturn(this, (Underline.__proto__ || Object.getPrototypeOf(Underline)).apply(this, arguments));
  }

  return Underline;
}(_inline2.default);

Underline.blotName = 'underline';
Underline.tagName = 'U';

exports.default = Underline;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _link = __webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ATTRIBUTES = ['alt', 'height', 'width'];

var Image = function (_Parchment$Embed) {
  _inherits(Image, _Parchment$Embed);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
  }

  _createClass(Image, [{
    key: 'format',
    value: function format(name, value) {
      if (ATTRIBUTES.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name);
        }
      } else {
        _get(Image.prototype.__proto__ || Object.getPrototypeOf(Image.prototype), 'format', this).call(this, name, value);
      }
    }
  }], [{
    key: 'create',
    value: function create(value) {
      var node = _get(Image.__proto__ || Object.getPrototypeOf(Image), 'create', this).call(this, value);
      if (typeof value === 'string') {
        node.setAttribute('src', this.sanitize(value));
      }
      return node;
    }
  }, {
    key: 'formats',
    value: function formats(domNode) {
      return ATTRIBUTES.reduce(function (formats, attribute) {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      }, {});
    }
  }, {
    key: 'match',
    value: function match(url) {
      return (/\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url)
      );
    }
  }, {
    key: 'sanitize',
    value: function sanitize(url) {
      return (0, _link.sanitize)(url, ['http', 'https', 'data']) ? url : '//:0';
    }
  }, {
    key: 'value',
    value: function value(domNode) {
      return domNode.getAttribute('src');
    }
  }]);

  return Image;
}(_parchment2.default.Embed);

Image.blotName = 'image';
Image.tagName = 'IMG';

exports.default = Image;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _block = __webpack_require__(4);

var _link = __webpack_require__(27);

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ATTRIBUTES = ['height', 'width'];

var Video = function (_BlockEmbed) {
  _inherits(Video, _BlockEmbed);

  function Video() {
    _classCallCheck(this, Video);

    return _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).apply(this, arguments));
  }

  _createClass(Video, [{
    key: 'format',
    value: function format(name, value) {
      if (ATTRIBUTES.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name);
        }
      } else {
        _get(Video.prototype.__proto__ || Object.getPrototypeOf(Video.prototype), 'format', this).call(this, name, value);
      }
    }
  }], [{
    key: 'create',
    value: function create(value) {
      var node = _get(Video.__proto__ || Object.getPrototypeOf(Video), 'create', this).call(this, value);
      node.setAttribute('frameborder', '0');
      node.setAttribute('allowfullscreen', true);
      node.setAttribute('src', this.sanitize(value));
      return node;
    }
  }, {
    key: 'formats',
    value: function formats(domNode) {
      return ATTRIBUTES.reduce(function (formats, attribute) {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      }, {});
    }
  }, {
    key: 'sanitize',
    value: function sanitize(url) {
      return _link2.default.sanitize(url);
    }
  }, {
    key: 'value',
    value: function value(domNode) {
      return domNode.getAttribute('src');
    }
  }]);

  return Video;
}(_block.BlockEmbed);

Video.blotName = 'video';
Video.className = 'ql-video';
Video.tagName = 'IFRAME';

exports.default = Video;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FormulaBlot = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _embed = __webpack_require__(35);

var _embed2 = _interopRequireDefault(_embed);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormulaBlot = function (_Embed) {
  _inherits(FormulaBlot, _Embed);

  function FormulaBlot() {
    _classCallCheck(this, FormulaBlot);

    return _possibleConstructorReturn(this, (FormulaBlot.__proto__ || Object.getPrototypeOf(FormulaBlot)).apply(this, arguments));
  }

  _createClass(FormulaBlot, null, [{
    key: 'create',
    value: function create(value) {
      var node = _get(FormulaBlot.__proto__ || Object.getPrototypeOf(FormulaBlot), 'create', this).call(this, value);
      if (typeof value === 'string') {
        window.katex.render(value, node, {
          throwOnError: false,
          errorColor: '#f00'
        });
        node.setAttribute('data-value', value);
      }
      return node;
    }
  }, {
    key: 'value',
    value: function value(domNode) {
      return domNode.getAttribute('data-value');
    }
  }]);

  return FormulaBlot;
}(_embed2.default);

FormulaBlot.blotName = 'formula';
FormulaBlot.className = 'ql-formula';
FormulaBlot.tagName = 'SPAN';

var Formula = function (_Module) {
  _inherits(Formula, _Module);

  _createClass(Formula, null, [{
    key: 'register',
    value: function register() {
      _quill2.default.register(FormulaBlot, true);
    }
  }]);

  function Formula() {
    _classCallCheck(this, Formula);

    var _this2 = _possibleConstructorReturn(this, (Formula.__proto__ || Object.getPrototypeOf(Formula)).call(this));

    if (window.katex == null) {
      throw new Error('Formula module requires KaTeX.');
    }
    return _this2;
  }

  return Formula;
}(_module2.default);

exports.FormulaBlot = FormulaBlot;
exports.default = Formula;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CodeToken = exports.CodeBlock = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _parchment = __webpack_require__(0);

var _parchment2 = _interopRequireDefault(_parchment);

var _quill = __webpack_require__(5);

var _quill2 = _interopRequireDefault(_quill);

var _module = __webpack_require__(9);

var _module2 = _interopRequireDefault(_module);

var _code = __webpack_require__(13);

var _code2 = _interopRequireDefault(_code);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SyntaxCodeBlock = function (_CodeBlock) {
  _inherits(SyntaxCodeBlock, _CodeBlock);

  function SyntaxCodeBlock() {
    _classCallCheck(this, SyntaxCodeBlock);

    return _possibleConstructorReturn(this, (SyntaxCodeBlock.__proto__ || Object.getPrototypeOf(SyntaxCodeBlock)).apply(this, arguments));
  }

  _createClass(SyntaxCodeBlock, [{
    key: 'replaceWith',
    value: function replaceWith(block) {
      this.domNode.textContent = this.domNode.textContent;
      this.attach();
      _get(SyntaxCodeBlock.prototype.__proto__ || Object.getPrototypeOf(SyntaxCodeBlock.prototype), 'replaceWith', this).call(this, block);
    }
  }, {
    key: 'highlight',
    value: function highlight(_highlight) {
      var text = this.domNode.textContent;
      if (this.cachedText !== text) {
        if (text.trim().length > 0 || this.cachedText == null) {
          this.domNode.innerHTML = _highlight(text);
          this.domNode.normalize();
          this.attach();
        }
        this.cachedText = text;
      }
    }
  }]);

  return SyntaxCodeBlock;
}(_code2.default);

SyntaxCodeBlock.className = 'ql-syntax';

var CodeToken = new _parchment2.default.Attributor.Class('token', 'hljs', {
  scope: _parchment2.default.Scope.INLINE
});

var Syntax = function (_Module) {
  _inherits(Syntax, _Module);

  _createClass(Syntax, null, [{
    key: 'register',
    value: function register() {
      _quill2.default.register(CodeToken, true);
      _quill2.default.register(SyntaxCodeBlock, true);
    }
  }]);

  function Syntax(quill, options) {
    _classCallCheck(this, Syntax);

    var _this2 = _possibleConstructorReturn(this, (Syntax.__proto__ || Object.getPrototypeOf(Syntax)).call(this, quill, options));

    if (typeof _this2.options.highlight !== 'function') {
      throw new Error('Syntax module requires highlight.js. Please include the library on the page before Quill.');
    }
    var timer = null;
    _this2.quill.on(_quill2.default.events.SCROLL_OPTIMIZE, function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        _this2.highlight();
        timer = null;
      }, _this2.options.interval);
    });
    _this2.highlight();
    return _this2;
  }

  _createClass(Syntax, [{
    key: 'highlight',
    value: function highlight() {
      var _this3 = this;

      if (this.quill.selection.composing) return;
      this.quill.update(_quill2.default.sources.USER);
      var range = this.quill.getSelection();
      this.quill.scroll.descendants(SyntaxCodeBlock).forEach(function (code) {
        code.highlight(_this3.options.highlight);
      });
      this.quill.update(_quill2.default.sources.SILENT);
      if (range != null) {
        this.quill.setSelection(range, _quill2.default.sources.SILENT);
      }
    }
  }]);

  return Syntax;
}(_module2.default);

Syntax.DEFAULTS = {
  highlight: function () {
    if (window.hljs == null) return null;
    return function (text) {
      var result = window.hljs.highlightAuto(text);
      return result.value;
    };
  }(),
  interval: 1000
};

exports.CodeBlock = SyntaxCodeBlock;
exports.CodeToken = CodeToken;
exports.default = Syntax;

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>";

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>";

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>";

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>";

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <g class=\"ql-fill ql-color-label\"> <polygon points=\"6 6.868 6 6 5 6 5 7 5.942 7 6 6.868\"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points=\"6.817 5 6 5 6 6 6.38 6 6.817 5\"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points=\"4 11.439 4 11 3 11 3 12 3.755 12 4 11.439\"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points=\"4.63 10 4 10 4 11 4.192 11 4.63 10\"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points=\"13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174\"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points=\"12 6.868 12 6 11.62 6 12 6.868\"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points=\"12.933 9 13 9 13 8 12.495 8 12.933 9\"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points=\"5.5 13 9 5 12.5 13\"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>";

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=\"ql-fill ql-stroke\" height=3 width=3 x=4 y=5></rect> <rect class=\"ql-fill ql-stroke\" height=3 width=3 x=11 y=5></rect> <path class=\"ql-even ql-fill ql-stroke\" d=M7,8c0,4.031-3,5-3,5></path> <path class=\"ql-even ql-fill ql-stroke\" d=M14,8c0,4.031-3,5-3,5></path> </svg>";

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>";

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = "<svg class=\"\" viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>";

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=\"ql-color-label ql-stroke ql-transparent\" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points=\"5.5 11 9 3 12.5 11\"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>";

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=\"ql-stroke ql-fill\" points=\"3 11 5 9 3 7 3 11\"></polygon> <line class=\"ql-stroke ql-fill\" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>";

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=\"ql-stroke ql-fill\" points=\"15 12 13 10 15 8 15 12\"></polygon> <line class=\"ql-stroke ql-fill\" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>";

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>";

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>";

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>";

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform=\"translate(24 18) rotate(-180)\"/> </svg>";

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>";

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 18 18\"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>";

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = "<svg viewBox=\"0 0 18 18\"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>";

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>";

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class=\"ql-even ql-fill\" points=\"5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12\"></polyline> </svg>";

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=\"ql-fill ql-stroke\" points=\"3 7 3 11 5 9 3 7\"></polyline> </svg>";

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points=\"5 7 5 11 3 9 5 7\"></polyline> </svg>";

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class=\"ql-even ql-stroke\" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class=\"ql-even ql-stroke\" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>";

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class=\"ql-stroke ql-thin\" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class=\"ql-stroke ql-thin\" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class=\"ql-stroke ql-thin\" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>";

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>";

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = "<svg class=\"\" viewbox=\"0 0 18 18\"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points=\"3 4 4 5 6 3\"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points=\"3 14 4 15 6 13\"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points=\"3 9 4 10 6 8\"></polyline> </svg>";

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>";

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>";

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <line class=\"ql-stroke ql-thin\" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>";

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>";

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>";

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = "<svg viewbox=\"0 0 18 18\"> <polygon class=ql-stroke points=\"7 11 9 13 11 11 7 11\"></polygon> <polygon class=ql-stroke points=\"7 7 9 5 11 7 7 7\"></polygon> </svg>";

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BubbleTooltip = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extend = __webpack_require__(3);

var _extend2 = _interopRequireDefault(_extend);

var _emitter = __webpack_require__(8);

var _emitter2 = _interopRequireDefault(_emitter);

var _base = __webpack_require__(43);

var _base2 = _interopRequireDefault(_base);

var _selection = __webpack_require__(15);

var _icons = __webpack_require__(41);

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TOOLBAR_CONFIG = [['bold', 'italic', 'link'], [{ header: 1 }, { header: 2 }, 'blockquote']];

var BubbleTheme = function (_BaseTheme) {
  _inherits(BubbleTheme, _BaseTheme);

  function BubbleTheme(quill, options) {
    _classCallCheck(this, BubbleTheme);

    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
      options.modules.toolbar.container = TOOLBAR_CONFIG;
    }

    var _this = _possibleConstructorReturn(this, (BubbleTheme.__proto__ || Object.getPrototypeOf(BubbleTheme)).call(this, quill, options));

    _this.quill.container.classList.add('ql-bubble');
    return _this;
  }

  _createClass(BubbleTheme, [{
    key: 'extendToolbar',
    value: function extendToolbar(toolbar) {
      this.tooltip = new BubbleTooltip(this.quill, this.options.bounds);
      this.tooltip.root.appendChild(toolbar.container);
      this.buildButtons([].slice.call(toolbar.container.querySelectorAll('button')), _icons2.default);
      this.buildPickers([].slice.call(toolbar.container.querySelectorAll('select')), _icons2.default);
    }
  }]);

  return BubbleTheme;
}(_base2.default);

BubbleTheme.DEFAULTS = (0, _extend2.default)(true, {}, _base2.default.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link: function link(value) {
          if (!value) {
            this.quill.format('link', false);
          } else {
            this.quill.theme.tooltip.edit();
          }
        }
      }
    }
  }
});

var BubbleTooltip = function (_BaseTooltip) {
  _inherits(BubbleTooltip, _BaseTooltip);

  function BubbleTooltip(quill, bounds) {
    _classCallCheck(this, BubbleTooltip);

    var _this2 = _possibleConstructorReturn(this, (BubbleTooltip.__proto__ || Object.getPrototypeOf(BubbleTooltip)).call(this, quill, bounds));

    _this2.quill.on(_emitter2.default.events.EDITOR_CHANGE, function (type, range, oldRange, source) {
      if (type !== _emitter2.default.events.SELECTION_CHANGE) return;
      if (range != null && range.length > 0 && source === _emitter2.default.sources.USER) {
        _this2.show();
        // Lock our width so we will expand beyond our offsetParent boundaries
        _this2.root.style.left = '0px';
        _this2.root.style.width = '';
        _this2.root.style.width = _this2.root.offsetWidth + 'px';
        var lines = _this2.quill.getLines(range.index, range.length);
        if (lines.length === 1) {
          _this2.position(_this2.quill.getBounds(range));
        } else {
          var lastLine = lines[lines.length - 1];
          var index = _this2.quill.getIndex(lastLine);
          var length = Math.min(lastLine.length() - 1, range.index + range.length - index);
          var _bounds = _this2.quill.getBounds(new _selection.Range(index, length));
          _this2.position(_bounds);
        }
      } else if (document.activeElement !== _this2.textbox && _this2.quill.hasFocus()) {
        _this2.hide();
      }
    });
    return _this2;
  }

  _createClass(BubbleTooltip, [{
    key: 'listen',
    value: function listen() {
      var _this3 = this;

      _get(BubbleTooltip.prototype.__proto__ || Object.getPrototypeOf(BubbleTooltip.prototype), 'listen', this).call(this);
      this.root.querySelector('.ql-close').addEventListener('click', function () {
        _this3.root.classList.remove('ql-editing');
      });
      this.quill.on(_emitter2.default.events.SCROLL_OPTIMIZE, function () {
        // Let selection be restored by toolbar handlers before repositioning
        setTimeout(function () {
          if (_this3.root.classList.contains('ql-hidden')) return;
          var range = _this3.quill.getSelection();
          if (range != null) {
            _this3.position(_this3.quill.getBounds(range));
          }
        }, 1);
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.show();
    }
  }, {
    key: 'position',
    value: function position(reference) {
      var shift = _get(BubbleTooltip.prototype.__proto__ || Object.getPrototypeOf(BubbleTooltip.prototype), 'position', this).call(this, reference);
      var arrow = this.root.querySelector('.ql-tooltip-arrow');
      arrow.style.marginLeft = '';
      if (shift === 0) return shift;
      arrow.style.marginLeft = -1 * shift - arrow.offsetWidth / 2 + 'px';
    }
  }]);

  return BubbleTooltip;
}(_base.BaseTooltip);

BubbleTooltip.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', '</div>'].join('');

exports.BubbleTooltip = BubbleTooltip;
exports.default = BubbleTheme;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(63);


/***/ })
/******/ ])["default"];
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/y-protocols/auth.js":
/*!******************************************!*\
  !*** ./node_modules/y-protocols/auth.js ***!
  \******************************************/
/*! exports provided: messagePermissionDenied, writePermissionDenied, readAuthMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messagePermissionDenied", function() { return messagePermissionDenied; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writePermissionDenied", function() { return writePermissionDenied; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readAuthMessage", function() { return readAuthMessage; });
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/dist/yjs.mjs");
/* harmony import */ var lib0_encoding_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib0/encoding.js */ "./node_modules/lib0/encoding.js");
/* harmony import */ var lib0_decoding_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib0/decoding.js */ "./node_modules/lib0/decoding.js");

 // eslint-disable-line



const messagePermissionDenied = 0

/**
 * @param {encoding.Encoder} encoder
 * @param {string} reason
 */
const writePermissionDenied = (encoder, reason) => {
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_1__["writeVarUint"](encoder, messagePermissionDenied)
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_1__["writeVarString"](encoder, reason)
}

/**
 * @callback PermissionDeniedHandler
 * @param {any} y
 * @param {string} reason
 */

/**
 *
 * @param {decoding.Decoder} decoder
 * @param {Y.Doc} y
 * @param {PermissionDeniedHandler} permissionDeniedHandler
 */
const readAuthMessage = (decoder, y, permissionDeniedHandler) => {
  switch (lib0_decoding_js__WEBPACK_IMPORTED_MODULE_2__["readVarUint"](decoder)) {
    case messagePermissionDenied: permissionDeniedHandler(y, lib0_decoding_js__WEBPACK_IMPORTED_MODULE_2__["readVarString"](decoder))
  }
}


/***/ }),

/***/ "./node_modules/y-protocols/awareness.js":
/*!***********************************************!*\
  !*** ./node_modules/y-protocols/awareness.js ***!
  \***********************************************/
/*! exports provided: outdatedTimeout, Awareness, removeAwarenessStates, encodeAwarenessUpdate, applyAwarenessUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outdatedTimeout", function() { return outdatedTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Awareness", function() { return Awareness; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAwarenessStates", function() { return removeAwarenessStates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeAwarenessUpdate", function() { return encodeAwarenessUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyAwarenessUpdate", function() { return applyAwarenessUpdate; });
/* harmony import */ var lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib0/encoding.js */ "./node_modules/lib0/encoding.js");
/* harmony import */ var lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib0/decoding.js */ "./node_modules/lib0/decoding.js");
/* harmony import */ var lib0_time_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib0/time.js */ "./node_modules/lib0/time.js");
/* harmony import */ var lib0_math_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib0/math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var lib0_observable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib0/observable.js */ "./node_modules/lib0/observable.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/dist/yjs.mjs");
/**
 * @module awareness-protocol
 */






 // eslint-disable-line

const outdatedTimeout = 30000

/**
 * @typedef {Object} MetaClientState
 * @property {number} MetaClientState.clock
 * @property {number} MetaClientState.lastUpdated unix timestamp
 */

/**
 * The Awareness class implements a simple shared state protocol that can be used for non-persistent data like awareness information
 * (cursor, username, status, ..). Each client can update its own local state and listen to state changes of
 * remote clients. Every client may set a state of a remote peer to `null` to mark the client as offline.
 *
 * Each client is identified by a unique client id (something we borrow from `doc.clientID`). A client can override
 * its own state by propagating a message with an increasing timestamp (`clock`). If such a message is received, it is
 * applied if the known state of that client is older than the new state (`clock < newClock`). If a client thinks that
 * a remote client is offline, it may propagate a message with
 * `{ clock: currentClientClock, state: null, client: remoteClient }`. If such a
 * message is received, and the known clock of that client equals the received clock, it will override the state with `null`.
 *
 * Before a client disconnects, it should propagate a `null` state with an updated clock.
 *
 * Awareness states must be updated every 30 seconds. Otherwise the Awareness instance will delete the client state.
 *
 * @extends {Observable<string>}
 */
class Awareness extends lib0_observable_js__WEBPACK_IMPORTED_MODULE_4__["Observable"] {
  /**
   * @param {Y.Doc} doc
   */
  constructor (doc) {
    super()
    this.doc = doc
    /**
     * Maps from client id to client state
     * @type {Map<number, Object<string, any>>}
     */
    this.states = new Map()
    /**
     * @type {Map<number, MetaClientState>}
     */
    this.meta = new Map()
    this._checkInterval = setInterval(() => {
      const now = lib0_time_js__WEBPACK_IMPORTED_MODULE_2__["getUnixTime"]()
      if (this.getLocalState() !== null && (outdatedTimeout / 2 <= now - /** @type {{lastUpdated:number}} */ (this.meta.get(doc.clientID)).lastUpdated)) {
        // renew local clock
        this.setLocalState(this.getLocalState())
      }
      /**
       * @type {Array<number>}
       */
      const remove = []
      this.meta.forEach((meta, clientid) => {
        if (clientid !== doc.clientID && outdatedTimeout <= now - meta.lastUpdated && this.states.has(clientid)) {
          remove.push(clientid)
        }
      })
      if (remove.length > 0) {
        removeAwarenessStates(this, remove, 'timeout')
      }
    }, lib0_math_js__WEBPACK_IMPORTED_MODULE_3__["floor"](outdatedTimeout / 10))
    doc.on('destroy', () => {
      this.destroy()
    })
    this.setLocalState({})
  }
  destroy () {
    clearInterval(this._checkInterval)
  }
  /**
   * @return {Object<string,Object>|null}
   */
  getLocalState () {
    return this.states.get(this.doc.clientID) || null
  }
  /**
   * @param {Object<string,any>|null} state
   */
  setLocalState (state) {
    const clientID = this.doc.clientID
    const currLocalMeta = this.meta.get(clientID)
    const clock = currLocalMeta === undefined ? 0 : currLocalMeta.clock + 1
    if (state === null) {
      this.states.delete(clientID)
    } else {
      this.states.set(clientID, state)
    }
    this.meta.set(clientID, {
      clock,
      lastUpdated: lib0_time_js__WEBPACK_IMPORTED_MODULE_2__["getUnixTime"]()
    })
    const added = []
    const updated = []
    const removed = []
    if (state === null) {
      removed.push(clientID)
    } else if (currLocalMeta === undefined) {
      added.push(clientID)
    } else {
      updated.push(clientID)
    }
    this.emit('change', [{ added, updated, removed }, 'local'])
  }
  /**
   * @param {string} field
   * @param {Object} value
   */
  setLocalStateField (field, value) {
    const state = this.getLocalState()
    if (state !== null) {
      state[field] = value
      this.setLocalState(state)
    }
  }
  /**
   * @return {Map<number,Object<string,any>>}
   */
  getStates () {
    return this.states
  }
}

/**
 * Mark (remote) clients as inactive and remove them from the list of active peers.
 * This change will be propagated to remote clients.
 *
 * @param {Awareness} awareness
 * @param {Array<number>} clients
 * @param {any} origin
 */
const removeAwarenessStates = (awareness, clients, origin) => {
  const removed = []
  for (let i = 0; i < clients.length; i++) {
    const clientID = clients[i]
    if (awareness.states.has(clientID)) {
      awareness.states.delete(clientID)
      if (clientID === awareness.doc.clientID) {
        const curMeta = /** @type {MetaClientState} */ (awareness.meta.get(clientID))
        awareness.meta.set(clientID, {
          clock: curMeta.clock + 1,
          lastUpdated: lib0_time_js__WEBPACK_IMPORTED_MODULE_2__["getUnixTime"]()
        })
      }
      removed.push(clientID)
    }
  }
  if (removed.length > 0) {
    awareness.emit('change', [{ added: [], updated: [], removed }, origin])
  }
}

/**
 * @param {Awareness} awareness
 * @param {Array<number>} clients
 * @return {Uint8Array}
 */
const encodeAwarenessUpdate = (awareness, clients, states = awareness.states) => {
  const len = clients.length
  const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["createEncoder"]()
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint"](encoder, len)
  for (let i = 0; i < len; i++) {
    const clientID = clients[i]
    const state = states.get(clientID) || null
    const clock = /** @type {MetaClientState} */ (awareness.meta.get(clientID)).clock
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint"](encoder, clientID)
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint"](encoder, clock)
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarString"](encoder, JSON.stringify(state))
  }
  return lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["toUint8Array"](encoder)
}

/**
 * @param {Awareness} awareness
 * @param {Uint8Array} update
 * @param {any} origin This will be added to the emitted change event
 */
const applyAwarenessUpdate = (awareness, update, origin) => {
  const decoder = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["createDecoder"](update)
  const timestamp = lib0_time_js__WEBPACK_IMPORTED_MODULE_2__["getUnixTime"]()
  const added = []
  const updated = []
  const removed = []
  const len = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint"](decoder)
  for (let i = 0; i < len; i++) {
    const clientID = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint"](decoder)
    let clock = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint"](decoder)
    const state = JSON.parse(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarString"](decoder))
    const clientMeta = awareness.meta.get(clientID)
    const currClock = clientMeta === undefined ? 0 : clientMeta.clock
    if (currClock < clock || (currClock === clock && state === null && awareness.states.has(clientID))) {
      if (state === null) {
        // never let a remote client remove this local state
        if (clientID === awareness.doc.clientID && awareness.getLocalState() != null) {
          // remote client removed the local state. Do not remote state. Broadcast a message indicating
          // that this client still exists by increasing the clock
          clock++
        } else {
          awareness.states.delete(clientID)
        }
      } else {
        awareness.states.set(clientID, state)
      }
      awareness.meta.set(clientID, {
        clock,
        lastUpdated: timestamp
      })
      if (clientMeta === undefined && state !== null) {
        added.push(clientID)
      } else if (clientMeta !== undefined && state === null) {
        removed.push(clientID)
      } else if (state !== null) {
        updated.push(clientID)
      }
    }
  }
  if (added.length > 0 || updated.length > 0 || removed.length > 0) {
    awareness.emit('change', [{
      added, updated, removed
    }, origin])
  }
}


/***/ }),

/***/ "./node_modules/y-protocols/sync.js":
/*!******************************************!*\
  !*** ./node_modules/y-protocols/sync.js ***!
  \******************************************/
/*! exports provided: messageYjsSyncStep1, messageYjsSyncStep2, messageYjsUpdate, writeSyncStep1, writeSyncStep2, readSyncStep1, readSyncStep2, writeUpdate, readUpdate, readSyncMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messageYjsSyncStep1", function() { return messageYjsSyncStep1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messageYjsSyncStep2", function() { return messageYjsSyncStep2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messageYjsUpdate", function() { return messageYjsUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeSyncStep1", function() { return writeSyncStep1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeSyncStep2", function() { return writeSyncStep2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readSyncStep1", function() { return readSyncStep1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readSyncStep2", function() { return readSyncStep2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeUpdate", function() { return writeUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readUpdate", function() { return readUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readSyncMessage", function() { return readSyncMessage; });
/* harmony import */ var lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib0/encoding.js */ "./node_modules/lib0/encoding.js");
/* harmony import */ var lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib0/decoding.js */ "./node_modules/lib0/decoding.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/dist/yjs.mjs");
/**
 * @module sync-protocol
 */





/**
 * @typedef {Map<number, number>} StateMap
 */

/**
 * Core Yjs defines three message types:
 * • YjsSyncStep1: Includes the State Set of the sending client. When received, the client should reply with YjsSyncStep2.
 * • YjsSyncStep2: Includes all missing structs and the complete delete set. When received, the the client is assured that
 *   it received all information from the remote client.
 *
 * In a peer-to-peer network, you may want to introduce a SyncDone message type. Both parties should initiate the connection
 * with SyncStep1. When a client received SyncStep2, it should reply with SyncDone. When the local client received both
 * SyncStep2 and SyncDone, it is assured that it is synced to the remote client.
 *
 * In a client-server model, you want to handle this differently: The client should initiate the connection with SyncStep1.
 * When the server receives SyncStep1, it should reply with SyncStep2 immediately followed by SyncStep1. The client replies
 * with SyncStep2 when it receives SyncStep1. Optionally the server may send a SyncDone after it received SyncStep2, so the
 * client knows that the sync is finished.  There are two reasons for this more elaborated sync model: 1. This protocol can
 * easily be implemented on top of http and websockets. 2. The server shoul only reply to requests, and not initiate them.
 * Therefore it is necesarry that the client initiates the sync.
 *
 * Construction of a message:
 * [messageType : varUint, message definition..]
 *
 * Note: A message does not include information about the room name. This must to be handled by the upper layer protocol!
 *
 * stringify[messageType] stringifies a message definition (messageType is already read from the bufffer)
 */

const messageYjsSyncStep1 = 0
const messageYjsSyncStep2 = 1
const messageYjsUpdate = 2

/**
 * Create a sync step 1 message based on the state of the current shared document.
 *
 * @param {encoding.Encoder} encoder
 * @param {Y.Doc} doc
 */
const writeSyncStep1 = (encoder, doc) => {
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint"](encoder, messageYjsSyncStep1)
  const sv = yjs__WEBPACK_IMPORTED_MODULE_2__["encodeStateVector"](doc)
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint8Array"](encoder, sv)
}

/**
 * @param {encoding.Encoder} encoder
 * @param {Y.Doc} doc
 * @param {Uint8Array} [encodedStateVector]
 */
const writeSyncStep2 = (encoder, doc, encodedStateVector) => {
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint"](encoder, messageYjsSyncStep2)
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint8Array"](encoder, yjs__WEBPACK_IMPORTED_MODULE_2__["encodeStateAsUpdate"](doc, encodedStateVector))
}

/**
 * Read SyncStep1 message and reply with SyncStep2.
 *
 * @param {decoding.Decoder} decoder The reply to the received message
 * @param {encoding.Encoder} encoder The received message
 * @param {Y.Doc} doc
 */
const readSyncStep1 = (decoder, encoder, doc) =>
  writeSyncStep2(encoder, doc, lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint8Array"](decoder))

/**
 * Read and apply Structs and then DeleteStore to a y instance.
 *
 * @param {decoding.Decoder} decoder
 * @param {Y.Doc} doc
 * @param {any} transactionOrigin
 */
const readSyncStep2 = (decoder, doc, transactionOrigin) => {
  yjs__WEBPACK_IMPORTED_MODULE_2__["applyUpdate"](doc, lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint8Array"](decoder), transactionOrigin)
}

/**
 * @param {encoding.Encoder} encoder
 * @param {Uint8Array} update
 */
const writeUpdate = (encoder, update) => {
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint"](encoder, messageYjsUpdate)
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint8Array"](encoder, update)
}

/**
 * Read and apply Structs and then DeleteStore to a y instance.
 *
 * @param {decoding.Decoder} decoder
 * @param {Y.Doc} doc
 * @param {any} transactionOrigin
 */
const readUpdate = readSyncStep2

/**
 * @param {decoding.Decoder} decoder A message received from another client
 * @param {encoding.Encoder} encoder The reply message. Will not be sent if empty.
 * @param {Y.Doc} doc
 * @param {any} transactionOrigin
 */
const readSyncMessage = (decoder, encoder, doc, transactionOrigin) => {
  const messageType = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint"](decoder)
  switch (messageType) {
    case messageYjsSyncStep1:
      readSyncStep1(decoder, encoder, doc)
      break
    case messageYjsSyncStep2:
      readSyncStep2(decoder, doc, transactionOrigin)
      break
    case messageYjsUpdate:
      readUpdate(decoder, doc, transactionOrigin)
      break
    default:
      throw new Error('Unknown message type')
  }
  return messageType
}


/***/ }),

/***/ "./node_modules/y-quill/node_modules/lib0/mutex.js":
/*!*********************************************************!*\
  !*** ./node_modules/y-quill/node_modules/lib0/mutex.js ***!
  \*********************************************************/
/*! exports provided: createMutex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMutex", function() { return createMutex; });
/**
 * Mutual exclude for JavaScript.
 *
 * @module mutex
 */

/**
 * @callback mutex
 * @param {function():void} cb Only executed when this mutex is not in the current stack
 * @param {function():void} [elseCb] Executed when this mutex is in the current stack
 */

/**
 * Creates a mutual exclude function with the following property:
 *
 * ```js
 * const mutex = createMutex()
 * mutex(() => {
 *   // This function is immediately executed
 *   mutex(() => {
 *     // This function is not executed, as the mutex is already active.
 *   })
 * })
 * ```
 *
 * @return {mutex} A mutual exclude function
 * @public
 */
const createMutex = () => {
  let token = true
  return (f, g) => {
    if (token) {
      token = false
      try {
        f()
      } finally {
        token = true
      }
    } else if (g !== undefined) {
      g()
    }
  }
}


/***/ }),

/***/ "./node_modules/y-quill/src/y-quill.js":
/*!*********************************************!*\
  !*** ./node_modules/y-quill/src/y-quill.js ***!
  \*********************************************/
/*! exports provided: normQuillDelta, QuillBinding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normQuillDelta", function() { return normQuillDelta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuillBinding", function() { return QuillBinding; });
/* harmony import */ var lib0_mutex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib0/mutex.js */ "./node_modules/y-quill/node_modules/lib0/mutex.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/dist/yjs.mjs");
/* harmony import */ var y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! y-protocols/awareness.js */ "./node_modules/y-protocols/awareness.js");
/**
 * @module bindings/quill
 */


 // eslint-disable-line
 // eslint-disable-line

/**
 * Removes the pending '\n's if it has no attributes.
 */
const normQuillDelta = delta => {
  if (delta.length > 0) {
    const d = delta[delta.length - 1]
    const insert = d.insert
    if (d.attributes === undefined && insert !== undefined && insert.slice(-1) === '\n') {
      delta = delta.slice()
      let ins = insert.slice(0, -1)
      while (ins.slice(-1) === '\n') {
        ins = ins.slice(0, -1)
      }
      delta[delta.length - 1] = { insert: ins }
      if (ins.length === 0) {
        delta.pop()
      }
      return delta
    }
  }
  return delta
}

/**
 * @param {any} quillCursors
 */
const updateCursor = (quillCursors, aw, clientId, doc, type) => {
  try {
    if (aw && aw.cursor && clientId !== doc.clientID) {
      const user = aw.user || {}
      const color = user.color || '#ffa500'
      const name = user.name || `User: ${clientId}`
      quillCursors.createCursor(clientId.toString(), name, color)
      const anchor = yjs__WEBPACK_IMPORTED_MODULE_1__["createAbsolutePositionFromRelativePosition"](yjs__WEBPACK_IMPORTED_MODULE_1__["createRelativePositionFromJSON"](aw.cursor.anchor), doc)
      const head = yjs__WEBPACK_IMPORTED_MODULE_1__["createAbsolutePositionFromRelativePosition"](yjs__WEBPACK_IMPORTED_MODULE_1__["createRelativePositionFromJSON"](aw.cursor.head), doc)
      if (anchor && head && anchor.type === type) {
        quillCursors.moveCursor(clientId.toString(), { index: anchor.index, length: head.index - anchor.index })
      }
    } else {
      quillCursors.removeCursor(clientId.toString())
    }
  } catch (err) {
    console.error(err)
  }
}

class QuillBinding {
  /**
   * @param {Y.Text} type
   * @param {any} quill
   * @param {Awareness} [awareness]
   */
  constructor (type, quill, awareness) {
    const mux = Object(lib0_mutex_js__WEBPACK_IMPORTED_MODULE_0__["createMutex"])()
    const doc = /** @type {Y.Doc} */ (type.doc)
    this.mux = mux
    this.type = type
    this.doc = doc
    this.quill = quill
    const quillCursors = quill.getModule('cursors') || null
    this.quillCursors = quillCursors
    // This object contains all attributes used in the quill instance
    this._negatedUsedFormats = {}
    this.awareness = awareness
    this._awarenessChange = ({ added, removed, updated }) => {
      const states = /** @type {Awareness} */ (awareness).getStates()
      added.forEach(id => {
        updateCursor(quillCursors, states.get(id), id, doc, type)
      })
      updated.forEach(id => {
        updateCursor(quillCursors, states.get(id), id, doc, type)
      })
      removed.forEach(id => {
        quillCursors.removeCursor(id.toString())
      })
    }
    this._typeObserver = event => {
      mux(() => {
        const eventDelta = event.delta
        // We always explicitly set attributes, otherwise concurrent edits may
        // result in quill assuming that a text insertion shall inherit existing
        // attributes.
        const delta = []
        for (let i = 0; i < eventDelta.length; i++) {
          const d = eventDelta[i]
          if (d.insert !== undefined) {
            delta.push(Object.assign({}, d, { attributes: Object.assign({}, this._negatedUsedFormats, d.attributes || {}) }))
          } else {
            delta.push(d)
          }
        }
        quill.updateContents(delta, 'yjs')
      })
    }
    type.observe(this._typeObserver)
    this._quillObserver = (eventType, delta) => {
      if (delta && delta.ops) {
        // update content
        const ops = delta.ops
        ops.forEach(op => {
          if (op.attributes !== undefined) {
            for (let key in op.attributes) {
              if (this._negatedUsedFormats[key] === undefined) {
                this._negatedUsedFormats[key] = false
              }
            }
          }
        })
        mux(() => {
          type.applyDelta(ops)
        })
      }
      // always check selection
      if (awareness && quillCursors) {
        const sel = quill.getSelection()
        const aw = awareness.getLocalState()
        if (sel === null) {
          if (awareness.getLocalState() !== null) {
            awareness.setLocalStateField('cursor', null)
          }
        } else {
          const anchor = yjs__WEBPACK_IMPORTED_MODULE_1__["createRelativePositionFromTypeIndex"](type, sel.index)
          const head = yjs__WEBPACK_IMPORTED_MODULE_1__["createRelativePositionFromTypeIndex"](type, sel.index + sel.length)
          if (!aw || !aw.cursor || !yjs__WEBPACK_IMPORTED_MODULE_1__["compareRelativePositions"](anchor, aw.cursor.anchor) || !yjs__WEBPACK_IMPORTED_MODULE_1__["compareRelativePositions"](head, aw.cursor.head)) {
            awareness.setLocalStateField('cursor', {
              anchor,
              head
            })
          }
        }
        // update all remote cursor locations
        awareness.getStates().forEach((aw, clientId) => {
          updateCursor(quillCursors, aw, clientId, doc, type)
        })
      }
    }
    quill.on('editor-change', this._quillObserver)
    mux(() => {
      // This indirectly initializes _negatedUsedFormats.
      // Make sure that this call this after the _quillObserver is set.
      quill.setContents(type.toDelta())
    })
    // init remote cursors
    if (quillCursors !== null && awareness) {
      awareness.getStates().forEach((aw, clientId) => {
        updateCursor(quillCursors, aw, clientId, doc, type)
      })
      awareness.on('change', this._awarenessChange)
    }
  }
  destroy () {
    this.type.unobserve(this._typeObserver)
    this.quill.off(this._quillObserver)
    if (this.awareness) {
      this.awareness.off('change', this._awarenessChange)
    }
  }
}


/***/ }),

/***/ "./node_modules/y-websocket/src/y-websocket.js":
/*!*****************************************************!*\
  !*** ./node_modules/y-websocket/src/y-websocket.js ***!
  \*****************************************************/
/*! exports provided: WebsocketProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsocketProvider", function() { return WebsocketProvider; });
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/dist/yjs.mjs");
/* harmony import */ var lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib0/broadcastchannel.js */ "./node_modules/lib0/broadcastchannel.js");
/* harmony import */ var lib0_time_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib0/time.js */ "./node_modules/lib0/time.js");
/* harmony import */ var lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib0/encoding.js */ "./node_modules/lib0/encoding.js");
/* harmony import */ var lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib0/decoding.js */ "./node_modules/lib0/decoding.js");
/* harmony import */ var y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! y-protocols/sync.js */ "./node_modules/y-protocols/sync.js");
/* harmony import */ var y_protocols_auth_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! y-protocols/auth.js */ "./node_modules/y-protocols/auth.js");
/* harmony import */ var y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! y-protocols/awareness.js */ "./node_modules/y-protocols/awareness.js");
/* harmony import */ var lib0_mutex_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lib0/mutex.js */ "./node_modules/lib0/mutex.js");
/* harmony import */ var lib0_observable_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lib0/observable.js */ "./node_modules/lib0/observable.js");
/* harmony import */ var lib0_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lib0/math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var lib0_url_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lib0/url.js */ "./node_modules/lib0/url.js");
/*
Unlike stated in the LICENSE file, it is not necessary to include the copyright notice and permission notice when you copy code from this file.
*/

/**
 * @module provider/websocket
 */

/* eslint-env browser */

 // eslint-disable-line












const messageSync = 0
const messageQueryAwareness = 3
const messageAwareness = 1
const messageAuth = 2

const reconnectTimeoutBase = 1200
const maxReconnectTimeout = 2500
// @todo - this should depend on awareness.outdatedTime
const messageReconnectTimeout = 30000

/**
 * @param {WebsocketProvider} provider
 * @param {string} reason
 */
const permissionDeniedHandler = (provider, reason) => console.warn(`Permission denied to access ${provider.url}.\n${reason}`)

/**
 * @param {WebsocketProvider} provider
 * @param {Uint8Array} buf
 * @param {boolean} emitSynced
 * @return {encoding.Encoder}
 */
const readMessage = (provider, buf, emitSynced) => {
  const decoder = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"](buf)
  const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"]()
  const messageType = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"](decoder)
  switch (messageType) {
    case messageSync: {
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"](encoder, messageSync)
      const syncMessageType = y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_5__["readSyncMessage"](decoder, encoder, provider.doc, provider)
      if (emitSynced && syncMessageType === y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_5__["messageYjsSyncStep2"] && !provider.synced) {
        provider.synced = true
      }
      break
    }
    case messageQueryAwareness:
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"](encoder, messageAwareness)
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint8Array"](encoder, y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_7__["encodeAwarenessUpdate"](provider.awareness, Array.from(provider.awareness.getStates().keys())))
      break
    case messageAwareness:
      y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_7__["applyAwarenessUpdate"](provider.awareness, lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint8Array"](decoder), provider)
      break
    case messageAuth:
      y_protocols_auth_js__WEBPACK_IMPORTED_MODULE_6__["readAuthMessage"](decoder, provider.doc, permissionDeniedHandler)
      break
    default:
      console.error('Unable to compute message')
      return encoder
  }
  return encoder
}

/**
 * @param {WebsocketProvider} provider
 */
const setupWS = provider => {
  if (provider.shouldConnect && provider.ws === null) {
    const websocket = new WebSocket(provider.url)
    websocket.binaryType = 'arraybuffer'
    provider.ws = websocket
    provider.wsconnecting = true
    provider.wsconnected = false
    provider.synced = false
    websocket.onmessage = event => {
      provider.wsLastMessageReceived = lib0_time_js__WEBPACK_IMPORTED_MODULE_2__["getUnixTime"]()
      const encoder = readMessage(provider, new Uint8Array(event.data), true)
      if (lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["length"](encoder) > 1) {
        websocket.send(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"](encoder))
      }
    }
    websocket.onclose = () => {
      provider.ws = null
      provider.wsconnecting = false
      if (provider.wsconnected) {
        provider.wsconnected = false
        provider.synced = false
        // update awareness (all users left)
        y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_7__["removeAwarenessStates"](provider.awareness, Array.from(provider.awareness.getStates().keys()), provider)
        provider.emit('status', [{
          status: 'disconnected'
        }])
      } else {
        provider.wsUnsuccessfulReconnects++
      }
      // Start with no reconnect timeout and increase timeout by
      // log10(wsUnsuccessfulReconnects).
      // The idea is to increase reconnect timeout slowly and have no reconnect
      // timeout at the beginning (log(1) = 0)
      setTimeout(setupWS, lib0_math_js__WEBPACK_IMPORTED_MODULE_10__["min"](lib0_math_js__WEBPACK_IMPORTED_MODULE_10__["log10"](provider.wsUnsuccessfulReconnects + 1) * reconnectTimeoutBase, maxReconnectTimeout), provider)
    }
    websocket.onopen = () => {
      provider.wsLastMessageReceived = lib0_time_js__WEBPACK_IMPORTED_MODULE_2__["getUnixTime"]()
      provider.wsconnecting = false
      provider.wsconnected = true
      provider.wsUnsuccessfulReconnects = 0
      provider.emit('status', [{
        status: 'connected'
      }])
      // always send sync step 1 when connected
      const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"]()
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"](encoder, messageSync)
      y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_5__["writeSyncStep1"](encoder, provider.doc)
      websocket.send(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"](encoder))
      // broadcast local awareness state
      if (provider.awareness.getLocalState() !== null) {
        const encoderAwarenessState = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"]()
        lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"](encoderAwarenessState, messageAwareness)
        lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint8Array"](encoderAwarenessState, y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_7__["encodeAwarenessUpdate"](provider.awareness, [provider.doc.clientID]))
        websocket.send(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"](encoderAwarenessState))
      }
    }
  }
}

/**
 * @param {WebsocketProvider} provider
 * @param {ArrayBuffer} buf
 */
const broadcastMessage = (provider, buf) => {
  if (provider.wsconnected) {
    // @ts-ignore We know that wsconnected = true
    provider.ws.send(buf)
  }
  if (provider.bcconnected) {
    provider.mux(() => {
      lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__["publish"](provider.url, buf)
    })
  }
}

/**
 * Websocket Provider for Yjs. Creates a websocket connection to sync the shared document.
 * The document name is attached to the provided url. I.e. the following example
 * creates a websocket connection to http://localhost:1234/my-document-name
 *
 * @example
 *   import * as Y from 'yjs'
 *   import { WebsocketProvider } from 'y-websocket'
 *   const doc = new Y.Doc()
 *   const provider = new WebsocketProvider('http://localhost:1234', 'my-document-name', doc)
 *
 * @extends {Observable<string>}
 */
class WebsocketProvider extends lib0_observable_js__WEBPACK_IMPORTED_MODULE_9__["Observable"] {
  /**
   * @param {string} serverUrl
   * @param {string} roomname
   * @param {Y.Doc} doc
   * @param {{connect:boolean,awareness:awarenessProtocol.Awareness,db:any|null,params:Object<string,string>}} conf
   */
  constructor (serverUrl, roomname, doc, { connect = true, awareness = new y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_7__["Awareness"](doc), db = null, params = {} } = /** @type {any} */ ({})) {
    super()
    // ensure that url is always ends with /
    while (serverUrl[serverUrl.length - 1] === '/') {
      serverUrl = serverUrl.slice(0, serverUrl.length - 1)
    }
    const encodedParams = lib0_url_js__WEBPACK_IMPORTED_MODULE_11__["encodeQueryParams"](params)
    this.bcChannel = serverUrl + '/' + roomname
    this.url = serverUrl + '/' + roomname + (encodedParams.length === 0 ? '' : '?' + encodedParams)
    this.roomname = roomname
    this.doc = doc
    /**
     * @type {Object<string,Object>}
     */
    this._localAwarenessState = {}
    this.db = db
    this.awareness = awareness
    this.wsconnected = false
    this.wsconnecting = false
    this.bcconnected = false
    this.wsUnsuccessfulReconnects = 0
    this.mux = lib0_mutex_js__WEBPACK_IMPORTED_MODULE_8__["createMutex"]()
    /**
     * @type {boolean}
     */
    this._synced = false
    /**
     * @type {WebSocket?}
     */
    this.ws = null
    this.wsLastMessageReceived = 0
    /**
     * Whether to connect to other peers or not
     * @type {boolean}
     */
    this.shouldConnect = connect
    /**
     * @param {ArrayBuffer} data
     */
    this._bcSubscriber = data => {
      this.mux(() => {
        const encoder = readMessage(this, new Uint8Array(data), false)
        if (lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["length"](encoder) > 1) {
          lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__["publish"](this.bcChannel, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"](encoder))
        }
      })
    }
    /**
     * Listens to Yjs updates and sends them to remote peers (ws and broadcastchannel)
     * @param {Uint8Array} update
     * @param {any} origin
     */
    this._updateHandler = (update, origin) => {
      if (origin !== this || origin === null) {
        const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"]()
        lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"](encoder, messageSync)
        y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_5__["writeUpdate"](encoder, update)
        broadcastMessage(this, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"](encoder))
      }
    }
    this.doc.on('update', this._updateHandler)
    /**
     * @param {any} changed
     * @param {any} origin
     */
    this._awarenessUpdateHandler = ({ added, updated, removed }, origin) => {
      const changedClients = added.concat(updated).concat(removed)
      const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"]()
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"](encoder, messageAwareness)
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint8Array"](encoder, y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_7__["encodeAwarenessUpdate"](awareness, changedClients))
      broadcastMessage(this, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"](encoder))
    }
    window.addEventListener('beforeunload', () => {
      y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_7__["removeAwarenessStates"](this.awareness, [doc.clientID], 'window unload')
    })
    awareness.on('change', this._awarenessUpdateHandler)
    this._checkInterval = setInterval(() => {
      if (this.wsconnected && messageReconnectTimeout < lib0_time_js__WEBPACK_IMPORTED_MODULE_2__["getUnixTime"]() - this.wsLastMessageReceived) {
        // no message received in a long time - not even your own awareness
        // updates (which are updated every 15 seconds)
        /** @type {WebSocket} */ (this.ws).close()
      }
    }, messageReconnectTimeout / 10)
    if (connect) {
      this.connect()
    }
  }

  /**
   * @type {boolean}
   */
  get synced () {
    return this._synced
  }

  set synced (state) {
    if (this._synced !== state) {
      this._synced = state
      this.emit('sync', [state])
    }
  }

  destroy () {
    clearInterval(this._checkInterval)
    this.disconnect()
    this.awareness.off('change', this._awarenessUpdateHandler)
    this.doc.off('update', this._updateHandler)
    super.destroy()
  }

  connectBc () {
    if (!this.bcconnected) {
      lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__["subscribe"](this.bcChannel, this._bcSubscriber)
      this.bcconnected = true
    }
    // send sync step1 to bc
    this.mux(() => {
      // write sync step 1
      const encoderSync = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"]()
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"](encoderSync, messageSync)
      y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_5__["writeSyncStep1"](encoderSync, this.doc)
      lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__["publish"](this.bcChannel, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"](encoderSync))
      // broadcast local state
      const encoderState = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"]()
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"](encoderState, messageSync)
      y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_5__["writeSyncStep2"](encoderState, this.doc)
      lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__["publish"](this.bcChannel, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"](encoderState))
      // write queryAwareness
      const encoderAwarenessQuery = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"]()
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"](encoderAwarenessQuery, messageQueryAwareness)
      lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__["publish"](this.bcChannel, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"](encoderAwarenessQuery))
      // broadcast local awareness state
      const encoderAwarenessState = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"]()
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"](encoderAwarenessState, messageAwareness)
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint8Array"](encoderAwarenessState, y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_7__["encodeAwarenessUpdate"](this.awareness, [this.doc.clientID]))
      lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__["publish"](this.bcChannel, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"](encoderAwarenessState))
    })
  }

  disconnectBc () {
    // broadcast message with local awareness state set to null (indicating disconnect)
    const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"]()
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"](encoder, messageAwareness)
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint8Array"](encoder, y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_7__["encodeAwarenessUpdate"](this.awareness, [this.doc.clientID], new Map()))
    broadcastMessage(this, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"](encoder))
    if (this.bcconnected) {
      lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__["unsubscribe"](this.bcChannel, this._bcSubscriber)
      this.bcconnected = false
    }
  }

  disconnect () {
    this.shouldConnect = false
    this.disconnectBc()
    if (this.ws !== null) {
      this.ws.close()
    }
  }

  connect () {
    this.shouldConnect = true
    if (!this.wsconnected && this.ws === null) {
      setupWS(this)
      this.connectBc()
    }
  }
}


/***/ }),

/***/ "./node_modules/yjs/dist/yjs.mjs":
/*!***************************************!*\
  !*** ./node_modules/yjs/dist/yjs.mjs ***!
  \***************************************/
/*! exports provided: AbstractStruct, AbstractType, Array, ContentAny, ContentBinary, ContentDeleted, ContentEmbed, ContentFormat, ContentJSON, ContentString, ContentType, Doc, GC, ID, Item, Map, PermanentUserData, RelativePosition, Snapshot, Text, Transaction, UndoManager, XmlElement, XmlFragment, XmlHook, XmlText, YArrayEvent, YEvent, YMapEvent, YXmlEvent, applyUpdate, compareIDs, compareRelativePositions, createAbsolutePositionFromRelativePosition, createDeleteSet, createDeleteSetFromStructStore, createID, createRelativePositionFromJSON, createRelativePositionFromTypeIndex, createSnapshot, decodeSnapshot, emptySnapshot, encodeSnapshot, encodeStateAsUpdate, encodeStateVector, equalSnapshots, findRootTypeKey, getState, isDeleted, isParentOf, iterateDeletedStructs, readRelativePosition, snapshot, transact, tryGc, typeListToArraySnapshot, typeMapGetSnapshot, writeRelativePosition */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractStruct", function() { return AbstractStruct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractType", function() { return AbstractType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Array", function() { return YArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentAny", function() { return ContentAny; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentBinary", function() { return ContentBinary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentDeleted", function() { return ContentDeleted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentEmbed", function() { return ContentEmbed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentFormat", function() { return ContentFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentJSON", function() { return ContentJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentString", function() { return ContentString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentType", function() { return ContentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Doc", function() { return Doc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GC", function() { return GC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID", function() { return ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Item", function() { return Item; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return YMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermanentUserData", function() { return PermanentUserData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RelativePosition", function() { return RelativePosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Snapshot", function() { return Snapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return YText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transaction", function() { return Transaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UndoManager", function() { return UndoManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XmlElement", function() { return YXmlElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XmlFragment", function() { return YXmlFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XmlHook", function() { return YXmlHook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XmlText", function() { return YXmlText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YArrayEvent", function() { return YArrayEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YEvent", function() { return YEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YMapEvent", function() { return YMapEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YXmlEvent", function() { return YXmlEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyUpdate", function() { return applyUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareIDs", function() { return compareIDs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareRelativePositions", function() { return compareRelativePositions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAbsolutePositionFromRelativePosition", function() { return createAbsolutePositionFromRelativePosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDeleteSet", function() { return createDeleteSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDeleteSetFromStructStore", function() { return createDeleteSetFromStructStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createID", function() { return createID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRelativePositionFromJSON", function() { return createRelativePositionFromJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRelativePositionFromTypeIndex", function() { return createRelativePositionFromTypeIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSnapshot", function() { return createSnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeSnapshot", function() { return decodeSnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptySnapshot", function() { return emptySnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeSnapshot", function() { return encodeSnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeStateAsUpdate", function() { return encodeStateAsUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeStateVector", function() { return encodeStateVector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalSnapshots", function() { return equalSnapshots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findRootTypeKey", function() { return findRootTypeKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getState", function() { return getState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDeleted", function() { return isDeleted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isParentOf", function() { return isParentOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iterateDeletedStructs", function() { return iterateDeletedStructs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readRelativePosition", function() { return readRelativePosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snapshot", function() { return snapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transact", function() { return transact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryGc", function() { return tryGc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeListToArraySnapshot", function() { return typeListToArraySnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeMapGetSnapshot", function() { return typeMapGetSnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeRelativePosition", function() { return writeRelativePosition; });
/* harmony import */ var lib0_array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib0/array.js */ "./node_modules/lib0/array.js");
/* harmony import */ var lib0_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib0/math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var lib0_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib0/map.js */ "./node_modules/lib0/map.js");
/* harmony import */ var lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib0/encoding.js */ "./node_modules/lib0/encoding.js");
/* harmony import */ var lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib0/decoding.js */ "./node_modules/lib0/decoding.js");
/* harmony import */ var lib0_observable_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lib0/observable.js */ "./node_modules/lib0/observable.js");
/* harmony import */ var lib0_random_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lib0/random.js */ "./node_modules/lib0/random.js");
/* harmony import */ var lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lib0/binary.js */ "./node_modules/lib0/binary.js");
/* harmony import */ var lib0_function_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lib0/function.js */ "./node_modules/lib0/function.js");
/* harmony import */ var lib0_error_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lib0/error.js */ "./node_modules/lib0/error.js");
/* harmony import */ var lib0_set_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lib0/set.js */ "./node_modules/lib0/set.js");
/* harmony import */ var lib0_time_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lib0/time.js */ "./node_modules/lib0/time.js");
/* harmony import */ var lib0_iterator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lib0/iterator.js */ "./node_modules/lib0/iterator.js");
/* harmony import */ var lib0_object_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lib0/object.js */ "./node_modules/lib0/object.js");
/* harmony import */ var lib0_buffer_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lib0/buffer.js */ "./node_modules/lib0/buffer.js");
















class DeleteItem {
  /**
   * @param {number} clock
   * @param {number} len
   */
  constructor (clock, len) {
    /**
     * @type {number}
     */
    this.clock = clock;
    /**
     * @type {number}
     */
    this.len = len;
  }
}

/**
 * We no longer maintain a DeleteStore. DeleteSet is a temporary object that is created when needed.
 * - When created in a transaction, it must only be accessed after sorting, and merging
 *   - This DeleteSet is send to other clients
 * - We do not create a DeleteSet when we send a sync message. The DeleteSet message is created directly from StructStore
 * - We read a DeleteSet as part of a sync/update message. In this case the DeleteSet is already sorted and merged.
 */
class DeleteSet {
  constructor () {
    /**
     * @type {Map<number,Array<DeleteItem>>}
     */
    this.clients = new Map();
  }
}

/**
 * Iterate over all structs that the DeleteSet gc's.
 *
 * @param {Transaction} transaction
 * @param {DeleteSet} ds
 * @param {function(GC|Item):void} f
 *
 * @function
 */
const iterateDeletedStructs = (transaction, ds, f) =>
  ds.clients.forEach((deletes, clientid) => {
    const structs = /** @type {Array<GC|Item>} */ (transaction.doc.store.clients.get(clientid));
    for (let i = 0; i < deletes.length; i++) {
      const del = deletes[i];
      iterateStructs(transaction, structs, del.clock, del.len, f);
    }
  });

/**
 * @param {Array<DeleteItem>} dis
 * @param {number} clock
 * @return {number|null}
 *
 * @private
 * @function
 */
const findIndexDS = (dis, clock) => {
  let left = 0;
  let right = dis.length - 1;
  while (left <= right) {
    const midindex = Object(lib0_math_js__WEBPACK_IMPORTED_MODULE_1__["floor"])((left + right) / 2);
    const mid = dis[midindex];
    const midclock = mid.clock;
    if (midclock <= clock) {
      if (clock < midclock + mid.len) {
        return midindex
      }
      left = midindex + 1;
    } else {
      right = midindex - 1;
    }
  }
  return null
};

/**
 * @param {DeleteSet} ds
 * @param {ID} id
 * @return {boolean}
 *
 * @private
 * @function
 */
const isDeleted = (ds, id) => {
  const dis = ds.clients.get(id.client);
  return dis !== undefined && findIndexDS(dis, id.clock) !== null
};

/**
 * @param {DeleteSet} ds
 *
 * @private
 * @function
 */
const sortAndMergeDeleteSet = ds => {
  ds.clients.forEach(dels => {
    dels.sort((a, b) => a.clock - b.clock);
    // merge items without filtering or splicing the array
    // i is the current pointer
    // j refers to the current insert position for the pointed item
    // try to merge dels[i] into dels[j-1] or set dels[j]=dels[i]
    let i, j;
    for (i = 1, j = 1; i < dels.length; i++) {
      const left = dels[j - 1];
      const right = dels[i];
      if (left.clock + left.len === right.clock) {
        left.len += right.len;
      } else {
        if (j < i) {
          dels[j] = right;
        }
        j++;
      }
    }
    dels.length = j;
  });
};

/**
 * @param {Array<DeleteSet>} dss
 * @return {DeleteSet} A fresh DeleteSet
 */
const mergeDeleteSets = dss => {
  const merged = new DeleteSet();
  for (let dssI = 0; dssI < dss.length; dssI++) {
    dss[dssI].clients.forEach((delsLeft, client) => {
      if (!merged.clients.has(client)) {
        // Write all missing keys from current ds and all following.
        // If merged already contains `client` current ds has already been added.
        /**
         * @type {Array<DeleteItem>}
         */
        const dels = delsLeft.slice();
        for (let i = dssI + 1; i < dss.length; i++) {
          Object(lib0_array_js__WEBPACK_IMPORTED_MODULE_0__["appendTo"])(dels, dss[i].clients.get(client) || []);
        }
        merged.clients.set(client, dels);
      }
    });
  }
  sortAndMergeDeleteSet(merged);
  return merged
};

/**
 * @param {DeleteSet} ds
 * @param {ID} id
 * @param {number} length
 *
 * @private
 * @function
 */
const addToDeleteSet = (ds, id, length) => {
  Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["setIfUndefined"])(ds.clients, id.client, () => []).push(new DeleteItem(id.clock, length));
};

const createDeleteSet = () => new DeleteSet();

/**
 * @param {StructStore} ss
 * @return {DeleteSet} Merged and sorted DeleteSet
 *
 * @private
 * @function
 */
const createDeleteSetFromStructStore = ss => {
  const ds = createDeleteSet();
  ss.clients.forEach((structs, client) => {
    /**
     * @type {Array<DeleteItem>}
     */
    const dsitems = [];
    for (let i = 0; i < structs.length; i++) {
      const struct = structs[i];
      if (struct.deleted) {
        const clock = struct.id.clock;
        let len = struct.length;
        if (i + 1 < structs.length) {
          for (let next = structs[i + 1]; i + 1 < structs.length && next.id.clock === clock + len && next.deleted; next = structs[++i + 1]) {
            len += next.length;
          }
        }
        dsitems.push(new DeleteItem(clock, len));
      }
    }
    if (dsitems.length > 0) {
      ds.clients.set(client, dsitems);
    }
  });
  return ds
};

/**
 * @param {encoding.Encoder} encoder
 * @param {DeleteSet} ds
 *
 * @private
 * @function
 */
const writeDeleteSet = (encoder, ds) => {
  Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, ds.clients.size);
  ds.clients.forEach((dsitems, client) => {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, client);
    const len = dsitems.length;
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, len);
    for (let i = 0; i < len; i++) {
      const item = dsitems[i];
      Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, item.clock);
      Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, item.len);
    }
  });
};

/**
 * @param {decoding.Decoder} decoder
 * @return {DeleteSet}
 *
 * @private
 * @function
 */
const readDeleteSet = decoder => {
  const ds = new DeleteSet();
  const numClients = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  for (let i = 0; i < numClients; i++) {
    const client = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    const numberOfDeletes = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    for (let i = 0; i < numberOfDeletes; i++) {
      addToDeleteSet(ds, createID(client, Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder)), Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder));
    }
  }
  return ds
};

/**
 * @param {decoding.Decoder} decoder
 * @param {Transaction} transaction
 * @param {StructStore} store
 *
 * @private
 * @function
 */
const readAndApplyDeleteSet = (decoder, transaction, store) => {
  const unappliedDS = new DeleteSet();
  const numClients = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  for (let i = 0; i < numClients; i++) {
    const client = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    const numberOfDeletes = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    const structs = store.clients.get(client) || [];
    const state = getState(store, client);
    for (let i = 0; i < numberOfDeletes; i++) {
      const clock = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
      const len = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
      if (clock < state) {
        if (state < clock + len) {
          addToDeleteSet(unappliedDS, createID(client, state), clock + len - state);
        }
        let index = findIndexSS(structs, clock);
        /**
         * We can ignore the case of GC and Delete structs, because we are going to skip them
         * @type {Item}
         */
        // @ts-ignore
        let struct = structs[index];
        // split the first item if necessary
        if (!struct.deleted && struct.id.clock < clock) {
          structs.splice(index + 1, 0, splitItem(transaction, struct, clock - struct.id.clock));
          index++; // increase we now want to use the next struct
        }
        while (index < structs.length) {
          // @ts-ignore
          struct = structs[index++];
          if (struct.id.clock < clock + len) {
            if (!struct.deleted) {
              if (clock + len < struct.id.clock + struct.length) {
                structs.splice(index, 0, splitItem(transaction, struct, clock + len - struct.id.clock));
              }
              struct.delete(transaction);
            }
          } else {
            break
          }
        }
      } else {
        addToDeleteSet(unappliedDS, createID(client, clock), len);
      }
    }
  }
  if (unappliedDS.clients.size > 0) {
    // TODO: no need for encoding+decoding ds anymore
    const unappliedDSEncoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
    writeDeleteSet(unappliedDSEncoder, unappliedDS);
    store.pendingDeleteReaders.push(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"])(Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(unappliedDSEncoder)));
  }
};

/**
 * @module Y
 */

/**
 * A Yjs instance handles the state of shared data.
 * @extends Observable<string>
 */
class Doc extends lib0_observable_js__WEBPACK_IMPORTED_MODULE_5__["Observable"] {
  /**
   * @param {Object} conf configuration
   * @param {boolean} [conf.gc] Disable garbage collection (default: gc=true)
   * @param {function(Item):boolean} [conf.gcFilter] Will be called before an Item is garbage collected. Return false to keep the Item.
   */
  constructor ({ gc = true, gcFilter = () => true } = {}) {
    super();
    this.gc = gc;
    this.gcFilter = gcFilter;
    this.clientID = Object(lib0_random_js__WEBPACK_IMPORTED_MODULE_6__["uint32"])();
    /**
     * @type {Map<string, AbstractType<YEvent>>}
     */
    this.share = new Map();
    this.store = new StructStore();
    /**
     * @type {Transaction | null}
     */
    this._transaction = null;
    /**
     * @type {Array<Transaction>}
     */
    this._transactionCleanups = [];
  }

  /**
   * Changes that happen inside of a transaction are bundled. This means that
   * the observer fires _after_ the transaction is finished and that all changes
   * that happened inside of the transaction are sent as one message to the
   * other peers.
   *
   * @param {function(Transaction):void} f The function that should be executed as a transaction
   * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
   *
   * @public
   */
  transact (f, origin = null) {
    transact(this, f, origin);
  }

  /**
   * Define a shared data type.
   *
   * Multiple calls of `y.get(name, TypeConstructor)` yield the same result
   * and do not overwrite each other. I.e.
   * `y.define(name, Y.Array) === y.define(name, Y.Array)`
   *
   * After this method is called, the type is also available on `y.share.get(name)`.
   *
   * *Best Practices:*
   * Define all types right after the Yjs instance is created and store them in a separate object.
   * Also use the typed methods `getText(name)`, `getArray(name)`, ..
   *
   * @example
   *   const y = new Y(..)
   *   const appState = {
   *     document: y.getText('document')
   *     comments: y.getArray('comments')
   *   }
   *
   * @param {string} name
   * @param {Function} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
   * @return {AbstractType<any>} The created type. Constructed with TypeConstructor
   *
   * @public
   */
  get (name, TypeConstructor = AbstractType) {
    const type = Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["setIfUndefined"])(this.share, name, () => {
      // @ts-ignore
      const t = new TypeConstructor();
      t._integrate(this, null);
      return t
    });
    const Constr = type.constructor;
    if (TypeConstructor !== AbstractType && Constr !== TypeConstructor) {
      if (Constr === AbstractType) {
        // @ts-ignore
        const t = new TypeConstructor();
        t._map = type._map;
        type._map.forEach(/** @param {Item?} n */ n => {
          for (; n !== null; n = n.left) {
            // @ts-ignore
            n.parent = t;
          }
        });
        t._start = type._start;
        for (let n = t._start; n !== null; n = n.right) {
          n.parent = t;
        }
        t._length = type._length;
        this.share.set(name, t);
        t._integrate(this, null);
        return t
      } else {
        throw new Error(`Type with the name ${name} has already been defined with a different constructor`)
      }
    }
    return type
  }

  /**
   * @template T
   * @param {string} name
   * @return {YArray<T>}
   *
   * @public
   */
  getArray (name) {
    // @ts-ignore
    return this.get(name, YArray)
  }

  /**
   * @param {string} name
   * @return {YText}
   *
   * @public
   */
  getText (name) {
    // @ts-ignore
    return this.get(name, YText)
  }

  /**
   * @param {string} name
   * @return {YMap<any>}
   *
   * @public
   */
  getMap (name) {
    // @ts-ignore
    return this.get(name, YMap)
  }

  /**
   * @param {string} name
   * @return {YXmlFragment}
   *
   * @public
   */
  getXmlFragment (name) {
    // @ts-ignore
    return this.get(name, YXmlFragment)
  }

  /**
   * Emit `destroy` event and unregister all event handlers.
   */
  destroy () {
    this.emit('destroyed', [true]);
    super.destroy();
  }

  /**
   * @param {string} eventName
   * @param {function} f
   */
  on (eventName, f) {
    super.on(eventName, f);
  }

  /**
   * @param {string} eventName
   * @param {function} f
   */
  off (eventName, f) {
    super.off(eventName, f);
  }
}

/**
 * @param {encoding.Encoder} encoder
 * @param {Array<AbstractStruct>} structs All structs by `client`
 * @param {number} client
 * @param {number} clock write structs starting with `ID(client,clock)`
 *
 * @function
 */
const writeStructs = (encoder, structs, client, clock) => {
  // write first id
  const startNewStructs = findIndexSS(structs, clock);
  // write # encoded structs
  Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, structs.length - startNewStructs);
  writeID(encoder, createID(client, clock));
  const firstStruct = structs[startNewStructs];
  // write first struct with an offset
  firstStruct.write(encoder, clock - firstStruct.id.clock, 0);
  for (let i = startNewStructs + 1; i < structs.length; i++) {
    structs[i].write(encoder, 0, 0);
  }
};

/**
 * @param {decoding.Decoder} decoder
 * @param {number} numOfStructs
 * @param {ID} nextID
 * @return {Array<GCRef|ItemRef>}
 *
 * @private
 * @function
 */
const readStructRefs = (decoder, numOfStructs, nextID) => {
  /**
   * @type {Array<GCRef|ItemRef>}
   */
  const refs = [];
  for (let i = 0; i < numOfStructs; i++) {
    const info = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readUint8"])(decoder);
    const ref = (lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BITS5"] & info) === 0 ? new GCRef(decoder, nextID, info) : new ItemRef(decoder, nextID, info);
    nextID = createID(nextID.client, nextID.clock + ref.length);
    refs.push(ref);
  }
  return refs
};

/**
 * @param {encoding.Encoder} encoder
 * @param {StructStore} store
 * @param {Map<number,number>} _sm
 *
 * @private
 * @function
 */
const writeClientsStructs = (encoder, store, _sm) => {
  // we filter all valid _sm entries into sm
  const sm = new Map();
  _sm.forEach((clock, client) => {
    // only write if new structs are available
    if (getState(store, client) > clock) {
      sm.set(client, clock);
    }
  });
  getStateVector(store).forEach((clock, client) => {
    if (!_sm.has(client)) {
      sm.set(client, 0);
    }
  });
  // write # states that were updated
  Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, sm.size);
  sm.forEach((clock, client) => {
    // @ts-ignore
    writeStructs(encoder, store.clients.get(client), client, clock);
  });
};

/**
 * @param {decoding.Decoder} decoder The decoder object to read data from.
 * @return {Map<number,Array<GCRef|ItemRef>>}
 *
 * @private
 * @function
 */
const readClientsStructRefs = decoder => {
  /**
   * @type {Map<number,Array<GCRef|ItemRef>>}
   */
  const clientRefs = new Map();
  const numOfStateUpdates = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  for (let i = 0; i < numOfStateUpdates; i++) {
    const numberOfStructs = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    const nextID = readID(decoder);
    const refs = readStructRefs(decoder, numberOfStructs, nextID);
    clientRefs.set(nextID.client, refs);
  }
  return clientRefs
};

/**
 * Resume computing structs generated by struct readers.
 *
 * While there is something to do, we integrate structs in this order
 * 1. top element on stack, if stack is not empty
 * 2. next element from current struct reader (if empty, use next struct reader)
 *
 * If struct causally depends on another struct (ref.missing), we put next reader of
 * `ref.id.client` on top of stack.
 *
 * At some point we find a struct that has no causal dependencies,
 * then we start emptying the stack.
 *
 * It is not possible to have circles: i.e. struct1 (from client1) depends on struct2 (from client2)
 * depends on struct3 (from client1). Therefore the max stack size is eqaul to `structReaders.length`.
 *
 * This method is implemented in a way so that we can resume computation if this update
 * causally depends on another update.
 *
 * @param {Transaction} transaction
 * @param {StructStore} store
 *
 * @private
 * @function
 */
const resumeStructIntegration = (transaction, store) => {
  const stack = store.pendingStack;
  const clientsStructRefs = store.pendingClientsStructRefs;
  // iterate over all struct readers until we are done
  while (stack.length !== 0 || clientsStructRefs.size !== 0) {
    if (stack.length === 0) {
      // take any first struct from clientsStructRefs and put it on the stack
      const [client, structRefs] = clientsStructRefs.entries().next().value;
      stack.push(structRefs.refs[structRefs.i++]);
      if (structRefs.refs.length === structRefs.i) {
        clientsStructRefs.delete(client);
      }
    }
    const ref = stack[stack.length - 1];
    const m = ref._missing;
    const client = ref.id.client;
    const localClock = getState(store, client);
    const offset = ref.id.clock < localClock ? localClock - ref.id.clock : 0;
    if (ref.id.clock + offset !== localClock) {
      // A previous message from this client is missing
      // check if there is a pending structRef with a smaller clock and switch them
      const structRefs = clientsStructRefs.get(client);
      if (structRefs !== undefined) {
        const r = structRefs.refs[structRefs.i];
        if (r.id.clock < ref.id.clock) {
          // put ref with smaller clock on stack instead and continue
          structRefs.refs[structRefs.i] = ref;
          stack[stack.length - 1] = r;
          // sort the set because this approach might bring the list out of order
          structRefs.refs = structRefs.refs.slice(structRefs.i).sort((r1, r2) => r1.id.clock - r2.id.clock);
          structRefs.i = 0;
          continue
        }
      }
      // wait until missing struct is available
      return
    }
    while (m.length > 0) {
      const missing = m[m.length - 1];
      if (getState(store, missing.client) <= missing.clock) {
        const client = missing.client;
        // get the struct reader that has the missing struct
        const structRefs = clientsStructRefs.get(client);
        if (structRefs === undefined) {
          // This update message causally depends on another update message.
          return
        }
        stack.push(structRefs.refs[structRefs.i++]);
        if (structRefs.i === structRefs.refs.length) {
          clientsStructRefs.delete(client);
        }
        break
      }
      ref._missing.pop();
    }
    if (m.length === 0) {
      if (offset < ref.length) {
        ref.toStruct(transaction, store, offset).integrate(transaction);
      }
      stack.pop();
    }
  }
};

/**
 * @param {Transaction} transaction
 * @param {StructStore} store
 *
 * @private
 * @function
 */
const tryResumePendingDeleteReaders = (transaction, store) => {
  const pendingReaders = store.pendingDeleteReaders;
  store.pendingDeleteReaders = [];
  for (let i = 0; i < pendingReaders.length; i++) {
    readAndApplyDeleteSet(pendingReaders[i], transaction, store);
  }
};

/**
 * @param {encoding.Encoder} encoder
 * @param {Transaction} transaction
 *
 * @private
 * @function
 */
const writeStructsFromTransaction = (encoder, transaction) => writeClientsStructs(encoder, transaction.doc.store, transaction.beforeState);

/**
 * @param {StructStore} store
 * @param {Map<number, Array<GCRef|ItemRef>>} clientsStructsRefs
 *
 * @private
 * @function
 */
const mergeReadStructsIntoPendingReads = (store, clientsStructsRefs) => {
  const pendingClientsStructRefs = store.pendingClientsStructRefs;
  for (const [client, structRefs] of clientsStructsRefs) {
    const pendingStructRefs = pendingClientsStructRefs.get(client);
    if (pendingStructRefs === undefined) {
      pendingClientsStructRefs.set(client, { refs: structRefs, i: 0 });
    } else {
      // merge into existing structRefs
      const merged = pendingStructRefs.i > 0 ? pendingStructRefs.refs.slice(pendingStructRefs.i) : pendingStructRefs.refs;
      for (let i = 0; i < structRefs.length; i++) {
        merged.push(structRefs[i]);
      }
      pendingStructRefs.i = 0;
      pendingStructRefs.refs = merged.sort((r1, r2) => r1.id.clock - r2.id.clock);
    }
  }
};

/**
 * Read the next Item in a Decoder and fill this Item with the read data.
 *
 * This is called when data is received from a remote peer.
 *
 * @param {decoding.Decoder} decoder The decoder object to read data from.
 * @param {Transaction} transaction
 * @param {StructStore} store
 *
 * @private
 * @function
 */
const readStructs = (decoder, transaction, store) => {
  const clientsStructRefs = readClientsStructRefs(decoder);
  mergeReadStructsIntoPendingReads(store, clientsStructRefs);
  resumeStructIntegration(transaction, store);
  tryResumePendingDeleteReaders(transaction, store);
};

/**
 * Read and apply a document update.
 *
 * This function has the same effect as `applyUpdate` but accepts an decoder.
 *
 * @param {decoding.Decoder} decoder
 * @param {Doc} ydoc
 * @param {any} [transactionOrigin] This will be stored on `transaction.origin` and `.on('update', (update, origin))`
 *
 * @function
 */
const readUpdate = (decoder, ydoc, transactionOrigin) =>
  transact(ydoc, transaction => {
    readStructs(decoder, transaction, ydoc.store);
    readAndApplyDeleteSet(decoder, transaction, ydoc.store);
  }, transactionOrigin, false);

/**
 * Apply a document update created by, for example, `y.on('update', update => ..)` or `update = encodeStateAsUpdate()`.
 *
 * This function has the same effect as `readUpdate` but accepts an Uint8Array instead of a Decoder.
 *
 * @param {Doc} ydoc
 * @param {Uint8Array} update
 * @param {any} [transactionOrigin] This will be stored on `transaction.origin` and `.on('update', (update, origin))`
 *
 * @function
 */
const applyUpdate = (ydoc, update, transactionOrigin) =>
  readUpdate(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"])(update), ydoc, transactionOrigin);

/**
 * Write all the document as a single update message. If you specify the state of the remote client (`targetStateVector`) it will
 * only write the operations that are missing.
 *
 * @param {encoding.Encoder} encoder
 * @param {Doc} doc
 * @param {Map<number,number>} [targetStateVector] The state of the target that receives the update. Leave empty to write all known structs
 *
 * @function
 */
const writeStateAsUpdate = (encoder, doc, targetStateVector = new Map()) => {
  writeClientsStructs(encoder, doc.store, targetStateVector);
  writeDeleteSet(encoder, createDeleteSetFromStructStore(doc.store));
};

/**
 * Write all the document as a single update message that can be applied on the remote document. If you specify the state of the remote client (`targetState`) it will
 * only write the operations that are missing.
 *
 * Use `writeStateAsUpdate` instead if you are working with lib0/encoding.js#Encoder
 *
 * @param {Doc} doc
 * @param {Uint8Array} [encodedTargetStateVector] The state of the target that receives the update. Leave empty to write all known structs
 * @return {Uint8Array}
 *
 * @function
 */
const encodeStateAsUpdate = (doc, encodedTargetStateVector) => {
  const encoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
  const targetStateVector = encodedTargetStateVector == null ? new Map() : decodeStateVector(encodedTargetStateVector);
  writeStateAsUpdate(encoder, doc, targetStateVector);
  return Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(encoder)
};

/**
 * Read state vector from Decoder and return as Map
 *
 * @param {decoding.Decoder} decoder
 * @return {Map<number,number>} Maps `client` to the number next expected `clock` from that client.
 *
 * @function
 */
const readStateVector = decoder => {
  const ss = new Map();
  const ssLength = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  for (let i = 0; i < ssLength; i++) {
    const client = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    const clock = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    ss.set(client, clock);
  }
  return ss
};

/**
 * Read decodedState and return State as Map.
 *
 * @param {Uint8Array} decodedState
 * @return {Map<number,number>} Maps `client` to the number next expected `clock` from that client.
 *
 * @function
 */
const decodeStateVector = decodedState => readStateVector(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"])(decodedState));

/**
 * Write State Vector to `lib0/encoding.js#Encoder`.
 *
 * @param {encoding.Encoder} encoder
 * @param {Map<number,number>} sv
 * @function
 */
const writeStateVector = (encoder, sv) => {
  Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, sv.size);
  sv.forEach((clock, client) => {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, client);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, clock);
  });
  return encoder
};

/**
 * Write State Vector to `lib0/encoding.js#Encoder`.
 *
 * @param {encoding.Encoder} encoder
 * @param {Doc} doc
 *
 * @function
 */
const writeDocumentStateVector = (encoder, doc) => writeStateVector(encoder, getStateVector(doc.store));

/**
 * Encode State as Uint8Array.
 *
 * @param {Doc} doc
 * @return {Uint8Array}
 *
 * @function
 */
const encodeStateVector = doc => {
  const encoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
  writeDocumentStateVector(encoder, doc);
  return Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(encoder)
};

/**
 * General event handler implementation.
 *
 * @template ARG0, ARG1
 *
 * @private
 */
class EventHandler {
  constructor () {
    /**
     * @type {Array<function(ARG0, ARG1):void>}
     */
    this.l = [];
  }
}

/**
 * @template ARG0,ARG1
 * @returns {EventHandler<ARG0,ARG1>}
 *
 * @private
 * @function
 */
const createEventHandler = () => new EventHandler();

/**
 * Adds an event listener that is called when
 * {@link EventHandler#callEventListeners} is called.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {function(ARG0,ARG1):void} f The event handler.
 *
 * @private
 * @function
 */
const addEventHandlerListener = (eventHandler, f) =>
  eventHandler.l.push(f);

/**
 * Removes an event listener.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {function(ARG0,ARG1):void} f The event handler that was added with
 *                     {@link EventHandler#addEventListener}
 *
 * @private
 * @function
 */
const removeEventHandlerListener = (eventHandler, f) => {
  eventHandler.l = eventHandler.l.filter(g => f !== g);
};

/**
 * Call all event listeners that were added via
 * {@link EventHandler#addEventListener}.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {ARG0} arg0
 * @param {ARG1} arg1
 *
 * @private
 * @function
 */
const callEventHandlerListeners = (eventHandler, arg0, arg1) =>
  Object(lib0_function_js__WEBPACK_IMPORTED_MODULE_8__["callAll"])(eventHandler.l, [arg0, arg1]);

class ID {
  /**
   * @param {number} client client id
   * @param {number} clock unique per client id, continuous number
   */
  constructor (client, clock) {
    /**
     * Client id
     * @type {number}
     */
    this.client = client;
    /**
     * unique per client id, continuous number
     * @type {number}
     */
    this.clock = clock;
  }
}

/**
 * @param {ID | null} a
 * @param {ID | null} b
 * @return {boolean}
 *
 * @function
 */
const compareIDs = (a, b) => a === b || (a !== null && b !== null && a.client === b.client && a.clock === b.clock);

/**
 * @param {number} client
 * @param {number} clock
 *
 * @private
 * @function
 */
const createID = (client, clock) => new ID(client, clock);

/**
 * @param {encoding.Encoder} encoder
 * @param {ID} id
 *
 * @private
 * @function
 */
const writeID = (encoder, id) => {
  Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, id.client);
  Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, id.clock);
};

/**
 * Read ID.
 * * If first varUint read is 0xFFFFFF a RootID is returned.
 * * Otherwise an ID is returned
 *
 * @param {decoding.Decoder} decoder
 * @return {ID}
 *
 * @private
 * @function
 */
const readID = decoder =>
  createID(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder), Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder));

/**
 * The top types are mapped from y.share.get(keyname) => type.
 * `type` does not store any information about the `keyname`.
 * This function finds the correct `keyname` for `type` and throws otherwise.
 *
 * @param {AbstractType<any>} type
 * @return {string}
 *
 * @private
 * @function
 */
const findRootTypeKey = type => {
  // @ts-ignore _y must be defined, otherwise unexpected case
  for (const [key, value] of type.doc.share) {
    if (value === type) {
      return key
    }
  }
  throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
};

/**
 * Check if `parent` is a parent of `child`.
 *
 * @param {AbstractType<any>} parent
 * @param {Item|null} child
 * @return {Boolean} Whether `parent` is a parent of `child`.
 *
 * @private
 * @function
 */
const isParentOf = (parent, child) => {
  while (child !== null) {
    if (child.parent === parent) {
      return true
    }
    child = child.parent._item;
  }
  return false
};

class PermanentUserData {
  /**
   * @param {Doc} doc
   * @param {YMap<any>} [storeType]
   */
  constructor (doc, storeType = doc.getMap('users')) {
    /**
     * @type {Map<string,DeleteSet>}
     */
    const dss = new Map();
    this.yusers = storeType;
    this.doc = doc;
    /**
     * Maps from clientid to userDescription
     *
     * @type {Map<number,string>}
     */
    this.clients = new Map();
    this.dss = dss;
    /**
     * @param {YMap<any>} user
     * @param {string} userDescription
     */
    const initUser = (user, userDescription) => {
      /**
       * @type {YArray<Uint8Array>}
       */
      const ds = user.get('ds');
      const ids = user.get('ids');
      const addClientId = /** @param {number} clientid */ clientid => this.clients.set(clientid, userDescription);
      ds.observe(/** @param {YArrayEvent<any>} event */ event => {
        event.changes.added.forEach(item => {
          item.content.getContent().forEach(encodedDs => {
            if (encodedDs instanceof Uint8Array) {
              this.dss.set(userDescription, mergeDeleteSets([this.dss.get(userDescription) || createDeleteSet(), readDeleteSet(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"])(encodedDs))]));
            }
          });
        });
      });
      this.dss.set(userDescription, mergeDeleteSets(ds.map(encodedDs => readDeleteSet(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"])(encodedDs)))));
      ids.observe(/** @param {YArrayEvent<any>} event */ event =>
        event.changes.added.forEach(item => item.content.getContent().forEach(addClientId))
      );
      ids.forEach(addClientId);
    };
    // observe users
    storeType.observe(event => {
      event.keysChanged.forEach(userDescription =>
        initUser(storeType.get(userDescription), userDescription)
      );
    });
    // add intial data
    storeType.forEach(initUser);
  }

  /**
   * @param {Doc} doc
   * @param {number} clientid
   * @param {string} userDescription
   * @param {Object} [conf]
   * @param {function(Transaction, DeleteSet):boolean} [conf.filter]
   */
  setUserMapping (doc, clientid, userDescription, { filter = () => true } = {}) {
    const users = this.yusers;
    let user = users.get(userDescription);
    if (!user) {
      user = new YMap();
      user.set('ids', new YArray());
      user.set('ds', new YArray());
      users.set(userDescription, user);
    }
    user.get('ids').push([clientid]);
    users.observe(event => {
      setTimeout(() => {
        const userOverwrite = users.get(userDescription);
        if (userOverwrite !== user) {
          // user was overwritten, port all data over to the next user object
          // @todo Experiment with Y.Sets here
          user = userOverwrite;
          // @todo iterate over old type
          this.clients.forEach((_userDescription, clientid) => {
            if (userDescription === _userDescription) {
              user.get('ids').push([clientid]);
            }
          });
          const encoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
          const ds = this.dss.get(userDescription);
          if (ds) {
            writeDeleteSet(encoder, ds);
            user.get('ds').push([Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(encoder)]);
          }
        }
      }, 0);
    });
    doc.on('afterTransaction', /** @param {Transaction} transaction */ transaction => {
      setTimeout(() => {
        const yds = user.get('ds');
        const ds = transaction.deleteSet;
        if (transaction.local && ds.clients.size > 0 && filter(transaction, ds)) {
          const encoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
          writeDeleteSet(encoder, ds);
          yds.push([Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(encoder)]);
        }
      });
    });
  }

  /**
   * @param {number} clientid
   * @return {any}
   */
  getUserByClientId (clientid) {
    return this.clients.get(clientid) || null
  }

  /**
   * @param {ID} id
   * @return {string | null}
   */
  getUserByDeletedId (id) {
    for (const [userDescription, ds] of this.dss) {
      if (isDeleted(ds, id)) {
        return userDescription
      }
    }
    return null
  }
}

/**
 * A relative position is based on the Yjs model and is not affected by document changes.
 * E.g. If you place a relative position before a certain character, it will always point to this character.
 * If you place a relative position at the end of a type, it will always point to the end of the type.
 *
 * A numeric position is often unsuited for user selections, because it does not change when content is inserted
 * before or after.
 *
 * ```Insert(0, 'x')('a|bc') = 'xa|bc'``` Where | is the relative position.
 *
 * One of the properties must be defined.
 *
 * @example
 *   // Current cursor position is at position 10
 *   const relativePosition = createRelativePositionFromIndex(yText, 10)
 *   // modify yText
 *   yText.insert(0, 'abc')
 *   yText.delete(3, 10)
 *   // Compute the cursor position
 *   const absolutePosition = createAbsolutePositionFromRelativePosition(y, relativePosition)
 *   absolutePosition.type === yText // => true
 *   console.log('cursor location is ' + absolutePosition.index) // => cursor location is 3
 *
 */
class RelativePosition {
  /**
   * @param {ID|null} type
   * @param {string|null} tname
   * @param {ID|null} item
   */
  constructor (type, tname, item) {
    /**
     * @type {ID|null}
     */
    this.type = type;
    /**
     * @type {string|null}
     */
    this.tname = tname;
    /**
     * @type {ID | null}
     */
    this.item = item;
  }
}

/**
 * @param {any} json
 * @return {RelativePosition}
 *
 * @function
 */
const createRelativePositionFromJSON = json => new RelativePosition(json.type == null ? null : createID(json.type.client, json.type.clock), json.tname || null, json.item == null ? null : createID(json.item.client, json.item.clock));

class AbsolutePosition {
  /**
   * @param {AbstractType<any>} type
   * @param {number} index
   */
  constructor (type, index) {
    /**
     * @type {AbstractType<any>}
     */
    this.type = type;
    /**
     * @type {number}
     */
    this.index = index;
  }
}

/**
 * @param {AbstractType<any>} type
 * @param {number} index
 *
 * @function
 */
const createAbsolutePosition = (type, index) => new AbsolutePosition(type, index);

/**
 * @param {AbstractType<any>} type
 * @param {ID|null} item
 *
 * @function
 */
const createRelativePosition = (type, item) => {
  let typeid = null;
  let tname = null;
  if (type._item === null) {
    tname = findRootTypeKey(type);
  } else {
    typeid = type._item.id;
  }
  return new RelativePosition(typeid, tname, item)
};

/**
 * Create a relativePosition based on a absolute position.
 *
 * @param {AbstractType<any>} type The base type (e.g. YText or YArray).
 * @param {number} index The absolute position.
 * @return {RelativePosition}
 *
 * @function
 */
const createRelativePositionFromTypeIndex = (type, index) => {
  let t = type._start;
  while (t !== null) {
    if (!t.deleted && t.countable) {
      if (t.length > index) {
        // case 1: found position somewhere in the linked list
        return createRelativePosition(type, createID(t.id.client, t.id.clock + index))
      }
      index -= t.length;
    }
    t = t.right;
  }
  return createRelativePosition(type, null)
};

/**
 * @param {encoding.Encoder} encoder
 * @param {RelativePosition} rpos
 *
 * @function
 */
const writeRelativePosition = (encoder, rpos) => {
  const { type, tname, item } = rpos;
  if (item !== null) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, 0);
    writeID(encoder, item);
  } else if (tname !== null) {
    // case 2: found position at the end of the list and type is stored in y.share
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeUint8"])(encoder, 1);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, tname);
  } else if (type !== null) {
    // case 3: found position at the end of the list and type is attached to an item
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeUint8"])(encoder, 2);
    writeID(encoder, type);
  } else {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
  }
  return encoder
};

/**
 * @param {decoding.Decoder} decoder
 * @return {RelativePosition|null}
 *
 * @function
 */
const readRelativePosition = decoder => {
  let type = null;
  let tname = null;
  let itemID = null;
  switch (Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder)) {
    case 0:
      // case 1: found position somewhere in the linked list
      itemID = readID(decoder);
      break
    case 1:
      // case 2: found position at the end of the list and type is stored in y.share
      tname = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder);
      break
    case 2: {
      // case 3: found position at the end of the list and type is attached to an item
      type = readID(decoder);
    }
  }
  return new RelativePosition(type, tname, itemID)
};

/**
 * @param {RelativePosition} rpos
 * @param {Doc} doc
 * @return {AbsolutePosition|null}
 *
 * @function
 */
const createAbsolutePositionFromRelativePosition = (rpos, doc) => {
  const store = doc.store;
  const rightID = rpos.item;
  const typeID = rpos.type;
  const tname = rpos.tname;
  let type = null;
  let index = 0;
  if (rightID !== null) {
    if (getState(store, rightID.client) <= rightID.clock) {
      return null
    }
    const res = followRedone(store, rightID);
    const right = res.item;
    if (!(right instanceof Item)) {
      return null
    }
    type = right.parent;
    if (type._item === null || !type._item.deleted) {
      index = right.deleted || !right.countable ? 0 : res.diff;
      let n = right.left;
      while (n !== null) {
        if (!n.deleted && n.countable) {
          index += n.length;
        }
        n = n.left;
      }
    }
  } else {
    if (tname !== null) {
      type = doc.get(tname);
    } else if (typeID !== null) {
      if (getState(store, typeID.client) <= typeID.clock) {
        // type does not exist yet
        return null
      }
      const { item } = followRedone(store, typeID);
      if (item instanceof Item && item.content instanceof ContentType) {
        type = item.content.type;
      } else {
        // struct is garbage collected
        return null
      }
    } else {
      throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
    }
    index = type._length;
  }
  return createAbsolutePosition(type, index)
};

/**
 * @param {RelativePosition|null} a
 * @param {RelativePosition|null} b
 *
 * @function
 */
const compareRelativePositions = (a, b) => a === b || (
  a !== null && b !== null && a.tname === b.tname && compareIDs(a.item, b.item) && compareIDs(a.type, b.type)
);

class Snapshot {
  /**
   * @param {DeleteSet} ds
   * @param {Map<number,number>} sv state map
   */
  constructor (ds, sv) {
    /**
     * @type {DeleteSet}
     */
    this.ds = ds;
    /**
     * State Map
     * @type {Map<number,number>}
     */
    this.sv = sv;
  }
}

/**
 * @param {Snapshot} snap1
 * @param {Snapshot} snap2
 * @return {boolean}
 */
const equalSnapshots = (snap1, snap2) => {
  const ds1 = snap1.ds.clients;
  const ds2 = snap2.ds.clients;
  const sv1 = snap1.sv;
  const sv2 = snap2.sv;
  if (sv1.size !== sv2.size || ds1.size !== ds2.size) {
    return false
  }
  for (const [key, value] of sv1) {
    if (sv2.get(key) !== value) {
      return false
    }
  }
  for (const [client, dsitems1] of ds1) {
    const dsitems2 = ds2.get(client) || [];
    if (dsitems1.length !== dsitems2.length) {
      return false
    }
    for (let i = 0; i < dsitems1.length; i++) {
      const dsitem1 = dsitems1[i];
      const dsitem2 = dsitems2[i];
      if (dsitem1.clock !== dsitem2.clock || dsitem1.len !== dsitem2.len) {
        return false
      }
    }
  }
  return true
};

/**
 * @param {Snapshot} snapshot
 * @return {Uint8Array}
 */
const encodeSnapshot = snapshot => {
  const encoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
  writeDeleteSet(encoder, snapshot.ds);
  writeStateVector(encoder, snapshot.sv);
  return Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(encoder)
};

/**
 * @param {Uint8Array} buf
 * @return {Snapshot}
 */
const decodeSnapshot = buf => {
  const decoder = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"])(buf);
  return new Snapshot(readDeleteSet(decoder), readStateVector(decoder))
};

/**
 * @param {DeleteSet} ds
 * @param {Map<number,number>} sm
 * @return {Snapshot}
 */
const createSnapshot = (ds, sm) => new Snapshot(ds, sm);

const emptySnapshot = createSnapshot(createDeleteSet(), new Map());

/**
 * @param {Doc} doc
 * @return {Snapshot}
 */
const snapshot = doc => createSnapshot(createDeleteSetFromStructStore(doc.store), getStateVector(doc.store));

/**
 * @param {Item} item
 * @param {Snapshot|undefined} snapshot
 *
 * @protected
 * @function
 */
const isVisible = (item, snapshot) => snapshot === undefined ? !item.deleted : (
  snapshot.sv.has(item.id.client) && (snapshot.sv.get(item.id.client) || 0) > item.id.clock && !isDeleted(snapshot.ds, item.id)
);

/**
 * @param {Transaction} transaction
 * @param {Snapshot} snapshot
 */
const splitSnapshotAffectedStructs = (transaction, snapshot) => {
  const meta = Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["setIfUndefined"])(transaction.meta, splitSnapshotAffectedStructs, lib0_set_js__WEBPACK_IMPORTED_MODULE_10__["create"]);
  const store = transaction.doc.store;
  // check if we already split for this snapshot
  if (!meta.has(snapshot)) {
    snapshot.sv.forEach((clock, client) => {
      if (clock < getState(store, client)) {
        getItemCleanStart(transaction, createID(client, clock));
      }
    });
    iterateDeletedStructs(transaction, snapshot.ds, item => {});
    meta.add(snapshot);
  }
};

class StructStore {
  constructor () {
    /**
     * @type {Map<number,Array<GC|Item>>}
     */
    this.clients = new Map();
    /**
     * Store incompleted struct reads here
     * `i` denotes to the next read operation
     * We could shift the array of refs instead, but shift is incredible
     * slow in Chrome for arrays with more than 100k elements
     * @see tryResumePendingStructRefs
     * @type {Map<number,{i:number,refs:Array<GCRef|ItemRef>}>}
     */
    this.pendingClientsStructRefs = new Map();
    /**
     * Stack of pending structs waiting for struct dependencies
     * Maximum length of stack is structReaders.size
     * @type {Array<GCRef|ItemRef>}
     */
    this.pendingStack = [];
    /**
     * @type {Array<decoding.Decoder>}
     */
    this.pendingDeleteReaders = [];
  }
}

/**
 * Return the states as a Map<client,clock>.
 * Note that clock refers to the next expected clock id.
 *
 * @param {StructStore} store
 * @return {Map<number,number>}
 *
 * @public
 * @function
 */
const getStateVector = store => {
  const sm = new Map();
  store.clients.forEach((structs, client) => {
    const struct = structs[structs.length - 1];
    sm.set(client, struct.id.clock + struct.length);
  });
  return sm
};

/**
 * @param {StructStore} store
 * @param {number} client
 * @return {number}
 *
 * @public
 * @function
 */
const getState = (store, client) => {
  const structs = store.clients.get(client);
  if (structs === undefined) {
    return 0
  }
  const lastStruct = structs[structs.length - 1];
  return lastStruct.id.clock + lastStruct.length
};

/**
 * @param {StructStore} store
 * @param {GC|Item} struct
 *
 * @private
 * @function
 */
const addStruct = (store, struct) => {
  let structs = store.clients.get(struct.id.client);
  if (structs === undefined) {
    structs = [];
    store.clients.set(struct.id.client, structs);
  } else {
    const lastStruct = structs[structs.length - 1];
    if (lastStruct.id.clock + lastStruct.length !== struct.id.clock) {
      throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
    }
  }
  structs.push(struct);
};

/**
 * Perform a binary search on a sorted array
 * @param {Array<any>} structs
 * @param {number} clock
 * @return {number}
 *
 * @private
 * @function
 */
const findIndexSS = (structs, clock) => {
  let left = 0;
  let right = structs.length - 1;
  while (left <= right) {
    const midindex = Object(lib0_math_js__WEBPACK_IMPORTED_MODULE_1__["floor"])((left + right) / 2);
    const mid = structs[midindex];
    const midclock = mid.id.clock;
    if (midclock <= clock) {
      if (clock < midclock + mid.length) {
        return midindex
      }
      left = midindex + 1;
    } else {
      right = midindex - 1;
    }
  }
  // Always check state before looking for a struct in StructStore
  // Therefore the case of not finding a struct is unexpected
  throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
};

/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {StructStore} store
 * @param {ID} id
 * @return {GC|Item}
 *
 * @private
 * @function
 */
const find = (store, id) => {
  /**
   * @type {Array<GC|Item>}
   */
  // @ts-ignore
  const structs = store.clients.get(id.client);
  return structs[findIndexSS(structs, id.clock)]
};

/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {StructStore} store
 * @param {ID} id
 * @return {Item}
 *
 * @private
 * @function
 */
// @ts-ignore
const getItem = (store, id) => find(store, id);

/**
 * @param {Transaction} transaction
 * @param {Array<Item|GC>} structs
 * @param {number} clock
 */
const findIndexCleanStart = (transaction, structs, clock) => {
  const index = findIndexSS(structs, clock);
  const struct = structs[index];
  if (struct.id.clock < clock && struct instanceof Item) {
    structs.splice(index + 1, 0, splitItem(transaction, struct, clock - struct.id.clock));
    return index + 1
  }
  return index
};

/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {Transaction} transaction
 * @param {ID} id
 * @return {Item}
 *
 * @private
 * @function
 */
const getItemCleanStart = (transaction, id) => {
  const structs = /** @type {Array<Item>} */ (transaction.doc.store.clients.get(id.client));
  return structs[findIndexCleanStart(transaction, structs, id.clock)]
};

/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {Transaction} transaction
 * @param {StructStore} store
 * @param {ID} id
 * @return {Item}
 *
 * @private
 * @function
 */
const getItemCleanEnd = (transaction, store, id) => {
  /**
   * @type {Array<Item>}
   */
  // @ts-ignore
  const structs = store.clients.get(id.client);
  const index = findIndexSS(structs, id.clock);
  const struct = structs[index];
  if (id.clock !== struct.id.clock + struct.length - 1 && struct.constructor !== GC) {
    structs.splice(index + 1, 0, splitItem(transaction, struct, id.clock - struct.id.clock + 1));
  }
  return struct
};

/**
 * Replace `item` with `newitem` in store
 * @param {StructStore} store
 * @param {GC|Item} struct
 * @param {GC|Item} newStruct
 *
 * @private
 * @function
 */
const replaceStruct = (store, struct, newStruct) => {
  const structs = /** @type {Array<GC|Item>} */ (store.clients.get(struct.id.client));
  structs[findIndexSS(structs, struct.id.clock)] = newStruct;
};

/**
 * Iterate over a range of structs
 *
 * @param {Transaction} transaction
 * @param {Array<Item|GC>} structs
 * @param {number} clockStart Inclusive start
 * @param {number} len
 * @param {function(GC|Item):void} f
 *
 * @function
 */
const iterateStructs = (transaction, structs, clockStart, len, f) => {
  if (len === 0) {
    return
  }
  const clockEnd = clockStart + len;
  let index = findIndexCleanStart(transaction, structs, clockStart);
  let struct;
  do {
    struct = structs[index++];
    if (clockEnd < struct.id.clock + struct.length) {
      findIndexCleanStart(transaction, structs, clockEnd);
    }
    f(struct);
  } while (index < structs.length && structs[index].id.clock < clockEnd)
};

/**
 * A transaction is created for every change on the Yjs model. It is possible
 * to bundle changes on the Yjs model in a single transaction to
 * minimize the number on messages sent and the number of observer calls.
 * If possible the user of this library should bundle as many changes as
 * possible. Here is an example to illustrate the advantages of bundling:
 *
 * @example
 * const map = y.define('map', YMap)
 * // Log content when change is triggered
 * map.observe(() => {
 *   console.log('change triggered')
 * })
 * // Each change on the map type triggers a log message:
 * map.set('a', 0) // => "change triggered"
 * map.set('b', 0) // => "change triggered"
 * // When put in a transaction, it will trigger the log after the transaction:
 * y.transact(() => {
 *   map.set('a', 1)
 *   map.set('b', 1)
 * }) // => "change triggered"
 *
 * @public
 */
class Transaction {
  /**
   * @param {Doc} doc
   * @param {any} origin
   * @param {boolean} local
   */
  constructor (doc, origin, local) {
    /**
     * The Yjs instance.
     * @type {Doc}
     */
    this.doc = doc;
    /**
     * Describes the set of deleted items by ids
     * @type {DeleteSet}
     */
    this.deleteSet = new DeleteSet();
    /**
     * Holds the state before the transaction started.
     * @type {Map<Number,Number>}
     */
    this.beforeState = getStateVector(doc.store);
    /**
     * Holds the state after the transaction.
     * @type {Map<Number,Number>}
     */
    this.afterState = new Map();
    /**
     * All types that were directly modified (property added or child
     * inserted/deleted). New types are not included in this Set.
     * Maps from type to parentSubs (`item.parentSub = null` for YArray)
     * @type {Map<AbstractType<YEvent>,Set<String|null>>}
     */
    this.changed = new Map();
    /**
     * Stores the events for the types that observe also child elements.
     * It is mainly used by `observeDeep`.
     * @type {Map<AbstractType<YEvent>,Array<YEvent>>}
     */
    this.changedParentTypes = new Map();
    /**
     * @type {Set<ID>}
     */
    this._mergeStructs = new Set();
    /**
     * @type {any}
     */
    this.origin = origin;
    /**
     * Stores meta information on the transaction
     * @type {Map<any,any>}
     */
    this.meta = new Map();
    /**
     * Whether this change originates from this doc.
     * @type {boolean}
     */
    this.local = local;
  }
}

/**
 * @param {Transaction} transaction
 */
const computeUpdateMessageFromTransaction = transaction => {
  if (transaction.deleteSet.clients.size === 0 && !Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["any"])(transaction.afterState, (clock, client) => transaction.beforeState.get(client) !== clock)) {
    return null
  }
  const encoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
  sortAndMergeDeleteSet(transaction.deleteSet);
  writeStructsFromTransaction(encoder, transaction);
  writeDeleteSet(encoder, transaction.deleteSet);
  return encoder
};

/**
 * @param {Transaction} transaction
 *
 * @private
 * @function
 */
const nextID = transaction => {
  const y = transaction.doc;
  return createID(y.clientID, getState(y.store, y.clientID))
};

/**
 * If `type.parent` was added in current transaction, `type` technically
 * did not change, it was just added and we should not fire events for `type`.
 *
 * @param {Transaction} transaction
 * @param {AbstractType<YEvent>} type
 * @param {string|null} parentSub
 */
const addChangedTypeToTransaction = (transaction, type, parentSub) => {
  const item = type._item;
  if (item === null || (item.id.clock < (transaction.beforeState.get(item.id.client) || 0) && !item.deleted)) {
    Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["setIfUndefined"])(transaction.changed, type, lib0_set_js__WEBPACK_IMPORTED_MODULE_10__["create"]).add(parentSub);
  }
};

/**
 * @param {Array<AbstractStruct>} structs
 * @param {number} pos
 */
const tryToMergeWithLeft = (structs, pos) => {
  const left = structs[pos - 1];
  const right = structs[pos];
  if (left.deleted === right.deleted && left.constructor === right.constructor) {
    if (left.mergeWith(right)) {
      structs.splice(pos, 1);
      if (right instanceof Item && right.parentSub !== null && right.parent._map.get(right.parentSub) === right) {
        right.parent._map.set(right.parentSub, /** @type {Item} */ (left));
      }
    }
  }
};

/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 * @param {function(Item):boolean} gcFilter
 */
const tryGcDeleteSet = (ds, store, gcFilter) => {
  for (const [client, deleteItems] of ds.clients) {
    const structs = /** @type {Array<AbstractStruct>} */ (store.clients.get(client));
    for (let di = deleteItems.length - 1; di >= 0; di--) {
      const deleteItem = deleteItems[di];
      const endDeleteItemClock = deleteItem.clock + deleteItem.len;
      for (
        let si = findIndexSS(structs, deleteItem.clock), struct = structs[si];
        si < structs.length && struct.id.clock < endDeleteItemClock;
        struct = structs[++si]
      ) {
        const struct = structs[si];
        if (deleteItem.clock + deleteItem.len <= struct.id.clock) {
          break
        }
        if (struct instanceof Item && struct.deleted && !struct.keep && gcFilter(struct)) {
          struct.gc(store, false);
        }
      }
    }
  }
};

/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 */
const tryMergeDeleteSet = (ds, store) => {
  // try to merge deleted / gc'd items
  // merge from right to left for better efficiecy and so we don't miss any merge targets
  for (const [client, deleteItems] of ds.clients) {
    const structs = /** @type {Array<AbstractStruct>} */ (store.clients.get(client));
    for (let di = deleteItems.length - 1; di >= 0; di--) {
      const deleteItem = deleteItems[di];
      // start with merging the item next to the last deleted item
      const mostRightIndexToCheck = Object(lib0_math_js__WEBPACK_IMPORTED_MODULE_1__["min"])(structs.length - 1, 1 + findIndexSS(structs, deleteItem.clock + deleteItem.len - 1));
      for (
        let si = mostRightIndexToCheck, struct = structs[si];
        si > 0 && struct.id.clock >= deleteItem.clock;
        struct = structs[--si]
      ) {
        tryToMergeWithLeft(structs, si);
      }
    }
  }
};

/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 * @param {function(Item):boolean} gcFilter
 */
const tryGc = (ds, store, gcFilter) => {
  tryGcDeleteSet(ds, store, gcFilter);
  tryMergeDeleteSet(ds, store);
};

/**
 * @param {Array<Transaction>} transactionCleanups
 * @param {number} i
 */
const cleanupTransactions = (transactionCleanups, i) => {
  if (i < transactionCleanups.length) {
    const transaction = transactionCleanups[i];
    const doc = transaction.doc;
    const store = doc.store;
    const ds = transaction.deleteSet;
    try {
      sortAndMergeDeleteSet(ds);
      transaction.afterState = getStateVector(transaction.doc.store);
      doc._transaction = null;
      doc.emit('beforeObserverCalls', [transaction, doc]);
      /**
       * An array of event callbacks.
       *
       * Each callback is called even if the other ones throw errors.
       *
       * @type {Array<function():void>}
       */
      const fs = [];
      // observe events on changed types
      transaction.changed.forEach((subs, itemtype) =>
        fs.push(() => {
          if (itemtype._item === null || !itemtype._item.deleted) {
            itemtype._callObserver(transaction, subs);
          }
        })
      );
      fs.push(() => {
        // deep observe events
        transaction.changedParentTypes.forEach((events, type) =>
          fs.push(() => {
            // We need to think about the possibility that the user transforms the
            // Y.Doc in the event.
            if (type._item === null || !type._item.deleted) {
              events = events
                .filter(event =>
                  event.target._item === null || !event.target._item.deleted
                );
              events
                .forEach(event => {
                  event.currentTarget = type;
                });
              // We don't need to check for events.length
              // because we know it has at least one element
              callEventHandlerListeners(type._dEH, events, transaction);
            }
          })
        );
        fs.push(() => doc.emit('afterTransaction', [transaction, doc]));
      });
      Object(lib0_function_js__WEBPACK_IMPORTED_MODULE_8__["callAll"])(fs, []);
    } finally {
      // Replace deleted items with ItemDeleted / GC.
      // This is where content is actually remove from the Yjs Doc.
      if (doc.gc) {
        tryGcDeleteSet(ds, store, doc.gcFilter);
      }
      tryMergeDeleteSet(ds, store);

      // on all affected store.clients props, try to merge
      for (const [client, clock] of transaction.afterState) {
        const beforeClock = transaction.beforeState.get(client) || 0;
        if (beforeClock !== clock) {
          const structs = /** @type {Array<AbstractStruct>} */ (store.clients.get(client));
          // we iterate from right to left so we can safely remove entries
          const firstChangePos = Object(lib0_math_js__WEBPACK_IMPORTED_MODULE_1__["max"])(findIndexSS(structs, beforeClock), 1);
          for (let i = structs.length - 1; i >= firstChangePos; i--) {
            tryToMergeWithLeft(structs, i);
          }
        }
      }
      // try to merge mergeStructs
      // @todo: it makes more sense to transform mergeStructs to a DS, sort it, and merge from right to left
      //        but at the moment DS does not handle duplicates
      for (const mid of transaction._mergeStructs) {
        const client = mid.client;
        const clock = mid.clock;
        const structs = /** @type {Array<AbstractStruct>} */ (store.clients.get(client));
        const replacedStructPos = findIndexSS(structs, clock);
        if (replacedStructPos + 1 < structs.length) {
          tryToMergeWithLeft(structs, replacedStructPos + 1);
        }
        if (replacedStructPos > 0) {
          tryToMergeWithLeft(structs, replacedStructPos);
        }
      }
      // @todo Merge all the transactions into one and provide send the data as a single update message
      doc.emit('afterTransactionCleanup', [transaction, doc]);
      if (doc._observers.has('update')) {
        const updateMessage = computeUpdateMessageFromTransaction(transaction);
        if (updateMessage !== null) {
          doc.emit('update', [Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(updateMessage), transaction.origin, doc]);
        }
      }
      if (transactionCleanups.length <= i + 1) {
        doc._transactionCleanups = [];
      } else {
        cleanupTransactions(transactionCleanups, i + 1);
      }
    }
  }
};

/**
 * Implements the functionality of `y.transact(()=>{..})`
 *
 * @param {Doc} doc
 * @param {function(Transaction):void} f
 * @param {any} [origin=true]
 *
 * @function
 */
const transact = (doc, f, origin = null, local = true) => {
  const transactionCleanups = doc._transactionCleanups;
  let initialCall = false;
  if (doc._transaction === null) {
    initialCall = true;
    doc._transaction = new Transaction(doc, origin, local);
    transactionCleanups.push(doc._transaction);
    doc.emit('beforeTransaction', [doc._transaction, doc]);
  }
  try {
    f(doc._transaction);
  } finally {
    if (initialCall && transactionCleanups[0] === doc._transaction) {
      // The first transaction ended, now process observer calls.
      // Observer call may create new transactions for which we need to call the observers and do cleanup.
      // We don't want to nest these calls, so we execute these calls one after
      // another.
      // Also we need to ensure that all cleanups are called, even if the
      // observes throw errors.
      // This file is full of hacky try {} finally {} blocks to ensure that an
      // event can throw errors and also that the cleanup is called.
      cleanupTransactions(transactionCleanups, 0);
    }
  }
};

class StackItem {
  /**
   * @param {DeleteSet} ds
   * @param {number} start clock start of the local client
   * @param {number} len
   */
  constructor (ds, start, len) {
    this.ds = ds;
    this.start = start;
    this.len = len;
    /**
     * Use this to save and restore metadata like selection range
     */
    this.meta = new Map();
  }
}

/**
 * @param {UndoManager} undoManager
 * @param {Array<StackItem>} stack
 * @param {string} eventType
 * @return {StackItem?}
 */
const popStackItem = (undoManager, stack, eventType) => {
  /**
   * Whether a change happened
   * @type {StackItem?}
   */
  let result = null;
  const doc = undoManager.doc;
  const scope = undoManager.scope;
  transact(doc, transaction => {
    while (stack.length > 0 && result === null) {
      const store = doc.store;
      const clientID = doc.clientID;
      const stackItem = /** @type {StackItem} */ (stack.pop());
      const stackStartClock = stackItem.start;
      const stackEndClock = stackItem.start + stackItem.len;
      const itemsToRedo = new Set();
      // @todo iterateStructs should not need the structs parameter
      const structs = /** @type {Array<GC|Item>} */ (store.clients.get(clientID));
      let performedChange = false;
      if (stackStartClock !== stackEndClock) {
        // make sure structs don't overlap with the range of created operations [stackItem.start, stackItem.start + stackItem.end)
        getItemCleanStart(transaction, createID(clientID, stackStartClock));
        if (stackEndClock < getState(doc.store, clientID)) {
          getItemCleanStart(transaction, createID(clientID, stackEndClock));
        }
      }
      iterateDeletedStructs(transaction, stackItem.ds, struct => {
        if (
          struct instanceof Item &&
          scope.some(type => isParentOf(type, struct)) &&
          // Never redo structs in [stackItem.start, stackItem.start + stackItem.end) because they were created and deleted in the same capture interval.
          !(struct.id.client === clientID && struct.id.clock >= stackStartClock && struct.id.clock < stackEndClock)
        ) {
          itemsToRedo.add(struct);
        }
      });
      itemsToRedo.forEach(struct => {
        performedChange = redoItem(transaction, struct, itemsToRedo) !== null || performedChange;
      });
      /**
       * @type {Array<Item>}
       */
      const itemsToDelete = [];
      iterateStructs(transaction, structs, stackStartClock, stackItem.len, struct => {
        if (struct instanceof Item) {
          if (struct.redone !== null) {
            let { item, diff } = followRedone(store, struct.id);
            if (diff > 0) {
              item = getItemCleanStart(transaction, createID(item.id.client, item.id.clock + diff));
            }
            if (item.length > stackItem.len) {
              getItemCleanStart(transaction, createID(item.id.client, stackEndClock));
            }
            struct = item;
          }
          if (!struct.deleted && scope.some(type => isParentOf(type, /** @type {Item} */ (struct)))) {
            itemsToDelete.push(struct);
          }
        }
      });
      // We want to delete in reverse order so that children are deleted before
      // parents, so we have more information available when items are filtered.
      for (let i = itemsToDelete.length - 1; i >= 0; i--) {
        const item = itemsToDelete[i];
        if (undoManager.deleteFilter(item)) {
          item.delete(transaction);
          performedChange = true;
        }
      }
      result = stackItem;
      if (result != null) {
        undoManager.emit('stack-item-popped', [{ stackItem: result, type: eventType }, undoManager]);
      }
    }
  }, undoManager);
  return result
};

/**
 * @typedef {Object} UndoManagerOptions
 * @property {number} [UndoManagerOptions.captureTimeout=500]
 * @property {function(Item):boolean} [UndoManagerOptions.deleteFilter=()=>true] Sometimes
 * it is necessary to filter whan an Undo/Redo operation can delete. If this
 * filter returns false, the type/item won't be deleted even it is in the
 * undo/redo scope.
 * @property {Set<any>} [UndoManagerOptions.trackedOrigins=new Set([null])]
 */

/**
 * Fires 'stack-item-added' event when a stack item was added to either the undo- or
 * the redo-stack. You may store additional stack information via the
 * metadata property on `event.stackItem.meta` (it is a `Map` of metadata properties).
 * Fires 'stack-item-popped' event when a stack item was popped from either the
 * undo- or the redo-stack. You may restore the saved stack information from `event.stackItem.meta`.
 *
 * @extends {Observable<'stack-item-added'|'stack-item-popped'>}
 */
class UndoManager extends lib0_observable_js__WEBPACK_IMPORTED_MODULE_5__["Observable"] {
  /**
   * @param {AbstractType<any>|Array<AbstractType<any>>} typeScope Accepts either a single type, or an array of types
   * @param {UndoManagerOptions} options
   */
  constructor (typeScope, { captureTimeout, deleteFilter = () => true, trackedOrigins = new Set([null]) } = {}) {
    if (captureTimeout == null) {
      captureTimeout = 500;
    }
    super();
    this.scope = typeScope instanceof Array ? typeScope : [typeScope];
    this.deleteFilter = deleteFilter;
    trackedOrigins.add(this);
    this.trackedOrigins = trackedOrigins;
    /**
     * @type {Array<StackItem>}
     */
    this.undoStack = [];
    /**
     * @type {Array<StackItem>}
     */
    this.redoStack = [];
    /**
     * Whether the client is currently undoing (calling UndoManager.undo)
     *
     * @type {boolean}
     */
    this.undoing = false;
    this.redoing = false;
    this.doc = /** @type {Doc} */ (this.scope[0].doc);
    this.lastChange = 0;
    this.doc.on('afterTransaction', /** @param {Transaction} transaction */ transaction => {
      // Only track certain transactions
      if (!this.scope.some(type => transaction.changedParentTypes.has(type)) || (!this.trackedOrigins.has(transaction.origin) && (!transaction.origin || !this.trackedOrigins.has(transaction.origin.constructor)))) {
        return
      }
      const undoing = this.undoing;
      const redoing = this.redoing;
      const stack = undoing ? this.redoStack : this.undoStack;
      if (undoing) {
        this.stopCapturing(); // next undo should not be appended to last stack item
      } else if (!redoing) {
        // neither undoing nor redoing: delete redoStack
        this.redoStack = [];
      }
      const beforeState = transaction.beforeState.get(this.doc.clientID) || 0;
      const afterState = transaction.afterState.get(this.doc.clientID) || 0;
      const now = Object(lib0_time_js__WEBPACK_IMPORTED_MODULE_11__["getUnixTime"])();
      if (now - this.lastChange < captureTimeout && stack.length > 0 && !undoing && !redoing) {
        // append change to last stack op
        const lastOp = stack[stack.length - 1];
        lastOp.ds = mergeDeleteSets([lastOp.ds, transaction.deleteSet]);
        lastOp.len = afterState - lastOp.start;
      } else {
        // create a new stack op
        stack.push(new StackItem(transaction.deleteSet, beforeState, afterState - beforeState));
      }
      if (!undoing && !redoing) {
        this.lastChange = now;
      }
      // make sure that deleted structs are not gc'd
      iterateDeletedStructs(transaction, transaction.deleteSet, /** @param {Item|GC} item */ item => {
        if (item instanceof Item && this.scope.some(type => isParentOf(type, item))) {
          keepItem(item, true);
        }
      });
      this.emit('stack-item-added', [{ stackItem: stack[stack.length - 1], origin: transaction.origin, type: undoing ? 'redo' : 'undo' }, this]);
    });
  }

  clear () {
    this.doc.transact(transaction => {
      /**
       * @param {StackItem} stackItem
       */
      const clearItem = stackItem => {
        iterateDeletedStructs(transaction, stackItem.ds, item => {
          if (item instanceof Item && this.scope.some(type => isParentOf(type, item))) {
            keepItem(item, false);
          }
        });
      };
      this.undoStack.forEach(clearItem);
      this.redoStack.forEach(clearItem);
    });
    this.undoStack = [];
    this.redoStack = [];
  }

  /**
   * UndoManager merges Undo-StackItem if they are created within time-gap
   * smaller than `options.captureTimeout`. Call `um.stopCapturing()` so that the next
   * StackItem won't be merged.
   *
   *
   * @example
   *     // without stopCapturing
   *     ytext.insert(0, 'a')
   *     ytext.insert(1, 'b')
   *     um.undo()
   *     ytext.toString() // => '' (note that 'ab' was removed)
   *     // with stopCapturing
   *     ytext.insert(0, 'a')
   *     um.stopCapturing()
   *     ytext.insert(0, 'b')
   *     um.undo()
   *     ytext.toString() // => 'a' (note that only 'b' was removed)
   *
   */
  stopCapturing () {
    this.lastChange = 0;
  }

  /**
   * Undo last changes on type.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  undo () {
    this.undoing = true;
    let res;
    try {
      res = popStackItem(this, this.undoStack, 'undo');
    } finally {
      this.undoing = false;
    }
    return res
  }

  /**
   * Redo last undo operation.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  redo () {
    this.redoing = true;
    let res;
    try {
      res = popStackItem(this, this.redoStack, 'redo');
    } finally {
      this.redoing = false;
    }
    return res
  }
}

/**
 * YEvent describes the changes on a YType.
 */
class YEvent {
  /**
   * @param {AbstractType<any>} target The changed type.
   * @param {Transaction} transaction
   */
  constructor (target, transaction) {
    /**
     * The type on which this event was created on.
     * @type {AbstractType<any>}
     */
    this.target = target;
    /**
     * The current target on which the observe callback is called.
     * @type {AbstractType<any>}
     */
    this.currentTarget = target;
    /**
     * The transaction that triggered this event.
     * @type {Transaction}
     */
    this.transaction = transaction;
    /**
     * @type {Object|null}
     */
    this._changes = null;
  }

  /**
   * Computes the path from `y` to the changed type.
   *
   * The following property holds:
   * @example
   *   let type = y
   *   event.path.forEach(dir => {
   *     type = type.get(dir)
   *   })
   *   type === event.target // => true
   */
  get path () {
    // @ts-ignore _item is defined because target is integrated
    return getPathTo(this.currentTarget, this.target)
  }

  /**
   * Check if a struct is deleted by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  deletes (struct) {
    return isDeleted(this.transaction.deleteSet, struct.id)
  }

  /**
   * Check if a struct is added by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  adds (struct) {
    return struct.id.clock >= (this.transaction.beforeState.get(struct.id.client) || 0)
  }

  /**
   * @return {{added:Set<Item>,deleted:Set<Item>,delta:Array<{insert:Array<any>}|{delete:number}|{retain:number}>}}
   */
  get changes () {
    let changes = this._changes;
    if (changes === null) {
      const target = this.target;
      const added = Object(lib0_set_js__WEBPACK_IMPORTED_MODULE_10__["create"])();
      const deleted = Object(lib0_set_js__WEBPACK_IMPORTED_MODULE_10__["create"])();
      /**
       * @type {Array<{insert:Array<any>}|{delete:number}|{retain:number}>}
       */
      const delta = [];
      /**
       * @type {Map<string,{ action: 'add' | 'update' | 'delete', oldValue: any}>}
       */
      const keys = new Map();
      changes = {
        added, deleted, delta, keys
      };
      const changed = /** @type Set<string|null> */ (this.transaction.changed.get(target));
      if (changed.has(null)) {
        /**
         * @type {any}
         */
        let lastOp = null;
        const packOp = () => {
          if (lastOp) {
            delta.push(lastOp);
          }
        };
        for (let item = target._start; item !== null; item = item.right) {
          if (item.deleted) {
            if (this.deletes(item) && !this.adds(item)) {
              if (lastOp === null || lastOp.delete === undefined) {
                packOp();
                lastOp = { delete: 0 };
              }
              lastOp.delete += item.length;
              deleted.add(item);
            } // else nop
          } else {
            if (this.adds(item)) {
              if (lastOp === null || lastOp.insert === undefined) {
                packOp();
                lastOp = { insert: [] };
              }
              lastOp.insert = lastOp.insert.concat(item.content.getContent());
              added.add(item);
            } else {
              if (lastOp === null || lastOp.retain === undefined) {
                packOp();
                lastOp = { retain: 0 };
              }
              lastOp.retain += item.length;
            }
          }
        }
        if (lastOp !== null && lastOp.retain === undefined) {
          packOp();
        }
      }
      changed.forEach(key => {
        if (key !== null) {
          const item = /** @type {Item} */ (target._map.get(key));
          /**
           * @type {'delete' | 'add' | 'update'}
           */
          let action;
          let oldValue;
          if (this.adds(item)) {
            let prev = item.left;
            while (prev !== null && this.adds(prev)) {
              prev = prev.left;
            }
            if (this.deletes(item)) {
              if (prev !== null && this.deletes(prev)) {
                action = 'delete';
                oldValue = Object(lib0_array_js__WEBPACK_IMPORTED_MODULE_0__["last"])(prev.content.getContent());
              } else {
                return
              }
            } else {
              if (prev !== null && this.deletes(prev)) {
                action = 'update';
                oldValue = Object(lib0_array_js__WEBPACK_IMPORTED_MODULE_0__["last"])(prev.content.getContent());
              } else {
                action = 'add';
                oldValue = undefined;
              }
            }
          } else {
            if (this.deletes(item)) {
              action = 'delete';
              oldValue = Object(lib0_array_js__WEBPACK_IMPORTED_MODULE_0__["last"])(/** @type {Item} */ item.content.getContent());
            } else {
              return // nop
            }
          }
          keys.set(key, { action, oldValue });
        }
      });
      this._changes = changes;
    }
    return /** @type {any} */ (changes)
  }
}

/**
 * Compute the path from this type to the specified target.
 *
 * @example
 *   // `child` should be accessible via `type.get(path[0]).get(path[1])..`
 *   const path = type.getPathTo(child)
 *   // assuming `type instanceof YArray`
 *   console.log(path) // might look like => [2, 'key1']
 *   child === type.get(path[0]).get(path[1])
 *
 * @param {AbstractType<any>} parent
 * @param {AbstractType<any>} child target
 * @return {Array<string|number>} Path to the target
 *
 * @private
 * @function
 */
const getPathTo = (parent, child) => {
  const path = [];
  while (child._item !== null && child !== parent) {
    if (child._item.parentSub !== null) {
      // parent is map-ish
      path.unshift(child._item.parentSub);
    } else {
      // parent is array-ish
      let i = 0;
      let c = child._item.parent._start;
      while (c !== child._item && c !== null) {
        if (!c.deleted) {
          i++;
        }
        c = c.right;
      }
      path.unshift(i);
    }
    child = child._item.parent;
  }
  return path
};

/**
 * Call event listeners with an event. This will also add an event to all
 * parents (for `.observeDeep` handlers).
 *
 * @template EventType
 * @param {AbstractType<EventType>} type
 * @param {Transaction} transaction
 * @param {EventType} event
 */
const callTypeObservers = (type, transaction, event) => {
  const changedType = type;
  const changedParentTypes = transaction.changedParentTypes;
  while (true) {
    // @ts-ignore
    Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["setIfUndefined"])(changedParentTypes, type, () => []).push(event);
    if (type._item === null) {
      break
    }
    type = type._item.parent;
  }
  callEventHandlerListeners(changedType._eH, event, transaction);
};

/**
 * @template EventType
 * Abstract Yjs Type class
 */
class AbstractType {
  constructor () {
    /**
     * @type {Item|null}
     */
    this._item = null;
    /**
     * @type {Map<string,Item>}
     */
    this._map = new Map();
    /**
     * @type {Item|null}
     */
    this._start = null;
    /**
     * @type {Doc|null}
     */
    this.doc = null;
    this._length = 0;
    /**
     * Event handlers
     * @type {EventHandler<EventType,Transaction>}
     */
    this._eH = createEventHandler();
    /**
     * Deep event handlers
     * @type {EventHandler<Array<YEvent>,Transaction>}
     */
    this._dEH = createEventHandler();
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item|null} item
   */
  _integrate (y, item) {
    this.doc = y;
    this._item = item;
  }

  /**
   * @return {AbstractType<EventType>}
   */
  _copy () {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }

  /**
   * @param {encoding.Encoder} encoder
   */
  _write (encoder) { }

  /**
   * The first non-deleted item
   */
  get _first () {
    let n = this._start;
    while (n !== null && n.deleted) {
      n = n.right;
    }
    return n
  }

  /**
   * Creates YEvent and calls all type observers.
   * Must be implemented by each type.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) { /* skip if no type is specified */ }

  /**
   * Observe all events that are created on this type.
   *
   * @param {function(EventType, Transaction):void} f Observer function
   */
  observe (f) {
    addEventHandlerListener(this._eH, f);
  }

  /**
   * Observe all events that are created by this type and its children.
   *
   * @param {function(Array<YEvent>,Transaction):void} f Observer function
   */
  observeDeep (f) {
    addEventHandlerListener(this._dEH, f);
  }

  /**
   * Unregister an observer function.
   *
   * @param {function(EventType,Transaction):void} f Observer function
   */
  unobserve (f) {
    removeEventHandlerListener(this._eH, f);
  }

  /**
   * Unregister an observer function.
   *
   * @param {function(Array<YEvent>,Transaction):void} f Observer function
   */
  unobserveDeep (f) {
    removeEventHandlerListener(this._dEH, f);
  }

  /**
   * @abstract
   * @return {any}
   */
  toJSON () {}
}

/**
 * @param {AbstractType<any>} type
 * @return {Array<any>}
 *
 * @private
 * @function
 */
const typeListToArray = type => {
  const cs = [];
  let n = type._start;
  while (n !== null) {
    if (n.countable && !n.deleted) {
      const c = n.content.getContent();
      for (let i = 0; i < c.length; i++) {
        cs.push(c[i]);
      }
    }
    n = n.right;
  }
  return cs
};

/**
 * @param {AbstractType<any>} type
 * @param {Snapshot} snapshot
 * @return {Array<any>}
 *
 * @private
 * @function
 */
const typeListToArraySnapshot = (type, snapshot) => {
  const cs = [];
  let n = type._start;
  while (n !== null) {
    if (n.countable && isVisible(n, snapshot)) {
      const c = n.content.getContent();
      for (let i = 0; i < c.length; i++) {
        cs.push(c[i]);
      }
    }
    n = n.right;
  }
  return cs
};

/**
 * Executes a provided function on once on overy element of this YArray.
 *
 * @param {AbstractType<any>} type
 * @param {function(any,number,any):void} f A function to execute on every element of this YArray.
 *
 * @private
 * @function
 */
const typeListForEach = (type, f) => {
  let index = 0;
  let n = type._start;
  while (n !== null) {
    if (n.countable && !n.deleted) {
      const c = n.content.getContent();
      for (let i = 0; i < c.length; i++) {
        f(c[i], index++, type);
      }
    }
    n = n.right;
  }
};

/**
 * @template C,R
 * @param {AbstractType<any>} type
 * @param {function(C,number,AbstractType<any>):R} f
 * @return {Array<R>}
 *
 * @private
 * @function
 */
const typeListMap = (type, f) => {
  /**
   * @type {Array<any>}
   */
  const result = [];
  typeListForEach(type, (c, i) => {
    result.push(f(c, i, type));
  });
  return result
};

/**
 * @param {AbstractType<any>} type
 * @return {IterableIterator<any>}
 *
 * @private
 * @function
 */
const typeListCreateIterator = type => {
  let n = type._start;
  /**
   * @type {Array<any>|null}
   */
  let currentContent = null;
  let currentContentIndex = 0;
  return {
    [Symbol.iterator] () {
      return this
    },
    next: () => {
      // find some content
      if (currentContent === null) {
        while (n !== null && n.deleted) {
          n = n.right;
        }
        // check if we reached the end, no need to check currentContent, because it does not exist
        if (n === null) {
          return {
            done: true,
            value: undefined
          }
        }
        // we found n, so we can set currentContent
        currentContent = n.content.getContent();
        currentContentIndex = 0;
        n = n.right; // we used the content of n, now iterate to next
      }
      const value = currentContent[currentContentIndex++];
      // check if we need to empty currentContent
      if (currentContent.length <= currentContentIndex) {
        currentContent = null;
      }
      return {
        done: false,
        value
      }
    }
  }
};

/**
 * @param {AbstractType<any>} type
 * @param {number} index
 * @return {any}
 *
 * @private
 * @function
 */
const typeListGet = (type, index) => {
  for (let n = type._start; n !== null; n = n.right) {
    if (!n.deleted && n.countable) {
      if (index < n.length) {
        return n.content.getContent()[index]
      }
      index -= n.length;
    }
  }
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item?} referenceItem
 * @param {Array<Object<string,any>|Array<any>|boolean|number|string|Uint8Array>} content
 *
 * @private
 * @function
 */
const typeListInsertGenericsAfter = (transaction, parent, referenceItem, content) => {
  let left = referenceItem;
  const right = referenceItem === null ? parent._start : referenceItem.right;
  /**
   * @type {Array<Object|Array<any>|number>}
   */
  let jsonContent = [];
  const packJsonContent = () => {
    if (jsonContent.length > 0) {
      left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, new ContentAny(jsonContent));
      left.integrate(transaction);
      jsonContent = [];
    }
  };
  content.forEach(c => {
    switch (c.constructor) {
      case Number:
      case Object:
      case Boolean:
      case Array:
      case String:
        jsonContent.push(c);
        break
      default:
        packJsonContent();
        switch (c.constructor) {
          case Uint8Array:
          case ArrayBuffer:
            left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, new ContentBinary(new Uint8Array(/** @type {Uint8Array} */ (c))));
            left.integrate(transaction);
            break
          default:
            if (c instanceof AbstractType) {
              left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, new ContentType(c));
              left.integrate(transaction);
            } else {
              throw new Error('Unexpected content type in insert operation')
            }
        }
    }
  });
  packJsonContent();
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @param {Array<Object<string,any>|Array<any>|number|string|Uint8Array>} content
 *
 * @private
 * @function
 */
const typeListInsertGenerics = (transaction, parent, index, content) => {
  if (index === 0) {
    return typeListInsertGenericsAfter(transaction, parent, null, content)
  }
  let n = parent._start;
  for (; n !== null; n = n.right) {
    if (!n.deleted && n.countable) {
      if (index <= n.length) {
        if (index < n.length) {
          // insert in-between
          getItemCleanStart(transaction, createID(n.id.client, n.id.clock + index));
        }
        break
      }
      index -= n.length;
    }
  }
  return typeListInsertGenericsAfter(transaction, parent, n, content)
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @param {number} length
 *
 * @private
 * @function
 */
const typeListDelete = (transaction, parent, index, length) => {
  if (length === 0) { return }
  let n = parent._start;
  // compute the first item to be deleted
  for (; n !== null && index > 0; n = n.right) {
    if (!n.deleted && n.countable) {
      if (index < n.length) {
        getItemCleanStart(transaction, createID(n.id.client, n.id.clock + index));
      }
      index -= n.length;
    }
  }
  // delete all items until done
  while (length > 0 && n !== null) {
    if (!n.deleted) {
      if (length < n.length) {
        getItemCleanStart(transaction, createID(n.id.client, n.id.clock + length));
      }
      n.delete(transaction);
      length -= n.length;
    }
    n = n.right;
  }
  if (length > 0) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["create"])('array length exceeded')
  }
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {string} key
 *
 * @private
 * @function
 */
const typeMapDelete = (transaction, parent, key) => {
  const c = parent._map.get(key);
  if (c !== undefined) {
    c.delete(transaction);
  }
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @param {Object|number|Array<any>|string|Uint8Array|AbstractType<any>} value
 *
 * @private
 * @function
 */
const typeMapSet = (transaction, parent, key, value) => {
  const left = parent._map.get(key) || null;
  let content;
  if (value == null) {
    content = new ContentAny([value]);
  } else {
    switch (value.constructor) {
      case Number:
      case Object:
      case Boolean:
      case Array:
      case String:
        content = new ContentAny([value]);
        break
      case Uint8Array:
        content = new ContentBinary(/** @type {Uint8Array} */ (value));
        break
      default:
        if (value instanceof AbstractType) {
          content = new ContentType(value);
        } else {
          throw new Error('Unexpected content type')
        }
    }
  }
  new Item(nextID(transaction), left, left === null ? null : left.lastId, null, null, parent, key, content).integrate(transaction);
};

/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @return {Object<string,any>|number|Array<any>|string|Uint8Array|AbstractType<any>|undefined}
 *
 * @private
 * @function
 */
const typeMapGet = (parent, key) => {
  const val = parent._map.get(key);
  return val !== undefined && !val.deleted ? val.content.getContent()[val.length - 1] : undefined
};

/**
 * @param {AbstractType<any>} parent
 * @return {Object<string,Object<string,any>|number|Array<any>|string|Uint8Array|AbstractType<any>|undefined>}
 *
 * @private
 * @function
 */
const typeMapGetAll = (parent) => {
  /**
   * @type {Object<string,any>}
   */
  const res = {};
  for (const [key, value] of parent._map) {
    if (!value.deleted) {
      res[key] = value.content.getContent()[value.length - 1];
    }
  }
  return res
};

/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @return {boolean}
 *
 * @private
 * @function
 */
const typeMapHas = (parent, key) => {
  const val = parent._map.get(key);
  return val !== undefined && !val.deleted
};

/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @param {Snapshot} snapshot
 * @return {Object<string,any>|number|Array<any>|string|Uint8Array|AbstractType<any>|undefined}
 *
 * @private
 * @function
 */
const typeMapGetSnapshot = (parent, key, snapshot) => {
  let v = parent._map.get(key) || null;
  while (v !== null && (!snapshot.sv.has(v.id.client) || v.id.clock >= (snapshot.sv.get(v.id.client) || 0))) {
    v = v.left;
  }
  return v !== null && isVisible(v, snapshot) ? v.content.getContent()[v.length - 1] : undefined
};

/**
 * @param {Map<string,Item>} map
 * @return {IterableIterator<Array<any>>}
 *
 * @private
 * @function
 */
const createMapIterator = map => Object(lib0_iterator_js__WEBPACK_IMPORTED_MODULE_12__["iteratorFilter"])(map.entries(), /** @param {any} entry */ entry => !entry[1].deleted);

/**
 * @module YArray
 */

/**
 * Event that describes the changes on a YArray
 * @template T
 */
class YArrayEvent extends YEvent {
  /**
   * @param {YArray<T>} yarray The changed type
   * @param {Transaction} transaction The transaction object
   */
  constructor (yarray, transaction) {
    super(yarray, transaction);
    this._transaction = transaction;
  }
}

/**
 * A shared Array implementation.
 * @template T
 * @extends AbstractType<YArrayEvent<T>>
 * @implements {IterableIterator<T>}
 */
class YArray extends AbstractType {
  constructor () {
    super();
    /**
     * @type {Array<any>?}
     * @private
     */
    this._prelimContent = [];
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item);
    this.insert(0, /** @type {Array<any>} */ (this._prelimContent));
    this._prelimContent = null;
  }

  _copy () {
    return new YArray()
  }

  get length () {
    return this._prelimContent === null ? this._length : this._prelimContent.length
  }

  /**
   * Creates YArrayEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) {
    callTypeObservers(this, transaction, new YArrayEvent(this, transaction));
  }

  /**
   * Inserts new content at an index.
   *
   * Important: This function expects an array of content. Not just a content
   * object. The reason for this "weirdness" is that inserting several elements
   * is very efficient when it is done as a single operation.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  yarray.insert(0, ['a'])
   *  // Insert numbers 1, 2 at position 1
   *  yarray.insert(1, [1, 2])
   *
   * @param {number} index The index to insert content at.
   * @param {Array<T>} content The array of content
   */
  insert (index, content) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListInsertGenerics(transaction, this, index, content);
      });
    } else {
      /** @type {Array<any>} */ (this._prelimContent).splice(index, 0, ...content);
    }
  }

  /**
   * Appends content to this YArray.
   *
   * @param {Array<T>} content Array of content to append.
   */
  push (content) {
    this.insert(this.length, content);
  }

  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} length The number of elements to remove. Defaults to 1.
   */
  delete (index, length = 1) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListDelete(transaction, this, index, length);
      });
    } else {
      /** @type {Array<any>} */ (this._prelimContent).splice(index, length);
    }
  }

  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {T}
   */
  get (index) {
    return typeListGet(this, index)
  }

  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<T>}
   */
  toArray () {
    return typeListToArray(this)
  }

  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Array<any>}
   */
  toJSON () {
    return this.map(c => c instanceof AbstractType ? c.toJSON() : c)
  }

  /**
   * Returns an Array with the result of calling a provided function on every
   * element of this YArray.
   *
   * @template T,M
   * @param {function(T,number,YArray<T>):M} f Function that produces an element of the new Array
   * @return {Array<M>} A new array with each element being the result of the
   *                 callback function
   */
  map (f) {
    return typeListMap(this, /** @type {any} */ (f))
  }

  /**
   * Executes a provided function on once on overy element of this YArray.
   *
   * @param {function(T,number,YArray<T>):void} f A function to execute on every element of this YArray.
   */
  forEach (f) {
    typeListForEach(this, f);
  }

  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator] () {
    return typeListCreateIterator(this)
  }

  /**
   * @param {encoding.Encoder} encoder
   */
  _write (encoder) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YArrayRefID);
  }
}

/**
 * @param {decoding.Decoder} decoder
 *
 * @private
 * @function
 */
const readYArray = decoder => new YArray();

/**
 * @template T
 * Event that describes the changes on a YMap.
 */
class YMapEvent extends YEvent {
  /**
   * @param {YMap<T>} ymap The YArray that changed.
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed.
   */
  constructor (ymap, transaction, subs) {
    super(ymap, transaction);
    this.keysChanged = subs;
  }
}

/**
 * @template T number|string|Object|Array|Uint8Array
 * A shared Map implementation.
 *
 * @extends AbstractType<YMapEvent<T>>
 * @implements {IterableIterator}
 */
class YMap extends AbstractType {
  constructor () {
    super();
    /**
     * @type {Map<string,any>?}
     * @private
     */
    this._prelimContent = new Map();
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item);
    for (const [key, value] of /** @type {Map<string, any>} */ (this._prelimContent)) {
      this.set(key, value);
    }
    this._prelimContent = null;
  }

  _copy () {
    return new YMap()
  }

  /**
   * Creates YMapEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) {
    callTypeObservers(this, transaction, new YMapEvent(this, transaction, parentSubs));
  }

  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Object<string,T>}
   */
  toJSON () {
    /**
     * @type {Object<string,T>}
     */
    const map = {};
    for (const [key, item] of this._map) {
      if (!item.deleted) {
        const v = item.content.getContent()[item.length - 1];
        map[key] = v instanceof AbstractType ? v.toJSON() : v;
      }
    }
    return map
  }

  /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */
  keys () {
    return Object(lib0_iterator_js__WEBPACK_IMPORTED_MODULE_12__["iteratorMap"])(createMapIterator(this._map), /** @param {any} v */ v => v[0])
  }

  /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */
  values () {
    return Object(lib0_iterator_js__WEBPACK_IMPORTED_MODULE_12__["iteratorMap"])(createMapIterator(this._map), /** @param {any} v */ v => v[1].content.getContent()[v[1].length - 1])
  }

  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<any>}
   */
  entries () {
    return Object(lib0_iterator_js__WEBPACK_IMPORTED_MODULE_12__["iteratorMap"])(createMapIterator(this._map), /** @param {any} v */ v => [v[0], v[1].content.getContent()[v[1].length - 1]])
  }

  /**
   * Executes a provided function on once on overy key-value pair.
   *
   * @param {function(T,string,YMap<T>):void} f A function to execute on every element of this YArray.
   */
  forEach (f) {
    /**
     * @type {Object<string,T>}
     */
    const map = {};
    for (const [key, item] of this._map) {
      if (!item.deleted) {
        f(item.content.getContent()[item.length - 1], key, this);
      }
    }
    return map
  }

  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator] () {
    return this.entries()
  }

  /**
   * Remove a specified element from this YMap.
   *
   * @param {string} key The key of the element to remove.
   */
  delete (key) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapDelete(transaction, this, key);
      });
    } else {
      /** @type {Map<string, any>} */ (this._prelimContent).delete(key);
    }
  }

  /**
   * Adds or updates an element with a specified key and value.
   *
   * @param {string} key The key of the element to add to this YMap
   * @param {T} value The value of the element to add
   */
  set (key, value) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapSet(transaction, this, key, value);
      });
    } else {
      /** @type {Map<string, any>} */ (this._prelimContent).set(key, value);
    }
    return value
  }

  /**
   * Returns a specified element from this YMap.
   *
   * @param {string} key
   * @return {T|undefined}
   */
  get (key) {
    return /** @type {any} */ (typeMapGet(this, key))
  }

  /**
   * Returns a boolean indicating whether the specified key exists or not.
   *
   * @param {string} key The key to test.
   * @return {boolean}
   */
  has (key) {
    return typeMapHas(this, key)
  }

  /**
   * @param {encoding.Encoder} encoder
   */
  _write (encoder) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YMapRefID);
  }
}

/**
 * @param {decoding.Decoder} decoder
 *
 * @private
 * @function
 */
const readYMap = decoder => new YMap();

/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
const equalAttrs = (a, b) => a === b || (typeof a === 'object' && typeof b === 'object' && a && b && Object(lib0_object_js__WEBPACK_IMPORTED_MODULE_13__["equalFlat"])(a, b));

class ItemListPosition {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   */
  constructor (left, right) {
    this.left = left;
    this.right = right;
  }
}

class ItemTextListPosition extends ItemListPosition {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {Map<string,any>} currentAttributes
   */
  constructor (left, right, currentAttributes) {
    super(left, right);
    this.currentAttributes = currentAttributes;
  }
}

class ItemInsertionResult extends ItemListPosition {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {Map<string,any>} negatedAttributes
   */
  constructor (left, right, negatedAttributes) {
    super(left, right);
    this.negatedAttributes = negatedAttributes;
  }
}

/**
 * @param {Transaction} transaction
 * @param {Map<string,any>} currentAttributes
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {number} count
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */
const findNextPosition = (transaction, currentAttributes, left, right, count) => {
  while (right !== null && count > 0) {
    switch (right.content.constructor) {
      case ContentEmbed:
      case ContentString:
        if (!right.deleted) {
          if (count < right.length) {
            // split right
            getItemCleanStart(transaction, createID(right.id.client, right.id.clock + count));
          }
          count -= right.length;
        }
        break
      case ContentFormat:
        if (!right.deleted) {
          updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (right.content));
        }
        break
    }
    left = right;
    right = right.right;
  }
  return new ItemTextListPosition(left, right, currentAttributes)
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */
const findPosition = (transaction, parent, index) => {
  const currentAttributes = new Map();
  const right = parent._start;
  return findNextPosition(transaction, currentAttributes, null, right, index)
};

/**
 * Negate applied formats
 *
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {Map<string,any>} negatedAttributes
 * @return {ItemListPosition}
 *
 * @private
 * @function
 */
const insertNegatedAttributes = (transaction, parent, left, right, negatedAttributes) => {
  // check if we really need to remove attributes
  while (
    right !== null && (
      right.deleted === true || (
        right.content.constructor === ContentFormat &&
        equalAttrs(negatedAttributes.get(/** @type {ContentFormat} */ (right.content).key), /** @type {ContentFormat} */ (right.content).value)
      )
    )
  ) {
    if (!right.deleted) {
      negatedAttributes.delete(/** @type {ContentFormat} */ (right.content).key);
    }
    left = right;
    right = right.right;
  }
  for (const [key, val] of negatedAttributes) {
    left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, new ContentFormat(key, val));
    left.integrate(transaction);
  }
  return { left, right }
};

/**
 * @param {Map<string,any>} currentAttributes
 * @param {ContentFormat} format
 *
 * @private
 * @function
 */
const updateCurrentAttributes = (currentAttributes, format) => {
  const { key, value } = format;
  if (value === null) {
    currentAttributes.delete(key);
  } else {
    currentAttributes.set(key, value);
  }
};

/**
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {Map<string,any>} currentAttributes
 * @param {Object<string,any>} attributes
 * @return {ItemListPosition}
 *
 * @private
 * @function
 */
const minimizeAttributeChanges = (left, right, currentAttributes, attributes) => {
  // go right while attributes[right.key] === right.value (or right is deleted)
  while (true) {
    if (right === null) {
      break
    } else if (right.deleted) ; else if (right.content.constructor === ContentFormat && equalAttrs(attributes[(/** @type {ContentFormat} */ (right.content)).key] || null, /** @type {ContentFormat} */ (right.content).value)) {
      // found a format, update currentAttributes and continue
      updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (right.content));
    } else {
      break
    }
    left = right;
    right = right.right;
  }
  return new ItemListPosition(left, right)
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {Map<string,any>} currentAttributes
 * @param {Object<string,any>} attributes
 * @return {ItemInsertionResult}
 *
 * @private
 * @function
 **/
const insertAttributes = (transaction, parent, left, right, currentAttributes, attributes) => {
  const negatedAttributes = new Map();
  // insert format-start items
  for (const key in attributes) {
    const val = attributes[key];
    const currentVal = currentAttributes.get(key) || null;
    if (!equalAttrs(currentVal, val)) {
      // save negated attribute (set null if currentVal undefined)
      negatedAttributes.set(key, currentVal);
      left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, new ContentFormat(key, val));
      left.integrate(transaction);
    }
  }
  return new ItemInsertionResult(left, right, negatedAttributes)
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {Map<string,any>} currentAttributes
 * @param {string|object} text
 * @param {Object<string,any>} attributes
 * @return {ItemListPosition}
 *
 * @private
 * @function
 **/
const insertText = (transaction, parent, left, right, currentAttributes, text, attributes) => {
  for (const [key] of currentAttributes) {
    if (attributes[key] === undefined) {
      attributes[key] = null;
    }
  }
  const minPos = minimizeAttributeChanges(left, right, currentAttributes, attributes);
  const insertPos = insertAttributes(transaction, parent, minPos.left, minPos.right, currentAttributes, attributes);
  left = insertPos.left;
  right = insertPos.right;
  // insert content
  const content = text.constructor === String ? new ContentString(/** @type {string} */ (text)) : new ContentEmbed(text);
  left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, content);
  left.integrate(transaction);
  return insertNegatedAttributes(transaction, parent, left, insertPos.right, insertPos.negatedAttributes)
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {Map<string,any>} currentAttributes
 * @param {number} length
 * @param {Object<string,any>} attributes
 * @return {ItemListPosition}
 *
 * @private
 * @function
 */
const formatText = (transaction, parent, left, right, currentAttributes, length, attributes) => {
  const minPos = minimizeAttributeChanges(left, right, currentAttributes, attributes);
  const insertPos = insertAttributes(transaction, parent, minPos.left, minPos.right, currentAttributes, attributes);
  const negatedAttributes = insertPos.negatedAttributes;
  left = insertPos.left;
  right = insertPos.right;
  // iterate until first non-format or null is found
  // delete all formats with attributes[format.key] != null
  while (length > 0 && right !== null) {
    if (!right.deleted) {
      switch (right.content.constructor) {
        case ContentFormat: {
          const { key, value } = /** @type {ContentFormat} */ (right.content);
          const attr = attributes[key];
          if (attr !== undefined) {
            if (equalAttrs(attr, value)) {
              negatedAttributes.delete(key);
            } else {
              negatedAttributes.set(key, value);
            }
            right.delete(transaction);
          }
          updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (right.content));
          break
        }
        case ContentEmbed:
        case ContentString:
          if (length < right.length) {
            getItemCleanStart(transaction, createID(right.id.client, right.id.clock + length));
          }
          length -= right.length;
          break
      }
    }
    left = right;
    right = right.right;
  }
  // Quill just assumes that the editor starts with a newline and that it always
  // ends with a newline. We only insert that newline when a new newline is
  // inserted - i.e when length is bigger than type.length
  if (length > 0) {
    let newlines = '';
    for (; length > 0; length--) {
      newlines += '\n';
    }
    left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, new ContentString(newlines));
    left.integrate(transaction);
  }
  return insertNegatedAttributes(transaction, parent, left, right, negatedAttributes)
};

/**
 * @param {Transaction} transaction
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {Map<string,any>} currentAttributes
 * @param {number} length
 * @return {ItemListPosition}
 *
 * @private
 * @function
 */
const deleteText = (transaction, left, right, currentAttributes, length) => {
  while (length > 0 && right !== null) {
    if (right.deleted === false) {
      switch (right.content.constructor) {
        case ContentFormat:
          updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (right.content));
          break
        case ContentEmbed:
        case ContentString:
          if (length < right.length) {
            getItemCleanStart(transaction, createID(right.id.client, right.id.clock + length));
          }
          length -= right.length;
          right.delete(transaction);
          break
      }
    }
    left = right;
    right = right.right;
  }
  return { left, right }
};

/**
 * The Quill Delta format represents changes on a text document with
 * formatting information. For mor information visit {@link https://quilljs.com/docs/delta/|Quill Delta}
 *
 * @example
 *   {
 *     ops: [
 *       { insert: 'Gandalf', attributes: { bold: true } },
 *       { insert: ' the ' },
 *       { insert: 'Grey', attributes: { color: '#cccccc' } }
 *     ]
 *   }
 *
 */

/**
  * Attributes that can be assigned to a selection of text.
  *
  * @example
  *   {
  *     bold: true,
  *     font-size: '40px'
  *   }
  *
  * @typedef {Object} TextAttributes
  */

/**
 * @typedef {Object} DeltaItem
 * @property {number|undefined} DeltaItem.delete
 * @property {number|undefined} DeltaItem.retain
 * @property {string|undefined} DeltaItem.string
 * @property {Object<string,any>} DeltaItem.attributes
 */

/**
 * Event that describes the changes on a YText type.
 */
class YTextEvent extends YEvent {
  /**
   * @param {YText} ytext
   * @param {Transaction} transaction
   */
  constructor (ytext, transaction) {
    super(ytext, transaction);
    /**
     * @type {Array<DeltaItem>|null}
     */
    this._delta = null;
  }

  /**
   * Compute the changes in the delta format.
   * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
   *
   * @type {Array<DeltaItem>}
   *
   * @public
   */
  get delta () {
    if (this._delta === null) {
      const y = /** @type {Doc} */ (this.target.doc);
      this._delta = [];
      transact(y, transaction => {
        const delta = /** @type {Array<DeltaItem>} */ (this._delta);
        const currentAttributes = new Map(); // saves all current attributes for insert
        const oldAttributes = new Map();
        let item = this.target._start;
        /**
         * @type {string?}
         */
        let action = null;
        /**
         * @type {Object<string,any>}
         */
        const attributes = {}; // counts added or removed new attributes for retain
        /**
         * @type {string|object}
         */
        let insert = '';
        let retain = 0;
        let deleteLen = 0;
        const addOp = () => {
          if (action !== null) {
            /**
             * @type {any}
             */
            let op;
            switch (action) {
              case 'delete':
                op = { delete: deleteLen };
                deleteLen = 0;
                break
              case 'insert':
                op = { insert };
                if (currentAttributes.size > 0) {
                  op.attributes = {};
                  for (const [key, value] of currentAttributes) {
                    if (value !== null) {
                      op.attributes[key] = value;
                    }
                  }
                }
                insert = '';
                break
              case 'retain':
                op = { retain };
                if (Object.keys(attributes).length > 0) {
                  op.attributes = {};
                  for (const key in attributes) {
                    op.attributes[key] = attributes[key];
                  }
                }
                retain = 0;
                break
            }
            delta.push(op);
            action = null;
          }
        };
        while (item !== null) {
          switch (item.content.constructor) {
            case ContentEmbed:
              if (this.adds(item)) {
                if (!this.deletes(item)) {
                  addOp();
                  action = 'insert';
                  insert = /** @type {ContentEmbed} */ (item.content).embed;
                  addOp();
                }
              } else if (this.deletes(item)) {
                if (action !== 'delete') {
                  addOp();
                  action = 'delete';
                }
                deleteLen += 1;
              } else if (!item.deleted) {
                if (action !== 'retain') {
                  addOp();
                  action = 'retain';
                }
                retain += 1;
              }
              break
            case ContentString:
              if (this.adds(item)) {
                if (!this.deletes(item)) {
                  if (action !== 'insert') {
                    addOp();
                    action = 'insert';
                  }
                  insert += /** @type {ContentString} */ (item.content).str;
                }
              } else if (this.deletes(item)) {
                if (action !== 'delete') {
                  addOp();
                  action = 'delete';
                }
                deleteLen += item.length;
              } else if (!item.deleted) {
                if (action !== 'retain') {
                  addOp();
                  action = 'retain';
                }
                retain += item.length;
              }
              break
            case ContentFormat: {
              const { key, value } = /** @type {ContentFormat} */ (item.content);
              if (this.adds(item)) {
                if (!this.deletes(item)) {
                  const curVal = currentAttributes.get(key) || null;
                  if (!equalAttrs(curVal, value)) {
                    if (action === 'retain') {
                      addOp();
                    }
                    if (equalAttrs(value, (oldAttributes.get(key) || null))) {
                      delete attributes[key];
                    } else {
                      attributes[key] = value;
                    }
                  } else {
                    item.delete(transaction);
                  }
                }
              } else if (this.deletes(item)) {
                oldAttributes.set(key, value);
                const curVal = currentAttributes.get(key) || null;
                if (!equalAttrs(curVal, value)) {
                  if (action === 'retain') {
                    addOp();
                  }
                  attributes[key] = curVal;
                }
              } else if (!item.deleted) {
                oldAttributes.set(key, value);
                const attr = attributes[key];
                if (attr !== undefined) {
                  if (!equalAttrs(attr, value)) {
                    if (action === 'retain') {
                      addOp();
                    }
                    if (value === null) {
                      attributes[key] = value;
                    } else {
                      delete attributes[key];
                    }
                  } else {
                    item.delete(transaction);
                  }
                }
              }
              if (!item.deleted) {
                if (action === 'insert') {
                  addOp();
                }
                updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (item.content));
              }
              break
            }
          }
          item = item.right;
        }
        addOp();
        while (delta.length > 0) {
          const lastOp = delta[delta.length - 1];
          if (lastOp.retain !== undefined && lastOp.attributes === undefined) {
            // retain delta's if they don't assign attributes
            delta.pop();
          } else {
            break
          }
        }
      });
    }
    return this._delta
  }
}

/**
 * Type that represents text with formatting information.
 *
 * This type replaces y-richtext as this implementation is able to handle
 * block formats (format information on a paragraph), embeds (complex elements
 * like pictures and videos), and text formats (**bold**, *italic*).
 *
 * @extends AbstractType<YTextEvent>
 */
class YText extends AbstractType {
  /**
   * @param {String} [string] The initial value of the YText.
   */
  constructor (string) {
    super();
    /**
     * Array of pending operations on this type
     * @type {Array<function():void>?}
     */
    this._pending = string !== undefined ? [() => this.insert(0, string)] : [];
  }

  /**
   * Number of characters of this text type.
   *
   * @type {number}
   */
  get length () {
    return this._length
  }

  /**
   * @param {Doc} y
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item);
    try {
      /** @type {Array<function>} */ (this._pending).forEach(f => f());
    } catch (e) {
      console.error(e);
    }
    this._pending = null;
  }

  _copy () {
    return new YText()
  }

  /**
   * Creates YTextEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) {
    callTypeObservers(this, transaction, new YTextEvent(this, transaction));
  }

  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @public
   */
  toString () {
    let str = '';
    /**
     * @type {Item|null}
     */
    let n = this._start;
    while (n !== null) {
      if (!n.deleted && n.countable && n.content.constructor === ContentString) {
        str += /** @type {ContentString} */ (n.content).str;
      }
      n = n.right;
    }
    return str
  }

  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @return {string}
   * @public
   */
  toJSON () {
    return this.toString()
  }

  /**
   * Apply a {@link Delta} on this shared YText type.
   *
   * @param {any} delta The changes to apply on this element.
   *
   * @public
   */
  applyDelta (delta) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        /**
         * @type {ItemListPosition}
         */
        let pos = new ItemListPosition(null, this._start);
        const currentAttributes = new Map();
        for (let i = 0; i < delta.length; i++) {
          const op = delta[i];
          if (op.insert !== undefined) {
            // Quill assumes that the content starts with an empty paragraph.
            // Yjs/Y.Text assumes that it starts empty. We always hide that
            // there is a newline at the end of the content.
            // If we omit this step, clients will see a different number of
            // paragraphs, but nothing bad will happen.
            const ins = (typeof op.insert === 'string' && i === delta.length - 1 && pos.right === null && op.insert.slice(-1) === '\n') ? op.insert.slice(0, -1) : op.insert;
            if (typeof ins !== 'string' || ins.length > 0) {
              pos = insertText(transaction, this, pos.left, pos.right, currentAttributes, ins, op.attributes || {});
            }
          } else if (op.retain !== undefined) {
            pos = formatText(transaction, this, pos.left, pos.right, currentAttributes, op.retain, op.attributes || {});
          } else if (op.delete !== undefined) {
            pos = deleteText(transaction, pos.left, pos.right, currentAttributes, op.delete);
          }
        }
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.applyDelta(delta));
    }
  }

  /**
   * Returns the Delta representation of this YText type.
   *
   * @param {Snapshot} [snapshot]
   * @param {Snapshot} [prevSnapshot]
   * @param {function('removed' | 'added', ID):any} [computeYChange]
   * @return {any} The Delta representation of this type.
   *
   * @public
   */
  toDelta (snapshot, prevSnapshot, computeYChange) {
    /**
     * @type{Array<any>}
     */
    const ops = [];
    const currentAttributes = new Map();
    const doc = /** @type {Doc} */ (this.doc);
    let str = '';
    let n = this._start;
    function packStr () {
      if (str.length > 0) {
        // pack str with attributes to ops
        /**
         * @type {Object<string,any>}
         */
        const attributes = {};
        let addAttributes = false;
        for (const [key, value] of currentAttributes) {
          addAttributes = true;
          attributes[key] = value;
        }
        /**
         * @type {Object<string,any>}
         */
        const op = { insert: str };
        if (addAttributes) {
          op.attributes = attributes;
        }
        ops.push(op);
        str = '';
      }
    }
    // snapshots are merged again after the transaction, so we need to keep the
    // transalive until we are done
    transact(doc, transaction => {
      if (snapshot) {
        splitSnapshotAffectedStructs(transaction, snapshot);
      }
      if (prevSnapshot) {
        splitSnapshotAffectedStructs(transaction, prevSnapshot);
      }
      while (n !== null) {
        if (isVisible(n, snapshot) || (prevSnapshot !== undefined && isVisible(n, prevSnapshot))) {
          switch (n.content.constructor) {
            case ContentString: {
              const cur = currentAttributes.get('ychange');
              if (snapshot !== undefined && !isVisible(n, snapshot)) {
                if (cur === undefined || cur.user !== n.id.client || cur.state !== 'removed') {
                  packStr();
                  currentAttributes.set('ychange', computeYChange ? computeYChange('removed', n.id) : { type: 'removed' });
                }
              } else if (prevSnapshot !== undefined && !isVisible(n, prevSnapshot)) {
                if (cur === undefined || cur.user !== n.id.client || cur.state !== 'added') {
                  packStr();
                  currentAttributes.set('ychange', computeYChange ? computeYChange('added', n.id) : { type: 'added' });
                }
              } else if (cur !== undefined) {
                packStr();
                currentAttributes.delete('ychange');
              }
              str += /** @type {ContentString} */ (n.content).str;
              break
            }
            case ContentEmbed: {
              packStr();
              /**
               * @type {Object<string,any>}
               */
              const op = {
                insert: /** @type {ContentEmbed} */ (n.content).embed
              };
              if (currentAttributes.size > 0) {
                const attrs = /** @type {Object<string,any>} */ ({});
                op.attributes = attrs;
                for (const [key, value] of currentAttributes) {
                  attrs[key] = value;
                }
              }
              ops.push(op);
              break
            }
            case ContentFormat:
              if (isVisible(n, snapshot)) {
                packStr();
                updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (n.content));
              }
              break
          }
        }
        n = n.right;
      }
      packStr();
    }, splitSnapshotAffectedStructs);
    return ops
  }

  /**
   * Insert text at a given index.
   *
   * @param {number} index The index at which to start inserting.
   * @param {String} text The text to insert at the specified position.
   * @param {TextAttributes} [attributes] Optionally define some formatting
   *                                    information to apply on the inserted
   *                                    Text.
   * @public
   */
  insert (index, text, attributes) {
    if (text.length <= 0) {
      return
    }
    const y = this.doc;
    if (y !== null) {
      transact(y, transaction => {
        const { left, right, currentAttributes } = findPosition(transaction, this, index);
        if (!attributes) {
          attributes = {};
          // @ts-ignore
          currentAttributes.forEach((v, k) => { attributes[k] = v; });
        }
        insertText(transaction, this, left, right, currentAttributes, text, attributes);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.insert(index, text, attributes));
    }
  }

  /**
   * Inserts an embed at a index.
   *
   * @param {number} index The index to insert the embed at.
   * @param {Object} embed The Object that represents the embed.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    embed
   *
   * @public
   */
  insertEmbed (index, embed, attributes = {}) {
    if (embed.constructor !== Object) {
      throw new Error('Embed must be an Object')
    }
    const y = this.doc;
    if (y !== null) {
      transact(y, transaction => {
        const { left, right, currentAttributes } = findPosition(transaction, this, index);
        insertText(transaction, this, left, right, currentAttributes, embed, attributes);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.insertEmbed(index, embed, attributes));
    }
  }

  /**
   * Deletes text starting from an index.
   *
   * @param {number} index Index at which to start deleting.
   * @param {number} length The number of characters to remove. Defaults to 1.
   *
   * @public
   */
  delete (index, length) {
    if (length === 0) {
      return
    }
    const y = this.doc;
    if (y !== null) {
      transact(y, transaction => {
        const { left, right, currentAttributes } = findPosition(transaction, this, index);
        deleteText(transaction, left, right, currentAttributes, length);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.delete(index, length));
    }
  }

  /**
   * Assigns properties to a range of text.
   *
   * @param {number} index The position where to start formatting.
   * @param {number} length The amount of characters to assign properties to.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    text.
   *
   * @public
   */
  format (index, length, attributes) {
    const y = this.doc;
    if (y !== null) {
      transact(y, transaction => {
        const { left, right, currentAttributes } = findPosition(transaction, this, index);
        if (right === null) {
          return
        }
        formatText(transaction, this, left, right, currentAttributes, length, attributes);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.format(index, length, attributes));
    }
  }

  /**
   * @param {encoding.Encoder} encoder
   */
  _write (encoder) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YTextRefID);
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {YText}
 *
 * @private
 * @function
 */
const readYText = decoder => new YText();

/**
 * @module YXml
 */

/**
 * Define the elements to which a set of CSS queries apply.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors|CSS_Selectors}
 *
 * @example
 *   query = '.classSelector'
 *   query = 'nodeSelector'
 *   query = '#idSelector'
 *
 * @typedef {string} CSS_Selector
 */

/**
 * Dom filter function.
 *
 * @callback domFilter
 * @param {string} nodeName The nodeName of the element
 * @param {Map} attributes The map of attributes.
 * @return {boolean} Whether to include the Dom node in the YXmlElement.
 */

/**
 * Represents a subset of the nodes of a YXmlElement / YXmlFragment and a
 * position within them.
 *
 * Can be created with {@link YXmlFragment#createTreeWalker}
 *
 * @public
 * @implements {IterableIterator}
 */
class YXmlTreeWalker {
  /**
   * @param {YXmlFragment | YXmlElement} root
   * @param {function(AbstractType<any>):boolean} [f]
   */
  constructor (root, f = () => true) {
    this._filter = f;
    this._root = root;
    /**
     * @type {Item}
     */
    this._currentNode = /** @type {Item} */ (root._start);
    this._firstCall = true;
  }

  [Symbol.iterator] () {
    return this
  }

  /**
   * Get the next node.
   *
   * @return {IteratorResult<YXmlElement|YXmlText|YXmlHook>} The next node.
   *
   * @public
   */
  next () {
    /**
     * @type {Item|null}
     */
    let n = this._currentNode;
    let type = /** @type {ContentType} */ (n.content).type;
    if (n !== null && (!this._firstCall || n.deleted || !this._filter(type))) { // if first call, we check if we can use the first item
      do {
        type = /** @type {ContentType} */ (n.content).type;
        if (!n.deleted && (type.constructor === YXmlElement || type.constructor === YXmlFragment) && type._start !== null) {
          // walk down in the tree
          n = type._start;
        } else {
          // walk right or up in the tree
          while (n !== null) {
            if (n.right !== null) {
              n = n.right;
              break
            } else if (n.parent === this._root) {
              n = null;
            } else {
              n = n.parent._item;
            }
          }
        }
      } while (n !== null && (n.deleted || !this._filter(/** @type {ContentType} */ (n.content).type)))
    }
    this._firstCall = false;
    if (n === null) {
      // @ts-ignore
      return { value: undefined, done: true }
    }
    this._currentNode = n;
    return { value: /** @type {any} */ (n.content).type, done: false }
  }
}

/**
 * Represents a list of {@link YXmlElement}.and {@link YXmlText} types.
 * A YxmlFragment is similar to a {@link YXmlElement}, but it does not have a
 * nodeName and it does not have attributes. Though it can be bound to a DOM
 * element - in this case the attributes and the nodeName are not shared.
 *
 * @public
 * @extends AbstractType<YXmlEvent>
 */
class YXmlFragment extends AbstractType {
  constructor () {
    super();
    /**
     * @type {Array<any>|null}
     */
    this._prelimContent = [];
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item);
    this.insert(0, /** @type {Array<any>} */ (this._prelimContent));
    this._prelimContent = null;
  }

  _copy () {
    return new YXmlFragment()
  }

  get length () {
    return this._prelimContent === null ? this._length : this._prelimContent.length
  }

  /**
   * Create a subtree of childNodes.
   *
   * @example
   * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
   * for (let node in walker) {
   *   // `node` is a div node
   *   nop(node)
   * }
   *
   * @param {function(AbstractType<any>):boolean} filter Function that is called on each child element and
   *                          returns a Boolean indicating whether the child
   *                          is to be included in the subtree.
   * @return {YXmlTreeWalker} A subtree and a position within it.
   *
   * @public
   */
  createTreeWalker (filter) {
    return new YXmlTreeWalker(this, filter)
  }

  /**
   * Returns the first YXmlElement that matches the query.
   * Similar to DOM's {@link querySelector}.
   *
   * Query support:
   *   - tagname
   * TODO:
   *   - id
   *   - attribute
   *
   * @param {CSS_Selector} query The query on the children.
   * @return {YXmlElement|YXmlText|YXmlHook|null} The first element that matches the query or null.
   *
   * @public
   */
  querySelector (query) {
    query = query.toUpperCase();
    // @ts-ignore
    const iterator = new YXmlTreeWalker(this, element => element.nodeName && element.nodeName.toUpperCase() === query);
    const next = iterator.next();
    if (next.done) {
      return null
    } else {
      return next.value
    }
  }

  /**
   * Returns all YXmlElements that match the query.
   * Similar to Dom's {@link querySelectorAll}.
   *
   * @todo Does not yet support all queries. Currently only query by tagName.
   *
   * @param {CSS_Selector} query The query on the children
   * @return {Array<YXmlElement|YXmlText|YXmlHook|null>} The elements that match this query.
   *
   * @public
   */
  querySelectorAll (query) {
    query = query.toUpperCase();
    // @ts-ignore
    return Array.from(new YXmlTreeWalker(this, element => element.nodeName && element.nodeName.toUpperCase() === query))
  }

  /**
   * Creates YXmlEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) {
    callTypeObservers(this, transaction, new YXmlEvent(this, parentSubs, transaction));
  }

  /**
   * Get the string representation of all the children of this YXmlFragment.
   *
   * @return {string} The string representation of all children.
   */
  toString () {
    return typeListMap(this, xml => xml.toString()).join('')
  }

  /**
   * @return {string}
   */
  toJSON () {
    return this.toString()
  }

  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM (_document = document, hooks = {}, binding) {
    const fragment = _document.createDocumentFragment();
    if (binding !== undefined) {
      binding._createAssociation(fragment, this);
    }
    typeListForEach(this, xmlType => {
      fragment.insertBefore(xmlType.toDOM(_document, hooks, binding), null);
    });
    return fragment
  }

  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {number} index The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insert (index, content) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListInsertGenerics(transaction, this, index, content);
      });
    } else {
      // @ts-ignore _prelimContent is defined because this is not yet integrated
      this._prelimContent.splice(index, 0, ...content);
    }
  }

  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} [length=1] The number of elements to remove. Defaults to 1.
   */
  delete (index, length = 1) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListDelete(transaction, this, index, length);
      });
    } else {
      // @ts-ignore _prelimContent is defined because this is not yet integrated
      this._prelimContent.splice(index, length);
    }
  }

  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<YXmlElement|YXmlText|YXmlHook>}
   */
  toArray () {
    return typeListToArray(this)
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {encoding.Encoder} encoder The encoder to write data to.
   */
  _write (encoder) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YXmlFragmentRefID);
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {YXmlFragment}
 *
 * @private
 * @function
 */
const readYXmlFragment = decoder => new YXmlFragment();

/**
 * An YXmlElement imitates the behavior of a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}.
 *
 * * An YXmlElement has attributes (key value pairs)
 * * An YXmlElement has childElements that must inherit from YXmlElement
 */
class YXmlElement extends YXmlFragment {
  constructor (nodeName = 'UNDEFINED') {
    super();
    this.nodeName = nodeName;
    /**
     * @type {Map<string, any>|null}
     */
    this._prelimAttrs = new Map();
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item)
    ;(/** @type {Map<string, any>} */ (this._prelimAttrs)).forEach((value, key) => {
      this.setAttribute(key, value);
    });
    this._prelimAttrs = null;
  }

  /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @return {YXmlElement}
   */
  _copy () {
    return new YXmlElement(this.nodeName)
  }

  /**
   * Returns the XML serialization of this YXmlElement.
   * The attributes are ordered by attribute-name, so you can easily use this
   * method to compare YXmlElements
   *
   * @return {string} The string representation of this type.
   *
   * @public
   */
  toString () {
    const attrs = this.getAttributes();
    const stringBuilder = [];
    const keys = [];
    for (const key in attrs) {
      keys.push(key);
    }
    keys.sort();
    const keysLen = keys.length;
    for (let i = 0; i < keysLen; i++) {
      const key = keys[i];
      stringBuilder.push(key + '="' + attrs[key] + '"');
    }
    const nodeName = this.nodeName.toLocaleLowerCase();
    const attrsString = stringBuilder.length > 0 ? ' ' + stringBuilder.join(' ') : '';
    return `<${nodeName}${attrsString}>${super.toString()}</${nodeName}>`
  }

  /**
   * Removes an attribute from this YXmlElement.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute (attributeName) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapDelete(transaction, this, attributeName);
      });
    } else {
      /** @type {Map<string,any>} */ (this._prelimAttrs).delete(attributeName);
    }
  }

  /**
   * Sets or updates an attribute.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {String} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute (attributeName, attributeValue) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapSet(transaction, this, attributeName, attributeValue);
      });
    } else {
      /** @type {Map<string, any>} */ (this._prelimAttrs).set(attributeName, attributeValue);
    }
  }

  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {String} The queried attribute value.
   *
   * @public
   */
  getAttribute (attributeName) {
    return /** @type {any} */ (typeMapGet(this, attributeName))
  }

  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @param {Snapshot} [snapshot]
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes (snapshot) {
    return typeMapGetAll(this)
  }

  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM (_document = document, hooks = {}, binding) {
    const dom = _document.createElement(this.nodeName);
    const attrs = this.getAttributes();
    for (const key in attrs) {
      dom.setAttribute(key, attrs[key]);
    }
    typeListForEach(this, yxml => {
      dom.appendChild(yxml.toDOM(_document, hooks, binding));
    });
    if (binding !== undefined) {
      binding._createAssociation(dom, this);
    }
    return dom
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {encoding.Encoder} encoder The encoder to write data to.
   */
  _write (encoder) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YXmlElementRefID);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, this.nodeName);
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {YXmlElement}
 *
 * @function
 */
const readYXmlElement = decoder => new YXmlElement(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder));

/**
 * An Event that describes changes on a YXml Element or Yxml Fragment
 */
class YXmlEvent extends YEvent {
  /**
   * @param {YXmlElement|YXmlFragment} target The target on which the event is created.
   * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
   *                   child list changed.
   * @param {Transaction} transaction The transaction instance with wich the
   *                                  change was created.
   */
  constructor (target, subs, transaction) {
    super(target, transaction);
    /**
     * Whether the children changed.
     * @type {Boolean}
     * @private
     */
    this.childListChanged = false;
    /**
     * Set of all changed attributes.
     * @type {Set<string|null>}
     */
    this.attributesChanged = new Set();
    subs.forEach((sub) => {
      if (sub === null) {
        this.childListChanged = true;
      } else {
        this.attributesChanged.add(sub);
      }
    });
  }
}

/**
 * You can manage binding to a custom type with YXmlHook.
 *
 * @extends {YMap<any>}
 */
class YXmlHook extends YMap {
  /**
   * @param {string} hookName nodeName of the Dom Node.
   */
  constructor (hookName) {
    super();
    /**
     * @type {string}
     */
    this.hookName = hookName;
  }

  /**
   * Creates an Item with the same effect as this Item (without position effect)
   */
  _copy () {
    return new YXmlHook(this.hookName)
  }

  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object.<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type
   * @return {Element} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM (_document = document, hooks = {}, binding) {
    const hook = hooks[this.hookName];
    let dom;
    if (hook !== undefined) {
      dom = hook.createDom(this);
    } else {
      dom = document.createElement(this.hookName);
    }
    dom.setAttribute('data-yjs-hook', this.hookName);
    if (binding !== undefined) {
      binding._createAssociation(dom, this);
    }
    return dom
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {encoding.Encoder} encoder The encoder to write data to.
   */
  _write (encoder) {
    super._write(encoder);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YXmlHookRefID);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, this.hookName);
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {YXmlHook}
 *
 * @private
 * @function
 */
const readYXmlHook = decoder =>
  new YXmlHook(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder));

/**
 * Represents text in a Dom Element. In the future this type will also handle
 * simple formatting information like bold and italic.
 */
class YXmlText extends YText {
  _copy () {
    return new YXmlText()
  }

  /**
   * Creates a Dom Element that mirrors this YXmlText.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Text} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM (_document = document, hooks, binding) {
    const dom = _document.createTextNode(this.toString());
    if (binding !== undefined) {
      binding._createAssociation(dom, this);
    }
    return dom
  }

  toString () {
    // @ts-ignore
    return this.toDelta().map(delta => {
      const nestedNodes = [];
      for (const nodeName in delta.attributes) {
        const attrs = [];
        for (const key in delta.attributes[nodeName]) {
          attrs.push({ key, value: delta.attributes[nodeName][key] });
        }
        // sort attributes to get a unique order
        attrs.sort((a, b) => a.key < b.key ? -1 : 1);
        nestedNodes.push({ nodeName, attrs });
      }
      // sort node order to get a unique order
      nestedNodes.sort((a, b) => a.nodeName < b.nodeName ? -1 : 1);
      // now convert to dom string
      let str = '';
      for (let i = 0; i < nestedNodes.length; i++) {
        const node = nestedNodes[i];
        str += `<${node.nodeName}`;
        for (let j = 0; j < node.attrs.length; j++) {
          const attr = node.attrs[j];
          str += ` ${attr.key}="${attr.value}"`;
        }
        str += '>';
      }
      str += delta.insert;
      for (let i = nestedNodes.length - 1; i >= 0; i--) {
        str += `</${nestedNodes[i].nodeName}>`;
      }
      return str
    }).join('')
  }

  /**
   * @return {string}
   */
  toJSON () {
    return this.toString()
  }

  /**
   * @param {encoding.Encoder} encoder
   */
  _write (encoder) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YXmlTextRefID);
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {YXmlText}
 *
 * @private
 * @function
 */
const readYXmlText = decoder => new YXmlText();

class AbstractStruct {
  /**
   * @param {ID} id
   * @param {number} length
   */
  constructor (id, length) {
    /**
     * The uniqe identifier of this struct.
     * @type {ID}
     * @readonly
     */
    this.id = id;
    this.length = length;
    this.deleted = false;
  }

  /**
   * Merge this struct with the item to the right.
   * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
   * Also this method does *not* remove right from StructStore!
   * @param {AbstractStruct} right
   * @return {boolean} wether this merged with right
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {encoding.Encoder} encoder The encoder to write data to.
   * @param {number} offset
   * @param {number} encodingRef
   */
  write (encoder, offset, encodingRef) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }

  /**
   * @param {Transaction} transaction
   */
  integrate (transaction) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }
}

class AbstractStructRef {
  /**
   * @param {ID} id
   */
  constructor (id) {
    /**
     * @type {Array<ID>}
     */
    this._missing = [];
    /**
     * The uniqe identifier of this type.
     * @type {ID}
     */
    this.id = id;
  }

  /**
   * @param {Transaction} transaction
   * @return {Array<ID|null>}
   */
  getMissing (transaction) {
    return this._missing
  }

  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @param {number} offset
   * @return {AbstractStruct}
   */
  toStruct (transaction, store, offset) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }
}

const structGCRefNumber = 0;

/**
 * @private
 */
class GC extends AbstractStruct {
  /**
   * @param {ID} id
   * @param {number} length
   */
  constructor (id, length) {
    super(id, length);
    this.deleted = true;
  }

  delete () {}

  /**
   * @param {GC} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.length += right.length;
    return true
  }

  /**
   * @param {Transaction} transaction
   */
  integrate (transaction) {
    addStruct(transaction.doc.store, this);
  }

  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeUint8"])(encoder, structGCRefNumber);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, this.length - offset);
  }
}

/**
 * @private
 */
class GCRef extends AbstractStructRef {
  /**
   * @param {decoding.Decoder} decoder
   * @param {ID} id
   * @param {number} info
   */
  constructor (decoder, id, info) {
    super(id);
    /**
     * @type {number}
     */
    this.length = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  }

  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @param {number} offset
   * @return {GC}
   */
  toStruct (transaction, store, offset) {
    if (offset > 0) {
      // @ts-ignore
      this.id = createID(this.id.client, this.id.clock + offset);
      this.length -= offset;
    }
    return new GC(
      this.id,
      this.length
    )
  }
}

class ContentBinary {
  /**
   * @param {Uint8Array} content
   */
  constructor (content) {
    this.content = content;
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return [this.content]
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentBinary}
   */
  copy () {
    return new ContentBinary(this.content)
  }

  /**
   * @param {number} offset
   * @return {ContentBinary}
   */
  splice (offset) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }

  /**
   * @param {ContentBinary} right
   * @return {boolean}
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint8Array"])(encoder, this.content);
  }

  /**
   * @return {number}
   */
  getRef () {
    return 3
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {ContentBinary}
 */
const readContentBinary = decoder => new ContentBinary(Object(lib0_buffer_js__WEBPACK_IMPORTED_MODULE_14__["copyUint8Array"])(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint8Array"])(decoder)));

class ContentDeleted {
  /**
   * @param {number} len
   */
  constructor (len) {
    this.len = len;
  }

  /**
   * @return {number}
   */
  getLength () {
    return this.len
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return []
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return false
  }

  /**
   * @return {ContentDeleted}
   */
  copy () {
    return new ContentDeleted(this.len)
  }

  /**
   * @param {number} offset
   * @return {ContentDeleted}
   */
  splice (offset) {
    const right = new ContentDeleted(this.len - offset);
    this.len = offset;
    return right
  }

  /**
   * @param {ContentDeleted} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.len += right.len;
    return true
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {
    addToDeleteSet(transaction.deleteSet, item.id, this.len);
    item.deleted = true;
  }

  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, this.len - offset);
  }

  /**
   * @return {number}
   */
  getRef () {
    return 1
  }
}

/**
 * @private
 *
 * @param {decoding.Decoder} decoder
 * @return {ContentDeleted}
 */
const readContentDeleted = decoder => new ContentDeleted(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder));

/**
 * @private
 */
class ContentEmbed {
  /**
   * @param {Object} embed
   */
  constructor (embed) {
    this.embed = embed;
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return [this.embed]
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentEmbed}
   */
  copy () {
    return new ContentEmbed(this.embed)
  }

  /**
   * @param {number} offset
   * @return {ContentEmbed}
   */
  splice (offset) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }

  /**
   * @param {ContentEmbed} right
   * @return {boolean}
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, JSON.stringify(this.embed));
  }

  /**
   * @return {number}
   */
  getRef () {
    return 5
  }
}

/**
 * @private
 *
 * @param {decoding.Decoder} decoder
 * @return {ContentEmbed}
 */
const readContentEmbed = decoder => new ContentEmbed(JSON.parse(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder)));

/**
 * @private
 */
class ContentFormat {
  /**
   * @param {string} key
   * @param {Object} value
   */
  constructor (key, value) {
    this.key = key;
    this.value = value;
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return []
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return false
  }

  /**
   * @return {ContentFormat}
   */
  copy () {
    return new ContentFormat(this.key, this.value)
  }

  /**
   * @param {number} offset
   * @return {ContentFormat}
   */
  splice (offset) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }

  /**
   * @param {ContentFormat} right
   * @return {boolean}
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, this.key);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, JSON.stringify(this.value));
  }

  /**
   * @return {number}
   */
  getRef () {
    return 6
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {ContentFormat}
 */
const readContentFormat = decoder => new ContentFormat(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder), JSON.parse(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder)));

/**
 * @private
 */
class ContentJSON {
  /**
   * @param {Array<any>} arr
   */
  constructor (arr) {
    /**
     * @type {Array<any>}
     */
    this.arr = arr;
  }

  /**
   * @return {number}
   */
  getLength () {
    return this.arr.length
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return this.arr
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentJSON}
   */
  copy () {
    return new ContentJSON(this.arr)
  }

  /**
   * @param {number} offset
   * @return {ContentJSON}
   */
  splice (offset) {
    const right = new ContentJSON(this.arr.slice(offset));
    this.arr = this.arr.slice(0, offset);
    return right
  }

  /**
   * @param {ContentJSON} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.arr = this.arr.concat(right.arr);
    return true
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    const len = this.arr.length;
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, len - offset);
    for (let i = offset; i < len; i++) {
      const c = this.arr[i];
      Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, c === undefined ? 'undefined' : JSON.stringify(c));
    }
  }

  /**
   * @return {number}
   */
  getRef () {
    return 2
  }
}

/**
 * @private
 *
 * @param {decoding.Decoder} decoder
 * @return {ContentJSON}
 */
const readContentJSON = decoder => {
  const len = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  const cs = [];
  for (let i = 0; i < len; i++) {
    const c = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder);
    if (c === 'undefined') {
      cs.push(undefined);
    } else {
      cs.push(JSON.parse(c));
    }
  }
  return new ContentJSON(cs)
};

class ContentAny {
  /**
   * @param {Array<any>} arr
   */
  constructor (arr) {
    /**
     * @type {Array<any>}
     */
    this.arr = arr;
  }

  /**
   * @return {number}
   */
  getLength () {
    return this.arr.length
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return this.arr
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentAny}
   */
  copy () {
    return new ContentAny(this.arr)
  }

  /**
   * @param {number} offset
   * @return {ContentAny}
   */
  splice (offset) {
    const right = new ContentAny(this.arr.slice(offset));
    this.arr = this.arr.slice(0, offset);
    return right
  }

  /**
   * @param {ContentAny} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.arr = this.arr.concat(right.arr);
    return true
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    const len = this.arr.length;
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, len - offset);
    for (let i = offset; i < len; i++) {
      const c = this.arr[i];
      Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeAny"])(encoder, c);
    }
  }

  /**
   * @return {number}
   */
  getRef () {
    return 8
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {ContentAny}
 */
const readContentAny = decoder => {
  const len = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  const cs = [];
  for (let i = 0; i < len; i++) {
    cs.push(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readAny"])(decoder));
  }
  return new ContentAny(cs)
};

/**
 * @private
 */
class ContentString {
  /**
   * @param {string} str
   */
  constructor (str) {
    /**
     * @type {string}
     */
    this.str = str;
  }

  /**
   * @return {number}
   */
  getLength () {
    return this.str.length
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return this.str.split('')
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentString}
   */
  copy () {
    return new ContentString(this.str)
  }

  /**
   * @param {number} offset
   * @return {ContentString}
   */
  splice (offset) {
    const right = new ContentString(this.str.slice(offset));
    this.str = this.str.slice(0, offset);
    return right
  }

  /**
   * @param {ContentString} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.str += right.str;
    return true
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, offset === 0 ? this.str : this.str.slice(offset));
  }

  /**
   * @return {number}
   */
  getRef () {
    return 4
  }
}

/**
 * @private
 *
 * @param {decoding.Decoder} decoder
 * @return {ContentString}
 */
const readContentString = decoder => new ContentString(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder));

/**
 * @type {Array<function(decoding.Decoder):AbstractType<any>>}
 * @private
 */
const typeRefs = [
  readYArray,
  readYMap,
  readYText,
  readYXmlElement,
  readYXmlFragment,
  readYXmlHook,
  readYXmlText
];

const YArrayRefID = 0;
const YMapRefID = 1;
const YTextRefID = 2;
const YXmlElementRefID = 3;
const YXmlFragmentRefID = 4;
const YXmlHookRefID = 5;
const YXmlTextRefID = 6;

/**
 * @private
 */
class ContentType {
  /**
   * @param {AbstractType<YEvent>} type
   */
  constructor (type) {
    /**
     * @type {AbstractType<any>}
     */
    this.type = type;
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return [this.type]
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentType}
   */
  copy () {
    return new ContentType(this.type._copy())
  }

  /**
   * @param {number} offset
   * @return {ContentType}
   */
  splice (offset) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }

  /**
   * @param {ContentType} right
   * @return {boolean}
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {
    this.type._integrate(transaction.doc, item);
  }

  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {
    let item = this.type._start;
    while (item !== null) {
      if (!item.deleted) {
        item.delete(transaction);
      } else {
        // Whis will be gc'd later and we want to merge it if possible
        // We try to merge all deleted items after each transaction,
        // but we have no knowledge about that this needs to be merged
        // since it is not in transaction.ds. Hence we add it to transaction._mergeStructs
        transaction._mergeStructs.add(item.id);
      }
      item = item.right;
    }
    this.type._map.forEach(item => {
      if (!item.deleted) {
        item.delete(transaction);
      } else {
        // same as above
        transaction._mergeStructs.add(item.id);
      }
    });
    transaction.changed.delete(this.type);
  }

  /**
   * @param {StructStore} store
   */
  gc (store) {
    let item = this.type._start;
    while (item !== null) {
      item.gc(store, true);
      item = item.right;
    }
    this.type._start = null;
    this.type._map.forEach(/** @param {Item | null} item */ (item) => {
      while (item !== null) {
        item.gc(store, true);
        item = item.left;
      }
    });
    this.type._map = new Map();
  }

  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    this.type._write(encoder);
  }

  /**
   * @return {number}
   */
  getRef () {
    return 7
  }
}

/**
 * @private
 *
 * @param {decoding.Decoder} decoder
 * @return {ContentType}
 */
const readContentType = decoder => new ContentType(typeRefs[Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder)](decoder));

/**
 * @todo This should return several items
 *
 * @param {StructStore} store
 * @param {ID} id
 * @return {{item:Item, diff:number}}
 */
const followRedone = (store, id) => {
  /**
   * @type {ID|null}
   */
  let nextID = id;
  let diff = 0;
  let item;
  do {
    if (diff > 0) {
      nextID = createID(nextID.client, nextID.clock + diff);
    }
    item = getItem(store, nextID);
    diff = nextID.clock - item.id.clock;
    nextID = item.redone;
  } while (nextID !== null && item instanceof Item)
  return {
    item, diff
  }
};

/**
 * Make sure that neither item nor any of its parents is ever deleted.
 *
 * This property does not persist when storing it into a database or when
 * sending it to other peers
 *
 * @param {Item|null} item
 * @param {boolean} keep
 */
const keepItem = (item, keep) => {
  while (item !== null && item.keep !== keep) {
    item.keep = keep;
    item = item.parent._item;
  }
};

/**
 * Split leftItem into two items
 * @param {Transaction} transaction
 * @param {Item} leftItem
 * @param {number} diff
 * @return {Item}
 *
 * @function
 * @private
 */
const splitItem = (transaction, leftItem, diff) => {
  const id = leftItem.id;
  // create rightItem
  const rightItem = new Item(
    createID(id.client, id.clock + diff),
    leftItem,
    createID(id.client, id.clock + diff - 1),
    leftItem.right,
    leftItem.rightOrigin,
    leftItem.parent,
    leftItem.parentSub,
    leftItem.content.splice(diff)
  );
  if (leftItem.deleted) {
    rightItem.deleted = true;
  }
  if (leftItem.keep) {
    rightItem.keep = true;
  }
  if (leftItem.redone !== null) {
    rightItem.redone = createID(leftItem.redone.client, leftItem.redone.clock + diff);
  }
  // update left (do not set leftItem.rightOrigin as it will lead to problems when syncing)
  leftItem.right = rightItem;
  // update right
  if (rightItem.right !== null) {
    rightItem.right.left = rightItem;
  }
  // right is more specific.
  transaction._mergeStructs.add(rightItem.id);
  // update parent._map
  if (rightItem.parentSub !== null && rightItem.right === null) {
    rightItem.parent._map.set(rightItem.parentSub, rightItem);
  }
  leftItem.length = diff;
  return rightItem
};

/**
 * Redoes the effect of this operation.
 *
 * @param {Transaction} transaction The Yjs instance.
 * @param {Item} item
 * @param {Set<Item>} redoitems
 *
 * @return {Item|null}
 *
 * @private
 */
const redoItem = (transaction, item, redoitems) => {
  if (item.redone !== null) {
    return getItemCleanStart(transaction, item.redone)
  }
  let parentItem = item.parent._item;
  /**
   * @type {Item|null}
   */
  let left;
  /**
   * @type {Item|null}
   */
  let right;
  if (item.parentSub === null) {
    // Is an array item. Insert at the old position
    left = item.left;
    right = item;
  } else {
    // Is a map item. Insert as current value
    left = item;
    while (left.right !== null) {
      left = left.right;
      if (left.id.client !== transaction.doc.clientID) {
        // It is not possible to redo this item because it conflicts with a
        // change from another client
        return null
      }
    }
    if (left.right !== null) {
      left = /** @type {Item} */ (item.parent._map.get(item.parentSub));
    }
    right = null;
  }
  // make sure that parent is redone
  if (parentItem !== null && parentItem.deleted === true && parentItem.redone === null) {
    // try to undo parent if it will be undone anyway
    if (!redoitems.has(parentItem) || redoItem(transaction, parentItem, redoitems) === null) {
      return null
    }
  }
  if (parentItem !== null && parentItem.redone !== null) {
    while (parentItem.redone !== null) {
      parentItem = getItemCleanStart(transaction, parentItem.redone);
    }
    // find next cloned_redo items
    while (left !== null) {
      /**
       * @type {Item|null}
       */
      let leftTrace = left;
      // trace redone until parent matches
      while (leftTrace !== null && leftTrace.parent._item !== parentItem) {
        leftTrace = leftTrace.redone === null ? null : getItemCleanStart(transaction, leftTrace.redone);
      }
      if (leftTrace !== null && leftTrace.parent._item === parentItem) {
        left = leftTrace;
        break
      }
      left = left.left;
    }
    while (right !== null) {
      /**
       * @type {Item|null}
       */
      let rightTrace = right;
      // trace redone until parent matches
      while (rightTrace !== null && rightTrace.parent._item !== parentItem) {
        rightTrace = rightTrace.redone === null ? null : getItemCleanStart(transaction, rightTrace.redone);
      }
      if (rightTrace !== null && rightTrace.parent._item === parentItem) {
        right = rightTrace;
        break
      }
      right = right.right;
    }
  }
  const redoneItem = new Item(
    nextID(transaction),
    left, left === null ? null : left.lastId,
    right, right === null ? null : right.id,
    parentItem === null ? item.parent : /** @type {ContentType} */ (parentItem.content).type,
    item.parentSub,
    item.content.copy()
  );
  item.redone = redoneItem.id;
  keepItem(redoneItem, true);
  redoneItem.integrate(transaction);
  return redoneItem
};

/**
 * Abstract class that represents any content.
 */
class Item extends AbstractStruct {
  /**
   * @param {ID} id
   * @param {Item | null} left
   * @param {ID | null} origin
   * @param {Item | null} right
   * @param {ID | null} rightOrigin
   * @param {AbstractType<any>} parent
   * @param {string | null} parentSub
   * @param {AbstractContent} content
   */
  constructor (id, left, origin, right, rightOrigin, parent, parentSub, content) {
    super(id, content.getLength());
    /**
     * The item that was originally to the left of this item.
     * @type {ID | null}
     * @readonly
     */
    this.origin = origin;
    /**
     * The item that is currently to the left of this item.
     * @type {Item | null}
     */
    this.left = left;
    /**
     * The item that is currently to the right of this item.
     * @type {Item | null}
     */
    this.right = right;
    /**
     * The item that was originally to the right of this item.
     * @readonly
     * @type {ID | null}
     */
    this.rightOrigin = rightOrigin;
    /**
     * The parent type.
     * @type {AbstractType<any>}
     * @readonly
     */
    this.parent = parent;
    /**
     * If the parent refers to this item with some kind of key (e.g. YMap, the
     * key is specified here. The key is then used to refer to the list in which
     * to insert this item. If `parentSub = null` type._start is the list in
     * which to insert to. Otherwise it is `parent._map`.
     * @type {String | null}
     * @readonly
     */
    this.parentSub = parentSub;
    /**
     * Whether this item was deleted or not.
     * @type {Boolean}
     */
    this.deleted = false;
    /**
     * If this type's effect is reundone this type refers to the type that undid
     * this operation.
     * @type {ID | null}
     */
    this.redone = null;
    /**
     * @type {AbstractContent}
     */
    this.content = content;
    this.length = content.getLength();
    this.countable = content.isCountable();
    /**
     * If true, do not garbage collect this Item.
     */
    this.keep = false;
  }

  /**
   * @param {Transaction} transaction
   */
  integrate (transaction) {
    const store = transaction.doc.store;
    const id = this.id;
    const parent = this.parent;
    const parentSub = this.parentSub;
    const length = this.length;
    /**
     * @type {Item|null}
     */
    let o;
    // set o to the first conflicting item
    if (this.left !== null) {
      o = this.left.right;
    } else if (parentSub !== null) {
      o = parent._map.get(parentSub) || null;
      while (o !== null && o.left !== null) {
        o = o.left;
      }
    } else {
      o = parent._start;
    }
    // TODO: use something like DeleteSet here (a tree implementation would be best)
    /**
     * @type {Set<Item>}
     */
    const conflictingItems = new Set();
    /**
     * @type {Set<Item>}
     */
    const itemsBeforeOrigin = new Set();
    // Let c in conflictingItems, b in itemsBeforeOrigin
    // ***{origin}bbbb{this}{c,b}{c,b}{o}***
    // Note that conflictingItems is a subset of itemsBeforeOrigin
    while (o !== null && o !== this.right) {
      itemsBeforeOrigin.add(o);
      conflictingItems.add(o);
      if (compareIDs(this.origin, o.origin)) {
        // case 1
        if (o.id.client < id.client) {
          this.left = o;
          conflictingItems.clear();
        }
      } else if (o.origin !== null && itemsBeforeOrigin.has(getItem(store, o.origin))) {
        // case 2
        if (o.origin === null || !conflictingItems.has(getItem(store, o.origin))) {
          this.left = o;
          conflictingItems.clear();
        }
      } else {
        break
      }
      o = o.right;
    }
    // reconnect left/right + update parent map/start if necessary
    if (this.left !== null) {
      const right = this.left.right;
      this.right = right;
      this.left.right = this;
    } else {
      let r;
      if (parentSub !== null) {
        r = parent._map.get(parentSub) || null;
        while (r !== null && r.left !== null) {
          r = r.left;
        }
      } else {
        r = parent._start;
        parent._start = this;
      }
      this.right = r;
    }
    if (this.right !== null) {
      this.right.left = this;
    } else if (parentSub !== null) {
      // set as current parent value if right === null and this is parentSub
      parent._map.set(parentSub, this);
      if (this.left !== null) {
        // this is the current attribute value of parent. delete right
        this.left.delete(transaction);
      }
    }
    // adjust length of parent
    if (parentSub === null && this.countable && !this.deleted) {
      parent._length += length;
    }
    addStruct(store, this);
    this.content.integrate(transaction, this);
    // add parent to transaction.changed
    addChangedTypeToTransaction(transaction, parent, parentSub);
    if ((parent._item !== null && parent._item.deleted) || (this.right !== null && parentSub !== null)) {
      // delete if parent is deleted or if this is not the current attribute value of parent
      this.delete(transaction);
    }
  }

  /**
   * Returns the next non-deleted item
   */
  get next () {
    let n = this.right;
    while (n !== null && n.deleted) {
      n = n.right;
    }
    return n
  }

  /**
   * Returns the previous non-deleted item
   */
  get prev () {
    let n = this.left;
    while (n !== null && n.deleted) {
      n = n.left;
    }
    return n
  }

  /**
   * Computes the last content address of this Item.
   */
  get lastId () {
    return createID(this.id.client, this.id.clock + this.length - 1)
  }

  /**
   * Try to merge two items
   *
   * @param {Item} right
   * @return {boolean}
   */
  mergeWith (right) {
    if (
      compareIDs(right.origin, this.lastId) &&
      this.right === right &&
      compareIDs(this.rightOrigin, right.rightOrigin) &&
      this.id.client === right.id.client &&
      this.id.clock + this.length === right.id.clock &&
      this.deleted === right.deleted &&
      this.redone === null &&
      right.redone === null &&
      this.content.constructor === right.content.constructor &&
      this.content.mergeWith(right.content)
    ) {
      if (right.keep) {
        this.keep = true;
      }
      this.right = right.right;
      if (this.right !== null) {
        this.right.left = this;
      }
      this.length += right.length;
      return true
    }
    return false
  }

  /**
   * Mark this Item as deleted.
   *
   * @param {Transaction} transaction
   */
  delete (transaction) {
    if (!this.deleted) {
      const parent = this.parent;
      // adjust the length of parent
      if (this.countable && this.parentSub === null) {
        parent._length -= this.length;
      }
      this.deleted = true;
      addToDeleteSet(transaction.deleteSet, this.id, this.length);
      Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["setIfUndefined"])(transaction.changed, parent, lib0_set_js__WEBPACK_IMPORTED_MODULE_10__["create"]).add(this.parentSub);
      this.content.delete(transaction);
    }
  }

  /**
   * @param {StructStore} store
   * @param {boolean} parentGCd
   */
  gc (store, parentGCd) {
    if (!this.deleted) {
      throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
    }
    this.content.gc(store);
    if (parentGCd) {
      replaceStruct(store, this, new GC(this.id, this.length));
    } else {
      this.content = new ContentDeleted(this.length);
    }
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {encoding.Encoder} encoder The encoder to write data to.
   * @param {number} offset
   */
  write (encoder, offset) {
    const origin = offset > 0 ? createID(this.id.client, this.id.clock + offset - 1) : this.origin;
    const rightOrigin = this.rightOrigin;
    const parentSub = this.parentSub;
    const info = (this.content.getRef() & lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BITS5"]) |
      (origin === null ? 0 : lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT8"]) | // origin is defined
      (rightOrigin === null ? 0 : lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT7"]) | // right origin is defined
      (parentSub === null ? 0 : lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT6"]); // parentSub is non-null
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeUint8"])(encoder, info);
    if (origin !== null) {
      writeID(encoder, origin);
    }
    if (rightOrigin !== null) {
      writeID(encoder, rightOrigin);
    }
    if (origin === null && rightOrigin === null) {
      const parent = this.parent;
      if (parent._item === null) {
        // parent type on y._map
        // find the correct key
        const ykey = findRootTypeKey(parent);
        Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, 1); // write parentYKey
        Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, ykey);
      } else {
        Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, 0); // write parent id
        writeID(encoder, parent._item.id);
      }
      if (parentSub !== null) {
        Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, parentSub);
      }
    }
    this.content.write(encoder, offset);
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @param {number} info
 */
const readItemContent = (decoder, info) => contentRefs[info & lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BITS5"]](decoder);

/**
 * A lookup map for reading Item content.
 *
 * @type {Array<function(decoding.Decoder):AbstractContent>}
 */
const contentRefs = [
  () => { throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])() }, // GC is not ItemContent
  readContentDeleted,
  readContentJSON,
  readContentBinary,
  readContentString,
  readContentEmbed,
  readContentFormat,
  readContentType,
  readContentAny
];

/**
 * @private
 */
class ItemRef extends AbstractStructRef {
  /**
   * @param {decoding.Decoder} decoder
   * @param {ID} id
   * @param {number} info
   */
  constructor (decoder, id, info) {
    super(id);
    /**
     * The item that was originally to the left of this item.
     * @type {ID | null}
     */
    this.left = (info & lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT8"]) === lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT8"] ? readID(decoder) : null;
    /**
     * The item that was originally to the right of this item.
     * @type {ID | null}
     */
    this.right = (info & lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT7"]) === lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT7"] ? readID(decoder) : null;
    const canCopyParentInfo = (info & (lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT7"] | lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT8"])) === 0;
    const hasParentYKey = canCopyParentInfo ? Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder) === 1 : false;
    /**
     * If parent = null and neither left nor right are defined, then we know that `parent` is child of `y`
     * and we read the next string as parentYKey.
     * It indicates how we store/retrieve parent from `y.share`
     * @type {string|null}
     */
    this.parentYKey = canCopyParentInfo && hasParentYKey ? Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder) : null;
    /**
     * The parent type.
     * @type {ID | null}
     */
    this.parent = canCopyParentInfo && !hasParentYKey ? readID(decoder) : null;
    /**
     * If the parent refers to this item with some kind of key (e.g. YMap, the
     * key is specified here. The key is then used to refer to the list in which
     * to insert this item. If `parentSub = null` type._start is the list in
     * which to insert to. Otherwise it is `parent._map`.
     * @type {String | null}
     */
    this.parentSub = canCopyParentInfo && (info & lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT6"]) === lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT6"] ? Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder) : null;
    const missing = this._missing;
    if (this.left !== null) {
      missing.push(this.left);
    }
    if (this.right !== null) {
      missing.push(this.right);
    }
    if (this.parent !== null) {
      missing.push(this.parent);
    }
    /**
     * @type {AbstractContent}
     */
    this.content = readItemContent(decoder, info);
    this.length = this.content.getLength();
  }

  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @param {number} offset
   * @return {Item|GC}
   */
  toStruct (transaction, store, offset) {
    if (offset > 0) {
      /**
       * @type {ID}
       */
      const id = this.id;
      this.id = createID(id.client, id.clock + offset);
      this.left = createID(this.id.client, this.id.clock - 1);
      this.content = this.content.splice(offset);
      this.length -= offset;
    }

    const left = this.left === null ? null : getItemCleanEnd(transaction, store, this.left);
    const right = this.right === null ? null : getItemCleanStart(transaction, this.right);
    let parent = null;
    let parentSub = this.parentSub;
    if (this.parent !== null) {
      const parentItem = getItem(store, this.parent);
      // Edge case: toStruct is called with an offset > 0. In this case left is defined.
      // Depending in which order structs arrive, left may be GC'd and the parent not
      // deleted. This is why we check if left is GC'd. Strictly we don't have
      // to check if right is GC'd, but we will in case we run into future issues
      if (!parentItem.deleted && (left === null || left.constructor !== GC) && (right === null || right.constructor !== GC)) {
        parent = /** @type {ContentType} */ (parentItem.content).type;
      }
    } else if (this.parentYKey !== null) {
      parent = transaction.doc.get(this.parentYKey);
    } else if (left !== null) {
      if (left.constructor !== GC) {
        parent = left.parent;
        parentSub = left.parentSub;
      }
    } else if (right !== null) {
      if (right.constructor !== GC) {
        parent = right.parent;
        parentSub = right.parentSub;
      }
    } else {
      throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
    }

    return parent === null
      ? new GC(this.id, this.length)
      : new Item(
        this.id,
        left,
        this.left,
        right,
        this.right,
        parent,
        parentSub,
        this.content
      )
  }
}


//# sourceMappingURL=yjs.mjs.map


/***/ }),

/***/ "./quill.js":
/*!******************!*\
  !*** ./quill.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/dist/yjs.mjs");
/* harmony import */ var y_websocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! y-websocket */ "./node_modules/y-websocket/src/y-websocket.js");
/* harmony import */ var y_quill__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! y-quill */ "./node_modules/y-quill/src/y-quill.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! quill */ "./node_modules/quill/dist/quill.js");
/* harmony import */ var quill__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(quill__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var quill_cursors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! quill-cursors */ "./node_modules/quill-cursors/dist/quill-cursors.js");
/* harmony import */ var quill_cursors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(quill_cursors__WEBPACK_IMPORTED_MODULE_4__);
/* eslint-env browser */






// import styles from './quill.css'

quill__WEBPACK_IMPORTED_MODULE_3___default.a.register('modules/cursors', quill_cursors__WEBPACK_IMPORTED_MODULE_4___default.a)

window.addEventListener('load', () => {
  const ydoc = new yjs__WEBPACK_IMPORTED_MODULE_0__["Doc"]()
  const provider = new y_websocket__WEBPACK_IMPORTED_MODULE_1__["WebsocketProvider"]('ws://localhost:1234', 'quill', ydoc)
  const type = ydoc.getText('quill')
  const editorContainer = document.createElement('div')
    editorContainer.setAttribute('id', 'editor')
    document.body.insertBefore(editorContainer, null)
    // editorContainer.className = styles['my-class']


  var editor = new quill__WEBPACK_IMPORTED_MODULE_3___default.a(editorContainer, {
    modules: {
      cursors: true,
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ],
      history: {
        userOnly: true
      }
    },
    placeholder: 'Start collaborating...',
    theme: 'snow' // or 'bubble'
  })
  
  const binding = new y_quill__WEBPACK_IMPORTED_MODULE_2__["QuillBinding"](type, editor, provider.awareness)

  /*
  // Define user name and user name
  // Check the quill-cursors package on how to change the way cursors are rendered
  provider.awareness.setLocalStateField('user', {
    name: 'Typing Jimmy',
    color: 'blue'
  })
  */
  // Detect right before users exits window -> We need to find a way to detect when ALL USERS exit window
  window.onbeforeunload = function (e) {
      // 1. Get Contents
      console.log(editor.getContents())
//      var content = editor.getContents()
      // 2. Encrypt Contents
    
      // 3. Insert into database

      // Commented out because this piece of code breaks function appartently

      // var about = document.querySelector('input[name=text]');
      // here we enter the contents for encryption
      // let data = JSON.stringify(editor.getContents());
      const axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js")
      axios
          .post('http://127.0.0.1:5000/test', {
            todo: editor.getContents()
          })
          .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
          })
          .catch(error => {
            console.error(error)
          })

      return "Please click 'Stay on this Page' and we will give you candy";
  };

  // TODO:  When would we want to set contents? 
     // Send GET request to http://localhost:5000/getData to grab saved contents from database
     // use setContents to set contents of saved editor text

//  window.onload = function (e) {
    //need to retrieve the data from database ... 
    // $.ajax({
          //   type: "POST",
          //   url: "/getData",
          //   contentType: "application/json",
          //   data: about.value,
          //   dataType: "json",
          //   success: function(response) {
          //       console.log(response);
          //   },
          //   error: function(err) {
          //       console.log(err);
          //   }
          // });
//  }


  window.example = { provider, ydoc, type, binding }
})

//filler functions to using the python functions


/***/ })

/******/ });
//# sourceMappingURL=quill.851bb1b96290d4305043.js.map