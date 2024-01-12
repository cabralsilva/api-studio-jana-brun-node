import { FORBIDDEN } from 'http-status'
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from '../../../config/Configs'
import HttpError from '../../../model/HttpError'
import { getMessage } from '../../../config/i18n'
import { JwtPayload } from 'jsonwebtoken'
import AddDataTokenInContextFlowItem from './AddDataTokenInContextFlowItem'

class ValidateJWTFlowItem {
  async validate(token: any) {

    // jwt.verify(token, jwtSecret, (error, decode) => {
    //   if (error) {
    //     throw new HttpError(FORBIDDEN, getMessage("message.http.invalidToken"))
    //   }
    //   const now = new Date()
    //   const expireDate = new Date(decode.exp)

    //   if (expireDate < now) {
    //     throw new HttpError(FORBIDDEN, getMessage("message.http.expiredToken"))
    //   }
    // })
    try {
      const decode = jwt.verify(token, jwtSecret) as JwtPayload
      // CheckJwtIssFlowItem.check(decode)
      await AddDataTokenInContextFlowItem.add(decode)
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new HttpError(FORBIDDEN, getMessage("message.authenticateIsRequired"))
      }
      throw new HttpError(FORBIDDEN, getMessage("message.authenticateIsRequired"))
    }
  }
}

export default new ValidateJWTFlowItem