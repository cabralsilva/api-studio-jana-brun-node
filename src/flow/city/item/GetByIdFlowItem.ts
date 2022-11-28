import { CityRepository } from "../../../model/schema/address/City"

class GetByIdFlowItem {
  async get(id: string, pop = "", sel = "") {
    return await CityRepository.findById(id).populate(pop).select(sel)
  }
}

export default new GetByIdFlowItem
