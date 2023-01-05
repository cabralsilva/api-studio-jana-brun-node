"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModel = void 0;
const mongoose = require("mongoose");
const AddressModel = {
    street: { type: String, required: true },
    number: { type: String },
    complement: { type: String },
    zipCode: { type: String },
    neighborhood: { type: String },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'city', required: true }
};
exports.AddressModel = AddressModel;
