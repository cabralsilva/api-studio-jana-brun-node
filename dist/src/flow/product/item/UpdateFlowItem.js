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
const IProduct_1 = require("../../../model/schema/IProduct");
const StringUtils_1 = __importDefault(require("../../../utils/StringUtils"));
const Utils_1 = __importDefault(require("../../../utils/Utils"));
class UpdateFlowItem {
    update(id, product, session = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            const productAfter = yield IProduct_1.ProductRepository.findByIdAndUpdate(id, { $set: product }, { returnDocument: 'after', session });
            if (Utils_1.default.isEmpty(productAfter)) {
                throw Error(StringUtils_1.default.message("message.registerNotFounded"));
            }
            return productAfter;
        });
    }
}
exports.default = new UpdateFlowItem;
