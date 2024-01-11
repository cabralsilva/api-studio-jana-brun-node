"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
class BuildStudentData {
    build(matriculations) {
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
                            <tbody>`;
        for (var index = 1; index <= matriculations.length; index++) {
            html += this.buildItem(matriculations[index - 1], index);
        }
        html += `</tbody>\
                          </table>\
                        </td>\
                      </tr>\
                    </tbody>\
                  </table>`;
        return html;
    }
    buildItem(matriculation, index) {
        var _a;
        var html = `<tr>\
                    <td class='left padding-left-5'>${index}</td>\
                    <td class='left'>${(_a = matriculation.student) === null || _a === void 0 ? void 0 : _a.person.name}</td>\
                    <td class='left'>${(0, moment_1.default)(matriculation.created_at).format("DD/MM/YYYY")}</td>\
                </tr>`;
        return html;
    }
}
exports.default = new BuildStudentData;
