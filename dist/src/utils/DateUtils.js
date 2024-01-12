"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMEZONE_BRASIL = exports.DATE_FORMAT_SLASH_DDMMYYYY = exports.DATE_FORMAT_YYYYMMDD = exports.DATE_FORMAT_YYYYMMDD_HHMMSS = exports.DATE_FORMAT_DDMMYYY_HHMMSS = void 0;
const Utils_1 = require("c2-mongoose/dist/utils/Utils");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
exports.DATE_FORMAT_DDMMYYY_HHMMSS = 'DD/MM/YYYY HH:mm:ss';
exports.DATE_FORMAT_YYYYMMDD_HHMMSS = 'YYYY-MM-DD HH:mm:ss';
exports.DATE_FORMAT_YYYYMMDD = 'YYYY-MM-DD';
exports.DATE_FORMAT_SLASH_DDMMYYYY = 'DD/MM/YYYY';
exports.TIMEZONE_BRASIL = 'America/Sao_Paulo';
class DateUtils {
    toString(date, format) {
        const newDate = (0, moment_timezone_1.default)(date).tz(exports.TIMEZONE_BRASIL, false).format(format);
        return newDate;
    }
    getDateTimeLocal(date) {
        const newDate = (0, moment_timezone_1.default)(date).tz(exports.TIMEZONE_BRASIL, false).toDate();
        return newDate;
    }
    toDateTimeUTC0(date) {
        const newDate = (0, moment_timezone_1.default)(date).tz(exports.TIMEZONE_BRASIL, true).toDate();
        return newDate;
    }
    stringToDateTimeUTC0(dataStr, format = exports.DATE_FORMAT_YYYYMMDD) {
        const dateAux = this.convertStringToDate(dataStr, format);
        return this.toDateTimeUTC0(dateAux);
    }
    brasilFormatToDateTimeUTC0(dataBrasil) {
        const dateAux = this.convertStringToDate(dataBrasil, exports.DATE_FORMAT_DDMMYYY_HHMMSS);
        return this.toDateTimeUTC0(dateAux);
    }
    toStringMoment(date, format) {
        return date.format(format);
    }
    convertStringToDate(dateString, format) {
        if ((0, Utils_1.isEmpty)(dateString)) {
            return null;
        }
        const parsedDate = (0, moment_timezone_1.default)(dateString, format);
        if (parsedDate.isValid()) {
            return parsedDate.toDate();
        }
        return null;
    }
    ;
}
exports.default = new DateUtils;
