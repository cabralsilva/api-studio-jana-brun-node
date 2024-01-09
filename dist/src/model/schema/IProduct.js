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
exports.ProductSearch = exports.ProductRepository = void 0;
const c2_mongoose_1 = require("c2-mongoose");
const Utils_1 = require("c2-mongoose/dist/utils/Utils");
const mongoose = __importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
const Category_1 = __importDefault(require("../enum/Category"));
const ProductSchema = new mongoose.Schema({
    code: { type: String },
    description: { type: String, required: true },
    category: { type: String, enum: Category_1.default, required: true, default: Category_1.default.OTHERS },
    grates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grate', required: true }],
    active: { type: Boolean, required: true, default: true }
}, {
    timestamps: { createdAt: 'createdAtDateTime', updatedAt: 'updatedAtDateTime' }
});
class ProductSearch extends c2_mongoose_1.SearchFlow {
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
                    { 'code': { $regex: regex } },
                    { 'description': { $regex: regex } },
                    { 'category': { $regex: regex } }
                ]
            };
            filters.$and.push(condition);
        }
        if (filters.$and.length === 0)
            delete filters['$and'];
        this.filters = filters;
    }
}
exports.ProductSearch = ProductSearch;
const ProductRepository = (0, mongoose_1.model)('product', ProductSchema);
exports.ProductRepository = ProductRepository;
