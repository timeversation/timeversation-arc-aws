/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunktimeversation_arc_aws"] = self["webpackChunktimeversation_arc_aws"] || []).push([["src-frontend_components_Socket_Socket_js"],{

/***/ "./src-frontend/components/Socket/Socket.js":
/*!**************************************************!*\
  !*** ./src-frontend/components/Socket/Socket.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SocketApp: () => (/* binding */ SocketApp)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var reconnecting_websocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reconnecting-websocket */ \"./node_modules/reconnecting-websocket/dist/reconnecting-websocket-mjs.js\");\n\n\nfunction SocketApp() {\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    // This is a JavaScript module\n    var socket = new reconnecting_websocket__WEBPACK_IMPORTED_MODULE_1__[\"default\"](window.BACKEND_RESOURCES.socket);\n    socket.onopen = function (e) {\n      console.log('[open] Connection established');\n      console.log('Sending to server');\n      socket.send(JSON.stringify({\n        action: 'walk-action',\n        data: {\n          happy: 123\n        }\n      }));\n    };\n    window.addEventListener('falala', function (_ref) {\n      var detail = _ref.detail;\n      console.log(detail);\n    });\n\n    // window.addEventListener('')\n\n    socket.onmessage = function (_ref2) {\n      var rawJSON = _ref2.data;\n      var data = JSON.parse(rawJSON);\n      console.log(data);\n    };\n    fetch(window.BACKEND_RESOURCES.rest + '/auth', {\n      method: 'POST',\n      mode: 'cors',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        client: 'source from desktop'\n      })\n    }).then(function (r) {\n      return r.json();\n    }).then(function (v) {\n      console.log(v);\n    });\n  });\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    onClick: function onClick() {\n      window.dispatchEvent(new CustomEvent('falala', {\n        detail: {\n          yo: 123\n        }\n      }));\n    }\n  }, \"Falala-Yo\"));\n}\n\n//# sourceURL=webpack://timeversation-arc-aws/./src-frontend/components/Socket/Socket.js?");

/***/ })

}])