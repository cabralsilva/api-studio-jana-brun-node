import { StudentRepository } from "../../../model/schema/IStudent";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, student: {}, session = undefined) {
    const studentAfter = await StudentRepository.findByIdAndUpdate(id, { $set: student }, { returnDocument: 'after', session })

    if (Utils.isEmpty(studentAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return studentAfter
  }
}

export default new UpdateFlowItem
