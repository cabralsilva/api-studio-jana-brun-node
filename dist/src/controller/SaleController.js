"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const GetProductValueFlow_1 = __importDefault(require("../flow/sale/GetProductValueFlow"));
const ResponseHttp_1 = __importDefault(require("../model/ResponseHttp"));
class SaleController {
    searchPrice(req, res) {
        GetProductValueFlow_1.default.get(req, res)
            .then(state => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, state))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
}
exports.default = new SaleController();
