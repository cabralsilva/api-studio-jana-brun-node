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
Object.defineProperty(exports, "__esModule", { value: true });
const Matriculation_1 = require("../../../model/schema/Matriculation");
const StringUtils_1 = require("../../../utils/StringUtils");
class GetSequenceFlowItem {
    get(offset = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            var sequence = StringUtils_1.default.padToLeft("0", 6, 1);
            var count = yield new Matriculation_1.MatriculationSearch({
                orderBy: "created_at",
                order: "desc",
                page: 1,
                limit: 1
            }).count(Matriculation_1.MatriculationRepository);
            sequence = StringUtils_1.default.padToLeft("0", 6, (Number(count) + 1 + offset));
            return sequence;
        });
    }
}
exports.default = new GetSequenceFlowItem;
