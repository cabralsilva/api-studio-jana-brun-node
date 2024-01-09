import { SearchFlow } from 'c2-mongoose'
import { isEmpty, isNotEmpty } from 'c2-mongoose/dist/utils/Utils'
import * as mongoose from 'mongoose'
import { model } from 'mongoose'
import Category from '../enum/Category'
import { Default } from './Default'

interface IProduct extends Default {
  code: string
  description: string
  category: Category
  grates: []
  active: boolean
}

const ProductSchema = new mongoose.Schema({
  code: { type: String },
  description: { type: String, required: true },
  category: { type: String, enum: Category, required: true, default: Category.OTHERS },
  grates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grate', required: true }],
  active: { type: Boolean, required: true, default: true }
}, {
  timestamps: { createdAt: 'createdAtDateTime', updatedAt: 'updatedAtDateTime' }
})


class ProductSearch extends SearchFlow {
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
          { 'code': { $regex: regex } },
          { 'description': { $regex: regex } },
          { 'category': { $regex: regex } }
        ]
      }
      filters.$and.push(condition)
    }

    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

const ProductRepository = model('product', ProductSchema)

export { IProduct, ProductRepository, ProductSearch }

