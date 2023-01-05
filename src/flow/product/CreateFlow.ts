import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import CreateProductFlowItem from "./item/CreateFlowItem"

class CreateProductFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      await CreateProductFlowItem.create(req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateProductFlow
