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
exports.GrateSearch = exports.GrateRepository = exports.GrateModel = exports.Grate = void 0;
const c2_mongoose_1 = require("c2-mongoose");
const Utils_1 = require("c2-mongoose/dist/utils/Utils");
const mongoose = __importStar(require("mongoose"));
const TypeOfValue_1 = __importDefault(require("../enum/TypeOfValue"));
const GrateModel = {
    description: { type: String, required: true },
    typeOfValue: { type: String, enum: Object.keys(TypeOfValue_1.default), required: true, default: 'NUMBER' },
    items: {
        type: [{
                value: { type: String, required: true },
                active: { type: Boolean, required: true, default: true }
            }]
    },
    active: { type: Boolean, required: true, default: true }
};
exports.GrateModel = GrateModel;
const Grate = new mongoose.Schema(GrateModel, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
exports.Grate = Grate;
// class GrateSearchOLD extends Search {
//   description: { type: String }
//   sequence: { type: String }
//   type: []
//   name: { type: String }
//   dueDateGreaterThan: moment.Moment
//   dueDateLessThan: moment.Moment
//   movimentDateGreaterThan: moment.Moment
//   movimentDateLessThan: moment.Moment
//   status: []
//   person: mongoose.Types.ObjectId[]
//   constructor(_query: any) {
//     super(_query)
//     this.description = _query.description
//     this.sequence = _query.sequence
//     this.name = _query.name
//     this.movimentDateGreaterThan = Utils.isNotEmpty(_query.movimentDateGreaterThan) ? moment(_query.movimentDateGreaterThan) : undefined
//     this.movimentDateLessThan = Utils.isNotEmpty(_query.movimentDateLessThan) ? moment(_query.movimentDateLessThan) : undefined
//     this.dueDateGreaterThan = Utils.isNotEmpty(_query.dueDateGreaterThan) ? moment(_query.dueDateGreaterThan) : undefined
//     this.dueDateLessThan = Utils.isNotEmpty(_query.dueDateLessThan) ? moment(_query.dueDateLessThan) : undefined
//     if (Utils.isNotEmpty(_query.person)) {
//       var personArray = _query.person.trim().split(' ')
//       this.person = personArray.map(p => new mongoose.Types.ObjectId(p))
//     }
//     if (Utils.isNotEmpty(_query.status)) {
//       this.status = _query.status.trim().split(' ')
//     }
//     if (Utils.isNotEmpty(_query.type)) {
//       this.type = _query.type.trim().split(' ')
//     }
//     this.buildFilters()
//   }
//   buildFilters() {
//     let filters = { $and: [] } as any
//     let rangeDueDate = {} as any
//     let rangeMovimentDate = {} as any
//     Object.entries(this).forEach(([key, value]) => {
//       if (Utils.isNotEmpty(value)) {
//         let condition = {}
//         if (['order', 'orderBy', 'properties', 'populate', 'page', 'limit'].includes(key)) {
//           return
//         }
//         if (key === 'searchText' as any) {
//           this.searchText = this.diacriticSensitiveRegex(this.searchText)
//           condition = {
//             $or: [
//               { 'description': { $regex: this.searchText as any, $options: 'i' } },
//               { 'sequence': { $regex: this.searchText as any, $options: 'i' } },
//               { 'status': { $regex: this.searchText as any, $options: 'i' } },
//               { 'type': { $regex: this.searchText as any, $options: 'i' } },
//               { 'person': { $in: this.person || [] } }
//             ]
//           }
//           filters.$and.push(condition)
//         } else {
//           if (key === 'dueDateGreaterThan' && value) {
//             rangeDueDate['$gte'] = new Date(value)
//             filters.$and.push(condition)
//           } else if (key === 'dueDateLessThan' && value) {
//             rangeDueDate['$lte'] = new Date(value)
//             filters.$and.push(condition)
//           } else if (key === 'movimentDateGreaterThan' && value) {
//             rangeMovimentDate['$gte'] = new Date(value)
//             filters.$and.push(condition)
//           } else if (key === 'movimentDateLessThan' && value) {
//             rangeMovimentDate['$lte'] = new Date(value)
//             filters.$and.push(condition)
//           } else {
//             if (!Array.isArray(value)) {
//               condition[key] = value
//             } else {
//               condition[key] = { $in: value }
//             }
//             filters.$and.push(condition)
//           }
//         }
//       }
//     })
//     if (Utils.isNotEmpty(rangeDueDate.$gte) || Utils.isNotEmpty(rangeDueDate.$lte)) {
//       filters.$and.push({ dueDate: rangeDueDate })
//     }
//     if (Utils.isNotEmpty(rangeMovimentDate.$gte) || Utils.isNotEmpty(rangeMovimentDate.$lte)) {
//       filters.$and.push({ movimentDate: rangeMovimentDate })
//     }
//     if (filters.$and.length === 0)
//       delete filters['$and']
//     this.filters = filters
//   }
// }
class GrateSearch extends c2_mongoose_1.SearchFlow {
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
                    { 'description': { $regex: regex } },
                    { 'sequence': { $regex: regex } },
                    { 'status': { $regex: regex } },
                    { 'type': { $regex: regex } },
                ]
            };
            filters.$and.push(condition);
        }
        if (filters.$and.length === 0)
            delete filters['$and'];
        this.filters = filters;
    }
}
exports.GrateSearch = GrateSearch;
const GrateRepository = mongoose.model('grate', Grate);
exports.GrateRepository = GrateRepository;
