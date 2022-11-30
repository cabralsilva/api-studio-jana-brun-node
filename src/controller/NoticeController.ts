import { OK } from 'http-status'
import CreateFlow from '../flow/notice/CreateFlow'
import DeleteFlow from '../flow/notice/DeleteFlow'
import ReadFlow from '../flow/notice/ReadFlow'
import UpdateFlow from '../flow/notice/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class NoticeController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(notice => ResponseHttp.sendResponse(res, OK, notice))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(notice => ResponseHttp.sendResponse(res, OK, notice))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(notice => ResponseHttp.sendResponse(res, OK, notice))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(notice => ResponseHttp.sendResponse(res, OK, notice))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(notice => ResponseHttp.sendResponse(res, OK, notice))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new NoticeController()