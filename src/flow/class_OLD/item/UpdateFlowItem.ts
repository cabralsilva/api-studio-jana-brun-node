import { ClassRepository } from "../../../model/schema/IClass";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, clazz: {}, session = undefined) {
    const clazzAfter = await ClassRepository.findByIdAndUpdate(id, { $set: clazz }, { returnDocument: 'after', session })

    if (Utils.isEmpty(clazzAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return clazzAfter
  }
}

export default new UpdateFlowItem
