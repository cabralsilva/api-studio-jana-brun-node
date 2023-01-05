"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class CryptoPasswordFlowItem {
    crypto(decodePassword) {
        const salt = crypto.randomBytes(16).toString('hex');
        const password = crypto.pbkdf2Sync(decodePassword, salt, 1000, 64, `sha512`).toString(`hex`);
        return {
            salt,
            password
        };
    }
}
exports.default = new CryptoPasswordFlowItem;
