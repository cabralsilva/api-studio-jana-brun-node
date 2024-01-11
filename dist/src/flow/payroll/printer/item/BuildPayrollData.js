"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const i18n_1 = require("../../../../config/i18n");
const TypeOfPayroll_1 = __importDefault(require("../../../../model/enum/TypeOfPayroll"));
const Utils_1 = __importDefault(require("../../../../utils/Utils"));
class BuildHeaderData {
    build(payroll) {
        var _a, _b, _c;
        let html = "";
        for (const payrollEmployeeDetail of payroll.payrollEmployeeDetails) {
            let htmlAux = `<table class='table-main quebra-pagina'>\
                      <thead class='header'>\
                        <tr>\
                          <th colspan='4'>FOLHA ${payroll.description}</th>\
                        </tr>\
                      </thead>\
                      <tbody>\
                        <tr>\
                          <td colspan="4">\
                            <table class="full-width">\
                              <tr class="header">\
                                <td>Inicio</td>\
                                <td>Fim</td>\
                                <td>Data pagamento</td>\
                              </tr>\
                              <tr>\
                                <td>${(0, moment_1.default)(payroll.initDate).format("DD/MM/YYYY")}</td>\
                                <td>${(0, moment_1.default)(payroll.endDate).format("DD/MM/YYYY")}</td>\
                                <td>${(0, moment_1.default)(payroll.targetDate).format("DD/MM/YYYY")}</td>\
                              </tr>\
                            </table>\
                          </td>\
                        </tr>\
  
                        <tr class="resume">
                          <td colspan="4">
                            <table class="full-width">
                              <tr class="header">
                                <td>Funcionário</td>
                                <td>Pagamento regular</td>
                                <td>Pagamento variável</td>
                                <td>Total</td>
                              </tr>
                              <tr>
                                <td>${payrollEmployeeDetail.employee.name}</td>\
                                <td>${Utils_1.default.toMoneyBR((_a = payrollEmployeeDetail.regularValueTotal) !== null && _a !== void 0 ? _a : 0)}</td>\
                                <td>${Utils_1.default.toMoneyBR((_b = payrollEmployeeDetail.variableValueTotal) !== null && _b !== void 0 ? _b : 0)}</td>\
                                <td>${Utils_1.default.toMoneyBR((_c = payrollEmployeeDetail.total) !== null && _c !== void 0 ? _c : 0)}</td>\
                              </tr>
                            </table>
                          </td>
                        </tr>
  
                        <tr class="details header">
                          <td>Tipo</td>
                          <td colspan="2">Descrição</td>
                          <td>Total</td>
                        </tr>
                        {{ROWS_PAYMENTS}}\
                      </tbody>\
                    </table>`;
            htmlAux = htmlAux.replace('{{ROWS_PAYMENTS}}', this.buildDetailPayments(payrollEmployeeDetail.payments));
            html += htmlAux;
        }
        return html;
    }
    buildDetailPayments(payments) {
        let rows = ``;
        for (const payment of payments) {
            const row = `<tr>\
                  <td>${(0, i18n_1.getMessage)(`message.enum.typeOfPayroll.${payment.type}`)}</td>\
                  <td colspan='2'>{{DESCRIPTION}}</td>\
                  <td>{{TOTAL}}</td>\
                </tr>`;
            if (payment.type === TypeOfPayroll_1.default.REGULAR) {
                for (const detail of payment.monthly.details) {
                    let rowAux = row;
                    let detailLabel = `${detail.label} | ${detail.quantityOfDays} dias <br />`;
                    rowAux = rowAux.replace('{{DESCRIPTION}}', detailLabel);
                    rowAux = rowAux.replace('{{TOTAL}}', Utils_1.default.toMoneyBR(detail.total));
                    rows += rowAux;
                }
            }
            else {
                for (const paymentClass of payment.classes) {
                    let rowAux = row;
                    if (paymentClass.type === 'BY_PERCENT') {
                        let descriptionPercent = `${paymentClass.clazz.name} | ${paymentClass.percentDetails.quantityOfMatriculation} matrículas | ${paymentClass.percentDetails.percent}`;
                        rowAux = rowAux.replace('{{DESCRIPTION}}', descriptionPercent);
                        rowAux = rowAux.replace('{{TOTAL}}', Utils_1.default.toMoneyBR(paymentClass.total));
                        rows += rowAux;
                    }
                    else {
                        for (const hourly of paymentClass.hoursDetails) {
                            let descriptionByHour = `Turma: ${paymentClass.clazz.name} | Data: ${(0, moment_1.default)(hourly.day).format("DD/MM/YYYY")} | Total de horas: ${hourly.hoursLabel}`;
                            rowAux = rowAux.replace('{{DESCRIPTION}}', descriptionByHour);
                            rowAux = rowAux.replace('{{TOTAL}}', Utils_1.default.toMoneyBR(hourly.total));
                            rows += rowAux;
                        }
                    }
                }
            }
        }
        return rows;
    }
    buildRegularDescription(montly) {
        let detailLabel = "";
        for (const detail of montly.details) {
            detailLabel += `${detail.label} | ${detail.quantityOfDays} dias <br />`;
        }
        return detailLabel;
    }
}
exports.default = new BuildHeaderData;
