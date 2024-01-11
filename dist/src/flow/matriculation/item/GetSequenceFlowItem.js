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
const IMatriculation_1 = require("../../../model/schema/IMatriculation");
const StringUtils_1 = __importDefault(require("../../../utils/StringUtils"));
class GetSequenceFlowItem {
    get(offset = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            var sequence = StringUtils_1.default.padToLeft("0", 6, 1);
            var count = yield new IMatriculation_1.MatriculationSearchOLD({
                orderBy: "created_at",
                order: "desc",
                page: 1,
                limit: 1
            }).count(IMatriculation_1.MatriculationRepository);
            sequence = StringUtils_1.default.padToLeft("0", 6, (Number(count) + 1 + offset));
            return sequence;
        });
    }
}
exports.default = new GetSequenceFlowItem;
