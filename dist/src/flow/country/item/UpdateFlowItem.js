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
const Country_1 = require("../../../model/schema/address/Country");
const StringUtils_1 = require("../../../utils/StringUtils");
const Utils_1 = require("../../../utils/Utils");
class UpdateFlowItem {
    update(id, country, session = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            const countryAfter = yield Country_1.CountryRepository.findByIdAndUpdate(id, { $set: country }, { returnDocument: 'after', session });
            if (Utils_1.default.isEmpty(countryAfter)) {
                throw Error(StringUtils_1.default.message("message.registerNotFounded"));
            }
            return countryAfter;
        });
    }
}
exports.default = new UpdateFlowItem;
