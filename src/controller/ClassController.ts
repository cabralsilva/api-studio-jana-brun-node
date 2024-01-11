import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import CreateClassFlow from '../flow/class/CreateClassFlow'
import DeleteClassFlow from '../flow/class/DeleteClassFlow'
import GetClassByIdFlow from '../flow/class/GetClassByIdFlow'
import SearchClassFlow from '../flow/class/SearchClassFlow'
import UpdateClassFlow from '../flow/class/UpdateClassFlow'
import { CrudController } from './CrudController'
import { HttpDispatchHandling } from './Controller'
import PrinterMatriculatedFlow from '../flow/class/printer-matriculations/PrinterMatriculatedFlow'

class ClassController extends CrudController {
  constructor() {
    super({
      relativePath: "/class",
    })

    this.routers.get(`${this.options.uri}/printer/matriculation/:classId`, this.printerMatriculationsRunner)
  }

  @HttpDispatchHandling
  async printerMatriculationsRunner(request: Request, response: Response): Promise<[number, any]> {
    return await PrinterMatriculatedFlow.get(request, response)
  }

  async search(request: Request, response: Response): Promise<[number, any]> {
    return await SearchClassFlow.search(request, response)
  }
  
  async getById(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await GetClassByIdFlow.get(request, response)
  }
  async create(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await CreateClassFlow.create(request, response)
  }
  async update(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await UpdateClassFlow.update(request, response)
  }
  async delete(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await DeleteClassFlow.delete(request, response)
  }
}

export default new ClassController()