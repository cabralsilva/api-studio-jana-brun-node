"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const CreateFlow_1 = require("../flow/grate/CreateFlow");
const DeleteFlow_1 = require("../flow/grate/DeleteFlow");
const ReadFlow_1 = require("../flow/grate/ReadFlow");
const UpdateFlow_1 = require("../flow/grate/UpdateFlow");
const ResponseHttp_1 = require("../model/ResponseHttp");
class GrateController {
    create(req, res) {
        CreateFlow_1.default.create(req, res)
            .then(grate => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, grate))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    get(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(grate => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, grate))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    getById(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(grate => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, grate))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    update(req, res) {
        UpdateFlow_1.default.update(req, res)
            .then(grate => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, grate))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    delete(req, res) {
        DeleteFlow_1.default.delete(req, res)
            .then(grate => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, grate))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
}
exports.default = new GrateController();
