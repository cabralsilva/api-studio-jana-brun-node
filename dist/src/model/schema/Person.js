"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonSearch = exports.PersonRepository = exports.PersonModel = exports.Person = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Genre_1 = __importDefault(require("../enum/Genre"));
const TypeOfPerson_1 = __importDefault(require("../enum/TypeOfPerson"));
const Search_1 = __importDefault(require("../Search"));
const Address_1 = require("./address/Address");
const PersonModel = {
    name: { type: String, required: true },
    tradeName: { type: String },
    socialId: { type: String },
    documentNumber: { type: String },
    bornDate: { type: Date },
    genre: { type: String, enum: Object.keys(Genre_1.default), required: true, default: 'NSA' },
    type: { type: String, enum: Object.keys(TypeOfPerson_1.default), required: true, default: 'NATURAL' },
    address: { type: Address_1.AddressModel, required: false }
};
exports.PersonModel = PersonModel;
const Person = new mongoose_1.default.Schema(PersonModel);
exports.Person = Person;
class PersonSearch extends Search_1.default {
    constructor(_query) {
        super(_query);
        this.name = _query.name;
        this.tradeName = _query.tradeName;
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
                            { 'name': { $regex: this.searchText, $options: 'i' } },
                            { 'tradeName': { $regex: this.searchText, $options: 'i' } }
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
exports.PersonSearch = PersonSearch;
const PersonRepository = mongoose_1.default.model('person', Person);
exports.PersonRepository = PersonRepository;
