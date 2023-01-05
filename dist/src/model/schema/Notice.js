"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeSearch = exports.NoticeRepository = exports.NoticeModel = exports.Notice = void 0;
const mongoose = require("mongoose");
const TypeOfNotice_1 = require("../enum/TypeOfNotice");
const Search_1 = require("../Search");
const NoticeModel = {
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: Number, default: 1, required: true },
    type: { type: String, enum: Object.keys(TypeOfNotice_1.default), required: true, default: 'INFORMATION' },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    active: { type: Boolean, required: true, default: true }
};
exports.NoticeModel = NoticeModel;
const Notice = new mongoose.Schema(NoticeModel);
exports.Notice = Notice;
class NoticeSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.title = _query.title;
        this.description = _query.description;
        this.type = _query.type;
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
                            { 'title': { $regex: this.searchText, $options: 'i' } },
                            { 'description': { $regex: this.searchText, $options: 'i' } },
                            { 'type': { $regex: this.searchText, $options: 'i' } }
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
exports.NoticeSearch = NoticeSearch;
const NoticeRepository = mongoose.model('notice', Notice);
exports.NoticeRepository = NoticeRepository;
