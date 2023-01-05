import { CountryRepository } from "../../../model/schema/address/Country"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await CountryRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
