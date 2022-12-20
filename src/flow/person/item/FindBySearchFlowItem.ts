import { PersonRepository, PersonSearch } from "../../../model/schema/Person"

class FindByFilterFlowItem {
  async find(search: PersonSearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(PersonRepository)
    }

    return await search.findNoPageable(PersonRepository)
  }
}

export default new FindByFilterFlowItem
