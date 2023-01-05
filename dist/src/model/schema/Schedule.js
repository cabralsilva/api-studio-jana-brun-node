"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleSearch = exports.ScheduleRepository = exports.ScheduleModel = exports.Schedule = void 0;
const mongoose = require("mongoose");
const Search_1 = require("../Search");
const ScheduleModel = {
    beginDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'classroom', required: true },
    active: { type: Boolean, required: true, default: true }
};
exports.ScheduleModel = ScheduleModel;
const Schedule = new mongoose.Schema(ScheduleModel);
exports.Schedule = Schedule;
class ScheduleSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.description = _query.description;
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
                            { 'description': { $regex: this.searchText, $options: 'i' } }
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
exports.ScheduleSearch = ScheduleSearch;
const ScheduleRepository = mongoose.model('schedule', Schedule);
exports.ScheduleRepository = ScheduleRepository;
