import { OK } from 'http-status'
import CreateFlow from '../flow/class_OLD/CreateFlow'
import DeleteFlow from '../flow/class_OLD/DeleteFlow'
import ReadFlow from '../flow/class_OLD/ReadFlow'
import UpdateFlow from '../flow/class_OLD/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class ClassControllerOLD {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(clazz => ResponseHttp.sendResponse(res, OK, clazz))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(clazz => ResponseHttp.sendResponse(res, OK, clazz))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(clazz => ResponseHttp.sendResponse(res, OK, clazz))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(clazz => ResponseHttp.sendResponse(res, OK, clazz))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(clazz => ResponseHttp.sendResponse(res, OK, clazz))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new ClassControllerOLD()