import { useEffect, useContext } from "react";

import { CalendarContext } from "../../hooks/useCalendar";
import BaseModal from "../BaseModal";
import Form from "../Form";
import styles from "./styles.module.scss";

const ViewAndEditReminderModal = ({ setShowModal, showModal }) => {
  const { reminders, setReminders, selectedReminder, setSelectedReminder } =
    useContext(CalendarContext);

  useEffect(() => {
    if (!showModal) {
      setSelectedReminder(null);
    }
  }, [showModal]);

  const handleOnDeleteReminderClick = () => {
    setReminders(
      reminders.filter((reminder) => reminder.id !== selectedReminder.id)
    );
    setShowModal(false);
  };

  return (
    <BaseModal showModal={showModal} setShowModal={setShowModal}>
      <div className={styles.container}>
        <h1>View/Edit Reminder</h1>
        <div className={styles["container__delete-reminder-wrapper"]}>
          <b onClick={handleOnDeleteReminderClick}>Delete reminder</b>
        </div>
        <Form setShowModal={setShowModal} currentModalVisibility={showModal} />
      </div>
    </BaseModal>
  );
};

export default ViewAndEditReminderModal;
