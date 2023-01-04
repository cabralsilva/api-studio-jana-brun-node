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
const HttpError_1 = require("../../../../model/HttpError");
const StringUtils_1 = require("../../../../utils/StringUtils");
class ValidateDeleteFlowItem {
    validate(financial, payment) {
        return __awaiter(this, void 0, void 0, function* () {
            var _totalPaid = this.getTotalPaid(financial, payment);
            if (_totalPaid > financial.value) {
                throw new HttpError_1.default(HttpStatus.NOT_ACCEPTABLE, StringUtils_1.default.message("message.financial.openValueLessThan"));
            }
        });
    }
    getTotalPaid(financial, _payment) {
        var _totalPaid = financial.payments.reduce((acc, payment) => { return acc + payment.valuePaid; }, 0);
        return _totalPaid + (_payment === null || _payment === void 0 ? void 0 : _payment.valuePaid);
    }
}
exports.default = new ValidateDeleteFlowItem;
