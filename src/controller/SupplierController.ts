import { OK } from 'http-status'
import CreateFlow from '../flow/supplier/CreateFlow'
import DeleteFlow from '../flow/supplier/DeleteFlow'
import ReadFlow from '../flow/supplier/ReadFlow'
import UpdateFlow from '../flow/supplier/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class SupplierController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(supplier => ResponseHttp.sendResponse(res, OK, supplier))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(supplier => ResponseHttp.sendResponse(res, OK, supplier))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(supplier => ResponseHttp.sendResponse(res, OK, supplier))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(supplier => ResponseHttp.sendResponse(res, OK, supplier))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(supplier => ResponseHttp.sendResponse(res, OK, supplier))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new SupplierController()