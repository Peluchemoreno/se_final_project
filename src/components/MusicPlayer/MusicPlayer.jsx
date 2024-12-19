import "./MusicPlayer.css";
import Modal from "../Modal/Modal";
import MusicPlayerControls from "../MusicPlayerControls/MusicPlayerControls";
import closeButton from '../../assets/close.svg'
import { useEffect, useState } from "react";
import { playSong, pauseSong, getCurrentDevice } from "../../utils/api";

export default function MusicPlayer({ isOpen, closeModal, song, playlist }) {

  const [currentDevice, setCurrentDevice] = useState('')

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(()=>{
    const accessToken = localStorage.getItem("access_token")
    getCurrentDevice(accessToken).then(devices => {
      setCurrentDevice(devices.devices[0].id)
      return devices.devices[0].id
    }).then(deviceId => {
      if (!isPlaying){
        console.log('playing')
        const accessToken = localStorage.getItem("access_token")
        playSong(accessToken, playlist.uri, deviceId)
        console.log(playlist)
      } else {
        console.log('pausing')
        const accessToken = localStorage.getItem("access_token")
        pauseSong(accessToken)
      }
    })
  },[song])

  useEffect(()=>{
    console.log('render')
    
  }, [song])

 

  return (
    <Modal closeModal={closeModal} isOpen={isOpen}>
      <section className="music-player">
      <button onClick={closeModal} className="modal__close-button">
          <img src={closeButton} alt="close button" />
        </button>
        <div className="music-player__image-container">
          <img
            src={
              !playlist.images
                ? "https://picsum.photos/400/400"
                : playlist.images[0].url
            }
            alt="playlist image"
            className="music-player__image"
          />
        </div>
        <MusicPlayerControls setIsPlaying={setIsPlaying} isPlaying={isPlaying} />
      </section>
    </Modal>
  );
}
