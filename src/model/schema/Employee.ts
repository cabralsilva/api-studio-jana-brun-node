import * as mongoose from 'mongoose'
import Utils from '../../utils/Utils'
import AccessProfile from '../enum/AccessProfile'
import Job from '../enum/Job'
import TypeOfSalary from '../enum/TypeOfSalary'
import Search from '../Search'

const Employee = new mongoose.Schema({
  person: { type: mongoose.Schema.Types.ObjectId, ref: 'person', required: true },
  medicinContinuous: { type: Boolean, required: true, default: false },
  medicinNotes: { type: String },
  allergiesContinuous: { type: Boolean, required: true, default: false },
  allergiesNotes: { type: String },
  email: { type: String, required: true },
  phone1: { type: String, required: true },
  phone2: { type: String },
  instagram: { type: String },
  facebook: { type: String },
  active: { type: Boolean, required: true, default: true },
  job: { type: String, enum: Object.keys(Job), required: true, default: 'NATURAL' },
  typeOfSalary: { type: String, enum: Object.keys(TypeOfSalary), required: true, default: 'BY_MONTH' },
  salaryValue: { type: Number, required: true, default: 0 },
  admissionDate: { type: Date },
  demissionDate: { type: Date },
  accessProfile: { type: String, enum: Object.keys(AccessProfile), required: true, default: 'BASIC' },
  password: { type: String },
  salt: { type: String }
})

Employee.index({ email: 1 }, { unique: true })

class EmployeeSearch extends Search {
  name: { type: String }
  active: { type: Boolean }
  person: mongoose.Types.ObjectId[]

  constructor(_query) {
    super(_query)
    this.name = _query.name
    this.active = _query.active
    if (Utils.isNotEmpty(_query.person)) {
      var personArray = _query.person.trim().split(' ')
      this.person = personArray.map(p => new mongoose.Types.ObjectId(p))
    }
    this.buildFilters()
  }

  buildFilters() {
    let filters = { $and: [] } as any
    Object.entries(this).forEach(([key, value]) => {
      if (value) {
        let condition = {}
        if (key === 'person') {
          condition[key] = { $in: value }
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

const EmployeeRepository = mongoose.model('employee', Employee)

export { Employee, EmployeeRepository, EmployeeSearch }

