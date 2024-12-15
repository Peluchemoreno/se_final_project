import "./Signin.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Preloader from "../Preloader/Preloader";
import {
  generateCodeChallenge,
  requestAuthorization,
  getToken,
  getUserProfile,
} from "../../utils/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin({
  setCurrentUser,
  setAuthenticated,
}) {
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  async function checkAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      console.log("Access token found: ", accessToken);
      setAuthenticated(true);
      setLoading(false);
    } else if (code) {
      console.log("Verification code found: ", code);
      try {
        const token = await getToken(code);
        console.log("Access token obtained:", token);
        setAuthenticated(true);
      } catch (err) {
        console.error("Token exchange failed:", err);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No token or code, starting authorization...");
      setLoading(true);
      try {
        const { codeVerifier, codeChallenge } = await generateCodeChallenge();
        requestAuthorization(codeVerifier, codeChallenge);
      } catch (err) {
        console.error("Error generating code challenge:", err);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const token = localStorage.getItem("access_token");

    if (token) {
      setAuthenticated(true)
      getUserProfile(token)
        .then((user) => {
          setCurrentUser(user);
          console.log("User profile:", user);
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
        });
      navigator("homepage");
    } else {
      getToken(code).then((authToken) => {
        console.log(localStorage.getItem("access_token"))
        getUserProfile(authToken)
        .then((user) => {
          setCurrentUser(user);
          console.log("User profile:", user);
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
        })
      navigator("homepage");
      })
    }
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <ModalWithForm
        title="Welcome to my Spotify project"
        buttonText="Sign in"
        buttonLoadingText="Signing in..."
        handleClick={checkAuth}
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
