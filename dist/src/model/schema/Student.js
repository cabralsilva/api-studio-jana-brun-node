"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSearch = exports.StudentRepository = exports.StudentModel = exports.Student = void 0;
const mongoose = require("mongoose");
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
                            { 'person.name': { $regex: this.searchText, $options: 'i' } }
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
exports.StudentSearch = StudentSearch;
const StudentRepository = mongoose.model('student', Student);
exports.StudentRepository = StudentRepository;
