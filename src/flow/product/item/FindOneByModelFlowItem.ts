import { ProductRepository } from "../../../model/schema/IProduct"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await ProductRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
