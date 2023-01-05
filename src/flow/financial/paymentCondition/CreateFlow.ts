import mongoose from "mongoose"
import FlowHttp from "../../../model/FlowHttp"
import CreatePaymentConditionFlowItem from "./item/CreateFlowItem"

class CreatePaymentConditionFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      await CreatePaymentConditionFlowItem.create(req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreatePaymentConditionFlow
