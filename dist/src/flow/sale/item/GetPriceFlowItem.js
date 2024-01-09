"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __importDefault(require("../../../utils/Utils"));
class GetPriceFlowItem {
    get(searcherPrice, priceTable) {
        let itemsOfPriceOfProduct = priceTable.items.filter((item) => item.product._id == searcherPrice.product._id);
        let response = null;
        let score = 0;
        for (var itemPrice of itemsOfPriceOfProduct) {
            let minScoreToCurrentItemPrice = itemPrice.gratesItems.length;
            var itemsPriceIntersection = itemPrice.gratesItems.filter(n => searcherPrice.grateItemList.some(n2 => n._id == n2._id));
            if (itemsPriceIntersection.length >= minScoreToCurrentItemPrice && itemsPriceIntersection.length >= score) {
                response = itemPrice;
                score = itemsPriceIntersection.length;
                continue;
            }
            if (Utils_1.default.isEmpty(itemsPriceIntersection) && minScoreToCurrentItemPrice == 0 && score == 0) {
                response = itemPrice;
                score = minScoreToCurrentItemPrice;
            }
        }
        return response;
    }
}
exports.default = new GetPriceFlowItem;
