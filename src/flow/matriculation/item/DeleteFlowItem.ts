import { MatriculationRepository } from "../../../model/schema/Matriculation"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await MatriculationRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
