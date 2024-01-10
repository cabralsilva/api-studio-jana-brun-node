import { MatriculationRepository } from "../../../model/schema/Matriculation";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, matriculation: {}, session = undefined) {
    const matriculationAfter = await MatriculationRepository.findByIdAndUpdate(id, { $set: matriculation }, { returnDocument: 'after', session })

    if (Utils.isEmpty(matriculationAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return matriculationAfter
  }
}

export default new UpdateFlowItem
