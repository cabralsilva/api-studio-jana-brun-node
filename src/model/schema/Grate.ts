import * as mongoose from 'mongoose'
import TypeOfValue from '../enum/TypeOfValue'
import Search from '../Search'

const GrateModel = {
  description: { type: String, required: true },
  typeOfValue: { type: String, enum: Object.keys(TypeOfValue), required: true, default: 'NUMBER' },
  items: [String],
  active: { type: Boolean, required: true, default: true }
}

const Grate = new mongoose.Schema(GrateModel)

Grate.index({ description: 1 }, { unique: true })

class GrateSearch extends Search {
  description: { type: String }
  typeOfValue: { type: String }
  active: { type: Boolean }

  constructor(_query) {
    super(_query)
    this.description = _query.description
    this.typeOfValue = _query.typeOfValue
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
              { 'description': { $regex: this.searchText as any, $options: 'i' } },
              { 'typeOfValue': { $regex: this.searchText as any, $options: 'i' } }
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

const GrateRepository = mongoose.model('grate', Grate)

export { Grate, GrateModel, GrateRepository, GrateSearch }

