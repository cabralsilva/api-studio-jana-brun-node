import { NoticeRepository } from "../../../model/schema/Notice";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, notice: {}, session = undefined) {
    const noticeAfter = await NoticeRepository.findByIdAndUpdate(id, { $set: notice }, { returnDocument: 'after', session })

    if (Utils.isEmpty(noticeAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return noticeAfter
  }
}

export default new UpdateFlowItem
