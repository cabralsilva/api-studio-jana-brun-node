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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const c2_mongoose_1 = require("c2-mongoose");
const IPerson_1 = require("../../../model/schema/IPerson");
const IStudent_1 = require("../../../model/schema/IStudent");
const Utils_1 = __importDefault(require("../../../utils/Utils"));
class PrepareSearchStudentFlowItem {
    constructor() {
        this.searcherStudent = new c2_mongoose_1.CrudFlow(IStudent_1.StudentRepository);
        this.searcherPerson = new c2_mongoose_1.CrudFlow(IPerson_1.PersonRepository);
    }
    prepare(search) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Utils_1.default.isNotEmpty(search.searchText)) {
                this.searcherPerson.prepareSearch(new IPerson_1.PersonSearch({
                    searchText: search.searchText,
                    pageable: false
                }));
                const peoples = yield this.searcherPerson.find({});
                var paramPerson = [];
                peoples.items.forEach((element) => {
                    paramPerson.push(element._id);
                });
                this.searcherStudent.prepareSearch(new IStudent_1.StudentSearch({
                    onlyMetadata: true,
                }));
                const students = yield this.searcherStudent.find({
                    metadata: [
                        {
                            id: "items",
                            conditions: [
                                {
                                    $match: {
                                        $or: [
                                            {
                                                person: {
                                                    $in: paramPerson
                                                }
                                            },
                                            {
                                                responsible: {
                                                    $in: paramPerson
                                                }
                                            },
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                });
                var paramStudent = [];
                students.items.forEach((element) => {
                    paramStudent.push(element._id);
                });
                search.student = paramStudent;
                search.searchText = undefined;
            }
        });
    }
}
exports.default = new PrepareSearchStudentFlowItem;
