/* ATTENTION: The "eval" devtool is used in this sample. */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components.ts":
/*!***************************!*\
  !*** ./src/components.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createComponent = void 0;\nconst createComponent = (type) => {\n    console.log(`Creating component: ${type}`);\n    const element = document.createElement('div');\n    element.id = type;\n    element.textContent = `This is the ${type} component.`;\n    const canvas = document.getElementById('canvas');\n    if (canvas) {\n        canvas.appendChild(element);\n    }\n    else {\n        console.error('Canvas not found');\n    }\n    return element;\n};\nexports.createComponent = createComponent;\nwindow.createComponent = createComponent;\nwindow.components = { createComponent: createComponent };\n\n\n//# sourceURL=webpack://webpack-simple/./src/components.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.loadGame = void 0;\nconst components_1 = __webpack_require__(/*! ./components */ \"./src/components.ts\");\nconst loadGame = () => {\n    console.log('Loading game...');\n    (0, components_1.createComponent)('game');\n};\nexports.loadGame = loadGame;\n\n\n//# sourceURL=webpack://webpack-simple/./src/game.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\nconst game_1 = __webpack_require__(/*! ./game */ \"./src/game.ts\");\nconst sup_func_1 = __webpack_require__(/*! ./sup_func */ \"./src/sup_func.ts\");\n// Example usage:\n(0, sup_func_1.clearScreen)();\n(0, game_1.loadGame)();\nwindow.createComponent = __webpack_require__(/*! ./components */ \"./src/components.ts\").createComponent;\nwindow.clearScreen = __webpack_require__(/*! ./sup_func */ \"./src/sup_func.ts\").clearScreen;\n\n\n//# sourceURL=webpack://webpack-simple/./src/index.ts?");

/***/ }),

/***/ "./src/sup_func.ts":
/*!*************************!*\
  !*** ./src/sup_func.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.clearScreen = void 0;\nconst clearScreen = () => {\n    console.log('Clearing screen...');\n    const canvas = document.getElementById('canvas');\n    if (canvas) {\n        canvas.innerHTML = '';\n    }\n    else {\n        console.error('Canvas not found for clearing');\n    }\n};\nexports.clearScreen = clearScreen;\nwindow.clearScreen = clearScreen;\nwindow.sup_func = { clearScreen: clearScreen };\n\n\n//# sourceURL=webpack://webpack-simple/./src/sup_func.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
