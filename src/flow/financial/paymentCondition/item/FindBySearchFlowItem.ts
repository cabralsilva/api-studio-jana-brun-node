import { PaymentConditionRepository, PaymentConditionSearch } from "../../../../model/schema/PaymentCondition"

class FindByFilterFlowItem {
  async find(search: PaymentConditionSearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(PaymentConditionRepository)
    }

    return await search.findNoPageable(PaymentConditionRepository)
  }
}

export default new FindByFilterFlowItem