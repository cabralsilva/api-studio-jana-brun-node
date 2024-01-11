import { PayrollRepository, PayrollSearchOLD } from "../../../model/schema/IPayroll";

class FindByFilterFlowItem {
  async find(search: PayrollSearchOLD) {

    if (search.isPageable()) {
      return await search.findPageable(PayrollRepository)
    }
''
    return await search.findNoPageable(PayrollRepository)
  }
}

export default new FindByFilterFlowItem
