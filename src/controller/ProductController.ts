import { OK } from 'http-status'
import CreateFlow from '../flow/product/CreateFlow'
import DeleteFlow from '../flow/product/DeleteFlow'
import ReadFlow from '../flow/product/ReadFlow'
import UpdateFlow from '../flow/product/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class ProductController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(product => ResponseHttp.sendResponse(res, OK, product))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(product => ResponseHttp.sendResponse(res, OK, product))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(product => ResponseHttp.sendResponse(res, OK, product))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(product => ResponseHttp.sendResponse(res, OK, product))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(product => ResponseHttp.sendResponse(res, OK, product))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new ProductController()