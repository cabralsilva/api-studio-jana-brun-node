"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePaymentSearch = exports.RolePaymentRepository = exports.RolePaymentModel = exports.RolePayment = void 0;
const mongoose = require("mongoose");
const TypeOfSalary_1 = require("../enum/TypeOfSalary");
const Search_1 = require("../Search");
const RolePaymentModel = {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
    sinceStudentNumber: { type: Number },
    untilStudentNumber: { type: Number },
    typeOfPayment: { type: String, enum: Object.keys(TypeOfSalary_1.default), required: true, default: 'BY_MONTH' },
    paymentValue: { type: Number },
    active: { type: Boolean, required: true, default: true }
};
exports.RolePaymentModel = RolePaymentModel;
const RolePayment = new mongoose.Schema(RolePaymentModel);
exports.RolePayment = RolePayment;
class RolePaymentSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.name = _query.name;
        this.typeOfPayment = _query.typeOfPayment;
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
                            { 'employee.person.name': { $regex: this.searchText, $options: 'i' } },
                            { 'typeOfPayment': { $regex: this.searchText, $options: 'i' } }
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
exports.RolePaymentSearch = RolePaymentSearch;
const RolePaymentRepository = mongoose.model('rolePayment', RolePayment);
exports.RolePaymentRepository = RolePaymentRepository;
