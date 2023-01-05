import { OK } from 'http-status'
import CreateFlow from '../flow/city/CreateFlow'
import DeleteFlow from '../flow/city/DeleteFlow'
import ReadFlow from '../flow/city/ReadFlow'
import UpdateFlow from '../flow/city/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class CityController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(city => ResponseHttp.sendResponse(res, OK, city))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(city => ResponseHttp.sendResponse(res, OK, city))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(city => ResponseHttp.sendResponse(res, OK, city))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(city => ResponseHttp.sendResponse(res, OK, city))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(city => ResponseHttp.sendResponse(res, OK, city))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new CityController()