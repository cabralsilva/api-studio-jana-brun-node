import { OK } from 'http-status'
import CreateFlow from '../flow/employee/CreateFlow'
import DeleteFlow from '../flow/employee/DeleteFlow'
import ReadFlow from '../flow/employee/ReadFlow'
import UpdateFlow from '../flow/employee/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class Controller {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(employee => ResponseHttp.sendResponse(res, OK, employee))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(employee => ResponseHttp.sendResponse(res, OK, employee))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(employee => ResponseHttp.sendResponse(res, OK, employee))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(employee => ResponseHttp.sendResponse(res, OK, employee))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(employee => ResponseHttp.sendResponse(res, OK, employee))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new Controller()