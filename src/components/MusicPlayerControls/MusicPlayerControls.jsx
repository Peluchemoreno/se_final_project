import "./MusicPlayerControls.css";
import previousTrackButton from "../../assets/previous-track.svg";
import playButton from "../../assets/play-button.svg";
import nextTrackButton from "../../assets/next-track.svg";
import volumeButton from "../../assets/volume.svg";
import shuffleButton from "../../assets/shuffle.svg";

export default function MusicPlayerControls({setIsPlaying, isPlaying}) {
  return (
    <section className="music-player__controls">
      <div className="music-player__play-previous-next-buttons">
        <img
          className="music-player__previous-track-button music-player-button"
          src={previousTrackButton}
          alt="previous track"
        />
        <img
          className="music-player__play-button music-player-button"
          src={playButton}
          alt="play track"
          onClick={()=>{
            // setIsPlaying(!isPlaying)
            setIsPlaying(false)
            console.log('click')
          }}
        />
        <img
          className="music-player__next-track-button music-player-button"
          src={nextTrackButton}
          alt="next track"
        />
      </div>
      <div className="music-player__progress-bar progress-bar">
        <p className="progress-bar__time-passed">0:00</p>
        <div className="progress-bar__background-bar">
          <div
            className="progress-bar__foreground-bar"
            style={{
              width: "25%",
            }}
          ></div>
        </div>
        <div className="progress-bar__current-position-indicator"></div>
        <p className="progress-bar__song-length">0:00</p>
      </div>
      <div className="music-player__misc-controls">
        <img
          className="music-player__volume-button music-player-button"
          src={volumeButton}
          alt="volume button "
        />
        <img
          className="music-player__shuffle-button music-player-button"
          src={shuffleButton}
          alt="toggle shuffle"
        />
      </div>
    </section>
  );
}
