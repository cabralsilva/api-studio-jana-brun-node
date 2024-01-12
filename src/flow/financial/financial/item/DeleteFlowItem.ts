import { FinancialRepository } from "../../../../model/schema/IFinancial"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await FinancialRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
