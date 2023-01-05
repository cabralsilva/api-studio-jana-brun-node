import * as mongoose from 'mongoose'
import Search from '../Search'

const PriceTableItemModel = {
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
  gratesItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grateItem', required: true }],
  price: { type: Number, required: true }
}

const PriceTableItem = new mongoose.Schema(PriceTableItemModel)

class PriceTableItemSearch extends Search {

  constructor(_query) {
    super(_query)
    this.buildFilters()
  }

  buildFilters() {
    let filters = { $and: [] } as any
    Object.entries(this).forEach(([key, value]) => {
      if (value) {
        let condition = {}
        if (key === 'searchText' as any) {
          this.searchText = this.diacriticSensitiveRegex(this.searchText)
          condition = {
            $or: [
            ]
          }
        } else {
          condition[key] = value
        }
        filters.$and.push(condition)
      }
    })
    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

const PriceTableItemRepository = mongoose.model('priceTableItem', PriceTableItem)

export { PriceTableItem, PriceTableItemModel, PriceTableItemRepository, PriceTableItemSearch }

