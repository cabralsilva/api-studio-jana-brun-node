import { PersonRepository } from "../../../model/schema/IPerson"

class CreateFlowItem {
  async create(person: {}, session = undefined): Promise<any> {
    return await PersonRepository.create([person], { session })
  }
}

export default new CreateFlowItem
