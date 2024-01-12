import { FinancialRepository } from "../../../../model/schema/IFinancial";
import { getMessage } from "../../../../config/i18n";
import Utils from "../../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, financial: {}, session = undefined) {
    const financialAfter = await FinancialRepository.findByIdAndUpdate(id, { $set: financial }, { returnDocument: 'after', session })

    if (Utils.isEmpty(financialAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return financialAfter
  }
}

export default new UpdateFlowItem
