import { OK } from 'http-status'
import AuthenticationFlow from '../flow/authentication/AuthenticationFlow'
import ResponseHttp from '../model/ResponseHttp'

class AuthenticationController {
  authenticate(req, res) {
    AuthenticationFlow.authentication(req, res)
      .then(data => ResponseHttp.sendResponseCustom(res, OK, data))
      .catch(error => ResponseHttp.sendResponseError(res, error))
  }
}

export default new AuthenticationController()