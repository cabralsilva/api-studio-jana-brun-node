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
    status: { type: String, enum: Object.keys(StatusOfMatriculation_1.default), default: 'EFFECTIVE' },
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
class MatriculationSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.model = _query;
        // this.name = _query.name
        // this.active = _query.active
        // if (Utils.isNotEmpty(_query.student)) {
        //   var personArray = _query.student.trim().split(' ')
        //   this.student = personArray.map(p => new mongoose.Types.ObjectId(p))
        // }
        if (Utils_1.default.isNotEmpty(_query === null || _query === void 0 ? void 0 : _query.classes)) {
            if (!Array.isArray(_query.classes)) {
                _query.classes = _query.classes.toString().split(',');
            }
            this.classes = _query.classes.map(data => new mongoose.Types.ObjectId(data));
        }
        this.buildFilters();
    }
    buildFilters() {
        let filters = super.getFilters(this);
        if (Utils_1.default.isEmpty(filters.$and)) {
            filters = { $and: [] };
        }
        super.addFilterModel(this.model, filters);
        if (Utils_1.default.isNotEmpty(this.classes)) {
            let condition = { 'clazzesSkus.clazz': { $in: this.classes || [] } };
            filters.$and.push(condition);
        }
        if (filters.$and.length === 0)
            delete filters['$and'];
        this.filters = filters;
    }
}
exports.MatriculationSearch = MatriculationSearch;
const MatriculationRepository = mongoose.model('matriculation', Matriculation);
exports.MatriculationRepository = MatriculationRepository;
