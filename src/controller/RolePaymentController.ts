import { OK } from 'http-status'
import CreateFlow from '../flow/rolePayment/CreateFlow'
import DeleteFlow from '../flow/rolePayment/DeleteFlow'
import ReadFlow from '../flow/rolePayment/ReadFlow'
import UpdateFlow from '../flow/rolePayment/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class RolePaymentController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(rolePayment => ResponseHttp.sendResponse(res, OK, rolePayment))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(rolePayment => ResponseHttp.sendResponse(res, OK, rolePayment))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(rolePayment => ResponseHttp.sendResponse(res, OK, rolePayment))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(rolePayment => ResponseHttp.sendResponse(res, OK, rolePayment))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(rolePayment => ResponseHttp.sendResponse(res, OK, rolePayment))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new RolePaymentController()