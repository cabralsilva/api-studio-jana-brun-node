import { GrateItemRepository } from "../../../model/schema/GrateItem"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await GrateItemRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
