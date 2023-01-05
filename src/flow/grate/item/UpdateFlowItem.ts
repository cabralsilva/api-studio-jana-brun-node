import { GrateRepository } from "../../../model/schema/Grate";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, grate: {}, session = undefined) {
    const grateAfter = await GrateRepository.findByIdAndUpdate(id, { $set: grate }, { returnDocument: 'after', session })

    if (Utils.isEmpty(grateAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return grateAfter
  }
}

export default new UpdateFlowItem
