import { CrudFlow } from 'c2-mongoose';
import { Request, Response } from "express";
import * as HttpStatus from 'http-status';
import Database from '../../../config/Database';
import { Http } from '../../../config/Http';
import { IPayroll, PayrollRepository, PayrollSearch } from '../../../model/schema/IPayroll';
import BuildPayrollData from './item/BuildPayrollData';

class PrinterPayrollFlow extends Http {

  private searcherPayroll = new CrudFlow<IPayroll>(PayrollRepository)

  async print(request: Request, response: Response): Promise<[number, any]> {

    try {
      this.searcherPayroll.prepareSearch(new PayrollSearch({
        '_id': request.params.payrollId,
      }))
      const responseSearch = await this.searcherPayroll.find({})

      let html2 =  `<table>\
                      <tbody>\
                        <tr>\
                          <td>\
                            {{PAYROLL_DATA}}
                            <br/>\
                          </td>\
                        </tr>\
                      </tbody>\
                  </table>`


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
    </html>`
      
      let headerData = BuildPayrollData.build(responseSearch.items[0])

      html = html.replace("{{PAYROLL_DATA}}", headerData)
      
      return [HttpStatus.OK, html]
    } catch (error: any) {
      const errorAux = Database.convertErrorToHttpError(error)
      this.tryError(errorAux)
    }
  }
}
export default new PrinterPayrollFlow
