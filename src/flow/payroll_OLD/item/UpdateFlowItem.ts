import { PayrollRepository } from "../../../model/schema/IPayroll";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, payroll: {}, session = undefined) {
    const payrollAfter = await PayrollRepository.findByIdAndUpdate(id, { $set: payroll }, { returnDocument: 'after', session })

    if (Utils.isEmpty(payrollAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return payrollAfter
  }
}

export default new UpdateFlowItem
