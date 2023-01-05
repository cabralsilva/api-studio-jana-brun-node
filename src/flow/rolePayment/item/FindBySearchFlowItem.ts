import { RolePaymentRepository, RolePaymentSearch } from "../../../model/schema/RolePayment"

class FindByFilterFlowItem {
  async find(search: RolePaymentSearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(RolePaymentRepository)
    }

    return await search.findNoPageable(RolePaymentRepository)
  }
}

export default new FindByFilterFlowItem
