import { StudentRepository } from "../../../model/schema/IStudent"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await StudentRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
