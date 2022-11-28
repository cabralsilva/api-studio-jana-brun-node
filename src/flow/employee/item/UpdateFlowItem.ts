import { EmployeeRepository } from "../../../model/schema/Employee";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, employee: {}, session = undefined) {
    const employeeAfter = await EmployeeRepository.findByIdAndUpdate(id, { $set: employee }, { returnDocument: 'after', session })

    if (Utils.isEmpty(employeeAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return employeeAfter
  }
}

export default new UpdateFlowItem
