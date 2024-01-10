import { ClassroomRepository } from "../../../model/schema/Classroom";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, classroom: {}, session = undefined) {
    const classroomAfter = await ClassroomRepository.findByIdAndUpdate(id, { $set: classroom }, { returnDocument: 'after', session })

    if (Utils.isEmpty(classroomAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return classroomAfter
  }
}

export default new UpdateFlowItem
