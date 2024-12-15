import "./Playlist.css";


export default function Playlist({ image, name, description, playlist, setActiveModal, setCurrentPlaylist }) {



  function handleClick(){
    setActiveModal('playlistModal')
    setCurrentPlaylist(playlist)
  }


  return (
    <li onClick={handleClick} className="playlist">
      <img className="playlist__image" src={image} alt={`${name}`} />
      <div className="playlist__details">
        <h2 className="playlist__name">{name}</h2>
        <p className="playlist__description">{description}</p>
      </div>
    </li>
  );
}
