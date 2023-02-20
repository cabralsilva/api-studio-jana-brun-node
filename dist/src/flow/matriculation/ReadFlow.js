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
const Matriculation_1 = require("../../model/schema/Matriculation");
const StringUtils_1 = require("../../utils/StringUtils");
const Utils_1 = require("../../utils/Utils");
const AdjustGrateItemFlowItem_1 = require("./item/AdjustGrateItemFlowItem");
const EnrichFindFlowItem_1 = require("./item/EnrichFindFlowItem");
const FindMatriculationBySearchFlowItem_1 = require("./item/FindMatriculationBySearchFlowItem");
const GetByIdFlowItem_1 = require("./item/GetByIdFlowItem");
const PrepareSearchPersonFlowItem_1 = require("./item/PrepareSearchPersonFlowItem");
class ReadFlow extends FlowHttp_1.default {
    read(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Utils_1.default.isNotEmpty((_a = req.params) === null || _a === void 0 ? void 0 : _a.id)) {
                    const matriculation = yield GetByIdFlowItem_1.default.get(req.params.id, [
                        {
                            path: 'student',
                            populate: {
                                path: 'responsible',
                                populate: {
                                    path: 'address',
                                    populate: {
                                        path: 'city',
                                        populate: {
                                            path: 'state'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            path: 'student',
                            populate: {
                                path: 'person'
                            }
                        },
                        {
                            path: 'clazzesSkus',
                            populate: {
                                path: 'clazz'
                            }
                        },
                        {
                            path: 'clazzesSkus',
                            populate: {
                                path: 'product',
                                populate: {
                                    path: 'grates'
                                }
                            }
                        },
                        {
                            path: 'paymentConditionClasses'
                        },
                        {
                            path: 'paymentConditionExtra'
                        },
                        {
                            path: 'extraSkus',
                            populate: {
                                path: 'product',
                                populate: {
                                    path: 'grates'
                                }
                            }
                        }
                    ]);
                    if (Utils_1.default.isEmpty(matriculation)) {
                        throw new HttpError_1.default(HttpStatus.NOT_FOUND, StringUtils_1.default.message("message.registerNotFounded"));
                    }
                    matriculation._doc.clazzesSkus.forEach((classSku, index) => {
                        let newArrayGrateItems = AdjustGrateItemFlowItem_1.default.adjust(classSku);
                        matriculation._doc.clazzesSkus[index]._doc.grateItemList = newArrayGrateItems;
                    });
                    matriculation._doc.extraSkus.forEach((extraSku, index) => {
                        let newArrayGrateItems = AdjustGrateItemFlowItem_1.default.adjust(extraSku);
                        matriculation._doc.extraSkus[index]._doc.grateItemList = newArrayGrateItems;
                    });
                    return matriculation;
                }
                yield PrepareSearchPersonFlowItem_1.default.prepare(req);
                var resultSearch = yield FindMatriculationBySearchFlowItem_1.default.find(new Matriculation_1.MatriculationSearch(req.query));
                return EnrichFindFlowItem_1.default.enrich(resultSearch);
            }
            catch (error) {
                this.processError(error);
            }
        });
    }
}
exports.default = new ReadFlow;
