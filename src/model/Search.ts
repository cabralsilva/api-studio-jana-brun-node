import mongoose from "mongoose"
import { dbCollation } from "../config/Configs"

abstract class Search {
  company: mongoose.Types.ObjectId
  searchText: string
  order: string
  orderBy: string
  page: number
  limit: number
  properties: string
  populate: string
  filters: {}

  constructor(_query) {
    this.searchText = _query.searchText
    this.order = _query.order
    this.orderBy = _query.orderBy
    this.properties = _query.properties
    this.populate = _query.populate
    this.page = parseInt(_query.page)
    this.limit = parseInt(_query.limit)
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
      .skip(page * limit)
      .limit(limit)
      .populate(this.populate)
      .sort(sort)
      .collation({
        locale: dbCollation
      }) as []

    return this.result(model, items)
  }

  async findNoPageable(model: mongoose.Model<any>) {
    const sort = this.sorter()
    var items = await model
      .find(this.filters, this.properties)
      .sort(sort)
      .populate(this.populate)
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
}

export default Search