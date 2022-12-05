"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleDetailSearch = exports.ScheduleDetailRepository = exports.ScheduleDetailModel = exports.ScheduleDetail = void 0;
const moment = require("moment");
const mongoose = require("mongoose");
const Often_1 = require("../enum/Often");
const Search_1 = require("../Search");
const ScheduleDetailModel = {
    beginDate: { type: Date, required: true },
    beginTime: { type: String, required: true, set: (value) => { return moment(value).format('HH:mm'); } },
    duration: { type: String, required: true, set: (value) => { return moment(value).format('HH:mm'); } },
    often: { type: String, enum: Object.keys(Often_1.default), required: true, default: 'WEEKLY' },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'class', required: true },
    schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'schedule', required: true },
    active: { type: Boolean, required: true, default: true }
};
exports.ScheduleDetailModel = ScheduleDetailModel;
const ScheduleDetail = new mongoose.Schema(ScheduleDetailModel);
exports.ScheduleDetail = ScheduleDetail;
class ScheduleDetailSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
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
exports.ScheduleDetailSearch = ScheduleDetailSearch;
const ScheduleDetailRepository = mongoose.model('scheduleDetail', ScheduleDetail);
exports.ScheduleDetailRepository = ScheduleDetailRepository;
