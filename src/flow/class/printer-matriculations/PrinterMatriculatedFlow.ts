import { CrudFlow } from 'c2-mongoose';
import { isEmpty } from 'c2-mongoose/dist/utils/Utils';
import { Request, Response } from "express";
import * as HttpStatus from 'http-status';
import Database from '../../../config/Database';
import { Http } from '../../../config/Http';
import { getMessage } from '../../../config/i18n';
import HttpError from '../../../model/HttpError';
import { IClass, ClassRepository, ClassSearch } from '../../../model/schema/IClass';
import { IMatriculation, MatriculationRepository, MatriculationSearch } from '../../../model/schema/IMatriculation';
import BuildStudentData from './item/BuildStudentData';

class PrinterMatriculatedFlow extends Http {

  private searcherMatriculation = new CrudFlow<IMatriculation>(MatriculationRepository)

  public get = async (request: Request, response: Response): Promise<[number, any]> => {

    try {
      this.searcherMatriculation.prepareSearch(new MatriculationSearch({
        'clazzesSkus.clazz': request.params.classId,
        populate: ['student', 'student.person'],
        pageable: false,
      }))
      const responseSearch = await this.searcherMatriculation.find({})

      let html =  `<table>\
                      <tbody>\
                        <tr>\
                          <td>\
                            {{STUDENT_DATA}}
                            <br/>\
                          </td>\
                        </tr>\
                      </tbody>\
                  </table>`
      
      let studentData = BuildStudentData.build(responseSearch.items)

      html = html.replace("{{STUDENT_DATA}}", studentData)
      
      return [HttpStatus.OK, html]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}
export default new PrinterMatriculatedFlow
