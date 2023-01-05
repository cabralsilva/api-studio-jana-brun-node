import { OK } from 'http-status'
import CreateFlow from '../flow/classroom/CreateFlow'
import DeleteFlow from '../flow/classroom/DeleteFlow'
import ReadFlow from '../flow/classroom/ReadFlow'
import UpdateFlow from '../flow/classroom/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class ClassroomController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(classroom => ResponseHttp.sendResponse(res, OK, classroom))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(classroom => ResponseHttp.sendResponse(res, OK, classroom))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(classroom => ResponseHttp.sendResponse(res, OK, classroom))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(classroom => ResponseHttp.sendResponse(res, OK, classroom))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(classroom => ResponseHttp.sendResponse(res, OK, classroom))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new ClassroomController()