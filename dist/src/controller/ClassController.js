"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const CreateClassFlow_1 = __importDefault(require("../flow/class/CreateClassFlow"));
const DeleteClassFlow_1 = __importDefault(require("../flow/class/DeleteClassFlow"));
const GetClassByIdFlow_1 = __importDefault(require("../flow/class/GetClassByIdFlow"));
const SearchClassFlow_1 = __importDefault(require("../flow/class/SearchClassFlow"));
const UpdateClassFlow_1 = __importDefault(require("../flow/class/UpdateClassFlow"));
const CrudController_1 = require("./CrudController");
const Controller_1 = require("./Controller");
const PrinterMatriculatedFlow_1 = __importDefault(require("../flow/class/printer-matriculations/PrinterMatriculatedFlow"));
class ClassController extends CrudController_1.CrudController {
    constructor() {
        super({
            relativePath: "/class",
        });
        this.routers.get(`${this.options.uri}/printer/matriculation/:classId`, this.printerMatriculationsRunner);
    }
    printerMatriculationsRunner(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PrinterMatriculatedFlow_1.default.get(request, response);
        });
    }
    search(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SearchClassFlow_1.default.search(request, response);
        });
    }
    getById(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield GetClassByIdFlow_1.default.get(request, response);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CreateClassFlow_1.default.create(request, response);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UpdateClassFlow_1.default.update(request, response);
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DeleteClassFlow_1.default.delete(request, response);
        });
    }
}
__decorate([
    Controller_1.HttpDispatchHandling
], ClassController.prototype, "printerMatriculationsRunner", null);
exports.default = new ClassController();
