import { EmployeeRepository } from "../../../model/schema/Employee"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await EmployeeRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
