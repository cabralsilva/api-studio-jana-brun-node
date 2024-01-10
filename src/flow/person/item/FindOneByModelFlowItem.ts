import { PersonRepository } from "../../../model/schema/IPerson"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await PersonRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
