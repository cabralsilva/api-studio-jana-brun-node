"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const en_1 = require("../../resources/messages/en");
const pt_BR_1 = require("../../resources/messages/pt_BR");
const i18nCreate = require('express-rest-i18n');
const i18n = i18nCreate({
    defaultLocale: 'en',
    warn: false,
    allowFallback: true,
    messages: {
        'en': en_1.default,
        'pt-br': pt_BR_1.default
    },
});
exports.default = i18n;
