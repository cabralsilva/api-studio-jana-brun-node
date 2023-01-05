import * as mongoose from 'mongoose'
import Search from '../../Search'

const State = new mongoose.Schema({
  code: { type: String },
  name: { type: String, required: true },
  timezone: { type: String },
  abbreviation: { type: String, required: true },
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'country', required: true }
})

State.index({ code: 1 }, { unique: true })
State.index({ name: 1 }, { unique: true })
State.index({ abbreviation: 1 }, { unique: true })

class StateSearch extends Search {
  name: { type: String }
  active: { type: Boolean }

  constructor(_query) {
    super(_query)
    this.name = _query.name
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
              { 'name': { $regex: this.searchText as any, $options: 'i' } }
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

const StateRepository = mongoose.model('state', State)

export { State, StateRepository, StateSearch }