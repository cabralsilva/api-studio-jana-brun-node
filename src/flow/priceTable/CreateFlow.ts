import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import CreatePriceTableFlowItem from "./item/CreateFlowItem"

class CreatePriceTableFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      await CreatePriceTableFlowItem.create(req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreatePriceTableFlow
