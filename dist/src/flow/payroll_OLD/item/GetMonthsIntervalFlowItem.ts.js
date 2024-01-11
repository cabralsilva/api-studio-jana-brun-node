"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
class GetMonthsIntervalFlowItem {
    get(initDate, endDate) {
        var arrayOfMonths = [];
        var currentMonth = initDate.clone().set("date", 1);
        var lastMonth = endDate.clone();
        do {
            arrayOfMonths.push(currentMonth);
            currentMonth = moment(currentMonth).add(1, 'month');
        } while (currentMonth.isBefore(lastMonth));
        return arrayOfMonths;
    }
}
exports.default = new GetMonthsIntervalFlowItem;
