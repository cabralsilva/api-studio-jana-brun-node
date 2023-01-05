import { StateRepository } from "../../../model/schema/address/State"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await StateRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
