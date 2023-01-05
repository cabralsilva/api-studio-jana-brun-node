import { StateRepository } from "../../../model/schema/address/State"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await StateRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
