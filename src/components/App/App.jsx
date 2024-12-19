import { Routes, Route } from "react-router-dom";
import NothingFound from "../NothingFound/NothingFound";
import Main from "../Main/Main";
import "./App.css";
import { useState } from "react";
import LandingPage from "../LandingPage/LandingPage";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import PlaylistSongsModal from "../PlaylistSongsModal/PlaylistSongsModal";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState({});
  const [currentSong, setCurrentSong] = useState({})
  const [activeModal, setActiveModal] = useState("");

  function handleSetCurrentUser(user) {
    setCurrentUser(user);
  }

  function handleSetAuthenticated() {
    setAuthenticated(!authenticated);
  }

  function handleSetUserId(id) {
    setUserId(id);
  }

  function handleSetPlaylist(playlist) {
    setCurrentPlaylist(playlist);
  }

  function closeModal() {
    setActiveModal("");
  }

  return (
    <>
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
                <Main
                  currentUser={currentUser}
                  userId={userId}
                  setActiveModal={setActiveModal}
                  setCurrentPlaylist={handleSetPlaylist}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <PlaylistSongsModal
        isOpen={activeModal === "playlistModal"}
        closeModal={closeModal}
        playlist={currentPlaylist}
        setActiveModal={setActiveModal}
        setCurrentSong={setCurrentSong}
      />
      <MusicPlayer
        isOpen={activeModal === "musicPlayer"}
        closeModal={closeModal}
        song={currentSong}
        playlist={currentPlaylist}
      />
    </>
  );
}

export default App;
