import * as HttpStatus from "http-status"
import HttpError from "../../../../model/HttpError"
import { getMessage } from "../../../../config/i18n"

class ValidatePrintReceiptFlowItem {
  validate(financial: any) {
    if (financial.status !== 'PARTIALLY' && financial.status !== 'PAID') {
      throw new HttpError(HttpStatus.NOT_ACCEPTABLE, getMessage("message.financial.printReceiptPaymentsStatusIllegal"))
    }
  }
}

export default new ValidatePrintReceiptFlowItem