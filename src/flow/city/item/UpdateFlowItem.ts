import { CityRepository } from "../../../model/schema/address/City";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, city: {}, session = undefined) {
    const cityAfter = await CityRepository.findByIdAndUpdate(id, { $set: city }, { returnDocument: 'after', session })

    if (Utils.isEmpty(cityAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return cityAfter
  }
}

export default new UpdateFlowItem
