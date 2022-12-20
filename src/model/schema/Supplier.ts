import * as mongoose from 'mongoose'
import TypeOfSupplier from '../enum/TypeOfSupplier'
import Search from '../Search'

const SupplierModel = {
  person: { type: mongoose.Schema.Types.ObjectId, ref: 'person', required: true },
  email: { type: String, required: true },
  phone1: { type: String, required: true },
  phone2: { type: String },
  type: { type: String, enum: Object.keys(TypeOfSupplier), required: true, default: 'OTHER' },
  active: { type: Boolean, required: true, default: true }
}

const Supplier = new mongoose.Schema(SupplierModel)

Supplier.index({ "person.socialId": 1 }, { unique: true })

class SupplierSearch extends Search {
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
              { 'person.name': { $regex: this.searchText as any, $options: 'i' } }
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

const SupplierRepository = mongoose.model('supplier', Supplier)

export { Supplier, SupplierModel, SupplierRepository, SupplierSearch }

