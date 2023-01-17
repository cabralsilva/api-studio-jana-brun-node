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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FlowHttp_1 = require("../../model/FlowHttp");
const Utils_1 = require("../../utils/Utils");
const CreateFlowItem_1 = require("../person/item/CreateFlowItem");
const CreateFlowItem_2 = require("../student/item/CreateFlowItem");
const CreateFlowItem_3 = require("./item/CreateFlowItem");
const PrepareMatricularionFlowItem_1 = require("./item/PrepareMatricularionFlowItem");
class CreateMatriculationFlow extends FlowHttp_1.default {
    create(req, res) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            try {
                session.startTransaction();
                if (Utils_1.default.isEmpty((_b = (_a = req.body.student) === null || _a === void 0 ? void 0 : _a.person) === null || _b === void 0 ? void 0 : _b._id)) {
                    const person = yield CreateFlowItem_1.default.create(req.body.student.person, session);
                    req.body.student.person = person[0]._id;
                }
                if (Utils_1.default.isEmpty((_d = (_c = req.body.student) === null || _c === void 0 ? void 0 : _c.responsible) === null || _d === void 0 ? void 0 : _d._id)) {
                    const person = yield CreateFlowItem_1.default.create(req.body.student.responsible, session);
                    req.body.student.responsible = person[0]._id;
                }
                if (Utils_1.default.isEmpty((_e = req.body.student) === null || _e === void 0 ? void 0 : _e._id)) {
                    const student = yield CreateFlowItem_2.default.create(req.body.student, session);
                    req.body.student = student[0]._id;
                }
                req.body.effectiveDateTime = null;
                if (req.body.status == "EFFECTIVE") {
                    req.body.effectiveDateTime = new Date();
                }
                let matriculation = yield PrepareMatricularionFlowItem_1.default.prepare(req.body);
                matriculation = yield CreateFlowItem_3.default.create(matriculation, session);
                yield session.commitTransaction();
                return matriculation[0];
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
exports.default = new CreateMatriculationFlow;
