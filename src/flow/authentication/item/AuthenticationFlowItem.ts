import * as crypto from 'crypto';
import { UNAUTHORIZED } from "http-status";
import HttpError from "../../../model/HttpError";
import StringUtils from "../../../utils/StringUtils";

class AuthenticationFlowItem {
  async authenticate(employee: any, password: string) {
    var hash = crypto.pbkdf2Sync(password, employee.salt, 1000, 64, `sha512`).toString(`hex`)
    if (employee.password !== hash) {
      throw new HttpError(UNAUTHORIZED, StringUtils.message("message.http.invalidCredentials"))
    }
  }
}

export default new AuthenticationFlowItem