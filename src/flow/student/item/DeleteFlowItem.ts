import { StudentRepository } from "../../../model/schema/Student"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await StudentRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
