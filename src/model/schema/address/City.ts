import * as mongoose from 'mongoose'
import Search from '../../Search'

const City = new mongoose.Schema({
  code: { type: String },
  name: { type: String, required: true },
  abbreviation: { type: String },
  state: { type: mongoose.Schema.Types.ObjectId, ref: 'state', required: true }
})

City.index({ code: 1 }, { unique: true })
City.index({ name: 1 }, { unique: true })
City.index({ abbreviation: 1 }, { unique: true })

class CitySearch extends Search {
  name: { type: String }
  active: { type: Boolean }
  state: mongoose.Types.ObjectId

  constructor(_query) {
    super(_query)
    this.name = _query.name
    this.active = _query.active
    this.state = _query.state ? new mongoose.Types.ObjectId(_query.state) : null
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

const CityRepository = mongoose.model('city', City)

export { City, CityRepository, CitySearch }