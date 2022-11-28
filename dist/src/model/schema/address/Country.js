"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountrySearch = exports.CountryRepository = exports.Country = void 0;
const mongoose = require("mongoose");
const Search_1 = require("../../Search");
const Country = new mongoose.Schema({
    code: { type: String },
    name: { type: String, required: true },
    ddi: { type: String },
    language: { type: String, required: true },
    abbreviation: { type: String, required: true }
});
exports.Country = Country;
Country.index({ code: 1 }, { unique: true });
Country.index({ name: 1 }, { unique: true });
Country.index({ ddi: 1 }, { unique: true });
Country.index({ abbreviation: 1 }, { unique: true });
class CountrySearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.name = _query.name;
        this.active = _query.active;
    }
    filters() {
        let filters = { $and: [] };
        Object.entries(this).forEach(([key, value]) => {
            if (value) {
                let condition = {};
                if (key === 'searchText') {
                    this.searchText = this.diacriticSensitiveRegex(this.searchText);
                    condition = {
                        $or: [
                            { 'name': { $regex: this.searchText, $options: 'i' } }
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
        return filters;
    }
}
exports.CountrySearch = CountrySearch;
const CountryRepository = mongoose.model('country', Country);
exports.CountryRepository = CountryRepository;
