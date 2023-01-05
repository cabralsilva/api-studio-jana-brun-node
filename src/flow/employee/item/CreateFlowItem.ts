import { EmployeeRepository } from "../../../model/schema/Employee"

class CreateFlowItem {
  async create(employee: {}, session = undefined) {
    return await EmployeeRepository.create([employee], { session })
  }
}

export default new CreateFlowItem
