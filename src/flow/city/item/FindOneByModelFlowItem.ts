import { CityRepository } from "../../../model/schema/address/City"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await CityRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
