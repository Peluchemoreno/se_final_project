import "./Main.css";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { getPlaylists } from "../../utils/api";
import Playlist from "../Playlist/Playlist";

export default function Main({ currentUser, userId, setActiveModal, setCurrentPlaylist }) {
  const [playlists, setPlaylists] = useState([]);
  

  useEffect(() => {
    if (currentUser !== undefined) {
      const token = localStorage.getItem("access_token");
      getPlaylists(token, userId).then((playlists) => {
        setPlaylists(playlists.items);
      });
    }
  }, []);

  return (
    <main className="homepage">
      <Header currentUser={currentUser} />
      <h1 className="homepage__welcome">
        Hi {currentUser.display_name}! Here are your playlists
      </h1>
      <section className="homepage__playlists">
        <ul className="homepage__playlist-list">
          {playlists.map((playlist) => {
            return (
              <Playlist
                key={playlist.snapshot_id}
                name={playlist.name}
                image={!playlist.images ? "https://picsum.photos/150/150" : playlist.images[0].url}
                description={playlist.description === '' ? 'This playlist has no description. The music speaks for itself.' : playlist.description}
                playlist={playlist}
                setActiveModal={setActiveModal}
                setCurrentPlaylist={setCurrentPlaylist}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
