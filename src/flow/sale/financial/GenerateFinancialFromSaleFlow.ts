import { C2Flow } from "c2-mongoose"
import { ClientSession } from "mongoose"
import { IPaymentCondition } from "../../../model/schema/IPaymentCondition"
import { ISale, SaleRepository } from "../../../model/schema/ISale"
import CreateFinancialFlowItem from "../../financial/financial/item/CreateFinancialFlowItem"
import GetSequenceFlowItem from "../../financial/financial/item/GetSequenceFlowItem"
import GetValueOfInstallmenFlowItem from "../../financial/financial/item/GetValueOfInstallmenFlowItem"
import GetByIdFlowItem from "../../financial/paymentCondition/item/GetByIdFlowItem"
import moment = require("moment")

class GenerateFinancialFromSaleFlow {
  
  private crudSale = new C2Flow<ISale>(SaleRepository)

  async generate(sale: ISale, session: ClientSession) {

    for (const payment of sale.payments) {
      payment.installment.installments = []
      const paymentCondition = await GetByIdFlowItem.get(payment.installment.paymentCondition) as IPaymentCondition

      let dueDateAux = moment(payment.firstPaymentDate)
      for (let sequence = 1; sequence <= paymentCondition.quantityInstallments; sequence++) {
        const financial = {
          movimentDate: new Date(),
          dueDate: dueDateAux.toDate(),
          description: `Venda - ${sale.sequence}`,
          value: GetValueOfInstallmenFlowItem.get(sequence, paymentCondition.quantityInstallments, payment.value),
          type: 'RECEIPT',
          person: sale.customerData?.customer,
          installment: sequence,
          installmentTotal: paymentCondition.quantityInstallments,
        } as any
        financial.sequence = await GetSequenceFlowItem.get(financial, sequence - 1)
        await CreateFinancialFlowItem.create(financial, session)

        payment.installment.installments.push({
          sequence: financial.installment,
          value: financial.value,
          dueDate: financial.dueDate
        })

        dueDateAux = dueDateAux.add(1, 'months')
      }
    }

    await this.crudSale.updateById(sale._id, sale, { session, logger: false })
  }
}
export default new GenerateFinancialFromSaleFlow
