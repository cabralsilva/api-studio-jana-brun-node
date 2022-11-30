import mongoose from "mongoose"
import FlowHttp from "../../model/FlowHttp"
import AuthenticationFlowItem from "./item/AuthenticationFlowItem"
import DecryptCredentialsFlowItem from "./item/DecryptCredentialsFlowItem"
import EnrichResponseFlowItem from "./item/EnrichResponseFlowItem"
import GenerateJWTFlowItem from "./item/GenerateJWTFlowItem"
import GetEmployeeFlowItem from "./item/GetEmployeeFlowItem"

class AuthenticationFlow extends FlowHttp {

  async authentication(req, res) {
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
      const credential = DecryptCredentialsFlowItem.decrypt(req)
      const employee = await GetEmployeeFlowItem.get(credential)
      await AuthenticationFlowItem.authenticate(employee, credential.password)
      const access_token = await GenerateJWTFlowItem.generate(employee)
      const response = EnrichResponseFlowItem.enrich({ access_token, employee })
      await session.commitTransaction()
      return response
    } catch (error) {
      await session.abortTransaction()
      this.processError(error)
    } finally {
      await session.endSession()
    }
  }
}
export default new AuthenticationFlow
