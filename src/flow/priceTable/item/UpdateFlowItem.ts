import { PriceTableRepository } from "../../../model/schema/PriceTable";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, priceTable: {}, session = undefined) {
    const priceTableAfter = await PriceTableRepository.findByIdAndUpdate(id, { $set: priceTable }, { returnDocument: 'after', session })

    if (Utils.isEmpty(priceTableAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return priceTableAfter
  }
}

export default new UpdateFlowItem
