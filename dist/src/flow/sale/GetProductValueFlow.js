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
const mongoose_1 = require("mongoose");
const FlowHttp_1 = require("../../model/FlowHttp");
const PriceTable_1 = require("../../model/schema/PriceTable");
const FindBySearchFlowItem_1 = require("../priceTable/item/FindBySearchFlowItem");
class GetProductValueFlow extends FlowHttp_1.default {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                mongoose_1.default.set('debug', true);
                var priceTable = yield FindBySearchFlowItem_1.default.find(new PriceTable_1.PriceTableSearch({
                    effectiveDate: new Date()
                }));
                mongoose_1.default.set('debug', false);
                return priceTable;
            }
            catch (error) {
                this.processError(error);
            }
        });
    }
}
exports.default = new GetProductValueFlow;
