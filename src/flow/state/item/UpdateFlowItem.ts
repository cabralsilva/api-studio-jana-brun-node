import { StateRepository } from "../../../model/schema/address/State";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, state: {}, session = undefined) {
    const stateAfter = await StateRepository.findByIdAndUpdate(id, { $set: state }, { returnDocument: 'after', session })

    if (Utils.isEmpty(stateAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return stateAfter
  }
}

export default new UpdateFlowItem
