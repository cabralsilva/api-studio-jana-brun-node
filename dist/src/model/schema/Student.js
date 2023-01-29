"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSearch = exports.StudentRepository = exports.StudentModel = exports.Student = void 0;
const mongoose = require("mongoose");
const Utils_1 = require("../../utils/Utils");
const SchoolLevel_1 = require("../enum/SchoolLevel");
const Search_1 = require("../Search");
const StudentModel = {
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'person', required: true },
    responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'person', required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
    schoolLevel: { type: String, enum: Object.keys(SchoolLevel_1.default), required: true, default: 'CHILD_EDUCATION_ONE' },
    medicinContinuous: { type: Boolean, required: true, default: false },
    medicinNotes: { type: String },
    allergiesContinuous: { type: Boolean, required: true, default: false },
    allergiesNotes: { type: String },
    responsibleEmail: { type: String, required: true },
    responsiblePhone1: { type: String, required: true },
    responsiblePhone2: { type: String },
    responsibleInstagram: { type: String },
    responsibleFacebook: { type: String },
    active: { type: Boolean, required: true, default: true }
};
exports.StudentModel = StudentModel;
const Student = new mongoose.Schema(StudentModel);
exports.Student = Student;
class StudentSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.name = _query.name;
        this.active = _query.active;
        if (Utils_1.default.isNotEmpty(_query.person)) {
            var personArray = _query.person.trim().split(' ');
            this.person = personArray.map(p => new mongoose.Types.ObjectId(p));
        }
        if (Utils_1.default.isNotEmpty(_query.responsible)) {
            var personArray = _query.responsible.trim().split(' ');
            this.responsible = personArray.map(p => new mongoose.Types.ObjectId(p));
        }
        this.buildFilters();
    }
    buildFilters() {
        let filters = { $and: [] };
        Object.entries(this).forEach(([key, value]) => {
            if (value) {
                let condition = {};
                if (['order', 'orderBy', 'properties', 'populate', 'page', 'limit'].includes(key)) {
                    return;
                }
                if (key === 'searchText') {
                    this.searchText = this.diacriticSensitiveRegex(this.searchText);
                    condition = {
                        $or: []
                    };
                }
                else {
                    if (!Array.isArray(value)) {
                        condition[key] = value;
                    }
                    else {
                        condition = {
                            $or: [
                                { 'person': { $in: this.person || [] } },
                                { 'responsible': { $in: this.responsible || [] } }
                            ]
                        };
                    }
                }
                filters.$and.push(condition);
            }
        });
        if (filters.$and.length === 0)
            delete filters['$and'];
        this.filters = filters;
    }
}
exports.StudentSearch = StudentSearch;
const StudentRepository = mongoose.model('student', Student);
exports.StudentRepository = StudentRepository;
