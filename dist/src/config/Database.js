"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Configs_1 = require("./Configs");
class Database {
    createConnection() {
        mongoose.set("strictQuery", true);
        mongoose.connect(Configs_1.dbUrl);
        mongoose.set('debug', Configs_1.modeDebug === 'true');
    }
}
exports.default = Database;
