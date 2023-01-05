"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
const GetProductValueFlow_1 = require("../flow/sale/GetProductValueFlow");
const ResponseHttp_1 = require("../model/ResponseHttp");
class SaleController {
    getValue(req, res) {
        GetProductValueFlow_1.default.get(req, res)
            .then(state => ResponseHttp_1.default.sendResponse(res, http_status_1.OK, state))
            .catch(error => ResponseHttp_1.default.sendResponseError(res, error));
    }
}
exports.default = new SaleController();
