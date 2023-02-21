import { Moment } from "moment";
import moment = require("moment");

class GetMonthsIntervalFlowItem {

  get(initDate: Moment, endDate: Moment): Array<Moment> {
    var arrayOfMonths = [];
    var currentMonth = initDate.clone().set("date", 1)
    var lastMonth = endDate.clone()
    do {
      arrayOfMonths.push(currentMonth)
      currentMonth = moment(currentMonth).add(1, 'month')
    }
    while (currentMonth.isBefore(lastMonth))

    return arrayOfMonths
  }
}

export default new GetMonthsIntervalFlowItem