import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import CreatePersonFlow from '../flow/person/CreatePersonFlow'
import DeletePersonFlow from '../flow/person/DeletePersonFlow'
import GetPersonByIdFlow from '../flow/person/GetPersonByIdFlow'
import SearchPersonFlow from '../flow/person/SearchPersonFlow'
import UpdatePersonFlow from '../flow/person/UpdatePersonFlow'
import { CrudController } from './CrudController'

class PersonController extends CrudController {
  constructor() {
    super({
      relativePath: "/person",
    })
  }
  
  async search(request: Request, response: Response): Promise<[number, any]> {
    return await SearchPersonFlow.search(request, response)
  }
  
  async getById(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await GetPersonByIdFlow.get(request, response)
  }
  async create(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await CreatePersonFlow.create(request, response)
  }
  async update(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await UpdatePersonFlow.update(request, response)
  }
  async delete(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await DeletePersonFlow.delete(request, response)
  }
}

export default new PersonController()