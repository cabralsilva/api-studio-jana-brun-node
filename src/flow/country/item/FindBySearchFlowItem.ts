import { CountryRepository, CountrySearch } from "../../../model/schema/address/Country"

class FindByFilterFlowItem {
  async find(search: CountrySearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(CountryRepository)
    }

    return await search.findNoPageable(CountryRepository)
  }
}

export default new FindByFilterFlowItem
