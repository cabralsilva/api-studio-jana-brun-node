"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./src/server"));
const Configs_1 = require("./src/config/Configs");
let port = Configs_1.httpPort || '5000';
server_1.default.app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
