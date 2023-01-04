import moment = require('moment')
import * as mongoose from 'mongoose'
import Utils from '../../utils/Utils'
import PaymentMethod from '../enum/PaymentMethod'
import StatusOfFinancial from '../enum/StatusOfFinancial'
import TypeOfFinancial from '../enum/TypeOfFinancial'
import Search from '../Search'

const FinancialModel = {
  sequence: { type: String, required: true },
  description: { type: String },
  movimentDate: { type: Date, required: true, default: new Date() },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: Object.keys(StatusOfFinancial), required: true, default: "OPENED" },
  type: { type: String, enum: Object.keys(TypeOfFinancial), required: true },
  installment: { type: Number, required: true },
  installmentTotal: { type: Number, required: true },
  value: { type: Number, required: true },
  paymentCondition: { type: mongoose.Schema.Types.ObjectId, ref: 'paymentCondition' },
  person: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
  payments: [{
    movimentDate: { type: Date, required: true, default: new Date() },
    targetDate: { type: Date, required: true },
    valuePaid: { type: Number },
    paymentMethod: { type: String, enum: Object.keys(PaymentMethod), required: true, default: "CASH" }
  }]
}

const Financial = new mongoose.Schema(FinancialModel, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

class FinancialSearch extends Search {
  description: { type: String }
  sequence: { type: String }
  type: []
  name: { type: String }
  dueDateGreaterThan: moment.Moment
  dueDateLessThan: moment.Moment
  movimentDateGreaterThan: moment.Moment
  movimentDateLessThan: moment.Moment
  status: []
  person: mongoose.Types.ObjectId[]

  constructor(_query: any) {
    super(_query)
    this.description = _query.description
    this.sequence = _query.sequence
    this.name = _query.name
    this.movimentDateGreaterThan = Utils.isNotEmpty(_query.movimentDateGreaterThan) ? moment(_query.movimentDateGreaterThan) : undefined
    this.movimentDateLessThan = Utils.isNotEmpty(_query.movimentDateLessThan) ? moment(_query.movimentDateLessThan) : undefined
    this.dueDateGreaterThan = Utils.isNotEmpty(_query.dueDateGreaterThan) ? moment(_query.dueDateGreaterThan) : undefined
    this.dueDateLessThan = Utils.isNotEmpty(_query.dueDateLessThan) ? moment(_query.dueDateLessThan) : undefined
    if (Utils.isNotEmpty(_query.person)) {
      var personArray = _query.person.trim().split(' ')
      this.person = personArray.map(p => new mongoose.Types.ObjectId(p))
    }
    if (Utils.isNotEmpty(_query.status)) {
      this.status = _query.status.trim().split(' ')
    }
    if (Utils.isNotEmpty(_query.type)) {
      this.type = _query.type.trim().split(' ')
    }
    this.buildFilters()
  }

  buildFilters() {
    let filters = { $and: [] } as any
    let rangeDueDate = {} as any
    let rangeMovimentDate = {} as any
    Object.entries(this).forEach(([key, value]) => {
      if (Utils.isNotEmpty(value)) {
        let condition = {}
        if (['order', 'orderBy', 'properties', 'populate', 'page', 'limit'].includes(key)) {
          return
        }

        if (key === 'searchText' as any) {
          this.searchText = this.diacriticSensitiveRegex(this.searchText)
          condition = {
            $or: [
              { 'description': { $regex: this.searchText as any, $options: 'i' } },
              { 'sequence': { $regex: this.searchText as any, $options: 'i' } },
              { 'status': { $regex: this.searchText as any, $options: 'i' } },
              { 'type': { $regex: this.searchText as any, $options: 'i' } },
              { 'person': { $in: this.person || [] } }
            ]
          }
          filters.$and.push(condition)
        } else {
          if (key === 'dueDateGreaterThan' && value) {
            rangeDueDate['$gte'] = new Date(value)
            filters.$and.push(condition)
          } else if (key === 'dueDateLessThan' && value) {
            rangeDueDate['$lte'] = new Date(value)
            filters.$and.push(condition)
          } else if (key === 'movimentDateGreaterThan' && value) {
            rangeMovimentDate['$gte'] = new Date(value)
            filters.$and.push(condition)
          } else if (key === 'movimentDateLessThan' && value) {
            rangeMovimentDate['$lte'] = new Date(value)
            filters.$and.push(condition)
          } else {
            if (!Array.isArray(value)) {
              condition[key] = value
            } else {
              condition[key] = { $in: value }
            }
            filters.$and.push(condition)
          }
        }
      }
    })
    if (Utils.isNotEmpty(rangeDueDate.$gte) || Utils.isNotEmpty(rangeDueDate.$lte)) {
      filters.$and.push({ dueDate: rangeDueDate })
    }
    if (Utils.isNotEmpty(rangeMovimentDate.$gte) || Utils.isNotEmpty(rangeMovimentDate.$lte)) {
      filters.$and.push({ movimentDate: rangeMovimentDate })
    }
    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

const FinancialRepository = mongoose.model('financial', Financial)

export { Financial, FinancialModel, FinancialRepository, FinancialSearch }
