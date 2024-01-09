"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const AuthenticationFlow_1 = __importDefault(require("../flow/authentication/AuthenticationFlow"));
const ResponseHttp_1 = __importDefault(require("../model/ResponseHttp"));
class AuthenticationController {
    authenticate(req, res) {
        AuthenticationFlow_1.default.authentication(req, res)
            .then(data => ResponseHttp_1.default.sendResponseCustom(res, http_status_1.OK, data))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
}
exports.default = new AuthenticationController();
