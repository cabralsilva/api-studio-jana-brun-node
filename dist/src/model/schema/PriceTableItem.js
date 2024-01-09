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
exports.PriceTableItemSearch = exports.PriceTableItemRepository = exports.PriceTableItemModel = exports.PriceTableItem = void 0;
const mongoose = __importStar(require("mongoose"));
const Search_1 = __importDefault(require("../Search"));
const PriceTableItemModel = {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    gratesItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grateItem', required: true }],
    price: { type: Number, required: true }
};
exports.PriceTableItemModel = PriceTableItemModel;
const PriceTableItem = new mongoose.Schema(PriceTableItemModel);
exports.PriceTableItem = PriceTableItem;
class PriceTableItemSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
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
                        $or: []
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
exports.PriceTableItemSearch = PriceTableItemSearch;
const PriceTableItemRepository = mongoose.model('priceTableItem', PriceTableItem);
exports.PriceTableItemRepository = PriceTableItemRepository;
