"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrateItemSearch = exports.GrateItemRepository = exports.GrateItem = exports.GrateItemModel = void 0;
const mongoose = require("mongoose");
const Search_1 = require("../Search");
const GrateItemModel = {
    value: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
};
exports.GrateItemModel = GrateItemModel;
const GrateItem = new mongoose.Schema(GrateItemModel);
exports.GrateItem = GrateItem;
class GrateItemSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.value = _query.value;
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
                            { 'value': { $regex: this.searchText, $options: 'i' } }
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
        console.log(this.filters);
    }
}
exports.GrateItemSearch = GrateItemSearch;
const GrateItemRepository = mongoose.model('grateItem', GrateItem);
exports.GrateItemRepository = GrateItemRepository;
