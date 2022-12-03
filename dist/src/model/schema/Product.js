"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSearch = exports.ProductRepository = exports.ProductModel = exports.Product = void 0;
const mongoose = require("mongoose");
const Category_1 = require("../enum/Category");
const Search_1 = require("../Search");
const ProductModel = {
    code: { type: String },
    description: { type: String, required: true },
    unitPrice: { type: Number, default: 1, required: true },
    category: { type: String, enum: Object.keys(Category_1.default), required: true, default: 'OTHERS' },
    grates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grate', required: true }],
    active: { type: Boolean, required: true, default: true }
};
exports.ProductModel = ProductModel;
const Product = new mongoose.Schema(ProductModel);
exports.Product = Product;
class ProductSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.code = _query.code;
        this.description = _query.description;
        this.category = _query.category;
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
                            { 'code': { $regex: this.searchText, $options: 'i' } },
                            { 'description': { $regex: this.searchText, $options: 'i' } },
                            { 'category': { $regex: this.searchText, $options: 'i' } }
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
exports.ProductSearch = ProductSearch;
const ProductRepository = mongoose.model('product', Product);
exports.ProductRepository = ProductRepository;
