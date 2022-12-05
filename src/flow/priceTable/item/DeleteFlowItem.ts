import { PriceTableRepository } from "../../../model/schema/PriceTable"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await PriceTableRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
