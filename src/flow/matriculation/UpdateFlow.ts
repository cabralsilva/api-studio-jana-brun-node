import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import UpdateStudenFlowItem from "../student/item/UpdateFlowItem"
import UpdatePersonFlowItem from "../person/item/UpdateFlowItem"
import UpdateFlowItem from "./item/UpdateFlowItem"
import Utils from "../../utils/Utils"

class UpdateFlow extends FlowHttp {

  async update(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()

      if (Utils.isNotEmpty(req.body.student?.person)){
        const person = await UpdatePersonFlowItem.update(req.body.student.person._id, req.body.student.person, session)
        req.body.student.person = person._id
      }
      if (Utils.isNotEmpty(req.body.student?.responsible)){
        const person = await UpdatePersonFlowItem.update(req.body.student.responsible._id, req.body.student.responsible, session)
        req.body.student.responsible = person._id
      }
      if (Utils.isEmpty(req.body.student?._id)){
        if (Utils.isNotEmpty(req.body.student?.person)){
          const student = await UpdateStudenFlowItem.update(req.body.student.person._id, req.body.student, session)
          req.body.student = student._id
        }
      }

      if (req.body.status == "EFFECTIVE") {
        req.body.effectiveDateTime = new Date()
      }
      
      await UpdateFlowItem.update(req.params.id, req.body, session)
      await session.commitTransaction()
    } catch (error) {
      console.log(error)
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new UpdateFlow
