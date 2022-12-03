import * as mongoose from 'mongoose'
import Category from '../enum/Category'
import Search from '../Search'

const ProductModel = {
  code: { type: String },
  description: { type: String, required: true },
  unitPrice: { type: Number, default: 1, required: true },
  category: { type: String, enum: Object.keys(Category), required: true, default: 'OTHERS' },
  grates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grate', required: true }],
  active: { type: Boolean, required: true, default: true }
}

const Product = new mongoose.Schema(ProductModel)


class ProductSearch extends Search {
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

const ProductRepository = mongoose.model('product', Product)

export { Product, ProductModel, ProductRepository, ProductSearch }

