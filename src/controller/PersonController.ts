import { OK } from 'http-status'
import CreateFlow from '../flow/person/CreateFlow'
import DeleteFlow from '../flow/person/DeleteFlow'
import ReadFlow from '../flow/person/ReadFlow'
import UpdateFlow from '../flow/person/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class PersonController {

  get(req, res) {
    ReadFlow.read(req, res)
      .then(person => ResponseHttp.sendResponse(res, OK, person))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(person => ResponseHttp.sendResponse(res, OK, person))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(person => ResponseHttp.sendResponse(res, OK, person))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(person => ResponseHttp.sendResponse(res, OK, person))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new PersonController()