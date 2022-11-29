import { UNAUTHORIZED } from "http-status";
import HttpError from "../../../model/HttpError";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";
import FindOneByModelFlowItem from "../../employee/item/FindOneByModelFlowItem";

class GetEmployeeFlowItem {
  async get(credential: { username: string; password: string }) {
    const employee = await FindOneByModelFlowItem.findOne({ email: credential.username }) as any
    if (Utils.isEmpty(employee)) {
      throw new HttpError(UNAUTHORIZED, StringUtils.message("message.http.invalidCredentials"))
    }
    return employee
  }
}

export default new GetEmployeeFlowItem