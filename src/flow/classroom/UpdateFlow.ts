import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import UpdateFlowItem from "./item/UpdateFlowItem"

class UpdateFlow extends FlowHttp {

  async update(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      await UpdateFlowItem.update(req.params.id, req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new UpdateFlow
