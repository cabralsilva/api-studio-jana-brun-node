import { ClassroomRepository } from "../../../model/schema/Classroom"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await ClassroomRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
