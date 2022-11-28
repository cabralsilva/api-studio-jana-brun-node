"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    isNotEmpty(obj) {
        return !this.isEmpty(obj);
    }
    isEmpty(obj) {
        if (!obj) {
            return true;
        }
        if (Array.isArray(obj)) {
            if (obj.length == 0) {
                return true;
            }
        }
        return false;
    }
    isIterable(input) {
        if (input === null || input === undefined) {
            return false;
        }
        return typeof input[Symbol.iterator] === 'function';
    }
    isNotIterable(input) {
        return !this.isIterable(input);
    }
}
exports.default = new Utils;
