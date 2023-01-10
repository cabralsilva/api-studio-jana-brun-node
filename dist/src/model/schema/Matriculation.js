"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatriculationSearch = exports.MatriculationRepository = exports.MatriculationModel = exports.Matriculation = void 0;
const mongoose = require("mongoose");
const StatusOfMatriculation_1 = require("../enum/StatusOfMatriculation");
const Search_1 = require("../Search");
const Class_1 = require("./Class");
const SkuItem_1 = require("./SkuItem");
const MatriculationModel = {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
    responsibleFinancial: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
    effectiveDateTime: { type: Date },
    dayOfMonthToPayment: { type: Number },
    observation: { type: String },
    status: { type: String, enum: Object.keys(StatusOfMatriculation_1.default), required: true, default: 'PRE_REGISTER' },
    classes: [Class_1.Class],
    classesSkus: [
        Object.assign({ clazz: Class_1.Class }, SkuItem_1.SkuItemModel)
    ],
    extraSkus: [SkuItem_1.SkuItemModel]
};
exports.MatriculationModel = MatriculationModel;
const Matriculation = new mongoose.Schema(MatriculationModel, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
exports.Matriculation = Matriculation;
Matriculation.index({ "student": 1 }, { unique: false });
class MatriculationSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.name = _query.name;
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
                            { 'student.person.name': { $regex: this.searchText, $options: 'i' } },
                            { 'student.responsible.name': { $regex: this.searchText, $options: 'i' } },
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
exports.MatriculationSearch = MatriculationSearch;
const MatriculationRepository = mongoose.model('matriculation', Matriculation);
exports.MatriculationRepository = MatriculationRepository;
