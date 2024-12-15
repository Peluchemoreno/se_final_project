import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  generateCodeChallenge,
  requestAuthorization,
  getToken,
} from "../../utils/auth";
import { getUserProfile } from "../../utils/api";
import Preloader from "../Preloader/Preloader";

export default function LandingPage({ setCurrentUser, setAuthenticated, setUserId }) {
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
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      setAuthenticated(true);
      getUserProfile(accessToken)
        .then((user) => {
          setCurrentUser(user);
          setUserId(user.id)
          console.log("User profile:", user);
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
        });
      navigator("homepage");
    } else {
      if (!code) {
        return;
      }
      getToken(code).then((authToken) => {
        console.log(localStorage.getItem("access_token"));
        getUserProfile(authToken)
          .then((user) => {
            setCurrentUser(user);
            setUserId(user.id)
            console.log("User profile:", user);
          })
          .catch((err) => {
            console.error("Error fetching user profile:", err);
          });
        navigator("homepage");
      });
    }
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <main className="landing-page">
      <div>
        <h1 className="landing-page__title">Welcome to my Spotify project</h1>
        <p className="landing-page__description">
          This site will allow you to view your playlists, access your full
          spotify profile, and even listen to music! Just click the button below
          that says enter here to be transported to the site (after
          authenticating of course).
        </p>
      </div>
      <button className="landing-page__button" onClick={checkAuth}>
        Enter here
      </button>
    </main>
  );
}
