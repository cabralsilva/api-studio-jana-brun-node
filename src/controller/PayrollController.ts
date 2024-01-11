import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import CreatePayrollFlow from '../flow/payroll/CreatePayrollFlow'
import DeletePayrollFlow from '../flow/payroll/DeletePayrollFlow'
import GetPayrollByIdFlow from '../flow/payroll/GetPayrollByIdFlow'
import SearchPayrollFlow from '../flow/payroll/SearchPayrollFlow'
import UpdatePayrollFlow from '../flow/payroll/UpdatePayrollFlow'
import { CrudController } from './CrudController'
import { HttpDispatchHandling } from './Controller'
import PrinterMatriculatedFlow from '../flow/class/printer-matriculations/PrinterMatriculatedFlow'
import PreProcessPayrollFlow from '../flow/payroll/PreProcessPayrollFlow'
import PrinterPayrollFlow from '../flow/payroll/printer/PrinterPayrollFlow'

class PayrollController extends CrudController {
  constructor() {
    super({
      relativePath: "/payroll",
    })

    this.routers.get(`${this.options.uri}/printer/:payrollId`, this.printerMatriculationsRunner)
    this.routers.post(`${this.options.uri}/pre-process`, this.preProcessRunner)
  }

  @HttpDispatchHandling
  async preProcessRunner(request: Request, response: Response): Promise<[number, any]> {
    return await PreProcessPayrollFlow.preProcess(request, response)
  }

  @HttpDispatchHandling
  async printerMatriculationsRunner(request: Request, response: Response): Promise<[number, any]> {
    return await PrinterPayrollFlow.print(request, response)
  }

  async search(request: Request, response: Response): Promise<[number, any]> {
    return await SearchPayrollFlow.search(request, response)
  }
  
  async getById(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await GetPayrollByIdFlow.get(request, response)
  }
  async create(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await CreatePayrollFlow.create(request, response)
  }
  async update(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await UpdatePayrollFlow.update(request, response)
  }
  async delete(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await DeletePayrollFlow.delete(request, response)
  }
}

export default new PayrollController()