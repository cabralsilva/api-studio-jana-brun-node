import { ProductRepository } from "../../../model/schema/Product"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await ProductRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
