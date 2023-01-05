import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import UpdatePersonFlowItem from "../person/item/UpdateFlowItem"
import UpdateFlowItem from "./item/UpdateFlowItem"

class UpdateFlow extends FlowHttp {

  async update(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      if (req.body.person) {
        await UpdatePersonFlowItem.update(req.body.person._id, req.body.person, session)
      }
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
