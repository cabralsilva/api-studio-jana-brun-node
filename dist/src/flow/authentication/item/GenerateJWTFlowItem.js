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
const jwt = require("jsonwebtoken");
const Configs_1 = require("../../../config/Configs");
class GenerateJWTFlowItem {
    generate(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            var now = new Date();
            var exp = new Date(now);
            exp.setMinutes(now.getMinutes() + (60 * Number(Configs_1.jwtExpireTimeInHour)));
            let payload = {
                iss: "api-studio-jana-brun",
                iat: now.getTime(),
                exp: exp.getTime(),
                holder: employee._id
            };
            return jwt.sign(payload, Configs_1.jwtSecret);
        });
    }
}
exports.default = new GenerateJWTFlowItem;
