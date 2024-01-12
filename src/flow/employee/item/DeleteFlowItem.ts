import { EmployeeRepository } from "../../../model/schema/IEmployee"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await EmployeeRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
