"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Configs_1 = require("./Configs");
class Database {
    createConnection() {
        mongoose.set("strictQuery", true);
        mongoose.connect(Configs_1.dbUrl);
    }
}
exports.default = Database;
