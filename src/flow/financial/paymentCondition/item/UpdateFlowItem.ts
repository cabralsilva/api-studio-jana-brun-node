import { PaymentConditionRepository } from "../../../../model/schema/IPaymentCondition";
import { getMessage } from "../../../../config/i18n";
import Utils from "../../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, paymentCondition: {}, session = undefined) {
    const paymentConditionAfter = await PaymentConditionRepository.findByIdAndUpdate(id, { $set: paymentCondition }, { returnDocument: 'after', session })

    if (Utils.isEmpty(paymentConditionAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return paymentConditionAfter
  }
}

export default new UpdateFlowItem
