import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import CreateClassroomFlowItem from "./item/CreateFlowItem"

class CreateClassroomFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      await CreateClassroomFlowItem.create(req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateClassroomFlow
