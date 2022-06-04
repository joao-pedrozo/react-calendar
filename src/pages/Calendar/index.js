import React, { useEffect, useState, useContext } from "react";
import AddReminderModalModal from "../../components/AddReminderModal";
import "./styles.scss";
import { CalendarContext } from "../../hooks/useCalendar";

const DAYS_IN_A_WEEK = 7;

const setCalendarDays = ({ monthIndex, year }) => {
  const days = Array.from(
    { length: 30 },
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

  return days.splice(0, 35);
};

function Calendar(props) {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [year, getCurrentYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState([]);
  const [showAddReminderModal, setShowReminderModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());

  const { reminders } = useContext(CalendarContext);

  useEffect(() => {
    setDays(setCalendarDays({ monthIndex, year }));
  }, [monthIndex, year]);

  const handlePreviousButtonPress = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      getCurrentYear((year) => year - 1);
    } else {
      setMonthIndex((monthIndex) => monthIndex - 1);
    }
  };

  const handleNextButtonPress = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      getCurrentYear((year) => year + 1);
    } else {
      setMonthIndex((monthIndex) => monthIndex + 1);
    }
  };

  const handleOnTodayButtonPress = () => {
    setMonthIndex(new Date().getMonth());
    getCurrentYear((year) => new Date().getFullYear());
  };

  const handleOnClickDay = (date) => {
    setShowReminderModal(true);
    setSelectedDay(date);
  };

  return (
    <>
      <div className="container">
        <h1>Jobsity Calendar</h1>
        <b>
          {new Date(year, monthIndex).toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </b>
        <div className="container__buttons-wrapper">
          <button onClick={handlePreviousButtonPress}>Previous</button>
          <button onClick={handleOnTodayButtonPress}>Today</button>
          <button onClick={handleNextButtonPress}>Next</button>
        </div>

        <ul>
          {days.map((day) => (
            <li key={day.getTime()} onClick={() => handleOnClickDay(day)}>
              <div className="header">
                <b>
                  {day
                    .toLocaleDateString("default", { weekday: "short" })
                    .replace(".", "")}
                </b>
                <span>{day.getDate()}</span>
              </div>
              <div className="reminders">
                {reminders.map(
                  (reminder) =>
                    new Date(reminder.date).toDateString() ===
                      day.toDateString() && <span>{reminder.title}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <AddReminderModalModal
        showModal={showAddReminderModal}
        setShowModal={setShowReminderModal}
        selectedDate={selectedDay}
      />
    </>
  );
}

export default Calendar;
