"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollSearch = exports.PayrollRepository = exports.PayrollEmployeeDetail = exports.PayrollMonthly = exports.PayrollModel = exports.Payroll = void 0;
const mongoose = require("mongoose");
const TypeOfPayroll_1 = require("../enum/TypeOfPayroll");
const TypeOfSalary_1 = require("../enum/TypeOfSalary");
const Search_1 = require("../Search");
const PayrollMonthlyDetail = {
    label: { type: String },
    quantityOfDays: { type: Number },
    total: { type: Number }
};
const PayrollMonthly = {
    details: [PayrollMonthlyDetail],
    total: { type: Number }
};
exports.PayrollMonthly = PayrollMonthly;
const PayrollEmployeeDetail = {
    description: { type: String, required: true },
    employee: {
        _id: { type: mongoose.Types.ObjectId },
        name: { type: String, required: true }
    },
    payments: [
        {
            type: { type: String, enum: Object.keys(TypeOfPayroll_1.default), required: true },
            total: { type: Number },
            monthly: PayrollMonthly,
            classes: [{
                    clazz: {
                        _id: { type: mongoose.Types.ObjectId },
                        name: { type: String }
                    },
                    type: { type: String, enum: Object.keys(TypeOfSalary_1.default), required: true },
                    percentDetails: {
                        quantityOfMatriculation: { type: Number },
                        percent: { type: Number },
                        baseValue: { type: Number },
                        total: { type: Number }
                    },
                    hoursDetails: [{
                            day: { type: Date },
                            hoursFactor: { type: Number },
                            hourValue: { type: Number },
                            hoursLabel: { type: String },
                            total: { type: Number }
                        }],
                    total: { type: Number }
                }]
        }
    ],
    variableValueTotal: { type: Number, default: 0 },
    regularValueTotal: { type: Number, default: 0 },
    total: { type: Number, required: true, default: 0 },
};
exports.PayrollEmployeeDetail = PayrollEmployeeDetail;
const PayrollModel = {
    description: { type: String, required: true },
    initDate: { type: String, required: true },
    endDate: { type: String, required: true },
    targetDate: { type: String, required: true },
    regularPayroll: { type: Boolean, default: true },
    variablePayroll: { type: Boolean, default: true },
    payrollEmployeeDetails: [PayrollEmployeeDetail]
};
exports.PayrollModel = PayrollModel;
const Payroll = new mongoose.Schema(PayrollModel);
exports.Payroll = Payroll;
class PayrollSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.buildFilters();
    }
    buildFilters() {
        let filters = { $and: [] };
        Object.entries(this).forEach(([key, value]) => {
            if (['order', 'orderBy', 'properties', 'populate', 'page', 'limit'].includes(key)) {
                return;
            }
            if (value) {
                let condition = {};
                if (key === 'searchText') {
                    this.searchText = this.diacriticSensitiveRegex(this.searchText);
                    condition = {
                        $or: [
                            { 'description': { $regex: this.searchText, $options: 'i' } },
                            { 'payrollDetails.employee.name': { $regex: this.searchText, $options: 'i' } }
                        ]
                    };
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
exports.PayrollSearch = PayrollSearch;
const PayrollRepository = mongoose.model('payroll', Payroll);
exports.PayrollRepository = PayrollRepository;
