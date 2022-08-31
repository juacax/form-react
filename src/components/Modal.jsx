import Styles from "./Modal.module.css";

const Modal = ({children, isOpen, closeModal}) => {

  const handleModal = (e) => e.stopPropagation();

  return (
    <article className={`${Styles.modal} ${isOpen && Styles.isOpen}`} onClick={closeModal}>
      <div className={Styles.modalContainer} onClick={handleModal}>
        <button className={Styles.modalClose} onClick={closeModal}>X</button>
        {children}
      </div>
    </article>
  )
}

export default Modal;