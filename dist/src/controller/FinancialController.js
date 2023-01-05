"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const AddPaymentFlow_1 = require("../flow/financial/financial/AddPaymentFlow");
const CreateFlow_1 = require("../flow/financial/financial/CreateFlow");
const DeleteFlow_1 = require("../flow/financial/financial/DeleteFlow");
const ReadFlow_1 = require("../flow/financial/financial/ReadFlow");
const UpdateFlow_1 = require("../flow/financial/financial/UpdateFlow");
const ResponseHttp_1 = require("../model/ResponseHttp");
class FinancialController {
    create(req, res) {
        CreateFlow_1.default.create(req, res)
            .then(financial => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, financial))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    get(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(financial => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, financial))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    getById(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(financial => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, financial))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    update(req, res) {
        UpdateFlow_1.default.update(req, res)
            .then(financial => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, financial))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    delete(req, res) {
        DeleteFlow_1.default.delete(req, res)
            .then(financial => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, financial))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    payment(req, res) {
        AddPaymentFlow_1.default.add(req, res)
            .then(payment => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, `Pagamento registrado com sucesso`))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
}
exports.default = new FinancialController();