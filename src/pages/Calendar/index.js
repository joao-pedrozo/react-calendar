import React, { useEffect, useState, useContext } from "react";
import AddReminderModal from "../../components/AddReminderModal";
import ViewAndEditReminderModal from "../../components/ViewAndEditReminderModal";
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
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [showViewAndEditReminderModal, setShowViewAndEditReminderModal] =
    useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());

  const { reminders, setSelectedReminder } = useContext(CalendarContext);

  useEffect(() => {
    setDays(setCalendarDays({ monthIndex, year }));
  }, [monthIndex, year]);

  const handleOnReminderClick = (reminder) => {
    setSelectedReminder(reminder);
    setShowViewAndEditReminderModal(true);
  };

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

  const handleOnClickDay = (event, date) => {
    if (event.target.getAttribute("class") === "calendar-day") {
      setShowAddReminderModal(true);
      setSelectedDay(date);
    }
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
            <li
              key={day.getTime()}
              onClick={(event) => handleOnClickDay(event, day)}
              className="calendar-day"
            >
              <div className="header">
                <b>
                  {day
                    .toLocaleDateString("default", { weekday: "short" })
                    .replace(".", "")}
                </b>
                <span>{day.getDate()}</span>
              </div>
              <div className="reminders">
                {reminders
                  .filter(
                    (reminder) =>
                      new Date(reminder.date).toDateString() ===
                      day.toDateString()
                  )
                  .slice(-2)
                  .map((reminder) => (
                    <div
                      className="reminder-wrapper"
                      style={{ backgroundColor: reminder.color }}
                      onClick={() => handleOnReminderClick(reminder)}
                    >
                      <b className="reminder-title">{reminder.title}</b>
                    </div>
                  ))}
                {reminders.filter(
                  (reminder) =>
                    new Date(reminder.date).toDateString() ===
                    day.toDateString()
                ).length > 2 && (
                  <div className="reminder-wrapper">
                    <b>View All</b>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <AddReminderModal
        showModal={showAddReminderModal}
        setShowModal={setShowAddReminderModal}
        selectedDate={selectedDay}
      />
      <ViewAndEditReminderModal
        showModal={showViewAndEditReminderModal}
        setShowModal={setShowViewAndEditReminderModal}
      />
    </>
  );
}

export default Calendar;