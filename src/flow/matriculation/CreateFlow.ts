import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import CreateFlowItem from "../person/item/CreateFlowItem"
import CreateMatriculationFlowItem from "./item/CreateFlowItem"

class CreateMatriculationFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const student = await CreateFlowItem.create(req.body.student, session)
      req.body.student = student[0]._id
      await CreateMatriculationFlowItem.create(req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateMatriculationFlow
