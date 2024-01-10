import mongoose, { Date } from 'mongoose'
import Genre from '../enum/Genre'
import TypeOfPerson from '../enum/TypeOfPerson'
import Search from '../Search'
import { AddressModel } from './address/Address'
import { SearchFlow } from 'c2-mongoose'
import { isEmpty, isNotEmpty } from 'c2-mongoose/dist/utils/Utils'

export interface IPerson {
  name: string
  tradeName: string
  socialId: string
  documentNumber: string
  bornDate: Date
  genre: string
  type: string
  address: any
}

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

export class PersonSearch extends SearchFlow {
  constructor(params: any) {
    super(params)
    
    this.buildFilters()
  }

  buildFilters() {
    let filters = this.buildDefaultFilters(this)

    if (isEmpty(filters.$and)) {
      filters = { $and: [] } as any
    }

    if (isNotEmpty(this.searchText)) {
      let regex = this.buildRegex(this.searchText)
      let condition = {
        $or: [
          { 'name': { $regex: regex } },
          { 'tradeName': { $regex: regex } }
        ]
      }
      filters.$and.push(condition)
    }

    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

class PersonSearchOLD extends Search {
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

export { Person, PersonModel, PersonRepository, PersonSearchOLD }
