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
const IPayroll_1 = require("../../../model/schema/IPayroll");
const BuildPayrollData_1 = __importDefault(require("./item/BuildPayrollData"));
class PrinterPayrollFlow extends Http_1.Http {
    constructor() {
        super(...arguments);
        this.searcherPayroll = new c2_mongoose_1.CrudFlow(IPayroll_1.PayrollRepository);
    }
    print(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.searcherPayroll.prepareSearch(new IPayroll_1.PayrollSearch({
                    '_id': request.params.payrollId,
                }));
                const responseSearch = yield this.searcherPayroll.find({});
                let html2 = `<table>\
                      <tbody>\
                        <tr>\
                          <td>\
                            {{PAYROLL_DATA}}
                            <br/>\
                          </td>\
                        </tr>\
                      </tbody>\
                  </table>`;
                let html = `<html>\
      <head>\
        <title>Impressão</title>\
        <style>\
        @media print {\
          .quebra-pagina {\
            page-break-after: always;\
          }\
        }\
        .table-main {\
          width: 100%;\
          border: 1px solid #ccc;\
          border-collapse: collapse;\
        }\
        .header {\
        font-weight: bold !important;\
        }\
        .full-width {\
          width: 100%;\
        }\
        .resume{\
          border-top: 1px solid #000;\
        }\
        .details{\
          border-top: 1px solid #000;\
        }\
        </style>\
      </head>\
      <body>\
        {{PAYROLL_DATA}}
      </body>\
    </html>`;
                let headerData = BuildPayrollData_1.default.build(responseSearch.items[0]);
                html = html.replace("{{PAYROLL_DATA}}", headerData);
                return [HttpStatus.OK, html];
            }
            catch (error) {
                const errorAux = Database_1.default.convertErrorToHttpError(error);
                this.tryError(errorAux);
            }
        });
    }
}
exports.default = new PrinterPayrollFlow;
