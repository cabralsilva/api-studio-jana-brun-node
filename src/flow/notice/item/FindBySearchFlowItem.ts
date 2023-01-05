import { NoticeRepository, NoticeSearch } from "../../../model/schema/Notice"

class FindByFilterFlowItem {
  async find(search: NoticeSearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(NoticeRepository)
    }

    return await search.findNoPageable(NoticeRepository)
  }
}

export default new FindByFilterFlowItem
