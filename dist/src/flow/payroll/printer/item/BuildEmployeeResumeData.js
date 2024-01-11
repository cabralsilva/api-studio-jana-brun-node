"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __importDefault(require("../../../../utils/Utils"));
class BuildEmployeeResumeData {
    build(employeeDetail) {
        var _a, _b;
        let html = `<table class='printer-ticket'>\
                    <thead class='header'>\
                      <tr>\
                        <th>Resumo</th>\
                      </tr>\
                      <tr>\
                    </thead>\
                    <tbody>\
                      <tr>\
                        <td>\
                          <table class='parent-width'>\
                            <thead class='bolder'>\
                              <tr>\
                                <th class=''>Funcionário</th>\
                                <th class=''>Regular</th>\
                                <th class=''>Variável</th>\
                              </tr>\
                            </thead>\
                            <tbody>\
                              <tr>\
                                <td class='left'>${employeeDetail.employee.name}</td>\
                                <td class='left'>${Utils_1.default.toMoneyBR((_a = employeeDetail.regularValueTotal) !== null && _a !== void 0 ? _a : 0)}</td>\
                                <td class='left'>${Utils_1.default.toMoneyBR((_b = employeeDetail.variableValueTotal) !== null && _b !== void 0 ? _b : 0)}</td>\
                              </tr>\
                            </tbody>\
                          </table>\
                        </td>\
                      </tr>\
                    </tbody>\
                  </table>`;
        return html;
    }
}
exports.default = new BuildEmployeeResumeData;
