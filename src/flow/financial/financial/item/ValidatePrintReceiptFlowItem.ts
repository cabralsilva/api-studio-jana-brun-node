import * as HttpStatus from "http-status"
import HttpError from "../../../../model/HttpError"
import StringUtils from "../../../../utils/StringUtils"

class ValidatePrintReceiptFlowItem {
  validate(financial: any) {
    if (financial.status !== 'PARTIALLY' && financial.status !== 'PAID') {
      throw new HttpError(HttpStatus.NOT_ACCEPTABLE, StringUtils.message("message.financial.printReceiptPaymentsStatusIllegal"))
    }
  }
}

export default new ValidatePrintReceiptFlowItem