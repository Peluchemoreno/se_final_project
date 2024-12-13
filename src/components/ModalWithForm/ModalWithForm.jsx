import "./ModalWithForm.css";
import spotifyLogo from '../../assets/spotify-logo.svg'

export default function ModalWithForm({
  title,
  buttonText,
  buttonLoadingText,
  isLoading,
  children,
}) {
  return (
    <div className="form-container">
      <img src={spotifyLogo} alt="Spotify logo" className="form__logo" />
      <h3 className="form__logo-text">Spotify</h3>
      <form className="form">
        <h1 className="form__title">{title}</h1>
        {children}
        <button className="form__submit-button">
          {isLoading ? buttonLoadingText : buttonText}
        </button>
      </form>
    </div>
  );
}
