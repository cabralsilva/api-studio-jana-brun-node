"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateSearch = exports.StateRepository = exports.State = void 0;
const mongoose = require("mongoose");
const Search_1 = require("../../Search");
const State = new mongoose.Schema({
    code: { type: String },
    name: { type: String, required: true },
    timezone: { type: String },
    abbreviation: { type: String, required: true },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'country', required: true }
});
exports.State = State;
State.index({ code: 1 }, { unique: true });
State.index({ name: 1 }, { unique: true });
State.index({ abbreviation: 1 }, { unique: true });
class StateSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.name = _query.name;
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
exports.StateSearch = StateSearch;
const StateRepository = mongoose.model('state', State);
exports.StateRepository = StateRepository;
