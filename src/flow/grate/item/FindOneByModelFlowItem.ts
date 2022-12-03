import { GrateRepository } from "../../../model/schema/Grate"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await GrateRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
