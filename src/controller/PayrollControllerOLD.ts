import { OK } from 'http-status'
import CreatePayrollFlow from '../flow/payroll_OLD/CreatePayrollFlow'
import DeleteFlow from '../flow/payroll_OLD/DeleteFlow'
import PreProcessPayrollFlow from '../flow/payroll_OLD/PreProcessPayrollFlow'
import ReadFlow from '../flow/payroll_OLD/ReadFlow'
import ResponseHttp from '../model/ResponseHttp'

class PayrollControllerOLD {
  create(req, res) {
    CreatePayrollFlow.create(req, res)
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

export default new PayrollControllerOLD()