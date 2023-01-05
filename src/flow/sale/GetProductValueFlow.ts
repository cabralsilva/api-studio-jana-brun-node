import mongoose from 'mongoose'
import FlowHttp from '../../model/FlowHttp'
import { PriceTableSearch } from '../../model/schema/PriceTable'
import FindPriceTableFlowItem from '../priceTable/item/FindBySearchFlowItem'

class GetProductValueFlow extends FlowHttp {

  async get(req, res) {
    try {

      mongoose.set('debug', true)
      var priceTable = await FindPriceTableFlowItem.find(new PriceTableSearch(
        {
          effectiveDate: new Date()
        }
      )) as any
      mongoose.set('debug', false)
      return priceTable
    } catch (error) {
      this.processError(error)
    }
  }
}
export default new GetProductValueFlow
