import { ClassRepository } from "../../../model/schema/Class"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await ClassRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
