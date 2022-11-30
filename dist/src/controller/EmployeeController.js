"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const CreateFlow_1 = require("../flow/employee/CreateFlow");
const DeleteFlow_1 = require("../flow/employee/DeleteFlow");
const ReadFlow_1 = require("../flow/employee/ReadFlow");
const UpdateFlow_1 = require("../flow/employee/UpdateFlow");
const UpdatePasswordFlow_1 = require("../flow/employee/UpdatePasswordFlow");
const ResponseHttp_1 = require("../model/ResponseHttp");
class EmployeeController {
    create(req, res) {
        CreateFlow_1.default.create(req, res)
            .then(employee => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, employee))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    get(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(employee => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, employee))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    getById(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(employee => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, employee))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    update(req, res) {
        UpdateFlow_1.default.update(req, res)
            .then(employee => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, employee))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    delete(req, res) {
        DeleteFlow_1.default.delete(req, res)
            .then(employee => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, employee))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    updatePassword(req, res) {
        UpdatePasswordFlow_1.default.update(req, res)
            .then(employee => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, employee))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
}
exports.default = new EmployeeController();
