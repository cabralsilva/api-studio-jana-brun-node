import { OK } from 'http-status'
import CreateFlow from '../flow/financial/financial/CreateFlow'
import DeleteFlow from '../flow/financial/financial/DeleteFlow'
import ReadFlow from '../flow/financial/financial/ReadFlow'
import UpdateFlow from '../flow/financial/financial/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class FinancialController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(financial => ResponseHttp.sendResponse(res, OK, financial))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(financial => ResponseHttp.sendResponse(res, OK, financial))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(financial => ResponseHttp.sendResponse(res, OK, financial))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(financial => ResponseHttp.sendResponse(res, OK, financial))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(financial => ResponseHttp.sendResponse(res, OK, financial))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new FinancialController()