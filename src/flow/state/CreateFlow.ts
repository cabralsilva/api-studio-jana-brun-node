import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import CreateStateFlowItem from "./item/CreateFlowItem"

class CreateStateFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      await CreateStateFlowItem.create(req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateStateFlow
