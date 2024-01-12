import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import CreatePayrollFlow from '../flow/payroll/CreatePayrollFlow'
import DeletePayrollFlow from '../flow/payroll/DeletePayrollFlow'
import GetPayrollByIdFlow from '../flow/payroll/GetPayrollByIdFlow'
import SearchPayrollFlow from '../flow/payroll/SearchPayrollFlow'
import UpdatePayrollFlow from '../flow/payroll/UpdatePayrollFlow'
import { CrudController } from './CrudController'
import { Controller, HttpDispatchHandling } from './Controller'
import PrinterMatriculatedFlow from '../flow/class/printer-matriculations/PrinterMatriculatedFlow'
import PreProcessPayrollFlow from '../flow/payroll/PreProcessPayrollFlow'
import PrinterPayrollFlow from '../flow/payroll/printer/PrinterPayrollFlow'
import SearchMatriculationFlow from '../flow/matriculation/SearchMatriculationFlow'

class PayrollController extends Controller {
  constructor() {
    super({
      relativePath: "/matriculation",
    })

    this.routers.get(`${this.options.uri}`, this.searcherRunner)
  }

  @HttpDispatchHandling
  async searcherRunner(request: Request, response: Response): Promise<[number, any]> {
    return await SearchMatriculationFlow.search(request, response)
  }
}

export default new PayrollController()