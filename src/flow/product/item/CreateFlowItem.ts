import { ProductRepository } from "../../../model/schema/Product"

class CreateFlowItem {
  async create(product: {}, session = undefined) {
    return await ProductRepository.create([product], { session })
  }
}

export default new CreateFlowItem
