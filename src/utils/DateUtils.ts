import { isEmpty } from "c2-mongoose/dist/utils/Utils";
import moment, { Moment } from "moment-timezone";

export const DATE_FORMAT_DDMMYYY_HHMMSS = 'DD/MM/YYYY HH:mm:ss';
export const DATE_FORMAT_YYYYMMDD_HHMMSS = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT_YYYYMMDD = 'YYYY-MM-DD';
export const DATE_FORMAT_SLASH_DDMMYYYY = 'DD/MM/YYYY';

export const TIMEZONE_BRASIL = 'America/Sao_Paulo';

class DateUtils {
  toString(date: Date, format: string): string {
    const newDate = moment(date).tz(TIMEZONE_BRASIL, false).format(format)
    return newDate
  }

  getDateTimeLocal(date: Date): Date {
    const newDate = moment(date).tz(TIMEZONE_BRASIL, false).toDate()
    return newDate
  }

  toDateTimeUTC0(date: Date): Date {
    const newDate = moment(date).tz(TIMEZONE_BRASIL, true).toDate()
    return newDate
  }

  stringToDateTimeUTC0(dataStr: string, format = DATE_FORMAT_YYYYMMDD) {
    const dateAux = this.convertStringToDate(dataStr, format)
    return this.toDateTimeUTC0(dateAux)
  }

  brasilFormatToDateTimeUTC0(dataBrasil: string) {
    const dateAux = this.convertStringToDate(dataBrasil, DATE_FORMAT_DDMMYYY_HHMMSS)
    return this.toDateTimeUTC0(dateAux)
  }

  toStringMoment(date: Moment, format: string) {
    return date.format(format)
  }

  convertStringToDate(dateString: string, format: string): Date | null {
    if (isEmpty(dateString)) {
      return null
    }
    const parsedDate = moment(dateString, format);

    if (parsedDate.isValid()) {
      return parsedDate.toDate();
    }

    return null;
  };
}

export default new DateUtils