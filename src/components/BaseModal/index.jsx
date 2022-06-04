import React, { useEffect, useRef } from "react";
import "./styles.scss";

const BaseModal = ({ showModal, setShowModal, children }) => {
  useEffect(() => {
    document.documentElement.style.overflowY = showModal ? "hidden" : "";
  }, [showModal]);

  const backgroundRef = useRef(null);

  const closeModal = (event) => {
    if (backgroundRef?.current === event?.target) {
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal && (
        <div
          className="modal-background"
          ref={backgroundRef}
          onClick={closeModal}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default BaseModal;
