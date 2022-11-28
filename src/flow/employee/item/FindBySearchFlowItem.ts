import { EmployeeRepository, EmployeeSearch } from "../../../model/schema/Employee"

class FindByFilterFlowItem {
  async find(search: EmployeeSearch) {
    const filters = search.filters()
    if (search.isPageable()) {
      return await search.findPageable(EmployeeRepository, filters)
    }

    return await search.findNoPageable(EmployeeRepository, filters)
  }
}

export default new FindByFilterFlowItem
