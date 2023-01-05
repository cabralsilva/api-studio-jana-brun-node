import { FinancialRepository } from "../../../../model/schema/Financial";
import StringUtils from "../../../../utils/StringUtils";
import Utils from "../../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, financial: {}, session = undefined) {
    const financialAfter = await FinancialRepository.findByIdAndUpdate(id, { $set: financial }, { returnDocument: 'after', session })

    if (Utils.isEmpty(financialAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return financialAfter
  }
}

export default new UpdateFlowItem
