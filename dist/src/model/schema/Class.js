"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSearch = exports.ClassRepository = exports.ClassModel = exports.Class = void 0;
const moment = require("moment");
const mongoose = require("mongoose");
const Utils_1 = require("../../utils/Utils");
const Often_1 = require("../enum/Often");
const Search_1 = require("../Search");
const RolePayment_1 = require("./RolePayment");
const ClassModel = {
    description: { type: String, required: true },
    inviteWhatsAppGroup: { type: String },
    beginDate: { type: Date, required: true },
    endDate: { type: Date },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    rolePayments: [RolePayment_1.RolePayment],
    schedulesDetails: [
        {
            classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'classroom', required: true },
            beginTime: { type: String, required: true },
            endTime: { type: String, required: true },
            often: { type: String, enum: Object.keys(Often_1.default), required: true, default: 'WEEKLY' },
            oftenDay: { type: String, required: true }
        }
    ]
};
exports.ClassModel = ClassModel;
const Class = new mongoose.Schema(ClassModel, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
exports.Class = Class;
class ClassSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.model = _query;
        if (Utils_1.default.isNotEmpty(_query === null || _query === void 0 ? void 0 : _query.endDateRange)) {
            if (!Array.isArray(_query.endDateRange)) {
                _query.endDateRange = _query.endDateRange.toString().split(',');
            }
            this.endDateRange = _query.endDateRange.map(data => moment(data));
        }
        if (Utils_1.default.isNotEmpty(_query === null || _query === void 0 ? void 0 : _query.employee)) {
            if (!Array.isArray(_query.employee)) {
                _query.employee = _query.employee.toString().split(',');
            }
            this.employee = _query.employee.map(data => new mongoose.Types.ObjectId(data));
        }
        this.buildFilters();
    }
    buildFilters() {
        let filters = super.getFilters(this);
        if (Utils_1.default.isEmpty(filters.$and)) {
            filters = { $and: [] };
        }
        if (Utils_1.default.isNotEmpty(this.searchText)) {
            this.searchText = this.diacriticSensitiveRegex(this.searchText);
            let condition = {
                $or: [
                    { 'description': { $regex: this.searchText, $options: 'i' } }
                ]
            };
            filters.$and.push(condition);
        }
        if (Utils_1.default.isNotEmpty(this.employee)) {
            let condition = { 'rolePayments.employee': { $in: this.employee || [] } };
            filters.$and.push(condition);
        }
        if (filters.$and.length === 0)
            delete filters['$and'];
        this.filters = filters;
    }
}
exports.ClassSearch = ClassSearch;
const ClassRepository = mongoose.model('class', Class);
exports.ClassRepository = ClassRepository;
