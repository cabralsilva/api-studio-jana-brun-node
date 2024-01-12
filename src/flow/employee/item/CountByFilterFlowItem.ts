import { EmployeeRepository } from "../../../model/schema/IEmployee"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await EmployeeRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
