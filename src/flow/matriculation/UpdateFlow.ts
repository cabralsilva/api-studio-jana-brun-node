import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import UpdateStudenFlowItem from "../student/item/UpdateFlowItem"
import UpdatePersonFlowItem from "../person/item/UpdateFlowItem"
import UpdateFlowItem from "./item/UpdateFlowItem"

class UpdateFlow extends FlowHttp {

  async update(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      if (req.body.student) {
        if (req.body.student.person) {
          await UpdatePersonFlowItem.update(req.body.student.person._id, req.body.student.person, session)
        }
        await UpdateStudenFlowItem.update(req.body.student._id, req.body.student, session)
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
