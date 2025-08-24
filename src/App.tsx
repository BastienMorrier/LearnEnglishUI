import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import AllWords from './routes/AllWords';
// import Home from "./Home;
import Home from "./routes/Home";
import FormAddWords from "./routes/FormAddWords";
import FlashCard from "./routes/FlashCard";

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/allwords" element={<AllWords/>}/>
      <Route path="/formaddwords" element={<FormAddWords/>}/>
      <Route path="/flashcard" element={<FlashCard/>}/>
    </Routes>
    </>
  )
}

export default App;
