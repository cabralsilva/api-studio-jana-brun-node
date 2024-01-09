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
const CreateProductFlow_1 = __importDefault(require("../flow/product/CreateProductFlow"));
const DeleteProductFlow_1 = __importDefault(require("../flow/product/DeleteProductFlow"));
const GetProductByIdFlowItem_1 = __importDefault(require("../flow/product/GetProductByIdFlowItem"));
const SearchProductFlow_1 = __importDefault(require("../flow/product/SearchProductFlow"));
const UpdateProductFlow_1 = __importDefault(require("../flow/product/UpdateProductFlow"));
const CrudController_1 = require("./CrudController");
class ProductController extends CrudController_1.CrudController {
    constructor() {
        super({
            relativePath: "/product",
        });
    }
    search(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SearchProductFlow_1.default.search(request, response);
        });
    }
    getById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield GetProductByIdFlowItem_1.default.get(request, response);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CreateProductFlow_1.default.create(request, response);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UpdateProductFlow_1.default.update(request, response);
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DeleteProductFlow_1.default.delete(request, response);
        });
    }
}
exports.default = new ProductController();
