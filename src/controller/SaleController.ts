import CreateSaleFlow from '../flow/sale/CreateSaleFlow'
import DeleteSaleFlow from '../flow/sale/DeleteSaleFlow'
import GetSaleByIdFlowItem from '../flow/sale/GetSaleByIdFlowItem'
import SearchSaleFlow from '../flow/sale/SearchSaleFlow'
import UpdateSaleFlow from '../flow/sale/UpdateSaleFlow'
import { CrudController } from './CrudController'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { HttpDispatchHandling } from './Controller'
import GetProductValueFlow from '../flow/sale/GetProductValueFlow'

class SaleController extends CrudController {
  constructor() {
    super({
      relativePath: "/sale",
    })

    this.routers.post(`${this.options.uri}/price`, this.searchPriceRunner)
  }

  @HttpDispatchHandling
  async searchPriceRunner(request: Request, response: Response): Promise<[number, any]> {
    return await GetProductValueFlow.get(request, response)
  }

  async search(request: Request, response: Response): Promise<[number, any]> {
    return await SearchSaleFlow.search(request, response)
  }
  
  async getById(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await GetSaleByIdFlowItem.get(request, response)
  }
  async create(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await CreateSaleFlow.create(request, response)
  }
  async update(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await UpdateSaleFlow.update(request, response)
  }
  async delete(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await DeleteSaleFlow.delete(request, response)
  }
}

export default new SaleController()