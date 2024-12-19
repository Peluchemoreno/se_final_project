import "./Song.css";
import playButton from '../../assets/playbutton.svg'

export default function Song({ name, song, setActiveModal, setCurrentSong }) {

  function handleSongClick(song){
    setActiveModal('musicPlayer')
    setCurrentSong(song)
  }

  return (
    <li onClick={()=>{
      handleSongClick(song)
    }} className="song">
      <div className="song__details">
        <img
          className="song__playlist-image"
          src={song.album.images.length === 0 ? "https://picsum.photos/70/70" : song.album.images[0].url}
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
