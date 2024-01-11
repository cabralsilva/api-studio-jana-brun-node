import { IPayrollEmployeeDetail } from "../../../../model/schema/IPayroll"
import Utils from "../../../../utils/Utils"

class BuildEmployeeResumeData {
  build(employeeDetail: IPayrollEmployeeDetail): string {
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
                                <td class='left'>${Utils.toMoneyBR(employeeDetail.regularValueTotal ?? 0)}</td>\
                                <td class='left'>${Utils.toMoneyBR(employeeDetail.variableValueTotal ?? 0)}</td>\
                              </tr>\
                            </tbody>\
                          </table>\
                        </td>\
                      </tr>\
                    </tbody>\
                  </table>`
    return html
  }
}
export default new BuildEmployeeResumeData
