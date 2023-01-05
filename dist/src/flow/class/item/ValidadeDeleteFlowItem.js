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
const HttpStatus = require("http-status");
const HttpError_1 = require("../../../model/HttpError");
const StringUtils_1 = require("../../../utils/StringUtils");
const Utils_1 = require("../../../utils/Utils");
class ValidateDeleteFlowItem {
    validate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var occurences = [];
            // const search = { clazz: id }
            // var searchProducts = await FindBySearchProductFlowItem.find(new ProductSearch(search))
            // if (searchProducts.items.length > 0) {
            //   occurences = AddOccurrenceOnDeleteFlowItem.add(occurences, StringUtils.message("message.product"), searchProducts.items, "description")
            // }
            if (Utils_1.default.isNotEmpty(occurences)) {
                throw new HttpError_1.default(HttpStatus.PRECONDITION_FAILED, StringUtils_1.default.message("message.deleteNotAllowed"), occurences);
            }
        });
    }
}
exports.default = new ValidateDeleteFlowItem;
