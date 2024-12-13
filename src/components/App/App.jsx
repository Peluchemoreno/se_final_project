import { Routes, Route } from "react-router-dom";
import NothingFound from "../NothingFound/NothingFound";
import Main from "../Main/Main";
import Signin from "../Signin/Signin";
import Preloader from "../Preloader/Preloader";
import { generateCodeChallenge, requestAuthorization, getToken, getUserProfile } from "../../utils/auth";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({})

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const code = urlParams.get("code");
  //     const accessToken = localStorage.getItem("access_token");

  //     if (accessToken) {
  //       // Token exists, user is authenticated
  //       console.log("Access token:", accessToken);
  //       setAuthenticated(true);
  //       setLoading(false);
  //     } else if (code) {
  //       // Exchange the authorization code for an access token
  //       console.log("Authorization code:", code);
  //       try {
  //         await getToken(code);
  //         setAuthenticated(true);
  //       } catch (err) {
  //         console.error("Token exchange failed:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     } else {
  //       // Start the authorization process
  //       console.log("Generating code challenge...");
  //       setLoading(true);
  //       try {
  //         const { codeVerifier, codeChallenge } = await generateCodeChallenge();
  //         requestAuthorization(codeVerifier, codeChallenge);
  //       } catch (err) {
  //         console.error("Error generating code challenge:", err);
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   checkAuth();
  // }, []);
  useEffect(() => {
    const checkAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const accessToken = localStorage.getItem("access_token");
  
      if (accessToken) {
        console.log("Access token found:", accessToken);
        setAuthenticated(true);
        setLoading(false);
      } else if (code) {
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
    };
  
    checkAuth();
  }, []);
  

  // useEffect(()=>{
  //   const accessToken = localStorage.getItem("access_token");
  //   if (accessToken){
  //     getUserProfile(accessToken).then(user => {
  //       setCurrentUser(user)
  //       console.log(user)
  //     }).catch(err => {
  //       console.error(err)
  //     })
  //   }
  // }, [])
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      getUserProfile(token)
        .then((user) => {
          setCurrentUser(user);
          console.log("User profile:", user);
        })
        .catch((err) => {
          console.error("Error fetching user profile:", err);
        });
    }
  }, [authenticated]); // Fetch user profile only when authenticated changes
  

  if (loading) {
    return <Preloader />;
  }


  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<NothingFound />} />
        <Route path="/" element={authenticated ? <Main currentUser={currentUser} /> : <Signin />} />
        <Route path="/preloader" element={<Preloader />} />
      </Routes>
    </div>
  );
}

export default App;
