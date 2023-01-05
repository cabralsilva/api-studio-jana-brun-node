import { PersonRepository } from "../../../model/schema/Person"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await PersonRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
