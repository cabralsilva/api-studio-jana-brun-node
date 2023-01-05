import { NoticeRepository } from "../../../model/schema/Notice"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await NoticeRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
