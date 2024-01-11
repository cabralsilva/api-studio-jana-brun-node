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
const IMatriculation_1 = require("../../../model/schema/IMatriculation");
class FindOneByModelFlowItem {
    findOne(model, sort = undefined, pop = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield IMatriculation_1.MatriculationRepository.findOne(model).populate(pop)
                .sort(sort);
        });
    }
}
exports.default = new FindOneByModelFlowItem;
