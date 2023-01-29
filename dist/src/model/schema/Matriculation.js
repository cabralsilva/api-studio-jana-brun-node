"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatriculationSearch = exports.MatriculationRepository = exports.MatriculationModel = exports.Matriculation = void 0;
const mongoose = require("mongoose");
const Utils_1 = require("../../utils/Utils");
const StatusOfMatriculation_1 = require("../enum/StatusOfMatriculation");
const Search_1 = require("../Search");
const ClassSkuItem_1 = require("./ClassSkuItem");
const SkuItem_1 = require("./SkuItem");
const MatriculationModel = {
    sequence: { type: String },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
    responsibleFinancial: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
    effectiveDateTime: { type: Date },
    dayOfMonthToPayment: { type: Number },
    observation: { type: String },
    status: { type: String, enum: Object.keys(StatusOfMatriculation_1.default), required: true, default: 'EFFECTIVE' },
    clazzesSkus: [ClassSkuItem_1.ClassSkuItemScheme],
    extraSkus: [SkuItem_1.SkuItemModel],
    paymentConditionClasses: { type: mongoose.Schema.Types.ObjectId, ref: 'paymentCondition' },
    paymentConditionExtra: { type: mongoose.Schema.Types.ObjectId, ref: 'paymentCondition' },
    classSkuFinancialCreated: { type: Boolean, default: false },
    extraSkuFinancialCreated: { type: Boolean, default: false }
};
exports.MatriculationModel = MatriculationModel;
const Matriculation = new mongoose.Schema(MatriculationModel, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
exports.Matriculation = Matriculation;
Matriculation.index({ "student": 1 }, { unique: false });
Matriculation.index({ 'student.person.name': 'text', 'student.responsible.name': 'text' });
class MatriculationSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.name = _query.name;
        this.active = _query.active;
        if (Utils_1.default.isNotEmpty(_query.student)) {
            var personArray = _query.student.trim().split(' ');
            this.student = personArray.map(p => new mongoose.Types.ObjectId(p));
        }
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
                            { 'sequence': { $regex: this.searchText, $options: 'i' } }
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
                    filters.$and.push(condition);
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
