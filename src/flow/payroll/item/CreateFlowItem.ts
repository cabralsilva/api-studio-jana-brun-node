import { PayrollRepository } from "../../../model/schema/Payroll"

class CreateFlowItem {
  async create(payroll: {}, session = undefined) {
    return await PayrollRepository.create([payroll], { session })
  }
}

export default new CreateFlowItem
