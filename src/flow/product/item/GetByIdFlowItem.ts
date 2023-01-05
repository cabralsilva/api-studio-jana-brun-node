import { ProductRepository } from "../../../model/schema/Product"

class GetByIdFlowItem {
  async get(id: string, pop = undefined, sel = "") {
    return await ProductRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
