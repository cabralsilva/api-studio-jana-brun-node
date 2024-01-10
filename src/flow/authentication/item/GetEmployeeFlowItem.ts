import { UNAUTHORIZED } from "http-status";
import HttpError from "../../../model/HttpError";
import Utils from "../../../utils/Utils";
import FindOneByModelFlowItem from "../../employee/item/FindOneByModelFlowItem";
import { getMessage } from "../../../config/i18n";

class GetEmployeeFlowItem {
  async get(credential: { username: string; password: string }) {
    const employee = await FindOneByModelFlowItem.findOne({ email: credential.username }, undefined, 'person')
    if (Utils.isEmpty(employee)) {
      throw new HttpError(UNAUTHORIZED, getMessage("message.http.invalidCredentials"))
    }
    return employee
  }
}

export default new GetEmployeeFlowItem