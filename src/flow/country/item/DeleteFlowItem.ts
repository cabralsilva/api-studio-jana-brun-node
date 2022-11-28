import { CountryRepository } from "../../../model/schema/address/Country"

class DeleteFlowItem {
  async delete(id: string, session = undefined) {
    return await CountryRepository.findByIdAndRemove(id, { session })
  }
}

export default new DeleteFlowItem
