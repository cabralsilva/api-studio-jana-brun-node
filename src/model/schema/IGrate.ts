import { SearchFlow } from 'c2-mongoose'
import { isEmpty, isNotEmpty } from 'c2-mongoose/dist/utils/Utils'
import * as mongoose from 'mongoose'
import { Types } from 'mongoose'
import TypeOfValue from '../enum/TypeOfValue'
import { IDefault } from './IDefault'

export interface IGrateItem {
  _id?: Types.ObjectId
  value: string
  active: boolean
}

export interface IGrate extends IDefault {
  description: string
  typeOfValue: TypeOfValue
  items: IGrateItem[]
  active: boolean
}

const GrateModel = {
  description: { type: String, required: true },
  typeOfValue: { type: String, enum: Object.keys(TypeOfValue), required: true, default: 'NUMBER' },
  items: {
    type: [{
      value: { type: String, required: true },
      active: { type: Boolean, required: true, default: true }
    }]
  },
  active: { type: Boolean, required: true, default: true }
}

const Grate = new mongoose.Schema(GrateModel, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

// class GrateSearchOLD extends Search {
//   description: { type: String }
//   sequence: { type: String }
//   type: []
//   name: { type: String }
//   dueDateGreaterThan: moment.Moment
//   dueDateLessThan: moment.Moment
//   movimentDateGreaterThan: moment.Moment
//   movimentDateLessThan: moment.Moment
//   status: []
//   person: mongoose.Types.ObjectId[]

//   constructor(_query: any) {
//     super(_query)
//     this.description = _query.description
//     this.sequence = _query.sequence
//     this.name = _query.name
//     this.movimentDateGreaterThan = Utils.isNotEmpty(_query.movimentDateGreaterThan) ? moment(_query.movimentDateGreaterThan) : undefined
//     this.movimentDateLessThan = Utils.isNotEmpty(_query.movimentDateLessThan) ? moment(_query.movimentDateLessThan) : undefined
//     this.dueDateGreaterThan = Utils.isNotEmpty(_query.dueDateGreaterThan) ? moment(_query.dueDateGreaterThan) : undefined
//     this.dueDateLessThan = Utils.isNotEmpty(_query.dueDateLessThan) ? moment(_query.dueDateLessThan) : undefined
//     if (Utils.isNotEmpty(_query.person)) {
//       var personArray = _query.person.trim().split(' ')
//       this.person = personArray.map(p => new mongoose.Types.ObjectId(p))
//     }
//     if (Utils.isNotEmpty(_query.status)) {
//       this.status = _query.status.trim().split(' ')
//     }
//     if (Utils.isNotEmpty(_query.type)) {
//       this.type = _query.type.trim().split(' ')
//     }
//     this.buildFilters()
//   }

//   buildFilters() {
//     let filters = { $and: [] } as any
//     let rangeDueDate = {} as any
//     let rangeMovimentDate = {} as any
//     Object.entries(this).forEach(([key, value]) => {
//       if (Utils.isNotEmpty(value)) {
//         let condition = {}
//         if (['order', 'orderBy', 'properties', 'populate', 'page', 'limit'].includes(key)) {
//           return
//         }

//         if (key === 'searchText' as any) {
//           this.searchText = this.diacriticSensitiveRegex(this.searchText)
//           condition = {
//             $or: [
//               { 'description': { $regex: this.searchText as any, $options: 'i' } },
//               { 'sequence': { $regex: this.searchText as any, $options: 'i' } },
//               { 'status': { $regex: this.searchText as any, $options: 'i' } },
//               { 'type': { $regex: this.searchText as any, $options: 'i' } },
//               { 'person': { $in: this.person || [] } }
//             ]
//           }
//           filters.$and.push(condition)
//         } else {
//           if (key === 'dueDateGreaterThan' && value) {
//             rangeDueDate['$gte'] = new Date(value)
//             filters.$and.push(condition)
//           } else if (key === 'dueDateLessThan' && value) {
//             rangeDueDate['$lte'] = new Date(value)
//             filters.$and.push(condition)
//           } else if (key === 'movimentDateGreaterThan' && value) {
//             rangeMovimentDate['$gte'] = new Date(value)
//             filters.$and.push(condition)
//           } else if (key === 'movimentDateLessThan' && value) {
//             rangeMovimentDate['$lte'] = new Date(value)
//             filters.$and.push(condition)
//           } else {
//             if (!Array.isArray(value)) {
//               condition[key] = value
//             } else {
//               condition[key] = { $in: value }
//             }
//             filters.$and.push(condition)
//           }
//         }
//       }
//     })
//     if (Utils.isNotEmpty(rangeDueDate.$gte) || Utils.isNotEmpty(rangeDueDate.$lte)) {
//       filters.$and.push({ dueDate: rangeDueDate })
//     }
//     if (Utils.isNotEmpty(rangeMovimentDate.$gte) || Utils.isNotEmpty(rangeMovimentDate.$lte)) {
//       filters.$and.push({ movimentDate: rangeMovimentDate })
//     }
//     if (filters.$and.length === 0)
//       delete filters['$and']
//     this.filters = filters
//   }
// }

class GrateSearch extends SearchFlow {
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
          { 'description': { $regex: regex } },
          { 'sequence': { $regex: regex } },
          { 'status': { $regex: regex } },
          { 'type': { $regex: regex } },
        ]
      }
      filters.$and.push(condition)
    }

    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

const GrateRepository = mongoose.model('grate', Grate)

export { Grate, GrateModel, GrateRepository, GrateSearch }
