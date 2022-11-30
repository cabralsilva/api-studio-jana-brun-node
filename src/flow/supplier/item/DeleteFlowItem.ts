import { SupplierRepository } from "../../../model/schema/Supplier"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await SupplierRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
