"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const DeleteFlow_1 = require("../flow/person/DeleteFlow");
const ReadFlow_1 = require("../flow/person/ReadFlow");
const UpdateFlow_1 = require("../flow/person/UpdateFlow");
const ResponseHttp_1 = require("../model/ResponseHttp");
class PersonController {
    get(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(person => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, person))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    getById(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(person => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, person))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    update(req, res) {
        UpdateFlow_1.default.update(req, res)
            .then(person => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, person))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    delete(req, res) {
        DeleteFlow_1.default.delete(req, res)
            .then(person => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, person))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
}
exports.default = new PersonController();
