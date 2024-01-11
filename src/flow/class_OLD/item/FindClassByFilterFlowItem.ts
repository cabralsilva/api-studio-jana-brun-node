import { ClassRepository, ClassSearchOLD } from "../../../model/schema/IClass"

class FindClassByFilterFlowItem {
  async find(search: ClassSearchOLD): Promise<any> {

    if (search.isPageable()) {
      return await search.findPageable(ClassRepository)
    }

    return await search.findNoPageable(ClassRepository)
  }
}

export default new FindClassByFilterFlowItem
