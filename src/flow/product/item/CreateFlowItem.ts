import { ProductRepository } from "../../../model/schema/IProduct"

class CreateFlowItem {
  async create(product: {}, session = undefined) {
    return await ProductRepository.create([product], { session })
  }
}

export default new CreateFlowItem
