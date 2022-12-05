import { ClassRepository } from "../../../model/schema/Class"

class CreateFlowItem {
  async create(clazz: {}, session = undefined) {
    return await ClassRepository.create([clazz], { session })
  }
}

export default new CreateFlowItem
