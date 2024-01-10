import { GrateItemRepository } from "../../../model/schema/GrateItem";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, grateItem: {}, session = undefined) {
    const grateItemAfter = await GrateItemRepository.findByIdAndUpdate(id, { $set: grateItem }, { returnDocument: 'after', session })

    if (Utils.isEmpty(grateItemAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return grateItemAfter
  }
}

export default new UpdateFlowItem
