import { ClassroomRepository, ClassroomSearch } from "../../../model/schema/Classroom"

class FindByFilterFlowItem {
  async find(search: ClassroomSearch) {
    
    if (search.isPageable()) {
      return await search.findPageable(ClassroomRepository)
    }

    return await search.findNoPageable(ClassroomRepository)
  }
}

export default new FindByFilterFlowItem
