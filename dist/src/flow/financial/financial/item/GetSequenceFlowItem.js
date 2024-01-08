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
const Financial_1 = require("../../../../model/schema/Financial");
const StringUtils_1 = require("../../../../utils/StringUtils");
const Utils_1 = require("../../../../utils/Utils");
const FindBySearchFlowItem_1 = require("./FindBySearchFlowItem");
class GetSequenceFlowItem {
    get(financial, offset = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            var sequence = StringUtils_1.default.padToLeft("0", 6, 1);
            var historicalCompany = yield FindBySearchFlowItem_1.default.find(new Financial_1.FinancialSearchOLD({
                orderBy: "created_at",
                order: "desc",
                page: 1,
                limit: 1
            }));
            if (Utils_1.default.isIterable(historicalCompany.items) && Utils_1.default.isNotEmpty(historicalCompany.items[0])) {
                sequence = StringUtils_1.default.padToLeft("0", 6, (Number(historicalCompany.items[0].sequence) + 1 + offset));
            }
            else {
                sequence = StringUtils_1.default.padToLeft("0", 6, (Number(sequence) + offset));
            }
            return sequence;
        });
    }
}
exports.default = new GetSequenceFlowItem;
