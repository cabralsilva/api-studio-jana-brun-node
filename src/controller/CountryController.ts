import { OK } from 'http-status'
import CreateFlow from '../flow/country/CreateFlow'
import DeleteFlow from '../flow/country/DeleteFlow'
import ReadFlow from '../flow/country/ReadFlow'
import UpdateFlow from '../flow/country/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class Controller {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(country => ResponseHttp.sendResponse(res, OK, country))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(country => ResponseHttp.sendResponse(res, OK, country))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(country => ResponseHttp.sendResponse(res, OK, country))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(country => ResponseHttp.sendResponse(res, OK, country))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(country => ResponseHttp.sendResponse(res, OK, country))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new Controller()