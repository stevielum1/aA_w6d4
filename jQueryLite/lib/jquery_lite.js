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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(elements) {\n    this.elements = elements;\n  }\n  html(str){\n    if (str){\n      this.elements.forEach(el=>{\n        el.innerHTML = str;\n      });\n    } else {\n      if (this.elements[0] === undefined) {\n        return undefined;\n      } else {\n        return this.elements[0].innerHTML;\n      }\n    }\n  }\n  empty(){\n    this.elements.forEach(el => {\n      el.innerHTML = \"\";\n    });\n  }\n  append(arg){\n    this.elements.forEach(el=>{\n      if(arg instanceof HTMLElement){\n        el.innerHTML += arg.outerHTML;\n      } else if (arg instanceof DOMNodeCollection) {\n        arg.elements.forEach(el2 => {\n          el.innerHTML += el2.outerHTML;\n        });\n      } else {\n        el.innerHTML += arg;\n      }\n    });\n  }\n  attr(name, value) {\n    if (value) {\n      this.elements.forEach(el => {\n        el.setAttribute(name, value);\n      });\n    } else {\n      this.elements.map(el => {\n        el.getAttribute(name);\n      });\n    }\n  }\n  addClass(...names) {\n    this.elements.forEach(el => {\n      el.classList.add(...names);\n    });\n  }\n  removeClass(...names) {\n    this.elements.forEach(el => {\n      el.classList.remove(...names);\n    });\n  }\n  children() {\n    let result = [];\n    this.elements.forEach(el => {\n      result = result.concat(Array.from(el.children));\n    });\n    return new DOMNodeCollection(result);\n  }\n  parent(){\n    let result = [];\n    this.elements.forEach(el => {\n      result = result.concat([el.parentElement]);\n    });\n    return new DOMNodeCollection(result);\n  }\n  find(selector){\n    let result = [];\n    this.elements.forEach(el => {\n      result = result.concat(Array.from(el.querySelectorAll(selector)));\n    });\n    return new DOMNodeCollection(result);\n  }\n  remove(selector){\n    if (selector) {\n      this.find(selector).elements.forEach(el => {\n        // if (this.children().elements.includes(el)) {\n        //   //find the element that matches the selector and remove its html\n        //   // const elToRemoveIdx = this.children().elements.indexOf(el);\n        //   // const elToRemove = this.children().elements[elToRemoveIdx];\n        //   elToRemove.innerHTML = \"\";\n        // }\n        el.outerHTML = \"\";\n      });\n    } else {\n      this.empty();\n      while(this.elements.length > 0) {\n        this.elements.pop();\n      }\n    }\n  }\n  on(action, callback){\n    this.elements.forEach(el=>{\n      el.addEventListener(action, callback);\n      el.eventListenerAttr = el.eventListenerAttr || {};\n      el.eventListenerAttr[action] = el.eventListenerAttr[action] || callback;\n    });\n  }\n  off(action){\n    this.elements.forEach(el=>{\n      let callback = el.eventListenerAttr[action];\n      el.removeEventListener(action, callback);\n    });\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\n//this is simulating the jQuery's selector style and rapper style\nfunction $l(arg){\n  if (arg instanceof HTMLElement) {\n    return new DOMNodeCollection(Array.from(arg));\n  } else if (arg instanceof Function) {\n    // eventArray.push(arg);\n    // while(document.readyState !== 'complete'){\n    console.log(document.readyState, \"readyState\");\n    // eventArray.forEach(el=>{\n    //   el();\n    // });\n    if(!window.eventList) {\n      window.eventList = [];\n    }\n    window.eventList.push(arg);\n\n    document.onreadystatechange = function () {\n      if (document.readyState !== 'complete'){\n        window.eventList.forEach(el=>{\n          el();\n        });\n      }\n    };\n  }\n  else {\n    const elementList = document.querySelectorAll(arg);\n    return new DOMNodeCollection(Array.from(elementList));\n  }\n}\n\nwindow.$l = $l;\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });