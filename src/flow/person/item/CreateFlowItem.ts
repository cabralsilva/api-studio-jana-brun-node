import { PersonRepository } from "../../../model/schema/Person"

class CreateFlowItem {
  async create(person: {}, session = undefined): Promise<any> {
    return await PersonRepository.create([person], { session })
  }
}

export default new CreateFlowItem
