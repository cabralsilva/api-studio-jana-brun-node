import * as mongoose from 'mongoose'
import StatusOfPayroll from '../enum/StatusOfPayroll'
import Search from '../Search'
import { EmployeeModel } from './Employee'

const PayrollDetailModel = {
  description: { type: String, required: true },
  employee: {
    _id: { type: String, required: true },
    name: { type: String, required: true }
  },
  baseValue: { type: Number, required: true },
  variableValue: { type: Number, required: true },
  finalValue: { type: Number, required: true }
}

const PayrollModel = {
  description: { type: String, required: true },
  initDate: { type: String, required: true },
  endDate: { type: String, required: true },
  targetDate: { type: String, required: true },
  regularPayroll: { type: Boolean, default: true },
  status: { type: String, enum: Object.keys(StatusOfPayroll), required: true, default: 'OPENED' },
  payrollDetails: [PayrollDetailModel]
}

const PayrollPreProcessRequest = {
  ...PayrollModel,
  employees: [EmployeeModel as any]
}

const Payroll = new mongoose.Schema(PayrollModel)

class PayrollSearch extends Search {

  constructor(_query) {
    super(_query)
    this.buildFilters()
  }

  buildFilters() {
    let filters = { $and: [] } as any
    Object.entries(this).forEach(([key, value]) => {
      if (['order', 'orderBy', 'properties', 'populate', 'page', 'limit'].includes(key)) {
        return
      }

      if (value) {
        let condition = {}
        if (key === 'searchText' as any) {
          this.searchText = this.diacriticSensitiveRegex(this.searchText)
          condition = {
            $or: [
              { 'description': { $regex: this.searchText as any, $options: 'i' } },
              { 'payrollDetails.employee.name': { $regex: this.searchText as any, $options: 'i' } }
            ]
          }
        } else {
          if (!Array.isArray(value)) {
            condition[key] = value
          } else {
            condition[key] = { $in: value }
          }
        }
        filters.$and.push(condition)
      }
    })
    if (filters.$and.length === 0)
      delete filters['$and']
    this.filters = filters
  }
}

const PayrollRepository = mongoose.model('payroll', Payroll)

export { Payroll, PayrollModel, PayrollDetailModel, PayrollPreProcessRequest, PayrollRepository, PayrollSearch }

