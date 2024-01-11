"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const CreatePayrollFlow_1 = __importDefault(require("../flow/payroll_OLD/CreatePayrollFlow"));
const DeleteFlow_1 = __importDefault(require("../flow/payroll_OLD/DeleteFlow"));
const PreProcessPayrollFlow_1 = __importDefault(require("../flow/payroll_OLD/PreProcessPayrollFlow"));
const ReadFlow_1 = __importDefault(require("../flow/payroll_OLD/ReadFlow"));
const ResponseHttp_1 = __importDefault(require("../model/ResponseHttp"));
class PayrollControllerOLD {
    create(req, res) {
        CreatePayrollFlow_1.default.create(req, res)
            .then(payroll => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, payroll))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    get(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(payroll => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, payroll))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    getById(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(payroll => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, payroll))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    delete(req, res) {
        DeleteFlow_1.default.delete(req, res)
            .then(payroll => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, payroll))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    preProcess(req, res) {
        PreProcessPayrollFlow_1.default.preProcess(req, res)
            .then(payroll => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, payroll))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
}
exports.default = new PayrollControllerOLD();
