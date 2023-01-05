import { PaymentConditionRepository } from "../../../../model/schema/PaymentCondition";
import StringUtils from "../../../../utils/StringUtils";
import Utils from "../../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, paymentCondition: {}, session = undefined) {
    const paymentConditionAfter = await PaymentConditionRepository.findByIdAndUpdate(id, { $set: paymentCondition }, { returnDocument: 'after', session })

    if (Utils.isEmpty(paymentConditionAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return paymentConditionAfter
  }
}

export default new UpdateFlowItem
