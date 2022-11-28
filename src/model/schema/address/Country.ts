import * as mongoose from 'mongoose'
import Search from '../../Search'

const Country = new mongoose.Schema({
  code: { type: String},
  name: { type: String, required: true },
  ddi: { type: String },
  language: { type: String, required: true },
  abbreviation: { type: String, required: true }
})

Country.index({ code: 1 }, { unique: true })
Country.index({ name: 1 }, { unique: true })
Country.index({ ddi: 1 }, { unique: true })
Country.index({ abbreviation: 1 }, { unique: true })

class CountrySearch extends Search {
  name: { type: String }
  active: { type: Boolean }

  constructor(_query) {
    super(_query)
    this.name = _query.name
    this.active = _query.active
  }

  filters() {
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
    return filters
  }
}

const CountryRepository = mongoose.model('country', Country)

export { Country, CountryRepository, CountrySearch }