import { NoticeRepository } from "../../../model/schema/Notice"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await NoticeRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
