import { PayrollRepository } from "../../../model/schema/Payroll"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await PayrollRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
