import { StateRepository } from "../../../model/schema/address/State";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, state: {}, session = undefined) {
    const stateAfter = await StateRepository.findByIdAndUpdate(id, { $set: state }, { returnDocument: 'after', session })

    if (Utils.isEmpty(stateAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return stateAfter
  }
}

export default new UpdateFlowItem
