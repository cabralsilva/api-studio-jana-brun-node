import { SupplierRepository } from "../../../model/schema/Supplier"

class CreateFlowItem {
  async create(supplier: {}, session = undefined) {
    return await SupplierRepository.create([supplier], { session })
  }
}

export default new CreateFlowItem
