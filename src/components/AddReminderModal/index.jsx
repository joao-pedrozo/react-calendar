import { useState, useEffect, useContext } from "react";

import BaseModal from "../BaseModal";
import Form from "../Form";
import styles from "./styles.module.scss";

const AddReminderModalModal = ({ setShowModal, showModal, selectedDate }) => {
  // useEffect(() => {
  //   setSelectedColor(colors[0]);
  // }, [showModal]);

  return (
    <BaseModal showModal={showModal} setShowModal={setShowModal}>
      <div className={styles.container}>
        <h1>Add Reminder</h1>
        <Form
          setShowModal={setShowModal}
          selectedDate={selectedDate}
          currentModalVisibility={showModal}
          action="add"
        />
      </div>
    </BaseModal>
  );
};

export default AddReminderModalModal;
