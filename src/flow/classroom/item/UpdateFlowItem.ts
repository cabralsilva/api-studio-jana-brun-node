import { ClassroomRepository } from "../../../model/schema/Classroom";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, classroom: {}, session = undefined) {
    const classroomAfter = await ClassroomRepository.findByIdAndUpdate(id, { $set: classroom }, { returnDocument: 'after', session })

    if (Utils.isEmpty(classroomAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return classroomAfter
  }
}

export default new UpdateFlowItem
