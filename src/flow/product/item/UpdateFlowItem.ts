import { ProductRepository } from "../../../model/schema/Product";
import StringUtils from "../../../utils/StringUtils";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, product: {}, session = undefined) {
    const productAfter = await ProductRepository.findByIdAndUpdate(id, { $set: product }, { returnDocument: 'after', session })

    if (Utils.isEmpty(productAfter)) {
      throw Error(StringUtils.message("message.registerNotFounded"))
    }
    return productAfter
  }
}

export default new UpdateFlowItem
