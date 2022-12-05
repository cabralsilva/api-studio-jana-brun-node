"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTableSearch = exports.PriceTableRepository = exports.PriceTableModel = exports.PriceTable = void 0;
const mongoose = require("mongoose");
const Search_1 = require("../Search");
const PriceTableItemModel = {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    gratesItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grateItem', required: true }],
    price: { type: Number, required: true }
};
const PriceTableModel = {
    description: { type: String, required: true },
    beginDate: { type: Date, required: true },
    endDate: { type: Date },
    items: [PriceTableItemModel]
};
exports.PriceTableModel = PriceTableModel;
const PriceTable = new mongoose.Schema(PriceTableModel, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
exports.PriceTable = PriceTable;
class PriceTableSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.code = _query.code;
        this.description = _query.description;
        this.category = _query.category;
        this.active = _query.active;
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
                        $or: [
                            { 'code': { $regex: this.searchText, $options: 'i' } },
                            { 'description': { $regex: this.searchText, $options: 'i' } },
                            { 'category': { $regex: this.searchText, $options: 'i' } }
                        ]
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
exports.PriceTableSearch = PriceTableSearch;
const PriceTableRepository = mongoose.model('priceTable', PriceTable);
exports.PriceTableRepository = PriceTableRepository;
