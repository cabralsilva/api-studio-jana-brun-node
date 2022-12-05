"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomSearch = exports.ClassroomRepository = exports.ClassroomModel = exports.Classroom = void 0;
const mongoose = require("mongoose");
const Search_1 = require("../Search");
const ClassroomModel = {
    description: { type: String, required: true },
    active: { type: Boolean, required: true, default: true }
};
exports.ClassroomModel = ClassroomModel;
const Classroom = new mongoose.Schema(ClassroomModel);
exports.Classroom = Classroom;
class ClassroomSearch extends Search_1.default {
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
exports.ClassroomSearch = ClassroomSearch;
const ClassroomRepository = mongoose.model('classroom', Classroom);
exports.ClassroomRepository = ClassroomRepository;
