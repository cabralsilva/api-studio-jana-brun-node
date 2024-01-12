"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeSearch = exports.EmployeeRepository = exports.EmployeeModel = exports.Employee = void 0;
const mongoose = __importStar(require("mongoose"));
const Utils_1 = __importDefault(require("../../utils/Utils"));
const AccessProfile_1 = __importDefault(require("../enum/AccessProfile"));
const Job_1 = __importDefault(require("../enum/Job"));
const TypeOfSalary_1 = __importDefault(require("../enum/TypeOfSalary"));
const Search_1 = __importDefault(require("../Search"));
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
    job: { type: String, enum: Job_1.default, required: true },
    typeOfSalary: { type: String, enum: TypeOfSalary_1.default, required: true, default: TypeOfSalary_1.default.BY_MONTH },
    salaryValue: { type: Number, required: true, default: 0 },
    admissionDate: { type: Date },
    demissionDate: { type: Date },
    accessProfile: { type: String, enum: AccessProfile_1.default, required: true, default: AccessProfile_1.default.BASIC },
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
