import { ProductRepository } from "../../../model/schema/IProduct"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await ProductRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
