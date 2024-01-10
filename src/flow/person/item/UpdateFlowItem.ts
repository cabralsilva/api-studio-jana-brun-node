import { PersonRepository } from "../../../model/schema/IPerson";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, person: {}, session = undefined) {
    const personAfter = await PersonRepository.findByIdAndUpdate(id, { $set: person }, { returnDocument: 'after', session })

    if (Utils.isEmpty(personAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return personAfter
  }
}

export default new UpdateFlowItem
