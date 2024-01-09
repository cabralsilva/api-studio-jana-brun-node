import { StudentRepository } from "../../../model/schema/IStudent"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await StudentRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
