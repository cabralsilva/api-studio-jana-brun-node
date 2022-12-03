import { ProductRepository } from "../../../model/schema/Product"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await ProductRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
