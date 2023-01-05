"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("../config/i18n");
class StringUtils {
    constructor() { }
    padToLeft(fill, amount, source) {
        source = source.toString();
        fill = fill.toString();
        return source.length < amount ? this.padToLeft(fill, amount, fill + source) : source;
    }
    message(source, ...parameters) {
        var message = i18n_1.default.t(source);
        for (var i = 0; i < parameters.length; i++) {
            var param = parameters[i];
            message = message.replaceAll(`{${i}}`, param);
        }
        return message;
    }
}
exports.default = new StringUtils;
