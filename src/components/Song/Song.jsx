import "./Song.css";
import playButton from '../../assets/playbutton.svg'

export default function Song({ name, playlist }) {
  return (
    <li className="song">
      <div className="song__details">
        <img
          className="song__playlist-image"
          src={!playlist.images ? "" : playlist.images[0].url}
          alt="playlist"
        />
        {name}
      </div>
      <button className="song__play-button">
        <img className="song__play-button-icon" src={playButton} alt="play button" />
      </button>
    </li>
  );
}
