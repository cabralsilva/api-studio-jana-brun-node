"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const CreateFlow_1 = __importDefault(require("../flow/matriculation/CreateFlow"));
const DeleteFlow_1 = __importDefault(require("../flow/matriculation/DeleteFlow"));
const GenerateClassSkuFinancialFlow_1 = __importDefault(require("../flow/matriculation/GenerateClassSkuFinancialFlow"));
const GenerateExtraSkuFinancialFlow_1 = __importDefault(require("../flow/matriculation/GenerateExtraSkuFinancialFlow"));
const ReadFlow_1 = __importDefault(require("../flow/matriculation/ReadFlow"));
const UpdateFlow_1 = __importDefault(require("../flow/matriculation/UpdateFlow"));
const ResponseHttp_1 = __importDefault(require("../model/ResponseHttp"));
class MatriculationControllerOLD {
    create(req, res) {
        CreateFlow_1.default.create(req, res)
            .then(matriculation => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, matriculation))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    get(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(matriculation => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, matriculation))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    getById(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(matriculation => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, matriculation))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    update(req, res) {
        UpdateFlow_1.default.update(req, res)
            .then(matriculation => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, matriculation))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    delete(req, res) {
        DeleteFlow_1.default.delete(req, res)
            .then(matriculation => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, matriculation))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    generateFinancialClassSku(req, res) {
        GenerateClassSkuFinancialFlow_1.default.generate(req, res)
            .then(matriculation => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, matriculation))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    generateFinancialExtraSku(req, res) {
        GenerateExtraSkuFinancialFlow_1.default.generate(req, res)
            .then(matriculation => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, matriculation))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
}
exports.default = new MatriculationControllerOLD();