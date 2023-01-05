import { FinancialRepository } from "../../../../model/schema/Financial"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await FinancialRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
