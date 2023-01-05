import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
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
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new UpdatePasswordFlow
