import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import CreateEmployeeFlowItem from "./item/CreateFlowItem"
import * as crypto from 'crypto'
import CryptoPasswordFlowItem from "./item/CryptoPasswordFlowItem"

class CreateEmployeeFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const crypto = CryptoPasswordFlowItem.crypto("123456")
      req.body.salt = crypto.salt
      req.body.password = crypto.password
      await CreateEmployeeFlowItem.create(req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateEmployeeFlow
