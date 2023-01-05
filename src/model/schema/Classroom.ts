import * as mongoose from 'mongoose'
import Search from '../Search'

const ClassroomModel = {
  description: { type: String, required: true },
  active: { type: Boolean, required: true, default: true }
}

const Classroom = new mongoose.Schema(ClassroomModel)

class ClassroomSearch extends Search {
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

const ClassroomRepository = mongoose.model('classroom', Classroom)

export { Classroom, ClassroomModel, ClassroomRepository, ClassroomSearch }

