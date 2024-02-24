import { GrateRepository } from "../../../model/schema/IGrate";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, grate: {}, session = undefined) {
    const grateAfter = await GrateRepository.findByIdAndUpdate(id, { $set: grate }, { returnDocument: 'after', session })

    if (Utils.isEmpty(grateAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return grateAfter
  }
}

export default new UpdateFlowItem
