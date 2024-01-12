import { EmployeeRepository } from "../../../model/schema/IEmployee"

class CreateFlowItem {
  async create(employee: {}, session = undefined) {
    return await EmployeeRepository.create([employee], { session })
  }
}

export default new CreateFlowItem
