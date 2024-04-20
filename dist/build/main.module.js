/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./src-frontend/entry/main.js":
/*!************************************!*\
  !*** ./src-frontend/entry/main.js ***!
  \************************************/
/***/ (() => {

eval("// This is a JavaScript module\nvar socket = new WebSocket(window.BACKEND_RESOURCES.socket);\nsocket.onopen = function (e) {\n  console.log('[open] Connection established');\n  console.log('Sending to server');\n  window.addEventListener('falala', function (_ref) {\n    var detail = _ref.detail;\n    console.log(detail);\n    socket.send(JSON.stringify({\n      action: 'walk-action',\n      message: detail\n    }));\n  });\n};\nfetch(window.BACKEND_RESOURCES.rest + '/auth', {\n  method: 'POST',\n  mode: 'cors',\n  headers: {\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    client: 'source from desktop'\n  })\n}).then(function (r) {\n  return r.json();\n}).then(function (v) {\n  console.log(v);\n});\n\n//# sourceURL=webpack://timeversation-arc-aws/./src-frontend/entry/main.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = {};
/******/ __webpack_modules__["./src-frontend/entry/main.js"]();
/******/ 
