"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkuItemModel = void 0;
const mongoose = require("mongoose");
const SkuItemModel = {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    grateItemList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grateItem', required: true }],
    quantity: { type: Number, required: true, default: 1 },
    unitValue: { type: Number, required: true },
    totalValue: { type: Number, required: true }
};
exports.SkuItemModel = SkuItemModel;
