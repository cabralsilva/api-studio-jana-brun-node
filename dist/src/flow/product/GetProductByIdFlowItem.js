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
const c2_mongoose_1 = require("c2-mongoose");
const Utils_1 = require("c2-mongoose/dist/utils/Utils");
const HttpStatus = __importStar(require("http-status"));
const Database_1 = __importDefault(require("../../config/Database"));
const Http_1 = require("../../config/Http");
const i18n_1 = require("../../config/i18n");
const HttpError_1 = __importDefault(require("../../model/HttpError"));
const IProduct_1 = require("../../model/schema/IProduct");
class GetProductByIdFlowItem extends Http_1.Http {
    constructor() {
        // async read(req, res) {
        //   try {
        //     if (Utils.isNotEmpty(req.params?.id)) {
        //       const product = await GetByIdFlowItem.get(
        //         req.params.id, {
        //         path: 'grates',
        //         model: 'grate'
        //       });
        //       if (Utils.isEmpty(product)) {
        //         throw new HttpError(HttpStatus.NOT_FOUND, StringUtils.message("message.registerNotFounded"))
        //       }
        //       return product
        //     }
        super(...arguments);
        //     var resultSearch = await FindBySearchFlowItem.find(new ProductSearch(req.query)) as any
        //     return EnrichFindFlowItem.enrich(resultSearch)
        //   } catch (error) {
        //     this.processError(error)
        //   }
        // }
        this.searcherProduct = new c2_mongoose_1.CrudFlow(IProduct_1.ProductRepository);
        this.get = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const searcher = new IProduct_1.ProductSearch(Object.assign(Object.assign({}, request.query), { _id: request.params.id }));
                this.searcherProduct.prepareSearch(searcher);
                const product = yield this.searcherProduct.getOne({
                    _id: request.params.id
                });
                if ((0, Utils_1.isEmpty)(product)) {
                    throw new HttpError_1.default(HttpStatus.NOT_FOUND, (0, i18n_1.getMessage)("message.registerNotFounded"));
                }
                return [HttpStatus.OK, product];
            }
            catch (error) {
                const errorAux = Database_1.default.convertErrorToHttpError(error);
                this.tryError(errorAux);
            }
        });
    }
}
exports.default = new GetProductByIdFlowItem;
