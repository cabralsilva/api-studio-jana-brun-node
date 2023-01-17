import { OK } from 'http-status'
import GetProductValueFlow from '../flow/sale/GetProductValueFlow'
import ResponseHttp from '../model/ResponseHttp'

class SaleController {
  searchPrice(req, res) {
    GetProductValueFlow.get(req, res)
      .then(state => ResponseHttp.sendResponse(res, OK, state))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new SaleController()