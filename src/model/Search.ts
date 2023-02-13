import mongoose from "mongoose"
import { dbCollation } from "../config/Configs"
import Utils from "../utils/Utils"

abstract class Search {
  searchText: string
  order: string
  orderBy: string
  page: number
  limit: number
  properties: string
  populate: string | [] | any
  filters: {}

  constructor(_query) {
    this.searchText = _query.searchText
    this.order = _query.order
    this.orderBy = _query.orderBy
    this.properties = _query.properties
    this.populate = _query.populate
    this.page = parseInt(_query.page)
    this.limit = parseInt(_query.limit)
    this.populateBuild()
  }
  populateBuild(): any {
    if (Utils.isEmpty(this.populate)) {
      return undefined
    }
    var propertiesArray = this.populate.split(' ')
    var populates = [] as any
    for (var property of propertiesArray) {
      let [first, ...rest] = property.split('.')
      let nested = rest.join('.')
      populates.push(this.buildPath(first, nested))
    }

    this.populate = populates
  }

  buildPath(target, nested: string = undefined) {
    var populate = {} as any
    populate.path = target
    if (nested) {
      let [first, ...rest] = nested.split('.')
      let nested2 = rest.join('.')
      populate.populate = this.buildPath(first, nested2)
    }
    return populate
  }

  sorter() {
    let order = {}
    this.orderBy = this.orderBy || "_id" as any
    order[this.orderBy as any] = this.order as any === "desc" ? -1 : 1
    return order
  }

  isPageable() {
    if (this.page) {
      return true
    }

    return false
  }

  diacriticSensitiveRegex(string = '') {
    return string
      .replace(/[a|á|à|ä|â|A|Á|Â|Ã|Ä]/g, '[a,á,à,ä,â,A,Á,Â,Ã,Ä]')
      .replace(/[e|é|ë|è|E|É|Ë|È]/g, '[e,é,ë,è,E,É,Ë,È]')
      .replace(/[i|í|ï|ì|I|Í|Ï|Ì]/g, '[i,í,ï,ì,I,Í,Ï,Ì]')
      .replace(/[o|ó|ö|ò|õ|O|Ó|Ö|Ô|Õ]/g, '[o,ó,ö,ò,õ,O,Ó,Ö,Ô,Õ]')
      .replace(/[u|ü|ú|ù|U|Ú|Ü|Ù]/g, '[u,ü,ú,ù,U,Ú,Ü,Ù]')
      .replace(/[ç|Ç|c|C]/g, '[c,C,ç,Ç]')
  }

  async findPageable(model: mongoose.Model<any>) {
    let page = this.page - 1 || 0
    let limit = this.limit || 10
    const sort = this.sorter()
    var items = await model
      .find(this.filters, this.properties)
      .populate(this.populate)
      .skip(page * limit)
      .limit(limit)
      .sort(sort)
      .collation({
        locale: dbCollation
      }) as []

    return this.result(model, items)
  }

  async findNoPageable(model: mongoose.Model<any>) {
    const sort = this.sorter()
    console.log('search ', this.filters)
    var items = await model
      .find(this.filters, this.properties)
      .populate(this.populate)
      .sort(sort)
      .collation({
        locale: dbCollation
      }) as []

    return this.result(model, items)
  }

  private async result(model: mongoose.Model<any>, items: []) {
    var total = await this.count(model)
    return {
      items,
      total
    }
  }

  async count(model: mongoose.Model<any>) {
    return await model.countDocuments(this.filters).exec()
  }

  async sumBy(model: mongoose.Model<any>, _sum: any, _by: any) {
    const ret = await model.aggregate(
      [
        {
          '$match': this.filters
        },
        {
          $group: {
            _id: _by,
            totalValue: { "$sum": _sum },
            count: { "$sum": 1 }
          }
        }
      ]
    )
    return ret
  }

  getFilters(objectSearch: Object) {
    let filters = { $and: [] } as any
    Object.entries(objectSearch).forEach(([key, value]) => {
      if (Utils.isNotEmpty(value)) {
        let condition = {}
        if (['order', 'orderBy', 'properties', 'populate', 'page', 'limit', 'model', 'searchText'].includes(key)) {
          return
        }

        if (key.endsWith('DateRange')) {
          var keyAux = key.replace('Range', '')
          if (Utils.isNotEmpty(value[0])) {
            condition[keyAux] = {
              ...condition[keyAux],
              $gte: new Date(value[0])
            }
          }

          if (Utils.isNotEmpty(value[1])) {
            condition[keyAux] = {
              ...condition[keyAux],
              $lte: new Date(value[1])
            }
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

    return filters
  }
}

export default Search