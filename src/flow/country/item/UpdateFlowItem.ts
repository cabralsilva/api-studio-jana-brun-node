import { CountryRepository } from "../../../model/schema/address/Country";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, country: {}, session = undefined) {
    const countryAfter = await CountryRepository.findByIdAndUpdate(id, { $set: country }, { returnDocument: 'after', session })

    if (Utils.isEmpty(countryAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return countryAfter
  }
}

export default new UpdateFlowItem
