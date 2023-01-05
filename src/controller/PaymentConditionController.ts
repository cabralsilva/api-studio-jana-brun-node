import { OK } from 'http-status'
import CreateFlow from '../flow/financial/paymentCondition/CreateFlow'
import DeleteFlow from '../flow/financial/paymentCondition/DeleteFlow'
import ReadFlow from '../flow/financial/paymentCondition/ReadFlow'
import UpdateFlow from '../flow/financial/paymentCondition/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class PaymentConditionController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(paymentCondition => ResponseHttp.sendResponse(res, OK, paymentCondition))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(paymentCondition => ResponseHttp.sendResponse(res, OK, paymentCondition))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(paymentCondition => ResponseHttp.sendResponse(res, OK, paymentCondition))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(paymentCondition => ResponseHttp.sendResponse(res, OK, paymentCondition))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(paymentCondition => ResponseHttp.sendResponse(res, OK, paymentCondition))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new PaymentConditionController()