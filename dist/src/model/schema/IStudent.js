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
exports.StudentSearch = exports.StudentRepository = void 0;
const c2_mongoose_1 = require("c2-mongoose");
const Utils_1 = require("c2-mongoose/dist/utils/Utils");
const mongoose = __importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
const SchoolLevel_1 = __importDefault(require("../enum/SchoolLevel"));
const StudentSchema = new mongoose.Schema({
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'person', required: true },
    responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'person', required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
    schoolLevel: { type: String, enum: Object.keys(SchoolLevel_1.default), required: true, default: 'CHILD_EDUCATION_ONE' },
    medicinContinuous: { type: Boolean, required: true, default: false },
    medicinNotes: { type: String },
    allergiesContinuous: { type: Boolean, required: true, default: false },
    allergiesNotes: { type: String },
    responsibleEmail: { type: String, required: true },
    responsiblePhone1: { type: String, required: true },
    responsiblePhone2: { type: String },
    responsibleInstagram: { type: String },
    responsibleFacebook: { type: String },
    active: { type: Boolean, required: true, default: true }
}, {
    timestamps: { createdAt: 'createdAtDateTime', updatedAt: 'updatedAtDateTime' }
});
class StudentSearch extends c2_mongoose_1.SearchFlow {
    constructor(params) {
        super(params);
        this.buildFilters();
    }
    buildFilters() {
        let filters = this.buildDefaultFilters(this);
        if ((0, Utils_1.isEmpty)(filters.$and)) {
            filters = { $and: [] };
        }
        if ((0, Utils_1.isNotEmpty)(this.searchText)) {
            let regex = this.buildRegex(this.searchText);
            let condition = {
                $or: [
                    { 'name': { $regex: regex } }
                ]
            };
            filters.$and.push(condition);
        }
        if (filters.$and.length === 0)
            delete filters['$and'];
        this.filters = filters;
    }
}
exports.StudentSearch = StudentSearch;
const StudentRepository = (0, mongoose_1.model)('student', StudentSchema);
exports.StudentRepository = StudentRepository;
