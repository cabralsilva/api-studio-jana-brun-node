import { EmployeeRepository } from "../../../model/schema/Employee"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await EmployeeRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
