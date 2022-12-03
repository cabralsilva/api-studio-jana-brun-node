import { OK } from 'http-status'
import CreateFlow from '../flow/grate/CreateFlow'
import DeleteFlow from '../flow/grate/DeleteFlow'
import ReadFlow from '../flow/grate/ReadFlow'
import UpdateFlow from '../flow/grate/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class GrateController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(grate => ResponseHttp.sendResponse(res, OK, grate))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(grate => ResponseHttp.sendResponse(res, OK, grate))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(grate => ResponseHttp.sendResponse(res, OK, grate))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(grate => ResponseHttp.sendResponse(res, OK, grate))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(grate => ResponseHttp.sendResponse(res, OK, grate))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new GrateController()