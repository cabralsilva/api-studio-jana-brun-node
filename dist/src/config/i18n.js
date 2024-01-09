"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.i18n = void 0;
const Utils_1 = require("c2-mongoose/dist/utils/Utils");
const en_1 = __importDefault(require("../../resources/messages/en"));
const pt_BR_1 = __importDefault(require("../../resources/messages/pt_BR"));
const express_http_context_1 = __importDefault(require("express-http-context"));
const i18nCreate = require('express-rest-i18n');
exports.i18n = i18nCreate({
    defaultLocale: 'pt-br',
    warn: false,
    allowFallback: true,
    messages: {
        'en': en_1.default,
        'en-US': en_1.default,
        'en_US': en_1.default,
        'pt': pt_BR_1.default,
        'pt-br': pt_BR_1.default,
        'pt_BR': pt_BR_1.default
    },
});
const getMessage = (message, ...parameters) => {
    const headers = express_http_context_1.default.get('headers');
    var language = [];
    if (typeof headers !== 'undefined') {
        if (headers["accept-language"] !== undefined) {
            language = headers["accept-language"].split(',');
        }
    }
    var t = exports.i18n.t(message);
    if ((0, Utils_1.isNotEmpty)(language)) {
        t = exports.i18n.t(message, language);
    }
    for (var i = 0; i < parameters.length; i++) {
        var param = parameters[i];
        t = t.replaceAll(`{${i}}`, param);
    }
    return t;
};
exports.getMessage = getMessage;
exports.default = exports.i18n;
