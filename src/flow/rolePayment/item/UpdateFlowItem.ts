import { RolePaymentRepository } from "../../../model/schema/RolePayment";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, rolePayment: {}, session = undefined) {
    const rolePaymentAfter = await RolePaymentRepository.findByIdAndUpdate(id, { $set: rolePayment }, { returnDocument: 'after', session })

    if (Utils.isEmpty(rolePaymentAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return rolePaymentAfter
  }
}

export default new UpdateFlowItem
