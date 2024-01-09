"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const StringUtils_1 = __importDefault(require("../utils/StringUtils"));
const HttpError_1 = __importDefault(require("./HttpError"));
class FlowHttp {
    processError(error) {
        if (error instanceof HttpError_1.default) {
            throw error;
        }
        if (error instanceof mongodb_1.MongoServerError) {
            if (error.code === 11000) {
                throw new HttpError_1.default(409, StringUtils_1.default.message("response.duplicate"), error.keyValue);
            }
        }
        if (error.errors) {
            throw new HttpError_1.default(422, StringUtils_1.default.message("response.invalidValues"), error.errors);
        }
        throw new HttpError_1.default(500, error.message, error);
    }
}
exports.default = FlowHttp;
