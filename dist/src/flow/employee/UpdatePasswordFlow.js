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
const http_status_1 = require("http-status");
const mongoose_1 = require("mongoose");
const FlowHttp_1 = require("../../model/FlowHttp");
const HttpError_1 = require("../../model/HttpError");
const StringUtils_1 = require("../../utils/StringUtils");
const AuthenticationFlowItem_1 = require("../authentication/item/AuthenticationFlowItem");
const CryptoPasswordFlowItem_1 = require("./item/CryptoPasswordFlowItem");
const GetByJWTFlowItem_1 = require("./item/GetByJWTFlowItem");
const UpdateFlowItem_1 = require("./item/UpdateFlowItem");
class UpdatePasswordFlow extends FlowHttp_1.default {
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                const employee = yield GetByJWTFlowItem_1.default.get(req);
                yield AuthenticationFlowItem_1.default.authenticate(employee, req.body.currentPassword);
                const crypto = CryptoPasswordFlowItem_1.default.crypto(req.body.newPassword);
                yield UpdateFlowItem_1.default.update(employee._id, crypto, session);
                yield session.commitTransaction();
            }
            catch (error) {
                yield session.abortTransaction();
                this.processError(new HttpError_1.default(http_status_1.NOT_ACCEPTABLE, StringUtils_1.default.message("message.http.updatePasswordInvalid")));
            }
            finally {
                yield session.endSession();
            }
        });
    }
}
exports.default = new UpdatePasswordFlow;
