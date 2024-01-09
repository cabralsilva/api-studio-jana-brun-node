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
const Person_1 = require("../../../../model/schema/Person");
const Utils_1 = __importDefault(require("../../../../utils/Utils"));
const FindBySearchFlowItem_1 = __importDefault(require("../../../person/item/FindBySearchFlowItem"));
class PrepareSearchPersonFlowItem {
    prepare(req) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Utils_1.default.isNotEmpty(req.query.searchText)) {
                const people = yield FindBySearchFlowItem_1.default.find(new Person_1.PersonSearch({ searchText: req.query.searchText }));
                req.query.person = '';
                people.items.forEach((element) => {
                    req.query.person += `${element._id} `;
                });
            }
        });
    }
}
exports.default = new PrepareSearchPersonFlowItem;
