import { CountryRepository } from "../../../model/schema/address/Country"

class CountByFilterFlowItem {
  async count(filters: any) {
    return await CountryRepository.countDocuments(filters).exec()
  }
}

export default new CountByFilterFlowItem
