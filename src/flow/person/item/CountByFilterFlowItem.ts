import { PersonRepository } from "../../../model/schema/IPerson"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await PersonRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
