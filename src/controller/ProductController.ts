import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import CreateProductFlow from '../flow/product/CreateProductFlow'
import DeleteProductFlow from '../flow/product/DeleteProductFlow'
import GetProductByIdFlowItem from '../flow/product/GetProductByIdFlowItem'
import SearchProductFlow from '../flow/product/SearchProductFlow'
import UpdateProductFlow from '../flow/product/UpdateProductFlow'
import { CrudController } from './CrudController'

class ProductController extends CrudController {
  constructor() {
    super({
      relativePath: "/product",
    })
  }

  async search(request: Request, response: Response): Promise<[number, any]> {
    return await SearchProductFlow.search(request, response)
  }
  
  async getById(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await GetProductByIdFlowItem.get(request, response)
  }
  async create(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await CreateProductFlow.create(request, response)
  }
  async update(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await UpdateProductFlow.update(request, response)
  }
  async delete(request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>): Promise<[number, any]> {
    return await DeleteProductFlow.delete(request, response)
  }
}

export default new ProductController()