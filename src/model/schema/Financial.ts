import * as mongoose from 'mongoose'
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
  status: { type: String }
  type: { type: String }
  name: { type: String }

  constructor(_query) {
    super(_query)
    this.description = _query.description
    this.sequence = _query.sequence
    this.status = _query.status
    this.type = _query.type
    this.name = _query.name
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
              { 'description': { $regex: this.searchText as any, $options: 'i' } },
              { 'sequence': { $regex: this.searchText as any, $options: 'i' } },
              { 'status': { $regex: this.searchText as any, $options: 'i' } },
              { 'type': { $regex: this.searchText as any, $options: 'i' } },
              { 'customer.person.name': { $regex: this.searchText as any, $options: 'i' } },
              { 'supplier.person.name': { $regex: this.searchText as any, $options: 'i' } }
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

const FinancialRepository = mongoose.model('financial', Financial)

export { Financial, FinancialModel, FinancialRepository, FinancialSearch }