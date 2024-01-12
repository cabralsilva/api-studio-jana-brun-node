import GetSequenceFlowItem from "./GetSequenceFlowItem";
import GetValueOfInstallmenFlowItem from "./GetValueOfInstallmenFlowItem";
import moment = require("moment");
import Utils from "../../../../utils/Utils";
import DateUtils from "../../../../utils/DateUtils";

class BuildFinancialsByPaymentConditionFlowItem {
  async build(paymentCondition: any, financialBase: {movimentDate: any, dueDate: any, description?: string, value: number, dayFixedOfPayment?: number}): Promise<any[]> {
    var financials = []
    
    for (var installmentNumber = 1; installmentNumber <= paymentCondition.quantityInstallments; installmentNumber++) {

      var dueDate = moment(financialBase.dueDate).add(installmentNumber - 1, 'months')
      if (Utils.isNotEmpty(financialBase.dayFixedOfPayment)) {
        dueDate.set("date", financialBase.dayFixedOfPayment)
      }

      const financial = {
        ...financialBase,
        movimentDate: moment(financialBase.movimentDate),
        dueDate: DateUtils.toDateTimeUTC0(dueDate.toDate()),
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

export default new BuildFinancialsByPaymentConditionFlowItem
