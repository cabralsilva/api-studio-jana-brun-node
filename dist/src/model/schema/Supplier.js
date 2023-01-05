"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierSearch = exports.SupplierRepository = exports.SupplierModel = exports.Supplier = void 0;
const mongoose = require("mongoose");
const TypeOfSupplier_1 = require("../enum/TypeOfSupplier");
const Search_1 = require("../Search");
const SupplierModel = {
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'person', required: true },
    email: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String },
    type: { type: String, enum: Object.keys(TypeOfSupplier_1.default), required: true, default: 'OTHER' },
    active: { type: Boolean, required: true, default: true }
};
exports.SupplierModel = SupplierModel;
const Supplier = new mongoose.Schema(SupplierModel);
exports.Supplier = Supplier;
class SupplierSearch extends Search_1.default {
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
                            { 'person.name': { $regex: this.searchText, $options: 'i' } }
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
exports.SupplierSearch = SupplierSearch;
const SupplierRepository = mongoose.model('supplier', Supplier);
exports.SupplierRepository = SupplierRepository;
