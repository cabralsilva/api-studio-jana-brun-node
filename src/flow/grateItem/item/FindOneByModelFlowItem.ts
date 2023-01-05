import { GrateItemRepository } from "../../../model/schema/GrateItem"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await GrateItemRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
