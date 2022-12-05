import * as mongoose from 'mongoose'
import Search from '../Search'
import { PriceTableItem } from './PriceTableItem'

const PriceTableModel = {
  description: { type: String, required: true },
  beginDateTime: { type: Date, required: true },
  endDateTime: { type: Date },
  items: [PriceTableItem]
}

const PriceTable = new mongoose.Schema(PriceTableModel, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

class PriceTableSearch extends Search {
  code: { type: String }
  description: { type: String }
  category: { type: String }
  active: { type: Boolean }

  constructor(_query) {
    super(_query)
    this.code = _query.code
    this.description = _query.description
    this.category = _query.category
    this.active = _query.active
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
              { 'code': { $regex: this.searchText as any, $options: 'i' } },
              { 'description': { $regex: this.searchText as any, $options: 'i' } },
              { 'category': { $regex: this.searchText as any, $options: 'i' } }
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

const PriceTableRepository = mongoose.model('priceTable', PriceTable)

export { PriceTable, PriceTableModel, PriceTableRepository, PriceTableSearch }

