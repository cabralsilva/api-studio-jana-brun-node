"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSearch = exports.EmployeeRepository = exports.EmployeeModel = exports.Employee = void 0;
const mongoose = require("mongoose");
const Utils_1 = require("../../utils/Utils");
const AccessProfile_1 = require("../enum/AccessProfile");
const Job_1 = require("../enum/Job");
const TypeOfSalary_1 = require("../enum/TypeOfSalary");
const Search_1 = require("../Search");
const EmployeeModel = {
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'person', required: true },
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
};
exports.EmployeeModel = EmployeeModel;
const Employee = new mongoose.Schema(EmployeeModel);
exports.Employee = Employee;
Employee.index({ email: 1 }, { unique: true });
class EmployeeSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.name = _query.name;
        this.active = _query.active;
        if (Utils_1.default.isNotEmpty(_query.person)) {
            var personArray = _query.person.trim().split(' ');
            this.person = personArray.map(p => new mongoose.Types.ObjectId(p));
        }
        this.buildFilters();
    }
    buildFilters() {
        let filters = { $and: [] };
        Object.entries(this).forEach(([key, value]) => {
            if (value) {
                let condition = {};
                if (key === 'person') {
                    condition[key] = { $in: value };
                }
                else {
                    if (!Array.isArray(value)) {
                        condition[key] = value;
                    }
                    else {
                        condition[key] = { $in: value };
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
exports.EmployeeSearch = EmployeeSearch;
const EmployeeRepository = mongoose.model('employee', Employee);
exports.EmployeeRepository = EmployeeRepository;
