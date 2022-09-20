export const getReadableDate = (mili_seconds) => {
  const date = new Date(mili_seconds);
  return date.toString("mmm dd yyyy");
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
