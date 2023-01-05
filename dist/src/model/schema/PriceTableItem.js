"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTableItemSearch = exports.PriceTableItemRepository = exports.PriceTableItemModel = exports.PriceTableItem = void 0;
const mongoose = require("mongoose");
const Search_1 = require("../Search");
const PriceTableItemModel = {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    gratesItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grateItem', required: true }],
    price: { type: Number, required: true }
};
exports.PriceTableItemModel = PriceTableItemModel;
const PriceTableItem = new mongoose.Schema(PriceTableItemModel);
exports.PriceTableItem = PriceTableItem;
class PriceTableItemSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.buildFilters();
    }
    buildFilters() {
        let filters = { $and: [] };
        Object.entries(this).forEach(([key, value]) => {
            if (value) {
                let condition = {};
                if (key === 'searchText') {
                    this.searchText = this.diacriticSensitiveRegex(this.searchText);
                    condition = {
                        $or: []
                    };
                }
                else {
                    condition[key] = value;
                }
                filters.$and.push(condition);
            }
        });
        if (filters.$and.length === 0)
            delete filters['$and'];
        this.filters = filters;
    }
}
exports.PriceTableItemSearch = PriceTableItemSearch;
const PriceTableItemRepository = mongoose.model('priceTableItem', PriceTableItem);
exports.PriceTableItemRepository = PriceTableItemRepository;
