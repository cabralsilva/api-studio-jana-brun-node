import { EmployeeRepository } from "../../../model/schema/Employee";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, employee: {}, session = undefined) {
    const employeeAfter = await EmployeeRepository.findByIdAndUpdate(id, { $set: employee }, { returnDocument: 'after', session })

    if (Utils.isEmpty(employeeAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return employeeAfter
  }
}

export default new UpdateFlowItem
