'use strict';

function checkHasKeys(keys) {
    var requiredKeys = keys;
    var actiualKeys = Object.keys(this);
    if (requiredKeys.length != actiualKeys.length) {
        return false;
    }
    return requiredKeys.every(
        function (currentValue) {
            return this.hasOwnProperty(currentValue);
        },
        this
    );
}

function checkContainsKeys(keys) {
    return keys.every(
        function (currentValue) {
            if (this.hasOwnProperty(currentValue)) {
                return true;
            }
            return false;
        },
        this
    );
}

function checkContainsValues(values) {
    //массив со значениями
    return values.every(
        function (currentValue) {
            for (var i in this) if (this.hasOwnProperty(i)) {
                if (currentValue === this[i]) {
                    return true;
                }
            }
            return false;
        }
        ,this
    );
}

function checkHasValues(values) {
    return (values.length === Object.keys(this).length) &&
        (values.every(
            function (currentValue) {
                for (var i in this) if (this.hasOwnProperty(i)) {
                    if (currentValue === this[i]) {
                        return true;
                    }
                }
                return false;
            }
            ,this
        ));
}

function checkHasValueType(key, type) {
    //такая конструкция дает false console.log(this[key] instanceof  type)
    //такая же true console.log(Object.getPrototypeOf(this[key]) === type.prototype);
    //в документации написано, что они эквивалентны. Почему?
    return Object.getPrototypeOf(this[key]) == type.prototype;
}

function checkHasLength(length) {
    return this.length == length;
}

function checkHasParamsCount(count) {
    return this.length == count;
}

function checkHasWordsCount(count) {
    return this.split(/\s+/).length == count;
}

exports.init = function () {
    Array.prototype.checkHasKeys = checkHasKeys;
    Object.prototype.checkHasKeys = checkHasKeys;

    Array.prototype.checkContainsKeys = checkContainsKeys;
    Object.prototype.checkContainsKeys = checkContainsKeys;

    Array.prototype.checkContainsValues = checkContainsValues;
    Object.prototype.checkContainsValues = checkContainsValues;

    Array.prototype.checkHasValues = checkHasValues;
    Object.prototype.checkHasValues = checkHasValues;

    Array.prototype.checkHasValueType = checkHasValueType;
    Object.prototype.checkHasValueType = checkHasValueType;

    Array.prototype.checkHasLength = checkHasLength;
    String.prototype.checkHasLength = checkHasLength;

    Function.prototype.checkHasParamsCount = checkHasParamsCount;

    String.prototype.checkHasWordsCount = checkHasWordsCount;
};
