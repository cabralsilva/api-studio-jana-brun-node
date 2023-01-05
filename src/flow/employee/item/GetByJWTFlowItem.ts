import GetJWTFlowItem from "../../authorization/item/GetJWTFlowItem"
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from "../../../config/Configs"
import GetByIdFlowItem from "./GetByIdFlowItem"
import { FORBIDDEN, UNAUTHORIZED } from "http-status"
import HttpError from "../../../model/HttpError"
import StringUtils from "../../../utils/StringUtils"
import Utils from "../../../utils/Utils"

class GetByJWTFlowItem {
  async get(req: any) {
    const token = GetJWTFlowItem.get(req)
    let holder: string
    jwt.verify(token, jwtSecret, (error, decode) => {
      if (error) {
        throw new HttpError(FORBIDDEN, StringUtils.message("message.http.invalidRequest"), error)
      }
      holder = decode.holder
    })
    let employee = await GetByIdFlowItem.get(holder)
    if (Utils.isEmpty(employee)) {
      throw new HttpError(UNAUTHORIZED, StringUtils.message("message.http.invalidCredentials"))
    }
    return employee as any
    
  }
}

export default new GetByJWTFlowItem
