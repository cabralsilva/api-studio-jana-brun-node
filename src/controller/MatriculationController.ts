import { OK } from 'http-status'
import CreateFlow from '../flow/matriculation/CreateFlow'
import DeleteFlow from '../flow/matriculation/DeleteFlow'
import ReadFlow from '../flow/matriculation/ReadFlow'
import UpdateFlow from '../flow/matriculation/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class MatriculationController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(matriculation => ResponseHttp.sendResponse(res, OK, matriculation))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(matriculation => ResponseHttp.sendResponse(res, OK, matriculation))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(matriculation => ResponseHttp.sendResponse(res, OK, matriculation))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(matriculation => ResponseHttp.sendResponse(res, OK, matriculation))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(matriculation => ResponseHttp.sendResponse(res, OK, matriculation))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new MatriculationController()