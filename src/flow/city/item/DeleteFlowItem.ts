import { CityRepository } from "../../../model/schema/address/City"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await CityRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
