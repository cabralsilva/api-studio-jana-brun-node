import { ClassRepository } from "../../../model/schema/IClass"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await ClassRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
