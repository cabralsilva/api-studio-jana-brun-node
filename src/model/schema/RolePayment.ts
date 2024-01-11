import * as mongoose from 'mongoose'
import Search from '../Search'
import TypeOfSalary from '../enum/TypeOfSalary'

export interface IRolePayment {
  employee: mongoose.Types.ObjectId | any
  sinceStudentNumber: number
  untilStudentNumber: number
  typeOfPayment: { type: String, enum: TypeOfSalary, required: true, default: TypeOfSalary.BY_MONTH },
  paymentValue: number
  active: boolean
}

const RolePaymentModel = {
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
  sinceStudentNumber: { type: Number },
  untilStudentNumber: { type: Number },
  typeOfPayment: { type: String, enum: Object.keys(TypeOfSalary), required: true, default: 'BY_MONTH' },
  paymentValue: { type: Number },
  active: { type: Boolean, required: true, default: true }
}

const RolePayment = new mongoose.Schema(RolePaymentModel)


class RolePaymentSearch extends Search {
  name: { type: String }
  typeOfPayment: { type: String }
  active: { type: Boolean }

  constructor(_query) {
    super(_query)
    this.name = _query.name
    this.typeOfPayment = _query.typeOfPayment
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
              { 'employee.person.name': { $regex: this.searchText as any, $options: 'i' } },
              { 'typeOfPayment': { $regex: this.searchText as any, $options: 'i' } }
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

const RolePaymentRepository = mongoose.model('rolePayment', RolePayment)

export { RolePayment, RolePaymentModel, RolePaymentRepository, RolePaymentSearch }

