"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const HttpStatus = __importStar(require("http-status"));
const FlowHttp_1 = __importDefault(require("../../model/FlowHttp"));
const HttpError_1 = __importDefault(require("../../model/HttpError"));
const IMatriculation_1 = require("../../model/schema/IMatriculation");
const i18n_1 = require("../../config/i18n");
const Utils_1 = __importDefault(require("../../utils/Utils"));
const AdjustGrateItemFlowItem_1 = __importDefault(require("./item/AdjustGrateItemFlowItem"));
const EnrichFindFlowItem_1 = __importDefault(require("./item/EnrichFindFlowItem"));
const FindMatriculationBySearchFlowItem_1 = __importDefault(require("./item/FindMatriculationBySearchFlowItem"));
const GetByIdFlowItem_1 = __importDefault(require("./item/GetByIdFlowItem"));
const PrepareSearchPersonFlowItem_1 = __importDefault(require("./item/PrepareSearchPersonFlowItem"));
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
                        throw new HttpError_1.default(HttpStatus.NOT_FOUND, (0, i18n_1.getMessage)("message.registerNotFounded"));
                    }
                    matriculation._doc.clazzesSkus.forEach((classSku, index) => {
                        let newArrayGrateItems = AdjustGrateItemFlowItem_1.default.adjust(classSku);
                        matriculation._doc.clazzesSkus[index]._doc.gratesItems = newArrayGrateItems;
                    });
                    matriculation._doc.extraSkus.forEach((extraSku, index) => {
                        let newArrayGrateItems = AdjustGrateItemFlowItem_1.default.adjust(extraSku);
                        matriculation._doc.extraSkus[index]._doc.gratesItems = newArrayGrateItems;
                    });
                    return matriculation;
                }
                yield PrepareSearchPersonFlowItem_1.default.prepare(req);
                var resultSearch = yield FindMatriculationBySearchFlowItem_1.default.find(new IMatriculation_1.MatriculationSearchOLD(req.query));
                return EnrichFindFlowItem_1.default.enrich(resultSearch);
            }
            catch (error) {
                this.processError(error);
            }
        });
    }
}
exports.default = new ReadFlow;
