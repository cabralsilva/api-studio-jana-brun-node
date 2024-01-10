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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleSearch = exports.SaleRepository = void 0;
const c2_mongoose_1 = require("c2-mongoose");
const Utils_1 = require("c2-mongoose/dist/utils/Utils");
const mongoose = __importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
const SaleSchema = new mongoose.Schema({
    sequence: { type: Number, default: 99999 },
    customerData: {
        type: {
            customer: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
            name: { type: String }
        }
    },
    payments: {
        type: [{
                description: { type: String },
                value: { type: Number },
                firstPaymentDate: { type: Date },
                installment: {
                    type: {
                        paymentCondition: { type: mongoose.Schema.Types.ObjectId, ref: 'paymentCondition' },
                        installments: {
                            type: [{
                                    sequence: { type: Number },
                                    value: { type: Number },
                                    dueDate: { type: Date },
                                }]
                        },
                    }
                },
            }]
    },
    financial: {
        type: {
            totalValue: { type: Number },
            discountValue: { type: Number },
            finalValue: { type: Number },
            paidValue: { type: Number },
            openedValue: { type: Number },
        }
    },
    items: {
        type: [{
                sequence: { type: Number },
                code: { type: String },
                description: { type: String },
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'person', required: true },
                gratesItems: {
                    type: [{
                            grate: { type: mongoose.Schema.Types.ObjectId, ref: 'grate', required: true },
                            descriptionGrate: { type: String, required: true },
                            grateItem: { type: mongoose.Schema.Types.ObjectId, ref: 'grateItem', required: true },
                            descriptionGrateItem: { type: String, required: true },
                            value: { type: String, required: true },
                        }]
                },
                quantity: { type: Number },
                unitValue: { type: Number },
                totalValue: { type: Number },
                discountValue: { type: Number },
                finalValue: { type: Number },
            }]
    }
}, {
    timestamps: { createdAt: 'createdAtDateTime', updatedAt: 'updatedAtDateTime' }
});
class SaleSearch extends c2_mongoose_1.SearchFlow {
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
            // let regex = this.buildRegex(this.searchText)
            // let condition = {
            //   $or: [
            //     { 'name': { $regex: regex } }
            //   ]
            // }
            // filters.$and.push(condition)
        }
        if (filters.$and.length === 0)
            delete filters['$and'];
        this.filters = filters;
    }
}
exports.SaleSearch = SaleSearch;
const SaleRepository = (0, mongoose_1.model)('sale', SaleSchema);
exports.SaleRepository = SaleRepository;
