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
const HttpError_1 = require("../../model/HttpError");
const PriceTable_1 = require("../../model/schema/PriceTable");
const StringUtils_1 = require("../../utils/StringUtils");
const Utils_1 = require("../../utils/Utils");
const FindBySearchFlowItem_1 = require("../priceTable/item/FindBySearchFlowItem");
const HttpStatus = require("http-status");
const GetPriceFlowItem_1 = require("./item/GetPriceFlowItem");
class GetProductValueFlow extends FlowHttp_1.default {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var searchResultPriceTables = yield FindBySearchFlowItem_1.default.find(new PriceTable_1.PriceTableSearch({
                    effectiveDate: new Date(),
                    orderBy: 'created_at',
                    order: 'desc'
                }));
                if (Utils_1.default.isEmpty(searchResultPriceTables === null || searchResultPriceTables === void 0 ? void 0 : searchResultPriceTables.items)) {
                    throw new HttpError_1.default(HttpStatus.NOT_FOUND, StringUtils_1.default.message("message.response.resourceNotFound", StringUtils_1.default.message("message.priceTable")));
                }
                let priceTable = searchResultPriceTables.items[0];
                let itemPrice = GetPriceFlowItem_1.default.get(req.body, priceTable);
                if (Utils_1.default.isEmpty(itemPrice)) {
                    throw new HttpError_1.default(HttpStatus.NOT_FOUND, StringUtils_1.default.message("message.response.resourceNotFound", StringUtils_1.default.message("message.priceTable")));
                }
                return itemPrice;
            }
            catch (error) {
                this.processError(error);
            }
        });
    }
}
exports.default = new GetProductValueFlow;
