import { PriceTableRepository } from "../../../model/schema/PriceTable"

class CreateFlowItem {
  async create(priceTable: {}, session = undefined) {
    return await PriceTableRepository.create([priceTable], { session })
  }
}

export default new CreateFlowItem
