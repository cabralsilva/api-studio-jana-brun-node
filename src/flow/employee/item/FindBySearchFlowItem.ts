import { EmployeeRepository, EmployeeSearch } from "../../../model/schema/Employee"

class FindByFilterFlowItem {
  async find(search: EmployeeSearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(EmployeeRepository)
    }

    return await search.findNoPageable(EmployeeRepository)
  }
}

export default new FindByFilterFlowItem