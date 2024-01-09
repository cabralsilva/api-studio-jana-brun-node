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
exports.PriceTableSearch = exports.PriceTableRepository = exports.PriceTableModel = exports.PriceTable = void 0;
const mongoose = __importStar(require("mongoose"));
const Search_1 = __importDefault(require("../Search"));
const PriceTableItem_1 = require("./PriceTableItem");
const PriceTableModel = {
    description: { type: String, required: true },
    beginDateTime: { type: Date, required: true },
    endDateTime: { type: Date },
    items: [PriceTableItem_1.PriceTableItem]
};
exports.PriceTableModel = PriceTableModel;
const PriceTable = new mongoose.Schema(PriceTableModel, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
exports.PriceTable = PriceTable;
class PriceTableSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.code = _query.code;
        this.description = _query.description;
        this.category = _query.category;
        this.active = _query.active;
        this.effectiveDate = _query.effectiveDate;
        this.buildFilters();
    }
    buildFilters() {
        let filters = { $and: [] };
        Object.entries(this).forEach(([key, value]) => {
            if (['order', 'orderBy', 'properties', 'populate', 'page', 'limit'].includes(key)) {
                return;
            }
            if (value) {
                let condition = {};
                if (key === 'searchText') {
                    this.searchText = this.diacriticSensitiveRegex(this.searchText);
                    condition = {
                        $or: [
                            { 'code': { $regex: this.searchText, $options: 'i' } },
                            { 'description': { $regex: this.searchText, $options: 'i' } },
                            { 'category': { $regex: this.searchText, $options: 'i' } }
                        ]
                    };
                }
                else {
                    if (key === 'effectiveDate' && value) {
                        filters.$and.push({
                            beginDateTime: {
                                '$lte': value
                            },
                            endDateTime: {
                                '$gte': value
                            }
                        });
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
        if (filters.$and.length === 0)
            delete filters['$and'];
        this.filters = filters;
    }
}
exports.PriceTableSearch = PriceTableSearch;
const PriceTableRepository = mongoose.model('priceTable', PriceTable);
exports.PriceTableRepository = PriceTableRepository;
