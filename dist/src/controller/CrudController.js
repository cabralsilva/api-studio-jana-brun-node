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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudController = void 0;
const Controller_1 = require("./Controller");
class CrudController extends Controller_1.Controller {
    constructor(options) {
        super(options);
        this.searchRunner = this.searchRunner.bind(this);
        this.getByIdRunner = this.getByIdRunner.bind(this);
        this.createRunner = this.createRunner.bind(this);
        this.updateRunner = this.updateRunner.bind(this);
        this.deleteRunner = this.deleteRunner.bind(this);
        this.routers.get(`${this.options.uri}/:id`, this.getByIdRunner);
        this.routers.get(`${this.options.uri}`, this.searchRunner);
        this.routers.post(`${this.options.uri}`, this.createRunner);
        this.routers.patch(`${this.options.uri}/:id`, this.updateRunner);
        this.routers.delete(`${this.options.uri}/:id`, this.deleteRunner);
    }
    searchRunner(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.search(request, response);
        });
    }
    getByIdRunner(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getById(request, response);
        });
    }
    createRunner(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.create(request, response);
        });
    }
    updateRunner(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.update(request, response);
        });
    }
    deleteRunner(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.delete(request, response);
        });
    }
}
__decorate([
    Controller_1.HttpDispatchHandling
], CrudController.prototype, "searchRunner", null);
__decorate([
    Controller_1.HttpDispatchHandling
], CrudController.prototype, "getByIdRunner", null);
__decorate([
    Controller_1.HttpDispatchHandling
], CrudController.prototype, "createRunner", null);
__decorate([
    Controller_1.HttpDispatchHandling
], CrudController.prototype, "updateRunner", null);
__decorate([
    Controller_1.HttpDispatchHandling
], CrudController.prototype, "deleteRunner", null);
exports.CrudController = CrudController;
