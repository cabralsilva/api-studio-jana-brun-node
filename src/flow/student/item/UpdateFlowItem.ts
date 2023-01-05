import { StudentRepository } from "../../../model/schema/Student";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, student: {}, session = undefined) {
    const studentAfter = await StudentRepository.findByIdAndUpdate(id, { $set: student }, { returnDocument: 'after', session })

    if (Utils.isEmpty(studentAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return studentAfter
  }
}

export default new UpdateFlowItem
