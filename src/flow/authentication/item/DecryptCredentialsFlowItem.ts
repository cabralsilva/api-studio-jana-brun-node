import { UNAUTHORIZED } from "http-status"
import HttpError from "../../../model/HttpError"
import { getMessage } from "../../../config/i18n"

class DecryptCredentialsFlowItem {
  decrypt(req: any): { username: string, password: string } {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      throw new HttpError(UNAUTHORIZED, getMessage("message.http.invalidRequest"))
    }

    const base64Credentials = req.headers.authorization.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii').split(":")
    return {
      username: credentials[0],
      password: credentials[1]
    }
  }
}

export default new DecryptCredentialsFlowItem