import { PayrollRepository } from "../../../model/schema/IPayroll"

class CreatePayrollFlowItem {
  async create(payroll: {}, session = undefined): Promise<any[]> {
    return await PayrollRepository.create([payroll], { session })
  }
}

export default new CreatePayrollFlowItem
