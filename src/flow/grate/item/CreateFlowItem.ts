import { GrateRepository } from "../../../model/schema/Grate"

class CreateFlowItem {
  async create(grate: {}, session = undefined) {
    return await GrateRepository.create([grate], { session })
  }
}

export default new CreateFlowItem
