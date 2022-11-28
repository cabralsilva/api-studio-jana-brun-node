import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import CreateEmployeeFlowItem from "./item/CreateFlowItem"
import * as crypto from 'crypto'

class CreateEmployeeFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      req.body.salt = crypto.randomBytes(16).toString('hex')
      req.body.password = crypto.pbkdf2Sync("123456", req.body.salt, 1000, 64, `sha512`).toString(`hex`)
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
