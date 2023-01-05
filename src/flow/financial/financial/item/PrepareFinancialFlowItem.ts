import { NOT_ACCEPTABLE } from "http-status";
import HttpError from "../../../../model/HttpError";
import StringUtils from "../../../../utils/StringUtils";
import Utils from "../../../../utils/Utils";
import GetByIdFlowItem from "../../paymentCondition/item/GetByIdFlowItem";
import GetSequenceFlowItem from "./GetSequenceFlowItem";
import GetValueOfInstallmenFlowItem from "./GetValueOfInstallmenFlowItem";
import moment = require("moment");

class PrepareFinancialFlowItem {
  async prepare(financialBase: any): Promise<any[]> {
    var financials = []
    const paymentCondition = await GetByIdFlowItem.get(financialBase.paymentCondition)
    if(Utils.isEmpty(paymentCondition)){
      throw new HttpError(NOT_ACCEPTABLE, StringUtils.message("message.response.resourceNotFound"), StringUtils.message("message.paymentCondition"))
    }

    for (var installmentNumber = 1; installmentNumber <= paymentCondition.quantityInstallments; installmentNumber++) {
      var c = moment(financialBase.movimentDate)
      const financial = {
        ...financialBase,
        movimentDate: moment(financialBase.movimentDate),
        dueDate: moment(financialBase.dueDate).add(installmentNumber - 1, 'months'),
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
