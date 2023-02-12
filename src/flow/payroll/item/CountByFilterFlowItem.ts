import { PayrollRepository } from "../../../model/schema/Payroll"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await PayrollRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
