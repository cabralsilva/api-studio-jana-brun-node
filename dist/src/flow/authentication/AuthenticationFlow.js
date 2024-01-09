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
const mongoose_1 = __importDefault(require("mongoose"));
const FlowHttp_1 = __importDefault(require("../../model/FlowHttp"));
const AuthenticationFlowItem_1 = __importDefault(require("./item/AuthenticationFlowItem"));
const DecryptCredentialsFlowItem_1 = __importDefault(require("./item/DecryptCredentialsFlowItem"));
const EnrichResponseFlowItem_1 = __importDefault(require("./item/EnrichResponseFlowItem"));
const GenerateJWTFlowItem_1 = __importDefault(require("./item/GenerateJWTFlowItem"));
const GetEmployeeFlowItem_1 = __importDefault(require("./item/GetEmployeeFlowItem"));
class AuthenticationFlow extends FlowHttp_1.default {
    authentication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                const credential = DecryptCredentialsFlowItem_1.default.decrypt(req);
                const employee = yield GetEmployeeFlowItem_1.default.get(credential);
                yield AuthenticationFlowItem_1.default.authenticate(employee, credential.password);
                const access_token = yield GenerateJWTFlowItem_1.default.generate(employee);
                const response = EnrichResponseFlowItem_1.default.enrich({ access_token, employee });
                yield session.commitTransaction();
                return response;
            }
            catch (error) {
                yield session.abortTransaction();
                this.processError(error);
            }
            finally {
                yield session.endSession();
            }
        });
    }
}
exports.default = new AuthenticationFlow;
