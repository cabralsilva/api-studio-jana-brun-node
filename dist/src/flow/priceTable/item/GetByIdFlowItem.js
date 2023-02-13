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
const Grate_1 = require("../../../model/schema/Grate");
const PriceTable_1 = require("../../../model/schema/PriceTable");
const Utils_1 = require("../../../utils/Utils");
class GetByIdFlowItem {
    get(id, pop = undefined, sel = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const priceTable = yield PriceTable_1.PriceTableRepository.findById(id).populate(pop)
                .select(sel);
            if (Utils_1.default.isNotEmpty(priceTable)) {
                var priceTableItems = [];
                for (var priceTableItem of priceTable.items) {
                    var gratesItems = [];
                    for (var grateItemId of priceTableItem.gratesItems) {
                        var grateItemAux = yield Grate_1.GrateRepository.find({ "items._id": grateItemId }, { 'items.$': 1 });
                        if (Utils_1.default.isNotEmpty(grateItemAux)) {
                            gratesItems.push(grateItemAux[0].items[0]);
                        }
                    }
                    priceTableItem._doc.gratesItems = gratesItems;
                }
            }
            return priceTable;
        });
    }
}
exports.default = new GetByIdFlowItem;
