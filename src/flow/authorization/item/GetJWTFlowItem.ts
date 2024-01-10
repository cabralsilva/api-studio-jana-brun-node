import { FORBIDDEN } from "http-status"
import HttpError from "../../../model/HttpError"
import { getMessage } from "../../../config/i18n"
import Utils from "../../../utils/Utils"

class GetJWTFlowItem {
  get(req: any) {

    const token = req.headers?.authorization?.split(' ')[1]

    if (Utils.isEmpty(token)) {
      throw new HttpError(FORBIDDEN, getMessage("message.http.invalidRequest"))
    }

    return token
  }
}

export default new GetJWTFlowItem