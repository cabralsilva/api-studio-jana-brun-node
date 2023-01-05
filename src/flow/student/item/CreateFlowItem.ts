import { StudentRepository } from "../../../model/schema/Student"

class CreateFlowItem {
  async create(student: {}, session = undefined) {
    return await StudentRepository.create([student], { session })
  }
}

export default new CreateFlowItem
