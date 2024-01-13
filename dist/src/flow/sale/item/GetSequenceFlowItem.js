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
const c2_mongoose_1 = require("c2-mongoose");
const ISale_1 = require("../../../model/schema/ISale");
const StringUtils_1 = __importDefault(require("../../../utils/StringUtils"));
class GetSequenceFlowItem {
    constructor() {
        this.searcherSale = new c2_mongoose_1.CrudFlow(ISale_1.SaleRepository);
    }
    get(offset = 0) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            var sequence = StringUtils_1.default.padToLeft("0", 6, 1);
            this.searcherSale.prepareSearch(new ISale_1.SaleSearch({
                orderBy: "sequence",
                orderSense: "desc",
                limit: 1,
            }));
            const search = yield this.searcherSale.find({});
            const last = search.items[0];
            sequence = StringUtils_1.default.padToLeft("0", 6, (Number((_a = last === null || last === void 0 ? void 0 : last.sequence) !== null && _a !== void 0 ? _a : 0) + 1 + offset));
            return sequence;
        });
    }
}
exports.default = new GetSequenceFlowItem;
