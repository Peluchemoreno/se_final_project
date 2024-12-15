import { Routes, Route } from "react-router-dom";
import NothingFound from "../NothingFound/NothingFound";
import Main from "../Main/Main";
import "./App.css";
import { useState } from "react";
import LandingPage from "../LandingPage/LandingPage";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState('')

  function handleSetCurrentUser(user) {
    setCurrentUser(user);
  }

  function handleSetAuthenticated() {
    setAuthenticated(!authenticated);
  }

  function handleSetUserId(id){
    setUserId(id)
  }

  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<NothingFound />} />
        <Route
          path="/"
          element={
            <LandingPage
              setCurrentUser={handleSetCurrentUser}
              setAuthenticated={handleSetAuthenticated}
              authenticated={authenticated}
              setUserId={handleSetUserId}
              userId={userId}
            />
          }
        />
        <Route
          path="/homepage"
          element={
            <ProtectedRoute authenticated={authenticated}>
              <Main currentUser={currentUser} userId={userId} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
