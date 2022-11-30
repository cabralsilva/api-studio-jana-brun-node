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
const FlowHttp_1 = require("../../model/FlowHttp");
const HttpError_1 = require("../../model/HttpError");
const Supplier_1 = require("../../model/schema/Supplier");
const StringUtils_1 = require("../../utils/StringUtils");
const Utils_1 = require("../../utils/Utils");
const EnrichFindFlowItem_1 = require("./item/EnrichFindFlowItem");
const FindBySearchFlowItem_1 = require("./item/FindBySearchFlowItem");
const GetByIdFlowItem_1 = require("./item/GetByIdFlowItem");
class ReadFlow extends FlowHttp_1.default {
    read(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Utils_1.default.isNotEmpty((_a = req.params) === null || _a === void 0 ? void 0 : _a.id)) {
                    const supplier = yield GetByIdFlowItem_1.default.get(req.params.id);
                    if (Utils_1.default.isEmpty(supplier)) {
                        throw new HttpError_1.default(HttpStatus.NOT_FOUND, StringUtils_1.default.message("message.registerNotFounded"));
                    }
                    return supplier;
                }
                var resultSearch = yield FindBySearchFlowItem_1.default.find(new Supplier_1.SupplierSearch(req.query));
                return EnrichFindFlowItem_1.default.enrich(resultSearch);
            }
            catch (error) {
                this.processError(error);
            }
        });
    }
}
exports.default = new ReadFlow;
