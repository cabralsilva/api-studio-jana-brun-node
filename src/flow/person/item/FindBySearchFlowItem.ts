import { PersonRepository, PersonSearchOLD } from "../../../model/schema/IPerson"

class FindByFilterFlowItem {
  async find(search: PersonSearchOLD) {
    
    if (search.isPageable()) {
      return await search.findPageable(PersonRepository)
    }

    return await search.findNoPageable(PersonRepository)
  }
}

export default new FindByFilterFlowItem
