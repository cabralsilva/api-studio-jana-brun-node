import { NoticeRepository } from "../../../model/schema/Notice"

class CreateFlowItem {
  async create(notice: {}, session = undefined) {
    return await NoticeRepository.create([notice], { session })
  }
}

export default new CreateFlowItem
