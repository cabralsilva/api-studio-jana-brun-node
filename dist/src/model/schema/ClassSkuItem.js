"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassSkuItemSearch = exports.ClassSkuItemRepository = exports.ClassSkuItemModel = exports.ClassSkuItemScheme = void 0;
const mongoose = require("mongoose");
const Search_1 = require("../Search");
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
