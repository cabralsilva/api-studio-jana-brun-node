import { CityRepository } from "../../../model/schema/address/City"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await CityRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
