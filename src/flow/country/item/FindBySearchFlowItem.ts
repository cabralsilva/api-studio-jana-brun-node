import { CountryRepository, CountrySearch } from "../../../model/schema/address/Country"

class FindByFilterFlowItem {
  async find(search: CountrySearch) {
    const filters = search.filters()
    if (search.isPageable()) {
      return await search.findPageable(CountryRepository, filters)
    }

    return await search.findNoPageable(CountryRepository, filters)
  }
}

export default new FindByFilterFlowItem
