"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrateSearch = exports.GrateRepository = exports.GrateModel = exports.Grate = void 0;
const mongoose = require("mongoose");
const TypeOfValue_1 = require("../enum/TypeOfValue");
const Search_1 = require("../Search");
const GrateItem_1 = require("./GrateItem");
const GrateModel = {
    description: { type: String, required: true },
    typeOfValue: { type: String, enum: Object.keys(TypeOfValue_1.default), required: true, default: 'NUMBER' },
    items: [GrateItem_1.GrateItem],
    active: { type: Boolean, required: true, default: true }
};
exports.GrateModel = GrateModel;
const Grate = new mongoose.Schema(GrateModel);
exports.Grate = Grate;
Grate.index({ description: 1 }, { unique: true });
class GrateSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.description = _query.description;
        this.typeOfValue = _query.typeOfValue;
        this.active = _query.active;
        this["items._id"] = _query.items;
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
                            { 'description': { $regex: this.searchText, $options: 'i' } },
                            { 'typeOfValue': { $regex: this.searchText, $options: 'i' } }
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
exports.GrateSearch = GrateSearch;
const GrateRepository = mongoose.model('grate', Grate);
exports.GrateRepository = GrateRepository;
