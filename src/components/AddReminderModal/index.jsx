import BaseModal from "../BaseModal";
import Form from "../Form";
import styles from "./styles.module.scss";

const AddReminderModalModal = ({ setShowModal, showModal, selectedDate }) => {
  return (
    <BaseModal showModal={showModal} setShowModal={setShowModal}>
      <div className={styles.container}>
        <h1>Add Reminder</h1>
        <Form
          setShowModal={setShowModal}
          selectedDate={selectedDate}
          currentModalVisibility={showModal}
        />
      </div>
    </BaseModal>
  );
};

export default AddReminderModalModal;
