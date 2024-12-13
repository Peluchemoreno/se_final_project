import "./Main.css";
import Header from "../Header/Header";

export default function Main({ currentUser }) {

  return (
    <main className="homepage">
      <Header currentUser={currentUser} />
      <h1 className="homepage__welcome">Hi {currentUser.display_name}! Here are your playlists</h1>
    </main>
  );
}
