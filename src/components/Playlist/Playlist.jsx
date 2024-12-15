import "./Playlist.css";

export default function Playlist({ image, name, description }) {
  return (
    <li className="playlist">
      <img className="playlist__image" src={image} alt={`${name}`} />
      <div className="playlist__details">
        <h2 className="playlist__name">{name}</h2>
        <p className="playlist__description">{description}</p>
      </div>
    </li>
  );
}
