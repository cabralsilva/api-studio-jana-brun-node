import { PriceTableRepository } from "../../../model/schema/PriceTable"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await PriceTableRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
