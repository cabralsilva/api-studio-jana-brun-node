import { GrateRepository } from "../../../model/schema/Grate"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await GrateRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
