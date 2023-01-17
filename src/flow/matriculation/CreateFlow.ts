import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import Utils from "../../utils/Utils"
import CreatePersonFlowItem from "../person/item/CreateFlowItem"
import CreateStudentFlowItem from "../student/item/CreateFlowItem"
import CreateMatriculationFlowItem from "./item/CreateFlowItem"
import PrepareMatricularionFlowItem from "./item/PrepareMatricularionFlowItem"

class CreateMatriculationFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()

      if (Utils.isEmpty(req.body.student?.person?._id)){
        const person = await CreatePersonFlowItem.create(req.body.student.person, session)
        req.body.student.person = person[0]._id
      }
      if (Utils.isEmpty(req.body.student?.responsible?._id)){
        const person = await CreatePersonFlowItem.create(req.body.student.responsible, session)
        req.body.student.responsible = person[0]._id
      }
      if (Utils.isEmpty(req.body.student?._id)){
        const student = await CreateStudentFlowItem.create(req.body.student, session)
        req.body.student = student[0]._id
      }

      req.body.effectiveDateTime = null
      if (req.body.status == "EFFECTIVE") {
        req.body.effectiveDateTime = new Date()
      }
      let matriculation = await PrepareMatricularionFlowItem.prepare(req.body)
      matriculation = await CreateMatriculationFlowItem.create(matriculation, session)
      await session.commitTransaction()
      return matriculation[0]
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateMatriculationFlow
