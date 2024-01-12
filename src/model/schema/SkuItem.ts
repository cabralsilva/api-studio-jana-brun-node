import * as mongoose from 'mongoose'
import { IProduct } from './IProduct'

export interface ISkuItem {
  product: mongoose.Types.ObjectId | IProduct
  gratesItems: any[]
  quantity: number
  unitValue: number
  totalValue: number
}

const SkuItemModel = {
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
  gratesItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'grateItem', required: true }],
  quantity: { type: Number, required: true, default: 1 },
  unitValue: { type: Number, required: true },
  totalValue: { type: Number, required: true }
}

// const SkuItem = new mongoose.Schema(SkuItemModel)

// class SupplierSearch extends Search {
//   name: { type: String }
//   active: { type: Boolean }

//   constructor(_query) {
//     super(_query)
//     this.name = _query.name
//     this.active = _query.active
//     this.buildFilters()
//   }

//   buildFilters() {
//     let filters = { $and: [] } as any
//     Object.entries(this).forEach(([key, value]) => {
//       if (value) {
//         let condition = {}
//         if (key === 'searchText' as any) {
//           this.searchText = this.diacriticSensitiveRegex(this.searchText)
//           condition = {
//             $or: [
//               { 'person.name': { $regex: this.searchText as any, $options: 'i' } }
//             ]
//           }
//         } else {
//           condition[key] = value
//         }
//         filters.$and.push(condition)
//       }
//     })
//     if (filters.$and.length === 0)
//       delete filters['$and']
//     this.filters = filters
//   }
// }

// const SupplierRepository = mongoose.model('supplier', Supplier)

export { SkuItemModel }

