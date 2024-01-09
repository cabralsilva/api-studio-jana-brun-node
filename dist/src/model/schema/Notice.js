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
exports.NoticeSearch = exports.NoticeRepository = exports.NoticeModel = exports.Notice = void 0;
const mongoose = __importStar(require("mongoose"));
const TypeOfNotice_1 = __importDefault(require("../enum/TypeOfNotice"));
const Search_1 = __importDefault(require("../Search"));
const NoticeModel = {
    title: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: Number, default: 1, required: true },
    type: { type: String, enum: Object.keys(TypeOfNotice_1.default), required: true, default: 'INFORMATION' },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    active: { type: Boolean, required: true, default: true }
};
exports.NoticeModel = NoticeModel;
const Notice = new mongoose.Schema(NoticeModel);
exports.Notice = Notice;
class NoticeSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.title = _query.title;
        this.description = _query.description;
        this.type = _query.type;
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
                            { 'title': { $regex: this.searchText, $options: 'i' } },
                            { 'description': { $regex: this.searchText, $options: 'i' } },
                            { 'type': { $regex: this.searchText, $options: 'i' } }
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
exports.NoticeSearch = NoticeSearch;
const NoticeRepository = mongoose.model('notice', Notice);
exports.NoticeRepository = NoticeRepository;
