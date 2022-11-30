import { NoticeRepository } from "../../../model/schema/Notice"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await NoticeRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
