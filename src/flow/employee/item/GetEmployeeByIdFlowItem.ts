import { EmployeeRepository } from "../../../model/schema/Employee"

class GetEmployeeByIdFlowItem {
  async get(id: string, pop = undefined, sel = ""): Promise<any> {
    return await EmployeeRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetEmployeeByIdFlowItem
