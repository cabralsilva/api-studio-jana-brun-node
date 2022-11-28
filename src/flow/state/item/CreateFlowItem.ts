import { StateRepository } from "../../../model/schema/address/State"

class CreateFlowItem {
  async create(state: {}, session = undefined) {
    return await StateRepository.create([state], { session })
  }
}

export default new CreateFlowItem
