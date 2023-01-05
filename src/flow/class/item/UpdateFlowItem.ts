import { ClassRepository } from "../../../model/schema/Class";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, clazz: {}, session = undefined) {
    const clazzAfter = await ClassRepository.findByIdAndUpdate(id, { $set: clazz }, { returnDocument: 'after', session })

    if (Utils.isEmpty(clazzAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return clazzAfter
  }
}

export default new UpdateFlowItem
