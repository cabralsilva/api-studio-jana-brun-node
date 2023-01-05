"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const FlowHttp_1 = require("../../model/FlowHttp");
const ResponseHttp_1 = require("../../model/ResponseHttp");
const GetJWTFlowItem_1 = require("./item/GetJWTFlowItem");
const ValidateJWTFlowItem_1 = require("./item/ValidateJWTFlowItem");
class AuthorizationFlow extends FlowHttp_1.default {
    authorization(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = GetJWTFlowItem_1.default.get(req);
                ValidateJWTFlowItem_1.default.validate(token);
                next();
            }
            catch (error) {
                ResponseHttp_1.default.sendResponseError(res, error);
            }
            finally {
            }
        });
    }
}
exports.default = new AuthorizationFlow;