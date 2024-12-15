import "./Header.css";
import userLogo from "../../assets/user.svg";
import spotifyLogo from "../../assets/spotify-logo.svg";

export default function Header({ currentUser }) {
  return (
    <header className="header">
      <img className="header__logo" src={spotifyLogo} alt="spotify logo" />
      <div className="header__container">
        <input placeholder="Search" type="text" className="header__search" />
        <button className="header__user-logo">
          <a className="header__user-logo_link" href={currentUser.external_urls?.spotify} target="blank_">
            <p className="header__user-name">{currentUser.display_name}</p>
            <img src={userLogo} alt="" className="header__user-icon" />
          </a>
        </button>
      </div>
    </header>
  );
}
