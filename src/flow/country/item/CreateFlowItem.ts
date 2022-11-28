import { CountryRepository } from "../../../model/schema/address/Country"

class CreateFlowItem {
  async create(country: {}, session = undefined) {
    return await CountryRepository.create([country], { session })
  }
}

export default new CreateFlowItem
