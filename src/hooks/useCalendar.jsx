import React, { createContext, useEffect, useState } from "react";

const initialReminders = () => {
  const events = localStorage.getItem("events");

  return events ? JSON.parse(events) : [];
};

const CalendarContext = createContext();

const ContextProvider = ({ children }) => {
  const [reminders, setReminders] = useState(initialReminders());
  const [selectedReminder, setSelectedReminder] = useState(null);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(reminders));
  }, [reminders]);

  return (
    <CalendarContext.Provider
      value={{
        reminders,
        setReminders,
        selectedReminder,
        setSelectedReminder,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export { ContextProvider, CalendarContext };
