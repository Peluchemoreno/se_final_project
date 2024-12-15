import "./Modal.css"
import closeButton from '../../assets/close.svg'

export default function Modal({children, isOpen, closeModal}){
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