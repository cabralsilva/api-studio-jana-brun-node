import httpContext from "express-http-context";
import { JwtPayload } from 'jsonwebtoken';
import GetEmployeeByIdFlowItem from "../../employee/item/GetEmployeeByIdFlowItem";

class AddDataTokenInContextFlowItem {

  async add(decode: JwtPayload | any) {
    const employeeId = decode.holder as string

    let user = await GetEmployeeByIdFlowItem.get(employeeId)

    httpContext.set('user', user)
  }
}

export default new AddDataTokenInContextFlowItem