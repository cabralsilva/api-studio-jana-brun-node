"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const AuthenticationFlow_1 = require("../flow/authentication/AuthenticationFlow");
const ResponseHttp_1 = require("../model/ResponseHttp");
class AuthenticationController {
    authenticate(req, res) {
        AuthenticationFlow_1.default.authentication(req, res)
            .then(data => ResponseHttp_1.default.sendResponseCustom(res, http_status_1.OK, data))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
}
exports.default = new AuthenticationController();
