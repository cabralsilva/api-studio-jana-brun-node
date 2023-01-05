import { SupplierRepository } from "../../../model/schema/Supplier"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await SupplierRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
