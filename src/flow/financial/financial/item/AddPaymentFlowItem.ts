import { FinancialRepository } from "../../../../model/schema/Financial"

class AddPaymentFlowItem {
  async add(_id, _financial, _payment, session = undefined) {
    return await FinancialRepository.findByIdAndUpdate(_id, { $set: _financial, $push: { payments: _payment } }, { returnDocument: 'after', session })
  }
}

export default new AddPaymentFlowItem
