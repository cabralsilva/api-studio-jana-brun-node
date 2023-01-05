import { GrateItemRepository } from "../../../model/schema/GrateItem"

class CreateFlowItem {
  async create(grateItem: {}, session = undefined) {
    return await GrateItemRepository.create([grateItem], { session })
  }
}

export default new CreateFlowItem
