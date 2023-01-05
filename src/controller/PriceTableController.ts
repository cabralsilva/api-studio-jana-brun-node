import { OK } from 'http-status'
import CreateFlow from '../flow/priceTable/CreateFlow'
import DeleteFlow from '../flow/priceTable/DeleteFlow'
import ReadFlow from '../flow/priceTable/ReadFlow'
import UpdateFlow from '../flow/priceTable/UpdateFlow'
import ResponseHttp from '../model/ResponseHttp'

class PriceTableController {
  create(req, res) {
    CreateFlow.create(req, res)
      .then(priceTable => ResponseHttp.sendResponse(res, OK, priceTable))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  get(req, res) {
    ReadFlow.read(req, res)
      .then(priceTable => ResponseHttp.sendResponse(res, OK, priceTable))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  getById(req, res) {
    ReadFlow.read(req, res)
      .then(priceTable => ResponseHttp.sendResponse(res, OK, priceTable))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  update(req, res) {
    UpdateFlow.update(req, res)
      .then(priceTable => ResponseHttp.sendResponse(res, OK, priceTable))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }

  delete(req, res) {
    DeleteFlow.delete(req, res)
      .then(priceTable => ResponseHttp.sendResponse(res, OK, priceTable))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new PriceTableController()