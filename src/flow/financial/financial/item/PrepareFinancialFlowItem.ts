import { NOT_ACCEPTABLE } from "http-status";
import HttpError from "../../../../model/HttpError";
import { getMessage } from "../../../../config/i18n";
import Utils from "../../../../utils/Utils";
import GetByIdFlowItem from "../../paymentCondition/item/GetByIdFlowItem";
import GetSequenceFlowItem from "./GetSequenceFlowItem";
import GetValueOfInstallmenFlowItem from "./GetValueOfInstallmenFlowItem";
import moment = require("moment");
import DateUtils from "../../../../utils/DateUtils";

class PrepareFinancialFlowItem {
  async prepare(financialBase: any): Promise<any[]> {
    var financials = []
    const paymentCondition = await GetByIdFlowItem.get(financialBase.paymentCondition)
    if(Utils.isEmpty(paymentCondition)){
      throw new HttpError(NOT_ACCEPTABLE, getMessage("message.response.resourceNotFound"), getMessage("message.paymentCondition"))
    }

    for (var installmentNumber = 1; installmentNumber <= paymentCondition.quantityInstallments; installmentNumber++) {
      var c = moment(financialBase.movimentDate)
      let dueDateAux = moment(financialBase.dueDate).add(installmentNumber - 1, 'months').toDate()
      const financial = {
        ...financialBase,
        movimentDate: DateUtils.toDateTimeUTC0(moment(financialBase.movimentDate).toDate()),
        dueDate: DateUtils.toDateTimeUTC0(dueDateAux),
        value: GetValueOfInstallmenFlowItem.get(installmentNumber, paymentCondition.quantityInstallments, financialBase.value),
        installment: installmentNumber,
        installmentTotal: paymentCondition.quantityInstallments,
      } as any
      financial.sequence = await GetSequenceFlowItem.get(financial, (installmentNumber - 1))
      financial.description = financialBase.description || "AV-" + financial.sequence,
      financials.push(financial)
    }
    return financials
  }
}

export default new PrepareFinancialFlowItem
