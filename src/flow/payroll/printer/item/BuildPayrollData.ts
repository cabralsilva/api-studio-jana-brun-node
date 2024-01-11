import moment from "moment"
import { getMessage } from "../../../../config/i18n"
import TypeOfPayroll from "../../../../model/enum/TypeOfPayroll"
import { IEmployeePayment, IPaymentMonthly, IPayroll } from "../../../../model/schema/IPayroll"
import Utils from "../../../../utils/Utils"

class BuildHeaderData {
  build(payroll: IPayroll): string {
    let html = `<table class='table-main quebra-pagina'>\
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
                              <td>${moment(payroll.initDate).format("DD/MM/YYYY")}</td>\
                              <td>${moment(payroll.endDate).format("DD/MM/YYYY")}</td>\
                              <td>${moment(payroll.targetDate).format("DD/MM/YYYY")}</td>\
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
                              <td>${payroll.payrollEmployeeDetails[0].employee.name}</td>\
                              <td>${Utils.toMoneyBR(payroll.payrollEmployeeDetails[0].regularValueTotal ?? 0)}</td>\
                              <td>${Utils.toMoneyBR(payroll.payrollEmployeeDetails[0].variableValueTotal ?? 0)}</td>\
                              <td>${Utils.toMoneyBR(payroll.payrollEmployeeDetails[0].total ?? 0)}</td>\
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
                  </table>`
    html = html.replace('{{ROWS_PAYMENTS}}', this.buildDetailPayments(payroll.payrollEmployeeDetails[0].payments))
    return html
  }

  buildDetailPayments(payments: IEmployeePayment[]): string {
    let rows = ``
    for (const payment of payments) {
      const row = `<tr>\
                  <td>${getMessage(`message.enum.typeOfPayroll.${payment.type}`)}</td>\
                  <td colspan='2'>{{DESCRIPTION}}</td>\
                  <td>{{TOTAL}}</td>\
                </tr>`

      if (payment.type === TypeOfPayroll.REGULAR) {
        let rowAux = row
        rowAux = rowAux.replace('{{DESCRIPTION}}', this.buildRegularDescription(payment.monthly))
        rowAux = rowAux.replace('{{TOTAL}}', Utils.toMoneyBR(payment.monthly.total))
        rows += rowAux
      } else {
        for (const paymentClass of payment.classes) {
          let rowAux = row
          if (paymentClass.type === 'BY_PERCENT') {
            let descriptionPercent = `${paymentClass.clazz.name} | ${paymentClass.percentDetails.quantityOfMatriculation} matrículas | ${paymentClass.percentDetails.percent}`
            rowAux = rowAux.replace('{{DESCRIPTION}}', descriptionPercent)
            rowAux = rowAux.replace('{{TOTAL}}', Utils.toMoneyBR(paymentClass.total))
            rows += rowAux
          } else {
            for (const hourly of paymentClass.hoursDetails) {
              let descriptionByHour = `Turma: ${paymentClass.clazz.name} | Data: ${moment(hourly.day).format("DD/MM/YYYY")} | Total de horas: ${hourly.hoursLabel}`
              rowAux = rowAux.replace('{{DESCRIPTION}}', descriptionByHour)
              rowAux = rowAux.replace('{{TOTAL}}', Utils.toMoneyBR(hourly.total))
              rows += rowAux
            }
          }
        }
      }

      
    }
    return rows
  }

  buildRegularDescription(montly: IPaymentMonthly) {
    let detailLabel = ""

    for (const detail of montly.details) {
      detailLabel += `${detail.label} | ${detail.quantityOfDays} dias <br />`
    }

    return detailLabel
  }
}
export default new BuildHeaderData