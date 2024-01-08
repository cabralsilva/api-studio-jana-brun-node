"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialSearchOLD = exports.FinancialSearch = exports.FinancialRepository = exports.FinancialModel = exports.Financial = void 0;
const moment = require("moment");
const mongoose = require("mongoose");
const Utils_1 = require("../../utils/Utils");
const PaymentMethod_1 = require("../enum/PaymentMethod");
const StatusOfFinancial_1 = require("../enum/StatusOfFinancial");
const TypeOfFinancial_1 = require("../enum/TypeOfFinancial");
const Search_1 = require("../Search");
const c2_mongoose_1 = require("c2-mongoose");
const Utils_2 = require("c2-mongoose/dist/utils/Utils");
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
            paymentDate: { type: Date, required: true },
            valuePaid: { type: Number },
            employee: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' },
            paymentMethod: { type: String, enum: Object.keys(PaymentMethod_1.default), required: true, default: "CASH" }
        }]
};
exports.FinancialModel = FinancialModel;
const Financial = new mongoose.Schema(FinancialModel, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
exports.Financial = Financial;
class FinancialSearchOLD extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.description = _query.description;
        this.sequence = _query.sequence;
        this.name = _query.name;
        this.movimentDateGreaterThan = Utils_1.default.isNotEmpty(_query.movimentDateGreaterThan) ? moment(_query.movimentDateGreaterThan) : undefined;
        this.movimentDateLessThan = Utils_1.default.isNotEmpty(_query.movimentDateLessThan) ? moment(_query.movimentDateLessThan) : undefined;
        this.dueDateGreaterThan = Utils_1.default.isNotEmpty(_query.dueDateGreaterThan) ? moment(_query.dueDateGreaterThan) : undefined;
        this.dueDateLessThan = Utils_1.default.isNotEmpty(_query.dueDateLessThan) ? moment(_query.dueDateLessThan) : undefined;
        if (Utils_1.default.isNotEmpty(_query.person)) {
            var personArray = _query.person.trim().split(' ');
            this.person = personArray.map(p => new mongoose.Types.ObjectId(p));
        }
        if (Utils_1.default.isNotEmpty(_query.status)) {
            this.status = _query.status.trim().split(' ');
        }
        if (Utils_1.default.isNotEmpty(_query.type)) {
            this.type = _query.type.trim().split(' ');
        }
        this.buildFilters();
    }
    buildFilters() {
        let filters = { $and: [] };
        let rangeDueDate = {};
        let rangeMovimentDate = {};
        Object.entries(this).forEach(([key, value]) => {
            if (Utils_1.default.isNotEmpty(value)) {
                let condition = {};
                if (['order', 'orderBy', 'properties', 'populate', 'page', 'limit'].includes(key)) {
                    return;
                }
                if (key === 'searchText') {
                    this.searchText = this.diacriticSensitiveRegex(this.searchText);
                    condition = {
                        $or: [
                            { 'description': { $regex: this.searchText, $options: 'i' } },
                            { 'sequence': { $regex: this.searchText, $options: 'i' } },
                            { 'status': { $regex: this.searchText, $options: 'i' } },
                            { 'type': { $regex: this.searchText, $options: 'i' } },
                            { 'person': { $in: this.person || [] } }
                        ]
                    };
                    filters.$and.push(condition);
                }
                else {
                    if (key === 'dueDateGreaterThan' && value) {
                        rangeDueDate['$gte'] = new Date(value);
                        filters.$and.push(condition);
                    }
                    else if (key === 'dueDateLessThan' && value) {
                        rangeDueDate['$lte'] = new Date(value);
                        filters.$and.push(condition);
                    }
                    else if (key === 'movimentDateGreaterThan' && value) {
                        rangeMovimentDate['$gte'] = new Date(value);
                        filters.$and.push(condition);
                    }
                    else if (key === 'movimentDateLessThan' && value) {
                        rangeMovimentDate['$lte'] = new Date(value);
                        filters.$and.push(condition);
                    }
                    else {
                        if (!Array.isArray(value)) {
                            condition[key] = value;
                        }
                        else {
                            condition[key] = { $in: value };
                        }
                        filters.$and.push(condition);
                    }
                }
            }
        });
        if (Utils_1.default.isNotEmpty(rangeDueDate.$gte) || Utils_1.default.isNotEmpty(rangeDueDate.$lte)) {
            filters.$and.push({ dueDate: rangeDueDate });
        }
        if (Utils_1.default.isNotEmpty(rangeMovimentDate.$gte) || Utils_1.default.isNotEmpty(rangeMovimentDate.$lte)) {
            filters.$and.push({ movimentDate: rangeMovimentDate });
        }
        if (filters.$and.length === 0)
            delete filters['$and'];
        this.filters = filters;
    }
}
exports.FinancialSearchOLD = FinancialSearchOLD;
class FinancialSearch extends c2_mongoose_1.SearchFlow {
    constructor(params) {
        super(params);
        this.buildFilters();
    }
    buildFilters() {
        let filters = this.buildDefaultFilters(this);
        if ((0, Utils_2.isEmpty)(filters.$and)) {
            filters = { $and: [] };
        }
        if ((0, Utils_2.isNotEmpty)(this.searchText)) {
            let regex = this.buildRegex(this.searchText);
            let condition = {
                $or: [
                    { 'description': { $regex: regex } },
                    { 'sequence': { $regex: regex } },
                    { 'status': { $regex: regex } },
                    { 'type': { $regex: regex } },
                ]
            };
            filters.$and.push(condition);
        }
        if (filters.$and.length === 0)
            delete filters['$and'];
        this.filters = filters;
    }
}
exports.FinancialSearch = FinancialSearch;
const FinancialRepository = mongoose.model('financial', Financial);
exports.FinancialRepository = FinancialRepository;
