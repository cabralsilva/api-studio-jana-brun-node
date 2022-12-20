import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import CreateFlowItem from "../person/item/CreateFlowItem"
import CreateEmployeeFlowItem from "./item/CreateFlowItem"
import CryptoPasswordFlowItem from "./item/CryptoPasswordFlowItem"

class CreateEmployeeFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const crypto = CryptoPasswordFlowItem.crypto("123456")
      req.body.salt = crypto.salt
      req.body.password = crypto.password
      const person = await CreateFlowItem.create(req.body.person, session)
      req.body.person = person[0]._id
      console.log(person)
      console.log(req.body)
      await CreateEmployeeFlowItem.create(req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateEmployeeFlow
