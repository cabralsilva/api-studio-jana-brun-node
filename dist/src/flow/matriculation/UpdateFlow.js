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
const UpdateFlowItem_1 = __importDefault(require("../student/item/UpdateFlowItem"));
const UpdateFlowItem_2 = __importDefault(require("../person/item/UpdateFlowItem"));
const UpdateFlowItem_3 = __importDefault(require("./item/UpdateFlowItem"));
const Utils_1 = __importDefault(require("../../utils/Utils"));
class UpdateFlow extends FlowHttp_1.default {
    update(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                if (Utils_1.default.isNotEmpty((_a = req.body.student) === null || _a === void 0 ? void 0 : _a.person)) {
                    const person = yield UpdateFlowItem_2.default.update(req.body.student.person._id, req.body.student.person, session);
                    req.body.student.person = person._id;
                }
                if (Utils_1.default.isNotEmpty((_b = req.body.student) === null || _b === void 0 ? void 0 : _b.responsible)) {
                    const person = yield UpdateFlowItem_2.default.update(req.body.student.responsible._id, req.body.student.responsible, session);
                    req.body.student.responsible = person._id;
                }
                if (Utils_1.default.isEmpty((_c = req.body.student) === null || _c === void 0 ? void 0 : _c._id)) {
                    if (Utils_1.default.isNotEmpty((_d = req.body.student) === null || _d === void 0 ? void 0 : _d.person)) {
                        const student = yield UpdateFlowItem_1.default.update(req.body.student.person._id, req.body.student, session);
                        req.body.student = student._id;
                    }
                }
                if (req.body.status == "EFFECTIVE") {
                    req.body.effectiveDateTime = new Date();
                }
                yield UpdateFlowItem_3.default.update(req.params.id, req.body, session);
                yield session.commitTransaction();
            }
            catch (error) {
                console.log(error);
                yield session.abortTransaction();
                this.processError(error);
            }
            finally {
                yield session.endSession();
            }
        });
    }
}
exports.default = new UpdateFlow;
