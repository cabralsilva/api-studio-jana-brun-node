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
exports.ClassSkuItemSearch = exports.ClassSkuItemRepository = exports.ClassSkuItemModel = exports.ClassSkuItemScheme = void 0;
const mongoose = __importStar(require("mongoose"));
const Search_1 = __importDefault(require("../Search"));
const SkuItem_1 = require("./SkuItem");
const ClassSkuItemModel = Object.assign({ clazz: { type: mongoose.Schema.Types.ObjectId, ref: 'class' } }, SkuItem_1.SkuItemModel);
exports.ClassSkuItemModel = ClassSkuItemModel;
const ClassSkuItemScheme = new mongoose.Schema(ClassSkuItemModel);
exports.ClassSkuItemScheme = ClassSkuItemScheme;
class ClassSkuItemSearch extends Search_1.default {
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
exports.ClassSkuItemSearch = ClassSkuItemSearch;
const ClassSkuItemRepository = mongoose.model('classSkuItem', ClassSkuItemScheme);
exports.ClassSkuItemRepository = ClassSkuItemRepository;
