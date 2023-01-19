import { NOT_ACCEPTABLE, UNAUTHORIZED } from "http-status"
import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import HttpError from "../../model/HttpError"
import StringUtils from "../../utils/StringUtils"
import AuthenticationFlowItem from "../authentication/item/AuthenticationFlowItem"
import CryptoPasswordFlowItem from "./item/CryptoPasswordFlowItem"
import GetByJWTFlowItem from "./item/GetByJWTFlowItem"
import UpdateFlowItem from "./item/UpdateFlowItem"

class UpdatePasswordFlow extends FlowHttp {

  async update(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const employee = await GetByJWTFlowItem.get(req)
      await AuthenticationFlowItem.authenticate(employee, req.body.currentPassword)
      const crypto = CryptoPasswordFlowItem.crypto(req.body.newPassword)
      await UpdateFlowItem.update(employee._id, crypto, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(new HttpError(NOT_ACCEPTABLE, StringUtils.message("message.http.updatePasswordInvalid")))
    } finally {
      await session.endSession()
    }
  }
}
export default new UpdatePasswordFlow
