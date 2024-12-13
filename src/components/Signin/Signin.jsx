import "./Signin.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function Signin() {
  return (
    <>

      <ModalWithForm
        title="Sign in"
        buttonText="Sign in"
        buttonLoadingText="Signing in..."
        // isLoading={true}
      >
        <label htmlFor="email" className="form__label">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            required={true}
            className="form__input"
          />
        </label>
        <label htmlFor="password" className="form__label">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required={true}
            className="form__input"
          />
        </label>
      </ModalWithForm>
    </>
  );
}
