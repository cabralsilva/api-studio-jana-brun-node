import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import CreateFlowItem from "../person/item/CreateFlowItem"
import CreateStudentFlowItem from "./item/CreateFlowItem"

class CreateStudentFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const person = await CreateFlowItem.create(req.body.person, session)
      req.body.person = person[0]._id
      await CreateStudentFlowItem.create(req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateStudentFlow
