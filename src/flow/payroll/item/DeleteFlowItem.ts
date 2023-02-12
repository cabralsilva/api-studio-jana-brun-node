import { PayrollRepository } from "../../../model/schema/Payroll"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await PayrollRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
