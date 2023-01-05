import { NoticeRepository } from "../../../model/schema/Notice"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await NoticeRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
