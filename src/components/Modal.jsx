import { useCallback } from "react";
import Styles from "./Modal.module.css";

const Modal = ({ children, isOpen, closeModal, reset }) => {
  const handleOnClose = useCallback(() => {
    reset();
    closeModal();
  }, [reset, closeModal]);

  return (
    <>
      {isOpen ? (
        <>
          <div
            className={`${Styles.modal} ${Styles.isOpen}`}
            onClick={handleOnClose}
          ></div>
          <div className={Styles.modalContainer}>
            <button className={Styles.modalClose} onClick={handleOnClose}>
              X
            </button>
            <h2 className="modal-title">Form Data</h2>
            {children}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
