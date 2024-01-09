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
const CrudController_1 = require("./CrudController");
const SearchCustomerFlow_1 = __importDefault(require("../flow/customer/SearchCustomerFlow"));
class CustomerController extends CrudController_1.CrudController {
    constructor() {
        super({
            relativePath: "/customer",
        });
    }
    search(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SearchCustomerFlow_1.default.search(request, response);
        });
    }
    getById(request, response) {
        throw new Error('Method not implemented.');
    }
    create(request, response) {
        throw new Error('Method not implemented.');
    }
    update(request, response) {
        throw new Error('Method not implemented.');
    }
    delete(request, response) {
        throw new Error('Method not implemented.');
    }
}
exports.default = new CustomerController();
