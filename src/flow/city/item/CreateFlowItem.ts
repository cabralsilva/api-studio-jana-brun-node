import { CityRepository } from "../../../model/schema/address/City"

class CreateFlowItem {
  async create(city: {}, session = undefined) {
    return await CityRepository.create([city], { session })
  }
}

export default new CreateFlowItem
