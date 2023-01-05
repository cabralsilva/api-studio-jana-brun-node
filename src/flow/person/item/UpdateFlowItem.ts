import { PersonRepository } from "../../../model/schema/Person";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, person: {}, session = undefined) {
    const personAfter = await PersonRepository.findByIdAndUpdate(id, { $set: person }, { returnDocument: 'after', session })

    if (Utils.isEmpty(personAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return personAfter
  }
}

export default new UpdateFlowItem
