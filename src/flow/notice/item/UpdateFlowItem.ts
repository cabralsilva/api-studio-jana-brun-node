import { NoticeRepository } from "../../../model/schema/Notice";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, notice: {}, session = undefined) {
    const noticeAfter = await NoticeRepository.findByIdAndUpdate(id, { $set: notice }, { returnDocument: 'after', session })

    if (Utils.isEmpty(noticeAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return noticeAfter
  }
}

export default new UpdateFlowItem
