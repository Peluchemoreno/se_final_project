import "./Preloader.css"
import loading from '../../assets/loading.svg'

export default function Preloader(){
  return (
    <div className="preloader">
      <h1 className="preloader__text">Hang tight one moment</h1>
      <img className="preloader__loader" src={loading} alt="Loading image" />
    </div>
  )
}