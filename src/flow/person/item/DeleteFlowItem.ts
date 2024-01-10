import { PersonRepository } from "../../../model/schema/IPerson"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await PersonRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
