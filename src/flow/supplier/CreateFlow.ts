import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import CreateSupplierFlowItem from "./item/CreateFlowItem"

class CreateSupplierFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      await CreateSupplierFlowItem.create(req.body, session)
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateSupplierFlow
