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
const HttpStatus = require("http-status");
const mongoose_1 = require("mongoose");
const FlowHttp_1 = require("../../../model/FlowHttp");
const HttpError_1 = require("../../../model/HttpError");
const StringUtils_1 = require("../../../utils/StringUtils");
const Utils_1 = require("../../../utils/Utils");
const AddPaymentFlowItem_1 = require("./item/AddPaymentFlowItem");
const GetByIdFlowItem_1 = require("./item/GetByIdFlowItem");
const GetValueTotalPaidFlowItem_1 = require("./item/GetValueTotalPaidFlowItem");
const ValidatePaymentFlowItem_1 = require("./item/ValidatePaymentFlowItem");
class AddPaymentFlow extends FlowHttp_1.default {
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                var financial = yield GetByIdFlowItem_1.default.get(req.params.id);
                if (Utils_1.default.isEmpty(financial)) {
                    throw new HttpError_1.default(HttpStatus.NOT_FOUND, StringUtils_1.default.message("message.registerNotFounded"));
                }
                ValidatePaymentFlowItem_1.default.validate(financial, req.body);
                var finacialToUpdate = {
                    status: GetValueTotalPaidFlowItem_1.default.get(financial, req.body) < financial.value ? "OPENED" : "PAID"
                };
                yield AddPaymentFlowItem_1.default.add(req.params.id, finacialToUpdate, req.body, session);
                yield session.commitTransaction();
            }
            catch (error) {
                yield session.abortTransaction();
                this.processError(error);
            }
            finally {
                yield session.endSession();
            }
        });
    }
}
exports.default = new AddPaymentFlow;
