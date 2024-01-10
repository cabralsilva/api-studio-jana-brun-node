import { SupplierRepository } from "../../../model/schema/Supplier";
import { getMessage } from "../../../config/i18n";
import Utils from "../../../utils/Utils";

class UpdateFlowItem {
  async update(id: string, supplier: {}, session = undefined) {
    const supplierAfter = await SupplierRepository.findByIdAndUpdate(id, { $set: supplier }, { returnDocument: 'after', session })

    if (Utils.isEmpty(supplierAfter)) {
      throw Error(getMessage("message.registerNotFounded"))
    }
    return supplierAfter
  }
}

export default new UpdateFlowItem
