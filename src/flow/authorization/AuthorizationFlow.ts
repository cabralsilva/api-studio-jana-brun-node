import FlowHttp from "../../model/FlowHttp"
import ResponseHttp from "../../model/ResponseHttp"
import GetJWTFlowItem from "./item/GetJWTFlowItem"
import ValidateJWTFlowItem from "./item/ValidateJWTFlowItem"

class AuthorizationFlow extends FlowHttp {

  async authorization(req, res, next) {
    try {
      const token = GetJWTFlowItem.get(req)
      await ValidateJWTFlowItem.validate(token)
      next()
    } catch (error) {
      ResponseHttp.sendResponseError(res, error)
    } finally {

    }
  }
}
export default new AuthorizationFlow
