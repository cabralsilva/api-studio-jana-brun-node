import { FORBIDDEN } from 'http-status'
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from '../../../config/Configs'
import HttpError from '../../../model/HttpError'
import StringUtils from '../../../utils/StringUtils'

class ValidateJWTFlowItem {
  validate(token: any) {

    jwt.verify(token, jwtSecret, (error, decode) => {
      if (error) {
        throw new HttpError(FORBIDDEN, StringUtils.message("message.http.invalidToken"))
      }
      const now = new Date()
      const expireDate = new Date(decode.exp)

      if (expireDate < now) {
        throw new HttpError(FORBIDDEN, StringUtils.message("message.http.expiredToken"))
      }
    })
  }
}

export default new ValidateJWTFlowItem