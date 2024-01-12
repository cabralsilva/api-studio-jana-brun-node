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
const CreatePersonFlow_1 = __importDefault(require("../flow/person/CreatePersonFlow"));
const DeletePersonFlow_1 = __importDefault(require("../flow/person/DeletePersonFlow"));
const GetPersonByIdFlow_1 = __importDefault(require("../flow/person/GetPersonByIdFlow"));
const SearchPersonFlow_1 = __importDefault(require("../flow/person/SearchPersonFlow"));
const UpdatePersonFlow_1 = __importDefault(require("../flow/person/UpdatePersonFlow"));
const CrudController_1 = require("./CrudController");
class PersonController extends CrudController_1.CrudController {
    constructor() {
        super({
            relativePath: "/person",
        });
    }
    search(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SearchPersonFlow_1.default.search(request, response);
        });
    }
    getById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield GetPersonByIdFlow_1.default.get(request, response);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CreatePersonFlow_1.default.create(request, response);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UpdatePersonFlow_1.default.update(request, response);
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DeletePersonFlow_1.default.delete(request, response);
        });
    }
}
exports.default = new PersonController();
