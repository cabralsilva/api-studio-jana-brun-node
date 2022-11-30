import { SupplierRepository } from "../../../model/schema/Supplier"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await SupplierRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
