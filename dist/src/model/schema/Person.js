"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonModel = void 0;
const Genre_1 = require("../enum/Genre");
const TypeOfPerson_1 = require("../enum/TypeOfPerson");
const Address_1 = require("./address/Address");
const PersonModel = {
    name: { type: String, required: true },
    tradeName: { type: String },
    socialId: { type: String, required: true },
    documentNumber: { type: String },
    bornDate: { type: Date },
    genre: { type: String, enum: Object.keys(Genre_1.default), required: true, default: 'NSA' },
    type: { type: String, enum: Object.keys(TypeOfPerson_1.default), required: true, default: 'NATURAL' },
    address: Address_1.AddressModel
};
exports.PersonModel = PersonModel;
