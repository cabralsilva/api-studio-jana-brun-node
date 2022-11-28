"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSearch = exports.EmployeeRepository = exports.Employee = void 0;
const mongoose = require("mongoose");
const AccessProfile_1 = require("../enum/AccessProfile");
const Job_1 = require("../enum/Job");
const TypeOfSalary_1 = require("../enum/TypeOfSalary");
const Search_1 = require("../Search");
const Person_1 = require("./Person");
const Employee = new mongoose.Schema({
    person: Person_1.PersonModel,
    medicinContinuous: { type: Boolean, required: true, default: false },
    medicinNotes: { type: String },
    allergiesContinuous: { type: Boolean, required: true, default: false },
    allergiesNotes: { type: String },
    email: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    active: { type: Boolean, required: true, default: true },
    job: { type: String, enum: Object.keys(Job_1.default), required: true, default: 'NATURAL' },
    typeOfSalary: { type: String, enum: Object.keys(TypeOfSalary_1.default), required: true, default: 'BY_MONTH' },
    salaryValue: { type: Number, required: true, default: 0 },
    admissionDate: { type: Date },
    demissionDate: { type: Date },
    accessProfile: { type: String, enum: Object.keys(AccessProfile_1.default), required: true, default: 'BASIC' },
    password: { type: String },
    salt: { type: String }
});
exports.Employee = Employee;
Employee.index({ email: 1 }, { unique: true });
class EmployeeSearch extends Search_1.default {
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
        return filters;
    }
}
exports.EmployeeSearch = EmployeeSearch;
const EmployeeRepository = mongoose.model('employee', Employee);
exports.EmployeeRepository = EmployeeRepository;
