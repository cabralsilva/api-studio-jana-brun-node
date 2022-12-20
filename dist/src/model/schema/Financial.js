"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialSearch = exports.FinancialRepository = exports.FinancialModel = exports.Financial = void 0;
const mongoose = require("mongoose");
const PaymentMethod_1 = require("../enum/PaymentMethod");
const StatusOfFinancial_1 = require("../enum/StatusOfFinancial");
const TypeOfFinancial_1 = require("../enum/TypeOfFinancial");
const Search_1 = require("../Search");
const FinancialModel = {
    sequence: { type: String, required: true },
    description: { type: String },
    movimentDate: { type: Date, required: true, default: new Date() },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: Object.keys(StatusOfFinancial_1.default), required: true, default: "OPENED" },
    type: { type: String, enum: Object.keys(TypeOfFinancial_1.default), required: true },
    installment: { type: Number, required: true },
    installmentTotal: { type: Number, required: true },
    value: { type: Number, required: true },
    paymentCondition: { type: mongoose.Schema.Types.ObjectId, ref: 'paymentCondition' },
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
    payments: [{
            movimentDate: { type: Date, required: true, default: new Date() },
            targetDate: { type: Date, required: true },
            valuePaid: { type: Number },
            paymentMethod: { type: String, enum: Object.keys(PaymentMethod_1.default), required: true, default: "CASH" }
        }]
};
exports.FinancialModel = FinancialModel;
const Financial = new mongoose.Schema(FinancialModel, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
exports.Financial = Financial;
class FinancialSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.description = _query.description;
        this.sequence = _query.sequence;
        this.status = _query.status;
        this.type = _query.type;
        this.name = _query.name;
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
                            { 'description': { $regex: this.searchText, $options: 'i' } },
                            { 'sequence': { $regex: this.searchText, $options: 'i' } },
                            { 'status': { $regex: this.searchText, $options: 'i' } },
                            { 'type': { $regex: this.searchText, $options: 'i' } },
                            { 'customer.person.name': { $regex: this.searchText, $options: 'i' } },
                            { 'supplier.person.name': { $regex: this.searchText, $options: 'i' } }
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
exports.FinancialSearch = FinancialSearch;
const FinancialRepository = mongoose.model('financial', Financial);
exports.FinancialRepository = FinancialRepository;
