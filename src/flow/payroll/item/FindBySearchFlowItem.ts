import { PayrollRepository, PayrollSearch } from "../../../model/schema/Payroll";

class FindByFilterFlowItem {
  async find(search: PayrollSearch) {

    if (search.isPageable()) {
      return await search.findPageable(PayrollRepository)
    }
''
    return await search.findNoPageable(PayrollRepository)
  }
}

export default new FindByFilterFlowItem
