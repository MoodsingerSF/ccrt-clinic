import { lowerCase } from "lodash";
import moment from "moment";
import { processDate } from "../misc/functions";
const months = [
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
const dayCodeMap = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const codeToDayMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
export const prettyDate2 = (date) => {
  if (date === null) return null;
  return {
    day: codeToDayMap[date.getDay()],
    month: months[date.getMonth()],
    date: date.getDate(),
    year: date.getFullYear(),
  };
};
export const getReadableDate = (mili_seconds) => {
  const date = new Date(mili_seconds);
  return date.toString("mmm dd yyyy");
};

export const getDayCode = (day) => {
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

  return (
    months[date.getUTCMonth()] +
    " " +
    date.getUTCDate() +
    ", " +
    date.getUTCFullYear()
  );
}

export const prettyDateDayjs = (value) => {
  if (value === null) return null;
  if (!value.$d) return value;
  const dateFormat = new Date(value.$d);
  const day = dateFormat.getDate();
  const month = dateFormat.getMonth();
  const year = dateFormat.getFullYear();
  const date = `${year}-${month + 1}-${day}`;
  return { dateObj: dateFormat, dateString: date };
};
