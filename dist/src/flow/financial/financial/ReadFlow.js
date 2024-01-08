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
const FlowHttp_1 = require("../../../model/FlowHttp");
const HttpError_1 = require("../../../model/HttpError");
const Financial_1 = require("../../../model/schema/Financial");
const StringUtils_1 = require("../../../utils/StringUtils");
const Utils_1 = require("../../../utils/Utils");
const GetByIdFlowItem_1 = require("./item/GetByIdFlowItem");
const c2_mongoose_1 = require("c2-mongoose");
class ReadFlow extends FlowHttp_1.default {
    constructor() {
        super(...arguments);
        this.searcherFinancial = new c2_mongoose_1.CrudFlow(Financial_1.FinancialRepository);
    }
    read(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Utils_1.default.isNotEmpty((_a = req.params) === null || _a === void 0 ? void 0 : _a.id)) {
                    const financial = yield GetByIdFlowItem_1.default.get(req.params.id);
                    if (Utils_1.default.isEmpty(financial)) {
                        throw new HttpError_1.default(HttpStatus.NOT_FOUND, StringUtils_1.default.message("message.registerNotFounded"));
                    }
                    return financial;
                }
                const searcher = new Financial_1.FinancialSearch(Object.assign({}, req.query));
                // await PrepareSearchPersonFlowItem.prepare(req)
                // var resultSearch = await FindBySearchFlowItem.find(new FinancialSearchOLD(req.query)) as any
                // return EnrichFindFlowItem.enrich(resultSearch)
                this.searcherFinancial.prepareSearch(searcher);
                const ret = yield this.searcherFinancial.find({
                    metadata: [{
                            id: "metadata-totalizers",
                            conditions: [
                                {
                                    $match: searcher.filters
                                },
                                {
                                    $group: {
                                        _id: "$type",
                                        total: { $sum: '$value' },
                                    }
                                }
                            ]
                        }]
                });
                return ret;
            }
            catch (error) {
                console.log(error);
                this.processError(error);
            }
        });
    }
}
exports.default = new ReadFlow;
