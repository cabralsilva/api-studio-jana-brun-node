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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const c2_mongoose_1 = require("c2-mongoose");
const Utils_1 = __importDefault(require("../../../utils/Utils"));
const IGrate_1 = require("../../../model/schema/IGrate");
class GetPriceFlowItem {
    constructor() {
        this.crudGrates = new c2_mongoose_1.CrudFlow(IGrate_1.GrateRepository);
    }
    get(searcherPrice, priceTable) {
        return __awaiter(this, void 0, void 0, function* () {
            let itemsOfPriceOfProduct = priceTable.items.filter((item) => { var _a; return ((_a = item.product) === null || _a === void 0 ? void 0 : _a._id) == searcherPrice.product._id; });
            let response = null;
            if (itemsOfPriceOfProduct.length === 0) {
                return response;
            }
            let score = 0;
            const grateItens = itemsOfPriceOfProduct.flatMap((itemPrice) => itemPrice.gratesItems).map((grateItem) => grateItem);
            if (grateItens.length === 0) {
                return itemsOfPriceOfProduct[0];
            }
            this.crudGrates.prepareSearch(new IGrate_1.GrateSearch({
                "items._id": itemsOfPriceOfProduct.flatMap((itemPrice) => itemPrice.gratesItems).map((grateItem) => grateItem)
            }));
            const grates = yield this.crudGrates.find({});
            for (var itemPrice of itemsOfPriceOfProduct) {
                let minScoreToCurrentItemPrice = grates.items.length;
                var itemsPriceIntersection = itemPrice.gratesItems.filter(n => searcherPrice.gratesItems.some(n2 => n._id == n2.grateItem));
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
        });
    }
}
exports.default = new GetPriceFlowItem;
