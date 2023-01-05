import mongoose from "mongoose"
import FlowHttp from "../../../model/FlowHttp"
import CreateFinancialFlowItem from "./item/CreateFlowItem"
import PrepareFinancialFlowItem from "./item/PrepareFinancialFlowItem"

class CreateFinancialFlow extends FlowHttp {

  async create(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      var financialBase = req.body
      var financials = await PrepareFinancialFlowItem.prepare(financialBase)
      for(var financial of financials) {
        await CreateFinancialFlowItem.create(financial, session)
      }
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new CreateFinancialFlow
