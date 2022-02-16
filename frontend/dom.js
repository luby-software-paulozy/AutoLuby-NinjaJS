(function () {
  "use strict";

  function DOM(elements) {
    this.element = document.querySelectorAll(elements);
  }

  DOM.prototype.on = function on(event, callback) {
    Array.from(this.element).forEach((element) =>
      element.addEventListener(event, callback)
    );
  };

  DOM.prototype.off = function off() {
    Array.from(this.element).forEach((element) =>
      element.removeEventListener()
    );
  };

  DOM.prototype.get = function get() {
    return this.element;
  };

  // forEach, map, filter, reduce, reduceRight, every e some.

  DOM.prototype.forEach = function forEach() {
    let elementsArray = Array.from(this.element);
    return elementsArray.forEach.apply(this.element, arguments);
  };

  DOM.prototype.map = function map() {
    let elementsArray = Array.from(this.element);

    return elementsArray.map.apply(this.element, arguments);
  };

  DOM.prototype.filter = function filter() {
    let elementsArray = Array.from(this.element);

    return elementsArray.filter.apply(this.element, arguments);
  };

  DOM.prototype.reduce = function reduce() {
    let elementsArray = Array.from(this.element);

    return elementsArray.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRight = function reduceRight() {
    let elementsArray = Array.from(this.element);

    return elementsArray.reduceRight.apply(this.element, arguments);
  };

  DOM.prototype.some = function some() {
    let elementsArray = Array.from(this.element);

    return elementsArray.some.apply(this.element, arguments);
  };

  DOM.prototype.every = function every() {
    let elementsArray = Array.from(this.element);

    return elementsArray.every.apply(this.element, arguments);
  };

  // isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.

  DOM.isArray = function isArray(element) {
    return Object.prototype.toString.call(element) === "[object Array]";
  };

  DOM.isObject = function isObject(element) {
    return Object.prototype.toString.call(element) === "[object Object]";
  };

  DOM.isFunction = function isFunction(element) {
    return Object.prototype.toString.call(element) === "[object Function]";
  };

  DOM.isNumber = function isNumber(element) {
    return typeof element === "number";
  };

  DOM.isString = function isString(element) {
    return typeof element === "string";
  };

  DOM.isBoolean = function isBoolean(element) {
    return typeof element === "boolean";
  };

  DOM.isNull = function isNull(element) {
    return typeof element === "[object Null]" || "[object Undefined]"
      ? true
      : false;
  };

  window.DOM = DOM;
})();
