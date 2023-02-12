"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollSearch = exports.PayrollRepository = exports.PayrollModel = exports.Payroll = void 0;
const mongoose = require("mongoose");
const StatusOfPayroll_1 = require("../enum/StatusOfPayroll");
const Search_1 = require("../Search");
const PayrollDetailModel = {
    description: { type: String, required: true },
    employee: {
        _id: { type: String, required: true },
        name: { type: String, required: true }
    },
    baseValue: { type: String, required: true },
    variableValue: { type: String, required: true },
    finalValue: { type: String, required: true }
};
const PayrollModel = {
    description: { type: String, required: true },
    initDate: { type: String, required: true },
    endDate: { type: String, required: true },
    targetDate: { type: String, required: true },
    status: { type: String, enum: Object.keys(StatusOfPayroll_1.default), required: true, default: 'OPENED' },
    payrollDetails: [PayrollDetailModel]
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
