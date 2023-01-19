"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitySearch = exports.CityRepository = exports.City = void 0;
const mongoose = require("mongoose");
const Search_1 = require("../../Search");
const City = new mongoose.Schema({
    code: { type: String },
    name: { type: String, required: true },
    abbreviation: { type: String },
    state: { type: mongoose.Schema.Types.ObjectId, ref: 'state', required: true }
});
exports.City = City;
City.index({ code: 1 }, { unique: true });
City.index({ name: 1 }, { unique: true });
City.index({ abbreviation: 1 }, { unique: true });
class CitySearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.name = _query.name;
        this.active = _query.active;
        this.state = _query.state ? new mongoose.Types.ObjectId(_query.state) : null;
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
        this.filters = filters;
    }
}
exports.CitySearch = CitySearch;
const CityRepository = mongoose.model('city', City);
exports.CityRepository = CityRepository;
