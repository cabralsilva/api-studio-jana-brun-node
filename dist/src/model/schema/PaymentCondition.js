"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentConditionSearch = exports.PaymentConditionRepository = exports.PaymentConditionModel = exports.PaymentCondition = void 0;
const mongoose = require("mongoose");
const Search_1 = require("../Search");
const PaymentConditionModel = {
    description: { type: String, required: true },
    quantityInstallments: { type: Number, default: 1, required: true },
    active: { type: Boolean, required: true, default: true }
};
exports.PaymentConditionModel = PaymentConditionModel;
const PaymentCondition = new mongoose.Schema(PaymentConditionModel);
exports.PaymentCondition = PaymentCondition;
PaymentCondition.index({ description: 1 }, { unique: true });
class PaymentConditionSearch extends Search_1.default {
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
exports.PaymentConditionSearch = PaymentConditionSearch;
const PaymentConditionRepository = mongoose.model('paymentCondition', PaymentCondition);
exports.PaymentConditionRepository = PaymentConditionRepository;
