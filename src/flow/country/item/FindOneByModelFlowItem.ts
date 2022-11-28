import { CountryRepository } from "../../../model/schema/address/Country"

class FindOneByModelFlowItem {
  async findOne(model, sort = undefined) {
    return await CountryRepository.findOne(model)
      .sort(sort)
  }
}

export default new FindOneByModelFlowItem
