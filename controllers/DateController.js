import { lowerCase } from "lodash";
import moment from "moment";
import { processDate } from "../misc/functions";

export const getReadableDate = (mili_seconds) => {
  const date = new Date(mili_seconds);
  return date.toString("mmm dd yyyy");
};

export const getDayCode = (day) => {
  const dayCodeMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  return dayCodeMap[lowerCase(day)];
};

export const retrieveNextDates = (fromDate, intervals) => {
  const nextDates = intervals.map((item) => {
    const now = moment(fromDate.getTime());
    return processDate(now.add(item, "days").toDate());
  });
  return nextDates;
};
// export const getPaddedDateString()
export function prettyDate(mili_seconds) {
  const date = new Date(mili_seconds);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    months[date.getUTCMonth()] +
    " " +
    date.getUTCDate() +
    ", " +
    date.getUTCFullYear()
  );
}
