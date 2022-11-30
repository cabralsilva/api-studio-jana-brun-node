import { OK } from 'http-status'
import CreateFlow from '../flow/state/CreateFlow'
import DeleteFlow from '../flow/state/DeleteFlow'
import ReadFlow from '../flow/state/ReadFlow'
import UpdateFlow from '../flow/state/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class StateController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(state => ResponseHttp.sendResponse(res, OK, state))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(state => ResponseHttp.sendResponse(res, OK, state))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(state => ResponseHttp.sendResponse(res, OK, state))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(state => ResponseHttp.sendResponse(res, OK, state))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(state => ResponseHttp.sendResponse(res, OK, state))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new StateController()