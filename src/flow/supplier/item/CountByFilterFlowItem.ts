import { SupplierRepository } from "../../../model/schema/Supplier"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await SupplierRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
