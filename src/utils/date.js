const DAYS_IN_A_WEEK = 7;
const DAYS_IN_A_MONTH = 30;
const TOTAL_CALENDAR_DAYS = 35;

export const setCalendarDays = ({ monthIndex, year }) => {
  const days = Array.from(
    { length: DAYS_IN_A_MONTH },
    (_, index) => new Date(year, monthIndex, index + 1)
  );

  const firstWeekDaysUntilSunday = Array.from(
    { length: DAYS_IN_A_WEEK },
    (_, i) => new Date(year, monthIndex, i * -1)
  ).filter((date) => date.getDay() < days[0].getDay());

  const lastWeeekDaysUntilSaturday = Array.from(
    { length: DAYS_IN_A_WEEK },
    (_, i) => {
      const date = new Date(year, monthIndex, days.length + i);
      return date;
    }
  ).filter((date) => date.getDay() > days[days.length - 1].getDay());

  days.unshift(...firstWeekDaysUntilSunday.reverse());
  days.push(...lastWeeekDaysUntilSaturday);

  return days.splice(0, TOTAL_CALENDAR_DAYS);
};
