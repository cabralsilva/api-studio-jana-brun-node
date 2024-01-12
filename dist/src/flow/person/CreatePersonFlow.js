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
const c2_mongoose_1 = require("c2-mongoose");
const http_status_1 = require("http-status");
const mongoose_1 = __importDefault(require("mongoose"));
const Database_1 = __importDefault(require("../../config/Database"));
const Http_1 = require("../../config/Http");
const i18n_1 = require("../../config/i18n");
const IPerson_1 = require("../../model/schema/IPerson");
class CreatePersonFlow extends Http_1.Http {
    constructor() {
        super(...arguments);
        this.crudPerson = new c2_mongoose_1.C2Flow(IPerson_1.PersonRepository);
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                const payload = Object.assign({}, request.body);
                const personAfter = yield this.crudPerson.create(payload, { session });
                yield session.commitTransaction();
                return [http_status_1.OK, Object.assign({ message: (0, i18n_1.getMessage)("message.registerCreatedSuccess") }, personAfter)];
            }
            catch (error) {
                yield session.abortTransaction();
                const errorAux = Database_1.default.convertErrorToHttpError(error);
                this.tryError(errorAux);
            }
            finally {
                yield session.endSession();
            }
        });
    }
}
exports.default = new CreatePersonFlow;
