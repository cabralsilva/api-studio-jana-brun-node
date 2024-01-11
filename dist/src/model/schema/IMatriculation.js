"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatriculationSearchOLD = exports.MatriculationRepository = exports.MatriculationModel = exports.Matriculation = exports.MatriculationSearch = void 0;
const mongoose = __importStar(require("mongoose"));
const Utils_1 = __importDefault(require("../../utils/Utils"));
const StatusOfMatriculation_1 = __importDefault(require("../enum/StatusOfMatriculation"));
const Search_1 = __importDefault(require("../Search"));
const SkuItem_1 = require("./SkuItem");
const c2_mongoose_1 = require("c2-mongoose");
const Utils_2 = require("c2-mongoose/dist/utils/Utils");
const IClassSkuItem_1 = require("./IClassSkuItem");
const MatriculationModel = {
    sequence: { type: String },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
    responsibleFinancial: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
    effectiveDateTime: { type: Date },
    dayOfMonthToPayment: { type: Number },
    observation: { type: String },
    status: { type: String, enum: Object.keys(StatusOfMatriculation_1.default), default: 'EFFECTIVE' },
    // clazzesSkus: IClassSkuItem[],
    clazzesSkus: [IClassSkuItem_1.ClassSkuItemScheme],
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
class MatriculationSearch extends c2_mongoose_1.SearchFlow {
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
                    { 'name': { $regex: regex } },
                    { 'tradeName': { $regex: regex } }
                ]
            };
            filters.$and.push(condition);
        }
        if (filters.$and.length === 0)
            delete filters['$and'];
        this.filters = filters;
    }
}
exports.MatriculationSearch = MatriculationSearch;
class MatriculationSearchOLD extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.model = _query;
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
exports.MatriculationSearchOLD = MatriculationSearchOLD;
const MatriculationRepository = mongoose.model('matriculation', Matriculation);
exports.MatriculationRepository = MatriculationRepository;
