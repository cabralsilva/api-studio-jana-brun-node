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
class CreateFlowItem {
    create(matriculation, session = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Matriculation_1.MatriculationRepository.create([matriculation], { session });
        });
    }
}
exports.default = new CreateFlowItem;