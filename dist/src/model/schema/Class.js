"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSearch = exports.ClassRepository = exports.ClassModel = exports.Class = void 0;
const mongoose = require("mongoose");
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
exports.ClassSearch = ClassSearch;
const ClassRepository = mongoose.model('class', Class);
exports.ClassRepository = ClassRepository;
