import { OK } from 'http-status'
import CreateFlow from '../flow/payroll/CreateFlow'
import DeleteFlow from '../flow/payroll/DeleteFlow'
import PreProcessPayrollFlow from '../flow/payroll/PreProcessPayrollFlow'
import ReadFlow from '../flow/payroll/ReadFlow'
import UpdateFlow from '../flow/payroll/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class PayrollController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(payroll => ResponseHttp.sendResponse(res, OK, payroll))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(payroll => ResponseHttp.sendResponse(res, OK, payroll))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(payroll => ResponseHttp.sendResponse(res, OK, payroll))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(payroll => ResponseHttp.sendResponse(res, OK, payroll))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(payroll => ResponseHttp.sendResponse(res, OK, payroll))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  preProcess(req, res) {
    PreProcessPayrollFlow.preProcess(req, res)
      .then(payroll => ResponseHttp.sendResponse(res, OK, payroll))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new PayrollController()