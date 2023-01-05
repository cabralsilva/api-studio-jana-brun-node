import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import CreateGrateItemFlowItem from "./item/CreateFlowItem"

class CreateGrateItemFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      await CreateGrateItemFlowItem.create(req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateGrateItemFlow
