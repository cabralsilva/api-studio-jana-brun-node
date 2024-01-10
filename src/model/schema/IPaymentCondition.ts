import * as mongoose from 'mongoose'
import Search from '../Search'

export interface IPaymentCondition {
  description: string
  quantityInstallments: number
  active: boolean
}

const PaymentConditionModel = {
  description: { type: String, required: true },
  quantityInstallments: { type: Number, default: 1, required: true },
  active: { type: Boolean, required: true, default: true }
}

const PaymentCondition = new mongoose.Schema(PaymentConditionModel)

PaymentCondition.index({ description: 1 }, { unique: true })

class PaymentConditionSearch extends Search {
  description: { type: String }
  active: { type: Boolean }

  constructor(_query) {
    super(_query)
    this.description = _query.description
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
              { 'description': { $regex: this.searchText as any, $options: 'i' } }
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

const PaymentConditionRepository = mongoose.model('paymentCondition', PaymentCondition)

export { PaymentCondition, PaymentConditionModel, PaymentConditionRepository, PaymentConditionSearch }

