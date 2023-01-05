"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Configs_1 = require("../../config/Configs");
class Search {
    constructor(_query) {
        this.searchText = _query.searchText;
        this.order = _query.order;
        this.orderBy = _query.orderBy;
        this.properties = _query.properties;
        this.populate = _query.populate;
        this.page = parseInt(_query.page);
        this.limit = parseInt(_query.limit);
    }
    sorter() {
        let order = {};
        this.orderBy = this.orderBy || "_id";
        order[this.orderBy] = this.order === "desc" ? -1 : 1;
        return order;
    }
    isPageable() {
        if (this.page) {
            return true;
        }
        return false;
    }
    diacriticSensitiveRegex(string = '') {
        return string
            .replace(/[a|á|à|ä|â|A|Á|Â|Ã|Ä]/g, '[a,á,à,ä,â,A,Á,Â,Ã,Ä]')
            .replace(/[e|é|ë|è|E|É|Ë|È]/g, '[e,é,ë,è,E,É,Ë,È]')
            .replace(/[i|í|ï|ì|I|Í|Ï|Ì]/g, '[i,í,ï,ì,I,Í,Ï,Ì]')
            .replace(/[o|ó|ö|ò|õ|O|Ó|Ö|Ô|Õ]/g, '[o,ó,ö,ò,õ,O,Ó,Ö,Ô,Õ]')
            .replace(/[u|ü|ú|ù|U|Ú|Ü|Ù]/g, '[u,ü,ú,ù,U,Ú,Ü,Ù]')
            .replace(/[ç|Ç|c|C]/g, '[c,C,ç,Ç]');
    }
    findPageable(model, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            let page = this.page - 1 || 0;
            let limit = this.limit || 10;
            const sort = this.sorter();
            var items = yield model
                .find(filters, this.properties)
                .skip(page * limit)
                .limit(limit)
                .populate(this.populate)
                .sort(sort)
                .collation({
                locale: Configs_1.dbCollation
            });
            return this.result(model, items, filters);
        });
    }
    findNoPageable(model, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const sort = this.sorter();
            var items = yield model
                .find(filters, this.properties)
                .sort(sort)
                .populate(this.populate)
                .collation({
                locale: Configs_1.dbCollation
            });
            return this.result(model, items, filters);
        });
    }
    result(model, items, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            var count = yield this.count(model, filters);
            return {
                items,
                count
            };
        });
    }
    count(model, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield model.countDocuments(filters).exec();
        });
    }
}
exports.default = Search;
