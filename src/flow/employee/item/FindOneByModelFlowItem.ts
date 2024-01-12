import { EmployeeRepository } from "../../../model/schema/IEmployee"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined, pop = undefined): Promise<any> {
    return await EmployeeRepository.findOne(model).populate(pop)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
