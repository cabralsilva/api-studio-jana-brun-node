import { Request, Response } from 'express'
import { CrudController } from './CrudController'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import SearchCustomerFlow from '../flow/customer/SearchCustomerFlow'

class CustomerController extends CrudController {

  constructor() {
    super({
      relativePath: "/customer",
    })
  }

  async search(request: Request, response: Response): Promise<[number, any]> {
    return await SearchCustomerFlow.search(request, response)
  }
  
  getById(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    throw new Error('Method not implemented.')
  }
  create(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    throw new Error('Method not implemented.')
  }
  update(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    throw new Error('Method not implemented.')
  }
  delete(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    throw new Error('Method not implemented.')
  }
}

export default new CustomerController()