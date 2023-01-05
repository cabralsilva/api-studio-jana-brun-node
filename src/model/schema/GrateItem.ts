import * as mongoose from 'mongoose'
import Search from '../Search'

const GrateItemModel = {
  value: { type: String, required: true },
  active: { type: Boolean, required: true, default: true }
}
const GrateItem = new mongoose.Schema(GrateItemModel)

class GrateItemSearch extends Search {
  value: { type: String }
  active: { type: Boolean }

  constructor(_query) {
    super(_query)
    this.value = _query.value
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
              { 'value': { $regex: this.searchText as any, $options: 'i' } }
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
    console.log(this.filters)
  }
}

const GrateItemRepository = mongoose.model('grateItem', GrateItem)

export { GrateItemModel, GrateItem, GrateItemRepository, GrateItemSearch }

