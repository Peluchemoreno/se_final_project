import "./PlaylistSongsModal.css";
import Modal from "../Modal/Modal";
import { getPlaylistTracks } from "../../utils/api";
import { useEffect, useState } from "react";
import Song from "../Song/Song";

export default function PlaylistSongsModal({ isOpen, closeModal, playlist }) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem("access_token");
    getPlaylistTracks(authToken, playlist.id).then((data) => {
      setTracks(data.items);
      console.log(data.items)
    });
  }, [playlist]);

  return (
    <Modal closeModal={closeModal} isOpen={isOpen}>
      <section className="modal__header">
        <img
          className="modal__playlist-image"
          src={!playlist.images ? "https://picsum.photos/200/200" : playlist.images[0].url}
          alt="playlist image"
        />
        <h3 className="modal__playlist-title">{playlist.name}</h3>
      </section>
      <section className="modal__playlist-tracks">
        {tracks.length === 0 ? <p>It seems that there are no tracks for this playlist... Pretty quiet in here.</p> : <ul className="modal__playlist-tracks-list">
          {tracks.map((track) => {
            return <Song key={track.track.id} name={track.track.name} playlist={playlist} />;
          })}
        </ul>}
      </section>
    </Modal>
  );
}