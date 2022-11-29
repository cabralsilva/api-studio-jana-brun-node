import { FORBIDDEN } from "http-status"
import HttpError from "../../../model/HttpError"
import StringUtils from "../../../utils/StringUtils"
import Utils from "../../../utils/Utils"

class GetJWTFlowItem {
  get(req: any) {

    const token = req.headers?.authorization?.split(' ')[1]

    if (Utils.isEmpty(token)) {
      throw new HttpError(FORBIDDEN, StringUtils.message("message.http.invalidRequest"))
    }

    return token
  }
}

export default new GetJWTFlowItem