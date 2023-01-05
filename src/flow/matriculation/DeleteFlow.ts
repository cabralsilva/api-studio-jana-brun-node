import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import DeleteFlowItem from "./item/DeleteFlowItem"
import ValidadeDeleteFlowItem from "./item/ValidadeDeleteFlowItem"

class DeleteFlow extends FlowHttp {

  async delete(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      // await ValidadeDeleteFlowItem.validate(req.params.id)
      await DeleteFlowItem.delete(req.params.id, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new DeleteFlow
