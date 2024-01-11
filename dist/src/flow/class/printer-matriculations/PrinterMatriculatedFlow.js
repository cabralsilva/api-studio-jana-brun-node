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
const HttpStatus = __importStar(require("http-status"));
const Database_1 = __importDefault(require("../../../config/Database"));
const Http_1 = require("../../../config/Http");
const IMatriculation_1 = require("../../../model/schema/IMatriculation");
const BuildStudentData_1 = __importDefault(require("./item/BuildStudentData"));
class PrinterMatriculatedFlow extends Http_1.Http {
    constructor() {
        super(...arguments);
        this.searcherMatriculation = new c2_mongoose_1.CrudFlow(IMatriculation_1.MatriculationRepository);
        this.get = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.searcherMatriculation.prepareSearch(new IMatriculation_1.MatriculationSearch({
                    'clazzesSkus.clazz': request.params.classId,
                    populate: ['student', 'student.person'],
                    pageable: false,
                }));
                const responseSearch = yield this.searcherMatriculation.find({});
                let html = `<table>\
                      <tbody>\
                        <tr>\
                          <td>\
                            {{STUDENT_DATA}}
                            <br/>\
                          </td>\
                        </tr>\
                      </tbody>\
                  </table>`;
                let studentData = BuildStudentData_1.default.build(responseSearch.items);
                html = html.replace("{{STUDENT_DATA}}", studentData);
                return [HttpStatus.OK, html];
            }
            catch (error) {
                const errorAux = Database_1.default.convertErrorToHttpError(error);
                this.tryError(errorAux);
            }
        });
    }
}
exports.default = new PrinterMatriculatedFlow;
