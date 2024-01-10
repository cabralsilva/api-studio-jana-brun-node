import * as crypto from 'crypto';
import { UNAUTHORIZED } from "http-status";
import HttpError from "../../../model/HttpError";
import { getMessage } from "../../../config/i18n";

class AuthenticationFlowItem {
  async authenticate(employee: any, password: string) {
    var hash = crypto.pbkdf2Sync(password, employee.salt, 1000, 64, `sha512`).toString(`hex`)
    if (employee.password !== hash) {
      throw new HttpError(UNAUTHORIZED, getMessage("message.http.invalidCredentials"))
    }
  }
}

export default new AuthenticationFlowItem