"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticatorServiceHttp_1 = require("../services/http/AuthenticatorServiceHttp");
const HttpStatus = require("http-status");
const Response_1 = require("../http/Response");
class AuthController {
    authenticate(req, res) {
        AuthenticatorServiceHttp_1.default.auth(req)
            .then(data => Response_1.default.sendResponseCustom(res, HttpStatus.OK, data))
            .catch(error => Response_1.default.sendResponseError(res, error));
    }
}
exports.default = new AuthController();
