import React, { useContext } from "react";

import { CalendarContext } from "../../hooks/useCalendar";
import BaseModal from "../BaseModal";
import Button from "../Button/index";
import styles from "./styles.module.scss";

function getHours(date) {
  return `${String(new Date(date).getHours()).padStart(2, "0")}:${String(
    new Date(date).getMinutes()
  ).padStart(2, "0")}`;
}

const ShowAllRemindersModal = ({ setShowModal, showModal, selectedDate }) => {
  const { reminders, setSelectedReminder } = useContext(CalendarContext);

  const handleOnCloseButtonClick = () => {
    setShowModal(false);
  };

  return (
    <BaseModal showModal={showModal} setShowModal={setShowModal}>
      <div className={styles.container}>
        <h1>Reminders from {selectedDate.toLocaleDateString()}</h1>
        <ul>
          {reminders
            .filter(
              (reminder) =>
                new Date(reminder.date).toDateString() ===
                selectedDate.toDateString()
            )
            .map((reminder) => (
              <li style={{ backgroundColor: reminder.color }} key={reminder.id}>
                <b>{getHours(reminder.date)}</b>
                <span>
                  {reminder.title} <br /> <b>{reminder.city}</b>
                </span>
                {<b>{reminder.temp && `${Math.round(reminder.temp)}°C`}</b>}
              </li>
            ))}
        </ul>
        <Button onClick={handleOnCloseButtonClick} kind="cancel">
          Close
        </Button>
      </div>
    </BaseModal>
  );
};

export default ShowAllRemindersModal;
