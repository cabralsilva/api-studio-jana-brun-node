"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Supplier_1 = require("../../../model/schema/Supplier");
const i18n_1 = require("../../../config/i18n");
const Utils_1 = __importDefault(require("../../../utils/Utils"));
class UpdateFlowItem {
    update(id, supplier, session = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplierAfter = yield Supplier_1.SupplierRepository.findByIdAndUpdate(id, { $set: supplier }, { returnDocument: 'after', session });
            if (Utils_1.default.isEmpty(supplierAfter)) {
                throw Error((0, i18n_1.getMessage)("message.registerNotFounded"));
            }
            return supplierAfter;
        });
    }
}
exports.default = new UpdateFlowItem;
