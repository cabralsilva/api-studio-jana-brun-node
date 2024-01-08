import * as HttpStatus from "http-status"
import HttpError from "../../../../model/HttpError"
import StringUtils from "../../../../utils/StringUtils"
import GetValueTotalPaidFlowItem from "./GetValueTotalPaidFlowItem"

class ValidateAddPaymentFlowItem {
  validate(financial: any, payment: any) {
    var _totalPaid = GetValueTotalPaidFlowItem.get(financial, payment)

    if (_totalPaid > financial.value) {
      throw new HttpError(HttpStatus.NOT_ACCEPTABLE, StringUtils.message("message.financial.openValueLessThan"))
    }
  }
}

export default new ValidateAddPaymentFlowItem