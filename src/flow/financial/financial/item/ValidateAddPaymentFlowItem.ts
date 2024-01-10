import * as HttpStatus from "http-status"
import HttpError from "../../../../model/HttpError"
import { getMessage } from "../../../../config/i18n"
import GetValueTotalPaidFlowItem from "./GetValueTotalPaidFlowItem"

class ValidateAddPaymentFlowItem {
  validate(financial: any, payment: any) {
    var _totalPaid = GetValueTotalPaidFlowItem.get(financial, payment)

    if (_totalPaid > financial.value) {
      throw new HttpError(HttpStatus.NOT_ACCEPTABLE, getMessage("message.financial.openValueLessThan"))
    }
  }
}

export default new ValidateAddPaymentFlowItem