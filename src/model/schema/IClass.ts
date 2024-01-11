import moment = require('moment')
import { SearchFlow } from 'c2-mongoose'
import * as mongoose from 'mongoose'
import Utils from '../../utils/Utils'
import Search from '../Search'
import Often from '../enum/Often'
import { IProduct } from './IProduct'
import { IRolePayment, RolePayment } from './RolePayment'
import { isEmpty, isNotEmpty } from 'c2-mongoose/dist/utils/Utils'

export interface IClass {
  description: string
  inviteWhatsAppGroup: string
  beginDate: Date
  endDate: Date
  product: mongoose.Types.ObjectId | IProduct
  rolePayments: IRolePayment[],
  schedulesDetails: [
    {
      classroom: mongoose.Types.ObjectId | any
      beginTime: string
      endTime: string
      often: { type: String, enum: Often, required: true, default: Often.WEEKLY },
      oftenDay: string
    }
  ]
}

const ClassModel = {
  description: { type: String, required: true },
  inviteWhatsAppGroup: { type: String },
  beginDate: { type: Date, required: true },
  endDate: { type: Date },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
  rolePayments: [RolePayment],
  schedulesDetails: [
    {
      classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'classroom', required: true },
      beginTime: { type: String, required: true },
      endTime: { type: String, required: true },
      often: { type: String, enum: Object.keys(Often), required: true, default: 'WEEKLY' },
      oftenDay: { type: String, required: true }
    }
  ]
}

const Class = new mongoose.Schema(ClassModel, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


export class ClassSearch extends SearchFlow {
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

class ClassSearchOLD extends Search {
  model: { type: typeof ClassModel }
  beginDateRange: [moment.Moment, moment.Moment]
  endDateRange: [moment.Moment, moment.Moment]
  employee: [mongoose.Types.ObjectId]

  constructor(_query) {
    super(_query)
    this.model = _query
    if (Utils.isNotEmpty(_query?.endDateRange)) {
      if (!Array.isArray(_query.endDateRange)) {
        _query.endDateRange = _query.endDateRange.toString().split(',')
      }
      this.endDateRange = _query.endDateRange.map(data => moment(data))
    }

    if (Utils.isNotEmpty(_query?.employee)) {
      if (!Array.isArray(_query.employee)) {
        _query.employee = _query.employee.toString().split(',')
      }
      this.employee = _query.employee.map(data => new mongoose.Types.ObjectId(data))
    }
    this.buildFilters()
  }

  buildFilters() {
    let filters = super.getFilters(this)
    if (Utils.isEmpty(filters.$and)) {
      filters = { $and: [] } as any
    }

    if (Utils.isNotEmpty(this.searchText)) {
      this.searchText = this.diacriticSensitiveRegex(this.searchText)
      let condition = {
        $or: [
          { 'description': { $regex: this.searchText as any, $options: 'i' } }
        ]
      }
      filters.$and.push(condition)
    }

    if (Utils.isNotEmpty(this.employee)) {
      let condition = { 'rolePayments.employee': { $in: this.employee || [] } }
      filters.$and.push(condition)
    }


    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

const ClassRepository = mongoose.model('class', Class)

export { Class, ClassModel, ClassRepository, ClassSearchOLD }

