import mongoose from 'mongoose'
import Genre from '../enum/Genre'
import TypeOfPerson from '../enum/TypeOfPerson'
import Search from '../Search'
import { AddressModel } from './address/Address'


const PersonModel = {
  name: { type: String, required: true },
  tradeName: { type: String },
  socialId: { type: String },
  documentNumber: { type: String },
  bornDate: { type: Date },
  genre: { type: String, enum: Object.keys(Genre), required: true, default: 'NSA' },
  type: { type: String, enum: Object.keys(TypeOfPerson), required: true, default: 'NATURAL' },
  address: {type: AddressModel, required: false}
}

const Person = new mongoose.Schema(PersonModel)

class PersonSearch extends Search {
  name: { type: String }
  tradeName: { type: String }

  constructor(_query) {
    super(_query)
    this.name = _query.name
    this.tradeName = _query.tradeName
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
              { 'name': { $regex: this.searchText as any, $options: 'i' } },
              { 'tradeName': { $regex: this.searchText as any, $options: 'i' } }
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

const PersonRepository = mongoose.model('person', Person)

export { Person, PersonModel, PersonRepository, PersonSearch }
