import "./Modal.css"
import closeButton from '../../assets/close.svg'
import { useEffect } from "react"

export default function Modal({children, isOpen, closeModal}){

  useEffect(() => {
    function handleEscapeClose(e) {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    }

    function handleOutsideClick(e) {
      if (isOpen && e.target.classList.contains('modal')) {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleEscapeClose);
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("keydown", handleEscapeClose);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, closeModal]);

  return (
    <main className={`modal ${isOpen && "modal_visible"}`}>
      <section className="modal__container">
      <button onClick={closeModal} className="modal__close-button">
        <img src={closeButton} alt="close button" />
      </button>
        {children}
      </section>
    </main>
  )
}