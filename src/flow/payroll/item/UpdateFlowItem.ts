import { PayrollRepository } from "../../../model/schema/Payroll";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, payroll: {}, session = undefined) {
    const payrollAfter = await PayrollRepository.findByIdAndUpdate(id, { $set: payroll }, { returnDocument: 'after', session })

    if (Utils.isEmpty(payrollAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return payrollAfter
  }
}

export default new UpdateFlowItem
