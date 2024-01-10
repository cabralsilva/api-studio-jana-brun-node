import GetJWTFlowItem from "../../authorization/item/GetJWTFlowItem"
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from "../../../config/Configs"
import GetEmployeeByIdFlowItem from "./GetEmployeeByIdFlowItem"
import { FORBIDDEN, UNAUTHORIZED } from "http-status"
import HttpError from "../../../model/HttpError"
import { getMessage } from "../../../config/i18n"
import Utils from "../../../utils/Utils"

class GetByJWTFlowItem {
  async get(req: any) {
    const token = GetJWTFlowItem.get(req)
    let holder: string
    jwt.verify(token, jwtSecret, (error, decode) => {
      if (error) {
        throw new HttpError(FORBIDDEN, getMessage("message.http.invalidRequest"), error)
      }
      holder = decode.holder
    })
    let employee = await GetEmployeeByIdFlowItem.get(holder)
    if (Utils.isEmpty(employee)) {
      throw new HttpError(UNAUTHORIZED, getMessage("message.http.invalidCredentials"))
    }
    return employee as any
    
  }
}

export default new GetByJWTFlowItem
