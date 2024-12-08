import { Routes, Route } from "react-router-dom";
import NothingFound from "../NothingFound/NothingFound";
import Main from "../Main/Main";
import "./App.css";

function App() {


  return (
    <>
      <div className="app">
        <Routes>
          <Route path="*" element={<NothingFound />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
