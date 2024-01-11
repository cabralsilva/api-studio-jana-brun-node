import moment from "moment"
import { IMatriculation } from "../../../../model/schema/IMatriculation"
import { IStudent } from "../../../../model/schema/IStudent"

class BuildStudentData {
  build(matriculations: IMatriculation[]): string {
    let html = `<table class='printer-ticket'>\
                    <thead class='header'>\
                      <tr>\
                        <th>ALUNOS</th>\
                      </tr>\
                      <tr>\
                    </thead>\
                    <tbody>\
                      <tr>\
                        <td>\
                          <table class='parent-width'>\
                            <thead class='bolder'>\
                              <tr>\
                                <th class=''>###</th>\
                                <th class=''>Nome</th>\
                                <th class=''>Data matrícula</th>\
                              </tr>\
                            </thead>\
                            <tbody>`
                            for (var index = 1; index <= matriculations.length; index++) {
                              html += this.buildItem(matriculations[index - 1], index)
                            }
                            html += `</tbody>\
                          </table>\
                        </td>\
                      </tr>\
                    </tbody>\
                  </table>`
    return html
  }

  buildItem(matriculation: IMatriculation, index: number) {
    var html = `<tr>\
                    <td class='left padding-left-5'>${index}</td>\
                    <td class='left'>${(matriculation.student as IStudent)?.person.name}</td>\
                    <td class='left'>${moment(matriculation.created_at).format("DD/MM/YYYY")}</td>\
                </tr>`
    return html
  }
} export default new BuildStudentData
