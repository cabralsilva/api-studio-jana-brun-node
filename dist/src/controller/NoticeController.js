"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const CreateFlow_1 = __importDefault(require("../flow/notice/CreateFlow"));
const DeleteFlow_1 = __importDefault(require("../flow/notice/DeleteFlow"));
const ReadFlow_1 = __importDefault(require("../flow/notice/ReadFlow"));
const UpdateFlow_1 = __importDefault(require("../flow/notice/UpdateFlow"));
const ResponseHttp_1 = __importDefault(require("../model/ResponseHttp"));
class NoticeController {
    create(req, res) {
        CreateFlow_1.default.create(req, res)
            .then(notice => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, notice))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    get(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(notice => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, notice))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    getById(req, res) {
        ReadFlow_1.default.read(req, res)
            .then(notice => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, notice))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    update(req, res) {
        UpdateFlow_1.default.update(req, res)
            .then(notice => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, notice))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
    delete(req, res) {
        DeleteFlow_1.default.delete(req, res)
            .then(notice => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, notice))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
}
exports.default = new NoticeController();
